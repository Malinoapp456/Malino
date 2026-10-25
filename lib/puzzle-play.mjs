// Pure interactive-puzzle logic; the paper PDF game keeps its original grid.
export function puzzleGridForCount(count){
 const grids={4:[2,2],6:[3,2],9:[3,3],12:[4,3]};
 return grids[count]||grids[6];
}

export function puzzleShuffledOrder(count,seed="malino"){
 const length=Number.isInteger(count)&&count>0&&count<=24?count:6;
 const result=Array.from({length},(_,i)=>i);
 let state=2166136261;
 for(const character of String(seed))state=Math.imul(state^character.charCodeAt(0),16777619)>>>0;
 const rand=()=>{state^=state<<13;state^=state>>>17;state^=state<<5;return (state>>>0)/4294967296};
 for(let i=result.length-1;i>0;i--){
  const j=Math.floor(rand()*(i+1));
  [result[i],result[j]]=[result[j],result[i]];
 }
 if(result.length>1&&result.every((value,i)=>value===i))result.reverse();
 return result;
}

export function puzzleTargetFromPoint(point,rect,cols,rows){
 if(!point||!rect||!Number.isInteger(cols)||!Number.isInteger(rows)||cols<=0||rows<=0||
    !Number.isFinite(rect.left)||!Number.isFinite(rect.top)||!Number.isFinite(rect.width)||!Number.isFinite(rect.height)||
    rect.width<=0||rect.height<=0||!Number.isFinite(point.x)||!Number.isFinite(point.y))return -1;
 const x=(point.x-rect.left)/rect.width;
 const y=(point.y-rect.top)/rect.height;
 if(x<0||x>=1||y<0||y>=1)return -1;
 return Math.floor(y*rows)*cols+Math.floor(x*cols);
}

// All free slots accept pieces. Players can place pieces temporarily in
// the wrong location, then freely reposition or swap them to solve the image.
export function puzzleCanPlace(pieceId,slotId,count,layout=[]){
 return Number.isInteger(pieceId)&&Number.isInteger(slotId)&&
  Number.isInteger(count)&&count>0&&pieceId>=0&&pieceId<count&&
  slotId>=0&&slotId<count&&layout.length===count;
}

export function puzzleMovePiece(layout,pieceId,slotId){
 if(!Array.isArray(layout)||!puzzleCanPlace(pieceId,slotId,layout.length,layout))return layout;
 const origin=layout.indexOf(pieceId),occupant=layout[slotId];
 if(origin===slotId)return layout;
 const next=[...layout];
 // Moving one piece over another swaps them; placing from the tray sends
 // the displaced piece back into the tray. No pieces are lost or duplicated.
 if(origin>=0)next[origin]=occupant??null;
 next[slotId]=pieceId;
 return next;
}

export function puzzleReturnToTray(layout,pieceId){
 if(!Array.isArray(layout)||!Number.isInteger(pieceId))return layout;
 const origin=layout.indexOf(pieceId);
 if(origin<0)return layout;
 const next=[...layout];
 next[origin]=null;
 return next;
}

export function puzzleIsComplete(layout){
 return Array.isArray(layout)&&layout.length>0&&
  layout.every((value,slot)=>value===slot);
}

export function puzzlePieceBackground(pieceId,cols,rows){
 const col=pieceId%cols,row=Math.floor(pieceId/cols);
 return {
  backgroundSize:`${cols*100}% ${rows*100}%`,
  backgroundPosition:`${cols===1?0:col/(cols-1)*100}% ${rows===1?0:row/(rows-1)*100}%`,
  backgroundRepeat:"no-repeat"
 };
}
