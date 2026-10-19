import {hiddenSceneDataUri} from "./hidden-board.mjs";

/**
 * Six theme-specific, one-to-one visual changes. Each variant changes only
 * the requested number of picture tokens, never random unrelated images.
 * Theme, difficulty, seed and saved variant identifiers remain untouched.
 */
export const differenceSwaps=Object.freeze({
 farm:Object.freeze({"🌳":"🌲","🏠":"🏡","🚜":"🚙","🐄":"🐑","☀️":"🌤️","🌼":"🌷","🐔":"🦆","🌾":"🌿","🐷":"🐐"}),
 space:Object.freeze({"🚀":"🛸","🪐":"🌎","⭐":"✨","👨‍🚀":"👽","🌙":"🌕","🛸":"🚀","☄️":"🌟","🌎":"🪐","🛰️":"🔭"}),
 forest:Object.freeze({"🌲":"🌳","🦊":"🐺","🍄":"🌰","🐿️":"🐰","🌼":"🌷","🪵":"🪨","🦉":"🐦","🌰":"🍄","🐰":"🐿️"}),
 castle:Object.freeze({"🏰":"🏯","🐉":"🦕","⭐":"🌟","👑":"💎","🌈":"☀️","🦄":"🐴","🧚":"🧙","💎":"👑","☁️":"🌙"}),
 ocean:Object.freeze({"🐳":"🐬","🐠":"🐟","🐚":"🦀","⭐":"🌟","🐙":"🦑","🌊":"🫧","🐬":"🐳","🦀":"🐚","🐟":"🐠"}),
 dino:Object.freeze({"🦕":"🦖","🌋":"⛰️","🥚":"🪨","🌴":"🌳","🦖":"🦕","☁️":"☀️","🪨":"🥚","🌿":"🍄","🦴":"🐚"})
});

export function differenceSceneUri(theme){
 return hiddenSceneDataUri(theme==="castle"?"fairy":theme);
}

/** Stable variant from same seed as older saved differences. */
export function createDifferenceChanges(theme,tokens,count,seed){
 const candidates=differenceSwaps[theme];
 if(!candidates||!Array.isArray(tokens)||!Number.isInteger(count)||
    count<0||count>tokens.length)throw new RangeError("Invalid difference board");
 const missing=tokens.filter(t=>!candidates[t]||candidates[t]===t);
 if(missing.length)throw new Error("Theme has unconfigured difference tokens");
 let state=(Number(seed)>>>0)||1;
 const rand=()=>{
  state=(Math.imul(state,1664525)+1013904223)>>>0;
  return state/4294967296;
 };
 const indices=tokens.map((_,i)=>i);
 for(let i=indices.length-1;i>0;i--){
  const j=Math.floor(rand()*(i+1));
  [indices[i],indices[j]]=[indices[j],indices[i]];
 }
 return indices.slice(0,count).sort((a,b)=>a-b).map(idx=>({
  idx,from:tokens[idx],to:candidates[tokens[idx]]
 }));
}
export function applyDifferenceChanges(tokens,changes){
 const changed=new Map(changes.map(c=>[c.idx,c.to]));
 return tokens.map((t,i)=>changed.get(i)||t);
}
