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
const secretMalinoItem={id:"malino-geheim",name:"Malinos Geheimbild",cat:"Malino",emoji:"🦁",bg:"#fff5ca",image:"/belohnungen/malino-geheim.webp",mode:"draw",reward:true};
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
const chest50Colors=[
 {value:"#f6c945",name:"Gold"},
 {value:"#ff8fb8",name:"Malino-Rosa"},
 {value:"#74dfc2",name:"Zauber-Mint"}
];

function useStore(key,initial){
 const [v,setV]=useState(initial);
 useEffect(()=>{try{const s=localStorage.getItem(key);if(s)setV(JSON.parse(s))}catch{}},[key]);
 useEffect(()=>{try{localStorage.setItem(key,JSON.stringify(v))}catch{}},[key,v]);
 return [v,setV];
}
function Logo(){return <div className="logo logoV3" aria-label="Malino"><img src="/ui/malino-logo.webp" alt="Malino"/></div>}
function HomeMascot(){return <div className="homeMascot" aria-label="Malino, dein kreativer Freund"><img src="/ui/malino-mascot.webp" alt="Fröhlicher Malino mit Pinsel"/><span className="mascotSpark s1">✦</span><span className="mascotSpark s2">✦</span><span className="mascotSpark s3">•</span></div>}
function Lion(){return <div className="lion">🦁</div>}
function ToolIcon({type}){
 if(type==="undo")return <svg className="toolSvg" viewBox="0 0 64 64" aria-hidden="true"><path d="M25 18 12 30l13 12" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 30h23c10 0 17 6 17 15 0 7-5 12-12 14" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/></svg>;
 if(type==="new")return <svg className="toolSvg" viewBox="0 0 64 64" aria-hidden="true"><rect x="15" y="10" width="34" height="44" rx="6" fill="#fff" stroke="currentColor" strokeWidth="5"/><path d="M23 23h18M23 32h12" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/><path d="m47 8 2.4 5.3L55 16l-5.6 2.7L47 24l-2.4-5.3L39 16l5.6-2.7L47 8Z" fill="#ffd43b" stroke="#f4a000" strokeWidth="2"/></svg>;
 return <span className="toolEmoji" aria-hidden="true">{type==="brush"?"🖌️":type==="fill"?"🪣":"🧽"}</span>
}
function SaveIcon(){
 return <svg className="saveSvg" viewBox="0 0 64 64" aria-hidden="true">
  <rect x="8" y="12" width="44" height="38" rx="8" fill="#eef7ff" stroke="currentColor" strokeWidth="4"/>
  <circle cx="21" cy="25" r="5" fill="#ffd43b"/>
  <path d="M13 44l11-11 8 7 7-8 9 12" fill="none" stroke="#59bf4a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="m51 6 2.2 5 5 2.2-5 2.2-2.2 5-2.2-5-5-2.2 5-2.2L51 6Z" fill="#ffbf19" stroke="#f39b00" strokeWidth="1.5"/>
 </svg>
}
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
 const canvasRef=useRef(null),baseRef=useRef(null),drawing=useRef(false),last=useRef(null),undoStack=useRef([]),barrierRef=useRef(null),fitRectRef=useRef(null);
 const [sparkles,setSparkles]=useState([]),[fillPulse,setFillPulse]=useState(false);
 const sparkleTimer=useRef(null),pulseTimer=useRef(null);
 const hexToRgb=hex=>{const n=parseInt(hex.replace("#",""),16);return[(n>>16)&255,(n>>8)&255,n&255]};
 const rebuildBarrier=()=>{
  const base=baseRef.current;if(!base||!base.width||!base.height)return;
  const {width:w,height:h}=base,ctx=base.getContext("2d"),data=ctx.getImageData(0,0,w,h).data;
  const raw=new Uint8Array(w*h),barrier=new Uint8Array(w*h);
  const fit=fitRectRef.current||{x:0,y:0,w,h};
  const x0=Math.max(0,Math.floor(fit.x)),y0=Math.max(0,Math.floor(fit.y));
  const x1=Math.min(w,Math.ceil(fit.x+fit.w)),y1=Math.min(h,Math.ceil(fit.y+fit.h));
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
   const p=y*w+x;
   if(x<x0||x>=x1||y<y0||y>=y1){barrier[p]=1;continue}
   const i=p*4,a=data[i+3],lum=.2126*data[i]+.7152*data[i+1]+.0722*data[i+2];
   if(a>80&&lum<190)raw[p]=1;
  }
  for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++){
   const p=y*w+x;if(!raw[p])continue;
   barrier[p]=1;
   if(x>x0)barrier[p-1]=1;if(x<x1-1)barrier[p+1]=1;
   if(y>y0)barrier[p-w]=1;if(y<y1-1)barrier[p+w]=1;
  }
  barrierRef.current=barrier;
 };
 const drawBase=()=>{
  const base=baseRef.current,img=document.getElementById("malino-paint-image");if(!base||!img||!img.complete||!img.naturalWidth||!img.naturalHeight)return;
  const ctx=base.getContext("2d"),w=base.width,h=base.height;
  const scale=Math.min(w/img.naturalWidth,h/img.naturalHeight);
  const rw=img.naturalWidth*scale,rh=img.naturalHeight*scale,rx=(w-rw)/2,ry=(h-rh)/2;
  fitRectRef.current={x:rx,y:ry,w:rw,h:rh};
  ctx.clearRect(0,0,w,h);ctx.drawImage(img,rx,ry,rw,rh);rebuildBarrier();
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
 const move=e=>{if(!drawing.current)return;const c=canvasRef.current,ctx=c.getContext("2d"),p=point(e),a=last.current,fit=fitRectRef.current||{x:0,y:0,w:c.width,h:c.height};ctx.save();ctx.beginPath();ctx.rect(fit.x,fit.y,fit.w,fit.h);ctx.clip();ctx.globalCompositeOperation=tool==="eraser"?"destination-out":"source-over";ctx.strokeStyle=color;ctx.lineWidth=tool==="eraser"?30:16;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(p.x,p.y);ctx.stroke();ctx.restore();ctx.globalCompositeOperation="source-over";last.current=p};
 const up=()=>{drawing.current=false;last.current=null};
 const dataUrlToBlob=dataUrl=>{
  const [meta,data]=dataUrl.split(","),mime=(meta.match(/data:(.*?);/)||[])[1]||"image/png",binary=atob(data),bytes=new Uint8Array(binary.length);
  for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
  return new Blob([bytes],{type:mime});
 };
 const save=()=>{
  const paint=canvasRef.current,base=baseRef.current;if(!paint||!base)return;
  const out=document.createElement("canvas");out.width=paint.width;out.height=paint.height;
  const ctx=out.getContext("2d");ctx.fillStyle="#fff";ctx.fillRect(0,0,out.width,out.height);ctx.drawImage(base,0,0);ctx.drawImage(paint,0,0);
  const dataUrl=out.toDataURL("image/png"),blob=dataUrlToBlob(dataUrl),fileName="malino-mein-bild.png",file=new File([blob],fileName,{type:"image/png"});
  const fallback=()=>{
   const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=fileName;a.rel="noopener";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
  };
  try{
   if(navigator.share&&(!navigator.canShare||navigator.canShare({files:[file]}))){
    navigator.share({files:[file],title:"Mein Malino-Bild",text:"Mein fertiges Malino-Kunstwerk"}).catch(err=>{if(err?.name!=="AbortError")fallback()});
   }else fallback();
  }catch{fallback()}
 };
 const clear=()=>{const c=canvasRef.current;if(!c)return;snapshot();c.getContext("2d").clearRect(0,0,c.width,c.height)};
 const undo=()=>{const data=undoStack.current.pop(),c=canvasRef.current;if(!data||!c)return;const ctx=c.getContext("2d");ctx.clearRect(0,0,c.width,c.height);const img=new Image();img.onload=()=>ctx.drawImage(img,0,0,c.width,c.height);img.src=data};
 useImperativeHandle(ref,()=>({undo,clear,save}));
 return <div className={`rasterPainter ${fillPulse?"fillSuccess":""}`}><img id="malino-paint-image" src={src} alt="Malbild" draggable="false" onLoad={drawBase}/><canvas ref={baseRef} className="baseMap" aria-hidden="true"/><canvas ref={canvasRef} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}/>{sparkles.map(s=><span key={s.id} className="fillSparkle" style={{left:s.x+"%",top:s.y+"%"}} aria-hidden="true"><i>✦</i><i>✧</i><i>★</i></span>)}</div>
});
export default function Page(){
 const emptyProfileData=()=>({fav:[],done:[],gallery:[],stars:0,rewards:[]});
 const [screen,setScreen]=useState("start");
 const [profiles,setProfiles]=useState([{id:"default",name:"Kind 1"}]);
 const [activeProfileId,setActiveProfileId]=useState("default");
 const [profileData,setProfileData]=useState({default:emptyProfileData()});
 const [profilesReady,setProfilesReady]=useState(false);
 const [rewardPopup,setRewardPopup]=useState(null);
 const [current,setCurrent]=useState(items[0]);
 const [query,setQuery]=useState("");
 const [cat,setCat]=useState("Alle");
 const [selected,setSelected]=useState("#22c55e");
 const [tool,setTool]=useState("fill");
 const [fills,setFills]=useState({});
 const [history,setHistory]=useState([]);
 const [fillFeedback,setFillFeedback]=useState(null);
 const [celebration,setCelebration]=useState({earned:0,doneCount:0,starsAfter:0,newChest:null,nextChest:null,starsToNext:0,repeat:false});
 const rasterRef=useRef(null);
 const feedbackTimer=useRef(null);

 useEffect(()=>{
  try{
   const storedProfiles=localStorage.getItem("malino:profiles:v1");
   const storedActive=localStorage.getItem("malino:activeProfile:v1");
   const storedData=localStorage.getItem("malino:profileData:v1");

   if(storedProfiles&&storedData){
    const parsedProfiles=JSON.parse(storedProfiles);
    const parsedData=JSON.parse(storedData);
    const safeProfiles=Array.isArray(parsedProfiles)&&parsedProfiles.length?parsedProfiles:[{id:"default",name:"Kind 1"}];
    const safeActive=safeProfiles.some(p=>p.id===storedActive)?storedActive:safeProfiles[0].id;
    setProfiles(safeProfiles);
    setActiveProfileId(safeActive);
    setProfileData(parsedData&&typeof parsedData==="object"?parsedData:{[safeActive]:emptyProfileData()});
   }else{
    const readLegacy=(key,fallback)=>{
     try{
      const raw=localStorage.getItem(key);
      return raw!==null?JSON.parse(raw):fallback;
     }catch{return fallback}
    };
    const hasLegacy=["m2fav","m2done","m2gallery","m2stars","m2rewards"].some(key=>localStorage.getItem(key)!==null);
    const migrated=hasLegacy?{
     fav:readLegacy("m2fav",[]),
     done:readLegacy("m2done",[]),
     gallery:readLegacy("m2gallery",[]),
     stars:readLegacy("m2stars",0),
     rewards:readLegacy("m2rewards",[])
    }:emptyProfileData();
    setProfiles([{id:"default",name:hasLegacy?"Aktuelles Profil":"Kind 1"}]);
    setActiveProfileId("default");
    setProfileData({default:migrated});
   }
  }catch{
   setProfiles([{id:"default",name:"Kind 1"}]);
   setActiveProfileId("default");
   setProfileData({default:emptyProfileData()});
  }
  setProfilesReady(true);
 },[]);

 useEffect(()=>{
  if(!profilesReady)return;
  try{
   localStorage.setItem("malino:profiles:v1",JSON.stringify(profiles));
   localStorage.setItem("malino:activeProfile:v1",activeProfileId);
   localStorage.setItem("malino:profileData:v1",JSON.stringify(profileData));
  }catch{}
 },[profiles,activeProfileId,profileData,profilesReady]);

 const activeProfile=profiles.find(p=>p.id===activeProfileId)||profiles[0]||{id:"default",name:"Kind 1"};
 const activeData=profileData[activeProfileId]||emptyProfileData();
 const fav=activeData.fav||[];
 const done=activeData.done||[];
 const gallery=activeData.gallery||[];
 const stars=Number(activeData.stars)||0;
 const unlockedRewards=activeData.rewards||[];

 const updateProfileField=(field,value)=>{
  setProfileData(prev=>{
   const current=prev[activeProfileId]||emptyProfileData();
   const nextValue=typeof value==="function"?value(current[field]):value;
   return {...prev,[activeProfileId]:{...current,[field]:nextValue}};
  });
 };
 const setFav=value=>updateProfileField("fav",value);
 const setDone=value=>updateProfileField("done",value);
 const setGallery=value=>updateProfileField("gallery",value);
 const setStars=value=>updateProfileField("stars",value);
 const setUnlockedRewards=value=>updateProfileField("rewards",value);

 const switchProfile=id=>{
  if(!profiles.some(p=>p.id===id))return;
  setActiveProfileId(id);
  setRewardPopup(null);
  setCurrent(items[0]);
  setFills({});
  setHistory([]);
  setFillFeedback(null);
  setTool("fill");
  setScreen("parent");
 };

 const addProfile=()=>{
  const name=window.prompt("Name des neuen Kinderprofils:");
  const clean=(name||"").trim().slice(0,24);
  if(!clean)return;
  const id="p-"+Date.now().toString(36)+"-"+Math.random().toString(36).slice(2,6);
  setProfiles(prev=>[...prev,{id,name:clean}]);
  setProfileData(prev=>({...prev,[id]:emptyProfileData()}));
  setActiveProfileId(id);
  setRewardPopup(null);
  setCurrent(items[0]);
  setFills({});
  setHistory([]);
  setScreen("parent");
 };

 const resetActiveProfile=()=>{
  if(!window.confirm(`Fortschritt von "${activeProfile.name}" wirklich zurücksetzen? Sterne, Galerie, fertige Bilder und Belohnungen werden nur für dieses Profil gelöscht.`))return;
  setProfileData(prev=>({...prev,[activeProfileId]:emptyProfileData()}));
  setRewardPopup(null);
  setCurrent(items[0]);
  setFills({});
  setHistory([]);
  setScreen("parent");
 };

 const renameActiveProfile=()=>{
  const name=window.prompt("Neuer Profilname:",activeProfile.name);
  const clean=(name||"").trim().slice(0,24);
  if(!clean)return;
  setProfiles(prev=>prev.map(p=>p.id===activeProfileId?{...p,name:clean}:p));
 };

 const deleteActiveProfile=()=>{
  if(profiles.length<=1){window.alert("Mindestens ein Kinderprofil muss bleiben.");return}
  if(!window.confirm(`Profil "${activeProfile.name}" wirklich löschen?`))return;
  const remaining=profiles.filter(p=>p.id!==activeProfileId);
  const nextId=remaining[0].id;
  setProfiles(remaining);
  setProfileData(prev=>{
   const next={...prev};
   delete next[activeProfileId];
   return next;
  });
  setActiveProfileId(nextId);
  setRewardPopup(null);
  setCurrent(items[0]);
  setFills({});
  setHistory([]);
  setScreen("parent");
 };

 const hasChest50=unlockedRewards.includes("chest50");
 const hasChest200=unlockedRewards.includes("chest200");
 const availableItems=hasChest200?[...items,secretMalinoItem]:items;
 const filtered=useMemo(()=>availableItems.filter(x=>(cat==="Alle"||x.cat===cat)&&x.name.toLowerCase().includes(query.toLowerCase())),[cat,query,hasChest200]);
 const categoryCount=name=>name==="Alle"?items.length:items.filter(x=>x.cat===name).length;
 const favoriteItems=items.filter(x=>fav.includes(x.id));
 const newItems=items.filter(x=>x.image).slice(0,8);
 const visibleCategories=cats.slice(1).filter(c=>categoryCount(c)>0);
 const visibleTitle=cat==="Alle"?"Alle Malbilder":categoryMeta[cat]?.label||cat;
 const paintColors=hasChest50?[...colors,...chest50Colors.map(x=>x.value)]:colors;
 const openChest50=()=>{
  if(stars<50||hasChest50)return;
  setUnlockedRewards([...unlockedRewards,"chest50"]);
  setRewardPopup("chest50");
 };
 const openChest200=()=>{
  if(stars<200||hasChest200)return;
  setUnlockedRewards([...unlockedRewards,"chest200"]);
  setRewardPopup("chest200");
 };
 const open=it=>{setCurrent(it);setFills({});setHistory([]);setTool("fill");setFillFeedback(null);setScreen("paint")};
 const showFillFeedback=kind=>{clearTimeout(feedbackTimer.current);setFillFeedback(kind);feedbackTimer.current=setTimeout(()=>setFillFeedback(null),1100)};
 const paint=k=>{const old=fills[k]||"#fff",next=tool==="eraser"?"#fff":selected;if(old===next)return;setHistory([...history,{k,old}]);setFills({...fills,[k]:next})};
 const undo=()=>{if(current.mode==="draw"){rasterRef.current?.undo();return}const x=history.at(-1);if(!x)return;setFills({...fills,[x.k]:x.old});setHistory(history.slice(0,-1))};
 const finish=()=>{
  const isNew=!done.includes(current.id);
  const earned=isNew?5:0;
  const starsAfter=stars+earned;
  const doneCount=done.length+(isNew?1:0);
  const thresholds=[50,100,200];
  const newChest=isNew?thresholds.find(t=>stars<t&&starsAfter>=t)||null:null;
  const nextChest=thresholds.find(t=>t>starsAfter)||null;
  if(isNew){setDone([...done,current.id]);setStars(starsAfter)}
  setGallery([{...current,date:new Date().toLocaleDateString("de-DE")},...gallery.filter(x=>x.id!==current.id)]);
  setCelebration({
   earned,
   doneCount,
   starsAfter,
   newChest,
   nextChest,
   starsToNext:nextChest?nextChest-starsAfter:0,
   repeat:!isNew
  });
  setScreen("celebrate");
 };
 return <main>
  <header><button>🇩🇪 Deutsch⌄</button><Logo/><div><span>⭐ {stars}</span><button onClick={()=>setScreen("parent")}>👤 {activeProfile.name}</button></div></header>

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
    <div className="libraryMascot libraryMascotV2"><img src="/ui/malino-mascot.webp" alt="Malino"/></div>
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

   {hasChest200&&<>
    <div className="librarySectionHead secretMalinoHead"><div><span className="eyebrow">Deine Belohnung ✨</span><h2>Malinos Geheimbilder 🦁</h2></div><span>1 exklusives Bild</span></div>
    <div className="secretMalinoShelf">
     <article className="libraryCard secretMalinoCard">
      <span className="secretRibbon">👑 Freigeschaltet</span>
      <button className="libraryOpen" onClick={()=>open(secretMalinoItem)}><Thumb it={secretMalinoItem} done={done.includes(secretMalinoItem.id)}/></button>
      <div className="libraryCardText"><b>{secretMalinoItem.name}</b><small>Nur als Malino-Belohnung</small></div>
      <button className="miniPaint secretPaintBtn" onClick={()=>open(secretMalinoItem)}>🖌️ Jetzt malen!</button>
     </article>
    </div>
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
   <div className="painthead"><button onClick={()=>setScreen("library")}>←</button><button onClick={()=>setScreen("start")}>🏠</button><div><Lion/><b>Du malst großartig!</b></div><span>{done.length+1}/{availableItems.length} Bilder</span></div>
   <div className="workspace"><aside className="paintTools">
    <button className={tool==="brush"?"on":""} onClick={()=>setTool("brush")}><ToolIcon type="brush"/><span>Pinsel</span></button>
    <button className={tool==="fill"?"on":""} onClick={()=>setTool("fill")}><ToolIcon type="fill"/><span>Füllen</span></button>
    <button className={tool==="eraser"?"on":""} onClick={()=>setTool("eraser")}><ToolIcon type="eraser"/><span>Radierer</span></button>
    <button className="historyTool" onClick={undo}><ToolIcon type="undo"/><span>Rückgängig</span></button>
    <button className="newTool" onClick={()=>{if(current.mode==="draw")rasterRef.current?.clear();else{setFills({});setHistory([])}}}><ToolIcon type="new"/><span>Neu</span></button>
   </aside><div className="canvas">{current.mode==="draw"?<RasterPainter ref={rasterRef} src={current.image} color={selected} tool={tool} onFeedback={showFillFeedback}/>:<Dino fills={fills} paint={paint}/>}</div></div>
   <div className={`toolHelp ${fillFeedback?"feedback "+fillFeedback:""}`}>{fillFeedback==="small"?"👆 Diese Fläche ist sehr klein – probiere eine größere.":fillFeedback==="leak"?"🛡️ Malino hat ein Auslaufen gestoppt – tippe in eine geschlossene Fläche.":tool==="fill"?"🪣 Tippe in eine Fläche – Malino füllt sie für dich aus.":tool==="brush"?"🖌️ Male frei mit dem Finger.":"🧽 Wische über Farbe, um sie zu entfernen."}</div>
   <div className={`palette ${hasChest50?"hasBonusColors":""}`}>{paintColors.map(c=>{const bonus=chest50Colors.some(x=>x.value===c);return <button key={c} title={bonus?(chest50Colors.find(x=>x.value===c)?.name||"Bonusfarbe"):""} style={{background:c}} className={`${selected===c&&tool!=="eraser"?"sel":""} ${bonus?"bonusColor":""}`} onClick={()=>{setSelected(c);if(tool==="eraser")setTool("fill")}}>{bonus&&<span className="bonusSpark">✦</span>}</button>})}</div>
   <div className="actions"><button onClick={()=>setScreen("library")}>Vorlagen</button><button className="finish" onClick={finish}>✓ Fertig!</button><button className="saveImageBtn" onClick={()=>rasterRef.current?.save()}><SaveIcon/><span>Bild speichern</span></button></div>
  </section>}

  {screen==="celebrate"&&<section className="reward celebrationScreen celebrationV3">
   <Logo/>
   <div className="rewardgrid">
    <div className="celebrateMascot"><img src="/ui/malino-mascot.webp" alt="Malino"/></div>
    <div><h1>Super gemacht!</h1><p>{celebration.repeat?"Du hast dieses Bild noch einmal wunderschön gemalt! 💗":"Du hast ein neues Kunstwerk fertiggestellt! 💗"}</p><Thumb it={current} done/></div>
   </div>

   <div className="realRewards">
    <div className={`realRewardCard starsEarned ${celebration.earned===0?"muted":""}`}><span>⭐</span><div><b>{celebration.earned>0?`+${celebration.earned} Sterne`:"Keine neuen Sterne"}</b><small>{celebration.repeat?"Dieses Bild war schon fertig.":"Nur beim ersten Fertigstellen."}</small></div></div>
    <div className="realRewardCard"><span>🎨</span><div><b>{celebration.doneCount} {celebration.doneCount===1?"Bild":"Bilder"} geschafft</b><small>Deine Sammlung wächst weiter.</small></div></div>
    {celebration.newChest?
     <div className="realRewardCard chestUnlocked"><span>🎁</span><div><b>Neue Schatzkiste!</b><small>{celebration.newChest} Sterne erreicht.</small></div></div>:
     celebration.nextChest?
      <div className="realRewardCard"><span>✨</span><div><b>Noch {celebration.starsToNext} Sterne</b><small>bis zur nächsten Schatzkiste bei {celebration.nextChest} ⭐</small></div></div>:
      <div className="realRewardCard chestUnlocked"><span>👑</span><div><b>Alle Schatzkisten freigeschaltet!</b><small>Was für eine Malino-Sammlung!</small></div></div>
    }
   </div>

   <div className="celebrationActions">
    <button onClick={()=>setScreen("gallery")}>🖼️ Zur Galerie</button>
    {celebration.newChest&&<button className="openChestCta" onClick={()=>setScreen("reward")}>🎁 Schatzkiste ansehen</button>}
    <button className="finish" onClick={()=>open(items[(items.findIndex(x=>x.id===current.id)+1)%items.length])}>🖌️ Nächstes Bild</button>
   </div>
  </section>}

  {screen==="reward"&&<section className="rewardsHub">
   <div className="rewardsHero">
    <div className="rewardsMascot"><img src="/ui/malino-mascot.webp" alt="Malino"/></div>
    <div className="rewardsHeroText"><span className="eyebrow">Deine Belohnungen</span><h1>Deine Malino-Schatzkiste 🏆</h1><p>Male weiter, sammle Sterne und schalte neue Abzeichen frei.</p></div>
    <div className="starWallet"><span>⭐</span><div><b>{stars}</b><small>Sterne</small></div></div>
   </div>

   <div className="levelCard">
    <div className="levelTop"><div><span className="eyebrow">Dein Fortschritt</span><h2>Kreativ-Level {Math.max(1,Math.floor(done.length/5)+1)}</h2></div><b>{done.length} / {Math.max(5,(Math.floor(done.length/5)+1)*5)} Bilder</b></div>
    <div className="levelTrack"><i style={{width:Math.min(100,((done.length%5)/5)*100)+"%"}}/></div>
    <div className="levelFoot"><span>🎨 {done.length} fertig</span><span>Noch {done.length%5===0&&done.length>0?5:5-(done.length%5)} Bilder bis zum nächsten Level ✨</span></div>
   </div>

   <div className="rewardsSectionHead"><div><span className="eyebrow">Sammlung</span><h2>Deine Abzeichen</h2></div><span>{[1,3,5,10,20,42].filter(n=>done.length>=n).length}/6</span></div>
   <div className="badgeGrid">
    {[
      ["🌟","Erster Stern","1 Bild",done.length>=1],
      ["🎨","Farbenfreund","3 Bilder",done.length>=3],
      ["🦁","Malino-Freund","5 Bilder",done.length>=5],
      ["🚀","Entdecker","10 Bilder",done.length>=10],
      ["👑","Kreativ-König","20 Bilder",done.length>=20],
      ["🏆","Malino-Meister","42 Bilder",done.length>=42]
    ].map(([icon,title,goal,unlocked])=><article key={title} className={`badgeCard ${unlocked?"unlocked":"locked"}`}><span className="badgeIcon">{unlocked?icon:"🔒"}</span><b>{title}</b><small>{unlocked?"Geschafft!":goal}</small>{unlocked&&<i>✓</i>}</article>)}
   </div>

   <div className="rewardsSectionHead surprisesHead"><div><span className="eyebrow">Überraschungen</span><h2>Malinos Schatzkisten 🎁</h2></div></div>
   <div className="surpriseGrid">
    <article className={`surpriseCard ${stars>=50?"ready":""} ${hasChest50?"opened":""}`}><span>{hasChest50?"🌈":"🎁"}</span><div><b>Kleine Schatzkiste</b><small>{hasChest50?"3 Bonusfarben freigeschaltet":"50 Sterne"}</small></div>{hasChest50?<em>Geöffnet ✓</em>:stars>=50?<button className="openChestBtn" onClick={openChest50}>Öffnen!</button>:<em>Noch {Math.max(0,50-stars)} ⭐</em>}</article>
    <article className={`surpriseCard ${stars>=100?"ready":""}`}><span>🎨</span><div><b>Farben-Paket</b><small>100 Sterne</small></div><em>{stars>=100?"Bereit!":"Noch "+Math.max(0,100-stars)+" ⭐"}</em></article>
    <article className={`surpriseCard goldenChest ${stars>=200?"ready":""} ${hasChest200?"opened":""}`}><span>{hasChest200?"🦁":"👑"}</span><div><b>Malino Geheimbild</b><small>{hasChest200?"Geheimes Malbild freigeschaltet":"200 Sterne"}</small></div>{hasChest200?<button className="secretOpenNow" onClick={()=>open(secretMalinoItem)}>Malen! 🖌️</button>:stars>=200?<button className="openChestBtn goldenOpen" onClick={openChest200}>Öffnen!</button>:<em>Noch {Math.max(0,200-stars)} ⭐</em>}</article>
   </div>

   <div className="rewardsCta"><div><span>✨</span><p><b>Weiter so!</b><small>Jedes fertige Bild bringt dir 5 neue Sterne.</small></p></div><button onClick={()=>setScreen("library")}>Weiter malen</button></div>
  </section>}

  {screen==="gallery"&&<section className="galleryPage">
   <div className="galleryHero">
    <div className="galleryMascot"><img src="/ui/malino-mascot.webp" alt="Malino"/></div>
    <div className="galleryHeroText"><span className="eyebrow">Deine Galerie</span><h1>Meine Kunstwerke 💕</h1><p>Hier wohnen all deine fertigen Malbilder.</p></div>
    <div className="galleryCount"><span>🖼️</span><div><b>{gallery.length}</b><small>{gallery.length===1?"Kunstwerk":"Kunstwerke"}</small></div></div>
    <button className="galleryNew" onClick={()=>setScreen("library")}>＋ Neues Bild</button>
   </div>

   {gallery.length?
    <>
     <div className="gallerySectionHead"><div><span className="eyebrow">Meine Sammlung</span><h2>Deine fertigen Bilder</h2></div><span>{gallery.length}</span></div>
     <div className="galleryGrid">{gallery.map(x=><article key={x.id} className="galleryCard">
      <button className="galleryOpen" onClick={()=>open(x)}><Thumb it={x} done/></button>
      <div className="galleryCardText"><b>{x.name}</b><small>🗓️ {x.date}</small></div>
      <button className="galleryAgain" onClick={()=>open(x)}>Noch einmal malen</button>
     </article>)}</div>
    </>:
    <div className="galleryEmpty">
     <div className="galleryEmptyMascot"><img src="/ui/malino-mascot.webp" alt="Malino"/></div>
     <span className="galleryEmptyIcon">🎨</span>
     <h2>Noch keine Kunstwerke</h2>
     <p>Male dein erstes Bild und es erscheint hier in deiner Galerie.</p>
     <button onClick={()=>setScreen("library")}>Mein erstes Bild malen</button>
    </div>}
  </section>}

  {rewardPopup==="chest200"&&<div className="rewardUnlockOverlay goldenUnlockOverlay" role="dialog" aria-modal="true" aria-label="Geheimes Malino Malbild freigeschaltet">
   <div className="rewardUnlockCard goldenUnlockCard">
    <button className="rewardClose" onClick={()=>setRewardPopup(null)} aria-label="Schließen">×</button>
    <div className="unlockBurst">👑🎁</div>
    <span className="eyebrow">Geheimes Malbild freigeschaltet!</span>
    <h2>Malino wartet auf deine Farben! 🦁✨</h2>
    <p>Du hast 200 Sterne gesammelt und eine besondere Malino-Kolورierseite freigeschaltet.</p>
    <div className="secretRewardPreview"><Thumb it={secretMalinoItem} done={done.includes(secretMalinoItem.id)}/><span>💖 Malino Ausmalbild 💖</span></div>
    <button className="unlockPaintBtn goldenPaintNow" onClick={()=>{setRewardPopup(null);open(secretMalinoItem)}}>🖌️ Jetzt Malino malen!</button>
    <small>Die 200 Sterne bleiben natürlich bei dir. ⭐ {stars}</small>
   </div>
  </div>}

  {rewardPopup==="chest50"&&<div className="rewardUnlockOverlay" role="dialog" aria-modal="true" aria-label="Neue Farben freigeschaltet">
   <div className="rewardUnlockCard">
    <button className="rewardClose" onClick={()=>setRewardPopup(null)} aria-label="Schließen">×</button>
    <div className="unlockBurst">🎁</div>
    <span className="eyebrow">Schatzkiste geöffnet!</span>
    <h2>3 neue Malino-Farben! 🌈</h2>
    <p>Du hast Gold, Malino-Rosa und Zauber-Mint freigeschaltet.</p>
    <div className="unlockedColors">{chest50Colors.map(c=><div key={c.value}><i style={{background:c.value}}/><b>{c.name}</b></div>)}</div>
    <button className="unlockPaintBtn" onClick={()=>{setRewardPopup(null);setScreen("library")}}>🖌️ Farben ausprobieren</button>
    <small>Deine Sterne bleiben erhalten. ⭐ {stars}</small>
   </div>
  </div>}

  {screen==="parent"&&<section className="parents">
   <div className="panel">
    <h1>Elternbereich</h1>
    <h2>👧 Kinderprofile</h2>
    <p style={{color:"#65738c",fontWeight:700}}>Aktiv: <b style={{color:"#123a7a"}}>{activeProfile.name}</b></p>
    {profiles.map(p=><button key={p.id} onClick={()=>switchProfile(p.id)} style={p.id===activeProfileId?{background:"#e8f1ff",color:"#1769ff",fontWeight:900}:{}}>
     {p.id===activeProfileId?"✅":"👤"} {p.name}
     <span>{p.id===activeProfileId?"Aktiv":"›"}</span>
    </button>)}
    <button onClick={addProfile}>➕ Neues Kinderprofil<span>›</span></button>
    <button onClick={renameActiveProfile}>✏️ Profil umbenennen<span>›</span></button>
    <button onClick={resetActiveProfile}>↺ Fortschritt zurücksetzen<span>›</span></button>
    {profiles.length>1&&<button onClick={deleteActiveProfile}>🗑️ Profil löschen<span>›</span></button>}
    <button>⏱️ Bildschirmzeit<span>›</span></button>
    <button>⚙️ App-Einstellungen<span>›</span></button>
    <button>🖨️ Export & Drucken<span>›</span></button>
    <button>❓ Hilfe & Feedback<span>›</span></button>
    <button>ℹ️ Über Malino<span>›</span></button>
   </div>
   <div className="panel">
    <h2>Profil-Statistik</h2>
    <p>Profil <b>{activeProfile.name}</b></p>
    <p>Gemalte Bilder <b>{done.length}</b></p>
    <p>Erhaltene Sterne <b>{stars} ⭐</b></p>
    <p>Galerie <b>{gallery.length}</b></p>
    <p>Belohnungen <b>{unlockedRewards.length}</b></p>
    <div className="bars">{[30,50,42,65,55,75,88].map((h,i)=><i key={i} style={{height:h+"%"}}/>)}</div>
   </div>
  </section>}

  <nav>{[["start","🏠","Start"],["library","📚","Bibliothek"],["paint","🖌️","Malen"],["reward","🏆","Belohnungen"],["gallery","🖼️","Galerie"]].map(([s,e,l])=><button key={s} className={screen===s?"active":""} onClick={()=>s==="paint"?open(current):setScreen(s)}>{e}<span>{l}</span></button>)}</nav>
 </main>
}