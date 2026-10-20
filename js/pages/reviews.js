import{X,$,$$,add,toast,stars,refresh,liveRev,rcard}from"../core.js";import{REVIEWS}from"../data.js";
const LB=["Poor","Fair","Good","Very good","Excellent"];
export default async()=>{const A=[...liveRev(),...REVIEWS],n=A.length,avg=A.reduce((a,r)=>a+r.rating,0)/n;
return`<h1 class="ph">Customer Voices</h1><p class="lead">Honest reviews from people who shop with Hindnet.</p>
<div class="rtop"><div class="rsum"><div class="big"><b>${avg.toFixed(1)}</b><span class="st">${stars(Math.round(avg))}</span><p class="m">${n} reviews</p></div><div class="bars">${[5,4,3,2,1].map(s=>`<div><span>${s}★</span><i><u style="width:${A.filter(r=>r.rating==s).length/n*100}%"></u></i></div>`).join("")}</div></div>
<div class="rform">${X.user?`<h3>Write a review</h3><form id="rf"><div class="pick">${[1,2,3,4,5].map(i=>`<button type="button" data-v="${i}" class="sb" aria-label="${i} stars">★</button>`).join("")}<span class="m" id="pl"></span></div><input name="title" placeholder="Review title" required maxlength="80"><textarea name="text" placeholder="Share your experience" required maxlength="900"></textarea><button class="btn p">Post review</button></form>`:'<h3>Share your experience</h3><p class="m" style="margin:8px 0 16px">Sign in to write a review and help others choose with confidence.</p><a class="btn p" href="#/account">Sign in to review</a>'}</div></div>
<div class="g rg">${A.map(rcard).join("")}</div>`};
export const mount=()=>{const f=$("#rf");if(!f)return;let v=5;const set=n=>{v=n;$$(".sb",f).forEach(b=>b.classList.toggle("on",+b.dataset.v<=n));$("#pl").textContent=LB[n-1]};set(5);$$(".sb",f).forEach(b=>b.onclick=()=>set(+b.dataset.v));
f.onsubmit=async e=>{e.preventDefault();const q=f.elements,b=f.querySelector("button.p");b.disabled=true;b.textContent="Posting...";
try{await add("reviews",{name:X.user.displayName||X.user.email.split("@")[0],uid:X.user.uid,rating:v,title:q.title.value.trim(),text:q.text.value.trim()});f.reset();set(5);toast("Thank you! Your review is live.");refresh("reviews")}
catch(x){toast(x.code=="permission-denied"?"Reviews are not enabled yet. Publish the latest Firestore rules.":"Could not post your review. Please try again.")}
b.disabled=false;b.textContent="Post review"}};
