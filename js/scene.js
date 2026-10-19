import*as T from"three";
export function mountScene(el){
let r;try{r=new T.WebGLRenderer({antialias:true,alpha:true,powerPreference:"high-performance"})}catch{return()=>{}}
r.setPixelRatio(Math.min(devicePixelRatio,innerWidth<860?1.5:2));el.append(r.domElement);
const sc=new T.Scene(),cam=new T.PerspectiveCamera(38,1,.1,100);cam.position.set(0,1.6,8.5);cam.lookAt(0,.6,0);
sc.add(new T.AmbientLight(0xffffff,.8));
const p1=new T.PointLight(0x5b6bff,90,40);p1.position.set(-4,4,5);sc.add(p1);const p2=new T.PointLight(0x22d3ee,60,40);p2.position.set(5,1,4);sc.add(p2);
const M=(c,o={})=>new T.MeshStandardMaterial({color:c,metalness:.85,roughness:.28,...o}),g=new T.Group();sc.add(g);
g.add(new T.Mesh(new T.BoxGeometry(3.4,.14,2.3),M(0x9ca5ba)));
const keys=new T.InstancedMesh(new T.BoxGeometry(.2,.05,.2),M(0x1b2133),65),d=new T.Object3D();
for(let i=0;i<65;i++){d.position.set(-1.35+(i%13)*.225,.1,-.7+Math.floor(i/13)*.24);d.updateMatrix();keys.setMatrixAt(i,d.matrix)}g.add(keys);
const pad=new T.Mesh(new T.BoxGeometry(1,.02,.6),M(0x6b738a));pad.position.set(0,.08,.8);g.add(pad);
const lid=new T.Group();lid.position.set(0,.07,-1.15);g.add(lid);
const lm=new T.Mesh(new T.BoxGeometry(3.4,2.2,.09),M(0x161c2c));lm.position.y=1.1;lid.add(lm);
const cv=document.createElement("canvas");cv.width=640;cv.height=400;const x=cv.getContext("2d"),gr=x.createLinearGradient(0,0,640,400);
gr.addColorStop(0,"#1b2a6b");gr.addColorStop(1,"#0e7490");x.fillStyle=gr;x.fillRect(0,0,640,400);x.fillStyle="#fff";x.font="800 76px sans-serif";x.fillText("Hindnet",48,200);
x.font="28px sans-serif";x.globalAlpha=.75;x.fillText("Premium laptops, gear & travel",52,250);x.globalAlpha=.25;for(let i=0;i<4;i++)x.fillRect(52,300+i*22,200+i*90,8);
const sm=new T.Mesh(new T.PlaneGeometry(3.15,1.97),new T.MeshBasicMaterial({map:new T.CanvasTexture(cv)}));sm.position.set(0,1.1,.05);lid.add(sm);
const fl=[[new T.IcosahedronGeometry(.45),-3.6,1.8,-1],[new T.TorusGeometry(.4,.14,16,40),3.7,2.2,-.5],[new T.OctahedronGeometry(.38),3.4,-.6,1],[new T.TorusKnotGeometry(.28,.09,80,12),-3.4,-.4,1.2]].map(([geo,px,py,pz],i)=>{const m=new T.Mesh(geo,M(i%2?0x22d3ee:0x5b6bff,{wireframe:i%2==0,emissive:0x111a55}));m.position.set(px,py,pz);sc.add(m);return m});
const N=500,pa=new Float32Array(N*3);for(let i=0;i<N*3;i++)pa[i]=(Math.random()-.5)*16;
const pg=new T.BufferGeometry();pg.setAttribute("position",new T.BufferAttribute(pa,3));const pts=new T.Points(pg,new T.PointsMaterial({color:0x8fa0ff,size:.04,transparent:true,opacity:.7}));sc.add(pts);
let mx=0,my=0,run=true,id;const t0=performance.now();
const mm=e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5};addEventListener("pointermove",mm);
const rz=()=>{const w=el.clientWidth||1,h=el.clientHeight||1;r.setSize(w,h,false);cam.aspect=w/h;cam.position.z=cam.aspect<1.3?11:8.5;cam.updateProjectionMatrix()};rz();const ro=new ResizeObserver(rz);ro.observe(el);
const io=new IntersectionObserver(([e])=>{const was=run;run=e.isIntersecting;if(run&&!was)loop()});io.observe(el);
function loop(){if(!run)return;id=requestAnimationFrame(loop);const t=(performance.now()-t0)/1000,k=Math.min(t/2.4,1),ez=1-Math.pow(1-k,3);
lid.rotation.x=Math.PI/2*(1-ez)-.22*ez;g.rotation.y+=((mx*.9-.35)-g.rotation.y)*.05;g.rotation.x+=(my*.3-g.rotation.x)*.05;g.position.y=-.4+Math.sin(t*1.2)*.12;
fl.forEach((m,i)=>{m.rotation.x+=.008+i*.002;m.rotation.y+=.01;m.position.y+=Math.sin(t+i)*.002});pts.rotation.y=t*.02;r.render(sc,cam)}
loop();
return()=>{run=false;cancelAnimationFrame(id);removeEventListener("pointermove",mm);ro.disconnect();io.disconnect();r.dispose();r.domElement.remove()}}
