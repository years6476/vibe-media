/**
 * Insight — Cloud Functions
 *
 * These three callable functions handle every bidirectional write that
 * involves another user's friends/ node:
 *
 *   acceptFriendRequest  — receiver accepts an incoming request
 *   unfriend             — either user removes the friendship
 *   blockUser            — blocker removes friendship + adds block entry
 *
 * Why Cloud Functions for these?
 *   A friendship is a two-sided record. When A accepts B's request, both
 *   friends/A/B and friends/B/A must be written together. If a client
 *   rule allowed anyone to write into ANY user's friends/ node, a
 *   malicious client could forge friendships. Admin SDK (used here)
 *   bypasses client-side rules entirely, runs on Google's servers, and
 *   lets us do the full transaction safely — first verify the request
 *   exists, then write both sides atomically.
 *
 * Client usage (from friend.html):
 *   import { getFunctions, httpsCallable } from
 *     "https://www.gstatic.com/firebasejs/11.8.1/firebase-functions.js";
 *
 *   const functions = getFunctions(app);
 *   const accept = httpsCallable(functions, 'acceptFriendRequest');
 *   await accept({ senderUid: 'abc123' });
 */

const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { initializeApp }      = require("firebase-admin/app");
const { getDatabase }        = require("firebase-admin/database");

initializeApp();

// ─── helpers ──────────────────────────────────────────────────────────────────

function db() { return getDatabase(); }

// Increment/decrement a numeric counter, flooring at 0.
async function shiftCount(path, delta) {
  const snap = await db().ref(path).get();
  const cur  = snap.exists() ? (snap.val() || 0) : 0;
  await db().ref(path).set(Math.max(0, cur + delta));
}

// Safely resolve a user's display name for toast messages.
async function nameOf(uid) {
  const snap = await db().ref(`users/${uid}/name`).get();
  return snap.exists() ? snap.val() : "User";
}

// ─── acceptFriendRequest ──────────────────────────────────────────────────────
/**
 * Called by the RECEIVER of a friend request.
 * Input:  { senderUid: string }
 * Output: { success: true, friendName: string }
 */
exports.acceptFriendRequest = onCall(async (request) => {
  // 1. Auth gate
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Must be signed in.");
  }
  const receiverUid = request.auth.uid;
  const senderUid   = (request.data && request.data.senderUid) || null;

  if (!senderUid || typeof senderUid !== "string") {
    throw new HttpsError("invalid-argument", "senderUid is required.");
  }
  if (senderUid === receiverUid) {
    throw new HttpsError("invalid-argument", "Cannot accept a request from yourself.");
  }

  // 2. Verify the request actually exists (prevent forging acceptances)
  const reqSnap = await db()
    .ref(`friendRequests/${receiverUid}/${senderUid}`)
    .get();
  if (!reqSnap.exists()) {
    throw new HttpsError("not-found", "No pending friend request from this user.");
  }

  // 3. Verify they're not already friends (idempotency guard)
  const alreadyFriends = await db()
    .ref(`friends/${receiverUid}/${senderUid}`)
    .get();
  if (alreadyFriends.exists()) {
    // Silently clean up the dangling request and return success
    await db().ref(`friendRequests/${receiverUid}/${senderUid}`).delete();
    await db().ref(`sentFriendRequests/${senderUid}/${receiverUid}`).delete();
    const friendName = await nameOf(senderUid);
    return { success: true, friendName };
  }

  const now = Date.now();

  // 4. Write both sides of the friendship atomically using multi-path update
  await db().ref().update({
    [`friends/${receiverUid}/${senderUid}`]:        { addedAt: now },
    [`friends/${senderUid}/${receiverUid}`]:        { addedAt: now },
    [`friendRequests/${receiverUid}/${senderUid}`]: null, // remove request
    [`sentFriendRequests/${senderUid}/${receiverUid}`]: null, // remove sent log
  });

  // 5. Increment friendsCount for both users
  await Promise.all([
    shiftCount(`users/${receiverUid}/friendsCount`, +1),
    shiftCount(`users/${senderUid}/friendsCount`,   +1),
  ]);

  const friendName = await nameOf(senderUid);
  return { success: true, friendName };
});


