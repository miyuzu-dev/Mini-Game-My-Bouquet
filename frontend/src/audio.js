import {useEffect,useRef,useCallback} from 'react';

// Original synthesized music: no recordings, downloads, or copyrighted tracks.
export function useGameAudio(enabled){
 const engine=useRef(null),active=useRef(enabled),beat=useRef(0),next=useRef(0),lastTap=useRef(0),lastHover=useRef(0);
 active.current=enabled;
 const note=useCallback((frequency,time,duration,volume,type='triangle')=>{
  const ctx=engine.current;if(!ctx)return;
  const oscillator=ctx.createOscillator(),gain=ctx.createGain();
  oscillator.type=type;oscillator.frequency.value=frequency;oscillator.connect(gain);gain.connect(ctx.destination);
  gain.gain.setValueAtTime(0,time);gain.gain.linearRampToValueAtTime(volume,time+.015);gain.gain.exponentialRampToValueAtTime(.0001,time+duration);
  oscillator.start(time);oscillator.stop(time+duration+.03);
 },[]);
 const wake=useCallback(()=>{if(!active.current)return;try{engine.current??=new(window.AudioContext||window.webkitAudioContext)();if(engine.current.state==='suspended')engine.current.resume().catch(()=>{});}catch{}},[]);
 useEffect(()=>{if(!enabled)return;wake();const begin=()=>wake();window.addEventListener('pointerdown',begin);window.addEventListener('keydown',begin);return()=>{window.removeEventListener('pointerdown',begin);window.removeEventListener('keydown',begin)}},[enabled,wake]);
 const play=useCallback((kind='tap',force=false)=>{
  if(!active.current&&!force)return;
  if(kind==='hover'){if(!engine.current||engine.current.state!=='running')return;const now=performance.now();if(now-lastHover.current<140)return;lastHover.current=now;note(1174.66,engine.current.currentTime,.07,.007,'sine');return;}
  if(kind==='tap'){const now=performance.now();if(now-lastTap.current<80)return;lastTap.current=now;}
  if(force)active.current=true;wake();const ctx=engine.current;if(!ctx)return;
  const sequences={tap:[784,1047],bloom:[523,659,784],arrival:[659,784,1047,1319],letter:[523,784,659,1047,1568]};
  (sequences[kind]||sequences.tap).forEach((f,i)=>note(f,ctx.currentTime+i*(kind==='tap'?.035:.11),kind==='tap'?.09:.36,kind==='tap'?.033:.052,'sine'));
 },[wake,note]);
 useEffect(()=>{
  if(!enabled){engine.current?.suspend();return;}
  // Four original phrases, 120 BPM eighth-notes, layered with arpeggios and bass.
  const phrases=[
   [72,76,79,76,74,72,67,0,69,72,76,79,77,76,74,0],
   [77,81,79,77,76,72,74,76,79,83,81,79,74,71,72,0],
   [84,79,76,79,81,79,76,72,74,77,81,79,76,74,72,0],
   [69,72,76,72,77,76,74,72,67,71,74,79,76,74,72,0]
  ];
  const chords=[[60,64,67],[57,60,64],[65,69,72],[55,59,62]];
  const hz=midi=>440*2**((midi-69)/12);
  const interval=setInterval(()=>{
   const ctx=engine.current;if(!ctx||ctx.state!=='running'||document.hidden)return;
   if(next.current<ctx.currentTime)next.current=ctx.currentTime+.04;
   while(next.current<ctx.currentTime+.15){const step=beat.current,i=step%16,phrase=Math.floor(step/16)%4,midi=phrases[phrase][i],chord=chords[Math.floor(step/8)%4],time=next.current;
    if(midi)note(hz(midi),time,.36,.026,'triangle');
    note(hz(chord[step%3]+12),time+.025,.22,.012,'sine');
    if(step%4===0)note(hz(chord[0]-12),time,.55,.025,'triangle');
    if(step%8===0)chord.forEach(n=>note(hz(n),time,.85,.006,'sine'));
    if(step%2===1)note(1760,time,.045,.005,'triangle');
    next.current+=.25;beat.current++;
   }
  },100);
  return()=>clearInterval(interval);
 },[enabled,note]);
 useEffect(()=>{const visibility=()=>{if(document.hidden)engine.current?.suspend();else if(active.current)engine.current?.resume().catch(()=>{})};document.addEventListener('visibilitychange',visibility);return()=>{document.removeEventListener('visibilitychange',visibility);engine.current?.close()}},[]);
 return {play,wake};
}
