function Flower({x, petals, color}) {
 return <g transform={`translate(${x} 19)`}>
  <path d="M0 2v13q-6 0-8-5 5 0 8 3" fill="#74b96b" stroke="#47855a" strokeWidth="1.6"/>
  {Array.from({length:petals},(_,i)=><ellipse key={i} cy="-6" rx="3.8" ry="6" fill={color} stroke="#873958" strokeWidth="1.2" transform={`rotate(${i*60})`}/>)}
  <circle r="4.3" fill="#ffd760" stroke="#945f31"/>
 </g>;
}
function FoxCard({transform}) {
 return <g transform={transform}>
  <rect width="23" height="29" rx="4" fill="#fff8e8" stroke="#825287" strokeWidth="2"/>
  <path d="m3 8 6 3h5l6-3-1 11-7.5 5L4 19Z" fill="#f49a48" stroke="#8b513b" strokeWidth="1.2"/>
  <path d="m4 17 7.5 3 7.5-3-7.5 6Z" fill="#fff6da"/>
  <path d="M8 15v1m7-1v1m-4 4h1" stroke="#482e38" strokeWidth="2" strokeLinecap="round"/>
 </g>;
}
export default function CraftTileIcon({game}){
 return <svg className="craftTileArt" viewBox="0 0 56 40" aria-hidden="true" focusable="false">
  {game==="memory"&&<><FoxCard transform="translate(3 7) rotate(-9 11 14)"/><FoxCard transform="translate(29 4) rotate(8 11 14)"/></>}
  {game==="difference"&&<><Flower x={14} petals={6} color="#fa97aa"/><Flower x={42} petals={5} color="#fa97aa"/></>}
  {game==="hidden"&&<>
   <path d="M24 13c-8-5-15 1-12 11 3 10 9 11 13 8 5 3 12-1 13-10 1-8-6-12-14-9Z" fill="#ed6465" stroke="#a84448" strokeWidth="1.6"/>
   <path d="M24 14q0-7 3-10" fill="none" stroke="#765246" strokeWidth="3"/>
   <path d="M26 11q5-10 17-8-2 12-17 12Z" fill="#77bf75" stroke="#448451" strokeWidth="1.5"/>
   <path d="m33 25 11 10" stroke="#39506d" strokeWidth="6" strokeLinecap="round"/>
   <circle cx="26" cy="19" r="11" fill="#ebfaff" fillOpacity=".22" stroke="#39506d" strokeWidth="3"/>
  </>}
 </svg>;
}
