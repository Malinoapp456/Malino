import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");
const start=page.indexOf('<div className="homeSectionHeader adventureHeader storyAdventureHeader">');
const end=page.indexOf('<div className="homeSectionHeader">',start+30);
const daily=page.slice(start,end);

test("storybook illustrations are self-contained SVG with no external loads",()=>{
 assert.ok(start>0&&end>start);
 for(const name of ["star","flame"]){
  const svg=readFileSync(new URL("../public/ui/daily-story-"+name+".svg",import.meta.url),"utf8");
  assert.ok(svg.startsWith('<svg xmlns="http://www.w3.org/2000/svg"'),name);
  assert.ok(svg.includes('viewBox="0 0 180 180"'),name);
  assert.ok(svg.includes('filter="url(#s)"'),name);
  assert.ok(!svg.includes("<script")&&!svg.includes("<image")&&!svg.includes("<foreignObject"),name);
  assert.ok(daily.includes('src="/ui/daily-story-'+name+'.svg"'),name+" used on challenge card");
 }
});

test("daily challenge continues using the original daily item and claim state",()=>{
 assert.ok(daily.includes("dailyClaimed?\"dailyDone\":\"\""));
 assert.ok(daily.includes('<Thumb it={dailyItem} done={done.includes(dailyItem.id)}/>'));
 assert.ok(daily.includes('dailyClaimed?"Geschafft ✓":"+10 ⭐ Bonus"'));
 assert.ok(daily.includes('dailyClaimed?"Noch einmal malen":"Challenge starten!"'));
 assert.ok(daily.includes('dailyClaimed?"Heute schon geschafft.'));
 assert.ok(daily.includes('onClick={()=>open(dailyItem)}'));
 assert.ok(daily.includes('className="todayAdventureGrid storyTodayAdventureGrid"'));
});

test("streak progress preserves seven slots and original milestone thresholds",()=>{
 assert.ok(daily.includes('className="streakCard streakCardButton premiumStreakCard storyStreakCard"'));
 assert.ok(daily.includes('{dailyStreak} Tage Serie'));
 assert.ok(daily.includes("[1,2,3,4,5,6,7].map(n=>"));
 assert.ok(daily.includes('n<=Math.min(dailyStreak,7)'));
 assert.ok(daily.includes('dailyStreak>=7?"🏆 7+":dailyStreak>=3?"⭐ 3+":"🌱"'));
 assert.ok(daily.includes('dailyClaimed?"Heute gesichert ✓ – Challenge erneut öffnen"'));
});

test("daily bonus math and saved profile state are unchanged",()=>{
 assert.ok(page.includes("const dailyBonus=isTodayChallenge&&!dailyClaimed?10:0"));
 assert.ok(page.includes("const baseEarned=isNew?5:0"));
 assert.ok(page.includes("const earned=baseEarned+dailyBonus"));
 assert.ok(page.includes('updateProfileField("dailyClaims",value)'));
 assert.ok(page.includes('updateProfileField("dailyStreak",value)'));
 assert.ok(page.includes('updateProfileField("lastDailyDate",value)'));
 assert.ok(page.includes('playSound("streak")'));
});

test("visual changes are limited to storybook daily cards and responsive layouts",()=>{
 assert.ok(css.includes("Malino Storybook Daily v1"));
 assert.ok(css.includes(".malinoStoryHome .storyDailyCard"));
 assert.ok(css.includes(".malinoStoryHome .storyStreakCard"));
 assert.ok(css.includes(".malinoStoryHome .storyStreakDots i.on"));
 assert.ok(css.includes(".malinoStoryHome .storyStreakCard:focus-visible"));
 assert.ok(css.includes("@media(max-width:900px)"));
 assert.ok(css.includes("@media(max-width:650px)"));
 assert.ok(css.includes("@media(max-width:375px)"));
 assert.ok(css.includes("@media(prefers-reduced-motion:reduce)"));
});

test("previously approved library, rewards, gallery and premium logo remain",()=>{
 assert.ok(page.includes('className="libraryPage libraryStoryPage"'));
 assert.ok(page.includes('className="rewardsHub storyRewardsHub"'));
 assert.ok(page.includes('className="galleryPage premiumGalleryPage storybookGalleryPage"'));
 assert.ok(page.includes('src="/ui/malino-logo-premium-approved.webp"'));
 assert.ok(page.includes("function MalinoNumberFloodBoard"));
 assert.ok(page.includes('setSavedNumberArt([item,...savedNumberArt].slice(0,18));playSound("success")'));
});
