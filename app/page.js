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


function mazeRand(seed){
 let x=(seed>>>0)||123456789;
 return()=>{
  x^=x<<13;x^=x>>>17;x^=x<<5;
  return((x>>>0)%1000000)/1000000;
 };
}

function buildMaze(cols,rows,seed){
 const rand=mazeRand(seed);
 const cells=Array.from({length:cols*rows},()=>({t:1,r:1,b:1,l:1}));
 const visited=new Uint8Array(cols*rows);
 const stack=[0];
 visited[0]=1;
 const index=(x,y)=>y*cols+x;
 while(stack.length){
  const cur=stack[stack.length-1],x=cur%cols,y=(cur/cols)|0;
  const opts=[];
  if(y>0&&!visited[index(x,y-1)])opts.push([x,y-1,"t","b"]);
  if(x<cols-1&&!visited[index(x+1,y)])opts.push([x+1,y,"r","l"]);
  if(y<rows-1&&!visited[index(x,y+1)])opts.push([x,y+1,"b","t"]);
  if(x>0&&!visited[index(x-1,y)])opts.push([x-1,y,"l","r"]);
  if(!opts.length){stack.pop();continue}
  const pick=opts[Math.floor(rand()*opts.length)];
  const [nx,ny,wall,opposite]=pick,ni=index(nx,ny);
  cells[cur][wall]=0;cells[ni][opposite]=0;
  visited[ni]=1;stack.push(ni);
 }
 cells[0].l=0;
 cells[cells.length-1].r=0;
 return{cols,rows,cells};
}

function MazeBoard({maze,startEmoji,endEmoji,className=""}){
 if(!maze)return null;
 const cell=50,w=maze.cols*cell,h=maze.rows*cell;
 return <svg className={`mazeBoard ${className}`} viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Labyrinth">
  <rect x="0" y="0" width={w} height={h} rx="12" fill="#fff"/>
  <g stroke="#173d78" strokeWidth="5" strokeLinecap="round">
   {maze.cells.map((c,i)=>{
    const x=(i%maze.cols)*cell,y=((i/maze.cols)|0)*cell;
    return <g key={i}>
     {c.t?<line x1={x} y1={y} x2={x+cell} y2={y}/>:null}
     {c.r?<line x1={x+cell} y1={y} x2={x+cell} y2={y+cell}/>:null}
     {c.b?<line x1={x} y1={y+cell} x2={x+cell} y2={y+cell}/>:null}
     {c.l?<line x1={x} y1={y} x2={x} y2={y+cell}/>:null}
    </g>
   })}
  </g>
  <circle cx={cell*.5} cy={cell*.5} r={cell*.32} fill="#eaf7ff"/>
  <circle cx={w-cell*.5} cy={h-cell*.5} r={cell*.32} fill="#fff1c8"/>
  <text x={cell*.5} y={cell*.66} textAnchor="middle" fontSize={cell*.46}>{startEmoji}</text>
  <text x={w-cell*.5} y={h-cell*.34} textAnchor="middle" fontSize={cell*.46}>{endEmoji}</text>
 </svg>
}


function MalinoNumberFloodBoard({selectedNumber,palette,painted,onFill,onReady,resetKey}){
 const canvasRef=useRef(null);
 const modelRef=useRef(null);
 const completeRef=useRef(false);

 const seeds=[
  // bezpieczne punkty umieszczone z dala od cyfr i konturów
  [75,335,4],[790,265,4],[620,690,4],[105,700,4],[865,700,4],
  [168,73,3],[83,280,4],[190,380,3],
  [55,535,4],[130,535,4],[207,535,4],[279,535,4],
  [290,660,4],[1025,477,3],[718,675,4],
  [925,111,4],[1024,249,4],
  [432,111,3],[523,74,3],[614,92,3],[690,140,3],
  [339,259,3],[695,348,3],[641,393,3],
  [376,192,1],[691,280,1],[512,230,1],
  [421,426,3],[465,500,2],[355,508,1],[616,525,1],
  [414,653,2],[572,613,2],[413,744,1],[580,744,1],
  [844,437,3],[174,613,1],[970,577,1],
  [101,743,4],[842,733,4]
 ];

 const hexToRgb=h=>{
  const v=h.replace("#","");
  const n=parseInt(v.length===3?v.split("").map(x=>x+x).join(""):v,16);
  return [(n>>16)&255,(n>>8)&255,n&255];
 };

 useEffect(()=>{
  let cancelled=false;
  const img=new Image();
  img.onload=()=>{
   if(cancelled)return;
   const canvas=canvasRef.current,ctx=canvas?.getContext("2d",{willReadFrequently:true});
   if(!canvas||!ctx)return;
   canvas.width=img.naturalWidth;canvas.height=img.naturalHeight;
   ctx.drawImage(img,0,0);
   const base=ctx.getImageData(0,0,canvas.width,canvas.height);
   const {width:w,height:h,data}=base;
   const labels=new Int32Array(w*h);labels.fill(-1);
   const q=new Int32Array(w*h);
   const componentSizes=[];
   let nextLabel=0;
   const isWhite=i=>data[i*4]>242&&data[i*4+1]>242&&data[i*4+2]>242&&data[i*4+3]>200;
   for(let p=0;p<w*h;p++){
    if(labels[p]!==-1||!isWhite(p))continue;
    let head=0,tail=0;q[tail++]=p;labels[p]=nextLabel;
    while(head<tail){
     const cur=q[head++],x=cur%w,y=(cur/w)|0;
     let n;
     if(x>0){n=cur-1;if(labels[n]===-1&&isWhite(n)){labels[n]=nextLabel;q[tail++]=n}}
     if(x<w-1){n=cur+1;if(labels[n]===-1&&isWhite(n)){labels[n]=nextLabel;q[tail++]=n}}
     if(y>0){n=cur-w;if(labels[n]===-1&&isWhite(n)){labels[n]=nextLabel;q[tail++]=n}}
     if(y<h-1){n=cur+w;if(labels[n]===-1&&isWhite(n)){labels[n]=nextLabel;q[tail++]=n}}
    }
    componentSizes[nextLabel]=tail;
    nextLabel++;
   }
   const findLabel=(sx,sy)=>{
    sx=Math.max(0,Math.min(w-1,Math.round(sx)));
    sy=Math.max(0,Math.min(h-1,Math.round(sy)));
    const seen=new Set();
    for(let r=0;r<=34;r++){
     let best=-1,bestDist=1e9,bestSize=-1;
     for(let dy=-r;dy<=r;dy++)for(let dx=-r;dx<=r;dx++){
      if(r&&Math.abs(dx)!==r&&Math.abs(dy)!==r)continue;
      const x=sx+dx,y=sy+dy;
      if(x<0||y<0||x>=w||y>=h)continue;
      const lab=labels[y*w+x];
      if(lab<0||seen.has(lab))continue;
      seen.add(lab);
      const size=componentSizes[lab]||0;
      if(size<120)continue;
      const dist=dx*dx+dy*dy;
      if(dist<bestDist||(dist===bestDist&&size>bestSize)){
       best=lab;bestDist=dist;bestSize=size;
      }
     }
     if(best>=0)return best;
    }
    return -1;
   };
   const required=new Map();
   seeds.forEach(([x,y,n])=>{const lab=findLabel(x,y);if(lab>=0)required.set(lab,n)});
   const members=new Map();
   for(let p=0;p<labels.length;p++){
    const lab=labels[p];if(!required.has(lab))continue;
    if(!members.has(lab))members.set(lab,[]);
    members.get(lab).push(p);
   }
   modelRef.current={base,labels,required,members,componentSizes,w,h};
   onReady?.(required.size);
   // Replay saved progress.
   const out=new ImageData(new Uint8ClampedArray(base.data),w,h);
   painted.forEach(id=>{
    const lab=Number(id),n=required.get(lab);if(!n)return;
    const rgb=hexToRgb(palette[n-1]||"#ffd84d");
    (members.get(lab)||[]).forEach(p=>{const i=p*4;out.data[i]=rgb[0];out.data[i+1]=rgb[1];out.data[i+2]=rgb[2];out.data[i+3]=255});
   });
   ctx.putImageData(out,0,0);
   completeRef.current=painted.length>=required.size&&required.size>0;
  };
  img.src="/assets/malino-number-lineart.png";
  return()=>{cancelled=true};
 },[resetKey]);

 useEffect(()=>{
  const m=modelRef.current,canvas=canvasRef.current,ctx=canvas?.getContext("2d",{willReadFrequently:true});
  if(!m||!ctx)return;
  const out=new ImageData(new Uint8ClampedArray(m.base.data),m.w,m.h);
  painted.forEach(id=>{
   const lab=Number(id),n=m.required.get(lab);if(!n)return;
   const rgb=hexToRgb(palette[n-1]||"#ffd84d");
   (m.members.get(lab)||[]).forEach(p=>{const i=p*4;out.data[i]=rgb[0];out.data[i+1]=rgb[1];out.data[i+2]=rgb[2];out.data[i+3]=255});
  });
  ctx.putImageData(out,0,0);
 },[painted,palette]);

 const tap=e=>{
  const m=modelRef.current,canvas=canvasRef.current;if(!m||!canvas)return;

  // Jeśli został tylko jeden region, nie pozwól żeby ukryty/mały seed blokował ukończenie planszy.
  const remaining=[...m.required.entries()].filter(([lab])=>!painted.includes(String(lab)));
  if(remaining.length===1){
   const [lastLab,lastNumber]=remaining[0];
   if(lastNumber===selectedNumber){
    onFill?.({id:String(lastLab),n:lastNumber},m.required.size);
    return;
   }
  }
  const r=canvas.getBoundingClientRect();
  const x=Math.round((e.clientX-r.left)*m.w/r.width);
  const y=Math.round((e.clientY-r.top)*m.h/r.height);

  const direct=(x>=0&&y>=0&&x<m.w&&y<m.h)?m.labels[y*m.w+x]:-1;
  let best=(direct>=0&&m.required.has(direct))?direct:-1;

  if(best<0){
   const candidates=[...m.required.entries()].filter(([lab,num])=>!painted.includes(String(lab))&&num===selectedNumber);
   if(candidates.length===1){
    const [candidateLab,candidateNumber]=candidates[0];
    onFill?.({id:String(candidateLab),n:candidateNumber},m.required.size);
    return;
   }
   let bestDist=1e9,bestSize=-1;
   const seen=new Set();
   for(let rad=0;rad<=36;rad++){
    for(let dy=-rad;dy<=rad;dy++)for(let dx=-rad;dx<=rad;dx++){
     if(rad&&Math.abs(dx)!==rad&&Math.abs(dy)!==rad)continue;
     const xx=x+dx,yy=y+dy;
     if(xx<0||yy<0||xx>=m.w||yy>=m.h)continue;
     const lab=m.labels[yy*m.w+xx];
     if(lab<0||seen.has(lab)||!m.required.has(lab))continue;
     seen.add(lab);
     const dist=dx*dx+dy*dy,size=m.componentSizes?.[lab]||0;
     if(dist<bestDist||(dist===bestDist&&size>bestSize)){
      best=lab;bestDist=dist;bestSize=size;
     }
    }
    if(best>=0&&rad>=8)break;
   }
  }

  if(best>=0){
   const required=m.required.get(best);
   if(required!==selectedNumber)return;
   const id=String(best);if(painted.includes(id))return;
   onFill?.({id,n:required},m.required.size);
   return;
  }

  // Awaryjne przypisanie dla poprawnego, zamkniętego pola,
  // którego punkt startowy nie został wcześniej rozpoznany.
  let fallback=-1;
  for(let rad=0;rad<=20&&fallback<0;rad++){
   for(let dy=-rad;dy<=rad&&fallback<0;dy++)for(let dx=-rad;dx<=rad;dx++){
    if(rad&&Math.abs(dx)!==rad&&Math.abs(dy)!==rad)continue;
    const xx=x+dx,yy=y+dy;
    if(xx<0||yy<0||xx>=m.w||yy>=m.h)continue;
    const lab=m.labels[yy*m.w+xx];
    if(lab>=0&&(m.componentSizes?.[lab]||0)>=120){fallback=lab;break}
   }
  }
  if(fallback<0)return;
  if(!m.required.has(fallback)){
   m.required.set(fallback,selectedNumber);
   const members=[];
   for(let p=0;p<m.labels.length;p++)if(m.labels[p]===fallback)members.push(p);
   m.members.set(fallback,members);
   onReady?.(m.required.size);
  }
  const id=String(fallback);if(painted.includes(id))return;
  onFill?.({id,n:selectedNumber},m.required.size);
 };

 return <div className="numberFloodBoard">
  <canvas ref={canvasRef} onClick={tap} aria-label="Malino Malen nach Zahlen"/>
 </div>
}

