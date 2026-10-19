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
   y:Math.round((26+row*25+(random()-.5)*6)*100)/100,
   r:Math.round((random()-.5)*20),
   s:1
  };
 });
}

/**
 * A single self-contained illustrated scene is shared by the interactive
 * screen and the print/share PDF, so the two never show different boards.
 * The artwork is decorative; tappable hidden targets are rendered separately.
 */
export function hiddenSceneSvg(theme="forest"){
 const id=Object.hasOwn(hiddenPalettes,theme)?theme:"forest";
 const palette=hiddenPalette(id);
 const landscape={
  forest:`<circle cx="744" cy="112" r="51" fill="#fff4b8"/>
   <path d="M0 392Q145 267 318 381T675 359T920 379V660H0Z" fill="#a9dda3"/>
   <path d="M0 505Q200 405 423 515T920 469V660H0Z" fill="#79be83"/>
   <path d="M355 660Q398 560 452 504T577 416" stroke="#f3e1ac" stroke-width="63" fill="none" stroke-linecap="round"/>
   <g fill="#4b9672" stroke="#39785f" stroke-width="9"><path d="M40 480V262" stroke="#875f48" stroke-width="40"/><circle cx="54" cy="249" r="99"/><circle cx="153" cy="285" r="71"/><path d="M827 469V279" stroke="#875f48" stroke-width="34"/><circle cx="813" cy="258" r="90"/></g>
   <g fill="#fff2dd" stroke="#bc825b" stroke-width="7"><path d="M662 437V352h111v85Z"/><path d="m646 357 71-63 72 63" fill="#d79a78"/><rect x="708" y="383" width="25" height="54" rx="9" fill="#8b6a6d"/></g>
   <g fill="#f6ce8f"><circle cx="258" cy="496" r="11"/><circle cx="282" cy="508" r="8"/><circle cx="774" cy="545" r="13"/></g>`,
  farm:`<circle cx="758" cy="108" r="61" fill="#ffe8a1"/>
   <path d="M0 387Q215 256 425 367T920 354V660H0Z" fill="#d9e4ae"/>
   <path d="M0 487Q215 395 402 476T920 435V660H0Z" fill="#add394"/>
   <path d="M0 550Q220 500 460 574T920 518V660H0Z" fill="#90c77b"/>
   <path d="M0 564H920" stroke="#e2c493" stroke-width="10" stroke-dasharray="65 37" opacity=".6"/>
   <g stroke="#995f50" stroke-width="8" stroke-linejoin="round"><path d="M655 430V295h184v135Z" fill="#d88777"/><path d="m635 301 108-88 117 88" fill="#aa6871"/><path d="M726 430v-91h45v91" fill="#f4ead8"/><rect x="678" y="329" width="29" height="29" rx="4" fill="#d4eaf2"/></g>
   <g stroke="#bb936a" stroke-width="8"><path d="M68 497V416M171 512V431M65 452H207M65 488h142M805 500V431M875 489V418M771 454h149" fill="none"/></g>
   <g fill="#e5c46b" stroke="#caa058" stroke-width="5"><rect x="108" y="532" width="79" height="53" rx="12"/><path d="M110 553h76"/></g>`,
  ocean:`<path d="M0 0H920V660H0Z" fill="#96dfeb"/>
   <g stroke="#ddfaff" stroke-width="9" fill="none" opacity=".6"><path d="M30 145Q180 130 330 147T635 134T920 147"/><path d="M30 274Q175 253 330 270T625 264T915 275"/></g>
   <path d="M0 525Q180 493 360 535T720 518T920 522V660H0Z" fill="#e9d8a5"/>
   <path d="M0 586Q240 547 465 587T920 577V660H0Z" fill="#d4c68f"/>
   <g stroke="#b45f85" stroke-width="17" fill="none" stroke-linecap="round"><path d="M92 580V401m0 60-47-62m47 90 50-60m-42 27 34-76"/></g>
   <g fill="#7fd3b0" stroke="#489d9d" stroke-width="7"><path d="M755 590Q712 513 766 471Q803 515 755 590Z"/><path d="M816 594Q763 492 833 435Q874 520 816 594Z"/></g>
   <g fill="none" stroke="#e3fcff" stroke-width="7" opacity=".75"><circle cx="249" cy="145" r="26"/><circle cx="284" cy="89" r="16"/><circle cx="666" cy="312" r="23"/><circle cx="622" cy="253" r="13"/></g>
   <path d="M340 590q55-38 110 0t110 0" stroke="#bfa875" stroke-width="9" fill="none"/>`,
  space:`<rect width="920" height="660" fill="#293c78"/>
   <circle cx="744" cy="154" r="94" fill="#d3b6f3"/><ellipse cx="744" cy="154" rx="157" ry="39" transform="rotate(-20 744 154)" fill="none" stroke="#f2ddfb" stroke-width="15"/>
   <circle cx="127" cy="406" r="111" fill="#789bd0"/><circle cx="98" cy="376" r="22" fill="#627eb8"/><circle cx="165" cy="437" r="35" fill="#627eb8"/>
   <path d="M0 600Q220 535 422 585T920 540V660H0Z" fill="#41548f"/>
   <g fill="#fff8d4"><path d="m77 92 7 23 24 6-24 6-7 22-6-22-24-6 24-6ZM472 199l8 25 26 7-26 7-8 25-7-25-26-7 26-7ZM824 451l7 22 22 6-22 7-7 21-7-21-23-7 23-6Z"/></g>
   <g fill="#c6dbf8" opacity=".85"><circle cx="299" cy="84" r="6"/><circle cx="612" cy="69" r="5"/><circle cx="375" cy="423" r="6"/><circle cx="687" cy="369" r="5"/><circle cx="785" cy="89" r="5"/><circle cx="214" cy="237" r="4"/></g>
   <path d="M555 557q58-83 108 0" stroke="#92acd9" stroke-width="15" fill="none" stroke-linecap="round"/>`,
  dino:`<circle cx="736" cy="117" r="66" fill="#ffe2a1"/>
   <path d="M0 419Q130 272 295 362T634 350T920 391V660H0Z" fill="#bddbb4"/>
   <path d="M0 507Q172 417 363 494T920 473V660H0Z" fill="#9bc68f"/>
   <path d="M610 411 740 202 885 416Z" fill="#8caaa2"/><path d="m709 266 31-64 44 74-43-17Z" fill="#f8dec7"/>
   <path d="M735 199q42 40 22 85" stroke="#df8f70" stroke-width="14" fill="none" stroke-linecap="round"/>
   <path d="M0 580Q240 545 450 590T920 546V660H0Z" fill="#79b581"/>
   <g stroke="#658f6e" stroke-width="12" stroke-linecap="round" fill="none"><path d="M105 603V397m0 64-58-55m58 32 55-58m615 232V435m0 38-55-57m55 23 48-70"/></g>
   <g fill="#77b783"><path d="M105 387q-92-46-91 7 42-22 91 18 50-50 97-17-17-61-97-8ZM775 423q-86-60-93-5 42-13 93 27 37-57 89-19-18-64-89-3Z"/></g>
   <path d="M330 589q45-28 95 5" stroke="#c7ab85" stroke-width="11" fill="none" stroke-linecap="round"/>`,
  fairy:`<circle cx="748" cy="116" r="53" fill="#fff3cb"/><path d="M0 414Q171 307 361 388T920 347V660H0Z" fill="#b9dbc4"/>
   <path d="M0 548Q207 447 404 532T920 480V660H0Z" fill="#98cdb0"/>
   <path d="M389 660Q431 565 491 512T618 427" stroke="#f7e8cf" stroke-width="66" fill="none" stroke-linecap="round"/>
   <g fill="#e4bde7" stroke="#997cb3" stroke-width="7" stroke-linejoin="round"><path d="M614 441V290h171v151Z"/><path d="M643 288v-83h29v83m74 0v-83h28v83" fill="#d1a5da"/><path d="m636 207 22-52 22 52m56 0 23-52 23 52" fill="#9f83c9"/><path d="M684 441v-80q15-26 31 0v80" fill="#9c7bb4"/><rect x="633" y="328" width="24" height="31" rx="12" fill="#fff7d9"/></g>
   <g fill="#fdf5dc" opacity=".95"><path d="m144 217 10 30 30 9-30 9-10 30-9-30-30-9 30-9ZM445 113l7 22 23 7-23 7-7 23-7-23-23-7 23-7Z"/></g>
   <g fill="#f7d5df"><circle cx="134" cy="571" r="16"/><circle cx="177" cy="585" r="12"/><circle cx="824" cy="528" r="13"/></g>`
 };
 const strokes=id==="space"?"#cdd7ff":"#5b886b";
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 660" preserveAspectRatio="none" width="920" height="660">
 <rect width="920" height="660" fill="${palette.sky}"/>
 ${landscape[id]}
 <rect width="906" height="646" x="7" y="7" rx="30" fill="none" stroke="${strokes}" opacity=".12" stroke-width="12"/>
 </svg>`;
}

export function hiddenSceneDataUri(theme){
 return "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(hiddenSceneSvg(theme));
}
