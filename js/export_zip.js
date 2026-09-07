/**
 * export_zip.js - Package Audio Recordings into ZIP Dataset
 * Clean, minimal, synchronized with stt_app
 */

import { getAllRecordings } from './storage.js';

export async function exportDatasetZip(onProgress) {
  const recordings = await getAllRecordings();
  if (!recordings || recordings.length === 0) {
    throw new Error('NO_DATA');
  }

  if (typeof JSZip === 'undefined') {
    throw new Error('JSZip library is not loaded');
  }

  const zip = new JSZip();
  const audioFolder = zip.folder("audio");

  // Prepare CSV header (UTF-8 BOM: \uFEFF)
  let csvContent = "\uFEFFfile_path,script_id,reference_text,lang,category,notes,speaker,gender,duration_sec,recorded_at\n";

  const metadataList = [];

  for (let i = 0; i < recordings.length; i++) {
    const item = recordings[i];
    if (onProgress) {
      onProgress(i + 1, recordings.length);
    }

    // Clean filename
    const safeSpeaker = (item.speaker || 'user').replace(/[^a-zA-Z0-9_\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\u0e00-\u0e7f]/g, '_');
    const filename = `${item.scriptId}_${safeSpeaker}.wav`;

    // Add audio file
    audioFolder.file(filename, item.audioBlob);

    // Escape CSV text
    const escapedText = `"${(item.scriptText || '').replace(/"/g, '""')}"`;
    const escapedNotes = `"${(item.customNote || '').replace(/"/g, '""')}"`;
    const escapedSpeaker = `"${(item.speaker || '').replace(/"/g, '""')}"`;
    const genderVal = item.gender || "";

    csvContent += `audio/${filename},${item.scriptId},${escapedText},${item.lang},${item.category},${escapedNotes},${escapedSpeaker},${genderVal},${item.durationSec},${item.timestamp}\n`;

    metadataList.push({
      filename: `audio/${filename}`,
      scriptId: item.scriptId,
      lang: item.lang,
      category: item.category,
      referenceText: item.scriptText,
      notes: item.customNote || "",
      speaker: item.speaker || "",
      gender: genderVal,
      durationSec: item.durationSec,
      sampleRate: item.sampleRate || 16000,
      bitsPerSample: item.bitsPerSample || 16,
      channels: item.channels || 1,
      recordedAt: item.timestamp,
      deviceInfo: item.deviceInfo || {}
    });
  }

  // Add metadata.json
  const metadataJson = JSON.stringify({
    datasetTitle: "VoiceCollector Audio Dataset",
    createdAt: new Date().toISOString(),
    totalRecordings: recordings.length,
    audioFormat: {
      codec: "PCM_S16LE",
      sampleRate: 16000,
      channels: 1,
      bits: 16
    },
    recordings: metadataList
  }, null, 2);
  zip.file("metadata.json", metadataJson);

  // Add dataset.csv
  zip.file("dataset.csv", csvContent);

  // Add README.txt
  const readmeContent = `===============================================================
VoiceCollector - 音声収集データセット
===============================================================
作成日時: ${new Date().toLocaleString()}
総録音件数: ${recordings.length} 件

【収録内容】
- audio/        : 16kHz / 16-bit / モノラル WAV 音声ファイル
- dataset.csv   : 読み上げテキスト対照表
- metadata.json : 話者・端末・詳細メタデータ

【音声スペック】
- Format: WAV (RIFF)
- Encoding: 16-bit Linear PCM
- Sample Rate: 16,000 Hz
- Channels: 1 (Mono)
`;
  zip.file("README.txt", readmeContent);

  // Generate zip file
  const zipBlob = await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: { level: 6 }
  });

  const dateStr = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const zipFilename = `voice_collector_dataset_${dateStr}.zip`;

  return { blob: zipBlob, filename: zipFilename };
}

/**
 * Trigger browser file download
 */
export function triggerBlobDownload(blob, filename) {
  const downloadUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000);
}
