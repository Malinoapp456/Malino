/**
 * Gentle, locally synthesized storybook instrument sounds for children's UI.
 * No audio downloads or third-party services needed for everyday interactions.
 * Frequencies are musical pitches; amplitudes remain intentionally low.
 */
const notes = Object.freeze({
  click: [[392,0,0.11,0.095]],
  color: [[523.25,0,0.16,0.105]],
  success: [[523.25,0,0.19,0.14],[659.25,0.085,0.25,0.14],[783.99,0.18,0.30,0.125]],
  stars: [[659.25,0,0.22,0.135],[783.99,0.115,0.26,0.14],[1046.50,0.23,0.34,0.13]],
  streak: [[392,0,0.20,0.12],[523.25,0.115,0.22,0.13],[659.25,0.23,0.29,0.13]],
  reward: [[523.25,0,0.22,0.135],[659.25,0.105,0.25,0.14],
           [783.99,0.21,0.27,0.135],[1046.50,0.33,0.42,0.125]]
});
export const storybookSoundTypes = Object.freeze(Object.keys(notes));

/** Each note is [frequency in Hz, onset seconds, duration seconds, peak gain]. */
export function storybookNotes(type) {
  const sequence = notes[type];
  return sequence ? sequence.map(note => [...note]) : null;
}

/**
 * Render a gently struck wooden-bar/kalimba-like tone with an organic transient.
 * The harmonics fade at different rates; there is no hard square-wave attack.
 */
export function renderStorybookNote(frequency, duration, sampleRate = 44100) {
  if (!Number.isFinite(frequency) || frequency <= 0 ||
      !Number.isFinite(duration) || duration <= 0 ||
      !Number.isFinite(sampleRate) || sampleRate <= 0) throw new RangeError("Invalid note");
  const count = Math.max(1, Math.ceil(duration * sampleRate));
  const data = new Float32Array(count);
  const twoPi = 2 * Math.PI;
  let seed = (Math.round(frequency * 100) + 12345) >>> 0;
  for (let i = 0; i < count; i++) {
    const t = i / sampleRate;
    const attack = 1 - Math.exp(-t / 0.004);
    const fade = Math.min(1, (duration - t) / 0.025);
    const fundamental = 0.79 * Math.sin(twoPi * frequency * t) * Math.exp(-t / (duration * 0.44));
    const warmth = 0.16 * Math.sin(twoPi * frequency * 2.006 * t) * Math.exp(-t / (duration * 0.18));
    const wood = 0.07 * Math.sin(twoPi * frequency * 3.91 * t) * Math.exp(-t / (duration * 0.10));
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const noise = (seed / 4294967295 - 0.5) * 0.055 * Math.exp(-t / 0.008);
    data[i] = (fundamental + warmth + wood + noise) * attack * Math.max(0, fade);
  }
  return data;
}

/** Returns true if a known type was scheduled. Call within a user gesture. */
export function playStorybookSound(context, type) {
  const sequence = storybookNotes(type);
  if (!sequence || !context || context.state === "closed") return false;
  for (const [frequency, onset, duration, volume] of sequence) {
    const samples = renderStorybookNote(frequency, duration, context.sampleRate);
    const buffer = context.createBuffer(1, samples.length, context.sampleRate);
    buffer.getChannelData(0).set(samples);
    const source = context.createBufferSource();
    const gain = context.createGain();
    source.buffer = buffer;
    gain.gain.value = volume;
    source.connect(gain);
    gain.connect(context.destination);
    source.start(context.currentTime + onset);
  }
  return true;
}
