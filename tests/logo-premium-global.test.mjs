import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");
const approved=readFileSync(new URL("../public/ui/malino-logo-premium-approved.webp",import.meta.url));

test("the approved Premium logo is used globally via the shared Logo component",()=>{
 assert.ok(page.includes('function Logo(){return <div className="logo logoV3 logoPremium"'));
 assert.ok(page.includes('<img src="/ui/malino-logo-premium-approved.webp" alt="Malino"/>'));
 assert.ok(!page.includes('src="/ui/malino-logo-premium-v2.svg"'));
 assert.ok(!page.includes('src="/ui/malino-logo.webp"'));
 assert.ok(page.split("<Logo/>").length>=3);
 assert.ok(page.includes('<Logo/><div><span key={`stars-'));
});

test("the actual approved image is stored locally as a compact transparent WebP",()=>{
 assert.equal(approved.subarray(0,4).toString("ascii"),"RIFF");
 assert.equal(approved.subarray(8,12).toString("ascii"),"WEBP");
 assert.ok(approved.length>10000&&approved.length<60000);
 assert.ok(approved.includes(Buffer.from("VP8X","ascii")), "WebP contains an extended header for alpha");
});

test("Premium wordmark keeps readable mobile dimensions and reduced motion",()=>{
 assert.ok(css.includes('.logoV3 img'));
 assert.ok(css.includes('header>.logoV3 img'));
 assert.ok(css.includes('.logoPremium img'));
 assert.ok(css.includes('width:min(274px,78vw)'));
 assert.ok(css.includes('filter:none !important'));
 assert.ok(css.includes('.logoPremium{animation:none !important}'));
});

test("other activities, sounds and saved progress remain untouched",()=>{
 assert.ok(page.includes('function MalinoNumberFloodBoard'));
 assert.ok(page.includes('setSavedNumberArt([item,...savedNumberArt].slice(0,18));playSound("success")'));
 assert.ok(page.includes('onFill={(cell,total)=>paintNumberCell(cell,total)'));
 assert.ok(page.includes('setScreen("puzzles")'));
 assert.ok(page.includes('setScreen("crafts")'));
});
