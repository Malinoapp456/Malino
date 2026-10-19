import test from "node:test";
import assert from "node:assert/strict";
import {LANGUAGE_KEY,normalizedLanguage,translateGerman,installUiTranslation} from "../lib/i18n.mjs";

test("German remains default and only Polish is accepted as second locale",()=>{
 assert.equal(normalizedLanguage(null),"de");
 assert.equal(normalizedLanguage("unknown"),"de");
 assert.equal(normalizedLanguage("de"),"de");
 assert.equal(normalizedLanguage("pl"),"pl");
 assert.equal(LANGUAGE_KEY,"malino:language:v1");
});

test("Polish translation covers important screens, games, image names and parent controls",()=>{
 const cases=[
  ["Was möchtest du heute malen?","Co chcesz dzisiaj pokolorować?"],
  ["🇩🇪 Deutsch","🇩🇪 Niemiecki"],
  ["🌟 Tages-Challenge","🌟 Dzienne wyzwanie"],
  ["📚 Bibliothek","📚 Biblioteka"],
  ["🧩 Rätsel & Rebusse","🧩 Zagadki i rebusy"],
  ["Basteln & Spielen","Twórz i baw się"],
  ["Triceratops am Vulkan","Triceratops przy wulkanie"],
  ["Fuchs im Wald","Lis w lesie"],
  ["Logik-Wald","Las logiki"],
  ["Was passt nicht?","Co nie pasuje?"],
  ["Elternbereich","Panel rodzica"],
  ["🔊 Töne","🔊 Dźwięki"],
  ["⏱️ Bildschirmzeit","⏱️ Czas przed ekranem"],
  ["Profil löschen","Usuń profil"],
  ["5 Jahre","5 lat"],
  ["Finde 7 Unterschiede","Znajdź 7 różnic"],
  ["  Bibliothek  ","  Biblioteka  "],
  ["↗️ Teilen / Drucken","↗️ Udostępnij / drukuj"],
  ["🥇 Malino","🥇 Malino"],
  ["Mia","Mia"]
 ];
 for(const [german,polish] of cases){
  assert.equal(translateGerman(german,"pl"),polish,german);
  assert.equal(translateGerman(german,"de"),german);
 }
});

class FakeElement {
 constructor(tag="div"){
  this.nodeType=1;
  this.tagName=tag.toUpperCase();
  this.childNodes=[];
  this.parentElement=null;
  this.attrs=new Map();
  this.ownerDocument=null;
 }
 closest(selector){
  // Minimal stand-in for eligible() on the test tree.
  if(selector.includes("input") && this.tagName==="INPUT")return this;
  if(selector.includes("textarea") && this.tagName==="TEXTAREA")return this;
  if(this.attrs.has("data-i18n-ignore"))return this;
  return this.parentElement?.closest(selector)??null;
 }
 hasAttribute(name){return this.attrs.has(name)}
 getAttribute(name){return this.attrs.get(name)??null}
 setAttribute(name,value){this.attrs.set(name,value)}
 appendChild(child){child.parentElement=this;this.childNodes.push(child)}
}
function makeText(value){return {nodeType:3,nodeValue:value,parentElement:null}}

test("DOM localization restores German and handles dynamically mounted screens and labels",()=>{
 let lastObserver=null;
 class StubObserver{
  constructor(callback){this.callback=callback;lastObserver=this}
  observe(){this.started=true}
  disconnect(){this.stopped=true}
  dispatch(mutations){this.callback(mutations)}
 }
 const root=new FakeElement();
 root.ownerDocument={defaultView:{MutationObserver:StubObserver}};
 const heading=makeText("Willkommen bei Malino");
 root.appendChild(heading);
 const input=new FakeElement("input");
 input.setAttribute("placeholder","z. B. Mia");
 root.appendChild(input);
 const button=new FakeElement("button");
 button.setAttribute("aria-label","Löschen");
 root.appendChild(button);

 const stopPl=installUiTranslation(root,"pl");
 assert.equal(heading.nodeValue,"Witaj w Malino");
 // Inputs retain user data; placeholder is translated through the attribute layer.
 assert.equal(button.getAttribute("aria-label"),"Usuń");
 const dynamic=new FakeElement("div");
 const newText=makeText("Bildschirmzeit");
 dynamic.appendChild(newText);
 root.appendChild(dynamic);
 lastObserver.dispatch([{type:"childList",addedNodes:[dynamic]}]);
 assert.equal(newText.nodeValue,"Czas przed ekranem");
 stopPl();

 const stopDe=installUiTranslation(root,"de");
 assert.equal(heading.nodeValue,"Willkommen bei Malino");
 assert.equal(newText.nodeValue,"Bildschirmzeit");
 assert.equal(button.getAttribute("aria-label"),"Löschen");
 stopDe();
});

test("manual language picker remains untranslated",()=>{
 const root=new FakeElement();
 root.ownerDocument={defaultView:{}};
 const picker=new FakeElement();
 picker.setAttribute("data-i18n-ignore","true");
 const label=makeText("Deutsch");
 picker.appendChild(label);
 root.appendChild(picker);
 installUiTranslation(root,"pl");
 assert.equal(label.nodeValue,"Deutsch");
});
