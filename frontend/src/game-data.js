import {fetchLetter} from './api.js';
import flowerData from './flowers.json' with {type:'json'};

export const flowers = flowerData;
export const questions = [
  'Mình ước mọi thứ có thể chậm lại một chút.',
  'Mình thấy khó ngừng suy nghĩ của bản thân, ngay cả khi biết mình cần nghỉ ngơi.',
  'Mình mong một người có thể ở bên cạnh và lắng nghe mình.',
  'Dạo này mình thấy mất phương hướng, chưa biết nên đi tiếp như thế nào.',
  'Dạo này mình thấy khó dành cho bản thân một chút quan tâm và dịu dàng.',
];
export const themes = ['Một nhịp chậm','Một khoảng lặng','Một người ở bên','Một hướng đi','Một chút dịu dàng'];
export const levels = flowers.slice(0,5).map(f=>f.label);
export const defaults={shape:0,color:3,decor:0,wall:0,pattern:1,window:0,item:3};
export const vaseColors=['#e8a5ba','#b9d9ba','#b5d3eb','#c7b4e6','#f0d291'];
export const wallColors=['#f5e0e5','#eee0f5','#e0eddf','#dfeaf5','#faf0d6','#f5d9d2','#d9eded','#e3ddf3','#e9ead3','#e8dce7'];
export const shapeNames=['Bình tròn','Cổ cao','Bình vuông','Bình bầu','Bình loe','Bình thon','Hai tầng','Bình thấp','Chân đế','Góc cạnh'];
export const decorNames=['Nơ nhỏ','Trái tim','Hoa nhỏ','Chấm bi','Sọc kem'];
export const patternNames=['Trơn','Chấm nhỏ','Sọc dọc','Ô vuông','Hoa tí hon'];
export const windowNames=['Vòm','Vuông','Tròn','Hai cánh','Mái nhọn'];
export const itemNames=['Khung ảnh','Thiên thần','Chó nhỏ','Mèo nhỏ','Đĩa bánh','Đồng hồ'];
export const careQuestions=['Hôm nay bạn có cảm thấy hạnh phúc không?','Hôm nay bạn đã ăn đủ bữa và uống đủ nước rồi chứ?','Hôm nay bạn đã dành thời gian để bản thân được nghỉ ngơi chưa?'];
export const careActions=['Tưới nước','Đón nắng','Tỉa lá'];
export const careMessages=[
 ['Hoa được tưới mát rồi. Mình vui vì hôm nay bạn đã có một chút hạnh phúc để mang về đây.','Hoa đã được tưới rồi đó. Nếu hôm nay chưa có nhiều niềm vui, mình cứ ngồi cạnh bó hoa một chút nhé. Không cần phải rực rỡ mỗi ngày đâu.'],
 ['Nắng đã ghé cửa sổ, và bạn cũng đã nhớ chăm mình. Những điều nhỏ ấy thật đáng quý.','Hoa đã được đặt vào một góc nắng ấm. Khi có thể, bạn cũng ăn một chút, uống một ngụm nước nhé. Mình chăm nhau từng chút một thôi.'],
 ['Lá đã được tỉa gọn. Mong khoảng nghỉ của bạn cũng nhẹ tênh, như góc nhỏ này.','Hoa đã được tỉa gọn rồi. Bạn cũng được phép đặt mọi thứ xuống một lát. Hôm nay bạn đã cố gắng nhiều rồi đó.'],
];
export const arrangementDefaults = [{x:123,y:73},{x:166,y:62},{x:145,y:48},{x:185,y:86},{x:149,y:92}];
export function answerKey(answers){if(!Array.isArray(answers)||answers.length!==5||!answers.every(x=>Number.isInteger(x)&&x>=0&&x<5))throw new Error('Cần đủ 5 lựa chọn hợp lệ.');return answers.map(v=>v+1).join('');}
export const bouquetId=a=>{answerKey(a);return a.reduce((n,v)=>n*5+v,0)+1;};
export const flowerIds=a=>a.map((v,i)=>i*5+v);
export function localDay(date=new Date()){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;}
export function normalizeSave(raw){
 const base={version:2,answers:[],unlocked:[],custom:{...defaults},positions:arrangementDefaults.map(p=>({...p})),hasVase:false,complete:false,careDate:'',care:[null,null,null],sound:true};
 if(!raw||raw.version!==2)return base;
 if(Array.isArray(raw.answers)&&raw.answers.length<=5&&raw.answers.every(v=>Number.isInteger(v)&&v>=0&&v<5))base.answers=raw.answers;
 base.unlocked=Array.isArray(raw.unlocked)?[...new Set(raw.unlocked.filter(v=>Number.isInteger(v)&&v>=0&&v<25))]:[];
 const sizes={shape:10,color:5,decor:5,wall:10,pattern:5,window:5,item:6};
 for(const k of Object.keys(sizes))if(Number.isInteger(raw.custom?.[k])&&raw.custom[k]>=0&&raw.custom[k]<sizes[k])base.custom[k]=raw.custom[k];
 if(Array.isArray(raw.positions)&&raw.positions.length===5)base.positions=raw.positions.map((p,i)=>Number.isFinite(p?.x)&&Number.isFinite(p?.y)?{x:Math.max(112,Math.min(199,p.x)),y:Math.max(43,Math.min(102,p.y))}:base.positions[i]);
 base.complete=raw.complete===true&&base.answers.length===5;
 base.hasVase=raw.hasVase===true;
 base.sound=raw.sound===true;
 base.careDate=typeof raw.careDate==='string'?raw.careDate:'';
 if(Array.isArray(raw.care)&&raw.care.length===3)base.care=raw.care.map(v=>typeof v==='boolean'?v:null);
 return base;
}

export function getLetter(answers,signal){
 return fetchLetter(import.meta.env.VITE_API_URL||'',answerKey(answers),bouquetId(answers),signal);
}
