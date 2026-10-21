import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");
const svg=readFileSync(new URL("../public/ui/malino-logo-premium-v2.svg",import.meta.url),"utf8");

test("premium logo uses the shared Logo component, including every app header",()=>{
 assert.ok(page.includes('function Logo(){return <div className="logo logoV3 logoPremium"'));
 assert.ok(page.includes('<img src="/ui/malino-logo-premium-v2.svg" alt="Malino"/>'));
 assert.ok(!page.includes('src="/ui/malino-logo.webp"'));
 assert.ok((page.match(/<Logo\/>/g)||[]).length>=2);
 assert.ok(page.includes('<Logo/><div><span key={`stars-'));
});

test("premium logo is a standalone, safe, high-resolution transparent vector",()=>{
 assert.ok(svg.startsWith('<svg xmlns="http://www.w3.org/2000/svg"'));
 assert.ok(svg.trimEnd().endsWith('</svg>'));
 assert.ok(svg.includes('viewBox="0 0 1200 340"'));
 assert.ok(svg.includes('role="img" aria-label="Malino Premium"'));
 assert.ok(!svg.includes('<script'));
 assert.ok(!svg.includes('<image'));
 assert.ok(!svg.includes('<rect'));
 assert.ok(!svg.includes('<foreignObject'));
 assert.ok(svg.includes('id="pawPink"')&&svg.includes('id="pawPurple"'));
 assert.ok(svg.includes('fill-rule="evenodd"'),"bold filled letterforms must be retained");
 assert.ok(!svg.includes('stroke-width="74"'),"avoid thick white-outline glyphs");
 assert.ok(!svg.includes('filter="url(#blur)"'));
 for(const color of ["blue","yellow","green","pink","orange","purple"]){
  assert.ok(svg.includes('id="'+color+'"'));
  assert.ok(svg.includes('stroke="url(#'+color+')"'));
 }
});

test("global logo uses existing responsive header sizes and can reduce motion",()=>{
 assert.ok(css.includes('.logoV3 img'));
 assert.ok(css.includes('header>.logoV3 img'));
 assert.ok(css.includes('.logoPremium img'));
 assert.ok(css.includes('filter:drop-shadow('));
 assert.ok(css.includes('.logoPremium{animation:none !important}'));
 assert.ok(css.includes('Malino Premium Logo v2'));
 assert.ok(css.includes('width:min(274px,78vw)'));
 assert.ok(css.includes('filter:none !important'));
});

test("other app activity, sound and saved-progress implementations remain available",()=>{
 assert.ok(page.includes('function MalinoNumberFloodBoard'));
 assert.ok(page.includes('setSavedNumberArt([item,...savedNumberArt].slice(0,18));playSound("success")'));
 assert.ok(page.includes('onFill={(cell,total)=>paintNumberCell(cell,total)'));
 assert.ok(page.includes('setScreen("puzzles")'));
 assert.ok(page.includes('setScreen("crafts")'));
});
