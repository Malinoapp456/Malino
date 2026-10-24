import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {mazeCanStep,mazeTryMove,mazeTraceDrag} from "../lib/maze-play.mjs";

const maze={cols:2,rows:2,cells:[
 {t:1,r:0,b:1,l:1},
 {t:1,r:1,b:0,l:0},
 {t:1,r:0,b:1,l:1},
 {t:0,r:1,b:1,l:0}
]};

const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");
const component=readFileSync(new URL("../components/InteractiveMaze.jsx",import.meta.url),"utf8");

test("legal moves follow adjoining openings in both maze cells",()=>{
 assert.equal(mazeCanStep(maze,0,1),true);
 assert.equal(mazeCanStep(maze,1,3),true);
 assert.equal(mazeCanStep(maze,1,0),true);
 assert.equal(mazeCanStep(maze,3,1),true);
 assert.equal(mazeCanStep(maze,0,2),false);
 assert.equal(mazeCanStep(maze,0,3),false);
 assert.equal(mazeCanStep(maze,1,2),false);
 assert.equal(mazeCanStep(maze,0,0),false);
});

test("no teleportation, exiting bounds or walking into walls by directional controls",()=>{
 assert.equal(mazeTryMove(maze,0,"right"),1);
 assert.equal(mazeTryMove(maze,1,"down"),3);
 assert.equal(mazeTryMove(maze,0,"down"),0);
 assert.equal(mazeTryMove(maze,0,"up"),0);
 assert.equal(mazeTryMove(maze,0,"left"),0);
 assert.equal(mazeTryMove(maze,0,"unknown"),0);
 assert.equal(mazeTryMove(maze,999,"right"),999);
 assert.equal(mazeCanStep(maze,3,4),false);
 assert.equal(mazeCanStep(maze,-1,0),false);
 const broken={cols:2,rows:2,cells:[...maze.cells]};
 broken.cells[1]={...broken.cells[1],l:1};
 assert.equal(mazeCanStep(broken,0,1),false,"both side openings must agree");
});

test("dragging samples intermediate cells and refuses diagonal shortcuts",()=>{
 const right=mazeTraceDrag(maze,0,{x:.5,y:.5},{x:1.5,y:.5});
 assert.deepEqual(right,[1]);
 const down=mazeTraceDrag(maze,1,{x:1.5,y:.5},{x:1.5,y:1.5});
 assert.deepEqual(down,[3]);
 assert.deepEqual(mazeTraceDrag(maze,0,{x:.5,y:.5},{x:.5,y:1.5}),[]);
 assert.deepEqual(mazeTraceDrag(maze,0,{x:.5,y:.5},{x:1.5,y:1.5}),[]);
 assert.deepEqual(mazeTraceDrag(maze,0,null,{x:1.5,y:.5}),[]);
});

test("maze gameplay switches between interactive play and existing A4 print",()=>{
 assert.ok(page.includes('import InteractiveMaze from "../components/InteractiveMaze.jsx"'));
 assert.ok(page.includes('const [mazePlayMode,setMazePlayMode]=useState("play")'));
 assert.ok(page.includes('onClick={()=>setMazePlayMode("play")}'));
 assert.ok(page.includes('onClick={()=>setMazePlayMode("print")}'));
 assert.ok(page.includes('mazePlayMode==="play"?<InteractiveMaze'));
 assert.ok(page.includes('maze={activeMaze} goalEmoji={activeMazeTheme.end} language={language}'));
 assert.ok(page.includes('onComplete={()=>playSound("reward")}'));
 assert.ok(page.includes('<MazeBoard maze={activeMaze} startEmoji={activeMazeTheme.start} endEmoji={activeMazeTheme.end}/>'));
 assert.ok(page.includes('onClick={shareMazePdf}'));
 assert.ok(page.includes('onClick={saveMaze}'));
 assert.ok(page.includes('newMazeVariant'));
 assert.ok(page.includes('savedMazes.map(item=>'));
 assert.ok(page.includes('setSavedMazes([item,...savedMazes].slice(0,18))'));
 assert.ok(page.includes('const file=new File([blob],`malino-labyrinth-${activeMazeTheme.id}-${mazeDifficulty}.pdf`'));
});

test("three existing difficulties and nine maze themes remain",()=>{
 for(const field of ['leicht:{label:"Leicht",age:"4–5",cols:7,rows:5}','mittel:{label:"Mittel",age:"5–7",cols:10,rows:7}','schwer:{label:"Schwer",age:"7+",cols:14,rows:10}'])
  assert.ok(page.includes(field),field);
 for(const theme of ["fox","rocket","dragon","penguin","tractor","firetruck","bee","pirate","dino"])
  assert.ok(page.includes('{id:"'+theme+'",title:'),theme);
});

test("component includes tap, touch drag, keyboard, accessible D-pad, celebration and replay",()=>{
 for(const key of ["onPointerDown={pointerDown}","onPointerMove={pointerMove}","setPointerCapture","mazeTraceDrag(","onKeyDown={onKeys}","ArrowUp","ArrowRight","ArrowDown","ArrowLeft","malinoMazeDirectionPad","aria-label={t.up}","aria-label={t.down}","aria-label={t.right}","aria-label={t.left}","malinoMazeVictory","setReplays(n=>n+1)","onComplete?.()"])
  assert.ok(component.includes(key),key);
 assert.ok(component.includes('goalEmoji'));
 assert.ok(component.includes('🦁'));
 assert.ok(component.includes('useEffect(()=>'));
 assert.ok(!component.includes('setStars('),"the UI-only demo does not change star accounting");
});

test("gameplay styles are isolated and touch-friendly and honor reduced motion",()=>{
 for(const key of [".mazePlayModeSwitch{",".malinoMazeInteractive{",".malinoMazePlayBoard{","touch-action:none",".malinoMazeDirectionPad button{","min-height:47px","@media(max-width:650px)","@media(prefers-reduced-motion:reduce)"])
  assert.ok(css.includes(key),key);
});
