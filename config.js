// ============================================================
//  config.js — Insight Social Media
//  Firebase & Multi-Cloudinary Configuration (Sequential Fill)
//  
//  Firebase v11 Modular API
//  
//  Upload Method: UNSIGNED PRESET (no API key/secret needed)
//  
//  Strategy: Fill One Then Next
//  - Storage #1 fills up completely
//  - When full, switch to #2
//  - When #2 full, switch to #3
//  - ... until all 19 are exhausted
//  
//  Tracking: Uses Firebase RTDB to persist active storage index
//  across sessions and devices.
// ============================================================

// ============================================================
//  Firebase SDK Imports (Modular v11)
// ============================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-storage.js";

// ============================================================
//  Firebase Configuration
// ============================================================
const firebaseConfig = {
  apiKey: "AIzaSyDGIVcJLieXaxYwOpLLt5A9CwttF0GQzAI",
  authDomain: "vers-fe30a.firebaseapp.com",
  databaseURL: "https://vers-fe30a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vers-fe30a",
  storageBucket: "vers-fe30a.firebasestorage.app",
  messagingSenderId: "56765833106",
  appId: "1:56765833106:web:2b4bb51e904ba1d8262b4b",
  measurementId: "G-DCB633V1MG"
};

// ============================================================
//  Initialize Firebase (Modular)
// ============================================================
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);

// ============================================================
//  19 Cloudinary Storages (Sequential Fill)
//  
//  NOTE: Using UNSIGNED upload preset.
//  No API key or API secret required for uploads.
//  Just fill in cloudName and uploadPreset for each storage.
// ============================================================

const CLOUDINARY_STORAGES = [
  { id: 1,  cloudName: "dcjn736ic",        uploadPreset: "insight_upload" },
  { id: 2,  cloudName: "STORAGE_2_NAME",   uploadPreset: "insight_upload" },
  { id: 3,  cloudName: "STORAGE_3_NAME",   uploadPreset: "insight_upload" },
  { id: 4,  cloudName: "STORAGE_4_NAME",   uploadPreset: "insight_upload" },
  { id: 5,  cloudName: "STORAGE_5_NAME",   uploadPreset: "insight_upload" },
  { id: 6,  cloudName: "STORAGE_6_NAME",   uploadPreset: "insight_upload" },
  { id: 7,  cloudName: "STORAGE_7_NAME",   uploadPreset: "insight_upload" },
  { id: 8,  cloudName: "STORAGE_8_NAME",   uploadPreset: "insight_upload" },
  { id: 9,  cloudName: "STORAGE_9_NAME",   uploadPreset: "insight_upload" },
  { id: 10, cloudName: "STORAGE_10_NAME",  uploadPreset: "insight_upload" },
  { id: 11, cloudName: "STORAGE_11_NAME",  uploadPreset: "insight_upload" },
  { id: 12, cloudName: "STORAGE_12_NAME",  uploadPreset: "insight_upload" },
  { id: 13, cloudName: "STORAGE_13_NAME",  uploadPreset: "insight_upload" },
  { id: 14, cloudName: "STORAGE_14_NAME",  uploadPreset: "insight_upload" },
  { id: 15, cloudName: "STORAGE_15_NAME",  uploadPreset: "insight_upload" },
  { id: 16, cloudName: "STORAGE_16_NAME",  uploadPreset: "insight_upload" },
  { id: 17, cloudName: "STORAGE_17_NAME",  uploadPreset: "insight_upload" },
  { id: 18, cloudName: "STORAGE_18_NAME",  uploadPreset: "insight_upload" },
  { id: 19, cloudName: "STORAGE_19_NAME",  uploadPreset: "insight_upload" }
];

// ============================================================
//  Firebase RTDB Path for Tracking Active Storage
// ============================================================
const STORAGE_TRACKER_PATH = "system/cloudinary/activeStorage";
const STORAGE_USAGE_PATH = "system/cloudinary/usage";

