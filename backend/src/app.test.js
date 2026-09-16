import {fetchLetter} from '../../frontend/src/api.js';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createApp} from './app.js';
import {once} from 'node:events';

test('HTTP API: homework endpoint, Excel letters, validation, CORS and 404',async()=>{
 const server=createApp({origins:'https://bouquet.example'}).listen(0,'127.0.0.1');
 await once(server,'listening');
 const base=`http://127.0.0.1:${server.address().port}`;
 try{
  assert.deepEqual(await (await fetch(`${base}/api/hello`)).json(),{message:'Hello World'});
  assert.equal((await (await fetch(base)).json()).message,'Hello World');
  assert.equal((await (await fetch(`${base}/api/health`)).json()).status,'ok');
  assert.equal((await (await fetch(`${base}/api/flowers`)).json()).length,25);
  for(const [key,id] of [['11111',1],['12345',195],['55555',3125]]){
   const response=await fetch(`${base}/api/letters/${key}`,{headers:{Origin:'https://bouquet.example'}});
   assert.equal(response.headers.get('access-control-allow-origin'),'https://bouquet.example');
   const letter=await response.json();assert.equal(letter.id,id);assert.ok(letter.text.startsWith('Gửi bạn,'));
  }
  for(const key of ['00000','123456','abcde'])assert.equal((await fetch(`${base}/api/letters/${key}`)).status,400);
  const disallowed=await fetch(`${base}/api/hello`,{headers:{Origin:'https://other.example'}});
  assert.equal(disallowed.headers.get('access-control-allow-origin'),null);
  assert.equal((await fetch(`${base}/missing`)).status,404);
  assert.equal((await fetchLetter(base+'/', '12345',195)).id,195);
  await assert.rejects(fetchLetter(base,'00000',1));
  await assert.rejects(fetchLetter(base,'12345',1));
  const controller=new AbortController();controller.abort();await assert.rejects(fetchLetter(base,'12345',195,controller.signal),{name:'AbortError'});
 }finally{await new Promise(resolve=>server.close(resolve));}
});
