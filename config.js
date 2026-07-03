// ============================================================
//  config.js — Insight Social Media
//  সব পেইজে এই ফাইলটা <script> দিয়ে লোড করতে হবে
// ============================================================
// ─── Firebase ───────────────────────────────────────────────
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";
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
export const app  = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db   = getDatabase(app);
// ─── Cloudinary ─────────────────────────────────────────────
export const CLOUDINARY = {
  cloudName:    "dcjn736ic",
  uploadPreset: "insight_upload",
  uploadURL:    "https://api.cloudinary.com/v1_1/dcjn736ic/auto/upload"
};
// ─── Cloudinary আপলোড হেল্পার ───────────────────────────────
/**
 * যেকোনো ফাইল Cloudinary-তে আপলোড করে public URL রিটার্ন করে।
 *
 * @param {File}   file          — input[type=file] থেকে পাওয়া ফাইল
 * @param {string} folder        — সাব-ফোল্ডার (যেমন "posts", "avatars")
 * @param {function} onProgress  — (percent) => {}  [optional]
 * @returns {Promise<{url, publicId, resourceType}>}
 *
 * ব্যবহার (যেকোনো পেইজে):
 *   import { uploadToCloudinary } from "./config.js";
 *   const { url } = await uploadToCloudinary(file, "posts");
 */
export async function uploadToCloudinary(file, folder = "general", onProgress = null) {
  const formData = new FormData();
  formData.append("file",          file);
  formData.append("upload_preset", CLOUDINARY.uploadPreset);
  formData.append("folder",        `insight/${folder}`);
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", CLOUDINARY.uploadURL);
    if (onProgress) {
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          onProgress(Math.round((e.loaded / e.total) * 100));
        }
      });
    }
    xhr.onload = () => {
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.responseText);
        resolve({
          url:          res.secure_url,
          publicId:     res.public_id,
          resourceType: res.resource_type   // "image" | "video" | "raw"
        });
      } else {
        reject(new Error(`Cloudinary upload failed: ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => reject(new Error("Network error during upload"));
    xhr.send(formData);
  });
}
