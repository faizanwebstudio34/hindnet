import{initializeApp}from"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import{getAuth}from"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import{getFirestore,collection,getDocs,addDoc,query,orderBy,getDoc,doc}from"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import{SAMPLES}from"./data.js";
export const CFG={wa:"919999999999",phone:"+91 99999 99999",mail:"hello@hindnet.in",addr:"Your shop address, City, State",hours:"Mon-Sat, 10 AM - 8 PM",model:"",brands:["Dell","HP","Lenovo","Asus","Apple","Acer","MSI","Logitech","Sony"]};
const fb=initializeApp({apiKey:"AIzaSyAcKFw1IKx9BAcQUfX4Vg75Pr8vzCfTH1s",authDomain:"hindnetweb.firebaseapp.com",projectId:"hindnetweb",storageBucket:"hindnetweb.firebasestorage.app",messagingSenderId:"1038020453028",appId:"1:1038020453028:web:5234108e453a1f015cfc31"});
export const auth=getAuth(fb),db=getFirestore(fb),X={user:null};
export const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
export const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
export const S=(()=>{try{return JSON.parse(localStorage.hn||"{}")}catch{return{}}})();
export const save=()=>{try{localStorage.hn=JSON.stringify(S)}catch{}};
export const applyPrefs=()=>{const t=S.t||"dark";document.documentElement.dataset.theme=t=="auto"?(matchMedia("(prefers-color-scheme:light)").matches?"light":"dark"):t;document.body.classList.toggle("noanim",S.a===0)};
export const toast=m=>{const t=$("#toast");t.textContent=m;t.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove("on"),3200)};
const mem={},fe={},rd={},raw={},dec=(c,r)=>(r.length?r:(SAMPLES[c]||[]).map((x,i)=>({...x,id:"s"+i,sample:1,mrp:x.price?Math.round(x.price*1.12/100)*100:0}))).map(x=>({...x,_c:c}));
export function list(c){if(!mem[c]){let s="[]";try{s=localStorage["hn_"+c]||"[]"}catch{}raw[c]=s;try{mem[c]=dec(c,JSON.parse(s))}catch{mem[c]=dec(c,[])}}if(!fe[c])refresh(c);return mem[c]}
export function refresh(c){fe[c]=1;return rd[c]=(async()=>{try{const r=(await Promise.race([getDocs(query(collection(db,c),orderBy("at","desc"))),new Promise((_,j)=>setTimeout(j,10000))])).docs.map(d=>({id:d.id,...d.data()})),s=JSON.stringify(r);if(s!==raw[c]){raw[c]=s;mem[c]=dec(c,r);try{localStorage["hn_"+c]=s}catch{}dispatchEvent(new Event("data"))}}catch{}})()}
export const media=async id=>{try{const s=await getDoc(doc(db,"media",id));return s.exists()?s.data().images:null}catch{return null}};
export const add=(c,d)=>addDoc(collection(db,c),{...d,at:Date.now()});
export const price=p=>Number(p)?"₹"+Number(p).toLocaleString("en-IN"):esc(p);
export const art=x=>{const i=x.images?.[0]||x.img;return i?`<img loading="lazy" src="${esc(i)}" alt="${esc(x.name||x.caption)}">`:`<div class="art" style="--h:${+x.hue||240}"><b>${esc(x.brand||x.caption)}</b><span>${esc(x.name||"")}</span></div>`};
export const card=x=>{const o=x.mrp>x.price?Math.round((1-x.price/x.mrp)*100):0;return`<a class="card tilt" href="#/product/${x._c}/${x.id}"><div class="media">${art(x)}${x.sample?'<em class="bdg">Demo</em>':""}${o?`<em class="bdg r">${o}% off</em>`:""}</div><div class="b"><small>${esc(x.brand)}</small><h3>${esc(x.name)}</h3><div class="chips">${String(x.specs||"").split("|").filter(s=>s.trim()).slice(0,3).map(s=>`<i>${esc(s.trim())}</i>`).join("")}</div><div class="row"><b>${price(x.price)}</b><span class="btn p sm">View</span></div></div></a>`};
export const get=async(c,i)=>{let x=list(c).find(y=>y.id==i);if(!x){await rd[c];x=list(c).find(y=>y.id==i)}return x};
export const liveRev=()=>list("reviews").filter(x=>!x.sample).map(x=>({...x,date:new Date(x.at).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}));
export const rcard=r=>`<article class="rc"><div class="rh"><span class="av">${esc((r.name||"?").split(" ").map(w=>w[0]).slice(0,2).join("").toUpperCase())}</span><div><b>${esc(r.name)}</b><br><small class="m">${esc(r.city||"Hindnet customer")}${r.verified?" · Verified buyer":""}</small></div></div><span class="st">${stars(r.rating)}</span><h3>${esc(r.title)}</h3><p class="m">${esc(r.text)}</p><small class="m">${esc(r.date||"")}</small></article>`;
export const stars=n=>"★".repeat(n)+"☆".repeat(5-n);
