import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");
const penguinCss=readFileSync(new URL("../components/ShadowGame.module.css",import.meta.url),"utf8");

test("mobile game picker retains all seven games and the existing compact grid",()=>{
 const start=page.indexOf('<div className="craftModeTabs craftModeTabs5 craftModeTabs6"');
 const end=page.indexOf('<div className="craftGameContent">',start);
 assert.ok(start>=0 && end>start);
 const picker=page.slice(start,end);
 assert.equal((picker.match(/<button\\b/g)||[]).length,7);
 assert.ok(picker.includes("<PenguinShadowIcon/>"));
 assert.ok(css.includes(".craftPage>.craftModeTabs{grid-template-columns:repeat(2,minmax(0,1fr))}"));
 assert.ok(css.includes(".craftModeTabs{gap:7px}"));
 assert.ok(css.includes(".craftModeTabs button{min-height:62px;padding:9px}"));
});

test("mobile menu enlarges illustrations with one-line labels without increasing tile heights",()=>{
 const marker="/* Seven-game mobile picker:";
 const mobile=css.slice(css.indexOf(marker));
 assert.ok(css.includes(marker));
 assert.ok(mobile.includes("font-size:36px"));
 assert.ok(mobile.includes("flex-direction:column"));
 assert.ok(mobile.includes("white-space:nowrap"));
 assert.ok(mobile.includes("text-overflow:ellipsis"));
 assert.ok(mobile.includes("button small{display:none}"));
 assert.ok(!mobile.includes("min-height:"));
 assert.ok(!mobile.includes("grid-template-columns:"));
 assert.ok(penguinCss.includes(".penguinPair{width:3.75rem;height:2.375rem}"));
});
