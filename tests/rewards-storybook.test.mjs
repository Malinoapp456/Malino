import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");
const start=page.indexOf('{screen==="reward"&&<section className="rewardsHub storyRewardsHub">');
const end=page.indexOf('{screen==="room"&&',start+30);
const screen=page.slice(start,end);
const art=["chest","brush","crown"];

test("storybook reward illustrations are transparent, self-contained SVG assets",()=>{
 assert.ok(start>=0&&end>start);
 for(const name of art){
  const svg=readFileSync(new URL("../public/ui/reward-story-"+name+".svg",import.meta.url),"utf8");
  assert.ok(svg.startsWith('<svg xmlns="http://www.w3.org/2000/svg"'),name);
  assert.ok(svg.includes('viewBox="0 0 320 240"'),name);
  assert.ok(svg.includes('filter="url(#shadow)"'),name);
  assert.ok(!svg.includes("<script")&&!svg.includes("<image")&&!svg.includes("<foreignObject"),name);
  assert.ok(screen.includes('src="/ui/reward-story-'+name+'.svg"'),name+" used in rewards screen");
 }
 assert.ok(screen.includes('className="storySurpriseArt"'));
 assert.ok(screen.includes('aria-hidden="true">✓</i>'));
});

test("existing chest thresholds and unlock buttons remain unchanged",()=>{
 for(const level of [50,100,200]){
  assert.ok(screen.includes("stars>="+level),level+" threshold");
  assert.ok(screen.includes("hasChest"+level),level+" unlock flag");
  assert.ok(screen.includes("openChest"+level),level+" unlock action");
  assert.ok(screen.includes("Math.max(0,"+level+"-stars)"),level+" remaining count");
 }
 assert.ok(screen.includes('onClick={()=>open(secretMalinoItem)}'));
 assert.ok(screen.includes('className="surpriseGrid storySurpriseGrid"'));
});

test("badges, progress levels, frames and stickers retain their existing behavior",()=>{
 assert.ok(screen.includes("achievementBadges.map(b=>"));
 assert.ok(screen.includes("unlockedBadgeCount"));
 assert.ok(screen.includes('b.ok?"unlocked":"locked"'));
 assert.ok(screen.includes('b.ok?b.icon:"🔒"'));
 assert.ok(screen.includes("Math.floor(done.length/5)+1"));
 assert.ok(screen.includes('style={{width:Math.min(100,((done.length%5)/5)*100)+"%"}}'));
 assert.ok(screen.includes("treasureItems.map(t=>"));
 assert.ok(screen.includes('onClick={()=>setActiveFrame("classic")}'));
 assert.ok(screen.includes("onClick={()=>setActiveFrame(t.id)}"));
 assert.ok(screen.includes('t.ok&&t.type==="sticker"'));
 assert.ok(screen.includes("setScreen(\"room\")"));
 assert.ok(screen.includes("setScreen(\"library\")"));
});

test("reward cards remain accessible and fit tablets and narrow phones",()=>{
 assert.ok(css.includes("Malino Storybook Rewards v1"));
 assert.ok(css.includes(".storyRewardsHub .storySurpriseArt img"));
 assert.ok(css.includes("object-fit:contain"));
 assert.ok(css.includes(".storyRewardsHub button:focus-visible"));
 assert.ok(css.includes("@media(max-width:900px)"));
 assert.ok(css.includes("@media(max-width:650px)"));
 assert.ok(css.includes("@media(max-width:375px)"));
 assert.ok(css.includes("@media(prefers-reduced-motion:reduce)"));
 assert.ok(css.includes("grid-template-columns:minmax(0,1fr)"));
});

test("previously approved storybook library and premium logo remain in place",()=>{
 assert.ok(page.includes('className="libraryPage libraryStoryPage"'));
 assert.ok(page.includes('/ui/library-${meta.tone}.svg'));
 assert.ok(page.includes('src="/ui/malino-logo-premium-approved.webp"'));
 assert.ok(page.includes("function MalinoNumberFloodBoard"));
 assert.ok(page.includes('setSavedNumberArt([item,...savedNumberArt].slice(0,18));playSound("success")'));
});
