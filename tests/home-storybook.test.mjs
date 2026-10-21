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
 assert.ok(home.includes('malinoStoryMascotHello'));
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
 for(const img of ['/maerchen/einhorn.webp','/dinosaurier/trex.webp','/maerchen/schloss.webp']){
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
});

test("painting, audio and saved state logic remain untouched by home redesign",()=>{
 assert.ok(page.includes('const numberPalette=["#f6b73c","#2fa84f","#ec4e7a","#3d8bea"'));
 assert.ok(page.includes('onFill={(cell,total)=>paintNumberCell(cell,total)'));
 assert.ok(page.includes('setSavedNumberArt([item,...savedNumberArt].slice(0,18));playSound("success")'));
 assert.ok(page.includes('function MalinoNumberFloodBoard'));
});
