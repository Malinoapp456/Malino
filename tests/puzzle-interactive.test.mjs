import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {
 puzzleGridForCount,puzzleShuffledOrder,puzzleTargetFromPoint,puzzleCanPlace,
 puzzleMovePiece,puzzleReturnToTray,puzzleIsComplete,puzzlePieceBackground
} from "../lib/puzzle-play.mjs";

const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const styles=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");
const comp=readFileSync(new URL("../components/InteractivePuzzle.jsx",import.meta.url),"utf8");

test("playable piece grids match unchanged printable A4 layouts",()=>{
 assert.deepEqual(puzzleGridForCount(4),[2,2]);
 assert.deepEqual(puzzleGridForCount(6),[3,2]);
 assert.deepEqual(puzzleGridForCount(9),[3,3]);
 assert.deepEqual(puzzleGridForCount(12),[4,3]);
 assert.deepEqual(puzzleGridForCount(7),[3,2]);
 assert.ok(page.includes('const craftGrid=craftPieces===4?[2,2]:craftPieces===6?[3,2]:craftPieces===9?[3,3]:[4,3]'));
});

test("scrambled pieces are unique, repeatable and not initially solved",()=>{
 for(const count of [4,6,9,12]){
  const order=puzzleShuffledOrder(count,"Malino-example-"+count);
  assert.equal(order.length,count);
  assert.deepEqual([...order].sort((a,b)=>a-b),Array.from({length:count},(_,i)=>i));
  assert.deepEqual(order,puzzleShuffledOrder(count,"Malino-example-"+count));
  assert.notDeepEqual(order,Array.from({length:count},(_,i)=>i));
 }
});

test("every valid slot accepts a puzzle piece, not just its final correct one",()=>{
 const blank=Array(6).fill(null);
 for(let slot=0;slot<6;slot++)assert.equal(puzzleCanPlace(3,slot,6,blank),true);
 assert.equal(puzzleCanPlace(-1,0,6,blank),false);
 assert.equal(puzzleCanPlace(6,0,6,blank),false);
 assert.equal(puzzleCanPlace(3,6,6,blank),false);
 assert.equal(puzzleCanPlace(3.5,3,6,blank),false);
});

test("tap placement, rearrangement and swaps preserve all pieces",()=>{
 const blank=Array(4).fill(null);
 const wrong=puzzleMovePiece(blank,3,0);
 assert.deepEqual(wrong,[3,null,null,null]);
 const moved=puzzleMovePiece(wrong,3,2);
 assert.deepEqual(moved,[null,null,3,null]);
 const another=puzzleMovePiece(moved,1,0);
 assert.deepEqual(another,[1,null,3,null]);
 const swapped=puzzleMovePiece(another,1,2);
 assert.deepEqual(swapped,[3,null,1,null]);
 assert.deepEqual([...swapped].filter(x=>x!==null).sort((a,b)=>a-b),[1,3]);
 assert.equal(puzzleMovePiece(swapped,1,2),swapped,"dropping in the same slot must not change the board");
});

test("placing a tray piece over an occupied slot returns its displaced piece to the tray",()=>{
 const layout=[null,1,2,null];
 const next=puzzleMovePiece(layout,3,1);
 assert.deepEqual(next,[null,3,2,null]);
 assert.equal(next.includes(1),false);
 assert.deepEqual(layout,[null,1,2,null],"pure helper leaves the previous layout intact");
 const returned=puzzleReturnToTray(next,3);
 assert.deepEqual(returned,[null,null,2,null]);
 assert.equal(puzzleReturnToTray(returned,3),returned);
});

test("completion is awarded only when all puzzle tiles are correctly arranged",()=>{
 assert.equal(puzzleIsComplete([0,1,2,3]),true);
 assert.equal(puzzleIsComplete([0,null,2,3]),false);
 assert.equal(puzzleIsComplete([1,0,2,3]),false);
 assert.equal(puzzleIsComplete([]),false);
 let layout=Array(4).fill(null);
 for(let piece=0;piece<4;piece++)layout=puzzleMovePiece(layout,piece,piece);
 assert.equal(puzzleIsComplete(layout),true);
});

