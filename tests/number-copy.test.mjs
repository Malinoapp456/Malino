import test from "node:test";
import assert from "node:assert/strict";
import {numberColoringNote,numberColoringBoardTitle,numberColoringPrintCopy} from "../lib/number-coloring-copy.mjs";

test("all seven images have Polish and German instructions",()=>{
 const expected={rocket:"rakiety",dino:"dinozaura",unicorn:"jednorożca",robot:"robota",tractor:"traktora",fish:"podwodnym",malino:"Grzywa"};
 for(const [id,word] of Object.entries(expected)){
  const pl=numberColoringNote(id,"pl");
  assert.ok(pl.includes(word),id+": "+pl);
  assert.notEqual(pl,numberColoringNote(id,"de"));
 }
 assert.equal(numberColoringNote("unknown","pl"),numberColoringNote("malino","pl"));
});

test("theme labels translate without changing persistent image IDs",()=>{
 assert.equal(numberColoringBoardTitle("rocket","pl"),"Rakieta");
 assert.equal(numberColoringBoardTitle("dino","pl"),"Dinozaur");
 assert.equal(numberColoringBoardTitle("unicorn","pl"),"Jednorożec");
 assert.equal(numberColoringBoardTitle("robot","pl"),"Robot");
 assert.equal(numberColoringBoardTitle("fish","pl"),"Podwodny świat");
 assert.equal(numberColoringBoardTitle("dino","de"),"Dinosaurier");
});

test("A4 print labels are localized with the original German defaults intact",()=>{
 const pl=numberColoringPrintCopy("pl"),de=numberColoringPrintCopy("de");
 for(const key of ["heading","instruction","colors","footer","shareTitle"]){
  assert.ok(pl[key]);
  assert.notEqual(pl[key],de[key]);
 }
 assert.equal(pl.heading,"Kolorowanie według numerów");
 assert.equal(pl.colors,"Kolory:");
 assert.equal(de.heading,"Malen nach Zahlen");
});
