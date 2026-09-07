/**
 * storage.js - IndexedDB Persistent Storage for Audio Recordings
 * Automatically stores 16kHz WAV Blobs, metadata, and handles persistence
 */

const DB_NAME = 'VoiceCollectorDB';
const DB_VERSION = 1;
const STORE_NAME = 'recordings';

let dbInstance = null;

export function initDB() {
  return new Promise((resolve, reject) => {
    if (dbInstance) {
      resolve(dbInstance);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('scriptId', 'scriptId', { unique: false });
        store.createIndex('lang', 'lang', { unique: false });
        store.createIndex('category', 'category', { unique: false });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };

    request.onsuccess = (event) => {
      dbInstance = event.target.result;
      resolve(dbInstance);
    };

    request.onerror = (event) => {
      console.error('IndexedDB open error:', event.target.error);
      reject(event.target.error);
    };
  });
}

/**
 * Save or update a recording take
 */
export async function saveRecording(record) {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(record);

    req.onsuccess = () => resolve(record);
    req.onerror = (e) => reject(e.target.error);
  });
}

/**
 * Get all recordings ordered by timestamp desc
 */
export async function getAllRecordings() {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAll();

    req.onsuccess = () => {
      const results = req.result || [];
      // Sort newest first
      results.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      resolve(results);
    };
    req.onerror = (e) => reject(e.target.error);
  });
}

/**
 * Get recorded takes mapped by scriptId
 */
export async function getRecordedMap() {
  const all = await getAllRecordings();
  const map = {};
  for (const item of all) {
    if (!map[item.scriptId]) {
      map[item.scriptId] = item; // Store latest
    }
  }
  return map;
}

/**
 * Delete a specific recording by ID
 */
export async function deleteRecording(id) {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(id);

    req.onsuccess = () => resolve(true);
    req.onerror = (e) => reject(e.target.error);
  });
}

/**
 * Clear all recordings
 */
export async function clearAllRecordings() {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.clear();

    req.onsuccess = () => resolve(true);
    req.onerror = (e) => reject(e.target.error);
  });
}
