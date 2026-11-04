"use client";
import {useEffect,useState} from "react";

export default function CompletionGreeting({language,children}){
 const [visible,setVisible]=useState(true);
 useEffect(()=>{
  const timer=setTimeout(()=>setVisible(false),2400);
  return ()=>clearTimeout(timer);
 },[]);
 if(!visible)return null;
 return <div className="completionGreeting" role="status">
  <img className="successMascot" src="/ui/malino-mascot.webp" alt=""/>
  <b>{children||(language==="pl"?"Brawo!":"Geschafft!")}</b>
 </div>;
}
