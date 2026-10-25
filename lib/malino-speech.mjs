export const SPOKEN_HELP={
 start:'Hallo! Ich bin Malino. Wähle ein Abenteuer und spiele mit mir!',
 library:'Wähle ein Bild, das du ausmalen möchtest.',
 paint:'Wähle eine Farbe und tippe auf dein Bild. Mit dem Pinsel kannst du selbst malen.',
 puzzles:'Wähle eine Aufgabe. Schau genau hin und tippe auf deine Antwort.',
 puzzle:'Wähle ein Puzzleteil. Tippe danach auf seinen Platz im Bild. Du kannst die Teile auch ziehen und tauschen.',
 maze:'Finde den Weg zum Ziel. Ziehe die Figur durch das Labyrinth.',
 difference:'Schau dir beide Bilder genau an. Tippe auf die Unterschiede.',
 hidden:'Suche die versteckten Dinge im Bild und tippe sie an.',
 numbers:'Wähle eine Zahl und male die Felder mit derselben Zahl aus.',
 memory:'Decke zwei Karten auf. Findest du zwei gleiche Bilder? Merke dir die Bilder und finde alle Paare!',
 print:'Gestalte deine Vorlage. Lass dir beim Drucken und Ausschneiden von einem Erwachsenen helfen.'
};
export function spokenHelp(screen,mode,playMode){
 if(screen==='crafts')return playMode==='print'?SPOKEN_HELP.print:SPOKEN_HELP[mode];
 return SPOKEN_HELP[screen];
}
export function createMalinoSpeech(host,onState=()=>{},now=()=>Date.now()){
 const synth=host?.speechSynthesis, Utterance=host?.SpeechSynthesisUtterance;
 let enabled=true,activated=false,current=null,lastPraise=-Infinity,serial=0;
 const supported=!!(synth&&Utterance);
 const stop=()=>{serial++;current=null;if(supported)synth.cancel();onState('idle');};
 const speak=(text)=>{
  if(!enabled||!supported||!text)return false;
  stop();const token=serial;
  try{
   current=new Utterance(text);current.lang='de-DE';current.rate=0.88;
   const voices=synth.getVoices();
   current.voice=voices.find(v=>/^de[-_]DE$/i.test(v.lang))||voices.find(v=>/^de([-_]|$)/i.test(v.lang))||null;
   current.onend=()=>{if(token===serial){current=null;onState('idle');}};
   current.onerror=()=>{if(token===serial){current=null;onState('error');}};
   onState('speaking');synth.speak(current);return true;
  }catch{current=null;onState('error');return false;}
 };
 return {supported,stop,
  setEnabled(value){enabled=value;if(!enabled){activated=false;stop();}},
  instruction(text){if(!enabled||!supported)return false;activated=true;return speak(text);},
  praise(type){
   if(!enabled||!activated||current||now()-lastPraise<6000)return false;
   const text=type==='success'?'Toll, weiter so!':['reward','stars'].includes(type)?'Super gemacht! Ich bin stolz auf dich!':null;
   if(!text)return false;
   const result=speak(text);if(result)lastPraise=now();return result;
  }
 };
}
