"use client";
import {useEffect,useMemo,useRef,useState} from "react";
import {puzzleGridForCount,puzzleIsComplete,puzzleMovePiece,puzzlePieceBackground,puzzleReturnToTray,puzzleShuffledOrder,puzzleTargetFromPoint} from "../lib/puzzle-play.mjs";

const copy={
 de:{
  lead:"Hilf Malino, das Bild zusammenzusetzen!",
  help:"Tippe ein Teil an und danach ein Feld – oder ziehe es direkt auf das Bild. Auch vertauschte Teile kannst du wieder verschieben!",
  chosen:"Tippe auf ein Feld, um das Teil dort abzulegen.",
  progress:"Am richtigen Platz",complete:"Super gemacht! Dein Puzzle ist fertig!",
  replay:"Noch einmal spielen",tray:"Puzzleteile",board:"Puzzle-Bild",
  piece:"Teil",slot:"Feld",free:"frei",full:"belegt",correct:"richtig",
  return:"Teil zurücklegen",selected:"Ausgewähltes Teil",hint:"Verschiebe die Teile, bis das Bild stimmt.",
  placeHint:"Verschiebe das ausgewählte Teil in ein Feld oder zurück in die Ablage."
 },
 pl:{
  lead:"Pomóż Malino ułożyć obrazek!",
  help:"Dotknij elementu, a potem pola — lub przeciągnij go na obrazek. Możesz także zamieniać elementy miejscami!",
  chosen:"Dotknij dowolnego pola, aby położyć tam element.",
  progress:"Na swoim miejscu",complete:"Brawo! Puzzle są gotowe!",
  replay:"Ułóż ponownie",tray:"Elementy puzzli",board:"Obrazek",
  piece:"Element",slot:"Pole",free:"puste",full:"zajęte",correct:"poprawne",
  return:"Odłóż element",selected:"Wybrany element",hint:"Przestawiaj elementy, aż obrazek będzie kompletny.",
  placeHint:"Przenieś wybrany element na planszę lub odłóż na tackę."
 }
};

