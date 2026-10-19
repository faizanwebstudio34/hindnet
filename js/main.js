import{auth,X,S,$,$$,save,applyPrefs}from"./core.js";
import{onAuthStateChanged}from"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
const R=["home","laptops","accessories","travel","gallery","contact","settings","account"];let tok=0,clean=null,cur="home";
const io=new IntersectionObserver(es=>es.forEach(x=>{if(!x.isIntersecting)return;const t=x.target;t.classList.add("in");io.unobserve(t);$$(".cnt",t).forEach(c=>{const m=+c.dataset.n;let n=0;const id=setInterval(()=>{n=Math.min(m,n+Math.ceil(m/45));c.textContent=n;if(n>=m)clearInterval(id)},28)})}),{rootMargin:"0px 0px -4% 0px"});
async function render(){const h=location.hash.replace(/^#\/?/,"").split("?")[0]||"home",k=R.includes(h)?h:"home",t=++tok;cur=k;document.body.classList.add("busy");
try{const m=await import(`./pages/${k}.js`),html=await m.default();if(t!=tok)return;clean?.();const A=$("#app");A.innerHTML=html;A.style.animation="none";void A.offsetWidth;A.style.animation="";scrollTo(0,0);
clean=m.mount?.(A)||null;$$(".rv",A).forEach(x=>io.observe(x));$$("nav [data-r]").forEach(a=>a.classList.toggle("on",a.dataset.r==k))}
catch(e){console.error(e);if(t==tok)$("#app").innerHTML='<h1 class="ph">Something went wrong</h1><p class="lead">Please refresh the page.</p>'}
finally{if(t==tok)document.body.classList.remove("busy")}
setTimeout(()=>$$(".rv:not(.in)").forEach(x=>x.classList.add("in")),2500)}
addEventListener("hashchange",render);addEventListener("rerender",render);applyPrefs();
const th=()=>{S.t=document.documentElement.dataset.theme=="dark"?"light":"dark";save();applyPrefs()};$("#tg").onclick=$("#tg2").onclick=th;
const nv=o=>{document.body.classList.toggle("nav-open",o);$("#mn").setAttribute("aria-expanded",o)};
$("#mn").onclick=()=>nv(!document.body.classList.contains("nav-open"));$("#scrim").onclick=()=>nv(false);
$("#side").addEventListener("click",e=>{if(e.target.closest("a"))nv(false)});addEventListener("hashchange",()=>nv(false));addEventListener("keydown",e=>e.key=="Escape"&&nv(false));
document.addEventListener("pointermove",e=>{const c=e.target.closest?.(".tilt");if(!c||S.a===0||e.pointerType!="mouse")return;const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(900px) rotateY(${x*9}deg) rotateX(${-y*9}deg) translateY(-6px)`});
document.addEventListener("pointerout",e=>{const c=e.target.closest?.(".tilt");if(c&&!c.contains(e.relatedTarget))c.style.transform=""});
document.addEventListener("click",e=>{const g=e.target.closest(".gi");if(g){$("#lb").innerHTML=g.innerHTML;$("#lb").classList.add("on")}else if(e.target.closest("#lb"))$("#lb").classList.remove("on")});
addEventListener("keydown",e=>e.key=="Escape"&&$("#lb").classList.remove("on"));
onAuthStateChanged(auth,u=>{X.user=u;$("#mb").textContent=u?(u.displayName||"Account").split(" ")[0]:"Member Access";if(cur=="account")render()});
render();
