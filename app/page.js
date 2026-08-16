"use client";
import {forwardRef,useEffect,useImperativeHandle,useMemo,useRef,useState} from "react";

const items=[
{id:"feuerwehrauto",name:"Feuerwehrauto im Einsatz",cat:"Fahrzeuge",emoji:"🚒",bg:"#ffe3d6",image:"/fahrzeuge/feuerwehrauto.webp",mode:"draw"},
{id:"polizeiauto",name:"Polizeiauto in der Stadt",cat:"Fahrzeuge",emoji:"🚓",bg:"#dcecff",image:"/fahrzeuge/polizeiauto.webp",mode:"draw"},
{id:"krankenwagen",name:"Krankenwagen auf dem Weg",cat:"Fahrzeuge",emoji:"🚑",bg:"#e8f6ff",image:"/fahrzeuge/krankenwagen.webp",mode:"draw"},
{id:"bagger",name:"Bagger auf der Baustelle",cat:"Fahrzeuge",emoji:"🚜",bg:"#fff0c7",image:"/fahrzeuge/bagger.webp",mode:"draw"},
{id:"traktor-fahrzeuge",name:"Traktor auf dem Land",cat:"Fahrzeuge",emoji:"🚜",bg:"#e6f6d8",image:"/fahrzeuge/traktor.webp",mode:"draw"},
{id:"rennwagen",name:"Rennwagen auf der Strecke",cat:"Fahrzeuge",emoji:"🏎️",bg:"#ffe6e6",image:"/fahrzeuge/rennwagen.webp",mode:"draw"},
{id:"bus",name:"Bus in der Stadt",cat:"Fahrzeuge",emoji:"🚌",bg:"#e9f1ff",image:"/fahrzeuge/bus.webp",mode:"draw"},
{id:"motorrad",name:"Motorrad auf Tour",cat:"Fahrzeuge",emoji:"🏍️",bg:"#eee8ff",image:"/fahrzeuge/motorrad.webp",mode:"draw"},
{id:"trex",name:"T-Rex Abenteuer",cat:"Dinosaurier",emoji:"🦖",bg:"#dff7c9",image:"/dinosaurier/trex.webp",mode:"draw"},
{id:"triceratops",name:"Triceratops am Vulkan",cat:"Dinosaurier",emoji:"🦕",bg:"#ffe8c7",image:"/dinosaurier/triceratops.webp",mode:"draw"},
{id:"stegosaurus",name:"Stegosaurus im Urzeitland",cat:"Dinosaurier",emoji:"🦕",bg:"#e3f5d7",image:"/dinosaurier/stegosaurus.webp",mode:"draw"},
{id:"brachiosaurus",name:"Brachiosaurus am Vulkan",cat:"Dinosaurier",emoji:"🦕",bg:"#dcefff",image:"/dinosaurier/brachiosaurus.webp",mode:"draw"},
{id:"pteranodon",name:"Pteranodon über dem Urzeitland",cat:"Dinosaurier",emoji:"🪽",bg:"#e8ecff",image:"/dinosaurier/pteranodon.webp",mode:"draw"},
{id:"ankylosaurus",name:"Ankylosaurus im Urzeitwald",cat:"Dinosaurier",emoji:"🦕",bg:"#f2e6cf",image:"/dinosaurier/ankylosaurus.webp",mode:"draw"},
{id:"velociraptor",name:"Velociraptor auf Entdeckung",cat:"Dinosaurier",emoji:"🦖",bg:"#ffe5e5",image:"/dinosaurier/velociraptor.webp",mode:"draw"},
{id:"fuchs",name:"Fuchs im Wald",cat:"Tiere",emoji:"🦊",bg:"#ffe3bc",image:"/tiere/fuchs.webp",mode:"draw"},
{id:"elefant",name:"Elefant in der Savanne",cat:"Tiere",emoji:"🐘",bg:"#dcefff",image:"/tiere/elefant.webp",mode:"draw"},
{id:"pinguin",name:"Pinguin im Schnee",cat:"Tiere",emoji:"🐧",bg:"#e7f6ff",image:"/tiere/pinguin.webp",mode:"draw"},
{id:"panda",name:"Panda im Bambuswald",cat:"Tiere",emoji:"🐼",bg:"#e2f6d7",image:"/tiere/panda.webp",mode:"draw"},
{id:"loewe",name:"Löwe in der Savanne",cat:"Tiere",emoji:"🦁",bg:"#fff0bf",image:"/tiere/loewe.webp",mode:"draw"},
{id:"hase",name:"Hase im Frühlingsgarten",cat:"Tiere",emoji:"🐰",bg:"#ffe9f4",image:"/tiere/hase.webp",mode:"draw"},
{id:"igel",name:"Igel im Zauberwald",cat:"Tiere",emoji:"🦔",bg:"#f0e4d5",image:"/tiere/igel.webp",mode:"draw"},
{id:"einhorn",name:"Einhorn im Märchenland",cat:"Märchen",emoji:"🦄",bg:"#f5e0ff",image:"/maerchen/einhorn.webp",mode:"draw"},
{id:"ritter",name:"Fröhlicher Ritter",cat:"Märchen",emoji:"🛡️",bg:"#e6efff",image:"/maerchen/ritter.webp",mode:"draw"},
{id:"schloss",name:"Märchenschloss am Hügel",cat:"Märchen",emoji:"🏰",bg:"#ffe9f5",image:"/maerchen/schloss.webp",mode:"draw"},
{id:"drache",name:"Niedlicher Drache",cat:"Märchen",emoji:"🐉",bg:"#e8f7ef",image:"/maerchen/drache.webp",mode:"draw"},
{id:"prinzessin",name:"Prinzessin im Märchenland",cat:"Märchen",emoji:"👸",bg:"#fff0f7",image:"/maerchen/prinzessin.webp",mode:"draw"},
{id:"fee",name:"Fee mit Sternenstab",cat:"Märchen",emoji:"🧚",bg:"#f3e8ff",image:"/maerchen/fee.webp",mode:"draw"},
{id:"kuh",name:"Kuh auf dem Bauernhof",cat:"Bauernhof",emoji:"🐄",bg:"#f5f0df",image:"/bauernhof/kuh.webp",mode:"draw"},
{id:"schwein",name:"Schwein auf dem Bauernhof",cat:"Bauernhof",emoji:"🐷",bg:"#ffe6ec",image:"/bauernhof/schwein.webp",mode:"draw"},
{id:"pferd",name:"Pferd auf dem Bauernhof",cat:"Bauernhof",emoji:"🐴",bg:"#f1e5d6",image:"/bauernhof/pferd.webp",mode:"draw"},
{id:"schaf",name:"Schaf auf der Weide",cat:"Bauernhof",emoji:"🐑",bg:"#eff8e5",image:"/bauernhof/schaf.webp",mode:"draw"},
{id:"huhn",name:"Huhn auf dem Bauernhof",cat:"Bauernhof",emoji:"🐔",bg:"#fff3d9",image:"/bauernhof/huhn.webp",mode:"draw"},
{id:"ziege",name:"Ziege auf dem Bauernhof",cat:"Bauernhof",emoji:"🐐",bg:"#e9f4e0",image:"/bauernhof/ziege.webp",mode:"draw"},
{id:"bauernhof-traktor",name:"Traktor auf dem Bauernhof",cat:"Bauernhof",emoji:"🚜",bg:"#e7f3d8",image:"/bauernhof/bauernhof-traktor.webp",mode:"draw"},
{id:"rakete",name:"Rakete im Weltraum",cat:"Weltraum",emoji:"🚀",bg:"#e4e1ff",image:"/weltraum/rakete.webp",mode:"draw"},
{id:"astronaut",name:"Astronauten-Abenteuer",cat:"Weltraum",emoji:"👨‍🚀",bg:"#e6f1ff",image:"/weltraum/astronaut.webp",mode:"draw"},
{id:"ufo",name:"UFO mit Alien",cat:"Weltraum",emoji:"🛸",bg:"#eaf5ff",image:"/weltraum/ufo.webp",mode:"draw"},
{id:"raumstation",name:"Raumstation im All",cat:"Weltraum",emoji:"🛰️",bg:"#eef0ff",image:"/weltraum/raumstation.webp",mode:"draw"},
{id:"mond",name:"Mond und Sterne",cat:"Weltraum",emoji:"🌙",bg:"#f4f0ff",image:"/weltraum/mond.webp",mode:"draw"},
{id:"planeten",name:"Planeten-Spaß",cat:"Weltraum",emoji:"🪐",bg:"#f0eaff",image:"/weltraum/planeten.webp",mode:"draw"},
{id:"rover",name:"Rover auf fremdem Planeten",cat:"Weltraum",emoji:"🤖",bg:"#e7f2ff",image:"/weltraum/rover.webp",mode:"draw"}
];
const cats=["Alle","Tiere","Dinosaurier","Bauernhof","Fahrzeuge","Weltraum","Märchen"];
const categoryMeta={
 "Alle":{emoji:"🎨",label:"Alle Bilder",tone:"all"},
 "Tiere":{emoji:"🐶",label:"Tiere",tone:"animals"},
 "Dinosaurier":{emoji:"🦖",label:"Dinosaurier",tone:"dinos"},
 "Bauernhof":{emoji:"🚜",label:"Bauernhof",tone:"farm"},
 "Fahrzeuge":{emoji:"🚒",label:"Fahrzeuge",tone:"vehicles"},
 "Weltraum":{emoji:"🚀",label:"Weltraum",tone:"space"},
 "Märchen":{emoji:"🏰",label:"Märchen",tone:"fairy"}
};
const colors=["#ef4444","#f97316","#f59e0b","#facc15","#84cc16","#22c55e","#14b8a6","#0ea5e9","#2563eb","#7c3aed","#ec4899","#92400e","#d6b27b","#d1d5db","#111827","#ffffff"];

