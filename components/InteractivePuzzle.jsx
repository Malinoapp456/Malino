"use client";
import {useEffect,useMemo,useRef,useState} from "react";
import {puzzleCanPlace,puzzleGridForCount,puzzlePieceBackground,puzzleShuffledOrder,puzzleTargetFromPoint} from "../lib/puzzle-play.mjs";

const copy={
 de:{lead:"Hilf Malino, das Bild zusammenzusetzen!",help:"Tippe zuerst ein Puzzleteil an und dann seinen Platz. Oder ziehe das Teil mit dem Finger auf das Bild.",chosen:"Jetzt den passenden Platz antippen.",wrong:"Das Teil passt hier noch nicht. Versuch ein anderes Feld!",progress:"Richtig gelegt",selection:"Ausgewählt",complete:"Super gemacht! Dein Puzzle ist fertig!",replay:"Noch einmal spielen",tray:"Puzzleteile",board:"Puzzle-Bild",piece:"Teil",slot:"Platz",placed:"richtig gelegt",empty:"frei",drag:"Ziehen oder antippen"},
 pl:{lead:"Pomóż Malino ułożyć obrazek!",help:"Najpierw dotknij elementu, potem jego miejsca. Możesz też przeciągnąć element palcem na obrazek.",chosen:"Dotknij odpowiedniego miejsca na obrazku.",wrong:"Ten element tutaj nie pasuje. Spróbuj innego pola!",progress:"Ułożone",selection:"Wybrany",complete:"Brawo! Puzzle są gotowe!",replay:"Ułóż ponownie",tray:"Elementy puzzli",board:"Obrazek",piece:"Element",slot:"Pole",placed:"ułożone",empty:"wolne",drag:"Przesuń lub dotknij"}
};

