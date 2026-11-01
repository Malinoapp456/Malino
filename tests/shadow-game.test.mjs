import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {animals,makeRounds} from '../lib/shadow-game.mjs';

test('each animal has a matching pair exactly once and the game goes from two to three choices',()=>{
 for(const roll of [0,.23,.51,.79,.9999]){
  const rounds=makeRounds(()=>roll);
  assert.deepEqual(rounds.map(r=>r.choices.length),[2,2,3,3,3]);
  assert.deepEqual(new Set(rounds.map(r=>r.target)),new Set(Object.keys(animals)));
  for(const {target,choices} of rounds){
   assert.equal(new Set(choices).size,choices.length);
   assert.ok(choices.includes(target));
   assert.ok(choices.every(id=>animals[id]));
  }
 }
});

test('each round has a source illustration and a closed silhouette',()=>{
 for(const [id,animal] of Object.entries(animals)){
  assert.ok(existsSync(new URL('../public/puzzle-'+id+'-color.png',import.meta.url)),id);
  assert.match(animal.path,/^M.+Z$/);
 }
});
