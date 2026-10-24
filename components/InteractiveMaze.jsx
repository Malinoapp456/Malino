"use client";
import {useEffect,useRef,useState} from "react";
import {mazeCanStep,mazeTraceDrag,mazeTryMove} from "../lib/maze-play.mjs";

const keyDirections={ArrowUp:"up",ArrowRight:"right",ArrowDown:"down",ArrowLeft:"left",w:"up",d:"right",s:"down",a:"left"};
const labels={
 de:{instructions:"Hilf Malino, den Weg zum Ziel zu finden!",touch:"Ziehe Malino mit dem Finger durch die Gänge oder tippe das nächste Feld an.",keyboard:"Mit den Pfeiltasten oder den Richtungsknöpfen spielen.",steps:"Schritte",wall:"Da ist eine Wand! Versuche einen anderen Weg.",success:"Juhu! Malino hat es geschafft!",replay:"Noch einmal spielen",up:"Nach oben",right:"Nach rechts",down:"Nach unten",left:"Nach links",board:"Interaktives Labyrinth mit Malino",status:"Malino ist unterwegs"},
 pl:{instructions:"Pomóż Malino znaleźć drogę do celu!",touch:"Przesuwaj Malino palcem po korytarzach albo stukaj w sąsiednie pola.",keyboard:"Możesz też używać strzałek lub przycisków kierunkowych.",steps:"Kroki",wall:"To ściana! Spróbuj innej drogi.",success:"Brawo! Malino dotarł do celu!",replay:"Zagraj ponownie",up:"W górę",right:"W prawo",down:"W dół",left:"W lewo",board:"Interaktywny labirynt z Malino",status:"Malino szuka drogi"}
};

