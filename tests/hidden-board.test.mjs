import test from "node:test";
import assert from "node:assert/strict";
import {hiddenPalettes,hiddenPalette,createHiddenPlacements,hiddenSceneSvg,hiddenSceneDataUri} from "../lib/hidden-board.mjs";
import {readFileSync} from "node:fs";

const themes=["forest","farm","ocean","space","dino","fairy"];
const icons=["🦋","🔑","⭐","🪺","🐌","🦉","🍎","💎","🔔"];

test("all six hidden-object themes have distinct, self-contained vector scenes",()=>{
 const art=new Set();
 for(const theme of themes){
  const svg=hiddenSceneSvg(theme);
  assert.match(svg,/<svg xmlns="http:\/\/www.w3.org\/2000\/svg"/);
  assert.match(svg,/viewBox="0 0 920 660"/);
  assert.match(svg,/preserveAspectRatio="none"/);
  assert.ok(svg.length>650,`Scene too simple for ${theme}`);
  assert.ok(!svg.includes("http://") || svg.includes("xmlns="));
  assert.ok(!svg.includes("<script"));
  assert.ok(!svg.includes("<image"));
  assert.ok(Object.hasOwn(hiddenPalettes,theme));
  const data=hiddenSceneDataUri(theme);
  assert.ok(data.startsWith("data:image/svg+xml;charset=utf-8,"));
  assert.equal(decodeURIComponent(data.split(",")[1]),svg);
  art.add(svg);
 }
 assert.equal(art.size,6);
 assert.equal(hiddenPalette("missing"),hiddenPalettes.forest);
 assert.equal(hiddenSceneSvg("missing"),hiddenSceneSvg("forest"));
});

test("up to nine targets stay apart, on-screen and deterministic at every difficulty",()=>{
 for(const count of [5,7,9]){
  const targets=icons.slice(0,count);
  for(const seed of [1,2501,288091,-1,2**32-1]){
   const board=createHiddenPlacements(targets,seed);
   assert.equal(board.length,count);
   assert.deepEqual(board,createHiddenPlacements(targets,seed));
   assert.deepEqual(board.map(p=>p.item),targets);
   for(const p of board){
    assert.ok(p.x>=10 && p.x<=90,`off-board x: ${p.x}`);
    assert.ok(p.y>=10 && p.y<=90,`off-board y: ${p.y}`);
    assert.equal(p.s,1);
   }
   for(let i=0;i<count;i++){
    for(let j=i+1;j<count;j++){
     const x=Math.abs(board[i].x-board[j].x);
     const y=Math.abs(board[i].y-board[j].y);
     assert.ok(x>=23 || y>=18,`Targets overlap: ${JSON.stringify([board[i],board[j]])}`);
    }
   }
  }
 }
 const a=createHiddenPlacements(icons,1),b=createHiddenPlacements(icons,2);
 assert.notDeepEqual(a,b);
 assert.throws(()=>createHiddenPlacements(Array(10).fill("⭐"),1),RangeError);
});

test("app displays the correct Malino and renders identical scene artwork into PDF",()=>{
 const source=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
 const hidden=source.slice(source.indexOf('{craftMode==="hidden"&&<>'),source.indexOf('{craftMode==="numbers"&&<>'));
 assert.ok(hidden.includes('src="/malino-hero-mascot.png"'));
 assert.ok(hidden.includes('src={hiddenSceneArt}'));
 assert.ok(!hidden.includes('activeHiddenTheme.bg.split(" ")'));
 assert.ok(source.includes('document.querySelector(".hiddenSceneIllustration")'));
 assert.ok(!source.includes('const shareHiddenPdf=async()=>'))
 assert.ok(source.includes('x.drawImage(image,px,py,pw,ph)'));
 assert.ok(source.includes('createHiddenPlacements(hiddenTargets,hiddenHash)'));
 assert.ok(source.includes('tapHiddenTarget(p.item,i)'));
 assert.ok(source.includes('const hiddenBoardKey=`${hiddenThemeId}:${hiddenDifficulty}:${hiddenSeed}`'));
});
