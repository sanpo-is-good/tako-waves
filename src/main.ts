import "./style.css";

type Family = "drum" | "bass" | "chord" | "lead";
type Point = { x: number; y: number };
type Pad = { name: string; family: Family; color: string; key: string; freq: number };
type PhraseNote = { step: number; semi?: number; velocity: number; duration?: number; drum?: number };
type Ripple = { pad: number; family: Family; color: string; x: number; y: number; born: number; power: number; seed: number };
type LoopEvent = { step: number; pad: number; velocity: number };

const pads: Pad[] = [
  { name: "KICK RUN", family: "drum", color: "#ff5c35", key: "1", freq: 48 },
  { name: "SNARE DRAG", family: "drum", color: "#ff7a45", key: "2", freq: 178 },
  { name: "HAT SKIP", family: "drum", color: "#ff9c5a", key: "3", freq: 720 },
  { name: "CLAP TURN", family: "drum", color: "#ffbd68", key: "4", freq: 260 },
  { name: "BELL POLY", family: "drum", color: "#ffd66f", key: "5", freq: 880 },
  { name: "BASS WALK", family: "bass", color: "#75e8c2", key: "q", freq: 65.41 },
  { name: "BASS BOUNCE", family: "bass", color: "#51dfbf", key: "w", freq: 73.42 },
  { name: "BASS CLIMB", family: "bass", color: "#35d6ba", key: "e", freq: 82.41 },
  { name: "BASS SYNC", family: "bass", color: "#20cbb5", key: "r", freq: 98 },
  { name: "BASS DROP", family: "bass", color: "#10bdad", key: "t", freq: 110 },
  { name: "CHORD PULSE", family: "chord", color: "#6fb8ff", key: "a", freq: 130.81 },
  { name: "CHORD GLASS", family: "chord", color: "#809fff", key: "s", freq: 146.83 },
  { name: "CHORD RISE", family: "chord", color: "#9489ff", key: "d", freq: 164.81 },
  { name: "CHORD FALL", family: "chord", color: "#aa76ff", key: "f", freq: 174.61 },
  { name: "CHORD WAVE", family: "chord", color: "#bd68ef", key: "g", freq: 196 },
  { name: "LEAD CALL", family: "lead", color: "#ff70b7", key: "z", freq: 523.25 },
  { name: "LEAD ANSWER", family: "lead", color: "#f45ec1", key: "x", freq: 587.33 },
  { name: "LEAD SPARK", family: "lead", color: "#e74dcc", key: "c", freq: 659.25 },
  { name: "LEAD ORBIT", family: "lead", color: "#d83bd8", key: "v", freq: 783.99 },
  { name: "LEAD CASCADE", family: "lead", color: "#c52de5", key: "b", freq: 880 },
];

