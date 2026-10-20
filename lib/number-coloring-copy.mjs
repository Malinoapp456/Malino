/**
 * User-facing copy for Malino's paint-by-number experience.
 * The image IDs, number masks, painted region IDs and reward logic
 * remain independent of these translations.
 */
const notes=Object.freeze({
 rocket:Object.freeze({
  de:"🚀 Tippe direkt in die nummerierten Flächen der Rakete.",
  pl:"🚀 Dotykaj ponumerowanych pól na obrazku rakiety."
 }),
 dino:Object.freeze({
  de:"🦕 Tippe direkt in die nummerierten Flächen des Dinosauriers.",
  pl:"🦕 Dotykaj ponumerowanych pól na obrazku dinozaura."
 }),
 unicorn:Object.freeze({
  de:"🦄 Tippe direkt in die nummerierten Flächen des Einhorns.",
  pl:"🦄 Dotykaj ponumerowanych pól na obrazku jednorożca."
 }),
 robot:Object.freeze({
  de:"🤖 Tippe direkt in die nummerierten Flächen des Roboters.",
  pl:"🤖 Dotykaj ponumerowanych pól na obrazku robota."
 }),
 malino:Object.freeze({
  de:"✨ Weißes T-Shirt bleibt frei. Beide Träger sind Feld 2. Die Mähne nutzt alle 4 Farben.",
  pl:"✨ Biała koszulka pozostaje niepokolorowana. Obie szelki mają numer 2. Grzywa wykorzystuje wszystkie 4 kolory."
 })
});

export function numberColoringNote(themeId,language="de"){
 return (notes[themeId]||notes.malino)[language==="pl"?"pl":"de"];
}

const printCopy=Object.freeze({
 de:Object.freeze({
  heading:"Malen nach Zahlen",
  instruction:"Male jedes Feld in der Farbe seiner Nummer aus.",
  colors:"Farben:",
  footer:"Malino – kreative Spielzeit ohne Bildschirm",
  shareTitle:"Malino – Malen nach Zahlen"
 }),
 pl:Object.freeze({
  heading:"Kolorowanie według numerów",
  instruction:"Pokoloruj każde pole kolorem przypisanym do jego numeru.",
  colors:"Kolory:",
  footer:"Malino – kreatywna zabawa bez ekranu",
  shareTitle:"Malino – Kolorowanie według numerów"
 })
});

export function numberColoringPrintCopy(language="de"){
 return printCopy[language==="pl"?"pl":"de"];
}
