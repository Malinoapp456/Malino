// Pure, deterministic maze movement helpers. Cells use the existing t/r/b/l wall flags.
const directions={
 up:{dx:0,dy:-1,wall:"t",other:"b"},
 right:{dx:1,dy:0,wall:"r",other:"l"},
 down:{dx:0,dy:1,wall:"b",other:"t"},
 left:{dx:-1,dy:0,wall:"l",other:"r"}
};

export function mazeCanStep(maze,from,to){
 const cols=maze?.cols,rows=maze?.rows,cells=maze?.cells;
 if(!Number.isInteger(cols)||!Number.isInteger(rows)||cols<=0||rows<=0||!Array.isArray(cells)||cells.length!==cols*rows)return false;
 if(!Number.isInteger(from)||!Number.isInteger(to)||from<0||to<0||from>=cells.length||to>=cells.length)return false;
 const a={x:from%cols,y:Math.floor(from/cols)},b={x:to%cols,y:Math.floor(to/cols)};
 for(const dir of Object.values(directions)){
  if(b.x-a.x===dir.dx&&b.y-a.y===dir.dy)
   return cells[from]?.[dir.wall]===0&&cells[to]?.[dir.other]===0;
 }
 return false;
}

export function mazeTryMove(maze,from,direction){
 const dir=directions[direction];
 if(!dir||!Number.isInteger(from)||!Number.isInteger(maze?.cols)||maze.cols<=0)return from;
 const x=from%maze.cols,y=Math.floor(from/maze.cols);
 const to=(y+dir.dy)*maze.cols+(x+dir.dx);
 return mazeCanStep(maze,from,to)?to:from;
}

// Coordinates measured in cell units (0..cols, 0..rows).
// Sample pointer motion so a fast swipe can never jump through a wall.
export function mazeTraceDrag(maze,from,start,end){
 if(!maze?.cols||!maze?.rows||!start||!end||![start.x,start.y,end.x,end.y].every(Number.isFinite))return [];
 const dx=end.x-start.x,dy=end.y-start.y;
 const steps=Math.min(1200,Math.max(1,Math.ceil(Math.max(Math.abs(dx),Math.abs(dy))*14)));
 const traversed=[];
 let current=from;
 for(let i=1;i<=steps;i++){
  const x=start.x+dx*i/steps,y=start.y+dy*i/steps;
  if(x<0||y<0||x>=maze.cols||y>=maze.rows)break;
  const next=Math.floor(y)*maze.cols+Math.floor(x);
  if(next===current)continue;
  if(!mazeCanStep(maze,current,next))continue;
  traversed.push(next);
  current=next;
  if(current===maze.cols*maze.rows-1)break;
 }
 return traversed;
}