const phrases: PhraseNote[][] = [
  [{ step: 0, drum: 0, velocity: 1 }, { step: 2, drum: 0, velocity: .68 }, { step: 3, drum: 2, velocity: .42 }, { step: 5, drum: 0, velocity: .82 }, { step: 7, drum: 1, velocity: .58 }],
  [{ step: 0, drum: 1, velocity: 1 }, { step: 1.5, drum: 1, velocity: .35 }, { step: 2, drum: 2, velocity: .45 }, { step: 3, drum: 1, velocity: .62 }, { step: 3.5, drum: 1, velocity: .4 }],
  [0, 1, 2.5, 3, 4.5, 5, 6, 7.5].map((step, i) => ({ step, drum: 2, velocity: i % 3 === 0 ? .92 : .46 })),
  [{ step: 0, drum: 3, velocity: 1 }, { step: 2, drum: 2, velocity: .38 }, { step: 3, drum: 3, velocity: .55 }, { step: 5.5, drum: 3, velocity: .72 }, { step: 7, drum: 1, velocity: .46 }],
  [{ step: 0, drum: 4, semi: 0, velocity: .85 }, { step: 3, drum: 4, semi: 7, velocity: .55 }, { step: 5, drum: 4, semi: 12, velocity: .7 }, { step: 7, drum: 4, semi: 3, velocity: .48 }],
  [{ step: 0, semi: 0, velocity: 1 }, { step: 2, semi: 0, velocity: .7 }, { step: 3, semi: 3, velocity: .82 }, { step: 5, semi: 5, velocity: .66 }, { step: 7, semi: 7, velocity: .88 }],
  [{ step: 0, semi: 0, velocity: .9 }, { step: 1.5, semi: 7, velocity: .58 }, { step: 3, semi: 5, velocity: .8 }, { step: 4, semi: 0, velocity: .65 }, { step: 6.5, semi: 10, velocity: .8 }],
  [{ step: 0, semi: 0, velocity: .82 }, { step: 1, semi: 2, velocity: .58 }, { step: 2, semi: 3, velocity: .7 }, { step: 3, semi: 5, velocity: .78 }, { step: 4, semi: 7, velocity: .92 }, { step: 6, semi: 12, velocity: .64 }],
  [{ step: 0, semi: 0, velocity: .94 }, { step: 2.5, semi: 7, velocity: .64 }, { step: 4, semi: 0, velocity: .76 }, { step: 5.5, semi: 10, velocity: .68 }, { step: 7, semi: 5, velocity: .82 }],
  [{ step: 0, semi: 12, velocity: .92 }, { step: 1, semi: 7, velocity: .6 }, { step: 3, semi: 3, velocity: .75 }, { step: 4.5, semi: 0, velocity: .86 }, { step: 7, semi: -5, velocity: .68 }],
  [{ step: 0, semi: 0, velocity: .85, duration: 2 }, { step: 4, semi: 7, velocity: .64, duration: 2 }, { step: 7, semi: 12, velocity: .5, duration: 1 }],
  [{ step: 0, semi: 0, velocity: .78, duration: 1.5 }, { step: 2, semi: 3, velocity: .52 }, { step: 4, semi: 7, velocity: .65, duration: 1.5 }, { step: 6, semi: 10, velocity: .5 }],
  [{ step: 0, semi: 0, velocity: .68 }, { step: 1, semi: 3, velocity: .56 }, { step: 2, semi: 7, velocity: .62 }, { step: 3, semi: 12, velocity: .76 }, { step: 5, semi: 15, velocity: .5 }, { step: 7, semi: 19, velocity: .58 }],
  [{ step: 0, semi: 12, velocity: .72 }, { step: 1, semi: 7, velocity: .58 }, { step: 2, semi: 3, velocity: .64 }, { step: 3, semi: 0, velocity: .8 }, { step: 5, semi: -5, velocity: .55 }, { step: 7, semi: -12, velocity: .48 }],
  [{ step: 0, semi: 0, velocity: .78, duration: 3 }, { step: 3, semi: 5, velocity: .54, duration: 2 }, { step: 6, semi: 7, velocity: .68, duration: 2 }],
  [{ step: 0, semi: 0, velocity: .9 }, { step: 1.5, semi: 3, velocity: .6 }, { step: 3, semi: 7, velocity: .78 }, { step: 5, semi: 10, velocity: .55 }, { step: 7, semi: 7, velocity: .66 }],
  [{ step: 0, semi: 12, velocity: .72 }, { step: 2, semi: 7, velocity: .62 }, { step: 3.5, semi: 5, velocity: .55 }, { step: 5, semi: 3, velocity: .75 }, { step: 7, semi: 0, velocity: .86 }],
  [{ step: 0, semi: 0, velocity: .82 }, { step: .5, semi: 7, velocity: .44 }, { step: 2, semi: 12, velocity: .72 }, { step: 3, semi: 15, velocity: .48 }, { step: 4.5, semi: 19, velocity: .65 }, { step: 7, semi: 12, velocity: .58 }],
  [{ step: 0, semi: 0, velocity: .78 }, { step: 2, semi: 5, velocity: .55 }, { step: 3, semi: 12, velocity: .82 }, { step: 4, semi: 7, velocity: .62 }, { step: 6, semi: 14, velocity: .72 }, { step: 7.5, semi: 19, velocity: .45 }],
  [0, 1, 2, 3, 4, 5, 6, 7].map((step, i) => ({ step, semi: [12, 7, 3, 0, 3, 7, 12, 15][i], velocity: .84 - i * .045 })),
];

const app = document.querySelector<HTMLElement>("#app")!;
const visualCanvas = document.querySelector<HTMLCanvasElement>("#visualCanvas")!;
const sourceCanvas = document.querySelector<HTMLCanvasElement>("#sourceCanvas")!;
const visual = visualCanvas.getContext("2d")!;
const sourceView = sourceCanvas.getContext("2d")!;
const analysisCanvas = document.createElement("canvas");
const analysis = analysisCanvas.getContext("2d", { willReadFrequently: true })!;
const localVideo = document.createElement("video");
localVideo.muted = true;
localVideo.playsInline = true;
localVideo.autoplay = true;

