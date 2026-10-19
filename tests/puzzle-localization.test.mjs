import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {translateGerman} from "../lib/i18n.mjs";

const source=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const start=source.indexOf(" const puzzleCards=[");
const end=source.indexOf(" const solvedPuzzleCount=",start);
assert.ok(start>=0&&end>start,"Puzzle definitions must remain available");
const puzzleDefinitions=source.slice(start,end);

function extractQuizStrings(){
 const props=[...puzzleDefinitions.matchAll(/\b(?:title|task|hint|options):\s*("[^"]*"|\[[^\]]*\])/g)];
 const values=props.flatMap(x=>
   x[1].startsWith("[")
    ? [...x[1].matchAll(/"([^"]+)"/g)].map(y=>y[1])
    : [x[1].slice(1,-1)]
 );
 return [...new Set(values)];
}

test("every real puzzle task, text choice and hint has a Polish translation",()=>{
 const strings=extractQuizStrings();
 assert.ok(strings.length>=100,"Coverage must include all 20 puzzles");
 for(const original of strings){
  // Emoji-only and one-letter quiz responses are language-independent.
  const letters=[...original.matchAll(/\p{L}/gu)].length;
  if(letters<2)continue;
  const polish=translateGerman(original,"pl");
  assert.notEqual(polish,original,`Missing Polish translation: ${original}`);
  assert.equal(translateGerman(original,"de"),original);
 }
});

test("letter quiz has a valid initial A in both languages",()=>{
 assert.equal(translateGerman("Apfel","pl"),"Ananas");
 assert.equal(translateGerman("Welches Wort beginnt mit A?","pl"),
   "Które słowo zaczyna się na A?");
 // The canonical answer is still checked by its German source value.
 assert.match(source,/onClick=\{\(\)=>answerPuzzle\(p,option\)\}>\{puzzleText\(option\)\}/);
});

test("all world-map feedback is translated at render time, including age ranges",()=>{
 const cases=[
  ["+3 Sterne für dich!","+3 gwiazdki dla Ciebie!"],
  ["Dieses Rätsel kennst du schon.","Tę zagadkę już znasz."],
  ["Schon gelöst","Już rozwiązano"],
  ["3 Sterne beim ersten richtigen Lösen","3 gwiazdki za pierwszą poprawną odpowiedź"],
  ["Du kannst es jederzeit wiederholen.","Możesz rozwiązać ją ponownie."],
  ["4–6 Jahre","4–6 lat"],
  ["5–7 Jahre","5–7 lat"],
  ["🚲 Fahrrad","🚲 Rower"],
  ["🔴 Rot","🔴 Czerwony"]
 ];
 for(const [de,pl] of cases)assert.equal(translateGerman(de,"pl"),pl,de);
 assert.match(source,/<p>\{puzzleText\(p\.task\)\}<\/p>/);
 assert.match(source,/<small>\{puzzleText\(p\.hint\)\}<\/small>/);
});
