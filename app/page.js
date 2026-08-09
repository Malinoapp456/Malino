"use client";
import {forwardRef,useEffect,useImperativeHandle,useMemo,useRef,useState} from "react";

const items=[
{id:"dino",name:"Dino Abenteuer",cat:"Dinosaurier",emoji:"🦖",bg:"#dff7c9",mode:"regions"},
{id:"fuchs",name:"Fuchs im Wald",cat:"Tiere",emoji:"🦊",bg:"#ffe3bc",image:"/tiere/fuchs.webp",mode:"draw"},
{id:"elefant",name:"Elefant in der Savanne",cat:"Tiere",emoji:"🐘",bg:"#dcefff",image:"/tiere/elefant.webp",mode:"draw"},
{id:"pinguin",name:"Pinguin im Schnee",cat:"Tiere",emoji:"🐧",bg:"#e7f6ff",image:"/tiere/pinguin.webp",mode:"draw"},
{id:"panda",name:"Panda im Bambuswald",cat:"Tiere",emoji:"🐼",bg:"#e2f6d7",image:"/tiere/panda.webp",mode:"draw"},
{id:"loewe",name:"Löwe in der Savanne",cat:"Tiere",emoji:"🦁",bg:"#fff0bf",image:"/tiere/loewe.webp",mode:"draw"},
{id:"hase",name:"Hase im Frühlingsgarten",cat:"Tiere",emoji:"🐰",bg:"#ffe9f4",image:"/tiere/hase.webp",mode:"draw"},
{id:"igel",name:"Igel im Zauberwald",cat:"Tiere",emoji:"🦔",bg:"#f0e4d5",image:"/tiere/igel.webp",mode:"draw"},
{id:"unicorn",name:"Einhorn Traum",cat:"Märchen",emoji:"🦄",bg:"#f5e0ff"},
{id:"tractor",name:"Traktor",cat:"Bauernhof",emoji:"🚜",bg:"#fff0c8"},
{id:"rocket",name:"Rakete",cat:"Weltraum",emoji:"🚀",bg:"#e4e1ff"}
];
const cats=["Alle","Tiere","Dinosaurier","Bauernhof","Fahrzeuge","Weltraum","Märchen"];
const colors=["#ef4444","#f97316","#f59e0b","#facc15","#84cc16","#22c55e","#14b8a6","#0ea5e9","#2563eb","#7c3aed","#ec4899","#92400e","#d6b27b","#d1d5db","#111827","#ffffff"];

function useStore(key,initial){
 const [v,setV]=useState(initial);
 useEffect(()=>{try{const s=localStorage.getItem(key);if(s)setV(JSON.parse(s))}catch{}},[key]);
 useEffect(()=>{try{localStorage.setItem(key,JSON.stringify(v))}catch{}},[key,v]);
 return [v,setV];
}
function Logo(){return <div className="logo"><b>M</b><b>A</b><b>L</b><b>I</b><b>N</b><b>O</b></div>}
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

