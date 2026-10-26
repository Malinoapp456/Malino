export const STICKERS=[
 {id:'star',icon:'⭐',de:'Stern',pl:'Gwiazdka'},
 {id:'heart',icon:'💗',de:'Herz',pl:'Serce'},
 {id:'flower',icon:'🌸',de:'Blume',pl:'Kwiatek'},
 {id:'sun',icon:'☀️',de:'Sonne',pl:'Słońce'},
 {id:'rainbow',icon:'🌈',de:'Regenbogen',pl:'Tęcza'},
 {id:'sparkle',icon:'✨',de:'Zauberfunkeln',pl:'Iskierka'}
];
export const STICKER_SIZES={small:.09,medium:.15,large:.23};
export function stickerPlacement(fit,point,size='medium'){
 const side=Math.min(fit.w,fit.h)*(STICKER_SIZES[size]||STICKER_SIZES.medium);
 const radius=side/2;
 return {side,x:Math.max(fit.x+radius,Math.min(fit.x+fit.w-radius,point.x)),y:Math.max(fit.y+radius,Math.min(fit.y+fit.h-radius,point.y))};
}
// Vector stamps are rasterized into the existing paint layer: no fonts,
// external images or additional storage are required for saved artwork.
export function drawSticker(ctx,id,placement){
 if(!STICKERS.some(s=>s.id===id))return false;
 const {x,y,side}=placement;
 ctx.save();ctx.translate(x,y);ctx.scale(side/100,side/100);
 ctx.globalCompositeOperation='source-over';ctx.lineWidth=3;ctx.lineJoin='round';ctx.strokeStyle='#ffffff';
 const circle=(x,y,r,color)=>{ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();ctx.stroke();};
 const star=(points,inner,color)=>{ctx.beginPath();for(let i=0;i<points*2;i++){const a=-Math.PI/2+i*Math.PI/points,r=i%2?inner:45;const x=Math.cos(a)*r,y=Math.sin(a)*r;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.closePath();ctx.fillStyle=color;ctx.fill();ctx.stroke();};
 if(id==='star')star(5,22,'#ffc83d');
 if(id==='sparkle')star(4,13,'#a986ef');
 if(id==='heart'){
  ctx.beginPath();ctx.moveTo(0,43);ctx.bezierCurveTo(-75,-4,-35,-65,0,-25);ctx.bezierCurveTo(35,-65,75,-4,0,43);ctx.closePath();ctx.fillStyle='#f275a4';ctx.fill();ctx.stroke();
 }
 if(id==='flower'){
  for(let i=0;i<6;i++){const a=i*Math.PI/3;circle(Math.cos(a)*25,Math.sin(a)*25,20,'#ee8ecb');}circle(0,0,15,'#ffdb65');
 }
 if(id==='sun'){
  star(12,32,'#ffca48');circle(0,0,27,'#ffdf70');circle(-9,-3,2,'#76532f');circle(9,-3,2,'#76532f');
  ctx.beginPath();ctx.arc(0,4,10,0,Math.PI);ctx.strokeStyle='#76532f';ctx.stroke();
 }
 if(id==='rainbow'){
  ctx.lineWidth=9;ctx.lineCap='round';
  ['#f17f9d','#ffc85e','#83cc9c','#7ab7ee','#aa8be0'].forEach((color,i)=>{ctx.beginPath();ctx.arc(0,20,43-i*8,Math.PI,Math.PI*2);ctx.strokeStyle=color;ctx.stroke();});
  ctx.lineWidth=2;ctx.strokeStyle='#e4eafb';circle(-36,22,11,'#fff');circle(36,22,11,'#fff');
 }
 ctx.restore();return true;
}
