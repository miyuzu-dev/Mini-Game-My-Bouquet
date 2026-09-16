import React from 'react';
import {Blossom} from './pixel-art.jsx';
export default function Cottage(){return <svg className="room cottage" viewBox="0 0 320 210" role="img" aria-label="Ngôi nhà nhỏ giữa vườn hoa, chưa có bình hoa" shapeRendering="crispEdges">
 <path d="M0 0H320V210H0Z" fill="#ceeaf3"/><path d="M0 70H320V132H0Z" fill="#dff1ee"/><path d="M0 132H320V210H0Z" fill="#c5dd9e"/>
 <g className="cottage-clouds" fill="#fffdf6" stroke="#a8bec7"><path d="M24 36H31V29H45V33H54V40H61V47H24Z"/><path d="M245 52H252V43H267V47H276V55H283V61H245Z"/></g>
 <path className="cottage-sun" d="M268 21H282V25H287V39H282V43H268V39H263V25H268Z" fill="#fff4bf"/>
 <g stroke="#53694e" strokeWidth="2"><path d="M45 138V70H55V56H81V64H95V137Z" fill="#8ab488"/><path d="M225 140V80H231V63H259V73H270V138Z" fill="#93bc8e"/></g>
 <g fill="#bad39b"><path d="M0 120h18v-8h29v14h31v15H0ZM266 122h19v-12h35v34h-54Z"/></g>
 <path d="M61 107H260V157H61Z" fill="#80a37c"/>
 <g fill="#fffdf2" className="chimney-smoke">{[0,1,2].map(i=><path key={i} className="smoke-puff" style={{animationDelay:`${-i*1.8}s`}} d="M224 43h3v-3h7v3h3v6h-13Z"/>)}</g>
 <path d="M221 52H239V86H221Z" fill="#dfb190" stroke="#654f59" strokeWidth="2"/><path d="M218 50H241V56H218Z" fill="#f5ddad" stroke="#654f59"/>
 <path d="M84 87L158 31L237 90V160H84Z" fill="#fff0cf" stroke="#55485d" strokeWidth="3"/>
 <path d="M71 91V83H82V75H93V67H104V59H116V50H128V42H140V34H153V26H165V33H176V41H188V50H200V59H212V68H224V77H237V85H246V97H232L159 45L85 99H71Z" fill="#da8f9f" stroke="#59465b" strokeWidth="2"/>
 <g fill="#ba6f8f"><path d="M117 61h11v3h-11ZM141 44h12v3h-12ZM180 49h9v3h-9ZM204 69h10v3h-10ZM88 83h10v3H88Z"/></g>
 <path d="M84 84L159 32L234 86" fill="none" stroke="#f6bdba" strokeWidth="3"/>
 <path d="M92 98L159 51L225 99" fill="none" stroke="#f4cfa9" strokeWidth="3"/>
 <path d="M144 69H173V98H144Z" fill="#aed4e3" stroke="#8e695f" strokeWidth="3"/><path d="M158 71V96M146 83H171" stroke="#fff9e8" strokeWidth="2"/>
 <path d="M86 142h56v14H86ZM179 144h56v12h-56Z" fill="#f0cfaa"/><g fill="#d9ad94"><path d="M90 145h11v3H90ZM111 151h16v3h-16ZM193 147h13v3h-13ZM215 152h16v3h-16Z"/></g>
 <path d="M100 113H129V140H100ZM192 113H221V140H192Z" fill="#acd4e6" stroke="#997267" strokeWidth="3"/><path d="M114 114V139M206 114V139M101 127H128M193 127H220" stroke="#fffdf0" strokeWidth="2"/>
 <path d="M145 111H176V161H145Z" fill="#503f58" stroke="#66506b" strokeWidth="2"/>
 <g className="welcome-girl">
  <path d="M150 151h21v10h-21Z" fill="#e98cac"/><path d="M158 150h6v5h-6Z" fill="#ffdab3"/>
  <path d="M149 133v-8h4v-4h14v3h5v8h2v18h-7v-4h-14v4h-6v-17Z" fill="#e0aa47" stroke="#846039" strokeWidth="1"/>
  <path d="M153 132h15v13h-3v4h-9v-4h-3Z" fill="#ffe0b7"/>
  <path d="M151 132v-5h5v-3h9v3h4v7h-4v-4h-4v3h-5v2h-5Z" fill="#ffe18b"/><path d="M149 134h3v13h-3ZM168 132h3v16h-3Z" fill="#f3c75e"/>
  <g className="girl-eyes" fill="#71482f"><path d="M155 137h2v3h-2ZM164 137h2v3h-2Z"/></g>
  <g className="girl-smile-eyes" fill="none" stroke="#71482f" strokeWidth="1"><path d="M154 139v-1h3v1M163 139v-1h3v1"/></g>
  <path d="M153 142h3v2h-3ZM165 142h3v2h-3Z" fill="#f1a29b"/><path d="M159 143v2h3v-2" fill="#c46f78"/>
  <g className="girl-wave"><path d="M171 155h4v-10h-1v-5h2v-3h2v2h2v6h-2v12h-7Z" fill="#ffdab3" stroke="#bd896f" strokeWidth=".6"/><path d="M169 153h6v7h-6Z" fill="#ec9dba"/></g>
 </g>
 <g className="cottage-door"><path d="M145 111H176V161H145Z" fill="#b796b8" stroke="#66506b" strokeWidth="2"/><path d="M150 117H171V137H150Z" fill="#ddcde8"/><path d="M150 142h13v14h-13Z" fill="#caaacb"/><path d="M167 145H170V148H167Z" fill="#fff3ab"/></g>
 <path d="M81 157H239V164H81ZM137 164H182V171H137Z" fill="#c4a58c" stroke="#766252"/>
 <path d="M143 173H178V181H188V190H203V200H211V210H117V201H127V189H136V180H143Z" fill="#f4e6ba"/>
 <g fill="#a7c77e">{Array.from({length:24},(_,i)=><path key={i} d={`M${8+i*13} ${180+i%3*6}h5v2h-5Z`}/>)}</g>
 <g stroke="#607950" strokeWidth="2">{[27,54,79,246,275,300].map((x,i)=><g key={x} className="cottage-flower" style={{transformOrigin:`${x}px 191px`,animationDelay:`${-i*.55}s`}}><path d={`M${x} 155V191`} fill="none"/><path d={`M${x} 178h-7v-5h5v3h2`} fill="#8eb76d"/><Blossom id={[3,0,1,10,16,7][i]} x={x-11} y={146+(i%2)*5} scale={.85}/></g>)}</g>
 <path d="M0 201H320V210H0Z" fill="#93c8d4"/><g className="stream-ripples" fill="#dff5ef">{Array.from({length:18},(_,i)=><rect key={i} x={i*24-48} y={203+i%2*4} width={8+i%3*3} height="1"/>)}</g><path d="M0 199H320" stroke="#a9ca80" strokeWidth="3"/>
 <g className="twinkles" fill="#fffef1"><path d="M28 83h3v4h4v3h-4v4h-3v-4h-4v-3h4ZM288 104h2v3h3v2h-3v3h-2v-3h-3v-2h3Z"/></g>
 <g className="girl-greeting" role="img" aria-label="Bé gái tóc bob vàng, mắt nâu: Mừng bạn về nhà!">
 <path d="M183 102h5v-5h12v-3h66v3h10v5h5v16h-5v5h-73l-10 9v-9h-10v-5h-5v-11h5Z" fill="#fffbed" stroke="#8e697e" strokeWidth="1.3"/>
 <text x="230" y="112" textAnchor="middle" fontFamily="'Segoe UI',sans-serif" fontWeight="700" fontSize="8" fill="#77506c">Mừng bạn về nhà!</text>
 </g>
 </svg>}