test("touch drops use responsive board coordinates and exclude touches outside",()=>{
 const rect={left:40,top:80,width:300,height:400};
 assert.equal(puzzleTargetFromPoint({x:60,y:110},rect,3,2),0);
 assert.equal(puzzleTargetFromPoint({x:160,y:110},rect,3,2),1);
 assert.equal(puzzleTargetFromPoint({x:260,y:110},rect,3,2),2);
 assert.equal(puzzleTargetFromPoint({x:60,y:290},rect,3,2),3);
 assert.equal(puzzleTargetFromPoint({x:260,y:290},rect,3,2),5);
 assert.equal(puzzleTargetFromPoint({x:340,y:290},rect,3,2),-1);
 assert.equal(puzzleTargetFromPoint({x:41,y:480},rect,3,2),-1);
 assert.equal(puzzleTargetFromPoint(null,rect,3,2),-1);
 assert.equal(puzzleTargetFromPoint({x:80,y:90},null,3,2),-1);
});

test("piece background crops the appropriate image region",()=>{
 assert.deepEqual(puzzlePieceBackground(0,3,2),{backgroundSize:"300% 200%",backgroundPosition:"0% 0%",backgroundRepeat:"no-repeat"});
 assert.deepEqual(puzzlePieceBackground(5,3,2),{backgroundSize:"300% 200%",backgroundPosition:"100% 100%",backgroundRepeat:"no-repeat"});
 assert.deepEqual(puzzlePieceBackground(1,2,2),{backgroundSize:"200% 200%",backgroundPosition:"100% 0%",backgroundRepeat:"no-repeat"});
});

test("existing print, save, reopen and deletion remain intact",()=>{
 assert.ok(page.includes('const [puzzlePlayMode,setPuzzlePlayMode]=useState("play")'));
 assert.ok(page.includes('onClick={()=>setPuzzlePlayMode("play")}'));
 assert.ok(page.includes('onClick={()=>setPuzzlePlayMode("print")}'));
 assert.ok(page.includes('puzzlePlayMode==="play"?<InteractivePuzzle'));
 assert.ok(page.includes('imageSrc={activeCraftSrc} imageWidth={activeCraftTemplate.w} imageHeight={activeCraftTemplate.h} pieceCount={craftPieces}'));
 assert.ok(page.includes('onClick={saveCraftPuzzle}'));
 assert.ok(page.includes('onClick={printCraftPuzzle}'));
 assert.ok(page.includes('savedCraftPuzzles.map(item=>'));
 assert.ok(page.includes('const openSavedCraftPuzzle=item=>'));
 assert.ok(page.includes('setSavedCraftPuzzles([item,...savedCraftPuzzles].slice(0,12))'));
 assert.ok(page.includes('setSavedCraftPuzzles(savedCraftPuzzles.filter('));
 assert.ok(page.includes('<span className="cutScissors cutScissorsA">✂️</span>'));
 assert.ok(page.includes('const printCraftPuzzle=()=>'));
});

test("touch movement, tap selection, occupied-slot swaps and tray return are wired up",()=>{
 for(const needle of [
  'onPointerDown={event=>pointerDown(event,id)}','onPointerDown={occupied?event=>pointerDown(event,piece):undefined}',
  'onPointerMove={pointerMove}','onPointerUp={pointerUp}','onPointerCancel={pointerCancel}',
  'setPointerCapture(event.pointerId)','puzzleTargetFromPoint(','clickOccupiedSlot(event,piece,slot)',
  'movePiece(selectedRef.current,slot)','puzzleMovePiece(before,id,slot)',
  'puzzleReturnToTray(before,id)','puzzleIsComplete(next)','aria-pressed={selected===id}',
  'aria-live="polite"','malinoPuzzleWin','onComplete?.()','setRound(r=>r+1)','malinoPuzzleDragGhost'
 ])assert.ok(comp.includes(needle),needle);
 assert.ok(comp.includes('const correct=layout.filter((piece,slot)=>piece===slot).length'));
 assert.ok(!comp.includes("localStorage"),"game leaves profile storage alone");
 assert.ok(!comp.includes("setStars"),"no unapproved star-accounting change");
});

test("pieces do not pan the whole page and other app areas can scroll",()=>{
 assert.match(styles,/\.malinoPuzzlePiece\{[^}]*touch-action:none;/);
 assert.match(styles,/\.malinoPuzzleSlot\.isPlaced\{[^}]*touch-action:none;/);
 assert.match(styles,/\.malinoPuzzlePlayBoard\{[^}]*touch-action:none;/);
 assert.match(styles,/\.malinoPuzzleDragGhost\{[^}]*pointer-events:none;/);
 assert.ok(styles.includes(".malinoPuzzleReturn{"));
 assert.ok(styles.includes("@media(max-width:650px)"));
 assert.ok(styles.includes("@media(prefers-reduced-motion:reduce)"));
});
