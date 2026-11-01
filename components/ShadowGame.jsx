"use client";
import {useId,useState} from "react";
import {getImageProps} from "next/image";
import {animals,makeRounds} from "../lib/shadow-game.mjs";
import styles from "./ShadowGame.module.css";

const copy={
 pl:{title:"Znajdź cień",intro:"Popatrz, jak pingwin pasuje do swojego cienia.",demo:"Runda pokazowa",play:"Zagraj",round:"Runda",question:"Który cień pasuje?",try:"Przyjrzyj się jeszcze raz. Spróbuj innego cienia.",yes:"Pasuje!",next:"Dalej",finish:"Zobacz wynik",done:"Wszystkie cienie znalezione!",again:"Zagraj ponownie",shadow:"Cień",matches:"Znalezione cienie"},
 de:{title:"Finde den Schatten",intro:"Schau, wie der Pinguin zu seinem Schatten passt.",demo:"So geht’s",play:"Spielen",round:"Runde",question:"Welcher Schatten passt?",try:"Schau noch einmal hin. Probiere einen anderen Schatten.",yes:"Das passt!",next:"Weiter",finish:"Zum Ergebnis",done:"Alle Schatten gefunden!",again:"Noch einmal spielen",shadow:"Schatten",matches:"Gefundene Schatten"}
};
function Animal({id,color=false,reveal=false}){
 const clip=useId().replace(/[^a-zA-Z0-9_-]/g,"");
 const animal=animals[id];
 const {props}=getImageProps({src:'/puzzle-'+id+'-color.png',alt:'',width:384,height:480});
 return <svg aria-hidden="true" viewBox={animal.box} className={styles.animal}>
  <defs><clipPath id={clip}><path d={animal.path}/></clipPath></defs>
  <path d={animal.path} fill="#344563"/>
  {color&&<g className={reveal?styles.reveal:undefined}><image href={props.src} width={animal.width} height="220" preserveAspectRatio="none" clipPath={'url(#'+clip+')'}/></g>}
 </svg>;
}
export default function ShadowGame({language}){
 const t=copy[language]||copy.de;
 const [rounds,setRounds]=useState([]);
 const [index,setIndex]=useState(0);
 const [misses,setMisses]=useState([]);
 const [matched,setMatched]=useState(false);
 const [demo,setDemo]=useState(true);
 const name=id=>animals[id][language]||animals[id].de;
 function start(){
  setRounds(makeRounds());setIndex(0);setMisses([]);setMatched(false);setDemo(false);
 }
 function next(){
  setIndex(i=>i+1);setMisses([]);setMatched(false);
 }
 const round=rounds[index];
 return <section className={styles.game} data-i18n-ignore="true" aria-label={t.title}>
  <h2>🔍 {t.title}</h2>
  {demo?<><b>{t.demo}</b><p>{t.intro}</p>
   <div className={styles.demo}><Animal id="pinguin" color/><span aria-hidden="true">➜</span><div className={styles.demoTarget}><Animal id="pinguin"/><div className={styles.demoOverlay}><Animal id="pinguin" color/></div></div></div>
   <button className={styles.primary} onClick={start}>▶ {t.play}</button>
  </>:!round?<><h3>{t.done}</h3><p>{t.matches} · {rounds.length} / {rounds.length}</p><button className={styles.primary} onClick={start}>↻ {t.again}</button></>:<>
   <b>{t.round} {index+1} / {rounds.length}</b>
   <div className={styles.reference}><Animal id={round.target} color/><strong>{name(round.target)}</strong></div>
   <h3>{t.question}</h3>
   <div className={styles.choices}>{round.choices.map((id,i)=>{
    const correct=matched&&id===round.target,miss=misses.includes(id);
    return <button key={index+'-'+id} aria-label={t.shadow+' '+(i+1)+' — '+name(id)} disabled={matched||miss} className={correct?styles.correct:miss?styles.miss:undefined}
     onClick={()=>id===round.target?setMatched(true):setMisses(v=>[...v,id])}>
     <Animal id={id} color={correct} reveal={correct}/><span aria-hidden="true">{correct?'✓':miss?'↺':i+1}</span>
    </button>;
   })}</div>
   <p role="status" className={styles.feedback}>{matched?t.yes:misses.length?t.try:''}</p>
   {matched&&<button autoFocus className={styles.primary} onClick={next}>{index===rounds.length-1?t.finish:t.next} →</button>}
  </>}
 </section>;
}
