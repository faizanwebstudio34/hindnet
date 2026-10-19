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
return cache[c]=r.length?r:(SAMPLES[c]||[]).map(x=>({...x,sample:1}))}
export const add=(c,d)=>addDoc(collection(db,c),{...d,at:Date.now()});
export const price=p=>Number(p)?"₹"+Number(p).toLocaleString("en-IN"):esc(p);
export const art=x=>x.img?`<img loading="lazy" src="${esc(x.img)}" alt="${esc(x.name||x.caption)}">`:`<div class="art" style="--h:${+x.hue||240}"><span>${x.icon||"💻"}</span></div>`;
export const card=x=>`<article class="card tilt"><div class="media">${art(x)}${x.sample?'<em class="bdg">Demo</em>':""}</div><div class="b"><small>${esc(x.brand)}</small><h3>${esc(x.name)}</h3><div class="chips">${String(x.specs||"").split("|").filter(s=>s.trim()).map(s=>`<i>${esc(s.trim())}</i>`).join("")}</div><div class="row"><b>${price(x.price)}</b><a class="btn p sm" target="_blank" rel="noopener" href="https://wa.me/${CFG.wa}?text=${encodeURIComponent("Hi Hindnet, I'm interested in "+x.name)}">Enquire</a></div></div></article>`;
