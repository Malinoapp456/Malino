// Malino Memory — a pure, deterministic pairs game.
// No profile, reward, timer or browser storage writes.
export const MEMORY_LEVELS={
 leicht:{pairs:4,age:"4–5",labelDe:"Leicht",labelPl:"Łatwy"},
 mittel:{pairs:6,age:"5–7",labelDe:"Mittel",labelPl:"Średni"},
 schwer:{pairs:8,age:"7+",labelDe:"Schwer",labelPl:"Trudny"}
};

export const MEMORY_THEMES={
 tiere:{emoji:"🐾",labelDe:"Tiere",labelPl:"Zwierzęta",icons:["🦁","🦊","🐻","🐰","🐼","🐸","🐧","🦋","🐝","🦉","🐯","🦄"]},
 maerchen:{emoji:"✨",labelDe:"Märchen",labelPl:"Bajki",icons:["🏰","🦄","👑","🐉","🧚","🌈","🌙","⭐","🪄","💎","🍄","🌸"]},
 abenteuer:{emoji:"🚀",labelDe:"Abenteuer",labelPl:"Przygody",icons:["🚀","🪐","🦖","🚒","🚜","🏴‍☠️","⛵","🎈","🎪","🚂","🛸","⛺"]}
};

function seededRandom(seed){
 let state=2166136261;
 for(const ch of String(seed))state=Math.imul(state^ch.charCodeAt(0),16777619)>>>0;
 return()=>{
  state^=state<<13;state^=state>>>17;state^=state<<5;
  return(state>>>0)/4294967296;
 };
}

export function memoryDeck(level="leicht",theme="tiere",seed="malino"){
 const pairs=(MEMORY_LEVELS[level]||MEMORY_LEVELS.leicht).pairs;
 const icons=(MEMORY_THEMES[theme]||MEMORY_THEMES.tiere).icons;
 const random=seededRandom(`${level}:${theme}:${seed}`);
 const options=[...icons];
 for(let i=options.length-1;i>0;i--){
  const j=Math.floor(random()*(i+1));
  [options[i],options[j]]=[options[j],options[i]];
 }
 const cards=options.slice(0,pairs).flatMap((emoji,pair)=>[
  {id:`${pair}-a`,pair,emoji},
  {id:`${pair}-b`,pair,emoji}
 ]);
 for(let i=cards.length-1;i>0;i--){
  const j=Math.floor(random()*(i+1));
  [cards[i],cards[j]]=[cards[j],cards[i]];
 }
 // Do not start with every pair next to each other in order.
 if(cards.every((card,i)=>i%2===0||card.pair===cards[i-1].pair)&&cards.length>2)
  [cards[1],cards[2]]=[cards[2],cards[1]];
 return cards;
}

export function memoryInitialTurn(){
 return{open:[],matched:[],attempts:0,waiting:false,complete:false};
}

export function memoryReveal(deck,turn,id){
 if(!Array.isArray(deck)||!turn||turn.waiting||turn.complete)
  return{state:turn,event:"ignored"};
 const selected=deck.find(card=>card.id===id);
 if(!selected||turn.open.includes(id)||turn.matched.includes(id))
  return{state:turn,event:"ignored"};
 if(turn.open.length===0)
  return{state:{...turn,open:[id]},event:"first"};
 if(turn.open.length!==1)return{state:turn,event:"ignored"};
 const first=deck.find(card=>card.id===turn.open[0]);
 if(!first)return{state:turn,event:"ignored"};
 const attempts=turn.attempts+1;
 if(first.pair===selected.pair){
  const matched=[...turn.matched,first.id,id];
  const complete=matched.length===deck.length;
  return{state:{...turn,open:[],matched,attempts,waiting:false,complete},event:complete?"complete":"match"};
 }
 return{state:{...turn,open:[first.id,id],attempts,waiting:true},event:"mismatch"};
}

export function memoryHideMismatch(turn){
 if(!turn?.waiting)return turn;
 return{...turn,open:[],waiting:false};
}