const state = {
  audio: null as AudioContext | null,
  master: null as GainNode | null,
  noise: null as AudioBuffer | null,
  started: false,
  bpm: 108,
  quantize: true,
  transportStart: 0,
  lastStep: -1,
  loopRecording: false,
  loopPlaying: false,
  loopEvents: [] as LoopEvent[],
  bgmEnabled: true,
  ripples: [] as Ripple[],
  sensitivity: 17,
  zoneRadius: 0.035,
  corners: [{ x: 0.12, y: 0.16 }, { x: 0.88, y: 0.16 }, { x: 0.88, y: 0.84 }, { x: 0.12, y: 0.84 }] as Point[],
  calibrationStep: -1,
  baseline: [] as number[][],
  padLevels: new Array(20).fill(0) as number[],
  armed: new Array(20).fill(true) as boolean[],
  lastTriggers: new Array(20).fill(0) as number[],
  inputMode: "demo" as "demo" | "camera" | "vdo",
  sourceReady: false,
  latestFrame: null as CanvasImageSource | null,
  vdoFramePending: false,
  streamId: "",
  frameTimer: 0,
  panelHidden: false,
};

function resizeCanvases() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  visualCanvas.width = Math.round(window.innerWidth * dpr);
  visualCanvas.height = Math.round(window.innerHeight * dpr);
  visualCanvas.style.width = `${window.innerWidth}px`;
  visualCanvas.style.height = `${window.innerHeight}px`;
  visual.setTransform(dpr, 0, 0, dpr, 0, 0);
  sourceCanvas.width = 640;
  sourceCanvas.height = 360;
  analysisCanvas.width = 320;
  analysisCanvas.height = 180;
}

function bilinearPoint(index: number): Point {
  const u = (index % 5) / 4;
  const v = Math.floor(index / 5) / 3;
  const [tl, tr, br, bl] = state.corners;
  const top = { x: tl.x + (tr.x - tl.x) * u, y: tl.y + (tr.y - tl.y) * u };
  const bottom = { x: bl.x + (br.x - bl.x) * u, y: bl.y + (br.y - bl.y) * u };
  return { x: top.x + (bottom.x - top.x) * v, y: top.y + (bottom.y - top.y) * v };
}

function makeNoise(audio: AudioContext) {
  const buffer = audio.createBuffer(1, audio.sampleRate * 1.2, audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
}

async function startAudio() {
  if (!state.audio) {
    const audio = new AudioContext();
    const master = audio.createGain();
    const compressor = audio.createDynamicsCompressor();
    master.gain.value = 0.72;
    master.connect(compressor).connect(audio.destination);
    state.audio = audio;
    state.master = master;
    state.noise = makeNoise(audio);
    state.transportStart = audio.currentTime;
  }
  await state.audio.resume();
  state.started = true;
  document.querySelector("#startOverlay")?.classList.add("is-hidden");
  document.querySelector("#audioStatus")!.textContent = "AUDIO ON";
}

function envGain(at: number, peak: number, duration: number) {
  const gain = state.audio!.createGain();
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.001, peak), at + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);
  gain.connect(state.master!);
  return gain;
}

function playTone(freq: number, type: OscillatorType, at: number, duration: number, level: number, detune = 0) {
  const audio = state.audio!;
  const osc = audio.createOscillator();
  const filter = audio.createBiquadFilter();
  const gain = envGain(at, level, duration);
  osc.type = type;
  osc.frequency.value = freq;
  osc.detune.value = detune;
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(type === "sawtooth" ? 1250 : 4200, at);
  filter.frequency.exponentialRampToValueAtTime(320, at + duration);
  osc.connect(filter).connect(gain);
  osc.start(at);
  osc.stop(at + duration + 0.04);
}

