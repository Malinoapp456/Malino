import test from "node:test";
import assert from "node:assert/strict";
import {
  storybookNotes, storybookSoundTypes, renderStorybookNote, playStorybookSound
} from "../lib/storybook-sounds.mjs";

test("all ordinary app actions have gentle musical feedback", () => {
  assert.deepEqual([...storybookSoundTypes].sort(),
    ["click", "color", "reward", "stars", "streak", "success"]);
  for(const type of storybookSoundTypes){
    const notes = storybookNotes(type);
    assert.ok(notes.length > 0 && notes.length <= 4);
    for(const [frequency, onset, duration, volume] of notes){
      assert.ok(frequency >= 250 && frequency <= 1500);
      assert.ok(onset >= 0 && duration > 0 && duration <= 0.5);
      assert.ok(volume > 0 && volume <= 0.15);
    }
  }
  assert.equal(storybookNotes("unknown"), null);
});

test("generated audio is finite, non-silent, smoothly tapered and within safe sample range", () => {
  for(const type of storybookSoundTypes){
    for(const [frequency,,duration] of storybookNotes(type)){
      const samples = renderStorybookNote(frequency, duration, 8000);
      assert.equal(samples.length, Math.ceil(duration * 8000));
      assert.ok(samples.every(value => Number.isFinite(value) && Math.abs(value) <= 1));
      assert.ok(samples.some(value => Math.abs(value) > 0.05));
      assert.ok(Math.abs(samples[0]) < 0.0001);
      assert.ok(Math.abs(samples.at(-1)) < 0.01);
    }
  }
});

test("rejects invalid inputs to audio synthesis", () => {
  assert.throws(() => renderStorybookNote(-1, 0.2), RangeError);
  assert.throws(() => renderStorybookNote(440, 0), RangeError);
  assert.throws(() => renderStorybookNote(440, 0.2, 0), RangeError);
});

test("Web Audio adapter schedules notes without third party audio downloads", () => {
  const starts = [];
  const context = {
    currentTime: 12,
    sampleRate: 8000,
    state: "running",
    destination: {},
    createBuffer(channels,length,rate){
      assert.equal(channels,1);
      assert.equal(rate,8000);
      const array = new Float32Array(length);
      return {getChannelData(index){assert.equal(index,0);return array;}};
    },
    createBufferSource(){
      return {
        connect(){},
        start(time){starts.push(time);}
      };
    },
    createGain(){
      return {gain:{value:0},connect(){}};
    }
  };
  assert.equal(playStorybookSound(context,"success"),true);
  assert.equal(starts.length,3);
  assert.ok(starts[0]>=12);
  assert.ok(starts[1]>starts[0]);
  assert.ok(starts[2]>starts[1]);
  assert.equal(playStorybookSound(context,"missing"),false);
  assert.equal(playStorybookSound({...context,state:"closed"},"click"),false);
});
