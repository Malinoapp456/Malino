import test from 'node:test';
import assert from 'node:assert/strict';
import {createMalinoSpeech,spokenHelp} from '../lib/malino-speech.mjs';
function fixture(){
 let time=10000,canceled=0;const spoken=[],states=[];
 const voices=[{lang:'en-US'},{lang:'de-DE'}];
 const speech=createMalinoSpeech({SpeechSynthesisUtterance:class{constructor(text){this.text=text;}},speechSynthesis:{cancel(){canceled++;},getVoices(){return voices;},speak(u){spoken.push(u);}}},s=>states.push(s),()=>time);
 return {speech,spoken,states,voices,tick(){time+=7000;},get canceled(){return canceled;}};
}
test('speech needs explicit activation; instructions choose German and replace queued speech',()=>{
 const f=fixture();assert.equal(f.speech.praise('reward'),false);
 assert.equal(f.speech.instruction('Hallo'),true);assert.equal(f.spoken[0].lang,'de-DE');assert.equal(f.spoken[0].voice,f.voices[1]);
 f.speech.instruction('Weiter');assert.equal(f.canceled,2);assert.equal(f.spoken.length,2);
 f.spoken[0].onend();assert.equal(f.states.at(-1),'speaking');
});
test('praise avoids interrupting instructions, ignores clicks, and throttles frequent successes',()=>{
 const f=fixture();f.speech.instruction('Hallo');assert.equal(f.speech.praise('success'),false);
 f.spoken[0].onend();assert.equal(f.speech.praise('click'),false);assert.equal(f.speech.praise('success'),true);
 f.spoken[1].onend();assert.equal(f.speech.praise('reward'),false);f.tick();assert.equal(f.speech.praise('reward'),true);
});
test('muting cancels speech and prevents delayed praise even after unmuting',()=>{
 const f=fixture();f.speech.instruction('Hallo');f.speech.setEnabled(false);
 assert.equal(f.states.at(-1),'idle');assert.equal(f.speech.instruction('Still'),false);assert.equal(f.speech.praise('reward'),false);
 f.speech.setEnabled(true);assert.equal(f.speech.praise('reward'),false);
});
test('unsupported browsers and speech failures degrade without throwing',()=>{
 const absent=createMalinoSpeech({});assert.equal(absent.supported,false);assert.equal(absent.instruction('Hi'),false);absent.stop();
 const states=[];const broken=createMalinoSpeech({SpeechSynthesisUtterance:class{},speechSynthesis:{cancel(){},getVoices(){throw Error('unavailable');}}},s=>states.push(s));
 assert.equal(broken.instruction('Hi'),false);assert.equal(states.at(-1),'error');
});
test('help follows game and print mode; parent area has no speech panel',()=>{
 assert.match(spokenHelp('crafts','memory'),/zwei Karten/);assert.match(spokenHelp('crafts','puzzle','print'),/Drucken/);
 assert.equal(spokenHelp('parent'),undefined);
 for(const mode of ['puzzle','maze','difference','hidden','numbers','memory'])assert.ok(spokenHelp('crafts',mode));
});
