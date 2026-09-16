import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {flowers,answerKey,bouquetId,flowerIds,normalizeSave,localDay} from './game-data.js';
import {sprites} from './sprites.js';

test('Every Excel combination resolves to the exact mapped flowers and nonempty letter',()=>{
 const keys=new Set(),ids=new Set(),letters=new Set();
 for(let group=1;group<=5;group++){
  const records=JSON.parse(readFileSync(new URL(`../../backend/data/letters-${group}.json`,import.meta.url),'utf8'));
  assert.equal(Object.keys(records).length,625);
  for(const [key,record] of Object.entries(records)){
   const answers=record.levels.map(v=>v-1);
   assert.equal(answerKey(answers),key);assert.equal(bouquetId(answers),record.id);
   assert.deepEqual(flowerIds(answers),record.flowerIds);
   assert.equal(record.bouquet,record.flowerIds.map(id=>flowers[id].name).join(' + '));
   assert.ok(record.text.startsWith('Gửi bạn,'));assert.ok(record.text.includes('\n\n'));
   assert.ok(record.text.endsWith('Gửi đến bạn một cái ôm nhé, vì mình yêu bạn rất nhiều'));
   keys.add(key);ids.add(record.id);letters.add(record.text);
  }
 }
 assert.equal(keys.size,3125);assert.equal(ids.size,3125);assert.equal(letters.size,3125);
 assert.equal(Math.min(...ids),1);assert.equal(Math.max(...ids),3125);
 assert.ok(keys.has('11111')&&keys.has('55555'));
});
test('25 Excel flowers have distinct coded artwork',()=>{
 assert.equal(flowers.length,25);assert.equal(new Set(flowers.map(f=>f.english)).size,25);
 assert.equal(sprites.length,25);assert.equal(new Set(sprites.map(s=>JSON.stringify(s.map(([x,y])=>[x,y])))).size,25);
 assert.ok(sprites.every(s=>s.length>20&&s.every(([x,y,c])=>x>=0&&x<25&&y>=0&&y<25&&/^#[0-9a-f]{6}$/i.test(c))));
});
test('Reject invalid combinations rather than return the wrong letter',()=>{
 for(const a of [[],[0,0,0,0],[0,0,0,0,5],[0,0,0,0,-1],[0,0,0,0,'1']])assert.throws(()=>answerKey(a));
 assert.equal(bouquetId([0,0,0,0,0]),1);assert.equal(bouquetId([4,4,4,4,4]),3125);
});
test('Save validation protects new flower mapping and keeps valid customization',()=>{
 assert.deepEqual(normalizeSave({answers:[4,4,4,4,4]}).answers,[]);
 const restored=normalizeSave({version:2,answers:[1,2,3,4,0],unlocked:[1,1,24,25,-1],hasVase:true,complete:true,custom:{shape:9,color:4,wall:99},positions:Array(5).fill({x:999,y:-2}),care:[true,false,'bad'],sound:true});
 assert.deepEqual(restored.unlocked,[1,24]);assert.equal(restored.custom.shape,9);assert.equal(restored.custom.wall,0);
 assert.deepEqual(restored.positions[0],{x:199,y:43});assert.equal(restored.complete,true);assert.equal(restored.hasVase,true);
 assert.deepEqual(restored.care,[true,false,null]);
 assert.equal(normalizeSave({version:2,answers:[3],complete:true}).complete,false);
});
test('Daily-care dates use the local calendar',()=>{assert.equal(localDay(new Date(2026,8,12,23,59)),'2026-09-12')});
