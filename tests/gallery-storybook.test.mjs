import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");
const galleryStart=page.indexOf('{screen==="gallery"&&<section className="galleryPage premiumGalleryPage storybookGalleryPage">');
const galleryEnd=page.indexOf("\n  {rewardPopup&&",galleryStart);
const gallery=page.slice(galleryStart,galleryEnd);

test("storybook gallery changes decoration only and preserves existing image list",()=>{
 assert.ok(galleryStart>=0&&galleryEnd>galleryStart);
 assert.ok(gallery.includes('className="galleryGrid premiumGalleryGrid storyGalleryGrid"'));
 assert.ok(gallery.includes("gallery.map((x,index)=>"));
 assert.ok(gallery.includes('className={`galleryCard premiumGalleryCard storyGalleryCard galleryFrame-${activeFrame} ${index===0?"latest":""}`}'));
 assert.ok(gallery.includes("index===0&&<span"));
 assert.ok(gallery.includes("latestBadge"));
 assert.ok(gallery.includes("gallery.length===1?"));
});

test("saved art previews are still loaded by profile; gallery links and favorites are unchanged",()=>{
 assert.ok(gallery.includes('<ArtworkThumb it={x} profileId={activeProfileId}/>'));
 assert.ok(gallery.includes('onClick={()=>open(x,true)}'));
 assert.ok(gallery.includes('onClick={()=>open(gallery[0],true)}'));
 assert.ok(gallery.includes('onClick={()=>setFav(fav.includes(x.id)?fav.filter(id=>id!==x.id):[...fav,x.id])}'));
 assert.ok(gallery.includes('galleryFrame-${activeFrame}'));
 assert.ok(page.includes('loadArtwork(profileId,it.id)'));
 assert.ok(page.includes('URL.createObjectURL(record.preview)'));
 assert.ok(page.includes('URL.revokeObjectURL(blobUrl)'));
});

test("empty gallery offers the original coloring action with decorative mascot",()=>{
 assert.ok(gallery.includes('className="galleryEmpty premiumGalleryEmpty storyGalleryEmpty"'));
 assert.ok(gallery.includes('className="galleryEmptyMascot storyGalleryEmptyMascot"'));
 assert.ok(gallery.includes('/ui/malino-mascot.webp'));
 assert.ok(gallery.includes("Noch keine Kunstwerke"));
 assert.ok(gallery.includes('onClick={()=>setScreen("library")}'));
 assert.ok(gallery.includes("Erstes Bild auswählen"));
});

test("storybook gallery styles are responsive and keep artwork uncropped",()=>{
 assert.ok(css.includes("Malino Storybook Gallery v1"));
 assert.ok(css.includes(".storybookGalleryPage .storyGalleryOpen .thumb img"));
 assert.ok(css.includes("object-fit:contain"));
 assert.ok(css.includes(".storybookGalleryPage button:focus-visible"));
 assert.ok(css.includes("@media(max-width:900px)"));
 assert.ok(css.includes("@media(max-width:650px)"));
 assert.ok(css.includes("@media(max-width:375px)"));
 assert.ok(css.includes("@media(prefers-reduced-motion:reduce)"));
 assert.ok(css.includes("grid-template-columns:repeat(2,minmax(0,1fr))"));
});

test("approved library, rewards, global logo and coloring engine remain intact",()=>{
 assert.ok(page.includes('className="libraryPage libraryStoryPage"'));
 assert.ok(page.includes('className="rewardsHub storyRewardsHub"'));
 assert.ok(page.includes('src="/ui/malino-logo-premium-approved.webp"'));
 assert.ok(page.includes("function MalinoNumberFloodBoard"));
 assert.ok(page.includes('setSavedNumberArt([item,...savedNumberArt].slice(0,18));playSound("success")'));
});
