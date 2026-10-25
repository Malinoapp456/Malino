"use client";

import {useEffect,useMemo,useRef,useState} from "react";
import {MEMORY_LEVELS,MEMORY_THEMES,memoryDeck,memoryHideMismatch,memoryInitialTurn,memoryReveal} from "../lib/memory-game.mjs";

const COPY={
 de:{
  eyebrow:"Malinos Zauberwelt",title:"Bajkowe Memory",intro:"Decke zwei Karten auf und finde alle gleichen Paare!",
  settings:"Dein Abenteuer",theme:"Motiv",level:"Schwierigkeit",pairs:"Paare",moves:"Versuche",
  deck:"Memory-Spielkarten",back:"Verdeckte Karte",found:"Paar gefunden",turned:"Aufgedeckt",
  success:"Zauberhaft! Du hast alle Paare gefunden!",winDetail:"Malino ist stolz auf dich!",
  again:"Noch einmal spielen",new:"Neue Karten mischen",
  first:"Toll! Suche jetzt die passende zweite Karte.",
  mismatch:"Noch nicht gleich. Merk dir die Bilder und versuch es wieder!",
  match:"Juhu! Ein Pärchen gefunden!",
  finished:"Super gemacht! Alle Paare gefunden!"
 },
 pl:{
  eyebrow:"Magiczny świat Malino",title:"Bajkowe Memory",intro:"Odkrywaj po dwie karty i znajdź wszystkie takie same pary!",
  settings:"Twoja przygoda",theme:"Motyw",level:"Trudność",pairs:"Pary",moves:"Próby",
  deck:"Karty Memory",back:"Zakryta karta",found:"Znaleziona para",turned:"Odkryta karta",
  success:"Magicznie! Wszystkie pary znalezione!",winDetail:"Malino jest z Ciebie dumny!",
  again:"Zagraj ponownie",new:"Wymieszaj karty",
  first:"Świetnie! Znajdź teraz drugą taką samą kartę.",
  mismatch:"To różne obrazki. Zapamiętaj je i spróbuj ponownie!",
  match:"Hurra! Para znaleziona!",
  finished:"Brawo! Wszystkie pary znalezione!"
 }
};

