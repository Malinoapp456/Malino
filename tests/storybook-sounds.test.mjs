import test from "node:test";
import assert from "node:assert/strict";
import {
  storybookNotes, storybookSoundTypes, storybookCharacters,
  renderStorybookNote, playStorybookSound
} from "../lib/storybook-sounds.mjs";

test("fairy-tale actions have distinctive soft, organic sound characters", () => {
  assert.deepEqual([...storybookSoundTypes].sort(),
    ["click","color","reward","stars","streak","success","welcome"]);
  assert.deepEqual([...storybookCharacters].sort(),
    ["bell","bubble","cover","page","puff","sparkle","whistle","whoosh","wood"]);
  const used = new Set();
  for(const type of storybookSoundTypes) {
    const notes=storybookNotes(type);
    assert.ok(notes.length>0 && notes.length<=4);
    for(const [frequency,offset,duration,volume,character] of notes) {
      assert.ok(frequency>=250 && frequency<=1500);
      assert.ok(offset>=0 && duration>0 && duration<=(type==="welcome"?0.75:0.5));
      assert.ok(volume>0 && volume<=0.15);
      assert.ok(storybookCharacters.includes(character));
      used.add(character);
    }
  }
  assert.equal(used.size,storybookCharacters.length);
  assert.equal(storybookNotes("unknown"),null);
  assert.equal(storybookNotes("click")[0][4],"puff");
  assert.equal(storybookNotes("color")[0][4],"bubble");
  assert.deepEqual(storybookNotes("welcome").map(note=>note[4]),
    ["cover","page","page","cover"]);
  const welcome=storybookNotes("welcome");
  assert.ok(Math.max(...welcome.map(note=>note[1]+note[2]))<1.6);
  assert.ok(welcome.every(note=>note[3]<=0.25));
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
  assert.equal(playStorybookSound(context,"welcome"),true);
  assert.equal(starts.length,7);
  assert.ok(Math.max(...starts)<13.6);
  assert.equal(playStorybookSound(context,"missing"),false);
  assert.equal(playStorybookSound({...context,state:"closed"},"click"),false);
});
