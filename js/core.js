import{initializeApp}from"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import{getAuth}from"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import{getFirestore,collection,getDocs,addDoc,query,orderBy}from"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import{SAMPLES}from"./data.js";
export const CFG={wa:"919999999999",phone:"+91 99999 99999",mail:"hello@hindnet.in",addr:"Your shop address, City, State",hours:"Mon-Sat, 10 AM - 8 PM",brands:["Dell","HP","Lenovo","Asus","Apple","Acer","MSI","Logitech","Sony"]};
const fb=initializeApp({apiKey:"AIzaSyAcKFw1IKx9BAcQUfX4Vg75Pr8vzCfTH1s",authDomain:"hindnetweb.firebaseapp.com",projectId:"hindnetweb",storageBucket:"hindnetweb.firebasestorage.app",messagingSenderId:"1038020453028",appId:"1:1038020453028:web:5234108e453a1f015cfc31"});
export const auth=getAuth(fb),db=getFirestore(fb),X={user:null};
export const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
export const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
export const S=(()=>{try{return JSON.parse(localStorage.hn||"{}")}catch{return{}}})();
export const save=()=>{try{localStorage.hn=JSON.stringify(S)}catch{}};
export const applyPrefs=()=>{const t=S.t||"dark";document.documentElement.dataset.theme=t=="auto"?(matchMedia("(prefers-color-scheme:light)").matches?"light":"dark"):t;document.body.classList.toggle("noanim",S.a===0)};
export const toast=m=>{const t=$("#toast");t.textContent=m;t.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove("on"),3200)};
const cache={};
export async function list(c){if(cache[c])return cache[c];let r=[];
try{r=(await Promise.race([getDocs(query(collection(db,c),orderBy("at","desc"))),new Promise((_,j)=>setTimeout(j,3500))])).docs.map(d=>({id:d.id,...d.data()}))}catch{}
return cache[c]=(r.length?r:(SAMPLES[c]||[]).map((x,i)=>({...x,id:"s"+i,sample:1,mrp:x.price?Math.round(x.price*1.12/100)*100:0}))).map(x=>({...x,_c:c}))}
export const add=(c,d)=>addDoc(collection(db,c),{...d,at:Date.now()});
export const price=p=>Number(p)?"₹"+Number(p).toLocaleString("en-IN"):esc(p);
export const art=x=>{const i=x.images?.[0]||x.img;return i?`<img loading="lazy" src="${esc(i)}" alt="${esc(x.name||x.caption)}">`:`<div class="art" style="--h:${+x.hue||240}"><b>${esc(x.brand||x.caption)}</b><span>${esc(x.name||"")}</span></div>`};
export const card=x=>{const o=x.mrp>x.price?Math.round((1-x.price/x.mrp)*100):0;return`<a class="card tilt" href="#/product/${x._c}/${x.id}"><div class="media">${art(x)}${x.sample?'<em class="bdg">Demo</em>':""}${o?`<em class="bdg r">${o}% off</em>`:""}</div><div class="b"><small>${esc(x.brand)}</small><h3>${esc(x.name)}</h3><div class="chips">${String(x.specs||"").split("|").filter(s=>s.trim()).slice(0,3).map(s=>`<i>${esc(s.trim())}</i>`).join("")}</div><div class="row"><b>${price(x.price)}</b><span class="btn p sm">View</span></div></div></a>`};
export const get=async(c,i)=>(await list(c)).find(x=>x.id==i);
export const stars=n=>"★".repeat(n)+"☆".repeat(5-n);