// The paper puzzle uses the same image and grid. This play component never
// updates profile rewards, saved collections, stars or PDF data.
export default function InteractivePuzzle({imageSrc,imageWidth,imageHeight,pieceCount=6,language="de",onComplete,onCorrect}){
 const t=copy[language]||copy.de;
 const [cols,rows]=puzzleGridForCount(pieceCount);
 const count=cols*rows;
 const [placed,setPlaced]=useState([]);
 const [selected,setSelected]=useState(null);
 const [notice,setNotice]=useState("");
 const [round,setRound]=useState(0);
 const boardRef=useRef(null);
 const dragRef=useRef(null);
 const placedRef=useRef([]);
 const finishedRef=useRef(false);
 const selectedRef=useRef(null);
 const order=useMemo(()=>puzzleShuffledOrder(count,`${imageSrc}-${pieceCount}-${round}`),[imageSrc,pieceCount,count,round]);
 const done=placed.length===count;
 const ratio=`${imageWidth||1103} / ${imageHeight||1426}`;
 const pieceRatio=`${(imageWidth||1103)/cols} / ${(imageHeight||1426)/rows}`;

 useEffect(()=>{
  placedRef.current=[];selectedRef.current=null;finishedRef.current=false;dragRef.current=null;
  setPlaced([]);setSelected(null);setNotice("");
 },[imageSrc,pieceCount,round]);

 const choosePiece=id=>{
  if(placedRef.current.includes(id)||finishedRef.current)return;
  const next=selectedRef.current===id?null:id;
  selectedRef.current=next;setSelected(next);setNotice(next===null?"":t.chosen);
 };

 const tryPlace=(piece,slot)=>{
  if(piece===null||piece===undefined||finishedRef.current)return false;
  if(!puzzleCanPlace(piece,slot,count,placedRef.current)){
   setNotice(t.wrong);
   return false;
  }
  const next=[...placedRef.current,piece];
  placedRef.current=next;setPlaced(next);
  selectedRef.current=null;setSelected(null);setNotice("");
  if(next.length===count){finishedRef.current=true;onComplete?.()}else{onCorrect?.()}
  return true;
 };

 const pointerDown=(event,id)=>{
  if(placedRef.current.includes(id)||finishedRef.current||!event.isPrimary)return;
  if(event.pointerType==="mouse"&&event.button!==0)return;
  event.preventDefault();
  dragRef.current={id,pointerId:event.pointerId,startX:event.clientX,startY:event.clientY,moved:false};
  event.currentTarget.setPointerCapture?.(event.pointerId);
 };
 const pointerMove=event=>{
  const drag=dragRef.current;
  if(!drag||drag.pointerId!==event.pointerId)return;
  if(Math.hypot(event.clientX-drag.startX,event.clientY-drag.startY)>9)drag.moved=true;
  if(event.cancelable)event.preventDefault();
 };
 const pointerUp=event=>{
  const drag=dragRef.current;
  if(!drag||drag.pointerId!==event.pointerId)return;
  dragRef.current=null;
  if(event.currentTarget.hasPointerCapture?.(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);
  if(drag.moved){
   const rect=boardRef.current?.getBoundingClientRect();
   const target=puzzleTargetFromPoint({x:event.clientX,y:event.clientY},rect,cols,rows);
   if(target>=0){tryPlace(drag.id,target)}else{setNotice(t.help)}
  }else{choosePiece(drag.id)}
 };
 const pointerCancel=event=>{
  if(dragRef.current?.pointerId===event.pointerId)dragRef.current=null;
 };
 const clickPiece=(event,id)=>{
  // Pointer interactions are handled on pointerup. Keyboard/AT clicks
  // still select pieces through this standard button.
  if(event.detail===0)choosePiece(id);
 };
 const reset=()=>setRound(value=>value+1);

 return <div className="malinoPuzzleInteractive">
  <div className="malinoPuzzlePlayHeader">
   <span className="malinoPuzzleMascot" aria-hidden="true">🦁</span>
   <div><b>{t.lead}</b><small>{t.help}</small></div>
   <strong className="malinoPuzzleCount" aria-live="polite">{t.progress} <span>{placed.length}/{count}</span></strong>
  </div>
  <div className="malinoPuzzlePlayLayout">
   <div className="malinoPuzzlePlayBoardSide">
    <div className="malinoPuzzleSideLabel">🖼️ {t.board}</div>
    <div ref={boardRef} className="malinoPuzzlePlayBoard" style={{gridTemplateColumns:`repeat(${cols},minmax(0,1fr))`,gridTemplateRows:`repeat(${rows},minmax(0,1fr))`,aspectRatio:ratio}}>
     {Array.from({length:count},(_,slot)=>{
      const correct=placed.includes(slot);
      return <button type="button" key={slot}
       className={`malinoPuzzleSlot ${correct?"isPlaced":""} ${selected!==null&&!correct?"isAvailable":""}`}
       onClick={()=>tryPlace(selectedRef.current,slot)}
       disabled={correct}
       aria-label={`${t.slot} ${slot+1}, ${correct?t.placed:t.empty}`}
      ><span className="malinoPuzzleSlotArtwork" style={{backgroundImage:`url("${imageSrc}")`,...puzzlePieceBackground(slot,cols,rows)}}/>
       {!correct&&<span className="malinoPuzzleSlotNumber" aria-hidden="true">{slot+1}</span>}
      </button>;
     })}
    </div>
    {done&&<div className="malinoPuzzleWin" role="status" aria-live="polite">
     <span aria-hidden="true">🌟 🦁 🌟</span>
     <b>{t.complete}</b>
     <button type="button" onClick={reset}>↻ {t.replay}</button>
    </div>}
   </div>
   <div className="malinoPuzzlePlayTraySide">
    <div className="malinoPuzzleSideLabel">🧩 {t.tray}</div>
    <div className="malinoPuzzleTray" style={{gridTemplateColumns:`repeat(${Math.min(cols,4)},minmax(0,1fr))`}}>
     {order.filter(id=>!placed.includes(id)).map(id=><button
      type="button" key={id}
      className={`malinoPuzzlePiece ${selected===id?"isSelected":""}`}
      aria-label={`${t.piece} ${id+1}. ${t.drag}`}
      aria-pressed={selected===id}
      onPointerDown={event=>pointerDown(event,id)}
      onPointerMove={pointerMove}
      onPointerUp={pointerUp}
      onPointerCancel={pointerCancel}
      onClick={event=>clickPiece(event,id)}
      style={{aspectRatio:pieceRatio}}
     ><span className="malinoPuzzlePieceArt" style={{backgroundImage:`url("${imageSrc}")`,...puzzlePieceBackground(id,cols,rows)}}/>
      <span className="malinoPuzzlePieceNumber" aria-hidden="true">{id+1}</span>
     </button>)}
    </div>
    {done?<p className="malinoPuzzlePlayNote" role="status">{t.complete}</p>:
     <p className="malinoPuzzlePlayNote" role="status" aria-live="polite">{notice||(selected!==null?`${t.selection}: ${selected+1}. ${t.chosen}`:t.help)}</p>}
    {!done&&<button className="malinoPuzzleReset" type="button" onClick={reset}>↻ {t.replay}</button>}
   </div>
  </div>
 </div>;
}
