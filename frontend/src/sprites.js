// Original, code-drawn sprites. Rasterize geometric strokes onto a 25 x 25 grid.
const palettes=[
 ['#fff8e7','#e9d5df','#f5cc6d'],['#bba3e5','#8b77ba','#e3cffa'],['#fff6d6','#e9d8b4','#e9b652'],['#f3b4d3','#cf82b3','#f6d282'],['#f6bfd5','#d68caf','#ffe2ae'],
 ['#ffe5a7','#e5b669','#fff5d0'],['#aab9ed','#7f91c8','#dfe9fb'],['#fff9ef','#dfd6e0','#eacc81'],['#c1a6e3','#8c77bf','#edc26a'],['#bad8ef','#8aafcf','#fff1b1'],
 ['#edb1cc','#bd7f9f','#ffe0dc'],['#d4b5e5','#a483c3','#f4d7e7'],['#f0b0c3','#d184a4','#f8d9e2'],['#afcef1','#7fadd0','#ffe5a0'],['#f5c7d3','#d8a0b8','#f6dd8a'],
 ['#f9d986','#deaf58','#fff0b4'],['#ffe6a1','#e4c66e','#e9ad53'],['#c3a7e2','#9375bf','#eecf7d'],['#f8dfa0','#d7b769','#fff1ca'],['#eeb4c2','#bd879c','#f4dfc5'],
 ['#fff9ef','#dacfdc','#e5c16e'],['#fff9e7','#dedac5','#f0dfad'],['#f4cda5','#d7a083','#f8e5b5'],['#f4b8d0','#cf8da9','#ffdfca'],['#fae6eb','#d7b8cf','#dcb66e'],
];
export function flowerSprite(id){
 const pixels=Array.from({length:25},()=>Array(25).fill(null));
 const put=(x,y,c)=>{if(x>=0&&x<25&&y>=0&&y<25)pixels[y][x]=c};
 const ellipse=(cx,cy,rx,ry,c)=>{for(let y=Math.floor(cy-ry);y<=cy+ry;y++)for(let x=Math.floor(cx-rx);x<=cx+rx;x++)if((x-cx)**2/rx**2+(y-cy)**2/ry**2<=1)put(x,y,c)};
 const rect=(x,y,w,h,c)=>{for(let yy=y;yy<y+h;yy++)for(let xx=x;xx<x+w;xx++)put(xx,yy,c)};
 const petal=(x,y,rx,ry)=>{ellipse(x,y,rx,ry,1);ellipse(x-1,y-1,Math.max(1,rx-1),Math.max(1,ry-1),0)};
 const ring=(count,cx,cy,spread,rx,ry,offset=0)=>{for(let i=0;i<count;i++){const a=i*Math.PI*2/count+offset;petal(Math.round(cx+Math.cos(a)*spread),Math.round(cy+Math.sin(a)*spread),rx,ry)}};
 switch(id){
 case 0:ring(8,12,12,6,3,3);ellipse(12,12,4,4,2);break;
 case 1:rect(12,3,1,20,3);for(let y=4;y<21;y+=4){petal(10,y,3,2);petal(14,y+2,3,2)}break;
 case 2:ring(10,12,12,5,2,4);ellipse(12,12,3,3,2);break;
 case 3:ring(8,12,12,5,4,4);ellipse(12,12,3,3,2);break;
 case 4:petal(12,9,4,8);petal(6,13,4,6);petal(18,13,4,6);petal(8,17,6,3);petal(16,17,6,3);ellipse(12,17,4,2,2);break;
 case 5:for(let i=0;i<4;i++){petal(6+i*4,16-i*3,4,4);ellipse(6+i*4,16-i*3,1,2,2)}break;
 case 6:rect(12,3,1,20,3);for(let i=0;i<3;i++){const x=i%2?16:8,y=5+i*6;petal(x,y,4,3);rect(x-4,y,9,4,0);rect(x-4,y+4,2,2,1);rect(x+3,y+4,2,2,1)}break;
 case 7:ring(5,12,12,4,4,3,-1.5);ellipse(12,12,2,2,2);break;
 case 8:petal(12,7,3,6);petal(6,9,4,5);petal(18,9,4,5);petal(6,17,4,4);petal(18,17,4,4);petal(12,15,3,6);rect(11,11,3,7,2);break;
 case 9:for(let y=2;y<23;y++)for(let x=2;x<23;x++){const r=Math.hypot(x-12,y-12),a=Math.atan2(y-12,x-12);if(r<6+3*Math.cos(5*a+1.5))put(x,y,(x+y)%5?0:1)}ellipse(12,12,2,2,2);break;
 case 10:petal(12,12,8,8);ring(5,12,12,3,4,3);rect(9,9,7,2,1);rect(9,9,2,6,1);rect(11,13,5,2,1);rect(14,11,2,4,1);break;
 case 11:petal(8,8,6,6);petal(17,9,5,5);petal(12,16,6,5);petal(12,15,3,3);break;
 case 12:ring(10,12,12,5,3,4);ring(7,12,12,2,3,3);ellipse(12,12,2,2,1);break;
 case 13:for(const [x,y] of [[7,7],[17,9],[10,18]]){ring(5,x,y,3,2,2);ellipse(x,y,1,1,2)}break;
 case 14:ring(5,12,12,5,5,4,-1.5);ring(5,12,12,3,2,2,-1.5);ellipse(12,12,2,2,2);break;
 case 15:petal(12,13,7,7);petal(6,9,2,7);petal(18,9,2,7);petal(12,8,3,7);rect(11,11,2,8,2);break;
 case 16:ring(6,12,12,5,4,3);ellipse(12,12,4,4,2);ellipse(12,11,2,2,1);break;
 case 17:petal(8,12,3,8);petal(16,12,3,8);petal(12,10,3,9);rect(12,11,1,6,2);break;
 case 18:ring(12,12,12,6,2,3);ring(9,12,12,3,2,2);ellipse(12,12,2,2,2);break;
 case 19:petal(12,13,8,9);for(let i=0;i<5;i++)petal(6+i*3,9+Math.abs(i-2)*2,2,7);ellipse(12,13,4,6,2);for(let i=8;i<17;i+=3)rect(i,10,1,7,1);break;
 case 20:ring(6,12,12,5,5,4);ring(5,12,12,2,3,3);ellipse(12,12,3,2,2);break;
 case 21:ring(6,12,12,5,5,3,.4);ring(5,12,12,2,4,2);ellipse(12,12,2,2,2);break;
 case 22:petal(12,12,9,8);for(let r=7;r>1;r-=2){ellipse(12,12,r,r,1);ellipse(11,11,r-1,r-1,0)}ellipse(12,12,1,1,2);break;
 case 23:ring(8,12,12,5,5,5);ring(6,12,12,3,4,4);ring(5,12,12,1,2,2);break;
 case 24:ring(6,12,12,5,3,6,.4);ellipse(12,12,2,3,2);break;
 }
 // One-pixel dark border makes small flowers legible against pastel scenery.
 const cells=[];
 for(let y=0;y<25;y++)for(let x=0;x<25;x++){
  const value=pixels[y][x];
  if(value!==null)cells.push([x,y,value===3?'#769572':palettes[id][value]]);
  else if([[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dy])=>pixels[y+dy]?.[x+dx]!=null))cells.push([x,y,'#514156']);
 }
 return cells;
}
export const sprites=Array.from({length:25},(_,id)=>flowerSprite(id));
