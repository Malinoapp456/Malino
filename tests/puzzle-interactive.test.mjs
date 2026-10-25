import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {puzzleGridForCount,puzzleShuffledOrder,puzzleTargetFromPoint,puzzleCanPlace,puzzlePieceBackground} from "../lib/puzzle-play.mjs";

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

test("each piece can be dropped only on its proper unoccupied slot",()=>{
 assert.equal(puzzleCanPlace(3,3,6,[]),true);
 assert.equal(puzzleCanPlace(3,1,6,[]),false);
 assert.equal(puzzleCanPlace(3,3,6,[3]),false);
 assert.equal(puzzleCanPlace(-1,-1,6,[]),false);
 assert.equal(puzzleCanPlace(6,6,6,[]),false);
 assert.equal(puzzleCanPlace(3.5,3.5,6,[]),false);
});

test("touch drop target uses responsive board coordinates and excludes outside touches",()=>{
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

test("existing print, save, reopen and deletion remain intact in crafting section",()=>{
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

test("game supports real finger drag, tap-to-place, keyboard and accessible progress",()=>{
 for(const needle of ['onPointerDown={event=>pointerDown(event,id)}','onPointerMove={pointerMove}','onPointerUp={pointerUp}','onPointerCancel={pointerCancel}','setPointerCapture?.(event.pointerId)','puzzleTargetFromPoint(','onClick={()=>tryPlace(selectedRef.current,slot)}','if(event.detail===0)choosePiece(id)','aria-pressed={selected===id}','role="status"','aria-live="polite"','malinoPuzzleWin','onComplete?.()','setRound(value=>value+1)','malinoPuzzleDragGhost'])
  assert.ok(comp.includes(needle),needle);
 assert.ok(!comp.includes('localStorage'),"game keeps profile storage untouched");
 assert.ok(!comp.includes('setStars'),"no unapproved reward accounting changes");
});

test("touch dragging cannot pan page, other app areas stay scrollable",()=>{
 assert.ok(styles.includes(".malinoPuzzlePiece{"));
 assert.match(styles,/\.malinoPuzzlePiece\{[^}]*touch-action:none;/);
 assert.ok(styles.includes(".malinoPuzzleDragGhost{"));
 assert.match(styles,/\.malinoPuzzleDragGhost\{[^}]*pointer-events:none;/);
 assert.match(styles,/\.malinoPuzzleSlot\{[^}]*touch-action:manipulation;/);
 assert.ok(styles.includes("@media(max-width:650px)"));
 assert.ok(styles.includes("@media(prefers-reduced-motion:reduce)"));
});