function playDrum(index: number, at: number, velocity: number, semi = 0) {
  const audio = state.audio!;
  if (index === 0) {
    const osc = audio.createOscillator();
    const gain = envGain(at, 0.9 * velocity, 0.36);
    osc.type = "sine";
    osc.frequency.setValueAtTime(150, at);
    osc.frequency.exponentialRampToValueAtTime(43, at + 0.18);
    osc.connect(gain);
    osc.start(at);
    osc.stop(at + 0.4);
    return;
  }
  const noise = audio.createBufferSource();
  noise.buffer = state.noise;
  const filter = audio.createBiquadFilter();
  const gain = envGain(at, (index === 2 ? 0.2 : 0.34) * velocity, index === 2 ? 0.09 : 0.24);
  filter.type = index === 2 ? "highpass" : "bandpass";
  filter.frequency.value = pads[index].freq * (index === 2 ? 7 : 4);
  filter.Q.value = index === 4 ? 8 : 1.2;
  noise.connect(filter).connect(gain);
  noise.start(at);
  noise.stop(at + 0.28);
  if (index === 4) playTone(pads[index].freq * 2 ** (semi / 12), "sine", at, 0.44, velocity * 0.25, 6);
}

function playVoice(index: number, at: number, velocity: number, semi = 0, duration = 0) {
  const pad = pads[index];
  const freq = pad.freq * 2 ** (semi / 12);
  if (pad.family === "drum") playDrum(index, at, velocity, semi);
  if (pad.family === "bass") playTone(freq, "sawtooth", at, duration || 0.34, 0.22 * velocity, -5);
  if (pad.family === "chord") {
    const minor = index === 11 || index === 12;
    [1, minor ? 1.1892 : 1.2599, 1.4983].forEach((ratio, voice) => playTone(freq * ratio, "triangle", at + voice * 0.008, duration || 0.72, 0.075 * velocity, voice * 3));
  }
  if (pad.family === "lead") playTone(freq, "sine", at, duration || 0.3, 0.15 * velocity, 3);
}

function playPhrase(index: number, at: number, velocity: number) {
  const stepSeconds = 60 / state.bpm / 4;
  phrases[index].forEach((note, noteIndex) => {
    const noteAt = at + note.step * stepSeconds;
    const noteVelocity = velocity * note.velocity;
    if (pads[index].family === "drum") playDrum(note.drum ?? index, noteAt, noteVelocity, note.semi || 0);
    else playVoice(index, noteAt, noteVelocity, note.semi || 0, (note.duration || 1.25) * stepSeconds);
    window.setTimeout(() => addRipple(index, noteIndex ? noteVelocity * .66 : noteVelocity), Math.max(0, (noteAt - state.audio!.currentTime) * 1000));
  });
}

function currentStep() {
  if (!state.audio) return 0;
  return Math.floor((state.audio.currentTime - state.transportStart) / (60 / state.bpm / 4));
}

function triggerPad(index: number, velocity = 1, fromLoop = false) {
  if (!state.started) void startAudio();
  if (!state.audio || !state.master) return;
  const stepSeconds = 60 / state.bpm / 4;
  const rawStep = (state.audio.currentTime - state.transportStart) / stepSeconds;
  const scheduledStep = state.quantize ? Math.ceil(rawStep + 0.035) : rawStep;
  const at = state.transportStart + scheduledStep * stepSeconds;
  playPhrase(index, Math.max(state.audio.currentTime, at), velocity);
  if (state.loopRecording && !fromLoop) {
    state.loopEvents.push({ step: ((Math.round(scheduledStep) % 32) + 32) % 32, pad: index, velocity });
    updateLoopCount();
  }
}

function addRipple(index: number, power: number) {
  const point = bilinearPoint(index);
  state.ripples.push({ pad: index, family: pads[index].family, color: pads[index].color, x: point.x, y: point.y, born: performance.now(), power, seed: Math.random() * 1000 });
  document.querySelector(`[data-pad="${index}"]`)?.classList.add("is-hit");
  window.setTimeout(() => document.querySelector(`[data-pad="${index}"]`)?.classList.remove("is-hit"), 150);
}

function transportTick() {
  if (!state.audio || !state.started) return;
  const step = currentStep();
  if (step === state.lastStep) return;
  state.lastStep = step;
  if (state.bgmEnabled) playBackgroundStep(step, state.audio.currentTime + 0.018);
  if (state.loopPlaying && state.loopEvents.length) {
    const loopStep = ((step % 32) + 32) % 32;
    state.loopEvents.filter((event) => event.step === loopStep).forEach((event) => triggerPad(event.pad, event.velocity, true));
  }
}

