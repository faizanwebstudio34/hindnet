import{list,card,esc,$,$$}from"../core.js";
export const catalog=(title,sub,col)=>{let items=[],f={q:"",b:"All",s:""};
const grid=()=>{let r=items.filter(x=>(f.b=="All"||x.brand==f.b)&&(x.name+x.brand+x.specs).toLowerCase().includes(f.q));if(f.s)r=[...r].sort((a,b)=>f.s=="lo"?a.price-b.price:b.price-a.price);return r.map(card).join("")||'<p class="m">No matches. Try a different search.</p>'};
return{page:async()=>{items=await list(col);f={q:"",b:"All",s:""};const bs=["All",...new Set(items.map(x=>x.brand).filter(Boolean))];
return`<h1 class="ph">${title}</h1><p class="lead">${sub}</p><div class="bar"><input id="q" placeholder="Search ${col}" aria-label="Search"><select id="s" aria-label="Sort"><option value="">Featured</option><option value="lo">Price: low to high</option><option value="hi">Price: high to low</option></select></div><div class="chipbar">${bs.map((b,i)=>`<button class="ch${i?"":" on"}">${esc(b)}</button>`).join("")}</div><div class="g" id="gr">${grid()}</div>`},
mount:A=>{const up=()=>$("#gr").innerHTML=grid();$("#q").oninput=e=>{f.q=e.target.value.toLowerCase();up()};$("#s").onchange=e=>{f.s=e.target.value;up()};
$$(".ch",A).forEach(b=>b.onclick=()=>{$$(".ch",A).forEach(x=>x.classList.remove("on"));b.classList.add("on");f.b=b.textContent;up()})}}};
