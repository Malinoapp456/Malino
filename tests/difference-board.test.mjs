import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {createDifferenceChanges,applyDifferenceChanges,differenceSwaps,differenceSceneUri} from "../lib/difference-board.mjs";

const themes={
 farm:"🌳 🏠 🚜 🐄 ☀️ 🌼 🐔 🌾 🐷",
 space:"🚀 🪐 ⭐ 👨‍🚀 🌙 🛸 ☄️ 🌎 🛰️",
 forest:"🌲 🦊 🍄 🐿️ 🌼 🪵 🦉 🌰 🐰",
 castle:"🏰 🐉 ⭐ 👑 🌈 🦄 🧚 💎 ☁️",
 ocean:"🐳 🐠 🐚 ⭐ 🐙 🌊 🐬 🦀 🐟",
 dino:"🦕 🌋 🥚 🌴 🦖 ☁️ 🪨 🌿 🦴"
};

test("all six themes have natural illustrated scenery and one-to-one recognizable swaps",()=>{
 const scenes=new Set();
 assert.deepEqual(Object.keys(differenceSwaps).sort(),Object.keys(themes).sort());
 for(const [theme,text] of Object.entries(themes)){
  const tokens=text.split(" ");
  assert.equal(tokens.length,9);
  const swaps=differenceSwaps[theme];
  assert.equal(Object.keys(swaps).length,9);
  for(const token of tokens){
   assert.ok(swaps[token],theme+" missing "+token);
   assert.notEqual(swaps[token],token,theme+" unchanged "+token);
  }
  const data=differenceSceneUri(theme);
  assert.ok(data.startsWith("data:image/svg+xml;charset=utf-8,"));
  const svg=decodeURIComponent(data.slice(data.indexOf(",")+1));
  assert.match(svg,/viewBox="0 0 920 660"/);
  assert.ok(svg.length>1300);
  scenes.add(svg);
 }
 assert.equal(scenes.size,6);
});

test("every seed preserves exactly 3, 5 or 7 differences in nine stable positions",()=>{
 for(const [theme,text] of Object.entries(themes)){
  const tokens=text.split(" ");
  for(const count of [3,5,7]){
   for(const seed of [1,2401,999,42101,-1,2**32-1]){
    const changes=createDifferenceChanges(theme,tokens,count,seed);
    const again=createDifferenceChanges(theme,tokens,count,seed);
    assert.deepEqual(changes,again);
    assert.equal(changes.length,count);
    assert.equal(new Set(changes.map(x=>x.idx)).size,count);
    assert.ok(changes.every(c=>c.idx>=0&&c.idx<9&&c.from!==c.to));
    const modified=applyDifferenceChanges(tokens,changes);
    assert.equal(modified.length,9);
    assert.equal(modified.filter((x,i)=>x!==tokens[i]).length,count);
   }
  }
 }
 assert.throws(()=>createDifferenceChanges("invalid",themes.farm.split(" "),3,1),RangeError);
 assert.throws(()=>createDifferenceChanges("farm",themes.farm.split(" "),10,1),RangeError);
});

test("A and B render the same scenery, only B contains interactive differences",()=>{
 const src=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
 const start=src.indexOf('{craftMode==="difference"&&<>');
 const end=src.indexOf('{craftMode==="hidden"&&<>',start);
 const jsx=src.slice(start,end);
 assert.ok(jsx.includes('src={differenceSceneArt}'));
 assert.equal(jsx.split('src={differenceSceneArt}').length-1,2);
 assert.ok(jsx.includes('markDifference(i)'));
 assert.ok(jsx.includes('differenceFound.includes(i)'));
 assert.ok(jsx.includes('aria-pressed={differenceFound.includes(i)}'));
 assert.ok(src.includes('createDifferenceChanges(differenceThemeId,differenceTokens,activeDifferenceDifficulty.count,differenceHash)'));
 assert.ok(src.includes('applyDifferenceChanges(differenceTokens,differenceChanges)'));
});

test("printed worksheets use 3x3 layout, artwork from screen, and keep synchronous sharing",()=>{
 const src=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
 const start=src.indexOf(' const shareDifferencePdf=()=>{');
 const end=src.indexOf(' const openSavedMaze=item=>{',start);
 const section=src.slice(start,end);
 assert.ok(start>=0&&end>start);
 assert.ok(section.includes('document.querySelector(".differenceArtImage")'));
 assert.ok(section.includes('ctx.drawImage(artwork,panelX,top+47,panelW,panelH-47)'));
 assert.ok(section.includes('Math.floor(i/3)'));
 assert.ok(section.includes('drawPanel(firstY,differenceTokens'));
 assert.ok(section.includes('drawPanel(secondY,changedDifferenceTokens'));
 assert.ok(!section.includes("rows=2"));
 assert.ok(!section.includes("await "));
});
