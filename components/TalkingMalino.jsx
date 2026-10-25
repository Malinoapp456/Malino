"use client";
import {forwardRef,useEffect,useImperativeHandle,useRef,useState} from 'react';
import {createMalinoSpeech} from '../lib/malino-speech.mjs';

export default forwardRef(function TalkingMalino({instruction,soundEnabled,language,context},ref){
 const controller=useRef(null);
 const [supported,setSupported]=useState(false);
 const [status,setStatus]=useState('idle');
 const pl=language==='pl';
 useEffect(()=>{
  const speech=createMalinoSpeech(window,setStatus);
  controller.current=speech;setSupported(speech.supported);
  const hide=()=>{if(document.hidden)speech.stop();};
  document.addEventListener('visibilitychange',hide);
  return()=>{speech.stop();controller.current=null;document.removeEventListener('visibilitychange',hide);};
 },[]);
 useEffect(()=>{controller.current?.setEnabled(soundEnabled);},[soundEnabled]);
 useEffect(()=>{controller.current?.stop();},[context,instruction]);
 useImperativeHandle(ref,()=>({praise:type=>{if(instruction&&soundEnabled)controller.current?.praise(type);}}),[instruction,soundEnabled]);
 if(!instruction)return null;
 return <aside className="talkingMalino" data-i18n-ignore="true" aria-label={pl?'Mówiący Malino':'Malino spricht'}>
  <span className="talkingMalinoLion" aria-hidden="true">🦁</span>
  <div className="talkingMalinoCopy"><strong>{pl?'Malino podpowiada':'Malino hilft dir'}</strong>
   <p lang="de">{instruction}</p>
   <small role="status">{!soundEnabled?(pl?'Dźwięki są wyłączone.':'Die Töne sind ausgeschaltet.'):!supported?(pl?'Czytanie głosowe jest niedostępne w tej przeglądarce.':'Vorlesen ist in diesem Browser nicht verfügbar.'):status==='error'?(pl?'Nie udało się odtworzyć głosu. Spróbuj ponownie.':'Das Vorlesen hat nicht geklappt. Versuche es noch einmal.'):(pl?'Głos po niemiecku · posłuchaj, aby włączyć też pochwały.':'Auf Deutsch · nach dem Anhören lobt Malino deine Erfolge.')}</small>
  </div>
  <button type="button" disabled={!supported||!soundEnabled} onClick={()=>status==='speaking'?controller.current?.stop():controller.current?.instruction(instruction)}>
   {status==='speaking'?(pl?'⏹ Zatrzymaj':'⏹ Stopp'):(pl?'🔊 Posłuchaj instrukcji':'🔊 Anleitung anhören')}
  </button>
 </aside>;
});
