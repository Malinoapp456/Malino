import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");
const from=page.indexOf('{screen==="library"&&<section className="libraryPage libraryStoryPage">');
const to=page.indexOf("\n\n  {screen===",from+15);
const library=page.slice(from,to);
const tones=["all","animals","dinos","farm","vehicles","space","fairy"];

test("storybook library covers all seven current categories with colorful vector illustrations",()=>{
 assert.ok(from>0&&to>from);
 const meta=page.slice(page.indexOf("const categoryMeta={"),page.indexOf("const colors=",page.indexOf("const categoryMeta={")));
 for(const tone of tones){
  assert.ok(meta.includes('tone:"'+tone+'"'),"category tone: "+tone);
  const path="../public/ui/library-"+tone+".svg";
  const svg=readFileSync(new URL(path,import.meta.url),"utf8");
  assert.ok(svg.startsWith('<svg xmlns="http://www.w3.org/2000/svg"'),tone);
  assert.ok(svg.includes('viewBox="0 0 320 190"'),tone);
  assert.ok(svg.includes('filter="url(#s)"'),tone);
  assert.ok(!svg.includes("<script")&&!svg.includes("<foreignObject")&&!svg.includes("<image"),tone);
 }
 assert.ok(library.includes('src={`/ui/library-${meta.tone}.svg`}'));
 assert.ok(library.includes('className="categoryIcon storyCategoryArt"'));
 assert.ok(library.includes('alt="" loading="lazy"'));
});

test("category controls still filter, update counts and expose selection state",()=>{
 assert.ok(library.includes("visibleCategories.map(c=>"));
 assert.ok(library.includes("categoryCount(c)"));
 assert.ok(library.includes("onClick={()=>setCat(c)}"));
 assert.ok(library.includes("aria-pressed={cat===c}"));
 assert.ok(library.includes('className="libraryCategories libraryStoryCategories"'));
 assert.ok(library.includes('cat===c?"isSelected":""'));
 assert.ok(library.includes("onClick={()=>setCat(\"Alle\")}"));
 assert.ok(library.includes("value={query}"));
});

test("image cards retain painting, favorites, progress indicators and reward unlocks",()=>{
 assert.ok(library.includes("filtered.map(x=>"));
 assert.ok(library.includes("favoriteItems.map(x=>"));
 assert.ok(library.includes("newItems.map(x=>"));
 assert.ok(library.includes("onClick={()=>open(x)}"));
 assert.ok(library.includes("onClick={()=>setFav("));
 assert.ok(library.includes("<Thumb it={x} done={done.includes(x.id)}/>"));
 assert.ok(library.includes("hasChest200"));
 assert.ok(library.includes("onClick={()=>open(secretMalinoItem)}"));
 assert.ok(library.includes('className="libraryGrid storyLibraryGrid"'));
 assert.ok(library.includes('className="libraryCard storyLibraryCard"'));
});

test("storybook library style is responsive and accessible without modifying paintings",()=>{
 assert.ok(css.includes("Malino Storybook Library v1"));
 assert.ok(css.includes(".libraryStoryPage .storyCategoryArt img"));
 assert.ok(css.includes(".libraryStoryPage .storyCategory:focus-visible"));
 assert.ok(css.includes("grid-template-columns:repeat(2,minmax(0,1fr))"));
 assert.ok(css.includes("@media(max-width:375px)"));
 assert.ok(css.includes("@media(prefers-reduced-motion:reduce)"));
 assert.ok(css.includes(".libraryStoryPage .storyLibraryCard .thumb>img"));
 assert.ok(css.includes("object-fit:contain"));
});

test("coloring engine, sound hooks and persistent progress remain intact",()=>{
 assert.ok(page.includes("function MalinoNumberFloodBoard"));
 assert.ok(page.includes("onFill={(cell,total)=>paintNumberCell(cell,total)"));
 assert.ok(page.includes('setSavedNumberArt([item,...savedNumberArt].slice(0,18));playSound("success")'));
 assert.ok(page.includes('src="/ui/malino-logo-premium-approved.webp"'));
});