// ─── unfriend ─────────────────────────────────────────────────────────────────
/**
 * Called by EITHER user to dissolve an existing friendship.
 * Input:  { targetUid: string }
 * Output: { success: true }
 */
exports.unfriend = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Must be signed in.");
  }
  const callerUid = request.auth.uid;
  const targetUid = (request.data && request.data.targetUid) || null;

  if (!targetUid || typeof targetUid !== "string") {
    throw new HttpsError("invalid-argument", "targetUid is required.");
  }
  if (targetUid === callerUid) {
    throw new HttpsError("invalid-argument", "Cannot unfriend yourself.");
  }

  // Check they actually are friends (to avoid phantom count changes)
  const friendSnap = await db()
    .ref(`friends/${callerUid}/${targetUid}`)
    .get();
  const wereFriends = friendSnap.exists();

  // Remove both sides atomically (safe to run even if not friends — no-op)
  await db().ref().update({
    [`friends/${callerUid}/${targetUid}`]: null,
    [`friends/${targetUid}/${callerUid}`]: null,
  });

  // Decrement friendsCount for both, only if they were actually friends
  if (wereFriends) {
    await Promise.all([
      shiftCount(`users/${callerUid}/friendsCount`, -1),
      shiftCount(`users/${targetUid}/friendsCount`, -1),
    ]);
  }

  return { success: true };
});


// ─── blockUser ────────────────────────────────────────────────────────────────
/**
 * Called by the BLOCKER.
 * Input:  { targetUid: string }
 * Output: { success: true }
 *
 * Side-effects:
 *   - Removes any existing friendship in both directions
 *   - Removes any pending friend requests in both directions
 *   - Removes sent-request tracking entries
 *   - Adds an entry to blockedUsers/{callerUid}/{targetUid}
 *
 * NOTE: the block is one-directional (you block them). The blocked person is
 * NOT notified and no entry is written to their blockedUsers node.
 */
exports.blockUser = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Must be signed in.");
  }
  const blockerUid = request.auth.uid;
  const targetUid  = (request.data && request.data.targetUid) || null;

  if (!targetUid || typeof targetUid !== "string") {
    throw new HttpsError("invalid-argument", "targetUid is required.");
  }
  if (targetUid === blockerUid) {
    throw new HttpsError("invalid-argument", "Cannot block yourself.");
  }

  // Were they friends? (needed for count adjustment)
  const friendSnap = await db()
    .ref(`friends/${blockerUid}/${targetUid}`)
    .get();
  const wereFriends = friendSnap.exists();

  const now = Date.now();

  // Atomic multi-path update:
  //   - Add block entry
  //   - Remove friendship both directions
  //   - Remove any outstanding friend request in either direction
  //   - Remove sent-request tracking in either direction
  await db().ref().update({
    [`blockedUsers/${blockerUid}/${targetUid}`]:       { blockedAt: now },
    [`friends/${blockerUid}/${targetUid}`]:            null,
    [`friends/${targetUid}/${blockerUid}`]:            null,
    [`friendRequests/${blockerUid}/${targetUid}`]:     null,
    [`friendRequests/${targetUid}/${blockerUid}`]:     null,
    [`sentFriendRequests/${blockerUid}/${targetUid}`]: null,
    [`sentFriendRequests/${targetUid}/${blockerUid}`]: null,
  });

  // Adjust friendsCount only if they were friends
  if (wereFriends) {
    await Promise.all([
      shiftCount(`users/${blockerUid}/friendsCount`, -1),
      shiftCount(`users/${targetUid}/friendsCount`,  -1),
    ]);
  }

  return { success: true };
});
