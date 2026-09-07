/**
 * audio_recorder.js - Web Audio API High Quality 16kHz PCM WAV Recorder
 * Features:
 * - Dynamic AudioContext resampling to exact 16,000 Hz / 16-bit / Mono PCM WAV
 * - Real-time animated canvas oscilloscope (waveform visualizer)
 * - Volume peak detection
 * - Direct STT input compatibility (Whisper, Sherpa-onnx, Gemma)
 */

export class AudioRecorder {
  constructor() {
    this.audioCtx = null;
    this.stream = null;
    this.sourceNode = null;
    this.processorNode = null;
    this.analyserNode = null;
    this.pcmDataBuffers = [];
    this.isRecording = false;
    this.startTime = 0;
    this.timerInterval = null;
    this.targetSampleRate = 16000;
    this.animationFrameId = null;
    this.canvas = null;
    this.canvasCtx = null;
  }

  setVisualizerCanvas(canvasElement) {
    this.canvas = canvasElement;
    this.canvasCtx = canvasElement.getContext('2d');
  }

  async initMic() {
    if (this.stream) return true;
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        }
      });
      return true;
    } catch (err) {
      console.error("Microphone access error:", err);
      throw err;
    }
  }

  async startRecording(onTimerUpdate) {
    await this.initMic();

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = new AudioContextClass();

    if (this.audioCtx.state === 'suspended') {
      await this.audioCtx.resume();
    }

    this.sourceNode = this.audioCtx.createMediaStreamSource(this.stream);
    
    // Analyser for visualization
    this.analyserNode = this.audioCtx.createAnalyser();
    this.analyserNode.fftSize = 2048;
    this.sourceNode.connect(this.analyserNode);

    // Audio processor buffer
    const bufferSize = 4096;
    if (this.audioCtx.createScriptProcessor) {
      this.processorNode = this.audioCtx.createScriptProcessor(bufferSize, 1, 1);
    } else {
      // Fallback
      this.processorNode = this.audioCtx.createJavaScriptNode(bufferSize, 1, 1);
    }

    this.pcmDataBuffers = [];
    this.isRecording = true;
    this.startTime = Date.now();

    this.processorNode.onaudioprocess = (e) => {
      if (!this.isRecording) return;
      const inputBuffer = e.inputBuffer.getChannelData(0);
      // Copy float buffer
      this.pcmDataBuffers.push(new Float32Array(inputBuffer));
    };

    this.sourceNode.connect(this.processorNode);
    this.processorNode.connect(this.audioCtx.destination);

    // Start timer
    if (onTimerUpdate) {
      this.timerInterval = setInterval(() => {
        const elapsedMs = Date.now() - this.startTime;
        onTimerUpdate(elapsedMs);
      }, 50);
    }

    // Start visualizer animation
    if (this.canvas) {
      this._startVisualizer();
    }
  }

  stopRecording() {
    return new Promise((resolve) => {
      if (!this.isRecording) {
        resolve(null);
        return;
      }
      this.isRecording = false;

      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }

      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
      this._drawIdleVisualizer();

      const elapsedSec = (Date.now() - this.startTime) / 1000;

      // Disconnect nodes
      try {
        if (this.processorNode) {
          this.processorNode.disconnect();
          this.processorNode.onaudioprocess = null;
        }
        if (this.sourceNode) {
          this.sourceNode.disconnect();
        }
      } catch (e) {
        console.warn("Disconnect error", e);
      }

      const inputSampleRate = this.audioCtx ? this.audioCtx.sampleRate : 48000;

      // Process PCM data in background or immediately
      setTimeout(async () => {
        const mergedBuffer = this._mergeBuffers(this.pcmDataBuffers);
        // Resample merged buffer from inputSampleRate to 16,000 Hz
        const resampled16k = this._resampleTo16k(mergedBuffer, inputSampleRate, this.targetSampleRate);
        // Encode to 16-bit PCM WAV
        const wavBlob = this._encodeWAV(resampled16k, this.targetSampleRate);

        if (this.audioCtx && this.audioCtx.state !== 'closed') {
          await this.audioCtx.close();
          this.audioCtx = null;
        }

        resolve({
          blob: wavBlob,
          durationSec: parseFloat(elapsedSec.toFixed(2)),
          sampleRate: this.targetSampleRate,
          channels: 1,
          bitsPerSample: 16
        });
      }, 50);
    });
  }

  _mergeBuffers(buffers) {
    let totalLength = 0;
    for (let i = 0; i < buffers.length; i++) {
      totalLength += buffers[i].length;
    }
    const result = new Float32Array(totalLength);
    let offset = 0;
    for (let i = 0; i < buffers.length; i++) {
      result.set(buffers[i], offset);
      offset += buffers[i].length;
    }
    return result;
  }

  /**
   * Resample Float32Array from sourceSampleRate to 16,000 Hz using linear interpolation
   */
  _resampleTo16k(buffer, fromRate, toRate = 16000) {
    if (fromRate === toRate) {
      return buffer;
    }
    const ratio = fromRate / toRate;
    const newLength = Math.round(buffer.length / ratio);
    const result = new Float32Array(newLength);
    
    for (let i = 0; i < newLength; i++) {
      const originalPos = i * ratio;
      const index = Math.floor(originalPos);
      const decimal = originalPos - index;
      
      const sample1 = buffer[index] || 0;
      const sample2 = buffer[index + 1] !== undefined ? buffer[index + 1] : sample1;
      
      result[i] = sample1 + (sample2 - sample1) * decimal;
    }
    return result;
  }

  /**
   * Create RIFF WAV (16-bit PCM Mono) File Blob
   */
  _encodeWAV(samples, sampleRate = 16000) {
    const numChannels = 1;
    const bitsPerSample = 16;
    const bytesPerSample = bitsPerSample / 8;
    const blockAlign = numChannels * bytesPerSample;
    const byteRate = sampleRate * blockAlign;
    const dataByteLength = samples.length * bytesPerSample;
    const headerByteLength = 44;
    const totalByteLength = headerByteLength + dataByteLength;

    const buffer = new ArrayBuffer(totalByteLength);
    const view = new DataView(buffer);

    // 0..3 "RIFF"
    this._writeString(view, 0, 'RIFF');
    // 4..7 file size - 8
    view.setUint32(4, 36 + dataByteLength, true);
    // 8..11 "WAVE"
    this._writeString(view, 8, 'WAVE');
    // 12..15 "fmt "
    this._writeString(view, 12, 'fmt ');
    // 16..19 Subchunk1Size (16 for PCM)
    view.setUint32(16, 16, true);
    // 20..21 AudioFormat (1 = PCM)
    view.setUint16(20, 1, true);
    // 22..23 NumChannels (1 = Mono)
    view.setUint16(22, numChannels, true);
    // 24..27 SampleRate (16000)
    view.setUint32(24, sampleRate, true);
    // 28..31 ByteRate (16000 * 1 * 2 = 32000)
    view.setUint32(28, byteRate, true);
    // 32..33 BlockAlign (2)
    view.setUint16(32, blockAlign, true);
    // 34..35 BitsPerSample (16)
    view.setUint16(34, bitsPerSample, true);
    // 36..39 "data"
    this._writeString(view, 36, 'data');
    // 40..43 data length
    view.setUint32(40, dataByteLength, true);

    // Write PCM 16-bit signed integer samples
    let offset = 44;
    for (let i = 0; i < samples.length; i++, offset += 2) {
      let s = Math.max(-1, Math.min(1, samples[i]));
      // Convert to 16-bit signed integer
      s = s < 0 ? s * 0x8000 : s * 0x7FFF;
      view.setInt16(offset, s, true);
    }

    return new Blob([view], { type: 'audio/wav' });
  }

  _writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  _startVisualizer() {
    if (!this.analyserNode || !this.canvas || !this.canvasCtx) return;

    const bufferLength = this.analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const canvas = this.canvas;
    const ctx = this.canvasCtx;

    const draw = () => {
      if (!this.isRecording) return;
      this.animationFrameId = requestAnimationFrame(draw);

      this.analyserNode.getByteTimeDomainData(dataArray);

      ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2.5;
      
      // Gradient stroke
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, '#06b6d4'); // Cyan
      gradient.addColorStop(0.5, '#10b981'); // Emerald
      gradient.addColorStop(1, '#6366f1'); // Indigo
      ctx.strokeStyle = gradient;

      ctx.beginPath();
      const sliceWidth = canvas.width * 1.0 / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * (canvas.height / 2);

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };

    draw();
  }

  _drawIdleVisualizer() {
    if (!this.canvas || !this.canvasCtx) return;
    const ctx = this.canvasCtx;
    const canvas = this.canvas;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Center idle line
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}
