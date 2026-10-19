import{X,$,$$,add,toast}from"../core.js";
const C={Train:["Sleeper (SL)","AC 3 Tier (3A)","AC 2 Tier (2A)","AC First (1A)","Chair Car (CC)"],Flight:["Economy","Premium Economy","Business"]},RT=[["Patna","Delhi"],["Delhi","Mumbai"],["Mumbai","Bengaluru"],["Kolkata","Patna"],["Delhi","Goa"]];
export default async()=>`<h1 class="ph">Travel Lounge</h1><p class="lead">Send your train or flight details and our team will confirm your ticket. Sign in to send a request.</p>
<div class="pn wide"><div class="seg">${Object.keys(C).map((t,i)=>`<button class="ch${i?"":" on"}" data-t="${t}" type="button">${t}</button>`).join("")}</div>
<form id="bf"><div class="two"><input name="from" placeholder="From" required><input name="to" placeholder="To" required></div><div class="two"><input name="date" type="date" required min="${new Date().toISOString().slice(0,10)}" aria-label="Date"><select name="cls" aria-label="Class"></select></div><input name="pax" type="number" min="1" max="9" value="1" aria-label="Passengers"><button class="btn p wd">Send request</button></form><p class="m" id="er" role="alert"></p></div>
<h2>Popular routes</h2><div class="chipbar">${RT.map(([a,b])=>`<button class="ch r" data-a="${a}" data-b="${b}">${a} to ${b}</button>`).join("")}</div>`;
export const mount=A=>{let t="Train";const f=$("#bf"),v=f.elements,fill=()=>v.cls.innerHTML=C[t].map(c=>`<option>${c}</option>`).join("");fill();
$$("[data-t]",A).forEach(b=>b.onclick=()=>{t=b.dataset.t;$$("[data-t]",A).forEach(x=>x.classList.toggle("on",x==b));fill()});
$$(".r",A).forEach(b=>b.onclick=()=>{v.from.value=b.dataset.a;v.to.value=b.dataset.b;scrollTo({top:0,behavior:"smooth"})});
f.onsubmit=async e=>{e.preventDefault();if(!X.user){toast("Please sign in first");location.hash="#/account";return}
try{await add("bookings",{type:t,from:v.from.value,to:v.to.value,date:v.date.value,cls:v.cls.value,pax:+v.pax.value,email:X.user.email});$("#er").textContent="Request received. We will contact you shortly.";f.reset();fill()}catch{$("#er").textContent="Could not send the request. Please try again."}}};