function useStore(key,initial){
 const [v,setV]=useState(initial);
 useEffect(()=>{try{const s=localStorage.getItem(key);if(s)setV(JSON.parse(s))}catch{}},[key]);
 useEffect(()=>{try{localStorage.setItem(key,JSON.stringify(v))}catch{}},[key,v]);
 return [v,setV];
}
function Logo(){return <div className="logo logoV2" aria-label="Malino"><b>M</b><b>A</b><b>L</b><b>I</b><b>N</b><b>O</b><i className="logoPaw">●</i></div>}
function HomeMascot(){return <div className="homeMascot" aria-label="Malino, dein kreativer Freund"><img src="/ui/malino-mascot.webp" alt="Fröhlicher Malino mit Pinsel"/><span className="mascotSpark s1">✦</span><span className="mascotSpark s2">✦</span><span className="mascotSpark s3">•</span></div>}
function Lion(){return <div className="lion">🦁</div>}
function Thumb({it,done}){return <div className="thumb" style={{background:it.bg}}>{it.image?<img src={it.image} alt={it.name}/>:<span>{it.emoji}</span>}{done&&<i>✓</i>}</div>}
function Dino({fills,paint}){
 const f=k=>fills[k]||"#fff";
 return <svg viewBox="0 0 800 650">
  <rect x="5" y="5" width="790" height="640" rx="30" fill="#fff" stroke="#16366d" strokeWidth="8"/>
  <path onPointerUp={()=>paint("ground")} d="M20 470c170-70 300-5 430 20 140 27 230-20 330-55v195H20z" fill={f("ground")} stroke="#16366d" strokeWidth="8"/>
  <circle onPointerUp={()=>paint("sun")} cx="655" cy="110" r="55" fill={f("sun")} stroke="#16366d" strokeWidth="8"/>
  <path onPointerUp={()=>paint("volcano")} d="M510 400l95-250 120 250z" fill={f("volcano")} stroke="#16366d" strokeWidth="8"/>
  <ellipse onPointerUp={()=>paint("body")} cx="420" cy="430" rx="185" ry="130" fill={f("body")} stroke="#16366d" strokeWidth="9"/>
  <ellipse onPointerUp={()=>paint("head")} cx="285" cy="320" rx="130" ry="105" fill={f("head")} stroke="#16366d" strokeWidth="9"/>
  <path onPointerUp={()=>paint("belly")} d="M320 415c65 25 105 72 117 136l85 13c-35 55-120 72-182 24-45-35-57-103-20-173z" fill={f("belly")} stroke="#16366d" strokeWidth="8"/>
  <path onPointerUp={()=>paint("tail")} d="M570 410c170-90 220 15 125 95-43 36-95 49-145 32z" fill={f("tail")} stroke="#16366d" strokeWidth="9"/>
  <path onPointerUp={()=>paint("spikes")} d="M375 335l30-58 34 52 34-45 29 61 42-33 18 78-42 17-55-27-53 16z" fill={f("spikes")} stroke="#16366d" strokeWidth="8"/>
  <circle cx="250" cy="305" r="20" fill="#fff" stroke="#16366d" strokeWidth="7"/><circle cx="256" cy="309" r="8" fill="#16366d"/>
  <path d="M205 360c48 42 98 39 142-2" fill="none" stroke="#16366d" strokeWidth="8" strokeLinecap="round"/>
 </svg>
}