export default function InteractiveMaze({maze,goalEmoji="🏠",language="de",resetKey=0,onComplete}){
 const t=labels[language]||labels.de;
 const [position,setPosition]=useState(0);
 const [trail,setTrail]=useState([0]);
 const [done,setDone]=useState(false);
 const [notice,setNotice]=useState("");
 const [replays,setReplays]=useState(0);
 const svgRef=useRef(null);
 const positionRef=useRef(0);
 const finishedRef=useRef(false);
 const dragRef=useRef(null);
 const goal=(maze?.cols||1)*(maze?.rows||1)-1;
 const total=maze?.cols*maze?.rows||0;

 useEffect(()=>{
  positionRef.current=0;finishedRef.current=false;dragRef.current=null;
  setPosition(0);setTrail([0]);setDone(false);setNotice("");
 },[maze,resetKey,replays]);

 const applyMoves=moves=>{
  if(finishedRef.current||!maze)return;
  let here=positionRef.current;
  const taken=[];
  let justFinished=false;
  for(const next of moves){
   if(!mazeCanStep(maze,here,next))break;
   here=next;taken.push(next);
   if(here===goal){justFinished=true;break}
  }
  if(!taken.length)return;
  positionRef.current=here;
  setPosition(here);
  setTrail(previous=>{
   const nextTrail=[...previous];
   for(const next of taken){
    if(nextTrail.length>1&&nextTrail[nextTrail.length-2]===next)nextTrail.pop();
    else nextTrail.push(next);
   }
   return nextTrail;
  });
  setNotice("");
  if(justFinished&&!finishedRef.current){
   finishedRef.current=true;
   setDone(true);
   onComplete?.();
  }
 };

 const move=direction=>{
  if(finishedRef.current)return;
  const next=mazeTryMove(maze,positionRef.current,direction);
  if(next===positionRef.current){
   setNotice(t.wall);
   return;
  }
  applyMoves([next]);
 };

 const pointFromEvent=event=>{
  const svg=svgRef.current;
  if(!svg)return null;
  const matrix=svg.getScreenCTM();
  if(!matrix)return null;
  const point=svg.createSVGPoint();
  point.x=event.clientX;point.y=event.clientY;
  const xy=point.matrixTransform(matrix.inverse());
  return{x:xy.x/50,y:xy.y/50};
 };
 const cellAtPoint=point=>{
  if(!point||point.x<0||point.y<0||point.x>=maze.cols||point.y>=maze.rows)return -1;
  return Math.floor(point.y)*maze.cols+Math.floor(point.x);
 };

 const pointerDown=event=>{
  if(finishedRef.current||!maze)return;
  if(event.pointerType==="mouse"&&event.button!==0)return;
  const at=pointFromEvent(event),index=cellAtPoint(at),current=positionRef.current;
  if(index<0||(index!==current&&!mazeCanStep(maze,current,index)))return;
  event.preventDefault();
  if(index!==current)applyMoves([index]);
  dragRef.current={id:event.pointerId,last:at};
  event.currentTarget.setPointerCapture?.(event.pointerId);
 };
 const pointerMove=event=>{
  const drag=dragRef.current;
  if(!drag||drag.id!==event.pointerId||finishedRef.current)return;
  const point=pointFromEvent(event);
  if(!point)return;
  const cells=mazeTraceDrag(maze,positionRef.current,drag.last,point);
  if(cells.length)applyMoves(cells);
  drag.last=point;
 };
 const pointerEnd=event=>{
  if(dragRef.current?.id!==event.pointerId)return;
  dragRef.current=null;
  if(event.currentTarget.hasPointerCapture?.(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);
 };
 const onKeys=event=>{
  if(event.altKey||event.ctrlKey||event.metaKey)return;
  const dir=keyDirections[event.key];
  if(dir){event.preventDefault();move(dir)}
 };
 if(!maze||!total)return null;
 const w=maze.cols*50,h=maze.rows*50;
 const x=i=>(i%maze.cols)*50+25;
 const y=i=>Math.floor(i/maze.cols)*50+25;
 const path=trail.map(i=>x(i)+","+y(i)).join(" ");

 return <div className="malinoMazeInteractive" onKeyDown={onKeys}>
  <div className="malinoMazePlayIntro">
   <div className="malinoMazePlaySticker" aria-hidden="true">🦁</div>
   <div><b>{t.instructions}</b><small>{t.touch}</small></div>
   <span className="malinoMazeStepCount">👣 {t.steps}: {Math.max(0,trail.length-1)}</span>
  </div>
  <div className="malinoMazePlaySurface">
   <svg ref={svgRef} tabIndex={0} className="malinoMazePlayBoard" viewBox={`0 0 ${w} ${h}`}
    role="group" aria-label={t.board}
    onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerEnd} onPointerCancel={pointerEnd}>
    <rect x="0" y="0" width={w} height={h} rx="13" fill="#fff9f4"/>
    {maze.cells.map((c,i)=><rect key={"floor"+i} x={i%maze.cols*50+3} y={Math.floor(i/maze.cols)*50+3} width="44" height="44" rx="13" fill={(i%maze.cols+Math.floor(i/maze.cols))%2?"#f5f0ff":"#edf8ff"} opacity=".75"/>)}
    {trail.length>1&&<polyline points={path} fill="none" stroke="#c8afea" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" opacity=".75"/>}
    {trail.length>1&&<polyline points={path} fill="none" stroke="#8c70d8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 11"/>}
    <circle cx={x(goal)} cy={y(goal)} r="19" fill="#fff1bb" stroke="#ffcf74" strokeWidth="2.5"/>
    <text x={x(goal)} y={y(goal)+9} fontSize="27" textAnchor="middle">{goalEmoji}</text>
    <g stroke="#4865a1" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round">
     {maze.cells.map((c,i)=>{
      const bx=(i%maze.cols)*50,by=Math.floor(i/maze.cols)*50;
      return <g key={i}>
       {c.t&&<line x1={bx} y1={by} x2={bx+50} y2={by}/>}
       {c.r&&<line x1={bx+50} y1={by} x2={bx+50} y2={by+50}/>}
       {c.b&&<line x1={bx} y1={by+50} x2={bx+50} y2={by+50}/>}
       {c.l&&<line x1={bx} y1={by} x2={bx} y2={by+50}/>}
      </g>;
     })}
    </g>
    <circle cx={x(position)} cy={y(position)} r="21" fill="#fff" stroke="#e7b6e5" strokeWidth="3"/>
    <text x={x(position)} y={y(position)+10} fontSize="30" textAnchor="middle" aria-hidden="true">🦁</text>
   </svg>
   {done&&<div className="malinoMazeVictory" role="status">
    <div className="malinoMazeStars" aria-hidden="true">🌟 ⭐ 🌟</div>
    <strong>{t.success}</strong>
    <button type="button" onClick={()=>setReplays(n=>n+1)}>🔄 {t.replay}</button>
   </div>}
  </div>
  <div className="malinoMazeDirectionPad" aria-label={t.keyboard}>
   <button type="button" className="mazePadUp" onClick={()=>move("up")} disabled={done} aria-label={t.up}>▲</button>
   <button type="button" className="mazePadLeft" onClick={()=>move("left")} disabled={done} aria-label={t.left}>◀</button>
   <button type="button" className="mazePadDown" onClick={()=>move("down")} disabled={done} aria-label={t.down}>▼</button>
   <button type="button" className="mazePadRight" onClick={()=>move("right")} disabled={done} aria-label={t.right}>▶</button>
  </div>
  <p className="malinoMazeHelp" role="status" aria-live="polite">{notice||t.keyboard}</p>
  {!done&&<button type="button" className="malinoMazeRestart" onClick={()=>setReplays(n=>n+1)}>↻ {t.replay}</button>}
 </div>;
}