export default function MemoryGame({language="de",onSound}){
 const t=COPY[language]||COPY.de;
 const [difficulty,setDifficulty]=useState("leicht");
 const [theme,setTheme]=useState("tiere");
 const [round,setRound]=useState(0);
 const [turn,setTurn]=useState(memoryInitialTurn);
 const [feedback,setFeedback]=useState("");
 const timeoutRef=useRef(null);
 const turnRef=useRef(memoryInitialTurn());
 const deck=useMemo(()=>memoryDeck(difficulty,theme,round),[difficulty,theme,round]);
 const visible=new Set([...turn.open,...turn.matched]);
 const totalPairs=deck.length/2;

 // Reset the game when the child changes the level, world, or deck.
 // Cancel the mismatch timer on unmount to avoid stale updates.
 useEffect(()=>{
  if(timeoutRef.current!==null)clearTimeout(timeoutRef.current);
  timeoutRef.current=null;
  const empty=memoryInitialTurn();
  turnRef.current=empty;
  setTurn(empty);
  setFeedback("");
  return()=>{
   if(timeoutRef.current!==null)clearTimeout(timeoutRef.current);
   timeoutRef.current=null;
  };
 },[difficulty,theme,round]);

 const flip=id=>{
  const result=memoryReveal(deck,turnRef.current,id);
  if(result.event==="ignored")return;
  turnRef.current=result.state;
  setTurn(result.state);
  if(result.event==="first"){
   setFeedback(t.first);
  }else if(result.event==="mismatch"){
   setFeedback(t.mismatch);
   timeoutRef.current=setTimeout(()=>{
    const next=memoryHideMismatch(turnRef.current);
    turnRef.current=next;
    setTurn(next);
    timeoutRef.current=null;
   },1000);
  }else if(result.event==="match"){
   setFeedback(t.match);
   onSound?.("success");
  }else if(result.event==="complete"){
   setFeedback(t.finished);
   onSound?.("reward");
  }
 };

 const restart=()=>setRound(r=>r+1);

 return <section className="malinoMemory" aria-label={t.title}>
  <div className="malinoMemoryHero">
   <span className="malinoMemoryHeroLion" aria-hidden="true">🦁</span>
   <div>
    <span className="malinoMemoryEyebrow">✨ {t.eyebrow} ✨</span>
    <h2>{t.title}</h2>
    <p>{t.intro}</p>
   </div>
   <span className="malinoMemoryHeroDecoration" aria-hidden="true">⭐ 🌈 🦋</span>
  </div>

  <div className="malinoMemorySettings">
   <div className="malinoMemorySettingsGroup">
    <b>🪄 {t.theme}</b>
    <div className="malinoMemoryThemeButtons" role="group" aria-label={t.theme}>
     {Object.entries(MEMORY_THEMES).map(([id,meta])=><button type="button" key={id}
      className={theme===id?"active":""} aria-pressed={theme===id} onClick={()=>setTheme(id)}>
      <span aria-hidden="true">{meta.emoji}</span>
      {language==="pl"?meta.labelPl:meta.labelDe}
     </button>)}
    </div>
   </div>
   <div className="malinoMemorySettingsGroup">
    <b>🎯 {t.level}</b>
    <div className="malinoMemoryLevelButtons" role="group" aria-label={t.level}>
     {Object.entries(MEMORY_LEVELS).map(([id,meta])=><button type="button" key={id}
      className={difficulty===id?"active":""} aria-pressed={difficulty===id} onClick={()=>setDifficulty(id)}>
      <strong>{language==="pl"?meta.labelPl:meta.labelDe}</strong>
      <small>{meta.pairs} {t.pairs.toLowerCase()} · {meta.age}</small>
     </button>)}
    </div>
   </div>
  </div>

  <div className="malinoMemoryGamePanel">
   <div className="malinoMemoryScoreboard">
    <span>💜 {t.pairs}: <b>{turn.matched.length/2} / {totalPairs}</b></span>
    <span>👣 {t.moves}: <b>{turn.attempts}</b></span>
    <button type="button" onClick={restart}>🔄 {t.new}</button>
   </div>
   <div className="malinoMemoryGrid" role="group" aria-label={t.deck}>
    {deck.map((card,index)=>{
     const shown=visible.has(card.id);
     const matched=turn.matched.includes(card.id);
     return <button key={card.id} type="button"
      className={`malinoMemoryCard ${shown?"isOpen":""} ${matched?"isMatched":""}`}
      aria-label={`${index+1}. ${matched?t.found:shown?t.turned:t.back}${shown?", "+card.emoji:""}`}
      aria-pressed={shown}
      disabled={matched||turn.waiting||turn.complete}
      onClick={()=>flip(card.id)}>
      <span className="malinoMemoryCardInner" aria-hidden="true">
       <span className="malinoMemoryCardBack"><span className="malinoMemoryCardSparkle">✦</span><span className="malinoMemoryCardPaw">🐾</span><span className="malinoMemoryCardSparkle">✦</span></span>
       <span className="malinoMemoryCardFace"><span>{card.emoji}</span>{matched&&<span className="malinoMemoryCardCheck">✓</span>}</span>
      </span>
     </button>;
    })}
   </div>
   <p className="malinoMemoryMessage" role="status" aria-live="polite">{feedback||t.intro}</p>
   {turn.complete&&<div className="malinoMemoryVictory" role="status">
    <span aria-hidden="true">🌟 🦁 🌟</span>
    <strong>{t.success}</strong>
    <p>{t.winDetail}</p>
    <button type="button" onClick={restart}>🔄 {t.again}</button>
   </div>}
  </div>
 </section>;
}
