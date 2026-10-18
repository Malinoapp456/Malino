/**
 * Malino fairy-tale Foley: soft puffs, bubbles, wooden plinks, breathy whistles
 * and twinkling fairy dust. Procedural audio avoids extra downloads and works
 * offline, with independent, quiet sounds for different children's activities.
 *
 * Motif entries: [frequency (Hz), offset (s), length (s), gain, character].
 */
const notes = Object.freeze({
  // A tiny enchanted-book opening: a soft breeze, a bubble and fairy dust.
  // Overall length ~0.9 s, with no jarring attack or system notification beep.
  welcome: [[395,0,0.29,0.055,"whoosh"],[523.25,0.13,0.23,0.07,"bubble"],
            [783.99,0.29,0.36,0.10,"bell"],[1174.66,0.43,0.42,0.085,"sparkle"]],
  click:   [[260,0,0.12,0.095,"puff"]],
  color:   [[490,0,0.16,0.11,"bubble"]],
  success: [[523.25,0,0.24,0.11,"wood"],[659.25,0.11,0.27,0.10,"bell"],
            [783.99,0.24,0.35,0.10,"sparkle"]],
  stars:   [[659.25,0,0.25,0.095,"bell"],[880,0.12,0.31,0.10,"sparkle"],
            [1174.66,0.28,0.38,0.095,"sparkle"]],
  streak:  [[392,0,0.34,0.10,"whistle"],[523.25,0.13,0.25,0.075,"bubble"],
            [783.99,0.27,0.36,0.085,"sparkle"]],
  reward:  [[420,0,0.29,0.065,"whoosh"],[523.25,0.075,0.27,0.10,"bell"],
            [783.99,0.21,0.34,0.10,"sparkle"],[1046.5,0.39,0.43,0.09,"sparkle"]]
});
const characters = Object.freeze(["puff","bubble","wood","bell","sparkle","whistle","whoosh"]);
export const storybookSoundTypes = Object.freeze(Object.keys(notes));
export const storybookCharacters = characters;

export function storybookNotes(type) {
  return notes[type] ? notes[type].map(note => [...note]) : null;
}

function checkInputs(frequency,duration,sampleRate,character) {
  if(!Number.isFinite(frequency)||frequency<=0||
     !Number.isFinite(duration)||duration<=0||
     !Number.isFinite(sampleRate)||sampleRate<=0||
     !characters.includes(character)) throw new RangeError("Invalid fairy-tale sound parameters");
}

/**
 * Render organic acoustic gestures, not plain oscillator beeps.
 * Slightly inharmonic partials emulate percussion; short, gently filtered
 * noise makes soft movement and air. All sounds fade to zero without clicks.
 */
export function renderStorybookNote(frequency,duration,sampleRate=44100,character="bell") {
  checkInputs(frequency,duration,sampleRate,character);
  const length=Math.max(1,Math.ceil(duration*sampleRate));
  const data=new Float32Array(length);
  const twoPi=Math.PI*2;
  const tail=Math.min(0.045,duration*0.26);
  let seed=(Math.floor(frequency*100)+character.length*157+12345)>>>0;
  let lowNoise=0;
  const tau=Math.max(duration,0.025);
  for(let i=0;i<length;i++) {
    const t=i/sampleRate;
    seed=(Math.imul(seed,1664525)+1013904223)>>>0;
    const white=(seed/4294967295)*2-1;
    lowNoise=lowNoise*0.86+white*0.14;
    const attack=1-Math.exp(-t/0.0035);
    const release=Math.min(1,Math.max(0,(duration-t)/tail));
    const edge=attack*release;
    let wave=0;
    if(character==="puff") {
      // A soft page-turn/wooden tap with a short airy puff.
      wave=(0.75*lowNoise+0.18*Math.sin(twoPi*frequency*t))*
        Math.exp(-t/0.036);
    }else if(character==="bubble") {
      // Tiny rounded plop: pitch falls naturally, like a water bubble.
      const bend=frequency*(t+0.43*0.027*(1-Math.exp(-t/0.027)));
      wave=(0.9*Math.sin(twoPi*bend)+0.10*Math.sin(twoPi*bend*2))*
        Math.exp(-t/(tau*0.40));
    }else if(character==="wood") {
      // Gentle marimba/wooden-pluck attack.
      wave=(0.78*Math.sin(twoPi*frequency*t)*Math.exp(-t/(tau*0.40))+
            0.18*Math.sin(twoPi*frequency*2.64*t)*Math.exp(-t/(tau*0.13))+
            0.08*lowNoise*Math.exp(-t/0.014));
    }else if(character==="bell"||character==="sparkle") {
      // Soft inharmonic fairy bells with light, airy sparkle.
      const shimmer=character==="sparkle";
      wave=(0.70*Math.sin(twoPi*frequency*t)*Math.exp(-t/(tau*0.48))+
            0.20*Math.sin(twoPi*frequency*2.07*t)*Math.exp(-t/(tau*0.30))+
            0.08*Math.sin(twoPi*frequency*3.94*t)*Math.exp(-t/(tau*0.20))+
            (shimmer?0.065:0.015)*lowNoise*Math.exp(-t/(tau*0.13)));
    }else if(character==="whistle") {
      // A breathy little forest-bird whoop, with gentle pitch rise.
      const pitch=frequency*(t+0.20*(t*t)/(2*tau));
      wave=(0.72*Math.sin(twoPi*pitch)+0.10*Math.sin(twoPi*pitch*2)+
            0.16*lowNoise)*Math.exp(-t/(tau*0.49));
    }else if(character==="whoosh") {
      // Quiet fairy-dust sweep, never an explosive noise.
      wave=(0.64*lowNoise+0.20*Math.sin(twoPi*frequency*t))*
        Math.exp(-t/(tau*0.44));
    }
    data[i]=Math.max(-1,Math.min(1,wave*edge));
  }
  return data;
}

/**
 * Schedule one recognizable sound scene; the app's existing sound toggle and
 * fallback WAV effects remain the source of truth for muting and compatibility.
 */
export function playStorybookSound(context,type) {
  const sequence=storybookNotes(type);
  if(!sequence||!context||context.state==="closed")return false;
  for(const [frequency,offset,duration,gainValue,character] of sequence) {
    const samples=renderStorybookNote(frequency,duration,context.sampleRate,character);
    const buffer=context.createBuffer(1,samples.length,context.sampleRate);
    buffer.getChannelData(0).set(samples);
    const source=context.createBufferSource();
    const gain=context.createGain();
    source.buffer=buffer;
    gain.gain.value=gainValue;
    source.connect(gain);
    gain.connect(context.destination);
    source.start(context.currentTime+offset);
  }
  return true;
}
