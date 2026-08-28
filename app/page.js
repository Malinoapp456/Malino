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
 useEffect(()=>{
  if(typeof window==="undefined"||!("serviceWorker" in navigator))return;
  let refreshing=false;
  const register=async()=>{
   try{
    const reg=await navigator.serviceWorker.register("/sw.js");
    reg.update().catch(()=>{});
    navigator.serviceWorker.addEventListener("controllerchange",()=>{
     if(refreshing)return;
     refreshing=true;
     window.location.reload();
    });
   }catch{}
  };
  if(document.readyState==="complete")register();
  else window.addEventListener("load",register,{once:true});
 },[]);

 useEffect(()=>{try{const s=localStorage.getItem(key);if(s)setV(JSON.parse(s))}catch{}},[key]);
 useEffect(()=>{try{localStorage.setItem(key,JSON.stringify(v))}catch{}},[key,v]);
 return [v,setV];
}
function Logo(){return <div className="logo logoV3" aria-label="Malino"><img src="/ui/malino-logo.webp" alt="Malino"/></div>}
function HomeMascot(){return <div className="homeMascot" aria-label="Malino, dein kreativer Freund"><img src="/ui/malino-mascot.webp" alt="Fröhlicher Malino mit Pinsel"/><span className="mascotSpark s1">✦</span><span className="mascotSpark s2">✦</span><span className="mascotSpark s3">•</span></div>}
function Lion(){return <div className="lion">🦁</div>}
function ToolIcon({type}){
 if(type==="magic")return <svg className="toolSvg" viewBox="0 0 64 64" aria-hidden="true"><path d="M17 47 43 21" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/><path d="m39 17 8 8" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/><path d="M48 8v8M44 12h8M17 12v7M13.5 15.5h7M49 39v9M44.5 43.5h9" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>;
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
 const magicHueRef=useRef(0);
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
 const move=e=>{if(!drawing.current)return;const c=canvasRef.current,ctx=c.getContext("2d"),p=point(e),a=last.current,fit=fitRectRef.current||{x:0,y:0,w:c.width,h:c.height};ctx.save();ctx.beginPath();ctx.rect(fit.x,fit.y,fit.w,fit.h);ctx.clip();ctx.globalCompositeOperation=tool==="eraser"?"destination-out":"source-over";
 if(tool==="magic"){
  const hue=magicHueRef.current%360;
  const grad=ctx.createLinearGradient(a.x,a.y,p.x,p.y);
  grad.addColorStop(0,`hsl(${hue} 92% 58%)`);
  grad.addColorStop(.5,`hsl(${(hue+60)%360} 94% 60%)`);
  grad.addColorStop(1,`hsl(${(hue+120)%360} 92% 58%)`);
  ctx.strokeStyle=grad;
  ctx.lineWidth=18;
  magicHueRef.current=(hue+14)%360;
 }else{
  ctx.strokeStyle=color;
  ctx.lineWidth=tool==="eraser"?30:16;
 }
 ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(p.x,p.y);ctx.stroke();ctx.restore();ctx.globalCompositeOperation="source-over";last.current=p};
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
const PROFILE_AVATARS=[
 {id:"lion",emoji:"🦁",label:"Löwe"},
 {id:"fox",emoji:"🦊",label:"Fuchs"},
 {id:"panda",emoji:"🐼",label:"Panda"},
 {id:"penguin",emoji:"🐧",label:"Pinguin"},
 {id:"unicorn",emoji:"🦄",label:"Einhorn"},
 {id:"dino",emoji:"🦕",label:"Dino"},
 {id:"rocket",emoji:"🚀",label:"Rakete"},
 {id:"rainbow",emoji:"🌈",label:"Regenbogen"}
];
const avatarEmoji=id=>PROFILE_AVATARS.find(a=>a.id===id)?.emoji||"🦁";

export default function Page(){
 const emptyProfileData=()=>({fav:[],done:[],gallery:[],stars:0,rewards:[],avatar:"lion",dailyClaims:[],dailyStreak:0,lastDailyDate:"",activeFrame:"classic",puzzleSolved:[]});
 const [screen,setScreen]=useState("start");
 const [profiles,setProfiles]=useState([{id:"default",name:"Kind 1"}]);
 const [activeProfileId,setActiveProfileId]=useState("default");
 const [profileData,setProfileData]=useState({default:emptyProfileData()});
 const [profilesReady,setProfilesReady]=useState(false);
 const [rewardPopup,setRewardPopup]=useState(null);
 const [rewardStage,setRewardStage]=useState("closed");
 const [puzzleFeedback,setPuzzleFeedback]=useState(null);
 const [puzzleWrong,setPuzzleWrong]=useState(null);
 const [activePuzzleId,setActivePuzzleId]=useState(null);
 const [activePuzzleWorld,setActivePuzzleWorld]=useState(null);
 const [craftImageId,setCraftImageId]=useState(null);
 const [craftPieces,setCraftPieces]=useState(6);
 const [craftStyle,setCraftStyle]=useState("bw");
 const [savedCraftPuzzles,setSavedCraftPuzzles]=useState([]);


 const [profileDialog,setProfileDialog]=useState(null);
 const [profileNameInput,setProfileNameInput]=useState("");
 const [profileAvatarInput,setProfileAvatarInput]=useState("lion");
 const [parentPin,setParentPin]=useState("");
 const [parentPinInput,setParentPinInput]=useState("");
 const [parentPinMode,setParentPinMode]=useState("locked");
 const [parentPinError,setParentPinError]=useState("");
 const [parentTool,setParentTool]=useState(null);
 const [screenTimeLimit,setScreenTimeLimit]=useState(0);
 const [screenTimeUsage,setScreenTimeUsage]=useState(0);
 const [animationsEnabled,setAnimationsEnabled]=useState(true);
 const [soundEnabled,setSoundEnabled]=useState(true);
 const [parentToolNotice,setParentToolNotice]=useState("");


 const [current,setCurrent]=useState(items[0]);
 const [query,setQuery]=useState("");
 const [cat,setCat]=useState("Alle");
 const [selected,setSelected]=useState("#22c55e");
 const [tool,setTool]=useState("fill");
 const [fills,setFills]=useState({});
 const [history,setHistory]=useState([]);
 const [fillFeedback,setFillFeedback]=useState(null);
 const [celebration,setCelebration]=useState({earned:0,dailyBonus:0,doneCount:0,starsAfter:0,newChest:null,nextChest:null,starsToNext:0,repeat:false});
 const rasterRef=useRef(null);
 const feedbackTimer=useRef(null);
 const soundPool=useRef({});
 const playSound=type=>{
  if(!soundEnabled||typeof window==="undefined")return;
  try{
   const base=soundPool.current[type];
   if(!base)return;
   const audio=base.cloneNode();
   audio.volume=type==="click"?0.35:(type==="premium-reward-fanfare"?0.92:(type==="premium-chest-open"?0.72:0.55));
   audio.currentTime=0;
   const p=audio.play();
   if(p?.catch)p.catch(()=>{});
  }catch{}
 };


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
  if(typeof window==="undefined")return;
  const types=["click","color","success","stars","reward","streak","chest-creak","reward-boom","reward-fanfare","premium-chest-open","premium-reward-fanfare"];
  const pool={};
  types.forEach(type=>{
   try{
    const audio=new Audio(`/sounds/${type}.wav`);
    audio.preload="auto";
    audio.load();
    pool[type]=audio;
   }catch{}
  });
  soundPool.current=pool;
 },[]);

 useEffect(()=>{
  try{
   const savedPin=localStorage.getItem("malino:parentPin:v1");
   if(savedPin)setParentPin(savedPin);
  }catch{}
 },[]);

 useEffect(()=>{
  try{
   const limit=Number(localStorage.getItem("malino:screenTimeLimit:v1")||0);
   setScreenTimeLimit(Number.isFinite(limit)?limit:0);
   const anim=localStorage.getItem("malino:animations:v1");
   if(anim!==null)setAnimationsEnabled(anim!=="off");
   const crafts=localStorage.getItem("malino:craftPuzzles:v1");
   if(crafts){try{setSavedCraftPuzzles(JSON.parse(crafts)||[])}catch{}}
   const snd=localStorage.getItem("malino:sound:v1");
   if(snd!==null)setSoundEnabled(snd!=="off");
   const key=new Date().toLocaleDateString("sv-SE");
   const raw=localStorage.getItem("malino:screenTimeUsage:v1");
   if(raw){
    const parsed=JSON.parse(raw);
    setScreenTimeUsage(parsed?.date===key?Number(parsed.minutes||0):0);
   }
  }catch{}
 },[]);

 useEffect(()=>{
  try{
   localStorage.setItem("malino:animations:v1",animationsEnabled?"on":"off");
   document.documentElement.classList.toggle("malino-no-animations",!animationsEnabled);
  }catch{}
 },[animationsEnabled]);

 useEffect(()=>{
  try{localStorage.setItem("malino:sound:v1",soundEnabled?"on":"off")}catch{}
 },[soundEnabled]);

 useEffect(()=>{
  try{localStorage.setItem("malino:craftPuzzles:v1",JSON.stringify(savedCraftPuzzles))}catch{}
 },[savedCraftPuzzles]);

 useEffect(()=>{
  if(typeof document==="undefined")return;
  let primed=false;
  const prime=()=>{
   if(primed)return;
   primed=true;
   Object.values(soundPool.current).forEach(audio=>{
    try{
     const oldVolume=audio.volume;
     audio.volume=0;
     const p=audio.play();
     if(p?.then){
      p.then(()=>{
       audio.pause();
       audio.currentTime=0;
       audio.volume=oldVolume;
      }).catch(()=>{audio.volume=oldVolume;});
     }
    }catch{}
   });
   document.removeEventListener("pointerdown",prime,true);
   document.removeEventListener("touchstart",prime,true);
  };
  document.addEventListener("pointerdown",prime,true);
  document.addEventListener("touchstart",prime,true);
  return()=>{
   document.removeEventListener("pointerdown",prime,true);
   document.removeEventListener("touchstart",prime,true);
  };
 },[]);

 useEffect(()=>{
  const handler=e=>{
   if(!soundEnabled)return;
   const btn=e.target?.closest?.("button");
   if(!btn)return;
   if(btn.classList.contains("finish")||btn.classList.contains("openChestBtn"))return;
   if(btn.closest(".palette"))return;
   playSound("click");
  };
  document.addEventListener("click",handler,true);
  return()=>document.removeEventListener("click",handler,true);
 },[soundEnabled]);

 useEffect(()=>{
  const timer=setInterval(()=>{
   if(typeof document!=="undefined"&&document.visibilityState!=="visible")return;
   setScreenTimeUsage(prev=>{
    const next=prev+1;
    try{
     const key=new Date().toLocaleDateString("sv-SE");
     localStorage.setItem("malino:screenTimeUsage:v1",JSON.stringify({date:key,minutes:next}));
    }catch{}
    return next;
   });
  },60000);
  return()=>clearInterval(timer);
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
 const dailyClaims=Array.isArray(activeData.dailyClaims)?activeData.dailyClaims:[];
 const dailyStreak=Number(activeData.dailyStreak||0);
 const lastDailyDate=activeData.lastDailyDate||"";
 const puzzleSolved=Array.isArray(activeData.puzzleSolved)?activeData.puzzleSolved:[];
 const puzzleCards=[
  {
   id:"odd-one",
   icon:"🧩",
   title:"Was passt nicht?",
   age:"4–6",
   task:"Welches Bild gehört nicht zu den anderen?",
   options:["🍎","🍐","🍌","🚗"],
   answer:"🚗",
   hint:"Drei Dinge kann man essen."
  },
  {
   id:"pattern",
   icon:"🔎",
   title:"Muster entdecken",
   age:"5–7",
   task:"Was kommt als Nächstes?",
   pattern:"⭐ 🌙 ⭐ 🌙 ⭐ …",
   options:["🌙","⭐","☀️","🌈"],
   answer:"🌙",
   hint:"Die zwei Zeichen wechseln sich ab."
  },
  {
   id:"cat-fish",
   icon:"🐾",
   title:"Finde das Paar",
   age:"4–6",
   task:"Welche zwei Dinge gehören zusammen?",
   options:["🐱 + 🐟","🐶 + 🌙","🚀 + 🍎","🌳 + 🚗"],
   answer:"🐱 + 🐟",
   hint:"Denk daran, was die Katze gern mag."
  },
  {
   id:"count-apples",
   icon:"🔢",
   title:"Zähle die Äpfel",
   age:"4–6",
   task:"Wie viele Äpfel siehst du?",
   pattern:"🍎 🍎 🍎 🍎",
   options:["3","4","5","6"],
   answer:"4",
   hint:"Zähle jeden Apfel langsam."
  },
  {
   id:"bigger-animal",
   icon:"🐘",
   title:"Was ist größer?",
   age:"4–6",
   task:"Welches Tier ist normalerweise größer?",
   options:["🐘","🐭","🐞","🐜"],
   answer:"🐘",
   hint:"Denk an das größte Tier in der Reihe."
  },
  {
   id:"day-night",
   icon:"☀️",
   title:"Tag oder Nacht?",
   age:"4–6",
   task:"Was sehen wir meistens am Tag?",
   options:["☀️","🌙","⭐","🦉"],
   answer:"☀️",
   hint:"Es macht den Himmel hell."
  },
  {
   id:"color-red",
   icon:"🎨",
   title:"Welche Farbe?",
   age:"4–6",
   task:"Welche Farbe hat eine reife Erdbeere meistens?",
   options:["🔴 Rot","🔵 Blau","🟢 Grün","⚪ Weiß"],
   answer:"🔴 Rot",
   hint:"Denk an eine Erdbeere im Sommer."
  },
  {
   id:"vehicle-water",
   icon:"🚤",
   title:"Was fährt auf Wasser?",
   age:"4–6",
   task:"Welches Fahrzeug bewegt sich auf dem Wasser?",
   options:["🚗","🚤","🚲","🚜"],
   answer:"🚤",
   hint:"Es braucht keinen Straßenbelag."
  },
  {
   id:"animal-home",
   icon:"🏠",
   title:"Wo wohnt der Fisch?",
   age:"4–6",
   task:"Wo lebt ein Fisch?",
   options:["🌊 Wasser","🌳 Baum","☁️ Himmel","🏠 Haus"],
   answer:"🌊 Wasser",
   hint:"Ein Fisch braucht Wasser."
  },
  {
   id:"simple-addition",
   icon:"➕",
   title:"Kleine Rechnung",
   age:"5–7",
   task:"Wie viel ist 2 + 1?",
   options:["2","3","4","5"],
   answer:"3",
   hint:"Zähle zwei Dinge und nimm noch eins dazu."
  },
  {
   id:"simple-subtraction",
   icon:"➖",
   title:"Was bleibt übrig?",
   age:"5–7",
   task:"Wie viel ist 5 − 2?",
   options:["2","3","4","5"],
   answer:"3",
   hint:"Nimm von fünf zwei weg."
  },
  {
   id:"sequence-numbers",
   icon:"🔢",
   title:"Zahlenreihe",
   age:"5–7",
   task:"Welche Zahl kommt als Nächstes?",
   pattern:"1  2  3  4  …",
   options:["5","6","7","8"],
   answer:"5",
   hint:"Die Zahlen werden immer um eins größer."
  },
  {
   id:"shape-circle",
   icon:"🔵",
   title:"Finde den Kreis",
   age:"4–6",
   task:"Welche Form ist rund?",
   options:["🔵","🔺","⬛","🔶"],
   answer:"🔵",
   hint:"Sie hat keine Ecken."
  },
  {
   id:"opposites",
   icon:"↔️",
   title:"Gegenteile",
   age:"5–7",
   task:"Was ist das Gegenteil von groß?",
   options:["klein","lang","hell","schnell"],
   answer:"klein",
   hint:"Denk an eine Maus neben einem Elefanten."
  },
  {
   id:"weather-rain",
   icon:"🌧️",
   title:"Was brauchen wir?",
   age:"4–6",
   task:"Was nehmen wir bei Regen mit?",
   options:["☂️","🕶️","🩴","🏖️"],
   answer:"☂️",
   hint:"Es hält den Regen über deinem Kopf ab."
  },
  {
   id:"food-category",
   icon:"🥕",
   title:"Obst oder Gemüse?",
   age:"5–7",
   task:"Welches Bild zeigt Gemüse?",
   options:["🍓","🍌","🥕","🍎"],
   answer:"🥕",
   hint:"Es wächst unter der Erde und ist orange."
  },
  {
   id:"letter-a",
   icon:"🔤",
   title:"Buchstaben finden",
   age:"5–7",
   task:"Welches Wort beginnt mit A?",
   options:["Apfel","Ball","Hund","Maus"],
   answer:"Apfel",
   hint:"Hör auf den ersten Laut: A..."
  },
  {
   id:"letter-m",
   icon:"🔤",
   title:"Malinos Buchstabe",
   age:"5–7",
   task:"Mit welchem Buchstaben beginnt „Malino“?",
   options:["M","L","A","N"],
   answer:"M",
   hint:"Sprich „Malino“ ganz langsam."
  },
  {
   id:"logic-wheels",
   icon:"⚙️",
   title:"Was braucht Räder?",
   age:"5–7",
   task:"Welches Ding hat normalerweise Räder?",
   options:["🚲 Fahrrad","📚 Buch","🥄 Löffel","🧸 Teddy"],
   answer:"🚲 Fahrrad",
   hint:"Damit kann man fahren."
  },
  {
   id:"emotion-happy",
   icon:"😊",
   title:"Gefühle erkennen",
   age:"4–6",
   task:"Welches Gesicht sieht fröhlich aus?",
   options:["😊","😢","😡","😴"],
   answer:"😊",
   hint:"Es lächelt."
  }
 ];
 const solvedPuzzleCount=puzzleCards.filter(p=>puzzleSolved.includes(p.id)).length;
 const activePuzzle=activePuzzleId?puzzleCards.find(p=>p.id===activePuzzleId):null;
 const puzzleWorlds=[
  {id:"logic",number:1,title:"Logik-Wald",icon:"🌳",emoji:"🧩",ids:["odd-one","cat-fish","bigger-animal","animal-home"],unlock:0},
  {id:"numbers",number:2,title:"Zahlen-Berge",icon:"🏔️",emoji:"🔢",ids:["count-apples","simple-addition","simple-subtraction","sequence-numbers"],unlock:2},
  {id:"letters",number:3,title:"Buchstaben-Dorf",icon:"🏘️",emoji:"🔤",ids:["letter-a","letter-m","opposites","emotion-happy"],unlock:5},
  {id:"colors",number:4,title:"Farben-Insel",icon:"🏝️",emoji:"🎨",ids:["color-red","shape-circle","weather-rain","food-category"],unlock:8},
  {id:"magic",number:5,title:"Malinos Zauberwelt",icon:"🏰",emoji:"✨",ids:["pattern","day-night","vehicle-water","logic-wheels"],unlock:12}
 ];
 const worldSolvedCount=world=>world.ids.filter(id=>puzzleSolved.includes(id)).length;
 const worldUnlocked=world=>solvedPuzzleCount>=world.unlock;
 const currentPuzzleWorld=activePuzzleWorld?puzzleWorlds.find(w=>w.id===activePuzzleWorld):null;
 const currentWorldPuzzles=currentPuzzleWorld?currentPuzzleWorld.ids.map(id=>puzzleCards.find(p=>p.id===id)).filter(Boolean):[];
 const craftTemplates=[
  {id:"rakete",title:"Rakete",emoji:"🚀",src:"/puzzle-rakete.png"},
  {id:"triceratops",title:"Triceratops",emoji:"🦕",src:"/puzzle-triceratops.png"},
  {id:"feuerwehr",title:"Feuerwehr",emoji:"🚒",src:"/puzzle-feuerwehr.png"},
  {id:"traktor",title:"Traktor",emoji:"🚜",src:"/puzzle-traktor.png"},
  {id:"fuchs",title:"Fuchs",emoji:"🦊",src:"/puzzle-fuchs.png"},
  {id:"pinguin",title:"Pinguin",emoji:"🐧",src:"/puzzle-pinguin.png"},
  {id:"drache",title:"Drache",emoji:"🐉",src:"/puzzle-drache.png"},
  {id:"schloss",title:"Schloss",emoji:"🏰",src:"/puzzle-schloss.png"},
  {id:"pferd",title:"Pferd",emoji:"🐴",src:"/puzzle-pferd.png"},
  {id:"igel",title:"Igel",emoji:"🦔",src:"/puzzle-igel.png"},
  {id:"ziege",title:"Ziege",emoji:"🐐",src:"/puzzle-ziege.png"},
  {id:"astronaut",title:"Astronaut",emoji:"🧑‍🚀",src:"/puzzle-astronaut.png"}
 ];
 const activeCraftTemplate=craftTemplates.find(x=>x.id===craftImageId)||craftTemplates[0];
 const craftGrid=craftPieces===4?[2,2]:craftPieces===6?[3,2]:craftPieces===9?[3,3]:[4,3];



 const todayKey=new Date().toLocaleDateString("sv-SE");
 const dailySeed=[...todayKey].reduce((sum,ch)=>sum+ch.charCodeAt(0),0);
 const dailyItem=items[dailySeed%items.length];
 const dailyClaimed=dailyClaims.includes(todayKey);
 const recentItem=gallery?.[0]?items.find(it=>it.id===gallery[0].id):null;
 const continueItem=recentItem||dailyItem;
 const doneItems=items.filter(it=>done.includes(it.id));
 const doneByCat=cat=>doneItems.filter(it=>it.cat===cat).length;
 const achievementBadges=[
  {id:"first",icon:"🌟",title:"Erster Stern",desc:"1 Bild fertig",ok:done.length>=1},
  {id:"artist",icon:"🎨",title:"Farbenfreund",desc:"3 Bilder fertig",ok:done.length>=3},
  {id:"malino",icon:"🦁",title:"Malino-Freund",desc:"5 Bilder fertig",ok:done.length>=5},
  {id:"daily",icon:"☀️",title:"Tagesheld",desc:"1 Tages-Challenge",ok:dailyClaims.length>=1},
  {id:"streak3",icon:"🔥",title:"3-Tage-Serie",desc:"3 Tage in Folge",ok:dailyStreak>=3},
  {id:"streak7",icon:"🏆",title:"7-Tage-Serie",desc:"7 Tage in Folge",ok:dailyStreak>=7},
  {id:"animal",icon:"🐾",title:"Tierfreund",desc:"3 Tierbilder",ok:doneByCat("Tiere")>=3},
  {id:"dino",icon:"🦖",title:"Dino-Forscher",desc:"3 Dinosaurier",ok:doneByCat("Dinosaurier")>=3},
  {id:"space",icon:"🚀",title:"Weltraum-Entdecker",desc:"3 Weltraumbilder",ok:doneByCat("Weltraum")>=3},
  {id:"farm",icon:"🚜",title:"Bauernhof-Profi",desc:"3 Bauernhofbilder",ok:doneByCat("Bauernhof")>=3},
  {id:"gallery",icon:"🎨",title:"Galerie-Star",desc:"10 Werke in der Galerie",ok:gallery.length>=10},
  {id:"collector",icon:"🎁",title:"Schatzsammler",desc:"2 Belohnungen geöffnet",ok:unlockedRewards.length>=2},
  {id:"stars",icon:"⭐",title:"Sternesammler",desc:"100 Sterne",ok:stars>=100},
  {id:"master",icon:"🏆",title:"Malino-Meister",desc:"42 Bilder fertig",ok:done.length>=42}
 ];
 const unlockedBadgeCount=achievementBadges.filter(b=>b.ok).length;
 const activeFrame=activeData.activeFrame||"classic";
 const treasureItems=[
  {id:"rainbowSticker",type:"sticker",icon:"🌈",title:"Regenbogen-Sticker",desc:"Aus der 50-Sterne-Kiste",ok:unlockedRewards.includes("chest50")},
  {id:"magicCharm",type:"sticker",icon:"✨",title:"Zauberfunken",desc:"Aus der 100-Sterne-Kiste",ok:unlockedRewards.includes("chest100")},
  {id:"goldenMalino",type:"sticker",icon:"🦁",title:"Goldener Malino",desc:"Aus der 200-Sterne-Kiste",ok:unlockedRewards.includes("chest200")},
  {id:"star",type:"frame",icon:"⭐",title:"Sternen-Rahmen",desc:"3 Abzeichen sammeln",ok:unlockedBadgeCount>=3},
  {id:"fire",type:"frame",icon:"🔥",title:"Feuer-Rahmen",desc:"3-Tage-Serie schaffen",ok:dailyStreak>=3},
  {id:"rainbow",type:"frame",icon:"🎨",title:"Künstler-Rahmen",desc:"10 Bilder fertig malen",ok:done.length>=10}
 ];
 const unlockedTreasureCount=treasureItems.filter(x=>x.ok).length;

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
 const setDailyClaims=value=>updateProfileField("dailyClaims",value);
 const setActiveFrame=value=>updateProfileField("activeFrame",value);
 const setPuzzleSolved=value=>updateProfileField("puzzleSolved",value);
 const setDailyStreak=value=>updateProfileField("dailyStreak",value);
 const setLastDailyDate=value=>updateProfileField("lastDailyDate",value);

 const saveCraftPuzzle=()=>{
  const item={
   id:`craft-${Date.now()}`,
   imageId:activeCraftTemplate.id,
   title:activeCraftTemplate.title,
   pieces:craftPieces,
   style:craftStyle,
   createdAt:new Date().toISOString()
  };
  setSavedCraftPuzzles([item,...savedCraftPuzzles].slice(0,12));
  playSound("success");
 };

 const printCraftPuzzle=()=>{
  if(typeof window==="undefined")return;
  const w=window.open("","_blank","noopener,noreferrer");
  if(!w)return;
  const [cols,rows]=craftGrid;
  const title=`${activeCraftTemplate.title} – ${craftPieces} Teile`;
  const img=activeCraftTemplate.src;
  const bw=craftStyle==="bw";
  w.document.write(`<!doctype html><html><head><title>${title}</title><style>
    @page{size:A4;margin:12mm}
    body{font-family:system-ui,sans-serif;color:#173d78;margin:0;padding:0}
    .sheet{min-height:270mm;display:flex;flex-direction:column;align-items:center}
    h1{font-size:22px;margin:0 0 8px}
    p{font-size:12px;margin:0 0 14px;color:#5c6e87}
    .puzzle{position:relative;width:170mm;aspect-ratio:4/3;border:2px solid #173d78;overflow:hidden;background:#fff}
    .puzzle img{width:100%;height:100%;object-fit:contain;${bw?"filter:grayscale(1) contrast(1.2);":""}}
    .v,.h{position:absolute;z-index:3;pointer-events:none}
    .v{top:0;bottom:0;border-left:2px dashed #1f2d3f}
    .h{left:0;right:0;border-top:2px dashed #1f2d3f}
    .sc{position:absolute;z-index:4;font-size:18px;background:#fff}
    .note{margin-top:10px;font-size:11px;color:#5d6a7a}
    .sample{margin-top:14px;display:flex;gap:8px;align-items:center}
    .sample img{width:45mm;height:34mm;object-fit:contain;border:1px solid #ccd6e2;${bw?"filter:grayscale(1) contrast(1.2);":""}}
  </style></head><body><div class="sheet">
    <h1>✂️ ${title}</h1>
    <p>Entlang der gestrichelten Linien ausschneiden.</p>
    <div class="puzzle">
      <img src="${img}"/>
      ${Array.from({length:cols-1},(_,i)=>`<span class="v" style="left:${(i+1)*100/cols}%"></span>`).join("")}
      ${Array.from({length:rows-1},(_,i)=>`<span class="h" style="top:${(i+1)*100/rows}%"></span>`).join("")}
      <span class="sc" style="left:3px;top:3px">✂️</span>
      <span class="sc" style="right:3px;bottom:3px">✂️</span>
    </div>
    <div class="sample"><img src="${img}"/><div><b>Vorlage</b><div class="note">So sieht das fertige Puzzle aus.</div></div></div>
    <div class="note">Malino – Basteln & Spielen</div>
  </div><script>window.onload=()=>setTimeout(()=>window.print(),250)</script></body></html>`);
  w.document.close();
 };

 const answerPuzzle=(puzzle,choice)=>{
  if(choice===puzzle.answer){
   const firstTime=!puzzleSolved.includes(puzzle.id);
   if(firstTime){
    setPuzzleSolved([...puzzleSolved,puzzle.id]);
    setStars(stars+3);
    playSound("stars");
   }else{
    playSound("success");
   }
   setPuzzleWrong(null);
   setPuzzleFeedback({id:puzzle.id,firstTime});
  }else{
   playSound("click");
   setPuzzleFeedback(null);
   setPuzzleWrong(puzzle.id);
   setTimeout(()=>setPuzzleWrong(current=>current===puzzle.id?null:current),650);
  }
 };

 const openParentTool=tool=>{
  setParentToolNotice("");
  setParentTool(tool);
 };
 const closeParentTool=()=>{
  setParentTool(null);
  setParentToolNotice("");
 };
 const saveScreenTimeLimit=minutes=>{
  const value=Number(minutes||0);
  setScreenTimeLimit(value);
  try{localStorage.setItem("malino:screenTimeLimit:v1",String(value))}catch{}
 };
 const resetTodayScreenTime=()=>{
  setScreenTimeUsage(0);
  try{
   const key=new Date().toLocaleDateString("sv-SE");
   localStorage.setItem("malino:screenTimeUsage:v1",JSON.stringify({date:key,minutes:0}));
  }catch{}
  setParentToolNotice("Heutige Bildschirmzeit wurde zurückgesetzt.");
 };
 const exportProfileData=()=>{
  const payload={
   app:"Malino",
   exportedAt:new Date().toISOString(),
   profile:{id:activeProfileId,name:activeProfile.name},
   data:profileData?.[activeProfileId]||emptyProfileData()
  };
  try{
   const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
   const url=URL.createObjectURL(blob);
   const a=document.createElement("a");
   a.href=url;
   a.download=`malino-${activeProfile.name.replace(/[^a-z0-9_-]+/gi,"-").toLowerCase()}-profil.json`;
   document.body.appendChild(a);
   a.click();
   a.remove();
   setTimeout(()=>URL.revokeObjectURL(url),1200);
   setParentToolNotice("Profildaten wurden exportiert.");
  }catch{
   setParentToolNotice("Export konnte auf diesem Gerät nicht gestartet werden.");
  }
 };
 const printParentArea=()=>{try{window.print()}catch{}};
 const copySupportInfo=async()=>{
  const text=`Malino Support-Info\nProfil: ${activeProfile.name}\nSterne: ${stars}\nGemalte Bilder: ${done.length}\nGalerie: ${gallery.length}\nBelohnungen: ${unlockedRewards.length}\nGerät: ${typeof navigator!=="undefined"?navigator.userAgent:""}`;
  try{
   await navigator.clipboard.writeText(text);
   setParentToolNotice("Support-Info wurde kopiert.");
  }catch{
   setParentToolNotice("Kopieren ist auf diesem Gerät nicht verfügbar.");
  }
 };
 const openParentArea=()=>{
  setParentPinInput("");
  setParentPinError("");
  setParentPinMode(parentPin?"locked":"setup");
  setScreen("parent");
 };
 const unlockParentArea=()=>{
  if(parentPinInput===parentPin){
   setParentPinInput("");
   setParentPinError("");
   setParentPinMode("unlocked");
  }else{
   setParentPinError("Falsche PIN. Bitte erneut versuchen.");
  }
 };
 const saveFirstParentPin=()=>{
  if(!/^\d{4}$/.test(parentPinInput)){
   setParentPinError("Bitte genau 4 Ziffern eingeben.");
   return;
  }
  try{localStorage.setItem("malino:parentPin:v1",parentPinInput)}catch{}
  setParentPin(parentPinInput);
  setParentPinInput("");
  setParentPinError("");
  setParentPinMode("unlocked");
 };
 const startParentPinChange=()=>{
  setParentPinInput("");
  setParentPinError("");
  setParentPinMode("change");
 };
 const saveChangedParentPin=()=>{
  if(!/^\d{4}$/.test(parentPinInput)){
   setParentPinError("Bitte genau 4 Ziffern eingeben.");
   return;
  }
  try{localStorage.setItem("malino:parentPin:v1",parentPinInput)}catch{}
  setParentPin(parentPinInput);
  setParentPinInput("");
  setParentPinError("");
  setParentPinMode("unlocked");
 };
 const submitParentPin=()=>{
  if(parentPinMode==="locked")unlockParentArea();
  else if(parentPinMode==="change")saveChangedParentPin();
  else saveFirstParentPin();
 };
 const addTestStars=()=>setStars(prev=>Number(prev||0)+50);

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
  setProfileNameInput("");
  setProfileAvatarInput("lion");
  setProfileDialog("add");
 };

 const resetActiveProfile=()=>{
  setProfileDialog("reset");
 };

 const renameActiveProfile=()=>{
  setProfileNameInput(activeProfile.name);
  setProfileAvatarInput(profileData?.[activeProfileId]?.avatar||"lion");
  setProfileDialog("rename");
 };

 const deleteActiveProfile=()=>{
  if(profiles.length<=1){
   setProfileDialog("cantDelete");
   return;
  }
  setProfileDialog("delete");
 };

 const closeProfileDialog=()=>{
  setProfileDialog(null);
  setProfileNameInput("");
  setProfileAvatarInput("lion");
 };

 const confirmProfileDialog=()=>{
  if(profileDialog==="add"){
   const clean=(profileNameInput||"").trim().slice(0,24);
   if(!clean)return;
   const id="p-"+Date.now().toString(36)+"-"+Math.random().toString(36).slice(2,6);
   setProfiles(prev=>[...prev,{id,name:clean}]);
   setProfileData(prev=>({...prev,[id]:{...emptyProfileData(),avatar:profileAvatarInput}}));
   setActiveProfileId(id);
   setRewardPopup(null);
   setCurrent(items[0]);
   setFills({});
   setHistory([]);
   setFillFeedback(null);
   setTool("fill");
   setScreen("parent");
   closeProfileDialog();
   return;
  }

  if(profileDialog==="rename"){
   const clean=(profileNameInput||"").trim().slice(0,24);
   if(!clean)return;
   setProfiles(prev=>prev.map(p=>p.id===activeProfileId?{...p,name:clean}:p));
   setProfileData(prev=>({...prev,[activeProfileId]:{...(prev[activeProfileId]||emptyProfileData()),avatar:profileAvatarInput}}));
   closeProfileDialog();
   return;
  }

  if(profileDialog==="reset"){
   setProfileData(prev=>({...prev,[activeProfileId]:{...emptyProfileData(),avatar:prev?.[activeProfileId]?.avatar||"lion",activeFrame:prev?.[activeProfileId]?.activeFrame||"classic"}}));
   setRewardPopup(null);
   setCurrent(items[0]);
   setFills({});
   setHistory([]);
   setFillFeedback(null);
   setTool("fill");
   setScreen("parent");
   closeProfileDialog();
   return;
  }

  if(profileDialog==="delete"){
   if(profiles.length<=1){closeProfileDialog();return}
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
   setFillFeedback(null);
   setTool("fill");
   setScreen("parent");
   closeProfileDialog();
  }
 };

 const hasChest50=unlockedRewards.includes("chest50");
 const hasChest100=unlockedRewards.includes("chest100");
 const hasChest200=unlockedRewards.includes("chest200");
 const availableItems=hasChest200?[...items,secretMalinoItem]:items;
 const filtered=useMemo(()=>availableItems.filter(x=>(cat==="Alle"||x.cat===cat)&&x.name.toLowerCase().includes(query.toLowerCase())),[cat,query,hasChest200]);
 const categoryCount=name=>name==="Alle"?items.length:items.filter(x=>x.cat===name).length;
 const favoriteItems=items.filter(x=>fav.includes(x.id));
 const newItems=items.filter(x=>x.image).slice(0,8);
 const visibleCategories=cats.slice(1).filter(c=>categoryCount(c)>0);
 const visibleTitle=cat==="Alle"?"Alle Malbilder":categoryMeta[cat]?.label||cat;
 const headerStarCount=Number(profileData?.[activeProfileId]?.stars ?? 0);
 const screenTimeBlocked=screenTimeLimit>0&&screenTimeUsage>=screenTimeLimit;
 const profileStatsData=profileData?.[activeProfileId]||emptyProfileData();
 const profileStatsDone=Array.isArray(profileStatsData.done)?profileStatsData.done:[];
 const profileStatsGallery=Array.isArray(profileStatsData.gallery)?profileStatsData.gallery:[];
 const profileStatsRewards=Array.isArray(profileStatsData.rewards)?profileStatsData.rewards:[];
 const profileStatsStars=Number(profileStatsData.stars ?? 0);
 const paintColors=hasChest50?[...colors,...chest50Colors.map(x=>x.value)]:colors;
 const playChestCeremony=()=>{
  if(!soundEnabled||typeof window==="undefined")return;
  try{
   const AudioCtx=window.AudioContext||window.webkitAudioContext;
   if(!AudioCtx)return;
   const ctx=new AudioCtx();
   ctx.resume?.();

   // Wooden creak: sliding resonant oscillators + a short filtered scrape.
   const master=ctx.createGain();
   master.gain.setValueAtTime(.0001,ctx.currentTime);
   master.gain.exponentialRampToValueAtTime(.17,ctx.currentTime+.02);
   master.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+1.02);
   master.connect(ctx.destination);

   [238,178].forEach((freq,index)=>{
    const osc=ctx.createOscillator();
    const gain=ctx.createGain();
    osc.type=index===0?"sawtooth":"triangle";
    osc.frequency.setValueAtTime(freq,ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq*.52,ctx.currentTime+.92);
    gain.gain.setValueAtTime(index===0?.24:.16,ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+.98);
    osc.connect(gain);gain.connect(master);
    osc.start();osc.stop(ctx.currentTime+1.02);
   });

   // BOOM at 0.9 s.
   const boom=ctx.createOscillator();
   const boomGain=ctx.createGain();
   boom.type="sine";
   boom.frequency.setValueAtTime(92,ctx.currentTime+.88);
   boom.frequency.exponentialRampToValueAtTime(48,ctx.currentTime+1.24);
   boomGain.gain.setValueAtTime(.0001,ctx.currentTime+.87);
   boomGain.gain.exponentialRampToValueAtTime(.45,ctx.currentTime+.90);
   boomGain.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+1.30);
   boom.connect(boomGain);boomGain.connect(ctx.destination);
   boom.start(ctx.currentTime+.87);boom.stop(ctx.currentTime+1.31);

   // Short fanfare after the burst.
   const fanfare=[523.25,659.25,783.99,1046.5,1318.5];
   fanfare.forEach((freq,i)=>{
    const start=ctx.currentTime+1.10+i*.085;
    const osc=ctx.createOscillator();
    const gain=ctx.createGain();
    osc.type="triangle";
    osc.frequency.value=freq;
    gain.gain.setValueAtTime(.0001,start);
    gain.gain.exponentialRampToValueAtTime(.15,start+.018);
    gain.gain.exponentialRampToValueAtTime(.0001,start+.22);
    osc.connect(gain);gain.connect(ctx.destination);
    osc.start(start);osc.stop(start+.23);
   });
   setTimeout(()=>ctx.close?.(),2200);
  }catch{}
 };

 const startRewardSequence=type=>{
  setRewardPopup(type);
  setRewardStage("opening");
  playSound("premium-chest-open");
  setTimeout(()=>{
   setRewardStage("boom");
   playSound("premium-reward-fanfare");
  },920);
  setTimeout(()=>setRewardStage("reveal"),1320);
 };

 const openChest50=()=>{
  if(stars<50||hasChest50)return;
  setUnlockedRewards([...unlockedRewards,"chest50"]);
  startRewardSequence("chest50");
 };
 const openChest100=()=>{
  if(stars<100||hasChest100)return;
  setUnlockedRewards([...unlockedRewards,"chest100"]);
  startRewardSequence("chest100");
 };
 const openChest200=()=>{
  if(stars<200||hasChest200)return;
  setUnlockedRewards([...unlockedRewards,"chest200"]);
  startRewardSequence("chest200");
 };
 const open=it=>{setCurrent(it);setFills({});setHistory([]);setTool("fill");setFillFeedback(null);setScreen("paint")};
 const showFillFeedback=kind=>{clearTimeout(feedbackTimer.current);setFillFeedback(kind);feedbackTimer.current=setTimeout(()=>setFillFeedback(null),1100)};
 const paint=k=>{const old=fills[k]||"#fff",next=tool==="eraser"?"#fff":selected;if(old===next)return;setHistory([...history,{k,old}]);setFills({...fills,[k]:next})};
 const undo=()=>{if(current.mode==="draw"){rasterRef.current?.undo();return}const x=history.at(-1);if(!x)return;setFills({...fills,[x.k]:x.old});setHistory(history.slice(0,-1))};
 const yesterdayKey=(()=>{
  const d=new Date();
  d.setDate(d.getDate()-1);
  return d.toLocaleDateString("sv-SE");
 })();
 const nextDailyStreak=()=>{
  if(lastDailyDate===todayKey)return dailyStreak;
  if(lastDailyDate===yesterdayKey)return dailyStreak+1;
  return 1;
 };

 const finish=()=>{
  const isNew=!done.includes(current.id);
  const baseEarned=isNew?5:0;
  const isTodayChallenge=current.id===dailyItem.id;
  const dailyBonus=isTodayChallenge&&!dailyClaimed?10:0;
  const earned=baseEarned+dailyBonus;
  const starsAfter=stars+earned;
  const doneCount=done.length+(isNew?1:0);
  const thresholds=[50,100,200];
  const newChest=earned>0?thresholds.find(t=>stars<t&&starsAfter>=t)||null:null;
  const nextChest=thresholds.find(t=>t>starsAfter)||null;
  if(isNew)setDone([...done,current.id]);
  if(dailyBonus>0){
   setDailyClaims([...dailyClaims,todayKey]);
   setDailyStreak(nextDailyStreak());
   setLastDailyDate(todayKey);
  }
  if(earned>0)setStars(starsAfter);
  setGallery([{...current,date:new Date().toLocaleDateString("de-DE")},...gallery.filter(x=>x.id!==current.id)]);
  if(newChest)playSound("reward");
  else if(dailyBonus>0)playSound("streak");
  else if(earned>0)playSound("success");
  else playSound("click");
  setCelebration({
   earned,
   dailyBonus,
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
  <header key={`header-${activeProfileId}-${headerStarCount}`}><button>🇩🇪 Deutsch⌄</button><Logo/><div><span key={`stars-${activeProfileId}-${headerStarCount}`}>⭐ {headerStarCount}</span><button key={`profile-${activeProfileId}`} onClick={openParentArea}><span className="headerProfileAvatar">{avatarEmoji(profileData?.[activeProfileId]?.avatar)}</span><span className="headerProfileName">{activeProfile.name}</span></button></div></header>

  {screen==="start"&&<section className="home premiumHome">
   <div className="premiumHero">
    <div className="premiumHeroCopy">
     <span className="premiumEyebrow">Willkommen bei Malino</span>
     <h1>Was möchtest du heute malen?</h1>
     <p>Entdecke deine Tages-Challenge, sammle Sterne und halte deine Mal-Serie am Leben.</p>
     <div className="premiumHeroActions">
      <button className="primary" onClick={()=>open(dailyItem)}>🌟 Tages-Challenge</button>
      <button className="secondaryHeroBtn" onClick={()=>setScreen("library")}>📚 Bibliothek</button>
     </div>
    </div>
    <div className="premiumHeroMascot" aria-hidden="true">
     <img className="malinoHeroMascotImg" src="/malino-hero-mascot.png" alt="" />
     <span className="heroSpark heroSpark1">✨</span>
     <span className="heroSpark heroSpark2">⭐</span>
     <span className="heroSpark heroSpark3">🎨</span>
    </div>
   </div>

   <div className="homeQuickStats premiumQuickStats">
    <button className="statCard statStars" onClick={()=>setScreen("reward")}><span>⭐</span><b>{stars}</b><small>Sterne</small><i>Mehr sammeln ›</i></button>
    <button className="statCard statBadges" onClick={()=>setScreen("reward")}><span>🏅</span><b>{unlockedBadgeCount}/{achievementBadges.length}</b><small>Abzeichen</small><i>Ziele ansehen ›</i></button>
    <button className="statCard statGallery" onClick={()=>setScreen("gallery")}><span>🎨</span><b>{gallery.length}</b><small>Galerie</small><i>Kunstwerke ›</i></button>
    <button className="statCard statStreak" onClick={()=>open(dailyItem)}><span>🔥</span><b>{dailyStreak}</b><small>Tage Serie</small><i>{dailyClaimed?"Heute sicher ✓":"Heute sichern ›"}</i></button>
   </div>

   <div className="homeSectionHeader adventureHeader">
    <div><span className="eyebrow">Heute</span><h2>Dein Tages-Abenteuer</h2><p>Ein neues Bild, Bonus-Sterne und deine tägliche Mal-Serie.</p></div>
    <button onClick={()=>open(dailyItem)}>Challenge öffnen ›</button>
   </div>

   <div className="todayAdventureGrid">
    <div className={`daily dailyV2 dailyChallengeCard premiumDailyCard ${dailyClaimed?"dailyDone":""}`}>
     <div className="dailyMagicBadge">✨ Malino Tagesziel</div>
     <div className="dailyChallengeHead"><b>🌟 Tages-Challenge</b><span>{dailyClaimed?"Geschafft ✓":"+10 ⭐ Bonus"}</span></div>
     <Thumb it={dailyItem} done={done.includes(dailyItem.id)}/>
     <div className="dailyChallengeInfo">
      <div className="dailyTitleRow"><b>{dailyItem.name}</b>{!dailyClaimed&&<span>Heute</span>}</div>
      <small>{dailyClaimed?"Heute schon geschafft. Morgen wartet ein neues Bild!":"Male das heutige Bild fertig und sichere dir 10 Bonus-Sterne."}</small>
      <div className="dailyRewardStrip"><span>⭐ +10 Bonus</span><span>{dailyClaimed?"🔥 Serie gesichert":"🔥 Serie sichern"}</span></div>
     </div>
     <button className="dailyPrimaryButton" onClick={()=>open(dailyItem)}>{dailyClaimed?"Noch einmal malen":"Challenge starten!"}</button>
    </div>

    <button className="streakCard streakCardButton premiumStreakCard" onClick={()=>open(dailyItem)} aria-label="Tages-Challenge öffnen">
     <div className="streakMiniLabel">🔥 MAL-SERIE</div>
     <div className="streakIcon">🔥</div>
     <div className="streakText">
      <b>{dailyStreak} Tage Serie</b>
      <small>{dailyStreak===0?"Starte heute deine erste Serie!":dailyClaimed?"Heute gesichert ✓ – Challenge erneut öffnen":"Schließe die Tages-Challenge ab, um die Serie zu halten."}</small>
      <div className="streakDots" aria-hidden="true">
       {[1,2,3,4,5,6,7].map(n=><i key={n} className={n<=Math.min(dailyStreak,7)?"on":""}>{n<=Math.min(dailyStreak,7)?"🔥":"•"}</i>)}
      </div>
     </div>
     <div className="streakMilestone">{dailyStreak>=7?"🏆 7+":dailyStreak>=3?"⭐ 3+":"🌱"}</div>
    </button>
   </div>

   <div className="homeSectionHeader">
    <div><span className="eyebrow">Weitermalen</span><h2>{recentItem?"Zuletzt gemalt":"Unser Tipp für dich"}</h2></div>
    <button onClick={()=>setScreen("library")}>Alle Bilder ›</button>
   </div>

   <div className={`continueCard premiumContinueCard ${recentItem?"hasRecent":""}`}>
    <button className="continueThumb continueThumbButton" onClick={()=>open(continueItem)} aria-label={`${continueItem.name} öffnen`}>
     <Thumb it={continueItem} done={done.includes(continueItem.id)}/>
     <span className="continueImageBadge">{done.includes(continueItem.id)?"✓ Fertig":"🖌️ Weitermalen"}</span>
    </button>
    <div className="continueCopy premiumContinueCopy">
     <div className="continueTopline">
      <span>{recentItem?"Zuletzt geöffnet":"Malino empfiehlt"}</span>
      {recentItem&&gallery?.[0]?.date&&<small>🕒 {gallery[0].date}</small>}
     </div>
     <h3>{continueItem.name}</h3>
     <p>{recentItem?"Dein letztes Kunstwerk wartet auf dich. Du kannst es jederzeit noch einmal öffnen und weiter gestalten.":"Starte mit einem Bild, das heute gut zu deinem Malino-Abenteuer passt."}</p>
     <div className="continueMeta">
      <span>🎨 {continueItem.cat}</span>
      <span>{done.includes(continueItem.id)?"⭐ Bereits geschafft":"✨ Neues Abenteuer"}</span>
     </div>
     <div className="continueActions">
      <button className="continuePrimary" onClick={()=>open(continueItem)}>🖌️ {recentItem?"Weiter malen":"Jetzt malen"}</button>
      <button className="continueBrowse" onClick={()=>setScreen("library")}>Mehr Bilder ›</button>
     </div>
    </div>
   </div>

   <div className="homeSectionHeader">
    <div><span className="eyebrow">Entdecken</span><h2>Schnellzugriff</h2></div>
   </div>

   <div className="homeFeatureGrid">
    <button className="featureCard featureLibrary" onClick={()=>setScreen("library")}>
     <span>📚</span><div><b>Bibliothek</b><small>Alle Malbilder entdecken</small></div><em>›</em>
    </button>
    <button className="featureCard featureRewards" onClick={()=>setScreen("reward")}>
     <span>🎁</span><div><b>Belohnungen</b><small>Sterne, Abzeichen & Schätze</small></div><em>›</em>
    </button>
    <button className="featureCard featureGallery" onClick={()=>setScreen("gallery")}>
     <span>🎨</span><div><b>Galerie</b><small>Deine fertigen Kunstwerke</small></div><em>›</em>
    </button>
    <button className="featureCard featurePuzzles" onClick={()=>{setPuzzleFeedback(null);setPuzzleWrong(null);setScreen("puzzles")}}>
     <span>🧩</span><div><b>Rätsel & Rebusse</b><small>Denken, entdecken & Sterne sammeln</small></div><em>›</em>
    </button>
    <button className="featureCard featureCrafts" onClick={()=>setScreen("crafts")}>
     <span>✂️</span><div><b>Basteln & Spielen</b><small>Puzzle gestalten, speichern & drucken</small></div><em>›</em>
    </button>
    <button className="featureCard featureProfile" onClick={openParentArea}>
     <span>{avatarEmoji(profileData?.[activeProfileId]?.avatar)}</span><div><b>{activeProfile.name}</b><small>Kinderprofil & Fortschritt</small></div><em>›</em>
    </button>
   </div>
  </section>}

  {screen==="crafts"&&<section className="craftPage">
   <div className="craftHero">
    <div className="craftMascot"><img src="/malino-raetsel-mascot.png" alt="Malino"/></div>
    <div>
     <span className="eyebrow">Neu in Malino</span>
     <h1>Basteln & Spielen ✂️</h1>
     <p>Gestalte dein eigenes Puzzle, speichere es und drucke es auf A4 aus.</p>
    </div>
    <div className="craftScore"><span>🧩</span><b>{savedCraftPuzzles.length}</b><small>gespeichert</small></div>
   </div>

   <div className="craftFlow">
    <div className="craftStep craftStep1">
     <div className="craftStepHead"><span>1</span><div><b>Bild wählen</b><small>Wähle eine Vorlage</small></div></div>
     <div className="craftTemplateGrid">
      {craftTemplates.map(t=><button key={t.id} className={activeCraftTemplate.id===t.id?"active":""} onClick={()=>setCraftImageId(t.id)}>
       <img src={t.src} alt={t.title}/><b>{t.title}</b>
      </button>)}
     </div>
    </div>

    <div className="craftStep craftStep2">
     <div className="craftStepHead"><span>2</span><div><b>Gestalten</b><small>Farbe & Teile wählen</small></div></div>
     <div className="craftStyleToggle">
      <button className={craftStyle==="bw"?"active":""} onClick={()=>setCraftStyle("bw")}>⚫ Schwarz-Weiß</button>
      <button className={craftStyle==="color"?"active":""} onClick={()=>setCraftStyle("color")}>🌈 Bunt</button>
     </div>
     <div className="craftPieceTitle">Teile wählen</div>
     <div className="craftPieceButtons">
      {[4,6,9,12].map(n=><button key={n} className={craftPieces===n?"active":""} onClick={()=>setCraftPieces(n)}><b>{n}</b><small>Teile</small></button>)}
     </div>
     <p>Je mehr Teile, desto schwieriger.</p>
    </div>

    <div className="craftStep craftStep3">
     <div className="craftStepHead"><span>3</span><div><b>Vorschau & Drucken</b><small>So sieht dein Puzzle aus</small></div></div>
     <div className={`craftPreview ${craftStyle==="bw"?"bw":""}`}>
      <img src={activeCraftTemplate.src} alt={activeCraftTemplate.title}/>
      {Array.from({length:craftGrid[0]-1},(_,i)=><i key={`v${i}`} className="cutV" style={{left:`${(i+1)*100/craftGrid[0]}%`}}/>)}
      {Array.from({length:craftGrid[1]-1},(_,i)=><i key={`h${i}`} className="cutH" style={{top:`${(i+1)*100/craftGrid[1]}%`}}/>)}
      <span className="cutScissors cutScissorsA">✂️</span><span className="cutScissors cutScissorsB">✂️</span>
     </div>
     <div className="craftActions">
      <button className="craftSaveBtn" onClick={saveCraftPuzzle}>💾 Speichern</button>
      <button className="craftPrintBtn" onClick={printCraftPuzzle}>🖨️ Drucken</button>
     </div>
     <small className="craftA4">Format: A4 · zum Ausschneiden</small>
    </div>
   </div>

   <div className="craftSavedHead">
    <div><span className="eyebrow">Meine Sammlung</span><h2>Gespeicherte Puzzle</h2></div>
    <span>{savedCraftPuzzles.length}</span>
   </div>

   {savedCraftPuzzles.length===0
    ?<div className="craftEmpty"><span>🧩</span><div><b>Noch kein Puzzle gespeichert</b><small>Gestalte oben dein erstes Puzzle.</small></div></div>
    :<div className="craftSavedGrid">
      {savedCraftPuzzles.map(item=>{
       const tpl=craftTemplates.find(t=>t.id===item.imageId)||craftTemplates[0];
       return <article key={item.id}>
        <div className={`craftSavedThumb ${item.style==="bw"?"bw":""}`}><img src={tpl.src} alt={item.title}/><span>{item.pieces}</span></div>
        <div><b>{item.title}</b><small>{item.pieces} Teile · {item.style==="bw"?"Schwarz-Weiß":"Bunt"}</small></div>
        <button onClick={()=>setSavedCraftPuzzles(savedCraftPuzzles.filter(x=>x.id!==item.id))}>×</button>
       </article>
      })}
     </div>}

   <div className="craftInfoGrid">
    <div><span>✋</span><b>Feinmotorik</b><small>Schneiden und puzzeln trainiert die Hände.</small></div>
    <div><span>🧠</span><b>Logisches Denken</b><small>Teile erkennen und richtig zusammensetzen.</small></div>
    <div><span>👨‍👩‍👧</span><b>Gemeinsame Zeit</b><small>Perfekt für Eltern und Kinder zusammen.</small></div>
   </div>
  </section>}

  {screen==="puzzles"&&<section className="puzzlePage puzzleWorldPage">
   {!activePuzzleWorld&&!activePuzzle&&<>
    <div className="worldMapHero">
     <div className="worldMapTitle">
      <span>⭐ Entdecke 5 zauberhafte Welten! ⭐</span>
      <h1>Rätsel & Rebusse</h1>
     </div>
     <div className="worldMapScore"><span>⭐</span><b>{stars}</b></div>

     <div className="worldMapScene">
      <div className="worldCloud cloudOne">☁️</div><div className="worldCloud cloudTwo">☁️</div>
      <div className="worldPath pathOne"/><div className="worldPath pathTwo"/><div className="worldPath pathThree"/>

      {puzzleWorlds.map(world=>{
       const solved=worldSolvedCount(world);
       const unlocked=worldUnlocked(world);
       return <button key={world.id}
        className={`worldNode worldNode${world.number} ${unlocked?"unlocked":"locked"} ${solved===world.ids.length?"complete":""}`}
        onClick={()=>{
         if(!unlocked){playSound("click");return}
         setActivePuzzleWorld(world.id);setActivePuzzleId(null);setPuzzleFeedback(null);setPuzzleWrong(null);playSound("click");
        }}>
        <span className="worldLandscape">{world.icon}</span>
        <span className="worldBadge">{world.number}</span>
        <b>{world.title}</b>
        <small>{world.emoji} {solved}/{world.ids.length}</small>
        <em>{!unlocked?`🔒 ${world.unlock} Rätsel nötig`:solved===world.ids.length?"✓ Geschafft":"Öffnen ›"}</em>
       </button>
      })}

      <div className="worldMalino">
       <div className="worldSpeech">Wähle eine Welt und los geht’s! ❤️</div>
       <img src="/malino-raetsel-mascot.png" alt="Malino"/>
      </div>

      <div className="worldOverallProgress">
       <b>Dein Fortschritt</b>
       <strong>⭐ {solvedPuzzleCount}/{puzzleCards.length}</strong>
       <div><i style={{width:`${Math.round((solvedPuzzleCount/puzzleCards.length)*100)}%`}}/></div>
       <small>{solvedPuzzleCount===20?"Fantastisch! Alle Rätsel geschafft!":"Weiter so! Du bist auf einem tollen Weg!"}</small>
      </div>
     </div>
    </div>
   </>}

   {activePuzzleWorld&&!activePuzzle&&currentPuzzleWorld&&<>
    <div className={`worldDetailHero worldTheme${currentPuzzleWorld.number}`}>
     <button className="worldBackBtn" onClick={()=>setActivePuzzleWorld(null)}>← Weltkarte</button>
     <div className="worldDetailIcon">{currentPuzzleWorld.icon}</div>
     <div>
      <span className="eyebrow">Welt {currentPuzzleWorld.number} von 5</span>
      <h1>{currentPuzzleWorld.title}</h1>
      <p>Löse alle 4 Aufgaben und sammle Sterne.</p>
     </div>
     <div className="worldDetailProgress"><b>{worldSolvedCount(currentPuzzleWorld)}/4</b><small>gelöst</small></div>
    </div>

    <div className="worldLevelGrid">
     {currentWorldPuzzles.map((p,index)=>{
      const solved=puzzleSolved.includes(p.id);
      const globalIndex=puzzleCards.findIndex(x=>x.id===p.id);
      return <button key={p.id} className={`worldLevelCard ${solved?"solved":""}`} onClick={()=>{
       setPuzzleFeedback(null);setPuzzleWrong(null);setActivePuzzleId(p.id);playSound("click");
      }}>
       <span className="worldLevelNo">{index+1}</span>
       <span className="worldLevelEmoji">{p.icon}</span>
       <b>{p.title}</b>
       <small>Aufgabe {globalIndex+1}</small>
       <em>{solved?"✓ Gelöst":"+3 ⭐"}</em>
      </button>
     })}
    </div>

    <div className="worldTipCard">
     <span>🦁</span><div><b>Malinos Tipp</b><small>Du kannst jedes gelöste Rätsel jederzeit wiederholen. Sterne gibt es beim ersten richtigen Lösen.</small></div>
    </div>
   </>}

   {activePuzzle&&(()=>{
    const p=activePuzzle;
    const solved=puzzleSolved.includes(p.id);
    const feedback=puzzleFeedback?.id===p.id;
    const wrong=puzzleWrong===p.id;
    const list=currentWorldPuzzles.length?currentWorldPuzzles:puzzleCards;
    const idx=list.findIndex(x=>x.id===p.id);
    const prev=idx>0?list[idx-1]:null;
    const next=idx<list.length-1?list[idx+1]:null;
    return <div className="puzzleFocusWrap">
     <div className="puzzleFocusTop">
      <button onClick={()=>{setActivePuzzleId(null);setPuzzleFeedback(null);setPuzzleWrong(null)}}>← {currentPuzzleWorld?.title||"Alle Rätsel"}</button>
      <span>Aufgabe {idx+1} / {list.length}</span>
      <em>{solved?"✓ Gelöst":`${p.age} Jahre`}</em>
     </div>

     <article className={`puzzleFocusCard ${solved?"solved":""} ${wrong?"wrong":""}`}>
      <div className="puzzleFocusTitle">
       <div className="puzzleIcon big">{p.icon}</div>
       <div><span className="eyebrow">{currentPuzzleWorld?.title||"Rätsel"}</span><h2>{p.title}</h2></div>
      </div>
      <div className="puzzleTask puzzleTaskLarge">
       <p>{p.task}</p>{p.pattern&&<strong>{p.pattern}</strong>}
      </div>
      <div className="puzzleOptions puzzleOptionsLarge">
       {p.options.map(option=><button key={option} className={feedback&&option===p.answer?"correct":""} onClick={()=>answerPuzzle(p,option)}>{option}</button>)}
      </div>
      <div className="puzzleFooter puzzleFooterLarge">
       {feedback
        ?<div className="puzzleSuccess"><span>🎉</span><p><b>Richtig!</b><small>{puzzleFeedback.firstTime?"+3 Sterne für dich!":"Dieses Rätsel kennst du schon."}</small></p></div>
        :wrong
         ?<div className="puzzleTry"><span>💡</span><p><b>Fast!</b><small>{p.hint}</small></p></div>
         :<div className="puzzleHint"><span>{solved?"✓":"⭐"}</span><p><b>{solved?"Schon gelöst":"Belohnung"}</b><small>{solved?"Du kannst es jederzeit wiederholen.":"3 Sterne beim ersten richtigen Lösen"}</small></p></div>}
      </div>
     </article>

     <div className="puzzleFocusNav">
      <button disabled={!prev} onClick={()=>prev&&setActivePuzzleId(prev.id)}>‹ Vorheriges</button>
      <button className="puzzleAllBtn" onClick={()=>{setActivePuzzleId(null);setPuzzleFeedback(null);setPuzzleWrong(null)}}>▦ Welt</button>
      <button disabled={!next} onClick={()=>next&&setActivePuzzleId(next.id)}>Nächstes ›</button>
     </div>
    </div>
   })()}
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
    {hasChest100&&<button className={tool==="magic"?"on":""} onClick={()=>setTool("magic")} title="Zauberpinsel"><ToolIcon type="magic"/><span>Zauber</span></button>}
    <button className={tool==="fill"?"on":""} onClick={()=>setTool("fill")}><ToolIcon type="fill"/><span>Füllen</span></button>
    <button className={tool==="eraser"?"on":""} onClick={()=>setTool("eraser")}><ToolIcon type="eraser"/><span>Radierer</span></button>
    <button className="historyTool" onClick={undo}><ToolIcon type="undo"/><span>Rückgängig</span></button>
    <button className="newTool" onClick={()=>{if(current.mode==="draw")rasterRef.current?.clear();else{setFills({});setHistory([])}}}><ToolIcon type="new"/><span>Neu</span></button>
   </aside><div className="canvas">{current.mode==="draw"?<RasterPainter ref={rasterRef} src={current.image} color={selected} tool={tool} onFeedback={showFillFeedback}/>:<Dino fills={fills} paint={paint}/>}</div></div>
   <div className={`toolHelp ${fillFeedback?"feedback "+fillFeedback:""}`}>{fillFeedback==="small"?"👆 Diese Fläche ist sehr klein – probiere eine größere.":fillFeedback==="leak"?"🛡️ Malino hat ein Auslaufen gestoppt – tippe in eine geschlossene Fläche.":tool==="fill"?"🪣 Tippe in eine Fläche – Malino füllt sie für dich aus.":tool==="brush"?"🖌️ Male frei mit dem Finger.":"🧽 Wische über Farbe, um sie zu entfernen."}</div>
   <div className={`palette ${hasChest50?"hasBonusColors":""}`}>{paintColors.map(c=>{const bonus=chest50Colors.some(x=>x.value===c);return <button key={c} title={bonus?(chest50Colors.find(x=>x.value===c)?.name||"Bonusfarbe"):""} style={{background:c}} className={`${selected===c&&tool!=="eraser"?"sel":""} ${bonus?"bonusColor":""}`} onClick={()=>{playSound("color");setSelected(c);if(tool==="eraser")setTool("fill")}}>{bonus&&<span className="bonusSpark">✦</span>}</button>})}</div>
   <div className="actions"><button onClick={()=>setScreen("library")}>Vorlagen</button><button className="finish" onClick={finish}>✓ Fertig!</button><button className="saveImageBtn" onClick={()=>rasterRef.current?.save()}><SaveIcon/><span>Bild speichern</span></button></div>
  </section>}

  {screen==="celebrate"&&<section className="reward celebrationScreen celebrationV3">
   <Logo/>
   <div className="rewardgrid">
    <div className="celebrateMascot"><img src="/ui/malino-mascot.webp" alt="Malino"/></div>
    <div><h1>Super gemacht!</h1><p>{celebration.repeat?"Du hast dieses Bild noch einmal wunderschön gemalt! 💗":"Du hast ein neues Kunstwerk fertiggestellt! 💗"}</p><Thumb it={current} done/></div>
   </div>

   <div className="realRewards">
    <div className={`realRewardCard starsEarned ${celebration.earned===0?"muted":""}`}><span>⭐</span><div><b>{celebration.earned>0?`+${celebration.earned} Sterne`:"Keine neuen Sterne"}</b><small>{celebration.dailyBonus>0?"Tages-Challenge geschafft – 10 Bonus-Sterne!":celebration.repeat?"Dieses Bild war schon fertig.":"5 Sterne für ein neues fertiges Bild."}</small></div></div>
    {celebration.dailyBonus>0&&<div className="realRewardCard dailyBonusReward"><span>🌟</span><div><b>Tages-Challenge geschafft!</b><small>Der Bonus kann heute einmal gesammelt werden.</small></div></div>}
    {celebration.dailyBonus>0&&<div className="realRewardCard streakReward"><span>🔥</span><div><b>Serie verlängert!</b><small>Deine Tages-Serie wurde gespeichert.</small></div></div>}
    <div className="realRewardCard"><span>🎨</span><div><b>{celebration.doneCount} {celebration.doneCount===1?"Bild":"Bilder"} geschafft</b><small>Deine Sammlung wächst weiter.</small></div></div>
    {celebration.newChest?
     <div className="realRewardCard chestUnlocked"><span>🎁</span><div><b>Neue Schatzkiste!</b><small>{celebration.newChest} Sterne erreicht.</small></div></div>:
     celebration.nextChest?
      <div className="realRewardCard"><span>✨</span><div><b>Noch {celebration.starsToNext} Sterne</b><small>bis zur nächsten Schatzkiste bei {celebration.nextChest} ⭐</small></div></div>:
      <div className="realRewardCard chestUnlocked"><span>👑</span><div><b>Alle Schatzkisten freigeschaltet!</b><small>Was für eine Malino-Sammlung!</small></div></div>
    }
   </div>

   <div className="celebrationActions">
    <button onClick={()=>setScreen("gallery")}>🎨 Zur Galerie</button>
    {celebration.newChest&&<button className="openChestCta" onClick={()=>setScreen("reward")}>🎁 Schatzkiste ansehen</button>}
    <button className="finish" onClick={()=>open(items[(items.findIndex(x=>x.id===current.id)+1)%items.length])}>🖌️ Nächstes Bild</button>
   </div>
  </section>}

  {screen==="reward"&&<section className="rewardsHub">
   <div className="rewardsHero">
    <div className="rewardsMascot"><img src="/ui/malino-mascot.webp" alt="Malino"/></div>
    <div className="rewardsHeroText"><span className="eyebrow">Deine Belohnungen</span><h1>Deine Malino-Schatzkiste 🏆</h1><p>Male weiter, sammle Sterne und erreiche neue Ziele in deiner Abzeichen-Sammlung.</p></div>
    <div className="starWallet"><span>⭐</span><div><b>{stars}</b><small>Sterne</small></div></div>
   </div>

   <div className="levelCard">
    <div className="levelTop"><div><span className="eyebrow">Dein Fortschritt</span><h2>Kreativ-Level {Math.max(1,Math.floor(done.length/5)+1)}</h2></div><b>{done.length} / {Math.max(5,(Math.floor(done.length/5)+1)*5)} Bilder</b></div>
    <div className="levelTrack"><i style={{width:Math.min(100,((done.length%5)/5)*100)+"%"}}/></div>
    <div className="levelFoot"><span>🎨 {done.length} fertig</span><span>Noch {done.length%5===0&&done.length>0?5:5-(done.length%5)} Bilder bis zum nächsten Level ✨</span></div>
   </div>

   <div className="rewardsSectionHead"><div><span className="eyebrow">Sammlung</span><h2>Deine Abzeichen</h2><p className="badgeSectionIntro">Entdecke neue Ziele beim Malen, Sammeln und bei den Tages-Challenges.</p></div><span>{unlockedBadgeCount}/{achievementBadges.length}</span></div>
   <div className="achievementProgress">
    <div><b>{unlockedBadgeCount} von {achievementBadges.length} geschafft</b><small>{unlockedBadgeCount===achievementBadges.length?"Alle Abzeichen gesammelt! 🏆":"Jedes Abzeichen zeigt dir ein neues Malino-Ziel."}</small></div>
    <div className="achievementTrack"><i style={{width:`${Math.round((unlockedBadgeCount/achievementBadges.length)*100)}%`}}/></div>
   </div>
   <div className="badgeGrid badgeGridExpanded">
    {achievementBadges.map(b=><article key={b.id} className={`badgeCard achievementBadge ${b.ok?"unlocked":"locked"}`}>
     <span className="badgeIcon">{b.ok?b.icon:"🔒"}</span>
     <div className="badgeCopy"><b>{b.title}</b><small>{b.ok?"Geschafft!":b.desc}</small></div>
     {b.ok&&<i>✓</i>}
    </article>)}
   </div>

   <div className="rewardsSectionHead treasureCollectionHead">
    <div><span className="eyebrow">Schatzsammlung</span><h2>Malinos Fundstücke ✨</h2><p className="badgeSectionIntro">Sammle Sticker und Rahmen. Freigeschaltete Rahmen kannst du direkt für deine Galerie auswählen.</p></div>
    <div className="treasureHeadActions"><span>{unlockedTreasureCount}/{treasureItems.length}</span><button onClick={()=>setScreen("room")}>🦁 Mein Malino-Zimmer</button></div>
   </div>
   <div className="treasureCollectionGrid">
    <article className={`treasureCollectible unlocked ${activeFrame==="classic"?"equipped":""}`}>
     <div className="treasurePreview framePreview frame-classic"><span>🖼️</span></div>
     <div className="treasureCopy"><b>Klassischer Rahmen</b><small>Immer verfügbar</small></div>
     <button onClick={()=>setActiveFrame("classic")}>{activeFrame==="classic"?"✓ Aktiv":"Verwenden"}</button>
    </article>
    {treasureItems.map(t=><article key={t.id} className={`treasureCollectible ${t.ok?"unlocked":"locked"} ${t.type==="frame"&&activeFrame===t.id?"equipped":""}`}>
     <div className={`treasurePreview ${t.type==="frame"?`framePreview frame-${t.id}`:""}`}><span>{t.ok?t.icon:"🔒"}</span></div>
     <div className="treasureCopy"><b>{t.title}</b><small>{t.ok?(t.type==="frame"?"Galerie-Rahmen freigeschaltet":"Sticker gesammelt"):t.desc}</small></div>
     {t.ok&&t.type==="frame"&&<button onClick={()=>setActiveFrame(t.id)}>{activeFrame===t.id?"✓ Aktiv":"Verwenden"}</button>}
     {t.ok&&t.type==="sticker"&&<em>Gesammelt ✓</em>}
    </article>)}
   </div>

   <div className="rewardsSectionHead surprisesHead"><div><span className="eyebrow">Überraschungen</span><h2>Malinos Schatzkisten 🎁</h2></div></div>
   <div className="surpriseGrid">
    <article className={`surpriseCard ${stars>=50?"ready":""} ${hasChest50?"opened":""}`}><span>{hasChest50?"🌈":"🎁"}</span><div><b>Kleine Schatzkiste</b><small>{hasChest50?"3 Bonusfarben freigeschaltet":"50 Sterne"}</small></div>{hasChest50?<em>Geöffnet ✓</em>:stars>=50?<button className="openChestBtn" onClick={openChest50}>Öffnen!</button>:<em>Noch {Math.max(0,50-stars)} ⭐</em>}</article>
    <article className={`surpriseCard ${stars>=100?"ready":""} ${hasChest100?"opened":""}`}><span>{hasChest100?"✨":"🎨"}</span><div><b>Zauberpinsel</b><small>{hasChest100?"Regenbogen-Pinsel freigeschaltet":"100 Sterne"}</small></div>{hasChest100?<em>Geöffnet ✓</em>:stars>=100?<button className="openChestBtn" onClick={openChest100}>Öffnen!</button>:<em>Noch {Math.max(0,100-stars)} ⭐</em>}</article>
    <article className={`surpriseCard goldenChest ${stars>=200?"ready":""} ${hasChest200?"opened":""}`}><span>{hasChest200?"🦁":"👑"}</span><div><b>Malino Geheimbild</b><small>{hasChest200?"Geheimes Malbild freigeschaltet":"200 Sterne"}</small></div>{hasChest200?<button className="secretOpenNow" onClick={()=>open(secretMalinoItem)}>Malen! 🖌️</button>:stars>=200?<button className="openChestBtn goldenOpen" onClick={openChest200}>Öffnen!</button>:<em>Noch {Math.max(0,200-stars)} ⭐</em>}</article>
   </div>

   <div className="rewardsCta"><div><span>✨</span><p><b>Weiter so!</b><small>Jedes fertige Bild bringt dir 5 neue Sterne.</small></p></div><button onClick={()=>setScreen("library")}>Weiter malen</button></div>
  </section>}

  {screen==="room"&&<section className="malinoRoomPage">
   <div className="roomHero">
    <button className="roomBack" onClick={()=>setScreen("reward")}>‹ Zurück</button>
    <div className="roomHeroCopy"><span className="eyebrow">Meine Sammlung</span><h1>Malinos Kreativ-Zimmer 🦁✨</h1><p>Hier zeigt Malino alle Schätze, die <b>{activeProfile.name}</b> schon gesammelt hat.</p></div>
    <div className="roomCounter"><b>{unlockedTreasureCount}</b><small>Schätze</small></div>
   </div>

   <div className="malinoRoomScene">
    <div className="roomWallDecor roomRainbow">{unlockedRewards.includes("chest50")?"🌈":"🔒"}</div>
    <div className="roomWallDecor roomSparkles">{unlockedRewards.includes("chest100")?"✨":"🔒"}</div>
    <div className="roomWallDecor roomGolden">{unlockedRewards.includes("chest200")?"👑":"🔒"}</div>
    <div className="roomWindow"><span>☁️</span><span>☀️</span></div>
    <div className="roomShelf">
     <span className={unlockedBadgeCount>=3?"won":""}>{unlockedBadgeCount>=3?"⭐":"?"}</span>
     <span className={dailyStreak>=3?"won":""}>{dailyStreak>=3?"🔥":"?"}</span>
     <span className={done.length>=10?"won":""}>{done.length>=10?"🎨":"?"}</span>
    </div>
    <div className="roomMascotStage">
     <div className="roomGlow"/>
     <img src="/malino-hero-mascot.png" alt="Malino"/>
     <div className="roomSpeech">{unlockedTreasureCount===0?"Male weiter – bald füllt sich unser Zimmer!":unlockedTreasureCount>=treasureItems.length?"Wow! Unsere Sammlung ist riesig!":"Schau mal, was wir schon gesammelt haben!"}</div>
    </div>
    <div className="roomRug">⭐ MALINO ⭐</div>
   </div>

   <div className="roomCollectionHead"><div><span className="eyebrow">Deine Fundstücke</span><h2>Sammlung</h2></div><span>{unlockedTreasureCount}/{treasureItems.length}</span></div>
   <div className="roomCollectionGrid">
    {treasureItems.map(t=><article key={t.id} className={`roomTreasure ${t.ok?"unlocked":"locked"}`}>
     <span>{t.ok?t.icon:"🔒"}</span>
     <div><b>{t.title}</b><small>{t.ok?"Im Zimmer freigeschaltet":t.desc}</small></div>
     {t.ok&&<em>✓</em>}
    </article>)}
   </div>
   <div className="roomFooterCta"><div><span>🎨</span><p><b>Noch mehr Schätze finden?</b><small>Male Bilder, sammle Sterne und halte deine Tages-Serie.</small></p></div><button onClick={()=>setScreen("library")}>Weiter malen</button></div>
  </section>}

  {screen==="gallery"&&<section className="galleryPage premiumGalleryPage">
   <div className="galleryHero premiumGalleryHero">
    <div className="galleryMascot"><img src="/ui/malino-mascot.webp" alt="Malino"/></div>
    <div className="galleryHeroText">
     <span className="eyebrow">Deine Galerie</span>
     <h1>Meine Kunstwerke 🎨</h1>
     <p>Hier wohnen alle fertigen Malbilder deines aktuellen Profils.</p>
     <div className="galleryHeroActions">
      <button className="galleryNew" onClick={()=>setScreen("library")}>＋ Neues Bild</button>
      {gallery.length>0&&<button className="galleryOpenLatest" onClick={()=>open(gallery[0])}>🖌️ Letztes Bild öffnen</button>}
     </div>
    </div>
    <div className="galleryCount premiumGalleryCount"><span>🎨</span><div><b>{gallery.length}</b><small>{gallery.length===1?"Kunstwerk":"Kunstwerke"}</small></div></div>
   </div>

   {gallery.length?
    <>
     <div className="gallerySectionHead premiumGallerySectionHead">
      <div><span className="eyebrow">Meine Sammlung</span><h2>Deine fertigen Bilder</h2><p>Tippe auf ein Bild, um es erneut zu öffnen.</p></div>
      <span>{gallery.length}</span>
     </div>
     <div className="galleryGrid premiumGalleryGrid">{gallery.map((x,index)=><article key={x.id} className={`galleryCard premiumGalleryCard galleryFrame-${activeFrame} ${index===0?"latest":""}`}>
      <button className="galleryOpen premiumGalleryOpen" onClick={()=>open(x)}>
       <Thumb it={x} done/>
       {index===0&&<span className="latestBadge">✨ Zuletzt gemalt</span>}
      </button>
      <div className="galleryCardText premiumGalleryCardText">
       <div><b>{x.name}</b><small>🗓️ {x.date}</small></div>
       <span>{items.find(it=>it.id===x.id)?.cat||"Malbild"}</span>
      </div>
      <div className="galleryCardActions">
       <button className="galleryAgain" onClick={()=>open(x)}>🖌️ Noch einmal malen</button>
       <button className="galleryFavorite" onClick={()=>setFav(fav.includes(x.id)?fav.filter(id=>id!==x.id):[...fav,x.id])} aria-label="Favorit">
        {fav.includes(x.id)?"❤️":"🤍"}
       </button>
      </div>
     </article>)}</div>
    </>
    :
    <div className="galleryEmpty premiumGalleryEmpty">
     <div className="galleryEmptyMascot"><img src="/ui/malino-mascot.webp" alt="Malino"/></div>
     <span className="galleryEmptyIcon">🎨</span>
     <h2>Noch keine Kunstwerke</h2>
     <p>Male dein erstes Bild fertig und es erscheint automatisch hier in deiner Galerie.</p>
     <button onClick={()=>setScreen("library")}>✨ Erstes Bild auswählen</button>
    </div>}
  </section>}

  {rewardPopup&&<div className={`rewardUnlockOverlay rewardStage-${rewardStage} ${rewardPopup==="chest200"?"goldenUnlockOverlay":""}`} role="dialog" aria-modal="true" aria-label="Belohnung freigeschaltet">
   <div className={`rewardUnlockCard ${rewardPopup==="chest200"?"goldenUnlockCard":""}`}>
    <button className="rewardClose" onClick={()=>{setRewardPopup(null);setRewardStage("closed")}} aria-label="Schließen">×</button>

    {rewardStage!=="reveal"&&<div className="chestCeremony premiumChestCeremony" aria-hidden="true">
     <div className="chestGlowRing"/>
     <div className="premiumChestWrap">
      <img src="/reward-chest-premium.png" alt="" className="premiumChestImg"/>
      <div className="premiumChestLight"/>
     </div>
     {rewardStage==="opening"&&<span className="chestHint">Die Schatzkiste öffnet sich…</span>}
     {rewardStage==="boom"&&<div className="rewardBoomBurst"><i>★</i><i>✦</i><i>★</i><i>✧</i><i>★</i><strong>WOW!</strong></div>}
    </div>}
    <div className={`rewardRevealContent ${rewardStage==="reveal"?"show":""}`}>

    {rewardPopup==="chest50"&&<>
     <div className="unlockBurst">🎁✨</div>
     <span className="eyebrow">50 Sterne</span>
     <h2>Bonusfarben freigeschaltet!</h2>
     <p>Malino hat drei neue Farben für deinen Malkasten gefunden.</p>
     <div className="unlockedColors">
      {chest50Colors.map(col=><div key={col.value}><i style={{background:col.value}}/><b>{col.name}</b></div>)}
     </div>
     <button className="unlockPaintBtn" onClick={()=>{setRewardPopup(null);setScreen("library")}}>🎨 Farben ausprobieren</button>
     <small>Die Farben bleiben für dieses Kinderprofil freigeschaltet.</small>
    </>}

    {rewardPopup==="chest100"&&<>
     <div className="unlockBurst">🪄🌈</div>
     <span className="eyebrow">100 Sterne</span>
     <h2>Zauberpinsel freigeschaltet!</h2>
     <p>Ein besonderer Malino-Schatz ist jetzt Teil deiner Sammlung.</p>
     <div className="magicBrushUnlock">
      <span>🌈</span><span>✨</span><span>🖌️</span>
     </div>
     <button className="unlockPaintBtn" onClick={()=>{setRewardPopup(null);setScreen("library")}}>🖌️ Weiter malen</button>
     <small>Du findest den Zauberpinsel und den neuen Schatz in Malinos Sammlung.</small>
    </>}

    {rewardPopup==="chest200"&&<>
     <div className="unlockBurst">👑✨</div>
     <span className="eyebrow">200 Sterne</span>
     <h2>Malinos Geheimbild!</h2>
     <p>Die goldene Schatzkiste enthält ein geheimes Malbild nur für echte Malino-Meister.</p>
     <div className="secretRewardPreview">
      <Thumb it={secretMalinoItem} done={done.includes(secretMalinoItem.id)}/>
      <span>🦁 Geheimes Malbild</span>
     </div>
     <button className="unlockPaintBtn goldenPaintNow" onClick={()=>{setRewardPopup(null);open(secretMalinoItem)}}>✨ Jetzt entdecken</button>
     <small>Das Geheimbild bleibt dauerhaft für dieses Profil freigeschaltet.</small>
    </>}
    </div>
   </div>
  </div>}

  {profileDialog&&<div className="rewardUnlockOverlay" role="dialog" aria-modal="true" aria-label="Kinderprofil">
   <div className="rewardUnlockCard" style={{maxWidth:520}}>
    <button className="rewardClose" onClick={closeProfileDialog} aria-label="Schließen">×</button>

    {profileDialog==="add"&&<>
     <div className="unlockBurst" style={{fontSize:58}}>👧➕</div>
     <span className="eyebrow">Kinderprofil</span>
     <h2>Neues Profil anlegen</h2>
     <p>Gib dem Profil einen Namen. Sterne, Galerie und Belohnungen starten bei null.</p>
     <input
      autoFocus
      value={profileNameInput}
      onChange={e=>setProfileNameInput(e.target.value)}
      onKeyDown={e=>{if(e.key==="Enter")confirmProfileDialog()}}
      maxLength={24}
      placeholder="z. B. Mia"
      style={{width:"100%",padding:"14px 16px",border:"2px solid #dbe7f5",borderRadius:16,fontSize:18,outline:"none",margin:"4px 0 16px",background:"#fff",color:"#123a7a"}}
     />
     <div className="profileAvatarPicker">
      <b>Avatar auswählen</b>
      <div className="profileAvatarGrid">
       {PROFILE_AVATARS.map(a=><button key={a.id} type="button" className={profileAvatarInput===a.id?"selected":""} onClick={()=>setProfileAvatarInput(a.id)} aria-label={a.label}>
        <span>{a.emoji}</span><small>{a.label}</small>
       </button>)}
      </div>
     </div>
     <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      <button onClick={closeProfileDialog} style={{border:0,borderRadius:16,padding:"13px",fontWeight:900,background:"#edf3fb",color:"#55709a"}}>Abbrechen</button>
      <button onClick={confirmProfileDialog} disabled={!profileNameInput.trim()} style={{border:0,borderRadius:16,padding:"13px",fontWeight:900,background:"#2679ed",color:"#fff",opacity:profileNameInput.trim()?1:.45}}>Profil erstellen</button>
     </div>
    </>}

    {profileDialog==="rename"&&<>
     <div className="unlockBurst" style={{fontSize:58}}>✏️</div>
     <span className="eyebrow">Kinderprofil</span>
     <h2>Profil bearbeiten</h2>
     <p>Ändere den Namen oder wähle einen neuen Avatar. Der Fortschritt bleibt vollständig erhalten.</p>
     <input
      autoFocus
      value={profileNameInput}
      onChange={e=>setProfileNameInput(e.target.value)}
      onKeyDown={e=>{if(e.key==="Enter")confirmProfileDialog()}}
      maxLength={24}
      style={{width:"100%",padding:"14px 16px",border:"2px solid #dbe7f5",borderRadius:16,fontSize:18,outline:"none",margin:"4px 0 16px",background:"#fff",color:"#123a7a"}}
     />
          <div className="profileAvatarPicker">
      <b>Avatar auswählen</b>
      <div className="profileAvatarGrid">
       {PROFILE_AVATARS.map(a=><button key={a.id} type="button" className={profileAvatarInput===a.id?"selected":""} onClick={()=>setProfileAvatarInput(a.id)} aria-label={a.label}>
        <span>{a.emoji}</span><small>{a.label}</small>
       </button>)}
      </div>
     </div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      <button onClick={closeProfileDialog} style={{border:0,borderRadius:16,padding:"13px",fontWeight:900,background:"#edf3fb",color:"#55709a"}}>Abbrechen</button>
      <button onClick={confirmProfileDialog} disabled={!profileNameInput.trim()} style={{border:0,borderRadius:16,padding:"13px",fontWeight:900,background:"#2679ed",color:"#fff",opacity:profileNameInput.trim()?1:.45}}>Speichern</button>
     </div>
    </>}

    {profileDialog==="reset"&&<>
     <div className="unlockBurst" style={{fontSize:58}}>↺</div>
     <span className="eyebrow">Fortschritt</span>
     <h2>Profil zurücksetzen?</h2>
     <p>Bei <b>{activeProfile.name}</b> werden Sterne, fertige Bilder, Galerie und Belohnungen auf null gesetzt. Andere Profile bleiben unverändert.</p>
     <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      <button onClick={closeProfileDialog} style={{border:0,borderRadius:16,padding:"13px",fontWeight:900,background:"#edf3fb",color:"#55709a"}}>Abbrechen</button>
      <button onClick={confirmProfileDialog} style={{border:0,borderRadius:16,padding:"13px",fontWeight:900,background:"#f59e0b",color:"#fff"}}>Zurücksetzen</button>
     </div>
    </>}

    {profileDialog==="delete"&&<>
     <div className="unlockBurst" style={{fontSize:58}}>🗑️</div>
     <span className="eyebrow">Kinderprofil</span>
     <h2>Profil löschen?</h2>
     <p><b>{activeProfile.name}</b> wird mit seinem gesamten Fortschritt gelöscht. Andere Profile bleiben erhalten.</p>
     <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      <button onClick={closeProfileDialog} style={{border:0,borderRadius:16,padding:"13px",fontWeight:900,background:"#edf3fb",color:"#55709a"}}>Abbrechen</button>
      <button onClick={confirmProfileDialog} style={{border:0,borderRadius:16,padding:"13px",fontWeight:900,background:"#ef4444",color:"#fff"}}>Profil löschen</button>
     </div>
    </>}

    {profileDialog==="cantDelete"&&<>
     <div className="unlockBurst" style={{fontSize:58}}>👤</div>
     <span className="eyebrow">Kinderprofil</span>
     <h2>Ein Profil muss bleiben</h2>
     <p>Lege zuerst ein zweites Kinderprofil an. Danach kannst du dieses Profil löschen.</p>
     <button className="unlockPaintBtn" onClick={closeProfileDialog}>OK</button>
    </>}
   </div>
  </div>}

  {screen==="parent"&&<section key={`parent-${activeProfileId}-${profileStatsStars}-${profileStatsDone.length}-${profileStatsGallery.length}-${profileStatsRewards.length}`} className="parents"> 
   {parentPinMode!=="unlocked"?<div className="parentPinGate">
    <div className="parentPinCard">
     <div className="parentPinIcon">🔐</div>
     <span className="eyebrow">Elternbereich</span>
     <h2>{parentPinMode==="setup"?"Eltern-PIN festlegen":parentPinMode==="change"?"Neue Eltern-PIN":"PIN eingeben"}</h2>
     <p>{parentPinMode==="setup"
      ?"Lege einmalig eine 4-stellige PIN fest. Sie schützt die Elternfunktionen auf diesem Gerät."
      :parentPinMode==="change"
      ?"Gib eine neue 4-stellige PIN ein."
      :"Gib deine 4-stellige Eltern-PIN ein."}</p>
     <input
      autoFocus
      className="parentPinInput"
      type="password"
      inputMode="numeric"
      pattern="[0-9]*"
      maxLength={4}
      value={parentPinInput}
      onChange={e=>{setParentPinInput(e.target.value.replace(/\D/g,"").slice(0,4));setParentPinError("")}}
      onKeyDown={e=>{if(e.key==="Enter")submitParentPin()}}
      placeholder="••••"
      aria-label="Eltern-PIN"
     />
     {parentPinError&&<div className="parentPinError">{parentPinError}</div>}
     <button className="parentPinPrimary" onClick={submitParentPin}>
      {parentPinMode==="locked"?"Entsperren":parentPinMode==="change"?"Neue PIN speichern":"PIN speichern"}
     </button>
     <button className="parentPinBack" onClick={()=>setScreen("start")}>Zurück</button>
    </div>
   </div>:<>

   <div className="panel">
    <h1>Elternbereich</h1>
    <div className="parentSecurityCard">
     <div><b>🔐 Elternschutz</b><small>Der Elternbereich ist mit einer 4-stelligen PIN geschützt.</small></div>
     <button onClick={startParentPinChange}>PIN ändern</button>
    </div>
    <div className="parentTestCard">
     <div><b>🧪 Testmodus</b><small>Zum Prüfen der Belohnungen während der Entwicklung.</small></div>
     <button onClick={addTestStars}>+50 ⭐</button>
    </div>
    <h2>👧 Kinderprofile</h2>
    <p style={{color:"#65738c",fontWeight:700}}>Aktiv: <b style={{color:"#123a7a"}}><span className="inlineProfileAvatar">{avatarEmoji(profileData?.[activeProfileId]?.avatar)}</span>{activeProfile.name}</b></p>
    {profiles.map(p=><button key={p.id} onClick={()=>switchProfile(p.id)} style={p.id===activeProfileId?{background:"#e8f1ff",color:"#1769ff",fontWeight:900}:{}}>
     <span className="profileChoiceAvatar">{avatarEmoji(profileData?.[p.id]?.avatar)}</span>{p.name}
     <span>{p.id===activeProfileId?"Aktiv":"›"}</span>
    </button>)}
    <button onClick={addProfile}>➕ Neues Kinderprofil<span>›</span></button>
    <button onClick={renameActiveProfile}>🎨 Profil bearbeiten<span>›</span></button>
    <button onClick={resetActiveProfile}>↺ Fortschritt zurücksetzen<span>›</span></button>
    {profiles.length>1&&<button onClick={deleteActiveProfile}>🗑️ Profil löschen<span>›</span></button>}
    <button onClick={()=>openParentTool("screenTime")}>⏱️ Bildschirmzeit<span>›</span></button>
    <button onClick={()=>openParentTool("settings")}>⚙️ App-Einstellungen<span>›</span></button>
    <button onClick={()=>openParentTool("export")}>🖨️ Export & Drucken<span>›</span></button>
    <button onClick={()=>openParentTool("help")}>❓ Hilfe & Feedback<span>›</span></button>
    <button onClick={()=>openParentTool("about")}>ℹ️ Über Malino<span>›</span></button>
   </div>
   <div className="panel">
    <h2>Profil-Statistik</h2>
    <p>Profil <b><span className="inlineProfileAvatar">{avatarEmoji(profileData?.[activeProfileId]?.avatar)}</span>{activeProfile.name}</b></p>
    <p>Gemalte Bilder <b>{profileStatsDone.length}</b></p>
    <p>Erhaltene Sterne <b>{profileStatsStars} ⭐</b></p>
    <p>Galerie <b>{profileStatsGallery.length}</b></p>
     <p>Rätsel gelöst <b>{solvedPuzzleCount}/{puzzleCards.length}</b></p>
    <p>Belohnungen <b>{profileStatsRewards.length}</b></p>
     <p>Schatzsammlung <b>{unlockedTreasureCount}/{treasureItems.length}</b></p>
     <p>Tages-Challenge <b>{dailyClaimed?"Heute geschafft ✓":"Offen 🌟"}</b></p>
     <p>Abzeichen <b>{unlockedBadgeCount}/{achievementBadges.length}</b></p>
     <p>Tages-Serie <b>{dailyStreak} 🔥</b></p>
    <div className="bars">{[30,50,42,65,55,75,88].map((h,i)=><i key={i} style={{height:h+"%"}}/>)}</div>
   </div>
  
   {parentTool&&<div className="parentUtilityOverlay" role="dialog" aria-modal="true">
    <div className="parentUtilityCard">
     <button className="parentUtilityClose" onClick={closeParentTool} aria-label="Schließen">×</button>

     {parentTool==="screenTime"&&<>
      <span className="parentUtilityIcon">⏱️</span>
      <span className="eyebrow">Bildschirmzeit</span>
      <h2>Tägliches Zeitlimit</h2>
      <p>Lege fest, wie lange Malino pro Tag auf diesem Gerät genutzt werden darf.</p>
      <div className="screenTimeSummary">
       <div><b>{screenTimeUsage} Min.</b><small>heute genutzt</small></div>
       <div><b>{screenTimeLimit?`${screenTimeLimit} Min.`:"∞"}</b><small>Tageslimit</small></div>
      </div>
      {screenTimeLimit>0&&<div className="screenTimeTrack"><i style={{width:`${Math.min(100,Math.round((screenTimeUsage/screenTimeLimit)*100))}%`}}/></div>}
      <div className="screenTimeOptions">
       {[0,15,30,45,60,90].map(m=><button key={m} className={screenTimeLimit===m?"selected":""} onClick={()=>saveScreenTimeLimit(m)}>{m===0?"Kein Limit":`${m} Min.`}</button>)}
      </div>
      <button className="parentUtilitySecondary fullWidth" onClick={resetTodayScreenTime}>Heute zurücksetzen</button>
     </>}

     {parentTool==="settings"&&<>
      <span className="parentUtilityIcon">⚙️</span>
      <span className="eyebrow">App-Einstellungen</span>
      <h2>Malino anpassen</h2>
      <div className="settingRow">
       <div><b>✨ Animationen</b><small>Maskottchen, Übergänge und kleine Bewegungseffekte.</small></div>
       <button className={`settingToggle ${animationsEnabled?"on":""}`} onClick={()=>setAnimationsEnabled(v=>!v)} aria-pressed={animationsEnabled}><i/></button>
      </div>
      <div className="settingRow">
       <div><b>🔊 Töne</b><small>Klicks, Farben, Sterne, Erfolge und Schatzkisten.</small></div>
       <button className={`settingToggle ${soundEnabled?"on":""}`} onClick={()=>{setSoundEnabled(v=>!v);if(!soundEnabled)setTimeout(()=>playSound("success"),50)}} aria-pressed={soundEnabled}><i/></button>
      </div>

      <div className="settingInfo"><b>💾 Lokale Speicherung</b><small>Profile, Sterne und Fortschritt werden aktuell auf diesem Gerät gespeichert.</small></div>
     </>}

     {parentTool==="export"&&<>
      <span className="parentUtilityIcon">🖨️</span>
      <span className="eyebrow">Export & Drucken</span>
      <h2>Daten sichern</h2>
      <p>Exportiere das aktive Kinderprofil als Datei oder öffne den Druckdialog des Geräts.</p>
      <div className="parentUtilityActions">
       <button className="parentUtilityPrimary" onClick={exportProfileData}>⬇️ Profildaten exportieren</button>
       <button className="parentUtilitySecondary" onClick={printParentArea}>🖨️ Drucken</button>
      </div>
     </>}

     {parentTool==="help"&&<>
      <span className="parentUtilityIcon">❓</span>
      <span className="eyebrow">Hilfe & Feedback</span>
      <h2>Wie können wir helfen?</h2>
      <div className="helpFaq">
       <div><b>Bild reagiert nicht?</b><small>Seite neu laden und prüfen, ob die Malvorlage vollständig geladen wurde.</small></div>
       <div><b>Fortschritt fehlt?</b><small>Prüfe zuerst, ob das richtige Kinderprofil aktiv ist.</small></div>
       <div><b>Belohnung testen?</b><small>Im Elternbereich kannst du mit „+50 ⭐“ Teststerne vergeben.</small></div>
      </div>
      <div className="parentUtilityActions">
       <button className="parentUtilityPrimary" onClick={copySupportInfo}>📋 Support-Info kopieren</button>
       <button className="parentUtilitySecondary" onClick={()=>window.location.reload()}>↻ App neu laden</button>
      </div>
     </>}

     {parentTool==="about"&&<>
      <span className="parentUtilityIcon">🦁</span>
      <span className="eyebrow">Über Malino</span>
      <h2>Malino</h2>
      <p>Eine kinderfreundliche Mal-App mit Tages-Challenges, Belohnungen, Profilen und kreativen Malbildern.</p>
      <div className="aboutMalinoGrid">
       <div><b>Version</b><small>Web-App 1.0</small></div>
       <div><b>Aktives Profil</b><small>{activeProfile.name}</small></div>
       <div><b>Speicherung</b><small>lokal auf dem Gerät</small></div>
       <div><b>Sprache</b><small>Deutsch</small></div>
      </div>
     </>}

     {parentToolNotice&&<div className="parentToolNotice">✓ {parentToolNotice}</div>}
    </div>
   </div>}

   </>}
  </section>}

  {screenTimeBlocked&&screen!=="parent"&&<div className="screenTimeBlockedOverlay" role="dialog" aria-modal="true">
   <div className="screenTimeBlockedCard">
    <span>⏱️</span>
    <h2>Malzeit für heute beendet</h2>
    <p>Das eingestellte Tageslimit von <b>{screenTimeLimit} Minuten</b> wurde erreicht.</p>
    <button onClick={()=>{setParentPinInput("");setParentPinError("");setParentPinMode(parentPin?"locked":"setup");setScreen("parent")}}>🔐 Elternbereich öffnen</button>
   </div>
  </div>}

  <nav>{[["start","🏠","Start"],["library","📚","Bibliothek"],["paint","🖌️","Malen"],["reward","🏆","Belohnungen"],["gallery","🎨","Galerie"]].map(([s,e,l])=><button key={s} className={(screen===s||(screen==="room"&&s==="reward"))?"active":""} onClick={()=>s==="paint"?open(current):setScreen(s)}>{e}<span>{l}</span></button>)}</nav>
 </main>
}