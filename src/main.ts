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
pads.forEach((pad) => (pad.color = "#f4f4ef"));

const phrases: PhraseNote[][] = [
  [
    { step: 0, drum: 0, velocity: 1 }, { step: 2, drum: 2, velocity: .34 }, { step: 4, drum: 0, velocity: .7 }, { step: 6, drum: 1, velocity: .46 },
    { step: 8, drum: 0, velocity: .9 }, { step: 11, drum: 2, velocity: .42 }, { step: 13, drum: 0, velocity: .62 }, { step: 15, drum: 1, velocity: .68 },
    { step: 16, drum: 0, velocity: 1 }, { step: 19, drum: 0, velocity: .55 }, { step: 20, drum: 2, velocity: .36 }, { step: 23, drum: 1, velocity: .58 },
    { step: 24, drum: 0, velocity: .78 }, { step: 26, drum: 0, velocity: .48 }, { step: 29, drum: 2, velocity: .5 }, { step: 31, drum: 1, velocity: .82 },
  ],
  [
    { step: 0, drum: 1, velocity: 1 }, { step: 1.5, drum: 1, velocity: .34 }, { step: 3, drum: 2, velocity: .42 }, { step: 6, drum: 1, velocity: .58 },
    { step: 7.5, drum: 1, velocity: .36 }, { step: 10, drum: 2, velocity: .5 }, { step: 12, drum: 1, velocity: .72 }, { step: 15, drum: 1, velocity: .44 },
    { step: 16, drum: 1, velocity: .9 }, { step: 18.5, drum: 2, velocity: .4 }, { step: 21, drum: 1, velocity: .54 }, { step: 23.5, drum: 1, velocity: .38 },
    { step: 26, drum: 2, velocity: .48 }, { step: 28, drum: 1, velocity: .7 }, { step: 29.5, drum: 1, velocity: .42 }, { step: 31, drum: 3, velocity: .65 },
  ],
  [0, 1, 2.5, 3, 4.5, 6, 7.5, 9, 10, 11.5, 13, 14.5, 16, 17, 18.5, 20, 21.5, 23, 24.5, 26, 27, 28.5, 30, 31.5]
    .map((step, i) => ({ step, drum: 2, velocity: i % 6 === 0 ? .96 : i % 3 === 0 ? .67 : .4 })),
  [
    { step: 0, drum: 3, velocity: 1 }, { step: 3, drum: 2, velocity: .38 }, { step: 6, drum: 3, velocity: .58 }, { step: 9.5, drum: 3, velocity: .42 },
    { step: 12, drum: 1, velocity: .48 }, { step: 15, drum: 3, velocity: .76 }, { step: 16, drum: 3, velocity: .9 }, { step: 18, drum: 2, velocity: .34 },
    { step: 21, drum: 3, velocity: .55 }, { step: 23.5, drum: 1, velocity: .5 }, { step: 26, drum: 3, velocity: .7 }, { step: 29, drum: 2, velocity: .44 }, { step: 31, drum: 3, velocity: .86 },
  ],
  [
    { step: 0, drum: 4, semi: 0, velocity: .86 }, { step: 4, drum: 4, semi: 7, velocity: .56 }, { step: 7, drum: 4, semi: 12, velocity: .7 },
    { step: 11, drum: 4, semi: 3, velocity: .5 }, { step: 14, drum: 4, semi: 10, velocity: .62 }, { step: 16, drum: 4, semi: 12, velocity: .8 },
    { step: 19, drum: 4, semi: 7, velocity: .46 }, { step: 23, drum: 4, semi: 15, velocity: .68 }, { step: 27, drum: 4, semi: 5, velocity: .52 }, { step: 31, drum: 4, semi: 0, velocity: .74 },
  ],
  [
    { step: 0, semi: 0, velocity: 1 }, { step: 3, semi: 0, velocity: .62 }, { step: 6, semi: 3, velocity: .8 }, { step: 10, semi: 5, velocity: .66 },
    { step: 13, semi: 7, velocity: .84 }, { step: 16, semi: 0, velocity: .94 }, { step: 19, semi: 3, velocity: .6 }, { step: 22, semi: 5, velocity: .76 },
    { step: 25, semi: 10, velocity: .64 }, { step: 28, semi: 7, velocity: .82 }, { step: 31, semi: 5, velocity: .52 },
  ],
  [
    { step: 0, semi: 0, velocity: .92 }, { step: 2, semi: 7, velocity: .56 }, { step: 5, semi: 5, velocity: .78 }, { step: 8, semi: 0, velocity: .62 },
    { step: 11, semi: 10, velocity: .8 }, { step: 14, semi: 7, velocity: .56 }, { step: 16, semi: 3, velocity: .88 }, { step: 18, semi: 10, velocity: .5 },
    { step: 21, semi: 7, velocity: .74 }, { step: 24, semi: 0, velocity: .68 }, { step: 27, semi: 5, velocity: .8 }, { step: 30, semi: 10, velocity: .58 },
  ],
  [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30]
    .map((step, i) => ({ step, semi: [0, 2, 3, 5, 7, 10, 12, 7, 0, 3, 5, 7, 12, 10, 7, 3][i], velocity: i % 4 === 0 ? .9 : .58 + (i % 3) * .08 })),
  [
    { step: 0, semi: 0, velocity: .94 }, { step: 3, semi: 7, velocity: .6 }, { step: 6, semi: 0, velocity: .76 }, { step: 9, semi: 10, velocity: .66 },
    { step: 12, semi: 5, velocity: .8 }, { step: 15, semi: 7, velocity: .48 }, { step: 16, semi: 0, velocity: .9 }, { step: 20, semi: 12, velocity: .62 },
    { step: 23, semi: 10, velocity: .7 }, { step: 26, semi: 5, velocity: .78 }, { step: 29, semi: 3, velocity: .58 }, { step: 31, semi: 0, velocity: .84 },
  ],
  [
    { step: 0, semi: 12, velocity: .9 }, { step: 2, semi: 7, velocity: .58 }, { step: 5, semi: 3, velocity: .72 }, { step: 8, semi: 0, velocity: .84 },
    { step: 11, semi: -5, velocity: .64 }, { step: 14, semi: 0, velocity: .5 }, { step: 16, semi: 7, velocity: .86 }, { step: 19, semi: 3, velocity: .6 },
    { step: 22, semi: 0, velocity: .78 }, { step: 25, semi: -5, velocity: .56 }, { step: 28, semi: -12, velocity: .7 }, { step: 31, semi: -5, velocity: .48 },
  ],
  [
    { step: 0, semi: 0, velocity: .84, duration: 4 }, { step: 6, semi: 7, velocity: .6, duration: 3 }, { step: 12, semi: 12, velocity: .48, duration: 4 },
    { step: 16, semi: 3, velocity: .78, duration: 4 }, { step: 22, semi: 10, velocity: .56, duration: 3 }, { step: 28, semi: 7, velocity: .68, duration: 4 },
  ],
  [
    { step: 0, semi: 0, velocity: .76, duration: 3 }, { step: 4, semi: 3, velocity: .5, duration: 2 }, { step: 8, semi: 7, velocity: .66, duration: 3 }, { step: 12, semi: 10, velocity: .48, duration: 2 },
    { step: 16, semi: 12, velocity: .72, duration: 3 }, { step: 20, semi: 10, velocity: .5, duration: 2 }, { step: 24, semi: 7, velocity: .64, duration: 3 }, { step: 28, semi: 3, velocity: .54, duration: 3 },
  ],
  [0, 2, 4, 6, 9, 12, 14, 16, 18, 20, 22, 25, 28, 30]
    .map((step, i) => ({ step, semi: [0, 3, 7, 12, 15, 19, 15, 12, 7, 3, 0, 7, 12, 19][i], velocity: .54 + (i % 4) * .08 })),
  [0, 2, 4, 6, 9, 12, 14, 16, 18, 20, 22, 25, 28, 30]
    .map((step, i) => ({ step, semi: [12, 7, 3, 0, -5, -12, -5, 0, 3, 7, 12, 7, 3, 0][i], velocity: .76 - (i % 3) * .08 })),
  [
    { step: 0, semi: 0, velocity: .78, duration: 5 }, { step: 5, semi: 5, velocity: .52, duration: 3 }, { step: 10, semi: 7, velocity: .66, duration: 4 },
    { step: 16, semi: 12, velocity: .74, duration: 5 }, { step: 22, semi: 10, velocity: .5, duration: 3 }, { step: 27, semi: 7, velocity: .64, duration: 5 },
  ],
  [
    { step: 0, semi: 0, velocity: .9 }, { step: 2, semi: 3, velocity: .58 }, { step: 5, semi: 7, velocity: .76 }, { step: 8, semi: 10, velocity: .52 },
    { step: 11, semi: 7, velocity: .64 }, { step: 14, semi: 12, velocity: .56 }, { step: 16, semi: 15, velocity: .82 }, { step: 19, semi: 12, velocity: .58 },
    { step: 22, semi: 10, velocity: .72 }, { step: 25, semi: 7, velocity: .54 }, { step: 28, semi: 3, velocity: .68 }, { step: 31, semi: 0, velocity: .8 },
  ],
  [
    { step: 0, semi: 12, velocity: .72 }, { step: 3, semi: 7, velocity: .62 }, { step: 6, semi: 5, velocity: .54 }, { step: 9, semi: 3, velocity: .74 },
    { step: 12, semi: 0, velocity: .84 }, { step: 15, semi: 7, velocity: .48 }, { step: 16, semi: 3, velocity: .7 }, { step: 19, semi: 5, velocity: .58 },
    { step: 22, semi: 7, velocity: .76 }, { step: 25, semi: 12, velocity: .56 }, { step: 28, semi: 15, velocity: .68 }, { step: 31, semi: 12, velocity: .8 },
  ],
  [0, 1, 3, 5, 7, 10, 12, 14, 16, 17, 19, 21, 23, 26, 28, 30]
    .map((step, i) => ({ step, semi: [0, 7, 12, 15, 19, 12, 7, 15, 12, 19, 15, 12, 7, 3, 7, 12][i], velocity: i % 4 === 0 ? .82 : .46 + (i % 3) * .08 })),
  [
    { step: 0, semi: 0, velocity: .78 }, { step: 3, semi: 5, velocity: .54 }, { step: 6, semi: 12, velocity: .82 }, { step: 9, semi: 7, velocity: .6 },
    { step: 12, semi: 14, velocity: .7 }, { step: 15, semi: 19, velocity: .46 }, { step: 16, semi: 12, velocity: .84 }, { step: 19, semi: 7, velocity: .58 },
    { step: 22, semi: 3, velocity: .72 }, { step: 25, semi: 10, velocity: .52 }, { step: 28, semi: 15, velocity: .68 }, { step: 31, semi: 19, velocity: .48 },
  ],
  [0, 1, 2, 3, 5, 7, 9, 11, 13, 15, 16, 18, 20, 22, 24, 26, 28, 30, 31]
    .map((step, i) => ({ step, semi: [12, 7, 3, 0, 3, 7, 12, 15, 19, 15, 12, 7, 3, 0, 7, 12, 15, 19, 24][i], velocity: .82 - (i % 5) * .055 })),
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
  fx: null as GainNode | null,
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
    const fx = audio.createGain();
    const delay = audio.createDelay(1);
    const feedback = audio.createGain();
    master.gain.value = 0.72;
    master.connect(compressor).connect(audio.destination);
    fx.gain.value = .11;
    delay.delayTime.value = .245;
    feedback.gain.value = .23;
    fx.connect(delay);
    delay.connect(feedback).connect(delay);
    delay.connect(compressor);
    state.audio = audio;
    state.master = master;
    state.fx = fx;
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
  if (state.fx) gain.connect(state.fx);
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

function playFM(freq: number, at: number, duration: number, level: number, ratio: number, depth: number) {
  const audio = state.audio!;
  const carrier = audio.createOscillator();
  const modulator = audio.createOscillator();
  const modulation = audio.createGain();
  const filter = audio.createBiquadFilter();
  const gain = envGain(at, level, duration);
  carrier.type = "sine";
  modulator.type = "sine";
  carrier.frequency.value = freq;
  modulator.frequency.value = freq * ratio;
  modulation.gain.setValueAtTime(freq * depth, at);
  modulation.gain.exponentialRampToValueAtTime(Math.max(1, freq * .08), at + duration);
  filter.type = "bandpass";
  filter.frequency.value = Math.min(7600, freq * 4.5);
  filter.Q.value = 1.6;
  modulator.connect(modulation).connect(carrier.frequency);
  carrier.connect(filter).connect(gain);
  carrier.start(at); modulator.start(at);
  carrier.stop(at + duration + .05); modulator.stop(at + duration + .05);
}

function playPluck(freq: number, at: number, duration: number, level: number, bright = 1) {
  const audio = state.audio!;
  const osc = audio.createOscillator();
  const filter = audio.createBiquadFilter();
  const gain = envGain(at, level, Math.min(duration, .5));
  osc.type = bright > .7 ? "triangle" : "sine";
  osc.frequency.setValueAtTime(freq * 1.012, at);
  osc.frequency.exponentialRampToValueAtTime(freq, at + .035);
  filter.type = "lowpass";
  filter.Q.value = 7;
  filter.frequency.setValueAtTime(Math.min(9000, freq * (7 + bright * 6)), at);
  filter.frequency.exponentialRampToValueAtTime(Math.max(380, freq * 1.5), at + Math.min(duration, .42));
  osc.connect(filter).connect(gain);
  osc.start(at); osc.stop(at + duration + .04);
}

function playMetal(freq: number, at: number, duration: number, level: number) {
  [1, 1.414, 2.37, 3.76, 5.12].forEach((ratio, index) => {
    playTone(freq * ratio, "sine", at + index * .002, duration * (1 - index * .08), level / (index + 1), index * 4);
  });
}

function playAcid(freq: number, at: number, duration: number, level: number) {
  const audio = state.audio!;
  const osc = audio.createOscillator();
  const filter = audio.createBiquadFilter();
  const gain = envGain(at, level, duration);
  osc.type = "sawtooth";
  osc.frequency.value = freq;
  filter.type = "lowpass";
  filter.Q.value = 14;
  filter.frequency.setValueAtTime(Math.min(6800, freq * 18), at);
  filter.frequency.exponentialRampToValueAtTime(Math.max(180, freq * 1.7), at + duration);
  osc.connect(filter).connect(gain);
  osc.start(at); osc.stop(at + duration + .04);
}

function playVibrato(freq: number, at: number, duration: number, level: number, type: OscillatorType = "sine") {
  const audio = state.audio!;
  const osc = audio.createOscillator();
  const lfo = audio.createOscillator();
  const depth = audio.createGain();
  const gain = envGain(at, level, duration);
  osc.type = type;
  osc.frequency.value = freq;
  lfo.frequency.value = 5.4;
  depth.gain.value = freq * .012;
  lfo.connect(depth).connect(osc.frequency);
  osc.connect(gain);
  osc.start(at); lfo.start(at);
  osc.stop(at + duration + .04); lfo.stop(at + duration + .04);
}

function playBreath(freq: number, at: number, duration: number, level: number) {
  const audio = state.audio!;
  const noise = audio.createBufferSource();
  const filter = audio.createBiquadFilter();
  const gain = envGain(at, level, duration);
  noise.buffer = state.noise;
  filter.type = "bandpass";
  filter.frequency.value = freq * 3.2;
  filter.Q.value = 5;
  noise.connect(filter).connect(gain);
  noise.start(at); noise.stop(at + duration + .04);
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
  const time = duration || (pad.family === "bass" ? .34 : pad.family === "chord" ? .72 : .3);
  if (index === 5) { playTone(freq, "sawtooth", at, time, .15 * velocity, -7); playTone(freq / 2, "sine", at, time * 1.2, .13 * velocity); }
  if (index === 6) playFM(freq, at, time, .22 * velocity, .5, 2.2);
  if (index === 7) playPluck(freq, at, time, .23 * velocity, .55);
  if (index === 8) playAcid(freq, at, time, .18 * velocity);
  if (index === 9) { playTone(freq, "square", at, time, .075 * velocity, -9); playFM(freq / 2, at, time * 1.15, .14 * velocity, 1.5, 1.3); }
  if (pad.family === "chord") {
    const minor = index === 11 || index === 12;
    const chord = [1, minor ? 1.1892 : 1.2599, 1.4983];
    chord.forEach((ratio, voice) => {
      const note = freq * ratio;
      if (index === 10) playTone(note, "square", at + voice * .008, time, .042 * velocity, voice * 3);
      if (index === 11) playMetal(note * 2, at + voice * .012, time * 1.25, .045 * velocity);
      if (index === 12) { playTone(note, "sine", at, time * 1.2, .06 * velocity); playTone(note * 2, "sine", at, time, .025 * velocity); }
      if (index === 13) { playBreath(note, at, time, .025 * velocity); playTone(note, "triangle", at, time, .05 * velocity, voice * -4); }
      if (index === 14) { playTone(note, "sawtooth", at, time, .028 * velocity, -8); playTone(note, "sawtooth", at, time, .028 * velocity, 8); }
    });
  }
  if (index === 15) playVibrato(freq, at, time, .15 * velocity, "sine");
  if (index === 16) { playPluck(freq, at, time, .13 * velocity, .3); playTone(freq / 2, "square", at, time * .72, .035 * velocity); }
  if (index === 17) playFM(freq, at, time, .13 * velocity, 2.01, 3.8);
  if (index === 18) { playVibrato(freq, at, time, .1 * velocity, "triangle"); playTone(freq * 1.5, "sine", at, time * .8, .045 * velocity, 5); }
  if (index === 19) { playMetal(freq, at, time, .08 * velocity); playPluck(freq / 2, at, time, .08 * velocity, 1); }
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

function drawOctoField(now: number, width: number, height: number) {
  const energy = Math.min(1, state.ripples.length / 12);
  const phase = now * .00032;
  const radius = Math.min(width, height) * (.46 + energy * .12);
  visual.save();
  visual.translate(width * .68, height * .52);
  visual.strokeStyle = "#f4f4ef";
  visual.fillStyle = "#050505";
  visual.lineCap = "round";
  visual.globalAlpha = .022 + energy * .055;
  for (let arm = 0; arm < 8; arm++) {
    const base = arm / 8 * Math.PI * 2 + phase * (arm % 2 ? -.18 : .14);
    visual.lineWidth = .7 + (arm % 3) * .28 + energy;
    visual.beginPath();
    for (let point = 0; point <= 72; point++) {
      const t = point / 72;
      const travel = 12 + t * radius;
      const bend = Math.sin(t * Math.PI * (2.2 + arm * .08) + phase * 3 + arm) * (18 + t * 58);
      const px = Math.cos(base) * travel - Math.sin(base) * bend;
      const py = Math.sin(base) * travel + Math.cos(base) * bend;
      point ? visual.lineTo(px, py) : visual.moveTo(px, py);
      if (point > 10 && point % 9 === 0) {
        const cup = 2.5 + t * 4.5;
        visual.moveTo(px + cup, py);
        visual.arc(px, py, cup, 0, Math.PI * 2);
        visual.moveTo(px + cup * .38, py);
        visual.arc(px, py, cup * .38, 0, Math.PI * 2);
      }
    }
    visual.stroke();
  }
  visual.restore();
}

function drawVisuals(now: number) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  visual.fillStyle = "rgba(5, 5, 5, 0.16)";
  visual.fillRect(0, 0, width, height);

  drawOctoField(now, width, height);

  visual.save();
  visual.globalAlpha = .055;
  visual.strokeStyle = "#f4f4ef";
  visual.lineWidth = .7;
  for (let row = 0; row < 9; row++) {
    visual.beginPath();
    for (let x = 0; x <= width; x += 8) {
      const y = height * (.18 + row * .08) + Math.sin(x * .012 + now * .0013 + row) * (3 + (state.lastStep % 4) * 1.5);
      x ? visual.lineTo(x, y) : visual.moveTo(x, y);
    }
    visual.stroke();
  }
  visual.restore();

  state.ripples = state.ripples.filter((ripple) => now - ripple.born < 1900);
  state.ripples.forEach((ripple) => {
    const age = (now - ripple.born) / 1000;
    const life = Math.max(0, 1 - age / 1.9);
    const x = ripple.x * width;
    const y = ripple.y * height;
    const pattern = ripple.pad;
    const scale = Math.min(width, height);
    visual.save();
    visual.translate(x, y);
    visual.globalAlpha = Math.min(1, life * 1.2);
    visual.strokeStyle = "#f4f4ef";
    visual.fillStyle = "#f4f4ef";
    visual.lineCap = "round";

    if (pattern === 0) {
      for (let ring = 0; ring < 7; ring++) {
        visual.globalAlpha = life * (1 - ring * .09); visual.lineWidth = ring ? 1.2 : 6 * life + 1;
        visual.beginPath(); visual.arc(0, 0, 16 + age * (100 + ring * 22), 0, Math.PI * 2); visual.stroke();
      }
    } else if (pattern === 1) {
      visual.lineWidth = 2;
      for (let arc = 0; arc < 12; arc++) {
        const radius = 25 + arc * 13 + age * 100;
        visual.beginPath(); visual.arc(0, 0, radius, arc * .7 + age, arc * .7 + age + Math.PI * .72); visual.stroke();
      }
    } else if (pattern === 2) {
      visual.lineWidth = 1.4;
      for (let bar = -15; bar <= 15; bar++) {
        const bx = bar * 13; const bh = (25 + Math.abs(Math.sin(bar * .8 + age * 9)) * 150) * life;
        visual.beginPath(); visual.moveTo(bx, -bh); visual.lineTo(bx, bh); visual.stroke();
      }
    } else if (pattern === 3) {
      visual.rotate(age * .9); visual.lineWidth = 1.5;
      for (let box = 0; box < 9; box++) {
        const size = 18 + box * 22 + age * 95; visual.rotate(.08); visual.strokeRect(-size / 2, -size / 2, size, size);
      }
    } else if (pattern === 4) {
      for (let orbit = 0; orbit < 5; orbit++) {
        const radius = 35 + orbit * 29 + age * 45; visual.lineWidth = 1; visual.globalAlpha = life * (.95 - orbit * .12);
        visual.beginPath(); visual.ellipse(0, 0, radius, radius * (.3 + orbit * .09), orbit * .55 + age, 0, Math.PI * 2); visual.stroke();
        const a = age * (3 + orbit * .7) + orbit; visual.beginPath(); visual.arc(Math.cos(a) * radius, Math.sin(a) * radius * (.3 + orbit * .09), 3 + orbit, 0, Math.PI * 2); visual.fill();
      }
    } else if (pattern === 5) {
      visual.lineWidth = 7 * life + 1;
      visual.beginPath();
      for (let i = 0; i <= 120; i++) {
        const px = (i / 120 - .5) * width * 1.25;
        const py = Math.sin(i * .36 + ripple.seed) * (45 + age * 82) * Math.exp(-Math.abs(i - 60) / 42);
        i ? visual.lineTo(px, py) : visual.moveTo(px, py);
      }
      visual.stroke();
    } else if (pattern === 6) {
      visual.lineJoin = "miter"; visual.lineWidth = 3;
      for (let line = 0; line < 5; line++) {
        visual.beginPath();
        for (let i = 0; i < 28; i++) {
          const px = (i / 27 - .5) * width; const py = ((i + line) % 2 ? -1 : 1) * (20 + line * 13 + age * 55);
          i ? visual.lineTo(px, py) : visual.moveTo(px, py);
        }
        visual.stroke();
      }
    } else if (pattern === 7) {
      visual.lineWidth = 2;
      for (let strand = 0; strand < 2; strand++) {
        visual.beginPath();
        for (let i = 0; i <= 90; i++) {
          const px = (i / 90 - .5) * width; const py = Math.sin(i * .28 + age * 5 + strand * Math.PI) * (35 + age * 35);
          i ? visual.lineTo(px, py) : visual.moveTo(px, py);
          if (strand === 0 && i % 5 === 0) { visual.moveTo(px, py); visual.lineTo(px, -py); }
        }
        visual.stroke();
      }
    } else if (pattern === 8) {
      for (let row = -9; row <= 9; row++) {
        const w = (60 + Math.abs(Math.sin(row * .7 + age * 5)) * 260) * life; const h = 4 + (row % 3 === 0 ? 7 : 0);
        visual.fillRect(-w / 2, row * 14, w, h);
      }
    } else if (pattern === 9) {
      visual.lineWidth = 1.2;
      for (let contour = 0; contour < 13; contour++) {
        visual.beginPath();
        for (let i = 0; i <= 70; i++) {
          const px = (i / 70 - .5) * width; const envelope = Math.exp(-Math.abs(i - 35) / 18);
          const py = contour * 10 - 60 - Math.sin(i * .28 + contour * .36 + age * 3) * envelope * (45 + age * 90);
          i ? visual.lineTo(px, py) : visual.moveTo(px, py);
        }
        visual.stroke();
      }
    } else if (pattern === 10) {
      visual.lineWidth = 1.5; visual.rotate(age * .45);
      for (let tri = 0; tri < 9; tri++) {
        const r = 24 + tri * 18 + age * 60; visual.beginPath();
        for (let p = 0; p < 4; p++) { const a = -Math.PI / 2 + p * Math.PI * 2 / 3; const px = Math.cos(a) * r; const py = Math.sin(a) * r; p ? visual.lineTo(px, py) : visual.moveTo(px, py); }
        visual.stroke();
      }
    } else if (pattern === 11) {
      visual.lineWidth = 2;
      for (let loop = 0; loop < 8; loop++) {
        visual.beginPath();
        for (let i = 0; i <= 120; i++) {
          const a = i / 120 * Math.PI * 2; const px = Math.sin(a * (2 + loop % 3) + age) * (50 + loop * 12); const py = Math.sin(a * 3 + loop + age * 1.7) * (38 + loop * 9);
          i ? visual.lineTo(px, py) : visual.moveTo(px, py);
        }
        visual.stroke();
      }
    } else if (pattern === 12) {
      visual.rotate(Math.PI / 4 + age * .2); visual.lineWidth = 2;
      for (let box = 0; box < 12; box++) { const size = 15 + box * 18 + age * 75; visual.strokeRect(-size / 2, -size / 2, size, size); }
    } else if (pattern === 13) {
      visual.lineWidth = 1.5;
      for (let beam = 0; beam < 36; beam++) {
        const a = -Math.PI * .8 + beam / 35 * Math.PI * 1.6; const radius = 70 + age * scale * .55;
        visual.globalAlpha = life * (.25 + (beam % 4 === 0 ? .7 : .15)); visual.beginPath(); visual.moveTo(0, 0); visual.lineTo(Math.cos(a) * radius, Math.sin(a) * radius); visual.stroke();
      }
    } else if (pattern === 14) {
      visual.lineWidth = 1;
      for (let staff = -6; staff <= 6; staff++) { visual.beginPath(); visual.moveTo(-width / 2, staff * 14); visual.lineTo(width / 2, staff * 14); visual.stroke(); }
      for (let dot = 0; dot < 14; dot++) { const px = (dot / 13 - .5) * width; const py = Math.sin(dot * 1.7 + age * 7) * 70; visual.beginPath(); visual.arc(px, py, dot % 4 === 0 ? 7 : 3, 0, Math.PI * 2); visual.fill(); }
    } else if (pattern === 15) {
      visual.lineWidth = 3; visual.beginPath();
      for (let i = 0; i < 170; i++) {
        const angle = i * .19 + age * 3; const radius = i * 1.25 + age * 45; const px = Math.cos(angle) * radius; const py = Math.sin(angle) * radius;
        i ? visual.lineTo(px, py) : visual.moveTo(px, py);
      }
      visual.stroke();
    } else if (pattern === 16) {
      const points: Array<{x:number;y:number}> = [];
      for (let i = 0; i < 32; i++) {
        const a = Math.sin(i * 94.31 + ripple.seed) * 999; const px = (a - Math.floor(a) - .5) * scale * .8; const py = (Math.sin(a * 43.2) * .5) * scale * .62;
        points.push({ x: px * (1 + age * .45), y: py * (1 + age * .45) }); visual.beginPath(); visual.arc(points[i].x, points[i].y, i % 5 === 0 ? 4 : 1.6, 0, Math.PI * 2); visual.fill();
      }
      visual.globalAlpha = life * .28;
      for (let i = 1; i < points.length; i++) { visual.beginPath(); visual.moveTo(points[i - 1].x, points[i - 1].y); visual.lineTo(points[i].x, points[i].y); visual.stroke(); }
    } else if (pattern === 17) {
      visual.textAlign = "center"; visual.textBaseline = "middle"; visual.font = `700 ${Math.round(90 + age * 190)}px Space Grotesk`; visual.lineWidth = 2.5;
      visual.strokeText("18", 0, 0); visual.globalAlpha = life * .22; visual.fillText("18", age * 35, age * -22);
    } else if (pattern === 18) {
      visual.lineWidth = 1.4; visual.rotate(age * .55);
      for (let spoke = 0; spoke < 64; spoke++) {
        const a = spoke / 64 * Math.PI * 2; const inner = 18 + (spoke % 4) * 7; const outer = 65 + age * 170 + (spoke % 3) * 25;
        visual.beginPath(); visual.moveTo(Math.cos(a) * inner, Math.sin(a) * inner); visual.lineTo(Math.cos(a) * outer, Math.sin(a) * outer); visual.stroke();
      }
    } else {
      visual.lineWidth = 2;
      for (let arc = 0; arc < 18; arc++) {
        const radius = 22 + arc * 15 + age * 55; visual.globalAlpha = life * (1 - arc * .035); visual.beginPath();
        visual.arc((arc % 2 ? 1 : -1) * age * 45, arc * 7 - 60, radius, Math.PI * .12, Math.PI * .88); visual.stroke();
      }
    }

    visual.globalAlpha = life * .72;
    visual.lineWidth = 1.2;
    const motif = pattern % 5;
    if (motif === 0) {
      for (let cup = 0; cup < 16; cup++) {
        const a = cup * .44 + age * 1.5; const radius = 28 + cup * 9 + age * 32;
        const cx = Math.cos(a) * radius; const cy = Math.sin(a) * radius;
        const size = 3.5 + cup * .28;
        visual.beginPath(); visual.arc(cx, cy, size, 0, Math.PI * 2); visual.stroke();
        visual.beginPath(); visual.arc(cx, cy, size * .42, 0, Math.PI * 2); visual.stroke();
      }
    } else if (motif === 1) {
      visual.rotate(age * .24);
      for (let arm = 0; arm < 8; arm++) {
        const base = arm / 8 * Math.PI * 2;
        visual.beginPath();
        for (let point = 0; point <= 45; point++) {
          const t = point / 45; const r = 18 + t * (120 + age * 80);
          const a = base + Math.sin(t * 4 + age * 2 + arm) * .28;
          const px = Math.cos(a) * r; const py = Math.sin(a) * r;
          point ? visual.lineTo(px, py) : visual.moveTo(px, py);
        }
        visual.stroke();
      }
    } else if (motif === 2) {
      visual.rotate(age * -.18);
      for (let cell = 0; cell < 35; cell++) {
        const col = cell % 7; const row = Math.floor(cell / 7); const bx = (col - 3) * 25; const by = (row - 2) * 25;
        const sides = 5 + (cell % 3); const cellRadius = 4 + ((cell * 7) % 9) + age * 3;
        visual.beginPath();
        for (let side = 0; side <= sides; side++) {
          const a = side / sides * Math.PI * 2 + cell * .17;
          const px = bx + Math.cos(a) * cellRadius; const py = by + Math.sin(a) * cellRadius;
          side ? visual.lineTo(px, py) : visual.moveTo(px, py);
        }
        visual.stroke();
      }
    } else if (motif === 3) {
      visual.lineWidth = 5 * life + 1;
      visual.beginPath(); visual.moveTo(-170 - age * 20, 80);
      visual.bezierCurveTo(-80, -130 - age * 30, 65, 145 + age * 25, 190 + age * 38, -70); visual.stroke();
      visual.lineWidth = 1.1;
      for (let cup = 0; cup < 15; cup++) {
        const t = cup / 14; const cx = -145 + t * 300; const cy = Math.sin(t * Math.PI * 3 + age) * 50;
        visual.beginPath(); visual.arc(cx, cy, 3 + cup * .16, 0, Math.PI * 2); visual.stroke();
        visual.beginPath(); visual.arc(cx, cy, 1.2 + cup * .06, 0, Math.PI * 2); visual.stroke();
      }
    } else {
      visual.rotate(age * .3);
      for (let contour = 0; contour < 12; contour++) {
        const radius = 20 + contour * 12 + age * 26;
        const squeeze = .32 + (contour % 4) * .11;
        visual.globalAlpha = life * (.82 - contour * .045);
        visual.beginPath();
        visual.ellipse((contour % 2 ? -1 : 1) * contour * 2.2, 0, radius, radius * squeeze, contour * .38, contour * .16, Math.PI * (1.45 + contour * .06));
        visual.stroke();
      }
    }
    visual.restore();
  });
  visual.save(); visual.globalAlpha = .72; visual.fillStyle = "#f4f4ef"; visual.font = "600 11px ui-monospace, monospace";
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
    button.title = `${pad.name} — ${phrases[index].length}音・2小節のフレーズ`;
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
visual.fillStyle = "#050505"; visual.fillRect(0, 0, window.innerWidth, window.innerHeight);
requestAnimationFrame(drawVisuals); requestAnimationFrame(drawSource);
