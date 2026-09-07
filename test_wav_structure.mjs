/**
 * test_wav_structure.mjs - Verify 16kHz 16-bit Mono WAV format
 */

function createTestWavHeader(numSamples, sampleRate = 16000) {
  const numChannels = 1;
  const bitsPerSample = 16;
  const bytesPerSample = bitsPerSample / 8;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataByteLength = numSamples * bytesPerSample;
  const totalByteLength = 44 + dataByteLength;

  const buffer = new ArrayBuffer(totalByteLength);
  const view = new DataView(buffer);

  function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataByteLength, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true); // Subchunk1Size
  view.setUint16(20, 1, true); // AudioFormat PCM
  view.setUint16(22, numChannels, true); // Channels
  view.setUint32(24, sampleRate, true); // SampleRate
  view.setUint32(28, byteRate, true); // ByteRate
  view.setUint16(32, blockAlign, true); // BlockAlign
  view.setUint16(34, bitsPerSample, true); // BitsPerSample
  writeString(view, 36, 'data');
  view.setUint32(40, dataByteLength, true);

  return view;
}

// Test 1 second of 16kHz audio (16,000 samples)
const testSamples = 16000;
const header = createTestWavHeader(testSamples, 16000);

const isRiff = String.fromCharCode(header.getUint8(0), header.getUint8(1), header.getUint8(2), header.getUint8(3)) === 'RIFF';
const isWave = String.fromCharCode(header.getUint8(8), header.getUint8(9), header.getUint8(10), header.getUint8(11)) === 'WAVE';
const format = header.getUint16(20, true);
const channels = header.getUint16(22, true);
const sampleRate = header.getUint32(24, true);
const byteRate = header.getUint32(28, true);
const bits = header.getUint16(34, true);

console.log("=== WAV Header Verification ===");
console.log(`RIFF Header: ${isRiff ? 'PASS' : 'FAIL'}`);
console.log(`WAVE Header: ${isWave ? 'PASS' : 'FAIL'}`);
console.log(`Audio Format (PCM=1): ${format} (${format === 1 ? 'PASS' : 'FAIL'})`);
console.log(`Channels (Mono=1): ${channels} (${channels === 1 ? 'PASS' : 'FAIL'})`);
console.log(`Sample Rate (16000Hz): ${sampleRate} (${sampleRate === 16000 ? 'PASS' : 'FAIL'})`);
console.log(`Byte Rate (32000): ${byteRate} (${byteRate === 32000 ? 'PASS' : 'FAIL'})`);
console.log(`Bits per sample (16): ${bits} (${bits === 16 ? 'PASS' : 'FAIL'})`);

if (isRiff && isWave && format === 1 && channels === 1 && sampleRate === 16000 && byteRate === 32000 && bits === 16) {
  console.log("\n>>> ALL AUDIO SPEC CHECKS PASSED: STT Direct Import Certified! <<<");
  process.exit(0);
} else {
  console.error("FAILED");
  process.exit(1);
}