function playBackgroundStep(step: number, at: number) {
  const beat = ((step % 16) + 16) % 16;
  const bar = Math.floor(step / 16);
  const roots = [0, -3, -7, -5];
  const root = roots[((bar % roots.length) + roots.length) % roots.length];
  if ([0, 4, 8, 12].includes(beat)) playDrum(0, at, beat === 0 ? .32 : .24);
  if ([4, 12].includes(beat)) playDrum(1, at, .18);
  if (beat % 2 === 0) playDrum(2, at, beat % 4 === 2 ? .16 : .09);
  if ([0, 3, 6, 10, 14].includes(beat)) {
    const passing = beat === 6 ? 7 : beat === 14 ? 12 : 0;
    playTone(65.41 * 2 ** ((root + passing) / 12), "sawtooth", at, .18, .045, -8);
  }
  if (beat === 0) {
    const chordRoot = 130.81 * 2 ** (root / 12);
    const minor = root === -3;
    [1, minor ? 1.1892 : 1.2599, 1.4983].forEach((ratio, voice) => playTone(chordRoot * ratio, "sine", at + voice * .01, 1.7, .018, voice * 2));
  }
}

function drawVisuals(now: number) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  visual.fillStyle = "rgba(246, 242, 232, 0.105)";
  visual.fillRect(0, 0, width, height);
  visual.save();
  visual.globalAlpha = 0.1;
  visual.strokeStyle = "#151514";
  visual.lineWidth = 1;
  for (let x = 0; x < width; x += Math.max(60, width / 16)) {
    visual.beginPath(); visual.moveTo(x, 0); visual.lineTo(x, height); visual.stroke();
  }
  visual.restore();
  state.ripples = state.ripples.filter((ripple) => now - ripple.born < 1900);
  state.ripples.forEach((ripple) => {
    const age = (now - ripple.born) / 1000;
    const life = Math.max(0, 1 - age / 1.9);
    const x = ripple.x * width;
    const y = ripple.y * height;
    visual.save();
    visual.translate(x, y);
    visual.globalAlpha = life;
    visual.strokeStyle = ripple.color;
    visual.fillStyle = ripple.color;
    visual.lineCap = "round";
    if (ripple.family === "drum") {
      for (let ring = 0; ring < 4; ring++) {
        visual.globalAlpha = life * (1 - ring * 0.18);
        visual.lineWidth = Math.max(1, 9 - age * 5 - ring);
        visual.beginPath(); visual.arc(0, 0, 24 + age * (170 + ring * 36), 0, Math.PI * 2); visual.stroke();
      }
    } else if (ripple.family === "bass") {
      visual.lineWidth = 7 * life + 1;
      visual.beginPath();
      for (let i = 0; i <= 90; i++) {
        const px = (i / 90 - 0.5) * width * 1.2;
        const py = Math.sin(i * 0.42 + ripple.seed) * (55 + age * 70) * Math.exp(-Math.abs(i - 45) / 38);
        i ? visual.lineTo(px, py) : visual.moveTo(px, py);
      }
      visual.stroke();
    } else if (ripple.family === "chord") {
      visual.rotate(age * 0.34 + ripple.seed); visual.lineWidth = 4;
      for (let side = 0; side < 3; side++) { visual.rotate((Math.PI * 2) / 3); visual.strokeRect(-18 - age * 110, -18 - age * 110, 36 + age * 220, 36 + age * 220); }
    } else {
      visual.lineWidth = 3; visual.beginPath();
      for (let i = 0; i < 110; i++) {
        const angle = i * 0.22 + age * 3.2; const radius = i * 1.8 + age * 45;
        const px = Math.cos(angle) * radius; const py = Math.sin(angle) * radius;
        i ? visual.lineTo(px, py) : visual.moveTo(px, py);
      }
      visual.stroke();
    }
    visual.restore();
  });
  visual.save(); visual.globalAlpha = 0.8; visual.fillStyle = "#151514"; visual.font = "600 11px ui-monospace, monospace";
  visual.fillText(state.lastStep < 0 ? "00" : String(state.lastStep % 32).padStart(2, "0"), width - 48, height - 26); visual.restore();
  requestAnimationFrame(drawVisuals);
}

