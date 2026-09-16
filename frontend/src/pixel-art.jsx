import React, {useRef,useId} from 'react';
import {sprites} from './sprites.js';
import {flowers,vaseColors,wallColors,arrangementDefaults,flowerIds} from './game-data.js';

const glyphs={M:['10001','11011','10101','10101','10001','10001','10001'],Y:['10001','10001','01010','00100','00100','00100','00100'],B:['11110','10001','10001','11110','10001','10001','11110'],O:['01110','10001','10001','10001','10001','10001','01110'],U:['10001','10001','10001','10001','10001','10001','01110'],Q:['01110','10001','10001','10001','10101','10010','01101'],E:['11111','10000','10000','11110','10000','10000','11111'],T:['11111','00100','00100','00100','00100','00100','00100']};
export function PixelTitle(){const uid=useId().replaceAll(':',''),text='MY BOUQUET';const cells=[...text].flatMap((c,i)=>(glyphs[c]||[]).flatMap((row,y)=>[...row].flatMap((v,x)=>v==='1'?[{x:i*6+x,y}]:[])));return <svg className="pixel-title" viewBox="-2 -2 64 13" role="img" aria-label="My Bouquet" shapeRendering="crispEdges"><defs><linearGradient id={uid} x1="0" y1="0" x2="0" y2="7" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#fff2cf"/><stop offset=".32" stopColor="#f9abc7"/><stop offset="1" stopColor="#c26998"/></linearGradient></defs><g fill="#53374f" stroke="#53374f" strokeWidth=".7" transform="translate(.7 1.2)">{cells.map((p,i)=><rect key={i} {...p} width="1" height="1"/>)}</g><g fill={`url(#${uid})`} stroke="#765069" strokeWidth=".12">{cells.map((p,i)=><rect key={i} {...p} width="1" height="1"/>)}</g><g className="logo-glints" fill="#fffce6"><path d="M2 0h1v1H2zM18 0h2v.4h-2zM30 0h2v.4h-2zM48 0h2v.4h-2z"/></g></svg>}
const iconPaths={
 bell:'M7 0H10V2H12V4H14V11H16V13H1V11H3V4H5V2H7ZM6 14H11V16H6Z',
 flower:'M6 1H10V5H14V9H10V13H6V9H2V5H6ZM7 13H9V16H7Z',
 heart:'M1 3H6V5H8V3H13V5H15V10H13V12H11V14H5V12H3V10H1Z',
 book:'M1 2H7V3H9V2H15V14H9V15H7V14H1ZM7 4H9V13H7Z',
 home:'M0 7L8 0L16 7H14V15H10V10H6V15H2V7Z',
 water:'M7 0H9V3H11V6H13V12H11V14H5V12H3V6H5V3H7Z',
 sun:'M6 0H10V2H6ZM6 14H10V16H6ZM0 6H2V10H0ZM14 6H16V10H14ZM5 4H11V5H12V11H11V12H5V11H4V5H5Z',
 scissors:'M2 1H5V5H7V7H9V5H11V1H14V6H12V8H10V10H12V15H8V11H6V15H2V10H4V8H2Z',
 letter:'M1 3H15V13H1ZM2 4V6H4V8H6V10H10V8H12V6H14V4H12V6H10V8H6V6H4V4Z',
 music:'M6 2H14V11H12V13H8V10H11V5H8V13H6V15H2V12H6Z',
 brush:'M10 0H14V4H12V6H10V8H8V11H5V14H1V10H3V8H6V6H8V4H10Z',
 lock:'M5 1H11V3H13V7H15V15H1V7H3V3H5ZM6 3V7H10V3ZM7 10V13H9V10Z',
 star:'M7 0H9V5H11V7H16V9H11V11H9V16H7V11H5V9H0V7H5V5H7Z',
 arrow:'M8 2H10V4H12V6H14V10H12V12H10V14H8V10H1V6H8Z',
};
export function Icon({name='flower',size=20,...props}){return <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" shapeRendering="crispEdges" {...props}><path d={iconPaths[name]||iconPaths.flower} fill="currentColor"/></svg>}
export function Blossom({id=0,x=0,y=0,scale=1}){return <g stroke="none" transform={`translate(${x} ${y}) scale(${scale})`}>{sprites[id].map(([px,py,color],i)=><rect key={i} x={px} y={py} width="1" height="1" fill={color}/>)}</g>}
export function FlowerIcon({id=0,locked=false,stem=true}){return <svg className={`flower-icon ${locked?'locked':''}`} viewBox={stem?'0 0 29 42':'0 0 29 29'} role="img" aria-label={locked?'Hoa chưa mở khóa':flowers[id].name} shapeRendering="crispEdges">{stem&&<><path d="M14 19V39" stroke="#71846e" strokeWidth="2"/><path d="M13 32H7V29H4V26H9V29H13ZM15 29H21V26H24V23H19V26H15Z" fill="#9fba8a"/></>}<Blossom id={id} x={2} y={1}/></svg>}
const vasePaths=[
 'M-13 0H13V5H18V23H14V29H-14V23H-18V5H-13Z',
 'M-8 0H8V11H13V29H-13V11H-8Z',
 'M-16 0H16V29H-16Z',
 'M-8 0H8V7H15V12H20V24H15V29H-15V24H-20V12H-15V7H-8Z',
 'M-18 0H18V5H14V15H10V29H-10V15H-14V5H-18Z',
 'M-9 0H9V29H-9Z',
 'M-13 0H13V9H8V14H16V29H-16V14H-8V9H-13Z',
 'M-20 9H20V23H15V29H-15V23H-20Z',
 'M-16 0H16V17H9V22H3V26H13V30H-13V26H-3V22H-9V17H-16Z',
 'M-11 0H11V5H17V23H11V29H-11V23H-17V5H-11Z',
];
export function Vase({custom,x=0,y=0,mini=false}){const uid=useId();return <g transform={`translate(${x} ${y})`}><defs><clipPath id={uid}><path d={vasePaths[custom.shape]}/></clipPath></defs><path d={vasePaths[custom.shape]} fill={vaseColors[custom.color]} stroke="#49415e" strokeWidth={mini?1.5:2}/><g clipPath={`url(#${uid})`}><path d="M-20 17H20V29H-20Z" fill="#b6cbed" opacity=".65"/><path d="M-7 0L3 28M6 0L-2 28" stroke="#7c9e83" opacity=".5"/><path d="M-14 6H-10V14H-14ZM-10 3H-5V6H-10ZM-9 21H-6V24H-9Z" fill="#fffdf6"/><path d="M-13 26H13" stroke="#eee9ff" strokeWidth="2"/><path d="M-12 3V25H-7V3Z" fill="#fff4e5" opacity=".5"/><path d="M13 2V28H18V2Z" fill="#a884a2" opacity=".35"/>{custom.decor===0?<path d="M0 14L-10 8V20L0 14L10 8V20ZM-2 14V23H-6V21H-4V14H4V21H6V23H2V14Z" fill="#fff6dc"/>:custom.decor===1?<path d="M-7 10H-2V12H2V10H7V16H4V19H2V21H-2V19H-4V16H-7Z" fill="#fff3eb"/>:custom.decor===2?<g transform="translate(-7 7) scale(.9)"><Icon name="flower"/></g>:custom.decor===3?<path d="M-9 7H-6V10H-9ZM4 11H7V14H4ZM-4 20H-1V23H-4ZM6 23H9V26H6Z" fill="#fff5df"/>:<path d="M-20 8H20M-20 17H20M-20 26H20" stroke="#fff2dd" strokeWidth="3"/>}</g><path d="M-10 1H10" stroke="#fff2e5" strokeWidth="2"/></g>}
export function VaseIcon({custom}){return <svg viewBox="-25 -3 50 37" className="vase-icon" shapeRendering="crispEdges" aria-hidden="true"><Vase custom={custom} mini/></svg>}
export function SideItem({kind=3,x=0,y=0}){return <g transform={`translate(${x} ${y})`} stroke="#665161" strokeWidth="1" fill="#fff2dd">{kind===0?<><path d="M0 0H23V26H0Z" fill="#d4b1ae"/><path d="M3 3H20V23H3Z" fill="#f6edd8"/><path d="M5 19L11 10L15 15L18 12V21H5Z" fill="#b3c8a5"/><path d="M7 6H11V10H7Z" fill="#eccd8f" stroke="none"/></>:kind===1?<><path d="M7 2H15V10H7Z"/><path d="M6 12H16L20 27H2Z"/><path d="M6 12L-3 8V18H6M16 12L25 8V18H16" fill="#e5d5ee"/><path d="M7 0H15" stroke="#e2ba6d" strokeWidth="2"/></>:kind===2?<><path d="M3 7H23V24H19V27H5V24H3Z" fill="#dab896"/><path d="M1 6H6V17H1ZM20 6H25V17H20Z" fill="#b29085"/><path d="M8 13H10M17 13H19M12 18H15" stroke="#806b7f" strokeWidth="2"/></>:kind===3?<><path d="M2 10V0L9 5H19L26 0V21H22V27H5V24H2Z" fill="#f7e2d0"/><path d="M4 4L8 7H4ZM20 7L24 4V7Z" fill="#e6b2ba" stroke="none"/><path d="M7 13H10M18 13H21M13 17H16" stroke="#8f7588" strokeWidth="2"/><path d="M3 20H0V24H4" fill="none" strokeWidth="2"/></>:kind===4?<><path d="M-2 20H29V25H-2Z" fill="#f9e8f0"/>{[0,9,18].map((v,i)=><g key={v}><path d={`M${v} 13h9v7h-9Z`} fill="#e2bd85"/><path d={`M${v+2} 15h2v2h-2ZM${v+5} 17h2v2h-2Z`} fill="#a38075" stroke="none"/></g>)}</>:<><path d="M0 4H25V24H0ZM3 24V27H7V24M18 24V27H22V24" fill="#b8cbb3"/><path d="M4 7H21V21H4Z"/><path d="M12 9V15H18" fill="none"/><path d="M4 0H9V3H4ZM16 0H21V3H16Z" fill="#e5c597"/></>}</g>}
function Plant({x,y,flip=false}){return <g transform={`translate(${x} ${y}) scale(${flip?-1:1} 1)`}><path d="M0 0V23M0 8H-7V3M0 14H8V8" fill="none" stroke="#8aab83" strokeWidth="2"/><path d="M-10 0H-4V6H-10ZM5 5H11V11H5ZM-8 12H-2V17H-8Z" fill="#adc696"/><path d="M-7 21H7V33H-7Z" fill="#d5a6b3" stroke="#9b7b91"/><path d="M-4 24V29" stroke="#f7d6d8" strokeWidth="2"/></g>}
function Cloud({x,y,scale=1}){return <path transform={`translate(${x} ${y}) scale(${scale})`} d="M0 7H5V3H10V0H19V3H25V7H30V12H0Z" fill="#fff5ec"/>}
export function Room({answers=[],custom,positions=arrangementDefaults,preview=false,showVase=true,editable=false,selected=0,onSelect,onMove,fx='',onBouquetTap}){
 const ref=useRef(null),drag=useRef(null),uid=useId();const ids=answers.length?flowerIds(answers):preview?[0,6,10,15,23]:[];
 const move=(event)=>{if(drag.current===null)return;const box=ref.current.getBoundingClientRect();const scale=Math.min(box.width/320,box.height/210);const ox=box.left+(box.width-320*scale)/2,oy=box.top+(box.height-210*scale)/2;onMove?.(drag.current,{x:Math.max(112,Math.min(199,Math.round((event.clientX-ox)/scale))),y:Math.max(43,Math.min(102,Math.round((event.clientY-oy)/scale)))});};
 return <svg ref={ref} className={`room ${fx?'room-active':''}`} viewBox="0 0 320 210" aria-label="Căn phòng hoa pixel pastel" role="img" shapeRendering="crispEdges" onPointerMove={move} onPointerUp={()=>{drag.current=null}} onPointerCancel={()=>{drag.current=null}}>
 <defs><pattern id={`${uid}wall`} width="16" height="16" patternUnits="userSpaceOnUse">{custom.pattern===1?<path d="M7 7H9V9H7Z" fill="#d7b9cc"/>:custom.pattern===2?<path d="M0 0H3V16H0Z" fill="#fff7ef" opacity=".6"/>:custom.pattern===3?<path d="M0 0V16M0 0H16" stroke="#fff5ed" strokeWidth="2"/>:custom.pattern===4?<path d="M7 4H9V6H11V8H9V10H7V8H5V6H7Z" fill="#dec1d4"/>:null}</pattern><clipPath id={`${uid}window`}><path d={['M26 112V43H30V35H38V29H78V35H86V43H90V112Z','M25 29H91V112H25Z','M39 30H77V36H86V44H91V95H86V104H77V112H39V104H30V95H25V44H30V36H39Z','M20 32H96V112H20Z','M25 52L58 24L91 52V112H25Z'][custom.window]}/></clipPath></defs>
 <path d="M0 0H320V210H0Z" fill={wallColors[custom.wall]}/><path d="M0 0H320V167H0Z" fill={`url(#${uid}wall)`}/>
 <path d="M0 0H320V5H0Z" fill="#d4b4ce"/><path d="M0 5H320V7H0Z" fill="#fff1eb"/>
 <g clipPath={`url(#${uid}window)`}><path d="M18 22H98V115H18Z" fill="#b8d8e7"/><path d="M69 39H78V42H81V51H78V54H69V51H66V42H69Z" fill="#ffedb4"/><g className="cloud-drift"><Cloud x={27} y={46} scale={.8}/><Cloud x={64} y={69} scale={.6}/></g><path d="M18 97H29V90H40V94H53V87H69V96H82V91H99V116H18Z" fill="#bacfa9"/><path d="M18 106H38V101H51V106H71V101H89V106H99V116H18Z" fill="#99ba9e"/><path d="M57 24V114M19 73H98" stroke="#fff5e6" strokeWidth="3"/><path d="M25 25H91V113H25Z" fill="none" stroke="#a28ba6" strokeWidth="3"/></g>
 <path d="M20 114H96V119H20Z" fill="#c2a0ad"/><path d="M18 112H98V115H18Z" fill="#f8ede0"/>
 <path d="M15 27H21V107H16V99H12V32H15ZM95 27H101V32H104V99H100V107H95Z" fill="#dac8e7" stroke="#b39bbe"/><path d="M15 30V94M99 30V94" stroke="#f0e1f2" strokeWidth="2"/>
 <g opacity=".45"><path d="M90 76L145 168H92L58 76Z" fill="#fff5ce"/></g>
 <path d="M233 55H305V60H233Z" fill="#b99cac"/><path d="M237 60V67H241V60M296 60V67H300V60" stroke="#a68a9b" fill="none"/>
 <Plant x={249} y={21}/><path d="M267 36H275V54H267Z" fill="#efd1a7" stroke="#ac929e"/><path d="M277 31H284V54H277Z" fill="#bbcddd" stroke="#ac929e"/><path d="M287 38H294V54H287Z" fill="#d0b8dd" stroke="#ac929e"/>
 <path d="M279 5V12H271V21H278V28H270V36" stroke="#89a47c" strokeWidth="2" fill="none"/><path d="M272 12H266V7H272ZM278 18H284V13H278ZM272 28H267V24H272Z" fill="#b1c598"/>
 <g transform="translate(249 83)"><path d="M0 0H30V30H0Z" fill="#bd9eae"/><path d="M3 3H27V27H3Z" fill="#fff1df"/><path d="M12 7H18V12H23V18H18V23H12V18H7V12H12Z" fill="#d4b2ce"/><path d="M12 12H18V18H12Z" fill="#efcf91"/></g>
 <path d="M0 164H320V210H0Z" fill="#dcc4a6"/><path d="M0 174H320M0 194H320M40 174V194M124 194V210M216 174V194M294 194V210" stroke="#b2967e"/><path d="M0 162H320V167H0Z" fill="#a58a9d"/>
 <path d="M52 172H277V179H52Z" fill="#ab8998"/><path d="M64 176H72V210H64ZM258 176H266V210H258Z" fill="#b58c73"/><path d="M52 157H277V170H52Z" fill="#e6c9b9" stroke="#a5879a" strokeWidth="2"/><path d="M54 159H275V162H54Z" fill="#fff0d9"/><path d="M59 171H270V175H59Z" fill="#c5a0ac"/>
 <path d="M111 158H207V164H111Z" fill="#f6e5ec"/><path d="M115 160H203" stroke="#dabacb" strokeDasharray="3 3"/>
 <Plant x={68} y={124}/><SideItem kind={custom.item} x={232} y={132}/>
 <g className={fx?'bouquet-care':'bouquet-idle'}>{ids.map((id,i)=>{const pos=positions[i];return <g key={`${id}-${i}`}><path d={`M${pos.x} ${pos.y+5}L161 137`} stroke="#6e886e" strokeWidth="2"/><path d={`M${(pos.x+161)/2} ${(pos.y+137)/2}h-7v-5h4v2h3Z`} fill="#a4bd8d" stroke="#809b78" strokeWidth=".5"/></g>})}{ids.map((id,i)=>{const pos=positions[i];return <g key={`${id}-head-${i}`} className={editable?'draggable-flower':''} onPointerDown={editable?e=>{e.preventDefault();drag.current=i;e.currentTarget.setPointerCapture(e.pointerId);onSelect?.(i)}:undefined} onClick={!editable?onBouquetTap:undefined}>{editable&&selected===i&&<path d={`M${pos.x-17} ${pos.y-17}h34v34h-34Z`} fill="#fff6e4" fillOpacity=".4" stroke="#9972a6" strokeDasharray="2 2"/>}<Blossom id={id} x={pos.x-15} y={pos.y-15} scale={1.2}/></g>})}</g>
 {showVase&&<Vase custom={custom} x={161} y={130}/>}
 <path d="M3 146H7V150H3ZM306 122H310V126H306Z" fill="#fff7db"/>
 {fx==='water'&&<g className="water-drops" fill="#89bfdc">{Array.from({length:7},(_,i)=><path key={i} d={`M${130+i*10} ${40+(i%3)*9}h2v6h-2Z`}/>)}</g>}
 {fx==='sun'&&<g className="sun-glow" fill="#fff0a8" opacity=".55"><path d="M63 55L215 144H128Z"/><path d="M96 42H100V46H96ZM191 69H195V73H191Z"/></g>}
 {fx==='scissors'&&<g className="falling-leaves" fill="#9eb887"><path d="M136 104H142V108H136ZM176 97H183V101H176ZM157 113H164V116H157Z"/></g>}
 {(fx==='sparkle'||preview)&&<g className="twinkles" fill="#fff5c9"><path d="M108 63H110V67H114V69H110V73H108V69H104V67H108ZM202 57H204V60H207V62H204V65H202V62H199V60H202ZM185 116H187V119H190V121H187V124H185V121H182V119H185Z"/></g>}
 </svg>
}