// ============================================================
//  Detect if Cloudinary storage is FULL
// ============================================================
function isStorageFull(error) {
  if (!error) return false;

  const errorMessage = (error.message || error.error?.message || JSON.stringify(error)).toLowerCase();
  const errorCode = error.http_code || error.status || 0;

  if (errorCode === 413) return true;
  if (errorCode === 507) return true;
  if (errorCode === 400) {
    const fullIndicators = [
      'quota exceeded',
      'storage limit',
      'bandwidth limit',
      'account overquota',
      'resource limit',
      'plan limit',
      'usage limit',
      'credits exhausted',
      'transformation limit'
    ];
    return fullIndicators.some(indicator => errorMessage.includes(indicator));
  }

  const fullIndicators = [
    'quota exceeded',
    'storage limit exceeded',
    'bandwidth limit exceeded',
    'account overquota',
    'resource limit reached',
    'plan limit reached',
    'usage limit exceeded',
    'credits exhausted',
    'transformation limit',
    'insufficient storage',
    'upload limit',
    'free plan limit'
  ];

  return fullIndicators.some(indicator => errorMessage.includes(indicator));
}

// ============================================================
//  Get Active Storage Index from Firebase RTDB
// ============================================================
async function getActiveStorageIndex() {
  try {
    const snapshot = await get(ref(db, STORAGE_TRACKER_PATH));
    const data = snapshot.val();

    if (data && typeof data.index === "number") {
      return data.index;
    }
    return 0;
  } catch (err) {
    console.warn("Failed to read active storage from Firebase:", err);
    return 0;
  }
}

// ============================================================
//  Save Active Storage Index to Firebase RTDB
// ============================================================
async function saveActiveStorageIndex(index) {
  try {
    const storage = CLOUDINARY_STORAGES[index];
    await set(ref(db, STORAGE_TRACKER_PATH), {
      index: index,
      storageId: CLOUDINARY_STORAGES[index]?.id || 1,
      cloudName: CLOUDINARY_STORAGES[index]?.cloudName || "",
      updatedAt: Date.now()
    });
  } catch (err) {
    console.warn("Failed to save active storage to Firebase:", err);
  }
}

// ============================================================
//  Mark Storage as FULL in Firebase RTDB
// ============================================================
async function markStorageFull(index) {
  try {
    const storage = CLOUDINARY_STORAGES[index];
    await set(ref(db, `${STORAGE_USAGE_PATH}/${storage.id}`), {
      status: "full",
      markedAt: Date.now(),
      cloudName: storage.cloudName
    });
  } catch (err) {
    console.warn("Failed to mark storage as full:", err);
  }
}

// ============================================================
//  Upload file to Cloudinary (Sequential Fill)
//  
//  UNSIGNED PRESET — no API key/secret needed
// ============================================================
async function uploadToCloudinary(file) {
  const fileType = file.type;
  let resourceType = "auto";
  let finalType = "document";

  if (fileType.startsWith("video/")) {
    resourceType = "video";
    finalType = "video";
  } else if (fileType.startsWith("audio/")) {
    resourceType = "video";
    finalType = "audio";
  } else if (fileType.startsWith("image/")) {
    resourceType = "image";
    finalType = "picture";
  } else {
    resourceType = "raw";
    finalType = "document";
  }

  let currentIndex = await getActiveStorageIndex();
  let lastError = null;

  for (let i = 0; i < CLOUDINARY_STORAGES.length; i++) {
    const storageIndex = (currentIndex + i) % CLOUDINARY_STORAGES.length;
    const storage = CLOUDINARY_STORAGES[storageIndex];

    if (!storage.cloudName || storage.cloudName.includes("STORAGE_")) {
      continue;
    }

    try {
      const result = await tryUploadToStorage(file, storage, resourceType);

      return {
        success: true,
        url: result.url,
        type: finalType,
        public_id: result.public_id,
        format: result.format || null,
        bytes: result.bytes,
        originalName: file.name,
        uploadedAt: new Date().toISOString(),
        storageId: storage.id,
        storageCloudName: storage.cloudName,
        resourceType: resourceType
      };

    } catch (error) {
      lastError = error;

      if (isStorageFull(error)) {
        console.warn(`Storage ${storage.id} (${storage.cloudName}) is FULL. Moving to next...`);
        await markStorageFull(storageIndex);
        const nextIndex = storageIndex + 1;
        if (nextIndex < CLOUDINARY_STORAGES.length) {
          await saveActiveStorageIndex(nextIndex);
        }
        continue;
      }

      const isTemporaryError = error.http_code === 502 || error.http_code === 503 || error.http_code === 504;
      if (!isTemporaryError) {
        throw error;
      }

      console.warn(`Storage ${storage.id} temporary error. Retrying...`);
      continue;
    }
  }

  throw new Error(
    `All 19 Cloudinary storages are FULL. Last error: ${lastError?.message || "Unknown error"}`
  );
}

