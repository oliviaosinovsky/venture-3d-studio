import * as T from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
export function screenTexture(kind='dashboard') {
 const c=document.createElement('canvas');c.width=800;c.height=kind==='mirror'?1400:460;const x=c.getContext('2d');
 x.fillStyle=kind==='mirror'?'#51473e':'#171d2c';x.fillRect(0,0,c.width,c.height);x.fillStyle='#eee9e2';x.font='28px sans-serif';x.fillText('⌂  SMART CLOSET',38,58);x.fillStyle='#b6a4ef';x.font='18px sans-serif';x.fillText('YOUR DAY, BEAUTIFULLY ORGANIZED',38,95);
 if(kind==='mirror'){x.font='46px sans-serif';x.fillStyle='#fff';x.fillText('Good afternoon,',55,225);x.fillText('Olivia.',55,285);x.font='24px sans-serif';['☀   72°  •  Fairfield, CT','TODAY’S SCHEDULE','Class                       3:35 PM','Practice                  6:30 PM','Dinner                     8:30 PM','YOUR OUTFIT','Navy hoodie + ivory trousers','Outfit builder  →','Closet inventory  →','Laundry  →'].forEach((s,i)=>x.fillText(s,55,390+i*83));}
 else {x.fillStyle='#655b8a';x.fillRect(30,125,740,110);x.fillStyle='white';x.font='32px sans-serif';x.fillText('Hi Olivia,',52,170);x.font='20px sans-serif';x.fillText('A little inspiration for your day.',52,207);['Today’s outfit','Upcoming events','Closet insights'].forEach((s,i)=>{x.fillStyle='#2d3545';x.fillRect(30+i*250,255,235,170);x.fillStyle='#eee';x.font='20px sans-serif';x.fillText(s,45+i*250,290);x.fillStyle='#b9a7ef';x.font='27px sans-serif';x.fillText(['Casual layers','Practice · 6:30','87% wear rate'][i],45+i*250,350);});}
 return c.toDataURL();
}
export function part(name,type,pos,size,color,extra={}) {return {id:crypto.randomUUID(),name,type,pos,size,rot:[0,0,0],color,roughness:.6,metalness:0,opacity:1,...extra};}
export function template(name='Smart Closet') {
 const a=[]; const box=(n,p,s,c='#d8c4a9',e={})=>a.push(part(n,'box',p,s,c,e));const cyl=(n,p,s,c,e={})=>a.push(part(n,'cylinder',p,s,c,e));
 if(name==='Smart Closet'){
 box('Cabinet · back',[0,1.15,-.29],[1.65,2.3,.055]);box('Left side',[-.8,1.15,0],[.06,2.3,.64]);box('Right side',[.8,1.15,0],[.06,2.3,.64]);
 [0.04,.69,1.83,2.27].forEach((y,i)=>box(['Plinth','Drawer top','Upper shelf','Crown'][i],[0,y,0],[1.6,.065,.64]));
 for(let i=0;i<3;i++)for(let j=0;j<2;j++){box(`Drawer ${i*2+j+1}`,[-.395+j*.79,.15+i*.205,.305],[.765,.185,.055]);box(`Brass pull ${i*2+j+1}`,[-.395+j*.79,.15+i*.205,.351],[.25,.014,.025],'#bd924d',{metalness:.8,roughness:.25});}
 cyl('Hanging rail',[0,1.67,0],[.023,1.51,.023],'#c69b54',{rot:[0,0,Math.PI/2],metalness:.8});
 for(let i=0;i<7;i++){let x=-.63+i*.21;a.push(part(`Garment ${i+1}`,'shirt',[x,1.19,.04],[.22,.7,.29],['#eee0cb','#b5b0aa','#dcc9b5','#182238','#ede2cd','#69645e','#e8d6bd'][i]));box(`Shoulders ${i+1}`,[x,1.55,.04],[.2,.09,.33],'#cab392');}
 for(let i=0;i<3;i++)for(let j=0;j<3;j++)box(`Folded linen ${i+1}.${j+1}`,[-.49+i*.49,1.92+j*.105,0],[.43,.095,.43],i===1?'#43434d':'#eadbc8');
 box('Open mirror door',[-1.11,1.15,.63],[.75,2.26,.055],'#ddc9ae',{rot:[0,.75,0]});
 box('Mirror glow frame',[-1.08,1.21,.663],[.62,1.93,.025],'#ffdfab',{rot:[0,.75,0],emissive:'#ffc97b'});
 box('Smart mirror',[-1.06,1.21,.687],[.565,1.86,.027],'#ffffff',{rot:[0,.75,0],texture:screenTexture('mirror')});
 box('Dashboard enclosure',[1.57,1.39,-.19],[1.2,.77,.08],'#151923',{roughness:.25});box('Dashboard display',[1.57,1.39,-.143],[1.12,.67,.016],'#ffffff',{texture:screenTexture()});
 for(const x of [-.68,.68]){cyl('Inventory sensor',[x,1.76,.2],[.075,.08,.075],'#161e28');cyl('Sensor blue lens',[x,1.715,.2],[.036,.006,.036],'#53bcff',{emissive:'#168bd3'});}
 box('Warm LED strip',[0,2.222,.23],[1.47,.015,.025],'#fff0cf',{emissive:'#ffb74f'});
 } else if(name==='Bottle'){cyl('Bottle body',[0,.6,0],[.55,1.1,.55],'#91b7ac');cyl('Neck',[0,1.23,0],[.25,.2,.25],'#91b7ac');cyl('Cap',[0,1.38,0],[.29,.12,.29],'#b8975e',{metalness:.7});}
 else if(name==='Box'){box('Package',[0,.5,0],[1,.95,.65],'#c5adcf');box('Lid',[0,1,0],[1.04,.09,.69],'#eee1cd');}
 else if(name==='Bag'){box('Canvas body',[0,.55,0],[.9,1,.3],'#b8bfa9');for(const x of [-.27,.27])box('Handle',[x,1.22,0],[.055,.45,.06],'#796854');box('Handle top',[0,1.43,0],[.59,.055,.06],'#796854');}
 else if(name==='Mascot'){a.push(part('Body','sphere',[0,.65,0],[.8,1,.6],'#bca6e4'));a.push(part('Head','sphere',[0,1.4,0],[.75,.7,.65],'#bca6e4'));for(const x of [-.15,.15])a.push(part('Eye','sphere',[x,1.46,.31],[.09,.12,.06],'#22283b'));for(const x of [-.25,.25])box('Foot',[x,.14,.1],[.25,.2,.4],'#e5cf9a');}
 else if(name==='Merchandise'){cyl('Mug',[0,.4,0],[.7,.8,.7],'#e2b9a5');a.push(part('Handle','torus',[.43,.45,0],[.5,.5,.18],'#e2b9a5'));}
 else if(name==='Room'){box('Floor',[0,.025,0],[3,.05,2.5],'#cfb99a');box('Back wall',[0,1,-1.25],[3,2,.06],'#dfd5c6');box('Counter',[0,.5,0],[1.6,1,.6],'#9eaea1');box('Service sign',[0,1.5,-1.19],[1.2,.4,.025],'#ad98d0');}
 else {for(let i=0;i<4;i++)a.push(part('Sculpture ring '+(i+1),'torus',[0,.35+i*.35,0],[1-i*.12,1-i*.12,.2],'#b49cce',{rot:[Math.PI/2,i*.5,0],metalness:.5}));box('Pedestal',[0,.08,0],[.8,.16,.8],'#dcd2c4');}
 return {schemaVersion:'1.0',name:name==='Smart Closet'?'Olivia’s Smart Closet':name,modelType:name,description:'A connected wardrobe with an illuminated smart mirror, organized storage, inventory sensors, and a companion dashboard. Stylized editable interpretation of the supplied concept.',parts:a,references:[],background:'#e9e5df',lighting:'Soft studio',camera:'Isometric'};
}
export function geometry(p){if(p.type==='shirt'){const s=new T.Shape();const pts=[[-.28,-.5],[.28,-.5],[.28,.23],[.44,.05],[.58,.16],[.37,.46],[.13,.5],[0,.41],[-.13,.5],[-.37,.46],[-.58,.16],[-.44,.05],[-.28,.23]];pts.forEach(([x,y],i)=>i?s.lineTo(x,y):s.moveTo(x,y));s.closePath();const g=new T.ExtrudeGeometry(s,{depth:.8,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.035,bevelThickness:.05});g.translate(0,0,-.4);return g;}if(p.type==='custom')return new T.BufferGeometryLoader().parse(p.geometry);if(p.type==='cylinder')return new T.CylinderGeometry(.5,.5,1,40);if(p.type==='sphere')return new T.SphereGeometry(.5,32,24);if(p.type==='torus')return new T.TorusGeometry(.35,.12,16,48);return new RoundedBoxGeometry(1,1,1,2,.025);}
export async function mesh(p){const mat=new T.MeshStandardMaterial({color:p.color,roughness:p.roughness,metalness:p.metalness,transparent:p.opacity<1,opacity:p.opacity,emissive:p.emissive||'#000000'});if(p.texture){mat.map=await new T.TextureLoader().loadAsync(p.texture);mat.map.colorSpace=T.SRGBColorSpace;mat.map.flipY=p.flipY??true;mat.map.wrapS=mat.map.wrapT=T.RepeatWrapping;mat.map.repeat.set(p.repeat||1,p.repeat||1);mat.map.offset.set(p.offsetX||0,p.offsetY||0);}const m=new T.Mesh(geometry(p),mat);m.name=p.name;m.position.fromArray(p.pos);m.rotation.set(...p.rot);m.scale.fromArray(p.size);m.castShadow=m.receiveShadow=true;m.userData.partId=p.id;return m;}