export default function Page(){
 const emptyProfileData=()=>({fav:[],done:[],gallery:[],stars:0,rewards:[],avatar:"lion",dailyClaims:[],dailyStreak:0,lastDailyDate:"",activeFrame:"classic",puzzleSolved:[],hiddenSolved:[]});
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
 const [craftMode,setCraftMode]=useState("puzzle");
 const [mazeThemeId,setMazeThemeId]=useState("fox");
 const [mazeDifficulty,setMazeDifficulty]=useState("leicht");
 const [mazeSeed,setMazeSeed]=useState(2311);
 const [savedMazes,setSavedMazes]=useState([]);
 const [differenceThemeId,setDifferenceThemeId]=useState("farm");
 const [differenceDifficulty,setDifferenceDifficulty]=useState("leicht");
 const [differenceSeed,setDifferenceSeed]=useState(2401);
 const [savedDifferences,setSavedDifferences]=useState([]);
 const [hiddenThemeId,setHiddenThemeId]=useState("forest");
 const [hiddenDifficulty,setHiddenDifficulty]=useState("leicht");
 const [hiddenSeed,setHiddenSeed]=useState(2501);
 const [savedHidden,setSavedHidden]=useState([]);
 const [hiddenFound,setHiddenFound]=useState([]);
 const [hiddenMiss,setHiddenMiss]=useState(null);
 const [hiddenComplete,setHiddenComplete]=useState(false);
 const [numberThemeId,setNumberThemeId]=useState("malino");
 const [numberDifficulty,setNumberDifficulty]=useState("leicht");
 const [numberPainted,setNumberPainted]=useState([]);
 const [savedNumberArt,setSavedNumberArt]=useState([]);
 const [selectedNumber,setSelectedNumber]=useState(1);
 const [numberFloodTotal,setNumberFloodTotal]=useState(1);







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
   const numberArt=localStorage.getItem("malino:numberArt:v1");
   if(numberArt){try{setSavedNumberArt(JSON.parse(numberArt)||[])}catch{}}
   const hidden=localStorage.getItem("malino:hidden:v1");
   if(hidden){try{setSavedHidden(JSON.parse(hidden)||[])}catch{}}
   const diffs=localStorage.getItem("malino:differences:v1");
   if(diffs){try{setSavedDifferences(JSON.parse(diffs)||[])}catch{}}
   const mazes=localStorage.getItem("malino:mazes:v1");
   if(mazes){try{setSavedMazes(JSON.parse(mazes)||[])}catch{}}
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
  try{localStorage.setItem("malino:mazes:v1",JSON.stringify(savedMazes))}catch{}
 },[savedMazes]);

 useEffect(()=>{
  try{localStorage.setItem("malino:differences:v1",JSON.stringify(savedDifferences))}catch{}
 },[savedDifferences]);

 useEffect(()=>{
  try{localStorage.setItem("malino:hidden:v1",JSON.stringify(savedHidden))}catch{}
 },[savedHidden]);

 useEffect(()=>{try{localStorage.setItem("malino:numberArt:v1",JSON.stringify(savedNumberArt))}catch{}},[savedNumberArt]);

 useEffect(()=>{
  setHiddenFound([]);
  setHiddenMiss(null);
  setHiddenComplete(false);
 },[hiddenThemeId,hiddenDifficulty,hiddenSeed]);

 useEffect(()=>{setNumberPainted([]);setSelectedNumber(1)},[numberThemeId,numberDifficulty]);

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
 const hiddenSolved=Array.isArray(activeData.hiddenSolved)?activeData.hiddenSolved:[];
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
  {id:"rakete",title:"Rakete",emoji:"🚀",srcBw:"/puzzle-rakete.png",srcColor:"/puzzle-rakete-color.png",w:1086,h:1448},
  {id:"triceratops",title:"Triceratops",emoji:"🦕",srcBw:"/puzzle-triceratops.png",srcColor:"/puzzle-triceratops-color.png",w:1086,h:1448},
  {id:"feuerwehr",title:"Feuerwehr",emoji:"🚒",srcBw:"/puzzle-feuerwehr.png",srcColor:"/puzzle-feuerwehr-color.png",w:1122,h:1402},
  {id:"traktor",title:"Traktor",emoji:"🚜",srcBw:"/puzzle-traktor.png",srcColor:"/puzzle-traktor-color.png",w:1122,h:1402},
  {id:"fuchs",title:"Fuchs",emoji:"🦊",srcBw:"/puzzle-fuchs.png",srcColor:"/puzzle-fuchs-color.png",w:1103,h:1426},
  {id:"pinguin",title:"Pinguin",emoji:"🐧",srcBw:"/puzzle-pinguin.png",srcColor:"/puzzle-pinguin-color.png",w:1103,h:1426},
  {id:"drache",title:"Drache",emoji:"🐉",srcBw:"/puzzle-drache.png",srcColor:"/puzzle-drache-color.png",w:1086,h:1448},
  {id:"schloss",title:"Schloss",emoji:"🏰",srcBw:"/puzzle-schloss.png",srcColor:"/puzzle-schloss-color.png",w:1086,h:1448},
  {id:"pferd",title:"Pferd",emoji:"🐴",srcBw:"/puzzle-pferd.png",srcColor:"/puzzle-pferd-color.png",w:1122,h:1402},
  {id:"igel",title:"Igel",emoji:"🦔",srcBw:"/puzzle-igel.png",srcColor:"/puzzle-igel-color.png",w:1103,h:1426},
  {id:"ziege",title:"Ziege",emoji:"🐐",srcBw:"/puzzle-ziege.png",srcColor:"/puzzle-ziege-color.png",w:1122,h:1402},
  {id:"astronaut",title:"Astronaut",emoji:"🧑‍🚀",srcBw:"/puzzle-astronaut.png",srcColor:"/puzzle-astronaut-color.png",w:1086,h:1448}
 ];
 const activeCraftTemplate=craftTemplates.find(x=>x.id===craftImageId)||craftTemplates[0];
 const activeCraftSrc=craftStyle==="color"?activeCraftTemplate.srcColor:activeCraftTemplate.srcBw;
 const craftGrid=craftPieces===4?[2,2]:craftPieces===6?[3,2]:craftPieces===9?[3,3]:[4,3];
 const mazeThemes=[
  {id:"fox",title:"Fuchs zum Häuschen",icon:"🦊",start:"🦊",end:"🏠"},
  {id:"rocket",title:"Rakete zum Planeten",icon:"🚀",start:"🚀",end:"🪐"},
  {id:"dragon",title:"Drache zum Schloss",icon:"🐉",start:"🐉",end:"🏰"},
  {id:"penguin",title:"Pinguin zum Fisch",icon:"🐧",start:"🐧",end:"🐟"},
  {id:"tractor",title:"Traktor zur Scheune",icon:"🚜",start:"🚜",end:"🏚️"},
  {id:"firetruck",title:"Feuerwehr zum Einsatz",icon:"🚒",start:"🚒",end:"🔥"},
  {id:"bee",title:"Biene zur Blume",icon:"🐝",start:"🐝",end:"🌻"},
  {id:"pirate",title:"Pirat zum Schatz",icon:"🏴‍☠️",start:"🏴‍☠️",end:"💰"},
  {id:"dino",title:"Dino zum Ei",icon:"🦖",start:"🦖",end:"🥚"}
 ];
 const mazeDifficultyMeta={
  leicht:{label:"Leicht",age:"4–5",cols:7,rows:5},
  mittel:{label:"Mittel",age:"5–7",cols:10,rows:7},
  schwer:{label:"Schwer",age:"7+",cols:14,rows:10}
 };
 const activeMazeTheme=mazeThemes.find(x=>x.id===mazeThemeId)||mazeThemes[0];
 const activeMazeDifficulty=mazeDifficultyMeta[mazeDifficulty]||mazeDifficultyMeta.leicht;
 const mazeHash=[...`${mazeThemeId}-${mazeDifficulty}-${mazeSeed}`].reduce((a,ch)=>((a*31)+ch.charCodeAt(0))>>>0,2166136261);
 const activeMaze=useMemo(()=>buildMaze(activeMazeDifficulty.cols,activeMazeDifficulty.rows,mazeHash),[mazeThemeId,mazeDifficulty,mazeSeed]);
 const differenceThemes=[
  {id:"farm",title:"Bauernhof",icon:"🚜",scene:"🌳 🏠 🚜 🐄 ☀️ 🌼 🐔 🌾 🐷"},
  {id:"space",title:"Weltraum",icon:"🚀",scene:"🚀 🪐 ⭐ 👨‍🚀 🌙 🛸 ☄️ 🌎 🛰️"},
  {id:"forest",title:"Wald",icon:"🦊",scene:"🌲 🦊 🍄 🐿️ 🌼 🪵 🦉 🌰 🐰"},
  {id:"castle",title:"Märchen",icon:"🏰",scene:"🏰 🐉 ⭐ 👑 🌈 🦄 🧚 💎 ☁️"},
  {id:"ocean",title:"Meer",icon:"🐳",scene:"🐳 🐠 🐚 ⭐ 🐙 🌊 🐬 🦀 🐟"},
  {id:"dino",title:"Dino-Welt",icon:"🦕",scene:"🦕 🌋 🥚 🌴 🦖 ☁️ 🪨 🌿 🦴"}
 ];
 const differenceDifficultyMeta={
  leicht:{label:"Leicht",age:"4–5",count:3},
  mittel:{label:"Mittel",age:"5–7",count:5},
  schwer:{label:"Schwer",age:"7+",count:7}
 };
 const activeDifferenceTheme=differenceThemes.find(x=>x.id===differenceThemeId)||differenceThemes[0];
 const activeDifferenceDifficulty=differenceDifficultyMeta[differenceDifficulty]||differenceDifficultyMeta.leicht;
 const differenceTokens=activeDifferenceTheme.scene.split(" ");
 const differenceHash=[...`${differenceThemeId}-${differenceDifficulty}-${differenceSeed}`].reduce((a,ch)=>((a*33)^ch.charCodeAt(0))>>>0,5381);
 const differenceChanges=useMemo(()=>{
  const rand=mazeRand(differenceHash);
  const pool=[
   {type:"swap",from:"☀️",to:"🌙"},
   {type:"swap",from:"⭐",to:"✨"},
   {type:"swap",from:"🌼",to:"🌷"},
   {type:"swap",from:"🌳",to:"🌲"},
   {type:"swap",from:"🏠",to:"🏡"},
   {type:"swap",from:"🐄",to:"🐑"},
   {type:"swap",from:"🪐",to:"🌎"},
   {type:"swap",from:"🚀",to:"🛸"},
   {type:"swap",from:"🦊",to:"🐰"},
   {type:"swap",from:"🍄",to:"🌰"},
   {type:"swap",from:"🏰",to:"🏯"},
   {type:"swap",from:"👑",to:"💎"},
   {type:"swap",from:"🐳",to:"🐬"},
   {type:"swap",from:"🐠",to:"🐟"},
   {type:"swap",from:"🦕",to:"🦖"},
   {type:"swap",from:"🥚",to:"🪨"}
  ];
  const changes=[];
  const used=new Set();
  const target=Math.min(activeDifferenceDifficulty.count,differenceTokens.length);
  let guard=0;
  while(changes.length<target&&guard<200){
   guard++;
   const idx=Math.floor(rand()*differenceTokens.length);
   if(used.has(idx))continue;
   used.add(idx);
   const original=differenceTokens[idx];
   const candidate=pool.find(x=>x.from===original);
   changes.push({idx,from:original,to:candidate?.to||["⭐","🌈","🎈","🍎","☁️"][Math.floor(rand()*5)]});
  }
  return changes;
 },[differenceThemeId,differenceDifficulty,differenceSeed]);
 const changedDifferenceTokens=useMemo(()=>differenceTokens.map((t,i)=>differenceChanges.find(c=>c.idx===i)?.to||t),[differenceThemeId,differenceDifficulty,differenceSeed]);
 const hiddenThemes=[
  {id:"forest",title:"Waldabenteuer",icon:"🌲",bg:"🌳 🌲 🪵 🍄 🌿 🌼 🏕️ 🏡 🌲 🌳 🍂 🌿",items:["🦋","🏮","🪺","🦉","🐌","🦔","🍎","🔑","⭐"]},
  {id:"farm",title:"Bauernhof",icon:"🚜",bg:"🌾 🏡 🌳 🚜 🐄 🐔 🌻 🌾 🐷 🌳 🪵 ☀️",items:["🥕","🔔","🪣","🐭","🍎","🧤","⭐","🦋","🔑"]},
  {id:"ocean",title:"Unterwasserwelt",icon:"🐳",bg:"🌊 🪸 🐠 🐟 🐳 🫧 🪨 🌊 🐙 🪸 🐚 🫧",items:["🐚","⭐","🐠","🦀","⚓","💎","🐙","🐬","🔑"]},
  {id:"space",title:"Weltraum",icon:"🚀",bg:"🌌 ⭐ 🪐 🚀 🌙 ☄️ 🌎 🛰️ ⭐ 🌌 🛸 🪐",items:["👨‍🚀","🔭","⭐","🛸","🌎","🚀","💎","🔑","🌙"]},
  {id:"dino",title:"Dino-Welt",icon:"🦕",bg:"🌴 🌋 🦕 🪨 🌿 🦖 ☁️ 🌴 🥚 🌿 🪨 🌋",items:["🥚","🦴","🌿","⭐","🪨","🦋","🔑","🌼","🍎"]},
  {id:"fairy",title:"Märchenwald",icon:"🏰",bg:"🏰 🌳 🌈 🦄 🌼 🧚 ☁️ 🌲 🐉 ⭐ 🌿 🌸",items:["👑","💎","🔑","⭐","🦋","🍎","🪄","🌹","🔔"]}
 ];
 const hiddenDifficultyMeta={
  leicht:{label:"Leicht",age:"4–5",count:5},
  mittel:{label:"Mittel",age:"5–7",count:7},
  schwer:{label:"Schwer",age:"7+",count:9}
 };
 const activeHiddenTheme=hiddenThemes.find(x=>x.id===hiddenThemeId)||hiddenThemes[0];
 const activeHiddenDifficulty=hiddenDifficultyMeta[hiddenDifficulty]||hiddenDifficultyMeta.leicht;
 const hiddenTargets=activeHiddenTheme.items.slice(0,activeHiddenDifficulty.count);
 const hiddenHash=[...`${hiddenThemeId}-${hiddenDifficulty}-${hiddenSeed}`].reduce((a,ch)=>((a*33)^ch.charCodeAt(0))>>>0,5381);
 const hiddenPlacements=useMemo(()=>{
  const rand=mazeRand(hiddenHash), out=[];
  hiddenTargets.forEach((item,i)=>{
   out.push({item,x:8+rand()*84,y:10+rand()*76,r:-18+rand()*36,s:.72+rand()*.34});
  });
  return out;
 },[hiddenThemeId,hiddenDifficulty,hiddenSeed]);
 const hiddenBoardKey=`${hiddenThemeId}:${hiddenDifficulty}:${hiddenSeed}`;
 const hiddenAlreadySolved=hiddenSolved.includes(hiddenBoardKey);
 const numberThemes=[
  {id:"malino",title:"Malino",icon:"🦁"},
  {id:"rocket",title:"Rakete",icon:"🚀"},
  {id:"dino",title:"Dinosaurier",icon:"🦕"},
  {id:"unicorn",title:"Einhorn",icon:"🦄"},
  {id:"tractor",title:"Traktor",icon:"🚜"},
  {id:"fish",title:"Unterwasser",icon:"🐠"}
 ];
 const numberDifficultyMeta={
  leicht:{label:"Leicht",age:"4–5",colors:4,cols:4,rows:4},
  mittel:{label:"Mittel",age:"5–7",colors:6,cols:5,rows:5},
  schwer:{label:"Schwer",age:"7+",colors:8,cols:6,rows:6}
 };
 const numberPalette=["#f5b642","#ef6f61","#58a6e7","#63bd72","#9b72d2","#f28fbd","#56c7c2","#8d6e63"];
 const activeNumberTheme=numberThemes.find(x=>x.id===numberThemeId)||numberThemes[0];
 const activeNumberDifficulty=numberDifficultyMeta[numberDifficulty]||numberDifficultyMeta.leicht;
 const numberCells=useMemo(()=>{
  const {cols,rows,colors}=activeNumberDifficulty;
  const seed=[...`${numberThemeId}-${numberDifficulty}`].reduce((v,ch)=>((v*31)+ch.charCodeAt(0))>>>0,17);
  const rand=mazeRand(seed);
  return Array.from({length:cols*rows},(_,i)=>({id:i,n:1+Math.floor(rand()*colors)}));
 },[numberThemeId,numberDifficulty]);
 const numberDone=numberPainted.length===numberCells.length;
 const numberRealBoards={
  malino:{
   title:"Malino 2.0",
   regions:[
    {id:"sky",n:4,label:[420,82],d:"M18 18 H482 V300 C445 289 408 290 372 302 C330 316 287 316 247 305 C202 293 157 287 116 297 C78 306 46 307 18 301 Z"},
    {id:"treeCrown",n:3,label:[92,72],d:"M18 18 H180 C197 38 197 61 183 78 C198 98 187 122 166 129 C157 151 130 158 111 145 C91 160 64 153 55 132 C31 133 17 115 23 95 C6 82 8 58 24 47 C17 36 16 26 18 18 Z"},
    {id:"treeTrunk",n:4,label:[73,222],d:"M55 113 C70 120 89 120 104 112 C108 174 106 237 103 306 C88 311 69 311 49 305 C52 239 53 176 55 113 Z"},
    {id:"bushLeft",n:3,label:[92,335],d:"M18 302 C37 283 64 284 78 303 C96 283 124 288 133 311 C154 299 179 310 183 334 C197 337 204 350 200 364 H18 Z"},
    {id:"bushRight",n:3,label:[417,337],d:"M325 315 C344 294 373 296 387 316 C405 294 435 300 442 324 C461 316 480 330 482 351 V366 H320 C316 346 317 329 325 315 Z"},
    {id:"ground",n:4,label:[87,443],d:"M18 365 C78 348 137 352 194 369 C255 387 317 388 375 371 C417 359 452 358 482 365 V482 H18 Z"},

    {id:"maneTop1",n:3,label:[252,126],d:"M226 139 C224 112 240 94 260 98 C266 75 290 66 306 81 C321 61 348 64 359 84 C381 75 403 90 402 113 C423 118 431 141 420 157 C435 174 428 198 408 206 C414 228 396 247 375 243 C365 266 339 273 321 257 C302 276 273 269 265 246 C242 252 222 235 224 213 C202 205 196 181 209 165 C200 153 207 142 226 139 Z"},
    {id:"maneTop2",n:3,label:[337,126],d:"M300 83 C316 60 344 63 357 84 C379 73 402 88 403 111 C424 116 434 139 422 158 C438 175 430 198 410 207 C415 228 397 247 376 243 C365 265 340 271 322 256 C306 240 299 219 300 197 Z"},
    {id:"maneLeft",n:3,label:[219,225],d:"M224 168 C201 169 185 187 191 208 C170 219 171 245 191 255 C181 276 195 298 217 297 C223 320 249 329 266 313 C276 291 278 267 270 244 C258 208 246 181 224 168 Z"},
    {id:"maneRight",n:3,label:[367,226],d:"M362 165 C386 164 404 181 400 202 C422 212 423 238 404 250 C416 270 403 294 381 295 C377 318 351 329 333 314 C321 294 318 269 325 245 C336 208 344 180 362 165 Z"},

    {id:"earLeft",n:1,label:[228,167],d:"M225 180 C207 174 198 158 202 143 C206 128 221 121 234 130 C246 139 249 155 243 168 C239 175 233 179 225 180 Z"},
    {id:"earRight",n:1,label:[354,167],d:"M350 130 C364 121 379 129 382 145 C385 160 376 175 358 180 C350 179 344 175 340 168 C334 155 338 139 350 130 Z"},
    {id:"face",n:1,label:[290,213],d:"M247 154 C270 137 309 138 332 156 C355 174 360 212 342 238 C325 263 286 269 258 251 C230 233 225 181 247 154 Z"},

    {id:"shirt",n:4,label:[290,292],d:"M247 266 C271 252 309 252 333 266 C346 275 353 291 356 311 L340 329 C314 337 265 337 240 328 L225 311 C229 291 235 276 247 266 Z"},
    {id:"bib",n:2,label:[290,343],d:"M251 286 C275 282 306 282 329 287 L337 380 C315 394 264 394 242 380 Z"},
    {id:"pawBadge",n:1,label:[290,335],d:"M275 342 C275 332 282 326 290 326 C298 326 305 332 305 342 C305 351 299 357 290 357 C281 357 275 351 275 342 Z"},
    {id:"armLeft",n:1,label:[211,326],d:"M243 280 C219 287 201 306 197 328 C194 345 205 358 220 355 C234 352 239 337 246 320 C250 307 249 292 243 280 Z"},
    {id:"armRight",n:1,label:[369,326],d:"M338 280 C362 288 380 307 384 329 C387 345 376 358 361 355 C347 352 342 337 335 320 C331 307 332 292 338 280 Z"},
    {id:"legLeft",n:1,label:[253,426],d:"M251 375 C236 390 230 415 236 437 C243 458 269 461 279 440 C287 421 279 397 266 381 Z"},
    {id:"legRight",n:1,label:[320,426],d:"M320 378 C335 392 342 417 336 439 C329 459 303 461 293 441 C285 421 293 397 306 381 Z"},

    {id:"tail",n:2,label:[411,352],d:"M341 336 C379 341 407 325 419 300 C427 282 440 275 451 283 C463 292 458 307 445 315 C438 347 411 371 372 374 C358 366 348 352 341 336 Z"},
    {id:"tailTip",n:3,label:[454,279],d:"M430 280 C435 260 452 250 467 258 C482 266 481 286 468 299 C454 312 434 304 429 289 C428 286 428 283 430 280 Z"},
    {id:"flowerLeft",n:1,label:[91,397],d:"M72 397 C58 383 66 365 82 369 C85 351 106 348 113 365 C128 357 143 372 136 387 C152 395 146 415 129 416 C127 434 106 439 97 423 C84 436 65 425 69 408 C55 405 57 387 72 397 Z"},
    {id:"flowerRight",n:1,label:[431,399],d:"M412 399 C398 385 406 367 422 371 C425 353 446 350 453 367 C468 359 483 374 476 389 C492 397 486 417 469 418 C467 436 446 441 437 425 C424 438 405 427 409 410 C395 407 397 389 412 399 Z"},
    {id:"rockLeft",n:4,label:[139,447],d:"M99 459 C105 429 126 411 151 414 C176 417 190 438 183 459 Z"},
    {id:"rockRight",n:4,label:[405,447],d:"M370 459 C377 431 397 415 421 417 C445 420 458 440 451 459 Z"}
   ]
  },
  rocket:{
   title:"Rakete",
   regions:[
    {id:"sky",n:3,label:[80,85],d:"M18 18 H482 V340 C410 320 345 330 285 350 C215 372 140 365 18 340 Z"},
    {id:"moonGround",n:4,label:[70,430],d:"M18 340 C105 325 175 365 245 350 C330 331 404 315 482 340 V482 H18 Z"},
    {id:"rocketBody",n:1,label:[255,235],d:"M250 80 C305 128 330 194 318 270 C311 316 286 355 250 388 C214 355 189 316 182 270 C170 194 195 128 250 80 Z"},
    {id:"rocketNose",n:2,label:[250,120],d:"M250 80 C276 104 294 128 306 155 C270 143 230 143 194 155 C206 128 224 104 250 80 Z"},
    {id:"window",n:3,label:[250,205],d:"M216 190 C216 168 232 153 250 153 C268 153 284 168 284 190 C284 212 268 227 250 227 C232 227 216 212 216 190 Z"},
    {id:"leftFin",n:2,label:[185,305],d:"M188 260 C150 280 126 324 132 370 C158 353 181 337 205 314 Z"},
    {id:"rightFin",n:2,label:[315,305],d:"M312 260 C350 280 374 324 368 370 C342 353 319 337 295 314 Z"},
    {id:"flame",n:4,label:[250,410],d:"M222 365 C235 390 224 421 250 455 C276 421 265 390 278 365 C262 378 238 378 222 365 Z"},
    {id:"planet",n:4,label:[405,180],d:"M374 180 C374 153 394 134 420 134 C446 134 466 153 466 180 C466 207 446 226 420 226 C394 226 374 207 374 180 Z"},
    {id:"star1",n:2,label:[100,190],d:"M100 150 L111 179 L143 181 L118 200 L126 232 L100 214 L74 232 L82 200 L57 181 L89 179 Z"},
    {id:"star2",n:2,label:[405,82],d:"M405 50 L414 72 L438 74 L419 89 L425 113 L405 100 L385 113 L391 89 L372 74 L396 72 Z"}
   ]
  },
  dino:{
   title:"Dinosaurier",
   regions:[
    {id:"sky",n:3,label:[85,80],d:"M18 18 H482 V280 C420 260 360 275 300 290 C220 310 130 305 18 282 Z"},
    {id:"ground",n:4,label:[85,430],d:"M18 282 C115 260 180 315 260 292 C335 270 410 260 482 288 V482 H18 Z"},
    {id:"body",n:1,label:[270,300],d:"M180 250 C205 215 260 198 318 218 C365 235 390 278 380 330 C370 380 325 410 272 405 C220 400 177 365 170 320 C166 292 169 268 180 250 Z"},
    {id:"head",n:1,label:[155,210],d:"M90 166 C117 135 165 132 197 158 C229 184 229 227 200 250 C168 275 118 268 91 238 C70 214 71 188 90 166 Z"},
    {id:"belly",n:2,label:[282,340],d:"M231 278 C260 257 307 260 334 287 C357 310 355 352 326 374 C296 397 248 386 227 350 C211 323 214 297 231 278 Z"},
    {id:"tail",n:1,label:[410,285],d:"M358 258 C413 217 467 224 480 252 C454 256 432 270 415 294 C400 315 382 323 358 314 Z"},
    {id:"legL",n:2,label:[225,418],d:"M214 373 C198 395 196 431 210 453 C224 473 253 468 258 445 C262 424 250 398 237 380 Z"},
    {id:"legR",n:2,label:[330,418],d:"M322 372 C342 392 353 424 346 448 C338 474 307 474 297 450 C288 428 299 397 309 379 Z"},
    {id:"plates1",n:4,label:[230,205],d:"M190 228 L205 184 L230 217 L252 172 L274 216 L299 178 L313 225 Z"},
    {id:"sun",n:4,label:[410,90],d:"M410 50 C433 50 450 67 450 90 C450 113 433 130 410 130 C387 130 370 113 370 90 C370 67 387 50 410 50 Z"},
    {id:"plant1",n:4,label:[75,355],d:"M45 395 C48 350 62 326 81 312 C84 340 82 365 75 395 C93 360 113 342 132 339 C121 368 102 386 80 401 Z"}
   ]
  },
  unicorn:{
   title:"Einhorn",
   regions:[
    {id:"sky",n:3,label:[70,80],d:"M18 18 H482 V294 C405 276 350 286 290 300 C215 318 130 314 18 294 Z"},
    {id:"ground",n:4,label:[70,430],d:"M18 294 C100 275 165 318 250 301 C335 284 412 274 482 300 V482 H18 Z"},
    {id:"body",n:1,label:[280,300],d:"M185 250 C220 222 278 217 330 236 C374 252 397 288 390 329 C382 372 342 397 291 397 C238 397 190 373 176 335 C163 300 168 271 185 250 Z"},
    {id:"head",n:1,label:[165,210],d:"M105 170 C130 139 175 135 207 157 C238 180 242 217 217 244 C189 274 139 274 108 247 C84 226 82 194 105 170 Z"},
    {id:"mane",n:2,label:[210,175],d:"M174 147 C201 119 231 129 237 155 C259 142 277 161 267 181 C248 211 226 229 205 245 C209 213 197 181 174 147 Z"},
    {id:"tail",n:2,label:[410,315],d:"M374 286 C420 262 462 280 468 315 C442 311 423 322 407 345 C391 365 369 367 346 355 C372 342 383 318 374 286 Z"},
    {id:"horn",n:4,label:[150,125],d:"M144 159 L157 83 L177 160 Z"},
    {id:"legL",n:1,label:[238,420],d:"M225 374 C217 401 218 438 230 459 H259 C265 430 260 402 250 377 Z"},
    {id:"legR",n:1,label:[330,420],d:"M317 374 C311 402 314 438 326 458 H355 C359 429 351 399 342 377 Z"},
    {id:"cloud",n:3,label:[405,100],d:"M355 93 C365 67 393 62 409 81 C425 60 455 71 457 96 C478 97 483 121 466 132 H348 C329 120 334 99 355 93 Z"},
    {id:"star",n:4,label:[85,180],d:"M85 145 L95 170 L122 172 L101 189 L107 216 L85 201 L63 216 L69 189 L48 172 L75 170 Z"},
    {id:"flower",n:4,label:[95,380],d:"M70 380 C55 365 65 345 83 353 C88 333 111 333 116 353 C134 345 145 365 131 379 C146 394 136 414 118 407 C112 427 88 427 82 407 C64 414 54 394 70 380 Z"}
   ]
  },
  tractor:{
   title:"Traktor",
   regions:[
    {id:"sky",n:3,label:[80,80],d:"M18 18 H482 V285 C420 270 350 279 295 292 C210 312 125 307 18 286 Z"},
    {id:"field",n:4,label:[80,430],d:"M18 286 C110 270 175 312 255 296 C342 278 415 270 482 296 V482 H18 Z"},
    {id:"tractorBody",n:1,label:[255,302],d:"M145 260 H346 C374 260 395 280 395 308 V350 H137 V282 C137 270 140 264 145 260 Z"},
    {id:"hood",n:1,label:[170,292],d:"M110 274 H224 V344 H110 Z"},
    {id:"cabin",n:2,label:[290,210],d:"M228 152 H342 L368 260 H224 Z"},
    {id:"window",n:3,label:[292,205],d:"M247 172 H324 L340 240 H244 Z"},
    {id:"wheelL",n:2,label:[170,385],d:"M118 386 C118 349 144 323 178 323 C212 323 238 349 238 386 C238 423 212 449 178 449 C144 449 118 423 118 386 Z"},
    {id:"wheelR",n:2,label:[350,385],d:"M302 390 C302 350 330 322 366 322 C402 322 430 350 430 390 C430 430 402 458 366 458 C330 458 302 430 302 390 Z"},
    {id:"exhaust",n:4,label:[187,200],d:"M165 150 H190 V260 H165 Z"},
    {id:"sun",n:4,label:[420,90],d:"M420 52 C442 52 459 69 459 91 C459 113 442 130 420 130 C398 130 381 113 381 91 C381 69 398 52 420 52 Z"},
    {id:"barn",n:4,label:[70,220],d:"M32 197 L83 153 L134 197 V275 H32 Z"}
   ]
  },
  fish:{
   title:"Unterwasser",
   regions:[
    {id:"water",n:3,label:[75,75],d:"M18 18 H482 V355 C420 340 355 350 295 360 C215 375 130 368 18 352 Z"},
    {id:"sand",n:4,label:[75,440],d:"M18 352 C105 338 180 380 255 365 C335 350 410 340 482 364 V482 H18 Z"},
    {id:"fishBody",n:1,label:[250,245],d:"M150 245 C185 185 270 168 338 205 C373 224 391 248 392 263 C382 281 359 299 329 311 C259 339 183 315 150 263 Z"},
    {id:"fishTail",n:2,label:[115,245],d:"M152 220 C121 191 83 185 58 202 C81 221 91 244 58 279 C88 293 124 281 153 258 Z"},
    {id:"finTop",n:2,label:[265,175],d:"M229 195 C248 157 280 142 309 153 C298 173 287 192 277 211 Z"},
    {id:"finBottom",n:2,label:[275,322],d:"M246 309 C269 345 306 354 331 333 C310 321 292 307 278 290 Z"},
    {id:"eyePatch",n:4,label:[342,236],d:"M318 224 C329 209 352 208 365 222 C379 237 376 260 359 270 C342 281 320 271 313 253 C309 242 311 232 318 224 Z"},
    {id:"coral",n:2,label:[412,400],d:"M386 453 C390 415 383 387 393 364 C403 387 403 409 407 425 C415 392 430 370 445 359 C441 390 434 415 430 452 Z"},
    {id:"weed1",n:4,label:[90,400],d:"M70 452 C69 411 59 384 68 355 C80 377 82 402 84 424 C91 392 104 367 119 353 C117 390 108 419 105 452 Z"},
    {id:"bubble1",n:3,label:[390,125],d:"M370 125 C370 108 383 95 400 95 C417 95 430 108 430 125 C430 142 417 155 400 155 C383 155 370 142 370 125 Z"},
    {id:"bubble2",n:3,label:[435,190],d:"M421 190 C421 178 430 169 442 169 C454 169 463 178 463 190 C463 202 454 211 442 211 C430 211 421 202 421 190 Z"},
    {id:"shell",n:4,label:[185,420],d:"M156 438 C163 405 185 384 210 390 C235 396 246 421 234 447 H156 Z"}
   ]
  }
 };

 const numberRealBoardsMittel={
  malino:{
   title:"Malino 2.0",
   regions:[
    {id:"skyA",n:3,label:[420,72],d:"M18 18 H482 V108 C430 96 390 100 350 113 C305 128 267 129 225 114 C178 98 136 101 95 115 C67 124 43 126 18 119 Z"},
    {id:"skyB",n:6,label:[425,145],d:"M18 108 C88 93 148 102 205 119 C267 138 326 138 382 121 C425 107 456 109 482 116 V220 C420 203 362 210 309 223 C247 239 188 235 128 219 C86 208 50 208 18 215 Z"},
    {id:"grass",n:4,label:[82,445],d:"M18 330 C82 315 135 321 181 337 C224 352 274 353 320 336 C371 316 421 318 482 337 V482 H18 Z"},
    {id:"treeCrown",n:4,label:[82,72],d:"M20 63 C42 30 77 29 93 51 C106 25 146 27 156 55 C180 34 210 45 211 75 C234 74 244 99 230 116 C214 135 184 132 169 112 C153 138 116 139 98 117 C78 141 40 133 34 106 C10 103 4 81 20 63 Z"},
    {id:"treeTrunk",n:2,label:[110,230],d:"M82 105 C103 113 128 114 147 106 L140 330 H78 Z"},
    {id:"maneOuter",n:2,label:[290,140],d:"M203 147 C216 118 244 111 266 126 C284 99 320 103 336 127 C365 114 393 133 390 161 C417 167 424 197 407 217 C429 239 416 267 391 275 C398 301 372 324 347 315 C331 342 297 345 275 325 C249 343 216 326 212 299 C184 295 171 265 187 243 C166 225 173 193 198 182 C192 168 194 157 203 147 Z"},
    {id:"maneInner",n:5,label:[290,250],d:"M230 178 C249 156 276 148 301 154 C329 161 349 181 354 207 C359 232 349 258 329 275 C309 292 280 299 255 288 C229 277 213 254 213 229 C213 210 219 191 230 178 Z"},
    {id:"face",n:1,label:[290,198],d:"M247 163 C267 145 302 144 325 160 C348 177 353 214 336 238 C318 263 279 267 253 248 C227 229 224 185 247 163 Z"},
    {id:"shirt",n:6,label:[286,286],d:"M238 263 C265 250 310 251 338 270 L345 315 C320 327 253 327 231 314 Z"},
    {id:"bib",n:4,label:[287,335],d:"M250 286 H325 L331 363 C309 377 267 377 245 362 Z"},
    {id:"pants",n:4,label:[287,390],d:"M235 350 C263 362 312 362 338 350 L340 404 C322 420 252 420 233 404 Z"},
    {id:"pawPad",n:1,label:[288,344],d:"M271 346 C271 335 279 327 288 327 C297 327 305 335 305 346 C305 356 297 362 288 362 C279 362 271 356 271 346 Z"},
    {id:"pawToeL",n:1,label:[271,323],d:"M262 322 C262 315 266 311 272 311 C278 311 282 315 282 322 C282 328 278 332 272 332 C266 332 262 328 262 322 Z"},
    {id:"pawToeM",n:1,label:[291,316],d:"M282 315 C282 308 286 304 292 304 C298 304 302 308 302 315 C302 321 298 325 292 325 C286 325 282 321 282 315 Z"},
    {id:"pawToeR",n:1,label:[311,323],d:"M302 322 C302 315 306 311 312 311 C318 311 322 315 322 322 C322 328 318 332 312 332 C306 332 302 328 302 322 Z"},
    {id:"armL",n:1,label:[210,330],d:"M239 278 C211 286 193 309 188 336 C184 357 199 373 216 367 C232 361 239 341 246 320 Z"},
    {id:"armR",n:1,label:[368,330],d:"M343 280 C371 290 388 314 390 340 C392 359 376 372 360 366 C345 360 341 339 334 320 Z"},
    {id:"legs",n:1,label:[286,438],d:"M248 389 C230 401 223 428 229 450 C235 473 267 480 278 455 C287 435 278 407 264 394 Z M323 392 C340 407 347 432 340 454 C332 477 300 480 290 456 C282 434 291 407 306 394 Z"},
    {id:"tail",n:2,label:[405,345],d:"M347 340 C387 343 416 329 428 302 C437 281 440 269 452 266 C466 263 477 278 469 290 C461 301 450 307 441 309 C432 346 402 373 359 379 Z"},
    {id:"tailTip",n:5,label:[456,281],d:"M437 269 C445 255 461 251 472 261 C483 272 479 289 466 296 C454 303 440 295 437 282 Z"},
    {id:"clouds",n:3,label:[400,92],d:"M353 68 C365 47 392 47 404 65 C421 53 445 61 447 81 C468 81 477 102 462 116 H348 C331 106 334 81 353 68 Z M409 106 C418 89 438 89 447 103 C460 94 477 102 478 116 C491 118 494 133 484 142 H404 C393 135 396 117 409 106 Z"},
    {id:"flowers",n:4,label:[94,388],d:"M64 383 C52 365 63 348 79 355 C84 336 107 336 112 355 C130 346 144 365 132 380 C147 393 138 413 118 409 C113 429 87 428 83 409 C63 416 49 397 64 383 Z M409 391 C396 373 407 356 424 363 C429 344 453 344 458 363 C476 354 489 373 477 388 C493 400 483 422 463 417 C458 437 432 436 428 417 C408 424 394 405 409 391 Z"}
   ]
  },
  rocket:{
   title:"Rakete",
   regions:[
    {id:"skyA",n:3,label:[80,80],d:"M18 18 H482 V146 C425 126 380 124 333 142 C292 158 250 157 209 142 C160 124 106 129 18 150 Z"},
    {id:"skyB",n:5,label:[410,135],d:"M18 146 C96 126 161 132 215 150 C268 168 318 169 372 151 C411 138 447 139 482 149 V340 C415 321 350 332 287 351 C216 373 141 365 18 340 Z"},
    {id:"ground",n:4,label:[70,430],d:"M18 340 C105 325 175 365 245 350 C330 331 404 315 482 340 V482 H18 Z"},
    {id:"bodyA",n:1,label:[250,245],d:"M250 80 C305 128 330 194 318 270 C311 316 286 355 250 388 C214 355 189 316 182 270 C170 194 195 128 250 80 Z"},
    {id:"bodyStripe",n:6,label:[250,285],d:"M188 260 C228 275 273 275 312 260 C310 292 299 319 283 343 C261 351 239 351 217 343 C201 319 190 292 188 260 Z"},
    {id:"nose",n:2,label:[250,120],d:"M250 80 C276 104 294 128 306 155 C270 143 230 143 194 155 C206 128 224 104 250 80 Z"},
    {id:"windowOuter",n:3,label:[250,205],d:"M216 190 C216 168 232 153 250 153 C268 153 284 168 284 190 C284 212 268 227 250 227 C232 227 216 212 216 190 Z"},
    {id:"windowInner",n:5,label:[250,190],d:"M230 190 C230 177 239 168 250 168 C261 168 270 177 270 190 C270 203 261 212 250 212 C239 212 230 203 230 190 Z"},
    {id:"finL",n:2,label:[182,305],d:"M188 260 C150 280 126 324 132 370 C158 353 181 337 205 314 Z"},
    {id:"finR",n:2,label:[318,305],d:"M312 260 C350 280 374 324 368 370 C342 353 319 337 295 314 Z"},
    {id:"flameOuter",n:4,label:[250,410],d:"M222 365 C235 390 224 421 250 455 C276 421 265 390 278 365 C262 378 238 378 222 365 Z"},
    {id:"flameInner",n:6,label:[250,420],d:"M239 379 C245 398 241 414 250 435 C259 414 255 398 261 379 C254 384 246 384 239 379 Z"},
    {id:"planet",n:4,label:[420,180],d:"M374 180 C374 153 394 134 420 134 C446 134 466 153 466 180 C466 207 446 226 420 226 C394 226 374 207 374 180 Z"},
    {id:"planetRing",n:5,label:[420,180],d:"M365 177 C385 162 459 162 478 177 C462 187 438 192 420 192 C402 192 379 187 365 177 Z"},
    {id:"starL",n:2,label:[100,190],d:"M100 150 L111 179 L143 181 L118 200 L126 232 L100 214 L74 232 L82 200 L57 181 L89 179 Z"},
    {id:"starR",n:2,label:[405,82],d:"M405 50 L414 72 L438 74 L419 89 L425 113 L405 100 L385 113 L391 89 L372 74 L396 72 Z"},
    {id:"moon",n:5,label:[95,95],d:"M75 64 C99 49 124 60 129 82 C111 74 94 81 89 99 C84 116 91 130 106 139 C82 144 58 128 54 105 C51 87 58 74 75 64 Z"}
   ]
  },
  dino:{
   title:"Dinosaurier",
   regions:[
    {id:"skyA",n:3,label:[80,75],d:"M18 18 H482 V150 C420 130 370 135 320 150 C260 168 210 166 160 149 C112 132 70 136 18 153 Z"},
    {id:"skyB",n:5,label:[420,220],d:"M18 150 C90 130 150 138 210 157 C270 176 330 174 390 154 C425 142 455 143 482 151 V282 C420 263 360 276 300 290 C220 310 130 305 18 282 Z"},
    {id:"ground",n:4,label:[85,435],d:"M18 282 C115 260 180 315 260 292 C335 270 410 260 482 288 V482 H18 Z"},
    {id:"body",n:1,label:[270,300],d:"M180 250 C205 215 260 198 318 218 C365 235 390 278 380 330 C370 380 325 410 272 405 C220 400 177 365 170 320 C166 292 169 268 180 250 Z"},
    {id:"belly",n:6,label:[282,340],d:"M231 278 C260 257 307 260 334 287 C357 310 355 352 326 374 C296 397 248 386 227 350 C211 323 214 297 231 278 Z"},
    {id:"head",n:1,label:[145,205],d:"M90 166 C117 135 165 132 197 158 C229 184 229 227 200 250 C168 275 118 268 91 238 C70 214 71 188 90 166 Z"},
    {id:"snout",n:5,label:[105,225],d:"M82 205 C105 194 139 197 157 216 C171 231 164 251 144 260 C119 271 91 260 80 242 C72 229 73 214 82 205 Z"},
    {id:"tail",n:1,label:[420,285],d:"M358 258 C413 217 467 224 480 252 C454 256 432 270 415 294 C400 315 382 323 358 314 Z"},
    {id:"legL",n:2,label:[225,420],d:"M214 373 C198 395 196 431 210 453 C224 473 253 468 258 445 C262 424 250 398 237 380 Z"},
    {id:"legR",n:2,label:[330,420],d:"M322 372 C342 392 353 424 346 448 C338 474 307 474 297 450 C288 428 299 397 309 379 Z"},
    {id:"platesA",n:4,label:[230,205],d:"M190 228 L205 184 L230 217 L252 172 L274 216 L299 178 L313 225 Z"},
    {id:"platesB",n:5,label:[325,230],d:"M302 226 L325 190 L344 226 L365 202 L375 244 Z"},
    {id:"sun",n:4,label:[410,90],d:"M410 50 C433 50 450 67 450 90 C450 113 433 130 410 130 C387 130 370 113 370 90 C370 67 387 50 410 50 Z"},
    {id:"plantL",n:4,label:[75,355],d:"M45 395 C48 350 62 326 81 312 C84 340 82 365 75 395 C93 360 113 342 132 339 C121 368 102 386 80 401 Z"},
    {id:"rock",n:6,label:[425,385],d:"M386 410 C390 378 411 361 436 365 C460 369 474 388 469 415 Z"}
   ]
  },
  unicorn:{
   title:"Einhorn",
   regions:[
    {id:"skyA",n:3,label:[70,75],d:"M18 18 H482 V145 C420 128 365 132 315 149 C260 167 210 165 158 148 C110 132 68 136 18 151 Z"},
    {id:"skyB",n:5,label:[420,220],d:"M18 145 C90 130 150 137 210 155 C270 173 330 172 390 154 C430 142 457 143 482 151 V294 C405 276 350 286 290 300 C215 318 130 314 18 294 Z"},
    {id:"ground",n:4,label:[70,430],d:"M18 294 C100 275 165 318 250 301 C335 284 412 274 482 300 V482 H18 Z"},
    {id:"body",n:1,label:[280,300],d:"M185 250 C220 222 278 217 330 236 C374 252 397 288 390 329 C382 372 342 397 291 397 C238 397 190 373 176 335 C163 300 168 271 185 250 Z"},
    {id:"belly",n:6,label:[285,340],d:"M220 290 C250 270 302 270 338 291 C358 303 366 329 354 350 C336 380 293 387 257 374 C228 364 210 335 220 290 Z"},
    {id:"head",n:1,label:[165,210],d:"M105 170 C130 139 175 135 207 157 C238 180 242 217 217 244 C189 274 139 274 108 247 C84 226 82 194 105 170 Z"},
    {id:"muzzle",n:5,label:[135,232],d:"M103 218 C126 204 158 208 177 227 C189 240 184 257 167 266 C143 278 113 267 101 249 C94 238 94 226 103 218 Z"},
    {id:"maneA",n:2,label:[210,175],d:"M174 147 C201 119 231 129 237 155 C259 142 277 161 267 181 C248 211 226 229 205 245 C209 213 197 181 174 147 Z"},
    {id:"maneB",n:6,label:[225,205],d:"M205 158 C224 145 246 151 252 171 C260 190 244 214 220 232 C225 202 219 180 205 158 Z"},
    {id:"tailA",n:2,label:[410,315],d:"M374 286 C420 262 462 280 468 315 C442 311 423 322 407 345 C391 365 369 367 346 355 C372 342 383 318 374 286 Z"},
    {id:"tailB",n:6,label:[445,315],d:"M405 290 C434 282 457 294 462 315 C440 315 423 327 411 345 C399 356 387 358 375 353 C395 336 405 315 405 290 Z"},
    {id:"horn",n:4,label:[158,118],d:"M144 159 L157 83 L177 160 Z"},
    {id:"legL",n:1,label:[238,420],d:"M225 374 C217 401 218 438 230 459 H259 C265 430 260 402 250 377 Z"},
    {id:"legR",n:1,label:[330,420],d:"M317 374 C311 402 314 438 326 458 H355 C359 429 351 399 342 377 Z"},
    {id:"cloud",n:3,label:[405,100],d:"M355 93 C365 67 393 62 409 81 C425 60 455 71 457 96 C478 97 483 121 466 132 H348 C329 120 334 99 355 93 Z"},
    {id:"star",n:4,label:[85,180],d:"M85 145 L95 170 L122 172 L101 189 L107 216 L85 201 L63 216 L69 189 L48 172 L75 170 Z"}
   ]
  },
  tractor:{
   title:"Traktor",
   regions:[
    {id:"skyA",n:3,label:[80,75],d:"M18 18 H482 V145 C420 130 365 132 310 150 C255 168 205 166 155 150 C105 134 65 137 18 151 Z"},
    {id:"skyB",n:5,label:[420,220],d:"M18 145 C95 128 158 137 215 155 C272 174 330 173 390 154 C427 142 456 143 482 151 V285 C420 270 350 279 295 292 C210 312 125 307 18 286 Z"},
    {id:"field",n:4,label:[80,430],d:"M18 286 C110 270 175 312 255 296 C342 278 415 270 482 296 V482 H18 Z"},
    {id:"body",n:1,label:[255,302],d:"M145 260 H346 C374 260 395 280 395 308 V350 H137 V282 C137 270 140 264 145 260 Z"},
    {id:"hood",n:6,label:[170,292],d:"M110 274 H224 V344 H110 Z"},
    {id:"grille",n:5,label:[120,310],d:"M110 290 H142 V335 H110 Z"},
    {id:"cabin",n:2,label:[290,210],d:"M228 152 H342 L368 260 H224 Z"},
    {id:"window",n:3,label:[292,205],d:"M247 172 H324 L340 240 H244 Z"},
    {id:"windowShade",n:5,label:[315,210],d:"M286 172 H324 L340 240 H300 Z"},
    {id:"wheelL",n:2,label:[178,386],d:"M118 386 C118 349 144 323 178 323 C212 323 238 349 238 386 C238 423 212 449 178 449 C144 449 118 423 118 386 Z"},
    {id:"wheelLHub",n:6,label:[178,386],d:"M150 386 C150 369 162 357 178 357 C194 357 206 369 206 386 C206 403 194 415 178 415 C162 415 150 403 150 386 Z"},
    {id:"wheelR",n:2,label:[366,390],d:"M302 390 C302 350 330 322 366 322 C402 322 430 350 430 390 C430 430 402 458 366 458 C330 458 302 430 302 390 Z"},
    {id:"wheelRHub",n:6,label:[366,390],d:"M335 390 C335 371 348 358 366 358 C384 358 397 371 397 390 C397 409 384 422 366 422 C348 422 335 409 335 390 Z"},
    {id:"exhaust",n:4,label:[178,200],d:"M165 150 H190 V260 H165 Z"},
    {id:"sun",n:4,label:[420,90],d:"M420 52 C442 52 459 69 459 91 C459 113 442 130 420 130 C398 130 381 113 381 91 C381 69 398 52 420 52 Z"},
    {id:"barn",n:4,label:[70,220],d:"M32 197 L83 153 L134 197 V275 H32 Z"}
   ]
  },
  fish:{
   title:"Unterwasser",
   regions:[
    {id:"waterA",n:3,label:[75,75],d:"M18 18 H482 V150 C420 132 365 137 310 153 C250 170 200 169 150 152 C103 136 65 138 18 153 Z"},
    {id:"waterB",n:5,label:[420,230],d:"M18 150 C92 132 150 139 210 158 C270 177 330 175 390 157 C427 145 456 145 482 153 V355 C420 340 355 350 295 360 C215 375 130 368 18 352 Z"},
    {id:"sand",n:4,label:[75,440],d:"M18 352 C105 338 180 380 255 365 C335 350 410 340 482 364 V482 H18 Z"},
    {id:"fishBody",n:1,label:[250,245],d:"M150 245 C185 185 270 168 338 205 C373 224 391 248 392 263 C382 281 359 299 329 311 C259 339 183 315 150 263 Z"},
    {id:"fishStripe",n:6,label:[275,250],d:"M244 185 C269 180 296 184 318 195 C304 226 304 279 320 312 C295 322 269 325 244 319 C258 280 258 224 244 185 Z"},
    {id:"tail",n:2,label:[115,245],d:"M152 220 C121 191 83 185 58 202 C81 221 91 244 58 279 C88 293 124 281 153 258 Z"},
    {id:"tailInner",n:5,label:[100,245],d:"M130 225 C108 209 88 207 75 213 C91 229 95 244 77 267 C94 273 112 265 131 253 Z"},
    {id:"finTop",n:2,label:[265,175],d:"M229 195 C248 157 280 142 309 153 C298 173 287 192 277 211 Z"},
    {id:"finBottom",n:2,label:[275,322],d:"M246 309 C269 345 306 354 331 333 C310 321 292 307 278 290 Z"},
    {id:"eyePatch",n:4,label:[342,236],d:"M318 224 C329 209 352 208 365 222 C379 237 376 260 359 270 C342 281 320 271 313 253 C309 242 311 232 318 224 Z"},
    {id:"coralA",n:2,label:[412,400],d:"M386 453 C390 415 383 387 393 364 C403 387 403 409 407 425 C415 392 430 370 445 359 C441 390 434 415 430 452 Z"},
    {id:"coralB",n:6,label:[445,410],d:"M421 452 C423 420 420 398 429 382 C438 400 438 419 441 433 C448 410 457 394 468 384 C466 412 458 433 457 452 Z"},
    {id:"weed",n:4,label:[90,400],d:"M70 452 C69 411 59 384 68 355 C80 377 82 402 84 424 C91 392 104 367 119 353 C117 390 108 419 105 452 Z"},
    {id:"bubble1",n:3,label:[400,125],d:"M370 125 C370 108 383 95 400 95 C417 95 430 108 430 125 C430 142 417 155 400 155 C383 155 370 142 370 125 Z"},
    {id:"bubble2",n:3,label:[442,190],d:"M421 190 C421 178 430 169 442 169 C454 169 463 178 463 190 C463 202 454 211 442 211 C430 211 421 202 421 190 Z"},
    {id:"shell",n:4,label:[185,420],d:"M156 438 C163 405 185 384 210 390 C235 396 246 421 234 447 H156 Z"}
   ]
  }
 };
 const useMittelRealNumberBoard=numberDifficulty==="mittel"&&!!numberRealBoardsMittel[numberThemeId];
 const activeMittelRealNumberBoard=useMittelRealNumberBoard?numberRealBoardsMittel[numberThemeId]:null;

 const numberRealBoardsSchwer={
  malino:{
   title:"Malino 2.0",
   regions:[
    {id:"skyA",n:3,label:[420,70],d:"M18 18 H482 V112 C432 100 394 103 357 115 C319 128 286 129 252 116 C211 101 173 102 136 116 C98 131 61 132 18 118 Z"},
    {id:"skyB",n:7,label:[430,145],d:"M18 112 C91 96 151 105 207 122 C266 140 320 139 374 123 C419 110 454 111 482 120 V215 C420 199 365 207 310 220 C245 236 183 232 121 216 C81 206 48 207 18 214 Z"},
    {id:"grassA",n:4,label:[80,445],d:"M18 330 C82 315 135 321 181 337 C224 352 274 353 320 336 C371 316 421 318 482 337 V482 H18 Z"},
    {id:"grassB",n:8,label:[410,385],d:"M18 330 C98 312 156 332 213 347 C273 363 335 358 392 340 C425 330 455 330 482 338 V420 C430 402 387 410 347 421 C291 438 226 439 170 422 C112 405 64 401 18 415 Z"},
    {id:"treeA",n:4,label:[82,70],d:"M20 63 C42 30 77 29 93 51 C106 25 146 27 156 55 C180 34 210 45 211 75 C234 74 244 99 230 116 C214 135 184 132 169 112 C153 138 116 139 98 117 C78 141 40 133 34 106 C10 103 4 81 20 63 Z"},
    {id:"treeB",n:5,label:[150,88],d:"M116 75 C131 53 161 52 174 72 C190 51 222 61 223 86 C241 87 247 105 236 119 C220 136 196 128 184 113 C167 132 143 132 129 114 C111 126 92 114 94 96 C95 87 104 80 116 75 Z"},
    {id:"trunkA",n:2,label:[110,230],d:"M82 105 C103 113 128 114 147 106 L140 330 H78 Z"},
    {id:"trunkB",n:6,label:[118,280],d:"M111 130 C126 127 138 123 147 116 L141 330 H111 Z"},
    {id:"maneOuter",n:2,label:[290,140],d:"M203 147 C216 118 244 111 266 126 C284 99 320 103 336 127 C365 114 393 133 390 161 C417 167 424 197 407 217 C429 239 416 267 391 275 C398 301 372 324 347 315 C331 342 297 345 275 325 C249 343 216 326 212 299 C184 295 171 265 187 243 C166 225 173 193 198 182 C192 168 194 157 203 147 Z"},
    {id:"maneMid",n:5,label:[290,253],d:"M230 178 C249 156 276 148 301 154 C329 161 349 181 354 207 C359 232 349 258 329 275 C309 292 280 299 255 288 C229 277 213 254 213 229 C213 210 219 191 230 178 Z"},
    {id:"manePatch",n:8,label:[338,245],d:"M312 172 C336 181 350 204 349 228 C348 250 336 267 319 279 C306 262 300 242 302 220 C303 201 307 185 312 172 Z"},
    {id:"face",n:1,label:[290,198],d:"M247 163 C267 145 302 144 325 160 C348 177 353 214 336 238 C318 263 279 267 253 248 C227 229 224 185 247 163 Z"},
    {id:"earL",n:1,label:[220,137],d:"M218 160 C200 148 194 127 205 113 C217 99 241 109 251 131 Z"},
    {id:"earR",n:1,label:[357,135],d:"M327 132 C341 108 367 100 378 117 C389 135 372 154 354 164 Z"},
    {id:"shirt",n:6,label:[286,280],d:"M238 263 C265 250 310 251 338 270 L344 310 C318 321 255 321 232 309 Z"},
    {id:"strapL",n:4,label:[253,292],d:"M244 267 L264 260 L272 333 L251 337 Z"},
    {id:"strapR",n:4,label:[320,292],d:"M311 260 L333 268 L326 337 L305 333 Z"},
    {id:"bib",n:4,label:[288,342],d:"M259 300 H318 L325 366 C306 380 270 380 251 366 Z"},
    {id:"pantsA",n:4,label:[266,392],d:"M235 352 C257 361 278 364 288 364 V414 C266 419 244 416 233 404 Z"},
    {id:"pantsB",n:8,label:[310,392],d:"M288 364 C304 364 324 360 338 352 L340 404 C329 416 307 419 288 414 Z"},
    {id:"pawPad",n:1,label:[288,347],d:"M271 348 C271 337 279 329 288 329 C297 329 305 337 305 348 C305 358 297 364 288 364 C279 364 271 358 271 348 Z"},
    {id:"pawToeL",n:3,label:[269,323],d:"M260 322 C260 315 265 310 271 310 C277 310 282 315 282 322 C282 329 277 333 271 333 C265 333 260 329 260 322 Z"},
    {id:"pawToeM",n:3,label:[291,315],d:"M281 315 C281 308 286 303 292 303 C298 303 303 308 303 315 C303 322 298 326 292 326 C286 326 281 322 281 315 Z"},
    {id:"pawToeR",n:3,label:[313,323],d:"M302 322 C302 315 307 310 313 310 C319 310 324 315 324 322 C324 329 319 333 313 333 C307 333 302 329 302 322 Z"},
    {id:"armL",n:1,label:[210,330],d:"M239 278 C211 286 193 309 188 336 C184 357 199 373 216 367 C232 361 239 341 246 320 Z"},
    {id:"armR",n:1,label:[368,330],d:"M343 280 C371 290 388 314 390 340 C392 359 376 372 360 366 C345 360 341 339 334 320 Z"},
    {id:"legL",n:1,label:[252,438],d:"M248 389 C230 401 223 428 229 450 C235 473 267 480 278 455 C287 435 278 407 264 394 Z"},
    {id:"legR",n:1,label:[316,438],d:"M323 392 C340 407 347 432 340 454 C332 477 300 480 290 456 C282 434 291 407 306 394 Z"},
    {id:"tailA",n:2,label:[405,345],d:"M347 340 C387 343 416 329 428 302 C437 281 440 269 452 266 C466 263 477 278 469 290 C461 301 450 307 441 309 C432 346 402 373 359 379 Z"},
    {id:"tailB",n:5,label:[456,281],d:"M437 269 C445 255 461 251 472 261 C483 272 479 289 466 296 C454 303 440 295 437 282 Z"},
    {id:"cloudA",n:3,label:[392,92],d:"M353 68 C365 47 392 47 404 65 C421 53 445 61 447 81 C468 81 477 102 462 116 H348 C331 106 334 81 353 68 Z"},
    {id:"cloudB",n:7,label:[438,120],d:"M409 106 C418 89 438 89 447 103 C460 94 477 102 478 116 C491 118 494 133 484 142 H404 C393 135 396 117 409 106 Z"},
    {id:"flowerL",n:4,label:[94,388],d:"M64 383 C52 365 63 348 79 355 C84 336 107 336 112 355 C130 346 144 365 132 380 C147 393 138 413 118 409 C113 429 87 428 83 409 C63 416 49 397 64 383 Z"},
    {id:"flowerR",n:8,label:[442,395],d:"M409 391 C396 373 407 356 424 363 C429 344 453 344 458 363 C476 354 489 373 477 388 C493 400 483 422 463 417 C458 437 432 436 428 417 C408 424 394 405 409 391 Z"}
   ]
  },
  rocket:{
   title:"Rakete",
   regions:[
    {id:"skyA",n:3,label:[80,70],d:"M18 18 H482 V110 C430 98 390 101 350 115 C305 130 267 130 226 116 C179 100 136 102 95 116 C67 126 43 128 18 121 Z"},
    {id:"skyB",n:7,label:[420,145],d:"M18 110 C88 95 147 104 205 121 C268 140 326 140 382 122 C425 108 456 110 482 117 V220 C420 203 362 210 309 223 C247 239 188 235 128 219 C86 208 50 208 18 215 Z"},
    {id:"ground",n:4,label:[70,430],d:"M18 340 C105 325 175 365 245 350 C330 331 404 315 482 340 V482 H18 Z"},
    {id:"bodyA",n:1,label:[250,245],d:"M250 80 C305 128 330 194 318 270 C311 316 286 355 250 388 C214 355 189 316 182 270 C170 194 195 128 250 80 Z"},
    {id:"bodyB",n:6,label:[250,285],d:"M188 260 C228 275 273 275 312 260 C310 292 299 319 283 343 C261 351 239 351 217 343 C201 319 190 292 188 260 Z"},
    {id:"bodyPatch",n:8,label:[250,330],d:"M211 315 C238 326 265 326 290 317 C280 345 265 365 250 380 C235 365 220 345 211 315 Z"},
    {id:"nose",n:2,label:[250,120],d:"M250 80 C276 104 294 128 306 155 C270 143 230 143 194 155 C206 128 224 104 250 80 Z"},
    {id:"windowOuter",n:3,label:[250,205],d:"M216 190 C216 168 232 153 250 153 C268 153 284 168 284 190 C284 212 268 227 250 227 C232 227 216 212 216 190 Z"},
    {id:"windowInner",n:5,label:[250,190],d:"M230 190 C230 177 239 168 250 168 C261 168 270 177 270 190 C270 203 261 212 250 212 C239 212 230 203 230 190 Z"},
    {id:"finL",n:2,label:[182,305],d:"M188 260 C150 280 126 324 132 370 C158 353 181 337 205 314 Z"},
    {id:"finR",n:2,label:[318,305],d:"M312 260 C350 280 374 324 368 370 C342 353 319 337 295 314 Z"},
    {id:"flameA",n:4,label:[250,410],d:"M222 365 C235 390 224 421 250 455 C276 421 265 390 278 365 C262 378 238 378 222 365 Z"},
    {id:"flameB",n:6,label:[250,420],d:"M239 379 C245 398 241 414 250 435 C259 414 255 398 261 379 C254 384 246 384 239 379 Z"},
    {id:"flameC",n:8,label:[250,438],d:"M246 395 C248 407 246 420 250 429 C254 420 252 407 254 395 Z"},
    {id:"planetA",n:4,label:[420,180],d:"M374 180 C374 153 394 134 420 134 C446 134 466 153 466 180 C466 207 446 226 420 226 C394 226 374 207 374 180 Z"},
    {id:"planetRing",n:5,label:[420,180],d:"M365 177 C385 162 459 162 478 177 C462 187 438 192 420 192 C402 192 379 187 365 177 Z"},
    {id:"planetSpot",n:8,label:[435,165],d:"M425 151 C437 148 447 155 449 166 C451 177 443 186 432 186 C421 186 413 177 414 166 C415 159 419 154 425 151 Z"},
    {id:"starL",n:2,label:[100,190],d:"M100 150 L111 179 L143 181 L118 200 L126 232 L100 214 L74 232 L82 200 L57 181 L89 179 Z"},
    {id:"starR",n:2,label:[405,82],d:"M405 50 L414 72 L438 74 L419 89 L425 113 L405 100 L385 113 L391 89 L372 74 L396 72 Z"},
    {id:"moon",n:7,label:[95,95],d:"M75 64 C99 49 124 60 129 82 C111 74 94 81 89 99 C84 116 91 130 106 139 C82 144 58 128 54 105 C51 87 58 74 75 64 Z"}
   ]
  },
  dino:{
   title:"Dinosaurier",
   regions:[
    {id:"skyA",n:3,label:[80,70],d:"M18 18 H482 V110 C430 98 390 102 350 115 C305 130 267 131 225 116 C178 100 136 103 95 117 C67 126 43 128 18 121 Z"},
    {id:"skyB",n:7,label:[420,220],d:"M18 110 C88 96 148 104 205 121 C267 140 326 140 382 123 C425 109 456 111 482 118 V282 C420 263 360 276 300 290 C220 310 130 305 18 282 Z"},
    {id:"ground",n:4,label:[85,435],d:"M18 282 C115 260 180 315 260 292 C335 270 410 260 482 288 V482 H18 Z"},
    {id:"groundPatch",n:8,label:[405,430],d:"M250 292 C335 270 410 260 482 288 V482 H315 C330 430 313 360 250 292 Z"},
    {id:"bodyA",n:1,label:[270,300],d:"M180 250 C205 215 260 198 318 218 C365 235 390 278 380 330 C370 380 325 410 272 405 C220 400 177 365 170 320 C166 292 169 268 180 250 Z"},
    {id:"bodyB",n:6,label:[282,340],d:"M231 278 C260 257 307 260 334 287 C357 310 355 352 326 374 C296 397 248 386 227 350 C211 323 214 297 231 278 Z"},
    {id:"bodySpot",n:8,label:[325,305],d:"M309 280 C329 276 347 288 349 307 C351 325 336 338 317 336 C300 334 290 319 293 303 C296 291 301 284 309 280 Z"},
    {id:"headA",n:1,label:[145,205],d:"M90 166 C117 135 165 132 197 158 C229 184 229 227 200 250 C168 275 118 268 91 238 C70 214 71 188 90 166 Z"},
    {id:"snout",n:5,label:[105,225],d:"M82 205 C105 194 139 197 157 216 C171 231 164 251 144 260 C119 271 91 260 80 242 C72 229 73 214 82 205 Z"},
    {id:"headSpot",n:8,label:[160,180],d:"M147 164 C163 157 181 163 187 177 C193 192 184 207 168 211 C153 215 139 205 136 190 C134 179 138 170 147 164 Z"},
    {id:"tail",n:1,label:[420,285],d:"M358 258 C413 217 467 224 480 252 C454 256 432 270 415 294 C400 315 382 323 358 314 Z"},
    {id:"legL",n:2,label:[225,420],d:"M214 373 C198 395 196 431 210 453 C224 473 253 468 258 445 C262 424 250 398 237 380 Z"},
    {id:"legR",n:2,label:[330,420],d:"M322 372 C342 392 353 424 346 448 C338 474 307 474 297 450 C288 428 299 397 309 379 Z"},
    {id:"platesA",n:4,label:[230,205],d:"M190 228 L205 184 L230 217 L252 172 L274 216 L299 178 L313 225 Z"},
    {id:"platesB",n:5,label:[325,230],d:"M302 226 L325 190 L344 226 L365 202 L375 244 Z"},
    {id:"platesC",n:7,label:[375,245],d:"M353 238 L373 207 L390 244 L410 225 L417 260 Z"},
    {id:"sun",n:4,label:[410,90],d:"M410 50 C433 50 450 67 450 90 C450 113 433 130 410 130 C387 130 370 113 370 90 C370 67 387 50 410 50 Z"},
    {id:"plantL",n:4,label:[75,355],d:"M45 395 C48 350 62 326 81 312 C84 340 82 365 75 395 C93 360 113 342 132 339 C121 368 102 386 80 401 Z"},
    {id:"rock",n:6,label:[425,385],d:"M386 410 C390 378 411 361 436 365 C460 369 474 388 469 415 Z"}
   ]
  },
  unicorn:{
   title:"Einhorn",
   regions:[
    {id:"skyA",n:3,label:[70,70],d:"M18 18 H482 V110 C430 98 390 102 350 115 C305 130 267 131 225 116 C178 100 136 103 95 117 C67 126 43 128 18 121 Z"},
    {id:"skyB",n:7,label:[420,220],d:"M18 110 C88 96 148 104 205 121 C267 140 326 140 382 123 C425 109 456 111 482 118 V294 C405 276 350 286 290 300 C215 318 130 314 18 294 Z"},
    {id:"ground",n:4,label:[70,430],d:"M18 294 C100 275 165 318 250 301 C335 284 412 274 482 300 V482 H18 Z"},
    {id:"groundPatch",n:8,label:[405,430],d:"M250 301 C335 284 412 274 482 300 V482 H315 C333 426 314 360 250 301 Z"},
    {id:"bodyA",n:1,label:[280,300],d:"M185 250 C220 222 278 217 330 236 C374 252 397 288 390 329 C382 372 342 397 291 397 C238 397 190 373 176 335 C163 300 168 271 185 250 Z"},
    {id:"bodyB",n:6,label:[285,340],d:"M220 290 C250 270 302 270 338 291 C358 303 366 329 354 350 C336 380 293 387 257 374 C228 364 210 335 220 290 Z"},
    {id:"bodyPatch",n:8,label:[330,300],d:"M305 267 C330 264 354 279 360 301 C366 324 351 344 328 348 C306 352 287 339 281 319 C275 298 285 275 305 267 Z"},
    {id:"headA",n:1,label:[165,210],d:"M105 170 C130 139 175 135 207 157 C238 180 242 217 217 244 C189 274 139 274 108 247 C84 226 82 194 105 170 Z"},
    {id:"muzzle",n:5,label:[135,232],d:"M103 218 C126 204 158 208 177 227 C189 240 184 257 167 266 C143 278 113 267 101 249 C94 238 94 226 103 218 Z"},
    {id:"maneA",n:2,label:[210,175],d:"M174 147 C201 119 231 129 237 155 C259 142 277 161 267 181 C248 211 226 229 205 245 C209 213 197 181 174 147 Z"},
    {id:"maneB",n:6,label:[225,205],d:"M205 158 C224 145 246 151 252 171 C260 190 244 214 220 232 C225 202 219 180 205 158 Z"},
    {id:"maneC",n:8,label:[240,180],d:"M223 151 C239 150 253 159 256 174 C258 188 249 201 237 211 C240 188 235 169 223 151 Z"},
    {id:"tailA",n:2,label:[410,315],d:"M374 286 C420 262 462 280 468 315 C442 311 423 322 407 345 C391 365 369 367 346 355 C372 342 383 318 374 286 Z"},
    {id:"tailB",n:6,label:[445,315],d:"M405 290 C434 282 457 294 462 315 C440 315 423 327 411 345 C399 356 387 358 375 353 C395 336 405 315 405 290 Z"},
    {id:"tailC",n:8,label:[430,345],d:"M417 315 C436 311 449 321 449 335 C439 336 427 342 419 351 C411 359 402 362 394 359 C405 347 412 332 417 315 Z"},
    {id:"horn",n:4,label:[158,118],d:"M144 159 L157 83 L177 160 Z"},
    {id:"legL",n:1,label:[238,420],d:"M225 374 C217 401 218 438 230 459 H259 C265 430 260 402 250 377 Z"},
    {id:"legR",n:1,label:[330,420],d:"M317 374 C311 402 314 438 326 458 H355 C359 429 351 399 342 377 Z"},
    {id:"cloud",n:3,label:[405,100],d:"M355 93 C365 67 393 62 409 81 C425 60 455 71 457 96 C478 97 483 121 466 132 H348 C329 120 334 99 355 93 Z"},
    {id:"star",n:4,label:[85,180],d:"M85 145 L95 170 L122 172 L101 189 L107 216 L85 201 L63 216 L69 189 L48 172 L75 170 Z"}
   ]
  },
  tractor:{
   title:"Traktor",
   regions:[
    {id:"skyA",n:3,label:[80,70],d:"M18 18 H482 V110 C430 98 390 102 350 115 C305 130 267 131 225 116 C178 100 136 103 95 117 C67 126 43 128 18 121 Z"},
    {id:"skyB",n:7,label:[420,220],d:"M18 110 C88 96 148 104 205 121 C267 140 326 140 382 123 C425 109 456 111 482 118 V285 C420 270 350 279 295 292 C210 312 125 307 18 286 Z"},
    {id:"fieldA",n:4,label:[80,430],d:"M18 286 C110 270 175 312 255 296 C342 278 415 270 482 296 V482 H18 Z"},
    {id:"fieldB",n:8,label:[405,430],d:"M252 296 C342 278 415 270 482 296 V482 H318 C333 430 314 361 252 296 Z"},
    {id:"bodyA",n:1,label:[255,302],d:"M145 260 H346 C374 260 395 280 395 308 V350 H137 V282 C137 270 140 264 145 260 Z"},
    {id:"bodyB",n:6,label:[170,292],d:"M110 274 H224 V344 H110 Z"},
    {id:"grille",n:5,label:[120,310],d:"M110 290 H142 V335 H110 Z"},
    {id:"hoodStripe",n:8,label:[190,315],d:"M160 290 H210 V335 H160 Z"},
    {id:"cabin",n:2,label:[290,210],d:"M228 152 H342 L368 260 H224 Z"},
    {id:"windowA",n:3,label:[292,205],d:"M247 172 H324 L340 240 H244 Z"},
    {id:"windowB",n:7,label:[315,210],d:"M286 172 H324 L340 240 H300 Z"},
    {id:"wheelL",n:2,label:[178,386],d:"M118 386 C118 349 144 323 178 323 C212 323 238 349 238 386 C238 423 212 449 178 449 C144 449 118 423 118 386 Z"},
    {id:"wheelLHub",n:6,label:[178,386],d:"M150 386 C150 369 162 357 178 357 C194 357 206 369 206 386 C206 403 194 415 178 415 C162 415 150 403 150 386 Z"},
    {id:"wheelLCore",n:8,label:[178,386],d:"M166 386 C166 378 171 373 178 373 C185 373 190 378 190 386 C190 394 185 399 178 399 C171 399 166 394 166 386 Z"},
    {id:"wheelR",n:2,label:[366,390],d:"M302 390 C302 350 330 322 366 322 C402 322 430 350 430 390 C430 430 402 458 366 458 C330 458 302 430 302 390 Z"},
    {id:"wheelRHub",n:6,label:[366,390],d:"M335 390 C335 371 348 358 366 358 C384 358 397 371 397 390 C397 409 384 422 366 422 C348 422 335 409 335 390 Z"},
    {id:"wheelRCore",n:8,label:[366,390],d:"M352 390 C352 381 358 375 366 375 C374 375 380 381 380 390 C380 399 374 405 366 405 C358 405 352 399 352 390 Z"},
    {id:"exhaust",n:4,label:[178,200],d:"M165 150 H190 V260 H165 Z"},
    {id:"sun",n:4,label:[420,90],d:"M420 52 C442 52 459 69 459 91 C459 113 442 130 420 130 C398 130 381 113 381 91 C381 69 398 52 420 52 Z"},
    {id:"barn",n:7,label:[70,220],d:"M32 197 L83 153 L134 197 V275 H32 Z"}
   ]
  },
  fish:{
   title:"Unterwasser",
   regions:[
    {id:"waterA",n:3,label:[75,70],d:"M18 18 H482 V110 C430 98 390 102 350 115 C305 130 267 131 225 116 C178 100 136 103 95 117 C67 126 43 128 18 121 Z"},
    {id:"waterB",n:7,label:[420,230],d:"M18 110 C88 96 148 104 205 121 C267 140 326 140 382 123 C425 109 456 111 482 118 V355 C420 340 355 350 295 360 C215 375 130 368 18 352 Z"},
    {id:"sandA",n:4,label:[75,440],d:"M18 352 C105 338 180 380 255 365 C335 350 410 340 482 364 V482 H18 Z"},
    {id:"sandB",n:8,label:[410,430],d:"M250 365 C335 350 410 340 482 364 V482 H320 C337 431 317 390 250 365 Z"},
    {id:"fishBody",n:1,label:[250,245],d:"M150 245 C185 185 270 168 338 205 C373 224 391 248 392 263 C382 281 359 299 329 311 C259 339 183 315 150 263 Z"},
    {id:"fishStripeA",n:6,label:[275,250],d:"M244 185 C269 180 296 184 318 195 C304 226 304 279 320 312 C295 322 269 325 244 319 C258 280 258 224 244 185 Z"},
    {id:"fishStripeB",n:8,label:[300,250],d:"M275 183 C292 184 307 188 318 195 C311 216 309 286 320 312 C305 317 292 320 279 321 C289 282 287 222 275 183 Z"},
    {id:"tailA",n:2,label:[115,245],d:"M152 220 C121 191 83 185 58 202 C81 221 91 244 58 279 C88 293 124 281 153 258 Z"},
    {id:"tailB",n:5,label:[100,245],d:"M130 225 C108 209 88 207 75 213 C91 229 95 244 77 267 C94 273 112 265 131 253 Z"},
    {id:"finTop",n:2,label:[265,175],d:"M229 195 C248 157 280 142 309 153 C298 173 287 192 277 211 Z"},
    {id:"finBottom",n:2,label:[275,322],d:"M246 309 C269 345 306 354 331 333 C310 321 292 307 278 290 Z"},
    {id:"eyePatch",n:4,label:[342,236],d:"M318 224 C329 209 352 208 365 222 C379 237 376 260 359 270 C342 281 320 271 313 253 C309 242 311 232 318 224 Z"},
    {id:"coralA",n:2,label:[412,400],d:"M386 453 C390 415 383 387 393 364 C403 387 403 409 407 425 C415 392 430 370 445 359 C441 390 434 415 430 452 Z"},
    {id:"coralB",n:6,label:[445,410],d:"M421 452 C423 420 420 398 429 382 C438 400 438 419 441 433 C448 410 457 394 468 384 C466 412 458 433 457 452 Z"},
    {id:"coralC",n:8,label:[430,390],d:"M414 430 C417 404 414 388 421 376 C428 389 430 403 430 417 C436 399 443 386 452 378 C451 398 447 417 445 430 Z"},
    {id:"weed",n:4,label:[90,400],d:"M70 452 C69 411 59 384 68 355 C80 377 82 402 84 424 C91 392 104 367 119 353 C117 390 108 419 105 452 Z"},
    {id:"bubble1",n:3,label:[400,125],d:"M370 125 C370 108 383 95 400 95 C417 95 430 108 430 125 C430 142 417 155 400 155 C383 155 370 142 370 125 Z"},
    {id:"bubble2",n:7,label:[442,190],d:"M421 190 C421 178 430 169 442 169 C454 169 463 178 463 190 C463 202 454 211 442 211 C430 211 421 202 421 190 Z"},
    {id:"shell",n:4,label:[185,420],d:"M156 438 C163 405 185 384 210 390 C235 396 246 421 234 447 H156 Z"}
   ]
  }
 };
 const useSchwerRealNumberBoard=numberDifficulty==="schwer"&&!!numberRealBoardsSchwer[numberThemeId];
 const activeSchwerRealNumberBoard=useSchwerRealNumberBoard?numberRealBoardsSchwer[numberThemeId]:null;
 const activeRealNumberBoard=useSchwerRealNumberBoard?activeSchwerRealNumberBoard:(useMittelRealNumberBoard?activeMittelRealNumberBoard:(numberRealBoards[numberThemeId]||numberRealBoards.malino));
 const activeRealNumberRegions=activeRealNumberBoard.regions;
 const useRealNumberBoard=numberDifficulty==="leicht"||useMittelRealNumberBoard||useSchwerRealNumberBoard;
 const realNumberDone=useRealNumberBoard&&numberPainted.length===activeRealNumberRegions.length;
 const useImageNumberBoard=false;
 const useFloodNumberBoard=numberThemeId==="malino"&&numberDifficulty==="leicht";
 const malinoImageMasks=[
  // Tło — osobne, nie nachodzi na postać
  {id:"treeCrown",baseN:8,label:[100,80],d:"M0 0 H260 C270 70 238 132 176 153 C120 171 54 155 0 124 Z"},
  {id:"treeTrunk",baseN:4,label:[55,280],d:"M0 120 C35 116 70 126 102 151 L92 430 L0 430 Z"},
  {id:"skyLeft",baseN:7,label:[155,250],d:"M105 145 C165 165 220 154 268 136 L280 330 C226 348 166 360 104 344 Z"},
  {id:"skyRight",baseN:7,label:[625,250],d:"M542 92 H720 V360 C664 350 610 348 552 360 L520 160 Z"},
  {id:"bushLeft",baseN:3,label:[105,430],d:"M0 344 C48 326 94 332 126 362 C158 338 204 348 229 384 L216 515 H0 Z"},
  {id:"bushRight",baseN:3,label:[625,430],d:"M540 350 C575 328 616 336 642 366 C670 340 704 351 720 375 V520 L550 520 Z"},
  {id:"groundLeft",baseN:5,label:[110,675],d:"M0 515 C105 485 190 498 252 545 L214 803 H0 Z"},
  {id:"path",baseN:6,label:[395,710],d:"M252 545 C315 510 408 515 476 555 C526 602 560 694 579 803 H202 C221 711 235 620 252 545 Z"},
  {id:"groundRight",baseN:5,label:[650,675],d:"M477 548 C551 500 646 495 720 520 V803 H578 C557 694 526 603 477 548 Z"},

  // Grzywa — kosmyki prowadzone po faktycznych granicach
  {id:"maneOrange",baseN:4,label:[300,88],d:"M272 34 C302 8 335 11 360 37 C350 74 333 110 309 145 C283 134 268 91 272 34 Z"},
  {id:"maneYellow",baseN:1,label:[365,82],d:"M334 24 C369 2 405 8 429 36 C417 77 400 112 376 151 C348 132 333 88 334 24 Z"},
  {id:"manePink",baseN:2,label:[430,88],d:"M404 27 C443 7 480 20 500 51 C488 91 469 123 445 153 C417 132 401 88 404 27 Z"},
  {id:"manePurple",baseN:3,label:[493,108],d:"M472 48 C509 29 547 45 563 76 C550 111 532 142 510 168 C485 151 470 108 472 48 Z"},
  {id:"maneBlue",baseN:3,label:[548,154],d:"M528 91 C566 76 600 98 612 132 C600 169 580 201 557 226 C534 205 522 161 528 91 Z"},
  {id:"maneLeftTop",baseN:4,label:[255,180],d:"M220 118 C251 91 282 107 298 139 L280 205 C251 218 226 199 214 169 Z"},
  {id:"maneLeftMid",baseN:3,label:[238,272],d:"M195 190 C229 164 263 181 278 214 C273 260 255 300 230 336 C198 345 176 317 179 283 Z"},
  {id:"maneLeftLow",baseN:3,label:[250,355],d:"M205 302 C234 282 265 297 280 327 L272 395 C241 420 207 399 195 366 Z"},
  {id:"maneRightTop",baseN:3,label:[570,250],d:"M514 172 C550 145 591 164 605 199 C608 239 598 275 580 306 C550 323 520 304 509 273 Z"},
  {id:"maneRightLow",baseN:3,label:[560,350],d:"M503 286 C539 267 579 285 594 320 C594 365 580 405 554 432 C522 437 497 409 493 376 Z"},

  // Głowa i uszy — mniejsze maski, bez grzywy
  {id:"earLeft",baseN:1,label:[257,225],d:"M230 177 C246 158 270 160 282 181 C288 203 275 229 253 238 C232 235 220 211 224 190 C225 184 227 180 230 177 Z"},
  {id:"earRight",baseN:1,label:[522,230],d:"M495 181 C513 159 539 162 551 184 C558 207 544 233 522 242 C500 239 488 215 490 195 C491 189 492 185 495 181 Z"},
  {id:"face",baseN:1,label:[386,272],d:"M304 158 C333 136 369 129 405 136 C450 145 480 178 486 225 C493 279 469 329 428 351 C387 373 338 365 306 336 C276 308 266 261 276 218 C281 194 291 174 304 158 Z"},

  // Tułów i ubranie
  {id:"shirtLeft",baseN:6,label:[302,432],d:"M275 383 C296 370 320 372 338 388 L334 441 C315 451 292 448 272 434 Z"},
  {id:"shirtRight",baseN:6,label:[465,432],d:"M431 388 C450 370 476 371 496 388 L505 434 C486 449 461 454 440 445 Z"},
  {id:"bib",baseN:2,label:[385,510],d:"M322 445 C353 436 411 436 445 447 L452 568 C417 589 351 590 316 570 Z"},
  {id:"shortsLeft",baseN:2,label:[330,620],d:"M307 574 C332 562 360 568 377 588 L366 695 C343 706 315 700 299 684 Z"},
  {id:"shortsRight",baseN:2,label:[438,620],d:"M394 588 C412 568 440 564 465 576 L481 685 C462 702 434 707 410 696 Z"},

  // Ręce i łapy — precyzyjniej przy ciele
  {id:"armLeft",baseN:1,label:[242,500],d:"M222 423 C237 411 253 409 265 418 C271 432 268 450 259 466 C248 486 239 505 229 519 C213 522 202 510 198 494 C193 471 202 440 222 423 Z"},
  {id:"pawLeft",baseN:1,label:[286,468],d:"M259 428 C275 417 294 422 304 437 C310 452 303 470 289 481 C274 486 260 477 255 464 C251 451 253 438 259 428 Z"},
  {id:"armRight",baseN:1,label:[533,500],d:"M500 420 C515 407 532 408 545 420 C562 438 571 467 565 490 C559 510 546 522 531 521 C519 507 510 490 503 473 C495 453 493 435 500 420 Z"},
  {id:"pawRight",baseN:1,label:[486,468],d:"M462 435 C474 420 493 418 507 429 C516 440 518 453 515 465 C511 480 497 489 482 486 C468 479 459 463 458 449 C458 443 459 439 462 435 Z"},

  // Stopy
  {id:"footLeft",baseN:1,label:[320,752],d:"M267 690 C294 672 333 676 355 699 C369 724 360 763 334 786 C307 805 268 798 249 774 C233 750 241 714 267 690 Z"},
  {id:"footRight",baseN:1,label:[452,752],d:"M407 699 C429 675 469 671 496 690 C522 713 531 749 515 774 C496 799 457 805 430 786 C403 764 394 724 407 699 Z"},

  // Ogon
  {id:"tailStem",baseN:1,label:[603,590],d:"M511 548 C540 568 566 570 588 555 C608 541 614 514 625 487 C634 466 651 454 668 460 C681 472 677 490 664 505 C647 524 644 548 635 572 C620 606 588 625 558 616 C536 608 520 586 511 548 Z"},
  {id:"tailOrange",baseN:4,label:[650,455],d:"M610 424 C626 398 651 386 675 392 C688 410 682 435 665 455 C647 471 626 477 609 464 C600 451 601 437 610 424 Z"},
  {id:"tailPink",baseN:2,label:[676,438],d:"M654 391 C678 380 704 390 713 412 C717 434 703 454 682 469 C666 474 652 465 646 451 C643 431 647 409 654 391 Z"},
  {id:"tailPurple",baseN:3,label:[663,475],d:"M625 455 C646 445 670 453 680 471 C677 494 660 510 638 517 C619 511 610 495 613 478 Z"},

  // Elementy dolnego tła
  {id:"flowerLeft",baseN:6,label:[65,650],d:"M18 592 C40 565 76 563 98 586 C122 596 126 625 108 643 C99 672 65 682 40 665 C11 658 2 621 18 592 Z"},
  {id:"flowerRight",baseN:6,label:[686,650],d:"M632 588 C655 563 690 565 711 589 C726 609 722 638 702 650 C690 675 657 680 636 661 C615 646 613 611 632 588 Z"},
  {id:"rockLeft",baseN:5,label:[160,625],d:"M110 590 C136 561 181 562 205 590 C220 615 205 641 177 650 H115 C94 635 92 610 110 590 Z"}
 ];
 const activeImageNumberMasks=useMemo(()=>{
  const colors=activeNumberDifficulty.colors;
  return malinoImageMasks.map(mask=>({...mask,n:((mask.baseN-1)%colors)+1}));
 },[numberDifficulty]);
 const imageNumberDone=useImageNumberBoard&&numberPainted.length===activeImageNumberMasks.length;









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
 const setHiddenSolved=value=>updateProfileField("hiddenSolved",value);
 const setDailyStreak=value=>updateProfileField("dailyStreak",value);
 const setLastDailyDate=value=>updateProfileField("lastDailyDate",value);

 const paintNumberCell=(cell,totalOverride)=>{
  if(numberPainted.includes(cell.id))return;
  if(cell.n!==selectedNumber){playSound("click");return}
  const next=[...numberPainted,cell.id];
  setNumberPainted(next);
  playSound("success");
  const total=totalOverride||numberCells.length;
  if(next.length===total){setStars(stars+3);playSound("stars")}
 };
 const saveNumberArt=()=>{
  const item={id:`number-${Date.now()}`,themeId:numberThemeId,difficulty:numberDifficulty,painted:numberPainted,createdAt:new Date().toISOString()};
  setSavedNumberArt([item,...savedNumberArt].slice(0,18));playSound("success");
 };
 const openSavedNumberArt=item=>{
  setCraftMode("numbers");setNumberThemeId(item.themeId);setNumberDifficulty(item.difficulty);setNumberPainted(item.painted||[]);playSound("click");
 };
 const shareNumberPdf=()=>{
  if(typeof window==="undefined")return;
  try{
   const W=1240,H=1754,c=document.createElement("canvas");c.width=W;c.height=H;const x=c.getContext("2d");if(!x)return;
   x.fillStyle="#fff";x.fillRect(0,0,W,H);x.textAlign="center";x.fillStyle="#173d78";x.font="800 38px system-ui";x.fillText(`🎨 Malen nach Zahlen – ${activeNumberTheme.title}`,W/2,90);
   x.fillStyle="#66778c";x.font="500 20px system-ui";x.fillText(`${activeNumberDifficulty.label} · Male jedes Feld in der Farbe seiner Nummer aus.`,W/2,135);
   let paletteY=0;
   if(useRealNumberBoard&&typeof Path2D!=="undefined"){
    const bx=170,by=210,scale=1.8;
    x.save();x.translate(bx,by);x.scale(scale,scale);
    x.fillStyle="#fff";x.fillRect(8,8,484,484);
    x.strokeStyle="#173d78";x.lineWidth=3;x.strokeRect(8,8,484,484);
    activeRealNumberRegions.forEach(region=>{
     const p=new Path2D(region.d);
     x.fillStyle="#fff";x.fill(p);
     x.strokeStyle="#173d78";x.lineWidth=3;x.stroke(p);
     x.fillStyle="#173d78";x.font="800 16px system-ui";x.textAlign="center";
     x.fillText(String(region.n),region.label[0],region.label[1]);
    });
    x.restore();
    paletteY=by+500*scale+55;
   }else{
    const cols=activeNumberDifficulty.cols,rows=activeNumberDifficulty.rows,size=Math.min(900/cols,1050/rows),bw=cols*size,bh=rows*size,bx=(W-bw)/2,by=220;
    numberCells.forEach((cell,i)=>{const col=i%cols,row=(i/cols)|0,xx=bx+col*size,yy=by+row*size;x.fillStyle="#fff";x.fillRect(xx,yy,size,size);x.strokeStyle="#718096";x.lineWidth=2;x.strokeRect(xx,yy,size,size);x.fillStyle="#42546b";x.font=`700 ${Math.max(18,size*.18)}px system-ui`;x.textAlign="center";x.fillText(String(cell.n),xx+size/2,yy+size/2+8)});
    paletteY=by+bh+70;
   }
   x.fillStyle="#173d78";x.font="800 22px system-ui";x.textAlign="center";x.fillText("Farben:",W/2,paletteY);
   const n=activeNumberDifficulty.colors;
   for(let i=0;i<n;i++){const xx=W/2-(n-1)*55+i*110;x.fillStyle=numberPalette[i];x.beginPath();x.arc(xx,paletteY+55,30,0,Math.PI*2);x.fill();x.fillStyle="#173d78";x.font="800 18px system-ui";x.fillText(String(i+1),xx,paletteY+62)}
   x.fillStyle="#8a96a5";x.font="500 16px system-ui";x.fillText("Malino – kreative Spielzeit ohne Bildschirm",W/2,H-35);
   const data=c.toDataURL("image/jpeg",.95).split(",")[1],bin=atob(data),jpg=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)jpg[i]=bin.charCodeAt(i);
   const enc=new TextEncoder(),chunks=[];let off=0;const ofs=[0],add=d=>{const b=typeof d==="string"?enc.encode(d):d;chunks.push(b);off+=b.length},obj=(n,b)=>{ofs[n]=off;add(`${n} 0 obj\n${b}\nendobj\n`)};
   add("%PDF-1.4\n");obj(1,"<< /Type /Catalog /Pages 2 0 R >>");obj(2,"<< /Type /Pages /Kids [3 0 R] /Count 1 >>");obj(3,"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>");
   ofs[4]=off;add(`4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${W} /Height ${H} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpg.length} >>\nstream\n`);add(jpg);add("\nendstream\nendobj\n");const ct="q\n595.28 0 0 841.89 0 0 cm\n/Im0 Do\nQ\n";ofs[5]=off;add(`5 0 obj\n<< /Length ${ct.length} >>\nstream\n${ct}endstream\nendobj\n`);const xr=off;add("xref\n0 6\n0000000000 65535 f \n");for(let i=1;i<=5;i++)add(String(ofs[i]).padStart(10,"0")+" 00000 n \n");add(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xr}\n%%EOF`);const total=chunks.reduce((q,b)=>q+b.length,0),pdf=new Uint8Array(total);let p=0;chunks.forEach(b=>{pdf.set(b,p);p+=b.length});
   const blob=new Blob([pdf],{type:"application/pdf"}),file=new File([blob],`malino-malen-nach-zahlen-${numberThemeId}.pdf`,{type:"application/pdf"});
   if(navigator.share&&navigator.canShare?.({files:[file]}))navigator.share({files:[file],title:"Malino – Malen nach Zahlen"}).catch(()=>{});else{const u=URL.createObjectURL(blob),aa=document.createElement("a");aa.href=u;aa.download=file.name;aa.click();setTimeout(()=>URL.revokeObjectURL(u),120000)}
  }catch{}
 };

 const tapHiddenTarget=(item,index)=>{
  if(hiddenFound.includes(index))return;
  const next=[...hiddenFound,index];
  setHiddenFound(next);
  playSound("success");
  if(next.length>=hiddenTargets.length){
   setHiddenComplete(true);
   const firstTime=!hiddenSolved.includes(hiddenBoardKey);
   if(firstTime){
    setHiddenSolved([...hiddenSolved,hiddenBoardKey]);
    setStars(stars+3);
    playSound("stars");
   }
  }
 };

 const tapHiddenMiss=e=>{
  if(e.target?.closest?.(".hiddenObjectButton"))return;
  const id=Date.now();
  setHiddenMiss(id);
  playSound("click");
  setTimeout(()=>setHiddenMiss(current=>current===id?null:current),420);
 };

 const openSavedHidden=item=>{
  setCraftMode("hidden");setHiddenThemeId(item.themeId);setHiddenDifficulty(item.difficulty);setHiddenSeed(item.seed);
  setHiddenFound([]);setHiddenComplete(false);setHiddenMiss(null);
  playSound("click");
  setTimeout(()=>document.querySelector(".hiddenFlow")?.scrollIntoView({behavior:"smooth",block:"start"}),40);
 };
 const saveHidden=()=>{
  const item={id:`hidden-${Date.now()}`,themeId:activeHiddenTheme.id,title:activeHiddenTheme.title,difficulty:hiddenDifficulty,seed:hiddenSeed,createdAt:new Date().toISOString()};
  setSavedHidden([item,...savedHidden].slice(0,18));playSound("success");
 };
 const newHiddenVariant=()=>{setHiddenFound([]);setHiddenComplete(false);setHiddenMiss(null);setHiddenSeed(Math.floor(Date.now()%1000000000));playSound("click")};
 const shareHiddenPdf=()=>{
  if(typeof window==="undefined")return;
  try{
   const W=1240,H=1754,c=document.createElement("canvas");c.width=W;c.height=H;const x=c.getContext("2d");if(!x)return;
   x.fillStyle="#fff";x.fillRect(0,0,W,H);x.textAlign="center";
   x.fillStyle="#6a7d96";x.font="700 24px system-ui";x.fillText("MALINO · Basteln & Spielen",W/2,58);
   x.fillStyle="#173d78";x.font="800 38px system-ui";x.fillText(`🔍 Versteckte Dinge – ${activeHiddenTheme.title}`,W/2,108);
   x.fillStyle="#5c6e87";x.font="500 21px system-ui";x.fillText(`${activeHiddenDifficulty.label} · Finde ${activeHiddenDifficulty.count} Gegenstände.`,W/2,148);
   const px=130,py=210,pw=980,ph=1050;
   x.fillStyle="#f6fbf2";x.fillRect(px,py,pw,ph);x.strokeStyle="#173d78";x.lineWidth=4;x.strokeRect(px,py,pw,ph);
   const bg=activeHiddenTheme.bg.split(" ");
   bg.forEach((t,i)=>{const col=i%4,row=(i/4)|0;x.font="90px system-ui";x.fillText(t,px+125+col*245,py+170+row*280)});
   hiddenPlacements.forEach(p=>{x.save();x.translate(px+p.x/100*pw,py+p.y/100*ph);x.rotate(p.r*Math.PI/180);x.font=`${58*p.s}px system-ui`;x.fillText(p.item,0,0);x.restore()});
   x.fillStyle="#173d78";x.font="800 23px system-ui";x.fillText("Finde diese Gegenstände:",W/2,1325);
   hiddenTargets.forEach((t,i)=>{x.font="46px system-ui";x.fillText(t,250+i*(740/Math.max(1,hiddenTargets.length-1)),1395)});
   x.fillStyle="#8a96a5";x.font="500 16px system-ui";x.fillText("Malino – kreative Spielzeit ohne Bildschirm",W/2,H-35);
   const data=c.toDataURL("image/jpeg",.95).split(",")[1],bin=atob(data),jpg=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)jpg[i]=bin.charCodeAt(i);
   const enc=new TextEncoder(),chunks=[];let off=0;const ofs=[0],add=d=>{const b=typeof d==="string"?enc.encode(d):d;chunks.push(b);off+=b.length},obj=(n,b)=>{ofs[n]=off;add(`${n} 0 obj\n${b}\nendobj\n`)};
   add("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");obj(1,"<< /Type /Catalog /Pages 2 0 R >>");obj(2,"<< /Type /Pages /Kids [3 0 R] /Count 1 >>");obj(3,"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>");
   ofs[4]=off;add(`4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${W} /Height ${H} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpg.length} >>\nstream\n`);add(jpg);add("\nendstream\nendobj\n");
   const ct="q\n595.28 0 0 841.89 0 0 cm\n/Im0 Do\nQ\n";ofs[5]=off;add(`5 0 obj\n<< /Length ${ct.length} >>\nstream\n${ct}endstream\nendobj\n`);const xr=off;add("xref\n0 6\n0000000000 65535 f \n");for(let i=1;i<=5;i++)add(String(ofs[i]).padStart(10,"0")+" 00000 n \n");add(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xr}\n%%EOF`);
   const total=chunks.reduce((a,b)=>a+b.length,0),pdf=new Uint8Array(total);let pos=0;chunks.forEach(b=>{pdf.set(b,pos);pos+=b.length});
   const blob=new Blob([pdf],{type:"application/pdf"}),file=new File([blob],`malino-versteckte-dinge-${hiddenThemeId}-${hiddenDifficulty}.pdf`,{type:"application/pdf"});
   if(navigator.share&&navigator.canShare?.({files:[file]}))navigator.share({files:[file],title:`Malino – ${activeHiddenTheme.title}`,text:"Malino – Versteckte Dinge"}).catch(()=>{});
   else{const u=URL.createObjectURL(blob),a=document.createElement("a");a.href=u;a.download=file.name;a.target="_blank";a.rel="noopener";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),120000)}
  }catch{}
 };

 const openSavedDifference=item=>{
  setCraftMode("difference");
  setDifferenceThemeId(item.themeId);
  setDifferenceDifficulty(item.difficulty);
  setDifferenceSeed(item.seed);
  playSound("click");
  setTimeout(()=>document.querySelector(".differenceFlow")?.scrollIntoView({behavior:"smooth",block:"start"}),40);
 };

 const saveDifference=()=>{
  const item={
   id:`difference-${Date.now()}`,
   themeId:activeDifferenceTheme.id,
   title:activeDifferenceTheme.title,
   difficulty:differenceDifficulty,
   seed:differenceSeed,
   createdAt:new Date().toISOString()
  };
  setSavedDifferences([item,...savedDifferences].slice(0,18));
  playSound("success");
 };

 const newDifferenceVariant=()=>{
  setDifferenceSeed(Math.floor(Date.now()%1000000000));
  playSound("click");
 };

 const shareDifferencePdf=()=>{
  if(typeof window==="undefined")return;
  try{
   const W=1240,H=1754;
   const canvas=document.createElement("canvas");
   canvas.width=W;canvas.height=H;
   const ctx=canvas.getContext("2d");
   if(!ctx)return;
   ctx.fillStyle="#fff";ctx.fillRect(0,0,W,H);

   ctx.textAlign="center";
   ctx.fillStyle="#6a7d96";ctx.font="700 24px system-ui";
   ctx.fillText("MALINO · Basteln & Spielen",W/2,58);
   ctx.fillStyle="#173d78";ctx.font="800 38px system-ui";
   ctx.fillText(`🔎 Unterschiede finden – ${activeDifferenceTheme.title}`,W/2,108);
   ctx.fillStyle="#5c6e87";ctx.font="500 21px system-ui";
   ctx.fillText(`${activeDifferenceDifficulty.label} · Finde ${activeDifferenceDifficulty.count} Unterschiede.`,W/2,148);

   const panelW=500,panelH=780,gap=46,py=210;
   const leftX=(W-panelW*2-gap)/2,rightX=leftX+panelW+gap;

   const drawPanel=(x,tokens,label)=>{
    ctx.fillStyle="#fbfdff";ctx.fillRect(x,py,panelW,panelH);
    ctx.strokeStyle="#173d78";ctx.lineWidth=4;ctx.strokeRect(x,py,panelW,panelH);
    ctx.fillStyle="#173d78";ctx.font="800 22px system-ui";ctx.textAlign="center";
    ctx.fillText(label,x+panelW/2,py+40);

    const cols=3,rows=2,cellW=panelW/cols,cellH=(panelH-70)/rows;
    tokens.forEach((tok,i)=>{
     const cx=x+(i%cols)*cellW+cellW/2;
     const cy=py+85+((i/cols)|0)*cellH+cellH/2;
     ctx.font=`${Math.min(cellW,cellH)*.48}px system-ui`;
     ctx.fillText(tok,cx,cy);
    });
   };

   drawPanel(leftX,differenceTokens,"Bild A");
   drawPanel(rightX,changedDifferenceTokens,"Bild B");

   ctx.fillStyle="#6b7787";ctx.font="600 20px system-ui";
   ctx.fillText(`A4   •   ${activeDifferenceDifficulty.label}   •   ${activeDifferenceDifficulty.count} Unterschiede`,W/2,py+panelH+55);

   ctx.fillStyle="#173d78";ctx.font="800 22px system-ui";
   ctx.fillText("Kreise die Unterschiede auf Bild B ein.",W/2,py+panelH+100);

   ctx.fillStyle="#8a96a5";ctx.font="500 16px system-ui";
   ctx.fillText("Malino – kreative Spielzeit ohne Bildschirm",W/2,H-35);

   const jpegData=canvas.toDataURL("image/jpeg",0.95);
   const b64=jpegData.split(",")[1],bin=atob(b64),jpg=new Uint8Array(bin.length);
   for(let i=0;i<bin.length;i++)jpg[i]=bin.charCodeAt(i);

   const enc=new TextEncoder(),chunks=[];let offset=0;const offsets=[0];
   const add=data=>{const bytes=typeof data==="string"?enc.encode(data):data;chunks.push(bytes);offset+=bytes.length};
   const obj=(n,body)=>{offsets[n]=offset;add(`${n} 0 obj\n${body}\nendobj\n`)};

   add("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");
   obj(1,"<< /Type /Catalog /Pages 2 0 R >>");
   obj(2,"<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
   obj(3,"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>");
   offsets[4]=offset;
   add(`4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${W} /Height ${H} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpg.length} >>\nstream\n`);
   add(jpg);add("\nendstream\nendobj\n");
   const content="q\n595.28 0 0 841.89 0 0 cm\n/Im0 Do\nQ\n";
   offsets[5]=offset;add(`5 0 obj\n<< /Length ${content.length} >>\nstream\n${content}endstream\nendobj\n`);
   const xref=offset;add("xref\n0 6\n0000000000 65535 f \n");
   for(let i=1;i<=5;i++)add(String(offsets[i]).padStart(10,"0")+" 00000 n \n");
   add(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`);
   const total=chunks.reduce((sum,c)=>sum+c.length,0),pdf=new Uint8Array(total);let pos=0;
   chunks.forEach(c=>{pdf.set(c,pos);pos+=c.length});
   const blob=new Blob([pdf],{type:"application/pdf"});
   const file=new File([blob],`malino-unterschiede-${activeDifferenceTheme.id}-${differenceDifficulty}.pdf`,{type:"application/pdf"});
   if(navigator.share&&navigator.canShare?.({files:[file]})){
    navigator.share({files:[file],title:`Malino – ${activeDifferenceTheme.title}`,text:"Malino – Unterschiede finden"}).catch(()=>{});
   }else{
    const url=URL.createObjectURL(blob),a=document.createElement("a");
    a.href=url;a.download=file.name;a.target="_blank";a.rel="noopener";document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),120000);
   }
  }catch{}
 };

 const openSavedMaze=item=>{
  setCraftMode("maze");
  setMazeThemeId(item.themeId);
  setMazeDifficulty(item.difficulty);
  setMazeSeed(item.seed);
  playSound("click");
  setTimeout(()=>document.querySelector(".mazeFlow")?.scrollIntoView({behavior:"smooth",block:"start"}),40);
 };

 const saveMaze=()=>{
  const item={
   id:`maze-${Date.now()}`,
   themeId:activeMazeTheme.id,
   title:activeMazeTheme.title,
   difficulty:mazeDifficulty,
   seed:mazeSeed,
   createdAt:new Date().toISOString()
  };
  setSavedMazes([item,...savedMazes].slice(0,18));
  playSound("success");
 };

 const newMazeVariant=()=>{
  setMazeSeed(Math.floor(Date.now()%1000000000));
  playSound("click");
 };

 const shareMazePdf=()=>{
  if(typeof window==="undefined")return;
  try{
   const W=1240,H=1754;
   const canvas=document.createElement("canvas");
   canvas.width=W;canvas.height=H;
   const ctx=canvas.getContext("2d");
   if(!ctx)return;
   ctx.fillStyle="#fff";ctx.fillRect(0,0,W,H);

   ctx.textAlign="center";
   ctx.fillStyle="#6a7d96";ctx.font="700 24px system-ui";
   ctx.fillText("MALINO · Basteln & Spielen",W/2,58);
   ctx.fillStyle="#173d78";ctx.font="800 38px system-ui";
   ctx.fillText(`🌀 ${activeMazeTheme.title}`,W/2,108);
   ctx.fillStyle="#5c6e87";ctx.font="500 21px system-ui";
   ctx.fillText(`${activeMazeDifficulty.label} · ${activeMazeDifficulty.age} Jahre · Finde den Weg vom Start zum Ziel.`,W/2,148);

   const cols=activeMaze.cols,rows=activeMaze.rows;
   const maxW=980,maxH=1160;
   const cell=Math.min(maxW/cols,maxH/rows);
   const mw=cols*cell,mh=rows*cell;
   const mx=(W-mw)/2,my=205;

   ctx.fillStyle="#fff";ctx.fillRect(mx,my,mw,mh);
   ctx.strokeStyle="#173d78";ctx.lineWidth=Math.max(3,cell*.08);ctx.lineCap="round";
   activeMaze.cells.forEach((c,i)=>{
    const x=mx+(i%cols)*cell,y=my+((i/cols)|0)*cell;
    if(c.t){ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+cell,y);ctx.stroke()}
    if(c.r){ctx.beginPath();ctx.moveTo(x+cell,y);ctx.lineTo(x+cell,y+cell);ctx.stroke()}
    if(c.b){ctx.beginPath();ctx.moveTo(x,y+cell);ctx.lineTo(x+cell,y+cell);ctx.stroke()}
    if(c.l){ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y+cell);ctx.stroke()}
   });

   ctx.textAlign="center";
   ctx.font=`${Math.max(28,cell*.5)}px system-ui`;
   ctx.fillText(activeMazeTheme.start,mx+cell*.5,my+cell*.68);
   ctx.fillText(activeMazeTheme.end,mx+mw-cell*.5,my+mh-cell*.28);

   const infoY=my+mh+55;
   ctx.fillStyle="#6b7787";ctx.font="600 20px system-ui";
   ctx.fillText(`A4   •   ${activeMazeDifficulty.label}   •   Variante ${String(mazeSeed).slice(-4)}`,W/2,infoY);

   ctx.fillStyle="#173d78";ctx.font="800 24px system-ui";
   ctx.fillText(`${activeMazeTheme.start}  START      →      ZIEL  ${activeMazeTheme.end}`,W/2,infoY+55);

   ctx.fillStyle="#8a96a5";ctx.font="500 16px system-ui";
   ctx.fillText("Malino – kreative Spielzeit ohne Bildschirm",W/2,H-35);

   const jpegData=canvas.toDataURL("image/jpeg",0.95);
   const b64=jpegData.split(",")[1],bin=atob(b64),jpg=new Uint8Array(bin.length);
   for(let i=0;i<bin.length;i++)jpg[i]=bin.charCodeAt(i);

   const enc=new TextEncoder(),chunks=[];let offset=0;const offsets=[0];
   const add=data=>{const bytes=typeof data==="string"?enc.encode(data):data;chunks.push(bytes);offset+=bytes.length};
   const obj=(n,body)=>{offsets[n]=offset;add(`${n} 0 obj\n${body}\nendobj\n`)};

   add("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");
   obj(1,"<< /Type /Catalog /Pages 2 0 R >>");
   obj(2,"<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
   obj(3,"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>");
   offsets[4]=offset;
   add(`4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${W} /Height ${H} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpg.length} >>\nstream\n`);
   add(jpg);add("\nendstream\nendobj\n");
   const content="q\n595.28 0 0 841.89 0 0 cm\n/Im0 Do\nQ\n";
   offsets[5]=offset;add(`5 0 obj\n<< /Length ${content.length} >>\nstream\n${content}endstream\nendobj\n`);
   const xref=offset;add("xref\n0 6\n0000000000 65535 f \n");
   for(let i=1;i<=5;i++)add(String(offsets[i]).padStart(10,"0")+" 00000 n \n");
   add(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`);
   const total=chunks.reduce((sum,c)=>sum+c.length,0),pdf=new Uint8Array(total);let pos=0;
   chunks.forEach(c=>{pdf.set(c,pos);pos+=c.length});

   const blob=new Blob([pdf],{type:"application/pdf"});
   const file=new File([blob],`malino-labyrinth-${activeMazeTheme.id}-${mazeDifficulty}.pdf`,{type:"application/pdf"});
   if(navigator.share&&navigator.canShare?.({files:[file]})){
    navigator.share({files:[file],title:`Malino – ${activeMazeTheme.title}`,text:"Mein Malino-Labyrinth"}).catch(()=>{});
   }else{
    const url=URL.createObjectURL(blob),a=document.createElement("a");
    a.href=url;a.download=file.name;a.target="_blank";a.rel="noopener";document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),120000);
   }
  }catch{}
 };

 const openSavedCraftPuzzle=item=>{
  setCraftImageId(item.imageId);
  setCraftPieces(item.pieces);
  setCraftStyle(item.style);
  playSound("click");
  setTimeout(()=>document.querySelector(".craftFlow")?.scrollIntoView({behavior:"smooth",block:"start"}),40);
 };

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

  const img=new Image();
  img.crossOrigin="anonymous";
  img.onload=async()=>{
   try{
    const W=1240,H=1754;
    const canvas=document.createElement("canvas");
    canvas.width=W;canvas.height=H;
    const ctx=canvas.getContext("2d");
    if(!ctx)throw new Error("canvas");
    ctx.fillStyle="#fff";ctx.fillRect(0,0,W,H);

    ctx.textAlign="center";
    ctx.fillStyle="#6a7d96";
    ctx.font="700 24px system-ui";
    ctx.fillText("MALINO · Basteln & Spielen",W/2,55);
    ctx.fillStyle="#173d78";
    ctx.font="800 38px system-ui";
    ctx.fillText(`✂️ ${activeCraftTemplate.title} – ${craftPieces} Teile`,W/2,105);
    ctx.fillStyle="#5c6e87";
    ctx.font="500 22px system-ui";
    ctx.fillText("Entlang der gestrichelten Linien ausschneiden.",W/2,145);

    const maxW=900,maxH=1180;
    const ratio=activeCraftTemplate.w/activeCraftTemplate.h;
    let pw=maxW,ph=pw/ratio;
    if(ph>maxH){ph=maxH;pw=ph*ratio}
    const px=(W-pw)/2,py=190;

    ctx.fillStyle="#fff";ctx.fillRect(px,py,pw,ph);
    ctx.drawImage(img,px,py,pw,ph);
    ctx.strokeStyle="#173d78";
    ctx.lineWidth=4;
    ctx.strokeRect(px,py,pw,ph);

    const [cols,rows]=craftGrid;
    ctx.save();
    ctx.setLineDash([14,12]);
    ctx.lineWidth=3;
    ctx.strokeStyle="#20344e";
    for(let i=1;i<cols;i++){
     const x=px+pw*i/cols;
     ctx.beginPath();ctx.moveTo(x,py);ctx.lineTo(x,py+ph);ctx.stroke();
    }
    for(let i=1;i<rows;i++){
     const y=py+ph*i/rows;
     ctx.beginPath();ctx.moveTo(px,y);ctx.lineTo(px+pw,y);ctx.stroke();
    }
    ctx.restore();

    ctx.font="34px system-ui";
    ctx.fillText("✂️",px+26,py+38);
    ctx.fillText("✂️",px+pw-28,py+ph-18);

    const metaY=py+ph+45;
    ctx.fillStyle="#6b7787";
    ctx.font="600 20px system-ui";
    ctx.fillText(`A4   •   ${craftPieces} Teile   •   ${craftStyle==="bw"?"Schwarz-Weiß":"Bunt"}`,W/2,metaY);

    const sampleH=180;
    const sampleW=sampleH*ratio;
    const sy=metaY+55;
    const sx=W/2-220;
    ctx.drawImage(img,sx,sy,sampleW,sampleH);
    ctx.strokeStyle="#cdd6e2";ctx.lineWidth=2;ctx.strokeRect(sx,sy,sampleW,sampleH);
    ctx.textAlign="left";
    ctx.fillStyle="#173d78";ctx.font="800 24px system-ui";
    ctx.fillText("Vorlage",sx+sampleW+34,sy+58);
    ctx.fillStyle="#65758a";ctx.font="500 19px system-ui";
    ctx.fillText("So sieht das fertige",sx+sampleW+34,sy+94);
    ctx.fillText("Puzzle aus.",sx+sampleW+34,sy+124);

    ctx.textAlign="center";
    ctx.fillStyle="#8a96a5";ctx.font="500 16px system-ui";
    ctx.fillText("Malino – kreative Spielzeit ohne Bildschirm",W/2,H-35);

    const jpegData=canvas.toDataURL("image/jpeg",0.94);
    const b64=jpegData.split(",")[1];
    const bin=atob(b64);
    const jpg=new Uint8Array(bin.length);
    for(let i=0;i<bin.length;i++)jpg[i]=bin.charCodeAt(i);

    const enc=new TextEncoder();
    const chunks=[];
    let offset=0;
    const offsets=[0];
    const add=data=>{
     const bytes=typeof data==="string"?enc.encode(data):data;
     chunks.push(bytes);offset+=bytes.length;
    };
    const obj=(n,body)=>{
     offsets[n]=offset;
     add(`${n} 0 obj\n${body}\nendobj\n`);
    };

    add("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");
    obj(1,"<< /Type /Catalog /Pages 2 0 R >>");
    obj(2,"<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
    obj(3,"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>");

    offsets[4]=offset;
    add(`4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${W} /Height ${H} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpg.length} >>\nstream\n`);
    add(jpg);
    add("\nendstream\nendobj\n");

    const content="q\n595.28 0 0 841.89 0 0 cm\n/Im0 Do\nQ\n";
    offsets[5]=offset;
    add(`5 0 obj\n<< /Length ${content.length} >>\nstream\n${content}endstream\nendobj\n`);

    const xref=offset;
    add("xref\n0 6\n0000000000 65535 f \n");
    for(let i=1;i<=5;i++)add(String(offsets[i]).padStart(10,"0")+" 00000 n \n");
    add(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`);

    const total=chunks.reduce((sum,c)=>sum+c.length,0);
    const pdf=new Uint8Array(total);
    let pos=0;
    chunks.forEach(c=>{pdf.set(c,pos);pos+=c.length});

    const blob=new Blob([pdf],{type:"application/pdf"});
    const safeTitle=activeCraftTemplate.title.toLowerCase().replace(/[^a-z0-9äöüß]+/gi,"-").replace(/^-|-$/g,"");
    const file=new File([blob],`malino-${safeTitle}-${craftPieces}-teile.pdf`,{type:"application/pdf"});

    // iPhone/iPad: od razu systemowy arkusz udostępniania, tak jak przy zapisanej kolorowance.
    if(navigator.share&&navigator.canShare?.({files:[file]})){
     await navigator.share({
      files:[file],
      title:`Malino – ${activeCraftTemplate.title}`,
      text:"Mein Malino-Puzzle"
     });
     return;
    }

    // Fallback dla przeglądarek bez Web Share z plikami.
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;
    a.target="_blank";
    a.rel="noopener";
    a.download=file.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),120000);
   }catch(err){
    if(err?.name!=="AbortError"){
     try{playSound("click")}catch{}
    }
   }
  };
  img.src=activeCraftSrc;
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
     <span>✂️</span><div><b>Basteln & Spielen</b><small>Puzzle & Labyrinthe zum Drucken</small></div><em>›</em>
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
     <span className="eyebrow">Kreativ ohne Bildschirm</span>
     <h1>Basteln & Spielen ✂️</h1>
     <p>Gestalte Puzzle oder Labyrinthe, speichere sie und teile sie als A4-PDF zum Drucken.</p>
    </div>
    <div className="craftScore"><span>{craftMode==="maze"?"🌀":"🧩"}</span><b>{craftMode==="maze"?savedMazes.length:savedCraftPuzzles.length}</b><small>gespeichert</small></div>
   </div>

   <div className="craftModeTabs craftModeTabs5" role="tablist" aria-label="Basteln & Spielen">
    <button className={craftMode==="puzzle"?"active":""} onClick={()=>setCraftMode("puzzle")}><span>🧩</span><div><b>Meine Puzzle</b><small>Ausmalen, schneiden & puzzeln</small></div></button>
    <button className={craftMode==="maze"?"active":""} onClick={()=>setCraftMode("maze")}><span>🌀</span><div><b>Labyrinthe</b><small>Weg finden, speichern & drucken</small></div></button>
    <button className={craftMode==="difference"?"active":""} onClick={()=>setCraftMode("difference")}><span>🔎</span><div><b>Unterschiede</b><small>Genau hinschauen & entdecken</small></div></button>
    <button className={craftMode==="hidden"?"active":""} onClick={()=>setCraftMode("hidden")}><span>🔍</span><div><b>Versteckte Dinge</b><small>Suchen, finden & markieren</small></div></button>
    <button className={craftMode==="numbers"?"active":""} onClick={()=>setCraftMode("numbers")}><span>🎨</span><div><b>Malen nach Zahlen</b><small>Farben nach Nummern entdecken</small></div></button>
   </div>

   {craftMode==="puzzle"&&<>
    <div className="craftFlow">
     <div className="craftStep craftStep1">
      <div className="craftStepHead"><span>1</span><div><b>Bild wählen</b><small>Wähle eine Vorlage</small></div></div>
      <div className="craftTemplateGrid">
       {craftTemplates.map(t=><button key={t.id} className={activeCraftTemplate.id===t.id?"active":""} onClick={()=>setCraftImageId(t.id)}>
        <img src={t.srcBw} alt={t.title}/><b>{t.title}</b>
       </button>)}
      </div>
      <div className="craftTemplateScrollHint">Weitere Bilder ↓</div>
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
      <div className="craftPreviewStage">
       <div className={`craftPreview ${craftStyle==="bw"?"bw":""}`} style={{aspectRatio:`${activeCraftTemplate.w}/${activeCraftTemplate.h}`}}>
        <img src={activeCraftSrc} alt={activeCraftTemplate.title}/>
        {Array.from({length:craftGrid[0]-1},(_,i)=><i key={`v${i}`} className="cutV" style={{left:`${(i+1)*100/craftGrid[0]}%`}}/>)}
        {Array.from({length:craftGrid[1]-1},(_,i)=><i key={`h${i}`} className="cutH" style={{top:`${(i+1)*100/craftGrid[1]}%`}}/>)}
        <span className="cutScissors cutScissorsA">✂️</span><span className="cutScissors cutScissorsB">✂️</span>
       </div>
      </div>
      <div className="craftActions">
       <button className="craftSaveBtn" onClick={saveCraftPuzzle}>💾 Speichern</button>
       <button className="craftPrintBtn" onClick={printCraftPuzzle}>↗️ Teilen / Drucken</button>
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
        const savedSrc=item.style==="color"?tpl.srcColor:tpl.srcBw;
        return <article key={item.id} className="craftSavedCard" role="button" tabIndex={0}
         onClick={()=>openSavedCraftPuzzle(item)}
         onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openSavedCraftPuzzle(item)}}}>
         <div className="craftSavedThumb"><img src={savedSrc} alt={item.title}/><span>{item.pieces}</span></div>
         <div><b>{item.title}</b><small>{item.pieces} Teile · {item.style==="bw"?"Schwarz-Weiß":"Bunt"}</small><em>Öffnen ›</em></div>
         <button aria-label="Löschen" onClick={e=>{e.stopPropagation();setSavedCraftPuzzles(savedCraftPuzzles.filter(x=>x.id!==item.id))}}>×</button>
        </article>
       })}
      </div>}

    <div className="craftInfoGrid">
     <div><span>✋</span><b>Feinmotorik</b><small>Schneiden und puzzeln trainiert die Hände.</small></div>
     <div><span>🧠</span><b>Logisches Denken</b><small>Teile erkennen und richtig zusammensetzen.</small></div>
     <div><span>👨‍👩‍👧</span><b>Gemeinsame Zeit</b><small>Perfekt für Eltern und Kinder zusammen.</small></div>
    </div>
   </>}

   {craftMode==="maze"&&<>
    <div className="mazeFlow">
     <div className="mazePanel mazeThemesPanel">
      <div className="craftStepHead"><span>1</span><div><b>Abenteuer wählen</b><small>9 Labyrinth-Motive</small></div></div>
      <div className="mazeThemeGrid">
       {mazeThemes.map(t=><button key={t.id} className={mazeThemeId===t.id?"active":""} onClick={()=>setMazeThemeId(t.id)}>
        <span>{t.icon}</span><b>{t.title}</b><small>{t.start} → {t.end}</small>
       </button>)}
      </div>
     </div>

     <div className="mazePanel mazeSettingsPanel">
      <div className="craftStepHead"><span>2</span><div><b>Schwierigkeit</b><small>Passend zum Alter</small></div></div>
      <div className="mazeDifficultyButtons">
       {Object.entries(mazeDifficultyMeta).map(([id,m])=><button key={id} className={mazeDifficulty===id?"active":""} onClick={()=>setMazeDifficulty(id)}>
        <b>{m.label}</b><small>{m.age} Jahre</small><em>{m.cols}×{m.rows}</em>
       </button>)}
      </div>
      <button className="mazeVariantBtn" onClick={newMazeVariant}>🎲 Neue Variante</button>
      <div className="mazeHint"><span>💡</span><p><b>Immer wieder neu</b><small>„Neue Variante“ erzeugt einen anderen Weg mit demselben Motiv.</small></p></div>
     </div>

     <div className="mazePanel mazePreviewPanel">
      <div className="craftStepHead"><span>3</span><div><b>Vorschau & Drucken</b><small>{activeMazeTheme.title}</small></div></div>
      <div className="mazePreviewWrap">
       <div className="mazeStartGoal"><span>{activeMazeTheme.start} START</span><span>ZIEL {activeMazeTheme.end}</span></div>
       <MazeBoard maze={activeMaze} startEmoji={activeMazeTheme.start} endEmoji={activeMazeTheme.end}/>
      </div>
      <div className="mazeActions">
       <button className="craftSaveBtn" onClick={saveMaze}>💾 Speichern</button>
       <button className="craftPrintBtn" onClick={shareMazePdf}>↗️ Teilen / Drucken</button>
      </div>
      <small className="craftA4">A4 · {activeMazeDifficulty.label} · {activeMazeDifficulty.age} Jahre</small>
     </div>
    </div>

    <div className="craftSavedHead mazeSavedHead">
     <div><span className="eyebrow">Meine Sammlung</span><h2>Gespeicherte Labyrinthe</h2></div>
     <span>{savedMazes.length}</span>
    </div>

    {savedMazes.length===0
     ?<div className="craftEmpty"><span>🌀</span><div><b>Noch kein Labyrinth gespeichert</b><small>Wähle oben ein Abenteuer und speichere deine Variante.</small></div></div>
     :<div className="mazeSavedGrid">
       {savedMazes.map(item=>{
        const theme=mazeThemes.find(t=>t.id===item.themeId)||mazeThemes[0];
        const diff=mazeDifficultyMeta[item.difficulty]||mazeDifficultyMeta.leicht;
        const hash=[...`${item.themeId}-${item.difficulty}-${item.seed}`].reduce((a,ch)=>((a*31)+ch.charCodeAt(0))>>>0,2166136261);
        const mini=buildMaze(diff.cols,diff.rows,hash);
        return <article key={item.id} className="mazeSavedCard" role="button" tabIndex={0} onClick={()=>openSavedMaze(item)}>
         <div className="mazeSavedMini"><MazeBoard maze={mini} startEmoji={theme.start} endEmoji={theme.end} className="mini"/></div>
         <div><b>{theme.title}</b><small>{diff.label} · {diff.age} Jahre</small><em>Öffnen ›</em></div>
         <button aria-label="Löschen" onClick={e=>{e.stopPropagation();setSavedMazes(savedMazes.filter(x=>x.id!==item.id))}}>×</button>
        </article>
       })}
      </div>}

    <div className="craftInfoGrid mazeInfoGrid">
     <div><span>👀</span><b>Konzentration</b><small>Den richtigen Weg aufmerksam verfolgen.</small></div>
     <div><span>🧠</span><b>Planen</b><small>Abzweigungen prüfen und Entscheidungen treffen.</small></div>
     <div><span>✏️</span><b>Stiftführung</b><small>Ideal zum Nachfahren auf dem Ausdruck.</small></div>
    </div>
   </>}
  
   {craftMode==="difference"&&<>
    <div className="differenceFlow">
     <div className="differencePanel">
      <div className="craftStepHead"><span>1</span><div><b>Motiv wählen</b><small>6 Themen</small></div></div>
      <div className="differenceThemeGrid">
       {differenceThemes.map(t=><button key={t.id} className={differenceThemeId===t.id?"active":""} onClick={()=>setDifferenceThemeId(t.id)}>
        <span>{t.icon}</span><b>{t.title}</b>
       </button>)}
      </div>
     </div>

     <div className="differencePanel">
      <div className="craftStepHead"><span>2</span><div><b>Schwierigkeit</b><small>Wie viele Unterschiede?</small></div></div>
      <div className="differenceDifficultyButtons">
       {Object.entries(differenceDifficultyMeta).map(([id,m])=><button key={id} className={differenceDifficulty===id?"active":""} onClick={()=>setDifferenceDifficulty(id)}>
        <b>{m.label}</b><small>{m.age} Jahre</small><em>{m.count}</em>
       </button>)}
      </div>
      <button className="mazeVariantBtn" onClick={newDifferenceVariant}>🎲 Neue Variante</button>
     </div>

     <div className="differencePanel differencePreviewPanel">
      <div className="craftStepHead"><span>3</span><div><b>Vorschau & Drucken</b><small>Finde {activeDifferenceDifficulty.count} Unterschiede</small></div></div>
      <div className="differenceCompare">
       <div className="differenceScene"><b>Bild A</b><div>{differenceTokens.map((t,i)=><span key={i}>{t}</span>)}</div></div>
       <div className="differenceScene"><b>Bild B</b><div>{changedDifferenceTokens.map((t,i)=><span key={i}>{t}</span>)}</div></div>
      </div>
      <div className="mazeActions">
       <button className="craftSaveBtn" onClick={saveDifference}>💾 Speichern</button>
       <button className="craftPrintBtn" onClick={shareDifferencePdf}>↗️ Teilen / Drucken</button>
      </div>
      <small className="craftA4">A4 · {activeDifferenceDifficulty.label} · {activeDifferenceDifficulty.count} Unterschiede</small>
     </div>
    </div>

    <div className="craftSavedHead">
     <div><span className="eyebrow">Meine Sammlung</span><h2>Gespeicherte Unterschiede</h2></div>
     <span>{savedDifferences.length}</span>
    </div>

    {savedDifferences.length===0
     ?<div className="craftEmpty"><span>🔎</span><div><b>Noch kein Suchbild gespeichert</b><small>Wähle oben ein Motiv und speichere deine Variante.</small></div></div>
     :<div className="differenceSavedGrid">
       {savedDifferences.map(item=>{
        const theme=differenceThemes.find(t=>t.id===item.themeId)||differenceThemes[0];
        const diff=differenceDifficultyMeta[item.difficulty]||differenceDifficultyMeta.leicht;
        return <article key={item.id} className="differenceSavedCard" role="button" tabIndex={0} onClick={()=>openSavedDifference(item)}>
         <span>{theme.icon}</span>
         <div><b>{theme.title}</b><small>{diff.label} · {diff.count} Unterschiede</small><em>Öffnen ›</em></div>
         <button aria-label="Löschen" onClick={e=>{e.stopPropagation();setSavedDifferences(savedDifferences.filter(x=>x.id!==item.id))}}>×</button>
        </article>
       })}
      </div>}

    <div className="craftInfoGrid">
     <div><span>👀</span><b>Spostrzegawczość</b><small>Kleine Veränderungen aufmerksam entdecken.</small></div>
     <div><span>🧠</span><b>Konzentration</b><small>Zwei Bilder systematisch vergleichen.</small></div>
     <div><span>✏️</span><b>Markieren</b><small>Unterschiede auf dem Ausdruck einkreisen.</small></div>
    </div>
   </>}


   {craftMode==="hidden"&&<>
    <div className="hiddenFlow">
     <aside className="hiddenSide">
      <div className="craftStepHead"><span>🔍</span><div><b>Versteckte Dinge</b><small>Finde die Gegenstände</small></div></div>
      <p>Tippe die versteckten Gegenstände direkt auf der Szene an. Gefundene Dinge bekommen ein ✓.</p>
      <img src="/assets/malino-raetsel-mascot.png" alt="Malino" className="hiddenMascot"/>
     </aside>
     <div className="hiddenMain">
      <div className="hiddenControls">
       <div><small>Motiv wählen</small><select value={hiddenThemeId} onChange={e=>setHiddenThemeId(e.target.value)}>{hiddenThemes.map(t=><option key={t.id} value={t.id}>{t.title}</option>)}</select></div>
       <div><small>Schwierigkeit</small><div className="hiddenDiff">{Object.entries(hiddenDifficultyMeta).map(([id,m])=><button key={id} className={hiddenDifficulty===id?"active":""} onClick={()=>setHiddenDifficulty(id)}>{m.label}<em>{m.count}</em></button>)}</div></div>
       <button className="mazeVariantBtn" onClick={newHiddenVariant}>🎲 Neue Variante</button>
      </div>
      <div className={`hiddenScene interactive ${hiddenMiss?"miss":""}`} onClick={tapHiddenMiss}>
       <div className="hiddenBg">{activeHiddenTheme.bg.split(" ").map((t,i)=><span key={i}>{t}</span>)}</div>
       {hiddenPlacements.map((p,i)=>{
        const found=hiddenFound.includes(i);
        return <button
         key={`${p.item}-${i}`}
         className={`hiddenObjectButton ${found?"found":""}`}
         aria-label={`${p.item} ${found?"gefunden":"suchen"}`}
         onClick={e=>{e.stopPropagation();tapHiddenTarget(p.item,i)}}
         style={{left:`${p.x}%`,top:`${p.y}%`,transform:`translate(-50%,-50%) rotate(${p.r}deg) scale(${p.s})`}}
        ><span>{p.item}</span>{found&&<em>✓</em>}</button>
       })}
       <div className="hiddenCounter">{hiddenFound.length}/{hiddenTargets.length}</div>
       {hiddenMiss&&<div className="hiddenMissPulse">✦</div>}
       {hiddenComplete&&<div className="hiddenCompleteCard">
        <span>🎉</span><div><b>Geschafft!</b><small>{hiddenAlreadySolved?"Du hast dieses Suchbild erneut gelöst.":"+3 Sterne für dich!"}</small></div>
       </div>}
      </div>
      <div className="hiddenTargets"><b>Finde diese Gegenstände:</b><div>{hiddenTargets.map((t,i)=>{
       const found=hiddenFound.includes(i);
       return <span key={i} className={found?"found":""}>{t}{found&&<em>✓</em>}</span>
      })}</div></div>
      <div className="mazeActions"><button className="craftSaveBtn" onClick={saveHidden}>💾 Speichern</button><button className="craftPrintBtn" onClick={shareHiddenPdf}>↗️ Teilen / Drucken (A4)</button></div>
     </div>
    </div>
    <div className="craftSavedHead"><div><span className="eyebrow">Meine Sammlung</span><h2>Gespeicherte Suchbilder</h2></div><span>{savedHidden.length}</span></div>
    {savedHidden.length===0?<div className="craftEmpty"><span>🔍</span><div><b>Noch kein Suchbild gespeichert</b><small>Erstelle oben deine erste Variante.</small></div></div>:<div className="differenceSavedGrid">{savedHidden.map(item=>{const t=hiddenThemes.find(x=>x.id===item.themeId)||hiddenThemes[0],d=hiddenDifficultyMeta[item.difficulty]||hiddenDifficultyMeta.leicht;return <article key={item.id} className="differenceSavedCard" role="button" tabIndex={0} onClick={()=>openSavedHidden(item)}><span>{t.icon}</span><div><b>{t.title}</b><small>{d.label} · {d.count} Gegenstände</small><em>Öffnen ›</em></div><button onClick={e=>{e.stopPropagation();setSavedHidden(savedHidden.filter(x=>x.id!==item.id))}}>×</button></article>})}</div>}
   </>}

   {craftMode==="numbers"&&<>
    <style jsx global>{`
     .numberFloodWrap{position:relative;max-width:760px;margin:0 auto}
     .numberFloodBoard{overflow:hidden;border:3px solid #173d78;border-radius:22px;background:#fff;box-shadow:0 12px 28px rgba(34,54,86,.10)}
     .numberFloodBoard canvas{display:block;width:100%;height:auto;cursor:pointer;touch-action:manipulation}
     .numberFloodWrap .numberComplete{z-index:8}
     @media(max-width:650px){.numberFloodBoard{border-radius:18px}}
     .imageNumberBoardWrap{position:relative;max-width:660px;margin:0 auto}
     .imageNumberBoard{position:relative;overflow:hidden;border:3px solid #173d78;border-radius:22px;background:#fff;box-shadow:0 12px 28px rgba(34,54,86,.12)}
     .imageNumberBase{display:block;width:100%;height:auto;filter:none;opacity:1}
     .imageNumberOverlay{position:absolute;inset:0;width:100%;height:100%;display:block}
     .imageNumberRegion path{cursor:pointer;touch-action:manipulation;pointer-events:all}
     .imageNumberRegion image{pointer-events:none}
     .numberImageNote{max-width:660px;margin:10px auto -2px;padding:8px 11px;border-radius:12px;background:#eaf6ff;color:#326590;text-align:center;font-size:9px;font-weight:900}
     @media(max-width:650px){.imageNumberBoardWrap{max-width:100%}.imageNumberBoard{border-radius:18px}}
    `}</style>
    <div className="numberFlow">
     <aside className="numberSide">
      <div className="craftStepHead"><span>🎨</span><div><b>Malen nach Zahlen</b><small>Interaktiv & zum Drucken</small></div></div>
      <img src="/assets/malino-raetsel-mascot.png" alt="Malino" className="hiddenMascot"/>
      <p>Wähle eine Nummer und tippe auf alle Felder mit derselben Zahl.</p>
     </aside>
     <main className="numberMain">
      <div className="numberControls">
       <div><small>Bild wählen</small><div className="numberThemes">{numberThemes.map(t=><button key={t.id} className={numberThemeId===t.id?"active":""} onClick={()=>setNumberThemeId(t.id)}><span>{t.icon}</span><b>{t.title}</b></button>)}</div></div>
       <div><small>Schwierigkeit</small><div className="hiddenDiff">{Object.entries(numberDifficultyMeta).map(([id,m])=><button key={id} className={numberDifficulty===id?"active":""} onClick={()=>setNumberDifficulty(id)}>{m.label}<em>{m.colors} Farben</em></button>)}</div></div>
      </div>
      {useFloodNumberBoard&&<div className="numberImageNote">✨ Tippe auf die Zahl oder direkt in das Feld. Auch kleine Restfelder werden erkannt.</div>}
            {numberDifficulty==="mittel"&&<div className="numberMittelNote">{"✨ Mittel: echte Felder · 6 Farben"}</div>}
      {numberDifficulty==="schwer"&&<div className="numberSchwerNote">🔥 Schwer: echte Felder · 8 Farben</div>}
      <div className="numberLegend">{Array.from({length:activeNumberDifficulty.colors},(_,i)=><button key={i} className={selectedNumber===i+1?"active":""} onClick={()=>setSelectedNumber(i+1)} style={{background:numberPalette[i]}}><b>{i+1}</b></button>)}</div>
      {useFloodNumberBoard
       ?<div className="numberFloodWrap">
         <MalinoNumberFloodBoard selectedNumber={selectedNumber} palette={numberPalette} painted={numberPainted}
          onFill={(cell,total)=>paintNumberCell(cell,total)} onReady={setNumberFloodTotal}
          resetKey={`${numberThemeId}-${numberDifficulty}`}/>
         {numberPainted.length>=numberFloodTotal&&numberFloodTotal>1&&<div className="numberComplete"><span>🎉</span><b>Geschafft!</b><small>+3 ⭐</small></div>}
        </div>
       :useImageNumberBoard
       ?<div className="imageNumberBoardWrap">
         <div className="imageNumberBoard">
          <img src="/assets/malino-simple-number-board.png" alt="Malino 2.0" className="imageNumberBase"/>
          <svg className="imageNumberOverlay" viewBox="0 0 720 803" aria-label="Malino 2.0 Malen nach Zahlen">
           <defs>{activeImageNumberMasks.map(mask=><clipPath id={`mask-${mask.id}`} key={`clip-${mask.id}`}><path d={mask.d}/></clipPath>)}</defs>
           {activeImageNumberMasks.map(mask=>{
            const painted=numberPainted.includes(mask.id);
            return <g key={mask.id} className={`imageNumberRegion ${painted?"painted":""}`}>
             {painted&&<image href="/assets/malino-simple-number-board.png" x="0" y="0" width="720" height="803" clipPath={`url(#mask-${mask.id})`}/>}
             <path d={mask.d} fill="rgba(255,255,255,0.001)" stroke="transparent" strokeWidth="0" onClick={()=>paintNumberCell(mask,activeImageNumberMasks.length)}/>
            </g>
           })}
          </svg>
          {imageNumberDone&&<div className="numberComplete"><span>🎉</span><b>Geschafft!</b><small>+3 ⭐</small></div>}
         </div>
        </div>
       :useRealNumberBoard
       ?<div className="realNumberBoardWrap">
         <svg className="realNumberBoard" viewBox="0 0 500 500" aria-label={`${activeRealNumberBoard.title} Malen nach Zahlen`}>
          <rect x="8" y="8" width="484" height="484" rx="24" fill="#fff" stroke="#173d78" strokeWidth="5"/>
          {activeRealNumberRegions.map(region=>{
           const painted=numberPainted.includes(region.id);
           return <g key={region.id} className={`numberRegion ${painted?"painted":""}`} onClick={()=>paintNumberCell(region,activeRealNumberRegions.length)}>
            <path d={region.d} fill={painted?numberPalette[region.n-1]:"#fff"} stroke="#173d78" strokeWidth="4" strokeLinejoin="round"/>
            {!painted&&<text x={region.label[0]} y={region.label[1]} className="numberRegionLabel">{region.n}</text>}
           </g>
          })}
          <g className="realNumberDetails" pointerEvents="none" fill="none" stroke="#173d78" strokeWidth="4" strokeLinecap="round">
           {numberThemeId==="malino"&&<>
            {/* Malino 2.0 — richer mascot line art, kept non-interactive so mechanics stay stable */}
            <ellipse cx="269" cy="193" rx="13" ry="17" fill="#fff"/><ellipse cx="315" cy="193" rx="13" ry="17" fill="#fff"/>
            <ellipse cx="272" cy="197" rx="6" ry="8" fill="#173d78"/><ellipse cx="312" cy="197" rx="6" ry="8" fill="#173d78"/>
            <circle cx="274" cy="194" r="2.2" fill="#fff" stroke="none"/><circle cx="314" cy="194" r="2.2" fill="#fff" stroke="none"/>
            <path d="M282 214 Q292 207 302 214 Q299 224 292 225 Q285 224 282 214 Z" fill="#173d78"/>
            <path d="M273 229 Q292 249 312 229"/><path d="M281 238 Q292 244 303 238"/>
            <path d="M254 216 Q263 220 270 218 M314 218 Q322 220 331 216"/>
            <path d="M253 180 Q266 170 279 176 M304 176 Q318 169 331 180"/>
            <path d="M245 206 Q232 202 224 207 M245 216 Q231 216 222 222 M338 206 Q351 202 359 207 M338 216 Q352 216 361 222"/>
            <path d="M250 286 Q286 300 325 286 M245 362 Q287 375 331 362"/>
            <path d="M258 282 L258 319 M317 282 L317 319"/>
            <circle cx="258" cy="287" r="5"/><circle cx="317" cy="287" r="5"/>
            <path d="M252 395 Q268 404 282 397 M296 397 Q311 405 326 395"/>
            <path d="M238 447 q12 9 24 0 M306 449 q12 9 24 0"/>
            <path d="M219 155 Q232 136 250 130 M244 128 Q261 108 280 111 M278 111 Q298 94 316 107 M315 111 Q337 101 351 119 M348 124 Q370 119 381 139"/>
            <path d="M84 122 Q106 131 139 119 M88 156 Q113 165 139 153 M91 192 Q112 199 138 190"/>
            <path d="M36 351 Q64 342 90 350 M54 427 Q80 416 108 425 M388 428 Q420 414 455 424"/>
           </>}
           {numberThemeId==="rocket"&&<>
            <circle cx="250" cy="190" r="20"/><path d="M218 275 H282"/><path d="M235 405 Q250 430 265 405"/>
           </>}
           {numberThemeId==="dino"&&<>
            <circle cx="145" cy="195" r="7" fill="#173d78"/><path d="M125 225 Q150 240 178 225"/><path d="M280 240 Q300 250 320 240"/>
           </>}
           {numberThemeId==="unicorn"&&<>
            <circle cx="162" cy="195" r="7" fill="#173d78"/><path d="M145 225 Q168 238 192 224"/><path d="M157 84 L161 150"/>
           </>}
           {numberThemeId==="tractor"&&<>
            <circle cx="178" cy="386" r="28"/><circle cx="366" cy="390" r="30"/><path d="M125 300 H215"/><path d="M250 246 H340"/>
           </>}
           {numberThemeId==="fish"&&<>
            <circle cx="342" cy="238" r="7" fill="#173d78"/><path d="M340 275 Q355 284 370 274"/><path d="M205 255 Q245 275 285 255"/>
           </>}
          </g>
         </svg>
         {realNumberDone&&<div className="numberComplete"><span>🎉</span><b>Geschafft!</b><small>+3 ⭐</small></div>}
        </div>
       :<div className="numberCanvas" style={{gridTemplateColumns:`repeat(${activeNumberDifficulty.cols},1fr)`}}>
         {numberCells.map(cell=>{const painted=numberPainted.includes(cell.id);return <button key={cell.id} onClick={()=>paintNumberCell(cell)} className={painted?"painted":""} style={painted?{background:numberPalette[cell.n-1]}:{}}><b>{painted?"✓":cell.n}</b></button>})}
         <div className="numberCenterIcon">{activeNumberTheme.icon}</div>
         {numberDone&&<div className="numberComplete"><span>🎉</span><b>Geschafft!</b><small>+3 ⭐</small></div>}
        </div>}
      <div className="numberProgress"><span style={{width:`${Math.round(numberPainted.length/(useFloodNumberBoard?numberFloodTotal:(useImageNumberBoard?activeImageNumberMasks.length:(useRealNumberBoard?activeRealNumberRegions.length:numberCells.length)))*100)}%`}}/><b>{numberPainted.length}/{useFloodNumberBoard?numberFloodTotal:(useImageNumberBoard?activeImageNumberMasks.length:(useRealNumberBoard?activeRealNumberRegions.length:numberCells.length))}</b></div>
      <div className="mazeActions"><button className="craftSaveBtn" onClick={saveNumberArt}>💾 Speichern</button><button className="craftPrintBtn" onClick={shareNumberPdf}>↗️ Teilen / Drucken (A4)</button></div>
     </main>
    </div>
    <div className="craftSavedHead"><div><span className="eyebrow">Meine Sammlung</span><h2>Gespeicherte Zahlenbilder</h2></div><span>{savedNumberArt.length}</span></div>
    {savedNumberArt.length===0?<div className="craftEmpty"><span>🎨</span><div><b>Noch kein Zahlenbild gespeichert</b><small>Male oben dein erstes Bild.</small></div></div>:<div className="differenceSavedGrid">{savedNumberArt.map(item=>{const t=numberThemes.find(x=>x.id===item.themeId)||numberThemes[0],d=numberDifficultyMeta[item.difficulty]||numberDifficultyMeta.leicht;return <article key={item.id} className="differenceSavedCard" role="button" onClick={()=>openSavedNumberArt(item)}><span>{t.icon}</span><div><b>{t.title}</b><small>{d.label} · {d.colors} Farben</small><em>Öffnen ›</em></div><button onClick={e=>{e.stopPropagation();setSavedNumberArt(savedNumberArt.filter(x=>x.id!==item.id))}}>×</button></article>})}</div>}
   </>}
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