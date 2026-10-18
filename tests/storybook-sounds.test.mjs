import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {
  storybookNotes, storybookSoundTypes, storybookCharacters,
  renderStorybookNote, playStorybookSound
} from "../lib/storybook-sounds.mjs";

test("fairy-tale actions have distinctive soft, organic sound characters", () => {
  assert.deepEqual([...storybookSoundTypes].sort(),
    ["click","color","reward","stars","streak","success"]);
  assert.deepEqual([...storybookCharacters].sort(),
    ["bell","bubble","puff","sparkle","whistle","whoosh","wood"]);
  const used = new Set();
  for(const type of storybookSoundTypes) {
    const notes=storybookNotes(type);
    assert.ok(notes.length>0 && notes.length<=4);
    for(const [frequency,offset,duration,volume,character] of notes) {
      assert.ok(frequency>=250 && frequency<=1500);
      assert.ok(offset>=0 && duration>0 && duration<=0.5);
      assert.ok(volume>0 && volume<=0.15);
      assert.ok(storybookCharacters.includes(character));
      used.add(character);
    }
  }
  assert.equal(used.size,storybookCharacters.length);
  assert.equal(storybookNotes("unknown"),null);
  assert.equal(storybookNotes("click")[0][4],"puff");
  assert.equal(storybookNotes("color")[0][4],"bubble");
  assert.equal(storybookNotes("welcome"),null);
});

test("all fairy-tale characters produce bounded, smoothly tapered, non-silent samples", () => {
  for(const type of storybookSoundTypes) {
    for(const [frequency,,duration,,character] of storybookNotes(type)) {
      const samples=renderStorybookNote(frequency,duration,8000,character);
      assert.equal(samples.length,Math.ceil(duration*8000));
      assert.ok(samples.every(value=>Number.isFinite(value) && Math.abs(value)<=1));
      assert.ok(samples.some(value=>Math.abs(value)>0.02),character+" is silent");
      assert.ok(Math.abs(samples[0])<0.0001);
      assert.ok(Math.abs(samples.at(-1))<0.03);
    }
  }
});

test("every organic character has its own acoustic fingerprint", () => {
  const fingerprints=new Set();
  for(const character of storybookCharacters) {
    const samples=renderStorybookNote(440,0.25,8000,character);
    const sampleAt=[200,400,600,900].map(i=>samples[i].toFixed(4)).join(",");
    fingerprints.add(sampleAt);
  }
  assert.equal(fingerprints.size,storybookCharacters.length);
});

test("rejects invalid audio parameters", () => {
  assert.throws(()=>renderStorybookNote(-1,0.2),RangeError);
  assert.throws(()=>renderStorybookNote(440,0),RangeError);
  assert.throws(()=>renderStorybookNote(440,0.2,0),RangeError);
  assert.throws(()=>renderStorybookNote(440,0.2,8000,"unknown"),RangeError);
});

test("Web Audio plays notes in sequence without network downloads", () => {
  const starts=[];
  const context={
    currentTime:12,
    sampleRate:8000,
    state:"running",
    destination:{},
    createBuffer(channels,length,rate) {
      assert.equal(channels,1);
      assert.equal(rate,8000);
      const array=new Float32Array(length);
      return {getChannelData(index){assert.equal(index,0);return array;}};
    },
    createBufferSource() {
      return {connect(){},start(time){starts.push(time);}};
    },
    createGain() {
      return {gain:{value:0},connect(){}};
    }
  };
  assert.equal(playStorybookSound(context,"success"),true);
  assert.equal(starts.length,3);
  assert.ok(starts[0]>=12);
  assert.ok(starts[1]>starts[0]);
  assert.ok(starts[2]>starts[1]);
  assert.equal(playStorybookSound(context,"welcome"),false);
  assert.equal(starts.length,3);
  assert.equal(playStorybookSound(context,"missing"),false);
  assert.equal(playStorybookSound({...context,state:"closed"},"click"),false);
});

test("real CC0 trumpet recording is a playable PCM WAV, not a synthesizer", () => {
  const file=readFileSync(new URL("../public/sounds/trumpet-welcome.wav",import.meta.url));
  assert.ok(file.length>16000 && file.length<500000);
  assert.equal(file.toString("ascii",0,4),"RIFF");
  assert.equal(file.toString("ascii",8,12),"WAVE");
  let pos=12;
  let fmt=null;
  let pcm=null;
  while(pos+8<=file.length){
    const name=file.toString("ascii",pos,pos+4);
    const length=file.readUInt32LE(pos+4);
    if(name==="fmt "){
      fmt={codec:file.readUInt16LE(pos+8),channels:file.readUInt16LE(pos+10),
           rate:file.readUInt32LE(pos+12),bits:file.readUInt16LE(pos+22)};
    }
    if(name==="data")pcm=file.subarray(pos+8,pos+8+length);
    pos+=8+length+(length%2);
  }
  assert.deepEqual(fmt,{codec:1,channels:1,rate:24000,bits:16});
  assert.ok(pcm && pcm.length>24000);
  const seconds=pcm.length/(fmt.rate*fmt.channels*(fmt.bits/8));
  assert.ok(seconds>1 && seconds<2);
  let peak=0;let energy=0;let count=0;
  for(let i=0;i+1<pcm.length;i+=16){
    const amplitude=Math.abs(pcm.readInt16LE(i)/32768);
    peak=Math.max(peak,amplitude);
    energy+=amplitude*amplitude;
    count++;
  }
  assert.ok(peak>0.02 && peak<0.95);
  assert.ok(Math.sqrt(energy/count)>0.003);
});
