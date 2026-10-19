import test from "node:test";
import assert from "node:assert/strict";
import {worldStatus,worldProgressMessage,worldAccessibilityLabel} from "../lib/world-map.mjs";

test("locked puzzle worlds show the correct unlock threshold in German and Polish",()=>{
 const world={solved:0,total:4,unlocked:false,required:12};
 assert.equal(worldStatus(world,"de"),"🔒 12 Rätsel nötig");
 assert.equal(worldStatus(world,"pl"),"🔒 Ukończ 12 zagadek");
 assert.equal(worldStatus(world),"🔒 12 Rätsel nötig");
});

test("unlocked and completed world labels are consistent across languages",()=>{
 const w={solved:2,total:4,unlocked:true,required:0};
 assert.equal(worldStatus(w,"de"),"Öffnen ›");
 assert.equal(worldStatus(w,"pl"),"Otwórz ›");
 w.solved=4;
 assert.equal(worldStatus(w,"de"),"✓ Geschafft");
 assert.equal(worldStatus(w,"pl"),"✓ Ukończono");
});

test("overall progress encouragement translates and respects completion",()=>{
 assert.equal(worldProgressMessage(8,20,"pl"),"Tak trzymaj! Świetnie Ci idzie!");
 assert.equal(worldProgressMessage(20,20,"de"),"Fantastisch! Alle Rätsel geschafft!");
 assert.equal(worldProgressMessage(20,20,"pl"),"Fantastycznie! Wszystkie zagadki rozwiązane!");
 assert.match(worldProgressMessage(8,20,"de"),/Weiter so/);
});

test("accessible world names include status and progress",()=>{
 assert.equal(worldAccessibilityLabel("Magiczny świat Malino",0,4,false,12,"pl"),
 "Magiczny świat Malino, 0 z 4 rozwiązanych, 🔒 Ukończ 12 zagadek");
 assert.match(worldAccessibilityLabel("Logik-Wald",3,4,true,0,"de"),/3 von 4 gelöst/);
});
