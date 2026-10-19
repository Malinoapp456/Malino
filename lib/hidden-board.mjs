/**
 * Presentation helpers for the Hidden Objects game.
 * The saved theme/difficulty/seed and original target order remain unchanged.
 */
export const hiddenPalettes=Object.freeze({
 forest:Object.freeze({sky:"#d8f4ff",hills:"#a6dbab",floor:"#78bb7b",accent:"#477f62"}),
 farm:Object.freeze({sky:"#def4ff",hills:"#e8dca7",floor:"#b7d78a",accent:"#b87950"}),
 ocean:Object.freeze({sky:"#b6edf7",hills:"#72d5e3",floor:"#5ab9cb",accent:"#368da1"}),
 space:Object.freeze({sky:"#263b74",hills:"#314d88",floor:"#243a6f",accent:"#d8c3ff"}),
 dino:Object.freeze({sky:"#fcead7",hills:"#ccdfbd",floor:"#a0cfa0",accent:"#8f9a83"}),
 fairy:Object.freeze({sky:"#e8dffc",hills:"#c6e3d2",floor:"#a6d5bf",accent:"#9880c5"})
});
export function hiddenPalette(theme){
 return hiddenPalettes[theme]||hiddenPalettes.forest;
}

/**
 * Stable and well-spaced positions on a 3x3 map; choosing a new seed changes
 * the arrangement but never moves targets under one another or off-screen.
 * Coordinates are percentages in the scene for responsive touch screens.
 */
export function createHiddenPlacements(targets,seed){
 if(!Array.isArray(targets)||targets.length>9)throw new RangeError("Up to nine targets are supported");
 let state=(Number(seed)>>>0)||1;
 const random=()=>{
  state=(Math.imul(state,1664525)+1013904223)>>>0;
  return state/4294967296;
 };
 const cells=Array.from({length:9},(_,i)=>i);
 for(let i=cells.length-1;i>0;i--){
  const j=Math.floor(random()*(i+1));
  [cells[i],cells[j]]=[cells[j],cells[i]];
 }
 return targets.map((item,i)=>{
  const cell=cells[i],column=cell%3,row=Math.floor(cell/3);
  return {
   item,
   x:Math.round((17+column*33+(random()-.5)*7)*100)/100,
   y:Math.round((18+row*31+(random()-.5)*8)*100)/100,
   r:Math.round((random()-.5)*20),
   s:1
  };
 });
}