const RasterPainter=forwardRef(function RasterPainter({src,color,eraser},ref){
 const canvasRef=useRef(null),drawing=useRef(false),last=useRef(null),undoStack=useRef([]);
 const sizeCanvas=()=>{const c=canvasRef.current;if(!c)return;const r=c.getBoundingClientRect(),ratio=window.devicePixelRatio||1;const old=c.toDataURL();c.width=Math.max(1,Math.round(r.width*ratio));c.height=Math.max(1,Math.round(r.height*ratio));const ctx=c.getContext("2d");ctx.setTransform(ratio,0,0,ratio,0,0);ctx.lineCap="round";ctx.lineJoin="round";if(old&&old!=="data:,"){const img=new Image();img.onload=()=>ctx.drawImage(img,0,0,r.width,r.height);img.src=old}};
 useEffect(()=>{sizeCanvas();window.addEventListener("resize",sizeCanvas);return()=>window.removeEventListener("resize",sizeCanvas)},[]);
 const snapshot=()=>{const c=canvasRef.current;if(c)undoStack.current.push(c.toDataURL())};
 const point=e=>{const r=canvasRef.current.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}};
 const down=e=>{e.currentTarget.setPointerCapture?.(e.pointerId);snapshot();drawing.current=true;last.current=point(e)};
 const move=e=>{if(!drawing.current)return;const c=canvasRef.current,ctx=c.getContext("2d"),p=point(e),a=last.current;ctx.globalCompositeOperation=eraser?"destination-out":"source-over";ctx.strokeStyle=color;ctx.lineWidth=eraser?32:18;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(p.x,p.y);ctx.stroke();last.current=p};
 const up=()=>{drawing.current=false;last.current=null};
 const clear=()=>{const c=canvasRef.current;if(!c)return;snapshot();c.getContext("2d").clearRect(0,0,c.width,c.height)};
 const undo=()=>{const data=undoStack.current.pop(),c=canvasRef.current;if(!data||!c)return;const r=c.getBoundingClientRect(),ctx=c.getContext("2d");ctx.clearRect(0,0,c.width,c.height);const img=new Image();img.onload=()=>ctx.drawImage(img,0,0,r.width,r.height);img.src=data};
 useImperativeHandle(ref,()=>({undo,clear}));
 return <div className="rasterPainter"><img src={src} alt="Malbild" draggable="false"/><canvas ref={canvasRef} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}/></div>
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
 const [eraser,setEraser]=useState(false);
 const [fills,setFills]=useState({});
 const [history,setHistory]=useState([]);
 const rasterRef=useRef(null);
 const filtered=useMemo(()=>items.filter(x=>(cat==="Alle"||x.cat===cat)&&x.name.toLowerCase().includes(query.toLowerCase())),[cat,query]);
 const open=it=>{setCurrent(it);setFills({});setHistory([]);setScreen("paint")};
 const paint=k=>{const old=fills[k]||"#fff",next=eraser?"#fff":selected;if(old===next)return;setHistory([...history,{k,old}]);setFills({...fills,[k]:next})};
 const undo=()=>{if(current.mode==="draw"){rasterRef.current?.undo();return}const x=history.at(-1);if(!x)return;setFills({...fills,[x.k]:x.old});setHistory(history.slice(0,-1))};
 const finish=()=>{if(!done.includes(current.id)){setDone([...done,current.id]);setStars(stars+5)}setGallery([{...current,date:new Date().toLocaleDateString("de-DE")},...gallery.filter(x=>x.id!==current.id)]);setScreen("reward")};
 return <main>
  <header><button>🇩🇪 Deutsch⌄</button><Logo/><div><span>⭐ {stars}</span><button onClick={()=>setScreen("parent")}>👤 Eltern</button></div></header>

  {screen==="start"&&<section>
   <div className="hero">
    <Lion/><div className="speech"><h1>Hallo! 👋</h1><p>Schön, dass du da bist!<br/>Was möchtest du heute malen?</p><button className="primary" onClick={()=>open(items[0])}>🖌️ Jetzt malen!</button></div>
    <div className="daily"><b>⭐ Bild des Tages</b><Thumb it={items[0]} done={done.includes("dino")}/><button onClick={()=>open(items[0])}>Jetzt malen!</button></div>
   </div>
   <div className="panel"><h2>Wähle eine Kategorie</h2><div className="cats">{cats.slice(1).map((c,i)=><button key={c} onClick={()=>{setCat(c);setScreen("library")}}><span>{["🐶","🦖","🚜","🚒","🚀","🏰"][i]}</span>{c}</button>)}</div>
    <div className="title"><h2>Letzte Bilder</h2><button onClick={()=>setScreen("gallery")}>Alle anzeigen ›</button></div>
    <div className="row">{(gallery.length?gallery:items.slice(0,5)).slice(0,5).map(x=><button key={x.id} onClick={()=>open(x)}><Thumb it={x} done={done.includes(x.id)}/></button>)}</div>
    <div className="progress">⭐ <div><b>Toll gemacht!</b><small>Du hast schon {done.length} Bilder gemalt.</small></div><button onClick={()=>setScreen("library")}>Weiter malen</button></div>
   </div>
  </section>}

  {screen==="library"&&<section className="panel">
   <div className="libtop"><Lion/><div><h1>Hallo! 👋</h1><p>Wähle ein Bild zum Ausmalen.</p></div></div>
   <div className="controls"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="🔍 Suche nach Malbildern..."/><select value={cat} onChange={e=>setCat(e.target.value)}>{cats.map(c=><option key={c}>{c}</option>)}</select></div>
   <div className="cards">{filtered.map(x=><article key={x.id}><button className="heart" onClick={()=>setFav(fav.includes(x.id)?fav.filter(y=>y!==x.id):[...fav,x.id])}>{fav.includes(x.id)?"❤️":"🤍"}</button><button onClick={()=>open(x)}><Thumb it={x} done={done.includes(x.id)}/></button><b>{x.name}</b><small>{x.cat}</small></article>)}</div>
  </section>}

  {screen==="paint"&&<section>
   <div className="painthead"><button onClick={()=>setScreen("library")}>←</button><button onClick={()=>setScreen("start")}>🏠</button><div><Lion/><b>Du malst großartig!</b></div><span>{done.length+1}/{items.length} Bilder</span></div>
   <div className="workspace"><aside><button className={!eraser?"on":""} onClick={()=>setEraser(false)}>🖌️ Pinsel</button><button className={eraser?"on":""} onClick={()=>setEraser(true)}>🧽 Radierer</button><button onClick={undo}>↩️ Zurück</button><button onClick={()=>{if(current.mode==="draw")rasterRef.current?.clear();else{setFills({});setHistory([])}}}>🔄 Neu</button></aside><div className="canvas">{current.mode==="draw"?<RasterPainter ref={rasterRef} src={current.image} color={selected} eraser={eraser}/>:<Dino fills={fills} paint={paint}/>}</div></div>
   <div className="palette">{colors.map(c=><button key={c} style={{background:c}} className={selected===c&&!eraser?"sel":""} onClick={()=>{setSelected(c);setEraser(false)}}/>)}</div>
   <div className="actions"><button onClick={()=>setScreen("library")}>Vorlagen</button><button className="finish" onClick={finish}>✓ Fertig!</button><button>⬇ Speichern</button></div>
  </section>}

  {screen==="reward"&&<section className="reward"><Logo/><div className="rewardgrid"><Lion/><div><h1>Super gemacht!</h1><p>Du hast ein wunderschönes Bild gemalt! 💗</p><Thumb it={current} done/></div></div><div className="prizes"><div>⭐<b>+5 Sterne</b></div><div>🏅<b>Kreativ Künstler</b></div><div>🎁<b>+1 Überraschung</b></div></div><div className="actions"><button onClick={()=>setScreen("gallery")}>Zur Galerie</button><button className="finish" onClick={()=>open(items[(items.findIndex(x=>x.id===current.id)+1)%items.length])}>Nächstes Bild</button></div></section>}

  {screen==="gallery"&&<section className="panel"><div className="title"><div><h1>Meine Kunstwerke 💕</h1><p>Deine fertigen Malbilder</p></div><button onClick={()=>setScreen("library")}>+ Neues Bild</button></div>{gallery.length?<div className="cards">{gallery.map(x=><article key={x.id}><Thumb it={x} done/><b>{x.name}</b><small>{x.date}</small></article>)}</div>:<div className="empty">🎨<h2>Noch keine Kunstwerke</h2><button onClick={()=>setScreen("library")}>Zur Bibliothek</button></div>}</section>}

  {screen==="parent"&&<section className="parents"><div className="panel"><h1>Elternbereich</h1>{["👧 Kind-Profil","⏱️ Bildschirmzeit","⚙️ App-Einstellungen","🖨️ Export & Drucken","❓ Hilfe & Feedback","ℹ️ Über Malino"].map(x=><button key={x}>{x}<span>›</span></button>)}</div><div className="panel"><h2>Statistik dieser Woche</h2><div className="bars">{[30,50,42,65,55,75,88].map((h,i)=><i key={i} style={{height:h+"%"}}/>)}</div><p>Gemalte Bilder <b>{done.length}</b></p><p>Erhaltene Sterne <b>{stars} ⭐</b></p></div></section>}

  <nav>{[["start","🏠","Start"],["library","📚","Bibliothek"],["paint","🖌️","Malen"],["reward","🏆","Belohnungen"],["gallery","🖼️","Galerie"]].map(([s,e,l])=><button key={s} className={screen===s?"active":""} onClick={()=>s==="paint"?open(current):setScreen(s)}>{e}<span>{l}</span></button>)}</nav>
 </main>
}