import*as T from"three";
import{RoundedBoxGeometry}from"three/addons/geometries/RoundedBoxGeometry.js";
import{RoomEnvironment}from"three/addons/environments/RoomEnvironment.js";
export function mountScene(el,model){
let r;try{r=new T.WebGLRenderer({antialias:true,alpha:true,powerPreference:"high-performance"})}catch{return()=>{}}
r.setPixelRatio(Math.min(devicePixelRatio,innerWidth<860?1.5:2));r.toneMapping=T.ACESFilmicToneMapping;r.toneMappingExposure=1.1;el.append(r.domElement);
const sc=new T.Scene(),cam=new T.PerspectiveCamera(30,1,.1,100);sc.environment=new T.PMREMGenerator(r).fromScene(new RoomEnvironment(),.04).texture;
const kl=new T.DirectionalLight(0xffffff,1.4);kl.position.set(3,5,4);sc.add(kl);
const P=(c,m,ro,o={})=>new T.MeshPhysicalMaterial({color:c,metalness:m,roughness:ro,...o}),al=P(0xcfd2d9,1,.3,{clearcoat:.4}),dk=P(0x14161b,.5,.5),RB=(w,h,d,s,rad)=>new RoundedBoxGeometry(w,h,d,s,rad);
const g=new T.Group(),m=new T.Group();g.add(m);sc.add(g);
m.add(new T.Mesh(RB(3.4,.1,2.3,5,.045),al));
const deck=new T.Mesh(RB(3.1,.02,1.25,2,.01),dk);deck.position.set(0,.055,-.35);m.add(deck);
const keys=new T.InstancedMesh(RB(.19,.03,.19,2,.02),P(0x2a2d35,.4,.6),70),d=new T.Object3D();
for(let i=0;i<70;i++){d.position.set(-1.4+(i%14)*.215,.08,-.8+Math.floor(i/14)*.23);d.updateMatrix();keys.setMatrixAt(i,d.matrix)}m.add(keys);
const tp=new T.Mesh(RB(1.15,.012,.72,2,.01),P(0xaeb2bb,1,.35));tp.position.set(0,.056,.72);m.add(tp);
const lid=new T.Group();lid.position.set(0,.06,-1.12);m.add(lid);
const lm=new T.Mesh(RB(3.4,2.2,.06,5,.03),al);lm.position.y=1.1;lid.add(lm);
const bz=new T.Mesh(new T.PlaneGeometry(3.3,2.1),new T.MeshBasicMaterial({color:0x050506}));bz.position.set(0,1.1,.032);lid.add(bz);
const cv=document.createElement("canvas");cv.width=1280;cv.height=800;const x=cv.getContext("2d");x.fillStyle="#0b1026";x.fillRect(0,0,1280,800);
[[300,260,520,"#2f5bff"],[980,200,460,"#7b3cff"],[760,640,520,"#00b7ff"],[200,700,380,"#ff4fa3"]].forEach(([a,b,rad,c])=>{const q=x.createRadialGradient(a,b,0,a,b,rad);q.addColorStop(0,c+"cc");q.addColorStop(1,c+"00");x.fillStyle=q;x.fillRect(0,0,1280,800)});
x.fillStyle="#ffffff22";x.fillRect(0,0,1280,34);x.fillStyle="#fff";x.font="700 120px Inter,sans-serif";x.textAlign="center";x.fillText("Hindnet",640,430);x.font="400 34px Inter,sans-serif";x.globalAlpha=.8;x.fillText("Laptops. Gear. Travel.",640,490);
const tex=Object.assign(new T.CanvasTexture(cv),{colorSpace:T.SRGBColorSpace}),lg=new Image;lg.onload=()=>{const h=280,w=h*lg.width/lg.height;x.globalAlpha=1;x.drawImage(lg,640-w/2,48,w,h);tex.needsUpdate=true};lg.src="assets/logo.webp";const scr=new T.Mesh(new T.PlaneGeometry(3.2,2),new T.MeshBasicMaterial({map:tex}));scr.position.set(0,1.1,.034);lid.add(scr);
const sh=document.createElement("canvas");sh.width=sh.height=256;const sx=sh.getContext("2d"),sg=sx.createRadialGradient(128,128,0,128,128,128);sg.addColorStop(0,"#000a");sg.addColorStop(1,"#0000");sx.fillStyle=sg;sx.fillRect(0,0,256,256);
const shd=new T.Mesh(new T.PlaneGeometry(6.4,4.6),new T.MeshBasicMaterial({map:new T.CanvasTexture(sh),transparent:true,depthWrite:false}));shd.rotation.x=-Math.PI/2;shd.position.y=-.06;g.add(shd);
model&&import("three/addons/loaders/GLTFLoader.js").then(({GLTFLoader})=>new GLTFLoader().load(model,gl=>{m.visible=false;const o=gl.scene,b=new T.Box3().setFromObject(o),s=3.4/(b.max.x-b.min.x);o.scale.setScalar(s);b.setFromObject(o);o.position.sub(b.getCenter(new T.Vector3()));o.position.y+=(b.max.y-b.min.y)/2;g.add(o)},undefined,()=>{}));
let mx=0,my=0,run=true,id;const t0=performance.now(),mm=e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5};addEventListener("pointermove",mm);
const rz=()=>{const w=el.clientWidth||1,h=el.clientHeight||1;r.setSize(w,h,false);cam.aspect=w/h;const t=Math.tan(T.MathUtils.degToRad(15)),dd=Math.max(1.75/t,2.45/(t*cam.aspect))*1.12;cam.position.set(0,1.1,dd);cam.lookAt(0,.75,0);cam.updateProjectionMatrix()};rz();
const ro=new ResizeObserver(rz);ro.observe(el);const io=new IntersectionObserver(([e])=>{const w=run;run=e.isIntersecting;if(run&&!w)loop()});io.observe(el);
function loop(){if(!run)return;id=requestAnimationFrame(loop);const t=(performance.now()-t0)/1000,k=Math.min(t/2.6,1),ez=1-Math.pow(1-k,4),sp=Math.min(1,scrollY/(innerHeight*.8));
lid.rotation.x=Math.PI/2*(1-ez)-.2*ez;g.rotation.y+=((-.5+sp*1.1+mx*.5+Math.sin(t*.4)*.06)-g.rotation.y)*.06;g.rotation.x+=((.12-sp*.1+my*.12)-g.rotation.x)*.06;g.position.y=Math.sin(t*1.1)*.04;g.scale.setScalar(1+sp*.12);r.render(sc,cam)}
loop();return()=>{run=false;cancelAnimationFrame(id);removeEventListener("pointermove",mm);ro.disconnect();io.disconnect();r.dispose();r.domElement.remove()}}