function drawSource() {
  sourceView.fillStyle = "#10100f"; sourceView.fillRect(0, 0, sourceCanvas.width, sourceCanvas.height);
  let frame: CanvasImageSource | null = null;
  if (state.inputMode === "camera" && localVideo.readyState >= 2) frame = localVideo;
  if (state.inputMode === "vdo" && state.latestFrame) frame = state.latestFrame;
  if (frame) {
    try {
      sourceView.drawImage(frame, 0, 0, sourceCanvas.width, sourceCanvas.height);
      analysis.drawImage(frame, 0, 0, analysisCanvas.width, analysisCanvas.height);
      state.sourceReady = true;
    } catch { state.sourceReady = false; }
  } else {
    sourceView.fillStyle = "#8e8b84"; sourceView.font = "500 20px system-ui"; sourceView.textAlign = "center";
    sourceView.fillText("映像入力を接続", sourceCanvas.width / 2, sourceCanvas.height / 2 - 8);
    sourceView.font = "13px system-ui"; sourceView.fillText("または20穴をクリックしてテスト", sourceCanvas.width / 2, sourceCanvas.height / 2 + 20);
  }
  if (state.sourceReady && state.baseline.length === 20) detectTouches();
  drawPadOverlay();
  requestAnimationFrame(drawSource);
}

function sampleZone(point: Point) {
  const cx = Math.round(point.x * analysisCanvas.width); const cy = Math.round(point.y * analysisCanvas.height);
  const radius = Math.max(3, Math.round(state.zoneRadius * analysisCanvas.width));
  const x = Math.max(0, cx - radius); const y = Math.max(0, cy - radius);
  const w = Math.min(analysisCanvas.width - x, radius * 2); const h = Math.min(analysisCanvas.height - y, radius * 2);
  const pixels = analysis.getImageData(x, y, w, h).data; const sample = [0, 0, 0]; let count = 0;
  for (let py = 0; py < h; py += 2) for (let px = 0; px < w; px += 2) {
    if ((px - radius) ** 2 + (py - radius) ** 2 > radius ** 2) continue;
    const offset = (py * w + px) * 4; sample[0] += pixels[offset]; sample[1] += pixels[offset + 1]; sample[2] += pixels[offset + 2]; count++;
  }
  return sample.map((value) => value / Math.max(1, count));
}

function detectTouches() {
  const now = performance.now();
  for (let index = 0; index < 20; index++) {
    const sample = sampleZone(bilinearPoint(index)); const base = state.baseline[index];
    const difference = (Math.abs(sample[0] - base[0]) + Math.abs(sample[1] - base[1]) + Math.abs(sample[2] - base[2])) / 3;
    const normalized = Math.min(1, difference / Math.max(1, state.sensitivity * 1.6));
    state.padLevels[index] += (normalized - state.padLevels[index]) * 0.28;
    if (difference >= state.sensitivity && state.armed[index] && now - state.lastTriggers[index] > 240) {
      state.armed[index] = false; state.lastTriggers[index] = now; triggerPad(index, Math.min(1, 0.55 + difference / 90));
    }
    if (difference < state.sensitivity * 0.48) state.armed[index] = true;
  }
}

function drawPadOverlay() {
  sourceView.textAlign = "center"; sourceView.textBaseline = "middle";
  for (let index = 0; index < 20; index++) {
    const point = bilinearPoint(index); const x = point.x * sourceCanvas.width; const y = point.y * sourceCanvas.height;
    const radius = state.zoneRadius * sourceCanvas.width; const active = state.padLevels[index];
    sourceView.beginPath(); sourceView.arc(x, y, radius + active * 9, 0, Math.PI * 2);
    sourceView.fillStyle = `${pads[index].color}${Math.round(36 + active * 130).toString(16).padStart(2, "0")}`; sourceView.fill();
    sourceView.strokeStyle = active > 0.55 ? "#ffffff" : pads[index].color; sourceView.lineWidth = active > 0.55 ? 4 : 2; sourceView.stroke();
    sourceView.fillStyle = "#ffffff"; sourceView.font = "700 13px ui-monospace, monospace"; sourceView.fillText(String(index + 1).padStart(2, "0"), x, y);
  }
  if (state.calibrationStep >= 0) {
    sourceView.fillStyle = "rgba(8,8,8,.82)"; sourceView.fillRect(0, 0, sourceCanvas.width, 38);
    sourceView.fillStyle = "#fff"; sourceView.font = "600 14px system-ui";
    sourceView.fillText(["左上の穴", "右上の穴", "右下の穴", "左下の穴"][state.calibrationStep] + "をクリック", sourceCanvas.width / 2, 19);
  }
}

