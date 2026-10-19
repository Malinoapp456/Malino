/**
 * Presentation-only copy for the five puzzle worlds.
 * Stable world IDs, unlock thresholds, solved puzzle counts and rewards are
 * deliberately managed by app/page.js; these helpers cannot change progress.
 */
export function worldStatus({solved,total,unlocked,required},language="de"){
 const pl=language==="pl";
 if(!unlocked)return pl?`🔒 Ukończ ${required} zagadek`:`🔒 ${required} Rätsel nötig`;
 if(solved>=total)return pl?"✓ Ukończono":"✓ Geschafft";
 return pl?"Otwórz ›":"Öffnen ›";
}
export function worldProgressMessage(solved,total,language="de"){
 const complete=total>0&&solved>=total;
 if(language==="pl"){
  return complete?"Fantastycznie! Wszystkie zagadki rozwiązane!":"Tak trzymaj! Świetnie Ci idzie!";
 }
 return complete?"Fantastisch! Alle Rätsel geschafft!":"Weiter so! Du bist auf einem tollen Weg!";
}
export function worldAccessibilityLabel(title,solved,total,unlocked,required,language="de"){
 const progress=language==="pl"?`${solved} z ${total} rozwiązanych`:`${solved} von ${total} gelöst`;
 return `${title}, ${progress}, ${worldStatus({solved,total,unlocked,required},language)}`;
}
