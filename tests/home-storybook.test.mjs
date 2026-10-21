import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");
const homeStart=page.indexOf('{screen==="start"&&<section className="home premiumHome malinoStoryHome">');
const homeEnd=page.indexOf('{screen==="crafts"&&<section',homeStart);
const home=page.slice(homeStart,homeEnd);

test("the new home screen centers canonical Malino and has bilingual introduction",()=>{
 assert.ok(homeStart>=0&&homeEnd>homeStart);
 assert.ok(home.includes('src="/malino-hero-mascot.png"'));
 assert.ok(home.includes('Cześć! W co się dziś pobawimy?'));
 assert.ok(home.includes('Hallo! Was spielen wir heute?'));
 assert.ok(home.includes('malinoStoryHeadline'));
 assert.ok(home.includes('malinoStoryEyebrow'));
 assert.ok(!home.includes('malinoStoryMascotHello'),"lion face stays clear of a speech-bubble label");
 assert.ok(home.includes('malinoStoryHero'));
 assert.ok(home.includes('Jetzt ausmalen'));
});

test("four illustrated play choices link to original activities and preserve actions",()=>{
 const cards=home.match(/className="malinoPlayCard malinoPlayCard(?:Color|Puzzle|Crafts|Rewards)"/g)||[];
 assert.equal(cards.length,4);
 for(const screen of ["library","crafts","puzzles","reward"]){
  assert.ok(home.includes('setScreen("'+screen+'")'),screen);
 }
 assert.ok(home.includes('setPuzzleFeedback(null);setPuzzleWrong(null);setScreen("puzzles")'));
 assert.ok(home.includes('onClick={()=>open(dailyItem)}'));
 assert.ok(home.includes('onClick={()=>open(continueItem)}'));
 assert.ok(home.includes('onClick={openParentArea}'));
 assert.ok(home.includes('setScreen("gallery")'));
 for(const img of ['/ui/home-coloring.svg','/ui/home-puzzles.svg','/ui/home-crafts.svg','/ui/home-rewards.svg']){
  assert.ok(home.includes(img));
 }
});

test("daily quest and continue painting stay above statistics",()=>{
 const play=home.indexOf('className="malinoPlayChoices"');
 const daily=home.indexOf('className="todayAdventureGrid"');
 const continueCard=home.indexOf('className={`continueCard premiumContinueCard');
 const stats=home.indexOf('className="homeQuickStats premiumQuickStats"');
 assert.ok(play>=0&&daily>play&&continueCard>daily&&stats>continueCard);
 assert.ok(home.includes('dailyPrimaryButton'));
 assert.ok(home.includes('dailyStreak'));
 assert.ok(home.includes('stars'));
 assert.ok(home.includes('gallery.length'));
 assert.ok(home.includes('unlockedBadgeCount'));
 assert.ok(home.includes('recentItem'));
});

test("storybook home is responsive, accessible and respects reduced motion",()=>{
 assert.ok(css.includes('.malinoPlayChoices{'));
 assert.ok(css.includes('grid-template-columns:repeat(4,minmax(0,1fr))'));
 assert.ok(css.includes('grid-template-columns:repeat(2,minmax(0,1fr))'));
 assert.ok(css.includes('.malinoPlayCard:focus-visible'));
 assert.ok(css.includes('@media(prefers-reduced-motion:reduce)'));
 assert.ok(home.includes('aria-label={language==="pl"?"Wybierz rodzaj zabawy":"Spiel auswählen"}'));
 assert.ok(home.includes('alt="" loading="lazy"'));
 assert.ok(css.includes('"eyebrow eyebrow"'));
 assert.ok(css.includes('"headline headline"'));
 assert.ok(css.includes('"intro mascot"'));
 assert.ok(css.includes('"actions actions"'));
 assert.ok(css.includes('position:relative !important'));
 assert.ok(!home.includes('src="/maerchen/einhorn.webp"'));
 assert.ok(!home.includes('src="/dinosaurier/trex.webp"'));
 assert.ok(!home.includes('src="/maerchen/schloss.webp"'));
});

test("painting, audio and saved state logic remain untouched by home redesign",()=>{
 assert.ok(page.includes('const numberPalette=["#f6b73c","#2fa84f","#ec4e7a","#3d8bea"'));
 assert.ok(page.includes('onFill={(cell,total)=>paintNumberCell(cell,total)'));
 assert.ok(page.includes('setSavedNumberArt([item,...savedNumberArt].slice(0,18));playSound("success")'));
 assert.ok(page.includes('function MalinoNumberFloodBoard'));
});

test("four custom colored SVG illustrations exist and are local, with no executable markup",()=>{
 const assets=["coloring","puzzles","crafts","rewards"];
 for(const id of assets){
  const svg=readFileSync(new URL("../public/ui/home-"+id+".svg",import.meta.url),"utf8");
  assert.ok(svg.startsWith('<svg xmlns="http://www.w3.org/2000/svg"'));
  assert.ok(svg.includes('viewBox="0 0 420 280"'));
  assert.ok(svg.includes('linearGradient'));
  assert.ok(!svg.includes('<script'));
  assert.ok(!svg.includes('foreignObject'));
  assert.ok(!svg.includes('http://')||svg.includes('xmlns="http://www.w3.org/2000/svg"'));
  assert.ok(home.includes('/ui/home-'+id+'.svg'),id+" is referenced on the home screen");
 }
});

test("welcome headline, mascot and buttons occupy separate grid areas on mobile",()=>{
 const mobile=css.slice(css.indexOf("/* Malino Storybook Home v2 — clear hero"));
 assert.ok(mobile.includes('grid-template-areas:'));
 assert.match(mobile,/"headline headline"/);
 assert.match(mobile,/"intro mascot"/);
 assert.match(mobile,/"actions actions"/);
 assert.ok(mobile.includes("top:auto !important"));
 assert.ok(mobile.includes("position:relative !important"));
 assert.ok(home.indexOf('className="malinoStoryHeadline"')<home.indexOf('className="premiumHeroMascot malinoStoryMascot"'));
 assert.ok(home.indexOf('className="premiumHeroMascot malinoStoryMascot"')<home.indexOf('className="premiumHeroActions malinoStoryActions"'));
});