function captureBaseline() {
  if (!state.sourceReady) { setStatus("映像がまだ届いていません"); return; }
  state.baseline = Array.from({ length: 20 }, (_, index) => sampleZone(bilinearPoint(index)));
  state.armed.fill(true); setStatus("基準を記録しました。串で触れてください"); document.querySelector("#baselineButton")?.classList.add("is-ready");
}

function setStatus(message: string) {
  const el = document.querySelector("#systemMessage")!; el.textContent = message; el.classList.add("is-visible");
  window.setTimeout(() => el.classList.remove("is-visible"), 2600);
}

function updateLoopCount() { document.querySelector("#loopCount")!.textContent = `${state.loopEvents.length} HIT`; }

function cleanVdoUrl(raw: string) {
  const value = raw.trim(); if (!value) return null;
  const url = /^https?:\/\//i.test(value) ? new URL(value) : new URL(`https://vdo.ninja/?view=${encodeURIComponent(value)}`);
  url.searchParams.set("cleanoutput", ""); url.searchParams.set("speakermuted", ""); url.searchParams.set("autostart", ""); return url;
}

function connectVdo() {
  const input = document.querySelector<HTMLInputElement>("#vdoInput")!; const url = cleanVdoUrl(input.value); if (!url) return;
  const iframe = document.querySelector<HTMLIFrameElement>("#vdoFrame")!;
  state.streamId = url.searchParams.get("view") || ""; state.inputMode = "vdo"; state.sourceReady = false; state.latestFrame = null; state.baseline = [];
  iframe.src = url.toString(); iframe.classList.add("is-live"); document.querySelector("#inputType")!.textContent = "VDO.NINJA";
  document.querySelector("#connectDialog")?.classList.remove("is-open"); setStatus("VDO.Ninjaへ接続中… 映像後に基準を記録");
  window.clearInterval(state.frameTimer);
  state.frameTimer = window.setInterval(() => {
    if (!iframe.contentWindow || state.vdoFramePending) return;
    state.vdoFramePending = true;
    iframe.contentWindow.postMessage({ getVideoFrame: true, streamID: state.streamId || undefined, cib: "takowaves-frame" }, "*");
    window.setTimeout(() => (state.vdoFramePending = false), 320);
  }, 140);
}

async function connectCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720, facingMode: "environment" }, audio: false });
    localVideo.srcObject = stream; await localVideo.play(); state.inputMode = "camera"; state.sourceReady = true; state.baseline = [];
    document.querySelector("#inputType")!.textContent = "LOCAL CAMERA"; setStatus("カメラ接続完了。四隅調整→基準記録へ");
  } catch { setStatus("カメラを開始できませんでした"); }
}

window.addEventListener("message", (event) => {
  const iframe = document.querySelector<HTMLIFrameElement>("#vdoFrame")!;
  if (event.source !== iframe.contentWindow || !event.data) return;
  const frame = event.data.frame || event.data.image || event.data.videoFrame;
  if (typeof frame === "string" && frame.startsWith("data:image")) {
    const image = new Image(); image.onload = () => { state.latestFrame = image; state.sourceReady = true; state.vdoFramePending = false; document.querySelector("#inputDot")?.classList.add("is-live"); }; image.src = frame;
  }
});

