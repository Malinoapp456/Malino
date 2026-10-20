import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const styles=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");
const start=page.indexOf('{craftMode==="numbers"&&<>');
const end=page.indexOf('{screen==="puzzles"&&',start);
const numbers=page.slice(start,end);

test("color-by-numbers uses the established rainbow-maned Malino, not older mascot",()=>{
 assert.ok(start>=0&&end>start);
 assert.match(numbers,/className="numberSide numberSideRefined"/);
 assert.ok(numbers.includes('src="/malino-hero-mascot.png"'));
 assert.ok(!numbers.includes('src="/assets/malino-raetsel-mascot.png"'));
 assert.match(numbers,/className="numberMascotImage"/);
 assert.match(styles,/\.numberMascotImage\s*\{/);
 assert.match(styles,/transform:scaleX\(-1\) rotate\(-5deg\)/);
});

test("four numbered colors have accessible, selected-state radio-style buttons",()=>{
 assert.match(numbers,/className="numberLegend numberLegendRefined"/);
 assert.match(numbers,/aria-pressed=\{selectedNumber===i\+1\}/);
 assert.match(numbers,/onClick=\{\(\)=>setSelectedNumber\(i\+1\)\}/);
 assert.match(numbers,/aria-label=\{language==="pl"/);
 assert.match(styles,/\.numberLegendRefined button:focus-visible/);
});

test("preserve original painting workflows, autosave and four-color palette",()=>{
 assert.match(page,/const numberPalette=\["#f6b73c","#2fa84f","#ec4e7a","#3d8bea"/);
 assert.ok(numbers.includes("<MalinoNumberFloodBoard"));
 assert.ok(numbers.includes('onFill={(cell,total)=>paintNumberCell(cell,total)}'));
 assert.ok(numbers.includes('className="realNumberBoard"'));
 assert.ok(numbers.includes('saveNumberArt'));
 assert.ok(numbers.includes('shareNumberPdf'));
 assert.ok(numbers.includes('activeNumberBoard.imagePath'));
});

test("mascot panel remains responsive and guide is localized for Polish and German",()=>{
 assert.ok(numbers.includes('language==="pl"?"Malino podpowiada: każdy numer ma swój kolor!"'));
 assert.ok(numbers.includes('alt={language==="pl"?"Malino z kolorowym pędzlem"'));
 assert.ok(styles.includes("@media(max-width:650px){\n  .numberSideRefined"));
 assert.ok(styles.includes("@media(max-width:375px){\n  .numberSideRefined"));
});