const RasterPainter=forwardRef(function RasterPainter({src,color,tool,onFeedback},ref){
 const canvasRef=useRef(null),baseRef=useRef(null),drawing=useRef(false),last=useRef(null),undoStack=useRef([]),barrierRef=useRef(null);
 const [sparkles,setSparkles]=useState([]),[fillPulse,setFillPulse]=useState(false);
 const sparkleTimer=useRef(null),pulseTimer=useRef(null);
 const hexToRgb=hex=>{const n=parseInt(hex.replace("#",""),16);return[(n>>16)&255,(n>>8)&255,n&255]};
 const rebuildBarrier=()=>{
  const base=baseRef.current;if(!base||!base.width||!base.height)return;
  const {width:w,height:h}=base,ctx=base.getContext("2d"),data=ctx.getImageData(0,0,w,h).data;
  const raw=new Uint8Array(w*h),barrier=new Uint8Array(w*h);
  for(let i=0,p=0;i<data.length;i+=4,p++){
   const a=data[i+3],lum=.2126*data[i]+.7152*data[i+1]+.0722*data[i+2];
   if(a>80&&lum<190)raw[p]=1;
  }
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
   const p=y*w+x;if(!raw[p])continue;
   barrier[p]=1;
   if(x>0)barrier[p-1]=1;if(x<w-1)barrier[p+1]=1;
   if(y>0)barrier[p-w]=1;if(y<h-1)barrier[p+w]=1;
  }
  barrierRef.current=barrier;
 };
 const drawBase=()=>{
  const base=baseRef.current,img=document.getElementById("malino-paint-image");if(!base||!img||!img.complete)return;
  const ctx=base.getContext("2d");ctx.clearRect(0,0,base.width,base.height);ctx.drawImage(img,0,0,base.width,base.height);rebuildBarrier();
 };
 const sizeCanvas=()=>{
  const c=canvasRef.current,base=baseRef.current;if(!c||!base)return;
  const r=c.getBoundingClientRect();if(!r.width||!r.height)return;
  const old=c.width&&c.height?c.toDataURL():null;
  c.width=Math.max(1,Math.round(r.width));c.height=Math.max(1,Math.round(r.height));base.width=c.width;base.height=c.height;
  const ctx=c.getContext("2d");ctx.lineCap="round";ctx.lineJoin="round";
  if(old&&old!=="data:,"){const im=new Image();im.onload=()=>ctx.drawImage(im,0,0,c.width,c.height);im.src=old}
  requestAnimationFrame(drawBase);
 };
 useEffect(()=>{sizeCanvas();window.addEventListener("resize",sizeCanvas);return()=>window.removeEventListener("resize",sizeCanvas)},[src]);
 const snapshot=()=>{const c=canvasRef.current;if(!c)return;undoStack.current.push(c.toDataURL());if(undoStack.current.length>15)undoStack.current.shift()};
 const point=e=>{const r=canvasRef.current.getBoundingClientRect();return{x:Math.max(0,Math.min(canvasRef.current.width-1,Math.round((e.clientX-r.left)*canvasRef.current.width/r.width))),y:Math.max(0,Math.min(canvasRef.current.height-1,Math.round((e.clientY-r.top)*canvasRef.current.height/r.height)))}};
 const celebrate=e=>{
  const c=canvasRef.current;if(!c)return;const r=c.getBoundingClientRect();
  const x=Math.max(4,Math.min(96,((e.clientX-r.left)/r.width)*100)),y=Math.max(4,Math.min(96,((e.clientY-r.top)/r.height)*100));
  const id=Date.now()+Math.random();setSparkles([{id,x,y}]);setFillPulse(false);requestAnimationFrame(()=>setFillPulse(true));
  clearTimeout(sparkleTimer.current);clearTimeout(pulseTimer.current);
  sparkleTimer.current=setTimeout(()=>setSparkles([]),700);pulseTimer.current=setTimeout(()=>setFillPulse(false),560);
 };
 const fillAt=e=>{
  const c=canvasRef.current,barrier=barrierRef.current;if(!c||!barrier)return;
  const {x,y}=point(e),w=c.width,h=c.height,start=y*w+x;if(barrier[start])return;
  const ctx=c.getContext("2d"),img=ctx.getImageData(0,0,w,h),d=img.data,si=start*4,target=[d[si],d[si+1],d[si+2],d[si+3]],fill=hexToRgb(color);
  if(target[3]>0&&Math.abs(target[0]-fill[0])<3&&Math.abs(target[1]-fill[1])<3&&Math.abs(target[2]-fill[2])<3)return;
  snapshot();const stack=new Int32Array(w*h),seen=new Uint8Array(w*h);let top=0;stack[top++]=start;seen[start]=1;
  const matches=p=>{const i=p*4;return Math.abs(d[i]-target[0])<5&&Math.abs(d[i+1]-target[1])<5&&Math.abs(d[i+2]-target[2])<5&&Math.abs(d[i+3]-target[3])<5};
  let painted=0;
  while(top){const p=stack[--top];if(barrier[p]||!matches(p))continue;const i=p*4;d[i]=fill[0];d[i+1]=fill[1];d[i+2]=fill[2];d[i+3]=205;painted++;const px=p%w,py=(p/w)|0;
   let n;if(px>0){n=p-1;if(!seen[n]){seen[n]=1;stack[top++]=n}}if(px<w-1){n=p+1;if(!seen[n]){seen[n]=1;stack[top++]=n}}if(py>0){n=p-w;if(!seen[n]){seen[n]=1;stack[top++]=n}}if(py<h-1){n=p+w;if(!seen[n]){seen[n]=1;stack[top++]=n}}
  }
  const area=w*h;
  if(painted<90){undoStack.current.pop();onFeedback?.("small");return}
  if(painted>area*.62){undoStack.current.pop();onFeedback?.("leak");return}
  ctx.putImageData(img,0,0);celebrate(e);
 };
 const down=e=>{e.currentTarget.setPointerCapture?.(e.pointerId);if(tool==="fill"){fillAt(e);return}snapshot();drawing.current=true;last.current=point(e)};
 const move=e=>{if(!drawing.current)return;const c=canvasRef.current,ctx=c.getContext("2d"),p=point(e),a=last.current;ctx.globalCompositeOperation=tool==="eraser"?"destination-out":"source-over";ctx.strokeStyle=color;ctx.lineWidth=tool==="eraser"?30:16;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(p.x,p.y);ctx.stroke();ctx.globalCompositeOperation="source-over";last.current=p};
 const up=()=>{drawing.current=false;last.current=null};
 const clear=()=>{const c=canvasRef.current;if(!c)return;snapshot();c.getContext("2d").clearRect(0,0,c.width,c.height)};
 const undo=()=>{const data=undoStack.current.pop(),c=canvasRef.current;if(!data||!c)return;const ctx=c.getContext("2d");ctx.clearRect(0,0,c.width,c.height);const img=new Image();img.onload=()=>ctx.drawImage(img,0,0,c.width,c.height);img.src=data};
 useImperativeHandle(ref,()=>({undo,clear}));
 return <div className={`rasterPainter ${fillPulse?"fillSuccess":""}`}><img id="malino-paint-image" src={src} alt="Malbild" draggable="false" onLoad={drawBase}/><canvas ref={baseRef} className="baseMap" aria-hidden="true"/><canvas ref={canvasRef} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}/>{sparkles.map(s=><span key={s.id} className="fillSparkle" style={{left:s.x+"%",top:s.y+"%"}} aria-hidden="true"><i>✦</i><i>✧</i><i>★</i></span>)}</div>
});
export default function Page(){
 const [screen,setScreen]=useState("start");
 const [fav,setFav]=useStore("m2fav",["rocket"]);
 const [done,setDone]=useStore("m2done",[]);
 const [gallery,setGallery]=useStore("m2gallery",[]);
 const [stars,setStars]=useStore("m2stars",125);
 const [current,setCurrent]=useState(items[0]);
 const [query,setQuery]=useState("");
 const [cat,setCat]=useState("Alle");
 const [selected,setSelected]=useState("#22c55e");
 const [tool,setTool]=useState("fill");
 const [fills,setFills]=useState({});
 const [history,setHistory]=useState([]);
 const [fillFeedback,setFillFeedback]=useState(null);
 const rasterRef=useRef(null);
 const feedbackTimer=useRef(null);
 const filtered=useMemo(()=>items.filter(x=>(cat==="Alle"||x.cat===cat)&&x.name.toLowerCase().includes(query.toLowerCase())),[cat,query]);
 const categoryCount=name=>name==="Alle"?items.length:items.filter(x=>x.cat===name).length;
 const favoriteItems=items.filter(x=>fav.includes(x.id));
 const newItems=items.filter(x=>x.image).slice(0,8);
 const visibleCategories=cats.slice(1).filter(c=>categoryCount(c)>0);
 const visibleTitle=cat==="Alle"?"Alle Malbilder":categoryMeta[cat]?.label||cat;
 const open=it=>{setCurrent(it);setFills({});setHistory([]);setTool("fill");setFillFeedback(null);setScreen("paint")};
 const showFillFeedback=kind=>{clearTimeout(feedbackTimer.current);setFillFeedback(kind);feedbackTimer.current=setTimeout(()=>setFillFeedback(null),1100)};
 const paint=k=>{const old=fills[k]||"#fff",next=tool==="eraser"?"#fff":selected;if(old===next)return;setHistory([...history,{k,old}]);setFills({...fills,[k]:next})};
 const undo=()=>{if(current.mode==="draw"){rasterRef.current?.undo();return}const x=history.at(-1);if(!x)return;setFills({...fills,[x.k]:x.old});setHistory(history.slice(0,-1))};
 const finish=()=>{if(!done.includes(current.id)){setDone([...done,current.id]);setStars(stars+5)}setGallery([{...current,date:new Date().toLocaleDateString("de-DE")},...gallery.filter(x=>x.id!==current.id)]);setScreen("reward")};
 return <main>
  <header><button>🇩🇪 Deutsch⌄</button><Logo/><div><span>⭐ {stars}</span><button onClick={()=>setScreen("parent")}>👤 Eltern</button></div></header>

  {screen==="start"&&<section className="startV2">
   <div className="hero heroV2">
    <HomeMascot/>
    <div className="speech speechV2"><span className="welcomeTag">Dein kreativer Freund</span><h1>Hallo! 👋</h1><p>Schön, dass du da bist!<br/>Was möchtest du heute malen?</p><button className="primary" onClick={()=>open(items[0])}>🖌️ Jetzt malen!</button></div>
    <div className="daily dailyV2"><b>⭐ Bild des Tages</b><Thumb it={items[0]} done={done.includes(items[0].id)}/><button onClick={()=>open(items[0])}>Jetzt malen!</button></div>
   </div>
   <div className="panel startPanelV2"><div className="startSectionTitle"><h2>Wähle eine Kategorie <span>🐾</span></h2><button onClick={()=>setScreen("library")}>Alle anzeigen ›</button></div><div className="cats startCatsV2">{visibleCategories.map(c=><button key={c} onClick={()=>{setCat(c);setScreen("library")}}><span>{categoryMeta[c].emoji}</span><b>{categoryMeta[c].label}</b><small>{categoryCount(c)} {categoryCount(c)===1?"Bild":"Bilder"}</small></button>)}</div>
    <div className="title startRecentTitle"><h2>🕘 Letzte Bilder</h2><button onClick={()=>setScreen("gallery")}>Alle anzeigen ›</button></div>
    <div className="row startRecentRow">{(gallery.length?gallery:items.slice(0,5)).slice(0,5).map(x=><button key={x.id} onClick={()=>open(x)}><Thumb it={x} done={done.includes(x.id)}/></button>)}</div>
    <div className="progress startProgress">⭐ <div><b>Toll gemacht!</b><small>Du hast schon {done.length} Bilder gemalt.</small></div><button onClick={()=>setScreen("library")}>Weiter malen</button></div>
   </div>
  </section>}

  {screen==="library"&&<section className="libraryPage">
   <div className="libraryWelcome">
    <div className="libraryMascot"><Lion/></div>
    <div><span className="eyebrow">Malinos Malwelt</span><h1>Was möchtest du heute malen?</h1><p>Entdecke Tiere, Dinosaurier und viele weitere Abenteuer.</p></div>
    <div className="libraryStats"><b>{items.length}</b><span>Malbilder</span><b>{done.length}</b><span>fertig</span></div>
   </div>

   <div className="controls librarySearch">
    <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="🔍 Malbild suchen..."/>
    <select value={cat} onChange={e=>setCat(e.target.value)}>{cats.map(c=><option key={c}>{categoryMeta[c]?.label||c}</option>)}</select>
   </div>

   <div className="libraryCategoryHead"><div><span className="eyebrow">Kategorien</span><h2>Wähle deine Malwelt</h2></div><button onClick={()=>setCat("Alle")} className={cat==="Alle"?"isSelected":""}>Alle zeigen</button></div>
   <div className="libraryCategories">
    {visibleCategories.map(c=>{const meta=categoryMeta[c];const count=categoryCount(c);return <button key={c} className={`libraryCategory ${meta.tone} ${cat===c?"isSelected":""}`} onClick={()=>setCat(c)}>
      <span className="categoryIcon">{meta.emoji}</span>
      <span className="categoryInfo"><b>{meta.label}</b><small>{count} {count===1?"Bild":"Bilder"}</small></span>
      <span className="categoryArrow">›</span>
    </button>})}
   </div>

   {cat==="Alle"&&!query&&<>
    <div className="librarySectionHead"><div><span className="eyebrow">Neu bei Malino</span><h2>Neu hinzugefügt</h2></div><span>{newItems.length} Bilder</span></div>
    <div className="libraryRail">{newItems.map(x=><article key={"new-"+x.id} className="libraryCard compact">
      <button className="heart" onClick={()=>setFav(fav.includes(x.id)?fav.filter(y=>y!==x.id):[...fav,x.id])}>{fav.includes(x.id)?"❤️":"🤍"}</button>
      <button className="libraryOpen" onClick={()=>open(x)}><Thumb it={x} done={done.includes(x.id)}/></button>
      <b>{x.name}</b><small>{x.cat}</small>
    </article>)}</div>

    {favoriteItems.length>0&&<>
     <div className="librarySectionHead"><div><span className="eyebrow">Deine Auswahl</span><h2>Favoriten ❤️</h2></div><span>{favoriteItems.length}</span></div>
     <div className="libraryRail favoritesRail">{favoriteItems.map(x=><article key={"fav-"+x.id} className="libraryCard compact">
       <button className="heart" onClick={()=>setFav(fav.filter(y=>y!==x.id))}>❤️</button>
       <button className="libraryOpen" onClick={()=>open(x)}><Thumb it={x} done={done.includes(x.id)}/></button>
       <b>{x.name}</b><small>{x.cat}</small>
     </article>)}</div>
    </>}
   </>}

   <div className="librarySectionHead mainResults"><div><span className="eyebrow">{cat==="Alle"?"Bibliothek":"Kategorie"}</span><h2>{visibleTitle}</h2></div><span>{filtered.length} {filtered.length===1?"Bild":"Bilder"}</span></div>
   {filtered.length?<div className="libraryGrid">{filtered.map(x=><article key={x.id} className="libraryCard">
      <button className="heart" onClick={()=>setFav(fav.includes(x.id)?fav.filter(y=>y!==x.id):[...fav,x.id])}>{fav.includes(x.id)?"❤️":"🤍"}</button>
      <button className="libraryOpen" onClick={()=>open(x)}><Thumb it={x} done={done.includes(x.id)}/></button>
      <div className="libraryCardText"><b>{x.name}</b><small>{x.cat}</small></div>
      <button className="miniPaint" onClick={()=>open(x)}>Malen</button>
    </article>)}</div>:<div className="libraryEmpty"><span>🔎</span><h3>Kein Malbild gefunden</h3><p>Probiere einen anderen Suchbegriff oder eine andere Kategorie.</p><button onClick={()=>{setQuery("");setCat("Alle")}}>Alle Bilder zeigen</button></div>}
  </section>}

  {screen==="paint"&&<section className="paintScreen">
   <div className="painthead"><button onClick={()=>setScreen("library")}>←</button><button onClick={()=>setScreen("start")}>🏠</button><div><Lion/><b>Du malst großartig!</b></div><span>{done.length+1}/{items.length} Bilder</span></div>
   <div className="workspace"><aside><button className={tool==="brush"?"on":""} onClick={()=>setTool("brush")}>🖌️ Pinsel</button><button className={tool==="fill"?"on":""} onClick={()=>setTool("fill")}>🪣 Füllen</button><button className={tool==="eraser"?"on":""} onClick={()=>setTool("eraser")}>🧽 Radierer</button><button onClick={undo}>↩️ Zurück</button><button onClick={()=>{if(current.mode==="draw")rasterRef.current?.clear();else{setFills({});setHistory([])}}}>🔄 Neu</button></aside><div className="canvas">{current.mode==="draw"?<RasterPainter ref={rasterRef} src={current.image} color={selected} tool={tool} onFeedback={showFillFeedback}/>:<Dino fills={fills} paint={paint}/>}</div></div>
   <div className={`toolHelp ${fillFeedback?"feedback "+fillFeedback:""}`}>{fillFeedback==="small"?"👆 Diese Fläche ist sehr klein – probiere eine größere.":fillFeedback==="leak"?"🛡️ Malino hat ein Auslaufen gestoppt – tippe in eine geschlossene Fläche.":tool==="fill"?"🪣 Tippe in eine Fläche – Malino füllt sie für dich aus.":tool==="brush"?"🖌️ Male frei mit dem Finger.":"🧽 Wische über Farbe, um sie zu entfernen."}</div>
   <div className="palette">{colors.map(c=><button key={c} style={{background:c}} className={selected===c&&tool!=="eraser"?"sel":""} onClick={()=>{setSelected(c);if(tool==="eraser")setTool("fill")}}/>)}</div>
   <div className="actions"><button onClick={()=>setScreen("library")}>Vorlagen</button><button className="finish" onClick={finish}>✓ Fertig!</button><button>⬇ Speichern</button></div>
  </section>}

  {screen==="reward"&&<section className="reward"><Logo/><div className="rewardgrid"><Lion/><div><h1>Super gemacht!</h1><p>Du hast ein wunderschönes Bild gemalt! 💗</p><Thumb it={current} done/></div></div><div className="prizes"><div>⭐<b>+5 Sterne</b></div><div>🏅<b>Kreativ Künstler</b></div><div>🎁<b>+1 Überraschung</b></div></div><div className="actions"><button onClick={()=>setScreen("gallery")}>Zur Galerie</button><button className="finish" onClick={()=>open(items[(items.findIndex(x=>x.id===current.id)+1)%items.length])}>Nächstes Bild</button></div></section>}

  {screen==="gallery"&&<section className="panel"><div className="title"><div><h1>Meine Kunstwerke 💕</h1><p>Deine fertigen Malbilder</p></div><button onClick={()=>setScreen("library")}>+ Neues Bild</button></div>{gallery.length?<div className="cards">{gallery.map(x=><article key={x.id}><Thumb it={x} done/><b>{x.name}</b><small>{x.date}</small></article>)}</div>:<div className="empty">🎨<h2>Noch keine Kunstwerke</h2><button onClick={()=>setScreen("library")}>Zur Bibliothek</button></div>}</section>}

  {screen==="parent"&&<section className="parents"><div className="panel"><h1>Elternbereich</h1>{["👧 Kind-Profil","⏱️ Bildschirmzeit","⚙️ App-Einstellungen","🖨️ Export & Drucken","❓ Hilfe & Feedback","ℹ️ Über Malino"].map(x=><button key={x}>{x}<span>›</span></button>)}</div><div className="panel"><h2>Statistik dieser Woche</h2><div className="bars">{[30,50,42,65,55,75,88].map((h,i)=><i key={i} style={{height:h+"%"}}/>)}</div><p>Gemalte Bilder <b>{done.length}</b></p><p>Erhaltene Sterne <b>{stars} ⭐</b></p></div></section>}

  <nav>{[["start","🏠","Start"],["library","📚","Bibliothek"],["paint","🖌️","Malen"],["reward","🏆","Belohnungen"],["gallery","🖼️","Galerie"]].map(([s,e,l])=><button key={s} className={screen===s?"active":""} onClick={()=>s==="paint"?open(current):setScreen(s)}>{e}<span>{l}</span></button>)}</nav>
 </main>
}