function buildPadGrid() {
  const grid = document.querySelector("#padGrid")!;
  pads.forEach((pad, index) => {
    const button = document.createElement("button"); button.className = `mini-pad ${pad.family}`; button.dataset.pad = String(index); button.style.setProperty("--pad-color", pad.color);
    button.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span><b>${pad.name}</b><kbd>${pad.key.toUpperCase()}</kbd>`;
    button.title = `${pad.name} — ${phrases[index].length}音のフレーズ`;
    button.addEventListener("pointerdown", (event) => { event.preventDefault(); triggerPad(index, 1); }); grid.appendChild(button);
  });
}

document.querySelector("#startButton")?.addEventListener("click", () => void startAudio());
document.querySelector("#baselineButton")?.addEventListener("click", captureBaseline);
document.querySelector("#cameraButton")?.addEventListener("click", () => void connectCamera());
document.querySelector("#connectButton")?.addEventListener("click", () => document.querySelector("#connectDialog")?.classList.add("is-open"));
document.querySelector("#closeDialog")?.addEventListener("click", () => document.querySelector("#connectDialog")?.classList.remove("is-open"));
document.querySelector("#vdoConnectButton")?.addEventListener("click", connectVdo);
document.querySelector<HTMLInputElement>("#vdoInput")?.addEventListener("keydown", (event) => { if (event.key === "Enter") connectVdo(); });
document.querySelector("#calibrateButton")?.addEventListener("click", () => { state.calibrationStep = 0; setStatus("映像上で左上の穴をクリック"); });
sourceCanvas.addEventListener("pointerdown", (event) => {
  if (state.calibrationStep < 0) return;
  const rect = sourceCanvas.getBoundingClientRect();
  state.corners[state.calibrationStep] = { x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height };
  state.calibrationStep++;
  if (state.calibrationStep > 3) { state.calibrationStep = -1; state.baseline = []; setStatus("四隅を設定しました。次に基準を記録"); }
});
document.querySelector<HTMLInputElement>("#bpmSlider")?.addEventListener("input", (event) => { state.bpm = Number((event.target as HTMLInputElement).value); document.querySelector("#bpmValue")!.textContent = String(state.bpm); });
document.querySelector<HTMLInputElement>("#sensitivitySlider")?.addEventListener("input", (event) => { state.sensitivity = Number((event.target as HTMLInputElement).value); document.querySelector("#sensitivityValue")!.textContent = String(state.sensitivity); });
document.querySelector<HTMLInputElement>("#radiusSlider")?.addEventListener("input", (event) => { state.zoneRadius = Number((event.target as HTMLInputElement).value) / 100; });
document.querySelector<HTMLInputElement>("#quantizeToggle")?.addEventListener("change", (event) => { state.quantize = (event.target as HTMLInputElement).checked; });
document.querySelector("#recordButton")?.addEventListener("click", (event) => {
  state.loopRecording = !state.loopRecording;
  if (state.loopRecording) { state.loopEvents = []; state.loopPlaying = false; } else if (state.loopEvents.length) state.loopPlaying = true;
  (event.currentTarget as HTMLElement).classList.toggle("is-recording", state.loopRecording);
  document.querySelector("#recordLabel")!.textContent = state.loopRecording ? "REC…" : "REC 2 BAR"; updateLoopCount();
});
document.querySelector("#clearButton")?.addEventListener("click", () => {
  state.loopEvents = []; state.loopPlaying = false; state.loopRecording = false; document.querySelector("#recordButton")?.classList.remove("is-recording");
  document.querySelector("#recordLabel")!.textContent = "REC 2 BAR"; updateLoopCount();
});
document.querySelector("#bgmButton")?.addEventListener("click", (event) => {
  state.bgmEnabled = !state.bgmEnabled;
  (event.currentTarget as HTMLElement).classList.toggle("is-on", state.bgmEnabled);
  document.querySelector("#bgmLabel")!.textContent = state.bgmEnabled ? "BGM ON" : "BGM OFF";
  setStatus(state.bgmEnabled ? "ベースグルーヴを再開" : "ベースグルーヴを停止");
});
document.querySelector("#panelToggle")?.addEventListener("click", () => {
  state.panelHidden = !state.panelHidden; app.classList.toggle("panel-hidden", state.panelHidden);
  document.querySelector("#panelToggle")!.textContent = state.panelHidden ? "SHOW INPUT" : "HIDE INPUT";
});
document.querySelector("#fullscreenButton")?.addEventListener("click", () => { if (document.fullscreenElement) void document.exitFullscreen(); else void document.documentElement.requestFullscreen(); });
document.addEventListener("keydown", (event) => {
  if ((event.target as HTMLElement).tagName === "INPUT" || event.repeat) return;
  const index = pads.findIndex((pad) => pad.key === event.key.toLowerCase()); if (index >= 0) triggerPad(index, 1);
  if (event.key === " ") { event.preventDefault(); if (document.fullscreenElement) void document.exitFullscreen(); else void document.documentElement.requestFullscreen(); }
});

resizeCanvases(); buildPadGrid(); window.addEventListener("resize", resizeCanvases); window.setInterval(transportTick, 20);
visual.fillStyle = "#f6f2e8"; visual.fillRect(0, 0, window.innerWidth, window.innerHeight);
requestAnimationFrame(drawVisuals); requestAnimationFrame(drawSource);