export default function InteractivePuzzle({imageSrc,imageWidth,imageHeight,pieceCount=6,language="de",onComplete,onCorrect}){
 const t=copy[language]||copy.de;
 const [cols,rows]=puzzleGridForCount(pieceCount);
 const count=cols*rows;
 const [layout,setLayout]=useState(()=>Array(count).fill(null));
 const [selected,setSelected]=useState(null);
 const [round,setRound]=useState(0);
 const [dragVisual,setDragVisual]=useState(null);
 const boardRef=useRef(null);
 const trayRef=useRef(null);
 const dragRef=useRef(null);
 const layoutRef=useRef(Array(count).fill(null));
 const selectedRef=useRef(null);
 const finishedRef=useRef(false);
 const ignoreClickRef=useRef(null);
 const order=useMemo(()=>puzzleShuffledOrder(count,`${imageSrc}-${pieceCount}-${round}`),[imageSrc,pieceCount,count,round]);
 const ratio=`${imageWidth||1103} / ${imageHeight||1426}`;
 const pieceRatio=`${(imageWidth||1103)/cols} / ${(imageHeight||1426)/rows}`;
 const correct=layout.filter((piece,slot)=>piece===slot).length;
 const done=puzzleIsComplete(layout);
 const remaining=order.filter(id=>!layout.includes(id));

 useEffect(()=>{
  const blank=Array(count).fill(null);
  layoutRef.current=blank;selectedRef.current=null;finishedRef.current=false;dragRef.current=null;ignoreClickRef.current=null;
  setLayout(blank);setSelected(null);setDragVisual(null);
 },[imageSrc,pieceCount,count,round]);

 const selectPiece=id=>{
  if(finishedRef.current)return;
  const next=selectedRef.current===id?null:id;
  selectedRef.current=next;setSelected(next);
 };

 const movePiece=(id,slot)=>{
  if(finishedRef.current||id===null||id===undefined)return;
  const before=layoutRef.current;
  const next=puzzleMovePiece(before,id,slot);
  if(next===before)return;
  layoutRef.current=next;setLayout(next);
  selectedRef.current=null;setSelected(null);
  if(puzzleIsComplete(next)){
   finishedRef.current=true;
   onComplete?.();
  }else if(next[slot]===slot){onCorrect?.()}
 };

 const putBack=id=>{
  if(id===null||id===undefined||finishedRef.current)return;
  const before=layoutRef.current,next=puzzleReturnToTray(before,id);
  if(next!==before){layoutRef.current=next;setLayout(next)}
  selectedRef.current=null;setSelected(null);
 };

 const clickSlot=slot=>{
  if(finishedRef.current)return;
  const selection=selectedRef.current;
  if(selection!==null){movePiece(selection,slot);return}
  const existing=layoutRef.current[slot];
  if(existing!==null)selectPiece(existing);
 };

 const clickOccupiedSlot=(event,piece,slot)=>{
  const ignored=ignoreClickRef.current;
  if(ignored&&ignored.id===piece&&Date.now()-ignored.when<220){
   ignoreClickRef.current=null;
   return;
  }
  if(selectedRef.current!==null&&selectedRef.current!==piece){
   movePiece(selectedRef.current,slot);
  }else{
   selectPiece(piece);
  }
 };

 const onPieceClick=(event,id)=>{
  // A drag often synthesizes a click on the captured piece. Swallow that
  // synthetic click, but keep normal mouse, touch, keyboard and AT clicks.
  const ignored=ignoreClickRef.current;
  if(ignored&&ignored.id===id&&Date.now()-ignored.when<220){
   ignoreClickRef.current=null;
   return;
  }
  selectPiece(id);
 };

 const pointerDown=(event,id)=>{
  if(finishedRef.current||!event.isPrimary)return;
  if(event.pointerType==="mouse"&&event.button!==0)return;
  const rect=event.currentTarget.getBoundingClientRect();
  dragRef.current={id,pointerId:event.pointerId,startX:event.clientX,startY:event.clientY,
   moved:false,width:rect.width,height:rect.height};
  try{event.currentTarget.setPointerCapture(event.pointerId)}catch{}
 };
 const pointerMove=event=>{
  const drag=dragRef.current;
  if(!drag||drag.pointerId!==event.pointerId)return;
  const distance=Math.hypot(event.clientX-drag.startX,event.clientY-drag.startY);
  if(distance>7)drag.moved=true;
  if(drag.moved){
   if(event.cancelable)event.preventDefault();
   setDragVisual({id:drag.id,x:event.clientX,y:event.clientY,width:drag.width,height:drag.height});
  }
 };
 const pointerUp=event=>{
  const drag=dragRef.current;
  if(!drag||drag.pointerId!==event.pointerId)return;
  dragRef.current=null;setDragVisual(null);
  try{if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId)}catch{}
  if(!drag.moved)return;
  ignoreClickRef.current={id:drag.id,when:Date.now()};
  const rect=boardRef.current?.getBoundingClientRect();
  const slot=puzzleTargetFromPoint({x:event.clientX,y:event.clientY},rect,cols,rows);
  if(slot>=0){
   movePiece(drag.id,slot);
  }else{
   const tray=trayRef.current?.getBoundingClientRect();
   if(tray&&event.clientX>=tray.left&&event.clientX<=tray.right&&event.clientY>=tray.top&&event.clientY<=tray.bottom){
    putBack(drag.id);
   }
  }
 };
 const pointerCancel=event=>{
  if(dragRef.current?.pointerId===event.pointerId){
   dragRef.current=null;setDragVisual(null);
  }
 };
 const reset=()=>setRound(r=>r+1);

 return <div className="malinoPuzzleInteractive">
  <div className="malinoPuzzlePlayHeader">
   <span className="malinoPuzzleMascot" aria-hidden="true">🦁</span>
   <div><b>{t.lead}</b><small>{t.help}</small></div>
   <strong className="malinoPuzzleCount" aria-live="polite">{t.progress} <span>{correct}/{count}</span></strong>
  </div>

  <div className="malinoPuzzlePlayLayout">
   <div className="malinoPuzzlePlayBoardSide">
    <div className="malinoPuzzleSideLabel">🖼️ {t.board}</div>
    <div ref={boardRef} className="malinoPuzzlePlayBoard"
     style={{gridTemplateColumns:`repeat(${cols},minmax(0,1fr))`,gridTemplateRows:`repeat(${rows},minmax(0,1fr))`,aspectRatio:ratio}}>
     {layout.map((piece,slot)=>{
      const occupied=piece!==null;
      const isCorrect=occupied&&piece===slot;
      return <button type="button" key={slot}
       className={`malinoPuzzleSlot ${occupied?"isPlaced":""} ${isCorrect?"isCorrect":""} ${selected!==null?"isAvailable":""} ${occupied&&selected===piece?"isSelected":""}`}
       onClick={event=>occupied?clickOccupiedSlot(event,piece,slot):clickSlot(slot)}
       onPointerDown={occupied?event=>pointerDown(event,piece):undefined}
       onPointerMove={occupied?pointerMove:undefined}
       onPointerUp={occupied?pointerUp:undefined}
       onPointerCancel={occupied?pointerCancel:undefined}
       aria-pressed={occupied&&selected===piece}
       aria-label={occupied?`${t.slot} ${slot+1}, ${t.piece} ${piece+1}, ${isCorrect?t.correct:t.full}`:`${t.slot} ${slot+1}, ${t.free}`}
      >
       <span className="malinoPuzzleSlotArtwork" style={{backgroundImage:`url("${imageSrc}")`,...puzzlePieceBackground(occupied?piece:slot,cols,rows)}}/>
       {!occupied&&<span className="malinoPuzzleSlotNumber" aria-hidden="true">{slot+1}</span>}
       {isCorrect&&<span className="malinoPuzzlePlacedCheck" aria-hidden="true">✓</span>}
      </button>;
     })}
    </div>
    {done&&<div className="malinoPuzzleWin" role="status" aria-live="polite">
     <span aria-hidden="true">🌟 🦁 🌟</span>
     <b>{t.complete}</b>
     <button type="button" onClick={reset}>↻ {t.replay}</button>
    </div>}
   </div>

   <div className="malinoPuzzlePlayTraySide" ref={trayRef}>
    <div className="malinoPuzzleSideLabel">🧩 {t.tray}</div>
    <div className="malinoPuzzleTray" style={{gridTemplateColumns:`repeat(${Math.min(cols,4)},minmax(0,1fr))`}}>
     {remaining.map(id=><button type="button" key={id}
      className={`malinoPuzzlePiece ${selected===id?"isSelected":""}`}
      aria-label={`${t.piece} ${id+1}`}
      aria-pressed={selected===id}
      onPointerDown={event=>pointerDown(event,id)}
      onPointerMove={pointerMove}
      onPointerUp={pointerUp}
      onPointerCancel={pointerCancel}
      onClick={event=>onPieceClick(event,id)}
      style={{aspectRatio:pieceRatio}}
     ><span className="malinoPuzzlePieceArt" style={{backgroundImage:`url("${imageSrc}")`,...puzzlePieceBackground(id,cols,rows)}}/>
      <span className="malinoPuzzlePieceNumber" aria-hidden="true">{id+1}</span>
     </button>)}
    </div>
    <p className="malinoPuzzlePlayNote" role="status" aria-live="polite">{done?t.complete:selected!==null?`${t.selected}: ${selected+1}. ${t.chosen}`:t.hint}</p>
    {selected!==null&&<button type="button" className="malinoPuzzleReturn" onClick={()=>putBack(selectedRef.current)}>↩ {t.return}</button>}
    {!done&&<button className="malinoPuzzleReset" type="button" onClick={reset}>↻ {t.replay}</button>}
   </div>
  </div>
  {dragVisual&&<div className="malinoPuzzleDragGhost" aria-hidden="true"
   style={{left:dragVisual.x-dragVisual.width/2,top:dragVisual.y-dragVisual.height/2,width:dragVisual.width,height:dragVisual.height}}>
   <span style={{backgroundImage:`url("${imageSrc}")`,...puzzlePieceBackground(dragVisual.id,cols,rows)}}/>
  </div>}
 </div>;
}