/**
 * Try uploading to a specific Cloudinary storage (UNSIGNED)
 */
async function tryUploadToStorage(file, storage, resourceType) {
  const url = `https://api.cloudinary.com/v1_1/${storage.cloudName}/${resourceType}/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", storage.uploadPreset);

  const response = await fetch(url, {
    method: "POST",
    body: formData
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.error?.message || `Upload failed: HTTP ${response.status}`);
    error.http_code = response.status;
    error.error = data.error;
    throw error;
  }

  if (!data.secure_url) {
    throw new Error("Upload response missing secure_url");
  }

  return {
    url: data.secure_url,
    public_id: data.public_id,
    format: data.format,
    bytes: data.bytes
  };
}

// ============================================================
//  Upload media and save metadata to Firebase
// ============================================================
async function uploadMediaAndSave(file, dbPath, extraMeta = {}) {
  const cloudinaryResult = await uploadToCloudinary(file);

  const fullData = {
    ...cloudinaryResult,
    ...extraMeta,
    savedAt: Date.now()
  };

  await set(ref(db, dbPath), fullData);

  return fullData;
}

/**
 * Upload multiple files (Sequential Fill)
 */
async function uploadMultipleFiles(files, baseDbPath, extraMeta = {}) {
  const results = [];
  for (const file of files) {
    const result = await uploadMediaAndSave(
      file,
      `${baseDbPath}/${Date.now()}`,
      extraMeta
    );
    results.push(result);
  }
  return results;
}

// ============================================================
//  Firebase Helpers (Modular API)
// ============================================================
async function writeData(path, data) {
  return set(ref(db, path), data);
}

async function readData(path) {
  const snapshot = await get(ref(db, path));
  return snapshot.val();
}

async function pushData(path, data) {
  const newRef = ref(db, path);
  // For push, we need to generate a key first
  const { push } = await import("https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js");
  const itemRef = push(newRef);
  await set(itemRef, data);
  return itemRef.key;
}

async function updateData(path, data) {
  const { update } = await import("https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js");
  return update(ref(db, path), data);
}

async function deleteData(path) {
  const { remove } = await import("https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js");
  return remove(ref(db, path));
}

async function onDataChange(path, callback) {
  const { onValue } = await import("https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js");
  return onValue(ref(db, path), (snapshot) => {
    callback(snapshot.val(), snapshot.key);
  });
}

async function offDataChange(path) {
  const { off } = await import("https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js");
  off(ref(db, path));
}

// ============================================================
//  Common Database Paths
// ============================================================
const DB_PATHS = {
  users:         "users",
  posts:         "posts",
  comments:      "comments",
  likes:         "likes",
  messages:      "messages",
  chats:         "chats",
  stories:       "stories",
  notifications: "notifications",
  settings:      "settings",
  searchHistory: "searchHistory",
  postIndex:     "postIndex"
};

// ============================================================
//  Export for ES modules
// ============================================================
export {
  firebaseConfig,
  app,
  auth,
  db,
  storage,
  CLOUDINARY_STORAGES,
  uploadToCloudinary,
  uploadMediaAndSave,
  uploadMultipleFiles,
  writeData,
  readData,
  pushData,
  updateData,
  deleteData,
  onDataChange,
  offDataChange,
  DB_PATHS
};
