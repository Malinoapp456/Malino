import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");
const sectionStart=page.indexOf('{screen==="parent"&&<section');
const sectionEnd=page.indexOf("  {screenTimeBlocked&&",sectionStart);
const parent=page.slice(sectionStart,sectionEnd);
const dialogsStart=page.indexOf('{profileDialog&&<div className="rewardUnlockOverlay"');
const dialogs=page.slice(dialogsStart,sectionStart);

test("storybook child profiles preserve the original profile list, switching and active state",()=>{
 assert.ok(sectionStart>0&&sectionEnd>sectionStart);
 assert.ok(parent.includes("className=\"parents storyParentsPage\""));
 assert.ok(parent.includes('profiles.map(p=><button key={p.id} type="button"'));
 assert.ok(parent.includes('aria-pressed={p.id===activeProfileId}'));
 assert.ok(parent.includes('onClick={()=>switchProfile(p.id)}'));
 assert.ok(parent.includes('profileData?.[p.id]?.avatar'));
 assert.ok(parent.includes('data-i18n-ignore="true">{p.name}'));
 assert.ok(parent.includes('p.id===activeProfileId?"✓ Aktiv":"›"'));
 assert.ok(parent.includes('className="storyProfileGrid"'));
});

test("profile management buttons keep existing handlers and prevent deletion of the last profile",()=>{
 for(const handler of ["addProfile","renameActiveProfile","resetActiveProfile","deleteActiveProfile"]){
  assert.ok(parent.includes('onClick={'+handler+'}'),handler);
 }
 assert.ok(parent.includes("profiles.length>1&&"));
 assert.ok(page.includes('if(profiles.length<=1)'));
 assert.ok(parent.includes("onClick={startParentPinChange}"));
 assert.ok(parent.includes("onClick={submitParentPin}"));
 assert.ok(parent.includes('parentPinMode!=="unlocked"'));
});

test("avatar selection remains data-driven for both add and rename dialogs",()=>{
 assert.ok(dialogs.includes('className="rewardUnlockCard storyProfileDialogCard"'));
 assert.equal((dialogs.match(/className="profileAvatarGrid storyProfileAvatarGrid"/g)||[]).length,2);
 assert.equal((dialogs.match(/PROFILE_AVATARS\.map\(a=>/g)||[]).length,2);
 assert.equal((dialogs.match(/setProfileAvatarInput\(a.id\)/g)||[]).length,2);
 assert.equal((dialogs.match(/aria-pressed=\{profileAvatarInput===a.id\}/g)||[]).length,2);
 assert.ok(dialogs.includes('onClick={confirmProfileDialog}'));
 assert.ok(dialogs.includes('onClick={closeProfileDialog}'));
 assert.ok(dialogs.includes("profileNameInput.trim()"));
});

test("profile progress storage, safe reset and switch behavior were not modified",()=>{
 assert.ok(page.includes('setActiveProfileId(id)'));
 assert.ok(page.includes('setProfiles(prev=>[...prev,{id,name:clean}])'));
 assert.ok(page.includes('setProfileData(prev=>({...prev,[id]:{...emptyProfileData(),avatar:profileAvatarInput}}))'));
 assert.ok(page.includes('setProfiles(prev=>prev.map(p=>p.id===activeProfileId?{...p,name:clean}:p))'));
 assert.ok(page.includes('deleteProfileArtwork(activeProfileId).catch(()=>{})'));
 assert.ok(page.includes('setProfileData(prev=>({...prev,[activeProfileId]:{...emptyProfileData(),avatar:prev?.[activeProfileId]?.avatar||"lion",activeFrame:prev?.[activeProfileId]?.activeFrame||"classic"}}))'));
 assert.ok(parent.includes('profileStatsDone.length'));
 assert.ok(parent.includes('profileStatsStars'));
 assert.ok(parent.includes('profileStatsGallery.length'));
 assert.ok(parent.includes('profileStatsRewards.length'));
 assert.ok(parent.includes('dailyStreak'));
});

test("storybook profile layout and avatar dialog are responsive and keyboard accessible",()=>{
 assert.ok(css.includes("Malino Storybook Profiles v1"));
 assert.ok(css.includes(".storyParentsPage .storyProfileGrid"));
 assert.ok(css.includes(".storyParentsPage .storyProfileChoice.isActive"));
 assert.ok(css.includes(".storyProfileDialogCard .storyProfileAvatarGrid button.selected"));
 assert.ok(css.includes(".storyParentsPage .storyProfileChoice:focus-visible"));
 assert.ok(css.includes("@media(max-width:1100px)"));
 assert.ok(css.includes("@media(max-width:650px)"));
 assert.ok(css.includes("@media(max-width:360px)"));
 assert.ok(css.includes("@media(prefers-reduced-motion:reduce)"));
});

test("previously approved visuals, audio and coloring engine remain intact",()=>{
 assert.ok(page.includes('className="libraryPage libraryStoryPage"'));
 assert.ok(page.includes('className="rewardsHub storyRewardsHub"'));
 assert.ok(page.includes('className="galleryPage premiumGalleryPage storybookGalleryPage"'));
 assert.ok(page.includes('className="todayAdventureGrid storyTodayAdventureGrid"'));
 assert.ok(page.includes('src="/ui/malino-logo-premium-approved.webp"'));
 assert.ok(page.includes("function MalinoNumberFloodBoard"));
 assert.ok(page.includes('setSavedNumberArt([item,...savedNumberArt].slice(0,18));playSound("success")'));
});
