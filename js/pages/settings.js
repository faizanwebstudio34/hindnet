import{S,save,applyPrefs,$$}from"../core.js";
const B=(k,v,l,on)=>`<button class="ch${on?" on":""}" data-k="${k}" data-v="${v}">${l}</button>`;
export default async()=>`<h1 class="ph">Preferences</h1><div class="pn wide"><h3>Theme</h3><div class="chipbar">${[["dark","Dark"],["light","Light"],["auto","Match device"]].map(([v,l])=>B("t",v,l,(S.t||"dark")==v)).join("")}</div>
<h3>Animations</h3><div class="chipbar">${B("a",1,"On",S.a!==0)}${B("a",0,"Off",S.a===0)}</div><h3>3D effects</h3><div class="chipbar">${B("fx",1,"On",S.fx!==0)}${B("fx",0,"Off",S.fx===0)}</div><p class="m">Turn off animations and 3D for the fastest experience on older devices.</p><p><button class="btn sm" id="rs">Reset preferences</button></p></div>`;
export const mount=A=>{$$("[data-k]",A).forEach(b=>b.onclick=()=>{S[b.dataset.k]=b.dataset.k=="t"?b.dataset.v:+b.dataset.v;save();applyPrefs();dispatchEvent(new Event("rerender"))});
document.getElementById("rs").onclick=()=>{for(const k in S)delete S[k];save();applyPrefs();dispatchEvent(new Event("rerender"))}};
