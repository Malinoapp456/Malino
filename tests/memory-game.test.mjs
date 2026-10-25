import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {MEMORY_LEVELS,MEMORY_THEMES,memoryDeck,memoryInitialTurn,memoryReveal,memoryHideMismatch} from "../lib/memory-game.mjs";

const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");
const comp=readFileSync(new URL("../components/MemoryGame.jsx",import.meta.url),"utf8");

test("three difficulty levels provide exactly 4, 6 and 8 pairs",()=>{
 assert.equal(MEMORY_LEVELS.leicht.pairs,4);
 assert.equal(MEMORY_LEVELS.mittel.pairs,6);
 assert.equal(MEMORY_LEVELS.schwer.pairs,8);
 for(const [key,meta] of Object.entries(MEMORY_LEVELS)){
  assert.equal(memoryDeck(key,"tiere","same").length,meta.pairs*2);
 }
});

test("each theme contains enough distinct motifs and decks have exact pairs",()=>{
 for(const key of Object.keys(MEMORY_THEMES)){
  assert.ok(new Set(MEMORY_THEMES[key].icons).size>=8);
  for(const difficulty of Object.keys(MEMORY_LEVELS)){
   const deck=memoryDeck(difficulty,key,3141);
   assert.equal(deck.length,MEMORY_LEVELS[difficulty].pairs*2);
   assert.equal(new Set(deck.map(c=>c.id)).size,deck.length);
   const values=[...new Set(deck.map(c=>c.emoji))];
   assert.equal(values.length,deck.length/2);
   for(const emoji of values)assert.equal(deck.filter(c=>c.emoji===emoji).length,2);
  }
 }
});

test("deck order is deterministic for a given level, theme and round",()=>{
 const a=memoryDeck("mittel","maerchen",123),b=memoryDeck("mittel","maerchen",123);
 assert.deepEqual(a,b);
 const next=memoryDeck("mittel","maerchen",124);
 assert.notDeepEqual(a.map(c=>c.id),next.map(c=>c.id));
});

test("first card flips; repeated clicks and invalid cards do not count",()=>{
 const deck=memoryDeck("leicht","tiere","test");
 const initial=memoryInitialTurn();
 assert.deepEqual(initial,{open:[],matched:[],attempts:0,waiting:false,complete:false});
 const one=memoryReveal(deck,initial,deck[0].id);
 assert.equal(one.event,"first");
 assert.equal(one.state.open.length,1);
 assert.equal(one.state.attempts,0);
 assert.equal(memoryReveal(deck,one.state,deck[0].id).event,"ignored");
 assert.equal(memoryReveal(deck,one.state,"does-not-exist").event,"ignored");
 assert.deepEqual(initial.open,[]);
});

test("a mismatch counts one attempt and blocks flipping until timer clears",()=>{
 const deck=memoryDeck("leicht","tiere","mismatch");
 const first=memoryReveal(deck,memoryInitialTurn(),deck[0].id);
 const second=deck.find(c=>c.pair!==deck[0].pair);
 const wrong=memoryReveal(deck,first.state,second.id);
 assert.equal(wrong.event,"mismatch");
 assert.equal(wrong.state.attempts,1);
 assert.deepEqual(wrong.state.open,[deck[0].id,second.id]);
 assert.equal(wrong.state.waiting,true);
 assert.equal(memoryReveal(deck,wrong.state,deck[1].id).event,"ignored");
 const cleared=memoryHideMismatch(wrong.state);
 assert.equal(cleared.waiting,false);
 assert.deepEqual(cleared.open,[]);
 assert.equal(cleared.attempts,1);
 assert.equal(memoryHideMismatch(cleared),cleared);
});

test("matching removes a pair from play, victory requires all matching pairs",()=>{
 const deck=memoryDeck("leicht","tiere","victory");
 let state=memoryInitialTurn();
 for(const pair of new Set(deck.map(c=>c.pair))){
  const cards=deck.filter(c=>c.pair===pair);
  const first=memoryReveal(deck,state,cards[0].id);
  assert.equal(first.event,"first");
  const second=memoryReveal(deck,first.state,cards[1].id);
  assert.equal(second.event,state.matched.length===deck.length-2?"complete":"match");
  state=second.state;
  assert.equal(state.attempts,state.matched.length/2);
  assert.equal(memoryReveal(deck,state,cards[0].id).event,"ignored");
 }
 assert.equal(state.complete,true);
 assert.equal(state.matched.length,deck.length);
 assert.equal(state.open.length,0);
 assert.equal(memoryReveal(deck,state,deck[0].id).event,"ignored");
});

test("Memory is an additional mode and all five previous activities remain available",()=>{
 assert.ok(page.includes('import MemoryGame from "../components/MemoryGame.jsx"'));
 assert.ok(page.includes('craftModeTabs5 craftModeTabs6'));
 assert.ok(page.includes('craftMode==="memory"&&<MemoryGame key={activeProfileId} language={language} onSound={playSound}/>'));
 for(const previous of ["puzzle","maze","difference","hidden","numbers"]){
  assert.ok(page.includes('craftMode==="'+previous+'"'),previous);
  assert.ok(page.includes('setCraftMode("'+previous+'")'),previous);
 }
});

test("mobile-friendly game supports sound toggle and accessible card interaction",()=>{
 for(const key of ["memoryReveal(deck,turnRef.current,id)","memoryHideMismatch(turnRef.current)","setTimeout(()=>","clearTimeout(timeoutRef.current)","onSound?.(\"success\")","onSound?.(\"reward\")",'onClick={()=>flip(card.id)}','disabled={matched||turn.waiting||turn.complete}','aria-label={','aria-pressed={shown}','role="status"','aria-live="polite"','setRound(r=>r+1)'])
  assert.ok(comp.includes(key),key);
 assert.ok(!comp.includes("localStorage"),"no profile persistence modifications");
 assert.ok(!comp.includes("setStars"),"no unintended rewards changes");
 for(const k of [".craftModeTabs6{",".malinoMemoryGrid{",".malinoMemoryCard{",".malinoMemoryVictory{","@media(max-width:650px)","@media(prefers-reduced-motion:reduce)"])
  assert.ok(css.includes(k),k);
 assert.match(css,/\.malinoMemoryCard\{[^}]*touch-action:manipulation;/);
});
