import express from 'express';
import cors from 'cors';
import {readFileSync} from 'node:fs';

const readData=name=>JSON.parse(readFileSync(new URL(`../data/${name}.json`,import.meta.url),'utf8'));
const flowers=readData('flowers');
const letters=Object.assign({},...Array.from({length:5},(_,i)=>readData(`letters-${i+1}`)));

export function createApp({origins=process.env.FRONTEND_ORIGINS||'http://127.0.0.1:5175,http://localhost:5175'}={}){
 const app=express();
 const allowed=new Set(origins.split(',').map(s=>s.trim()).filter(Boolean));
 app.disable('x-powered-by');
 app.use(cors({origin(origin,done){done(null,!origin||allowed.has(origin));},methods:['GET','OPTIONS']}));
 app.get('/',(req,res)=>res.json({message:'Hello World',project:'Game: My Bouquet',api:'/api/hello'}));
 app.get('/api/hello',(req,res)=>res.json({message:'Hello World'}));
 app.get('/api/health',(req,res)=>res.json({status:'ok'}));
 app.get('/api/flowers',(req,res)=>res.json(flowers));
 app.get('/api/letters/:combination',(req,res)=>{
  const {combination}=req.params;
  if(!/^[1-5]{5}$/.test(combination))return res.status(400).json({error:'Combination must contain exactly five digits from 1 to 5.'});
  res.set('Cache-Control','private, max-age=3600').json(letters[combination]);
 });
 app.use((req,res)=>res.status(404).json({error:'Endpoint not found'}));
 app.use((err,req,res,next)=>{console.error(err.message);res.status(500).json({error:'Internal server error'});});
 return app;
}
