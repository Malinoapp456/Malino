import test from 'node:test';
import assert from 'node:assert/strict';
import {STICKERS,STICKER_SIZES,stickerPlacement,drawSticker} from '../lib/magic-stickers.mjs';

test('stickers stay entirely inside portrait and landscape artwork, including edge taps',()=>{
 for(const fit of [{x:80,y:0,w:240,h:400},{x:0,y:70,w:500,h:280}]){
  for(const size of Object.keys(STICKER_SIZES))for(const point of [{x:-100,y:-100},{x:1000,y:1000},{x:200,y:200}]){
   const p=stickerPlacement(fit,point,size),r=p.side/2;
   assert.ok(p.x-r>=fit.x-1e-8);assert.ok(p.y-r>=fit.y-1e-8);
   assert.ok(p.x+r<=fit.x+fit.w+1e-8);assert.ok(p.y+r<=fit.y+fit.h+1e-8);
  }
 }
});
test('sticker size scales with artwork on phones and tablets',()=>{
 const small=stickerPlacement({x:0,y:0,w:300,h:400},{x:150,y:200},'large');
 const big=stickerPlacement({x:0,y:0,w:600,h:800},{x:300,y:400},'large');
 assert.equal(big.side,small.side*2);
 assert.equal(stickerPlacement({x:0,y:0,w:300,h:400},{x:150,y:200},'unknown').side,45);
});
test('every sticker draws vector geometry and restores the painting context',()=>{
 for(const sticker of STICKERS){
  let depth=0,paints=0;
  const ctx=new Proxy({save(){depth++;},restore(){depth--;},fill(){paints++;},stroke(){paints++;}},{get(t,k){return t[k]??(()=>{});}});
  assert.equal(drawSticker(ctx,sticker.id,{x:100,y:100,side:60}),true);
  assert.equal(depth,0);assert.ok(paints>0);
 }
});
test('invalid sticker does not touch the painting',()=>{
 const ctx=new Proxy({},{get(){throw Error('must not draw');}});
 assert.equal(drawSticker(ctx,'invalid',{x:0,y:0,side:20}),false);
});
