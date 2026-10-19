import{list,art}from"../core.js";
export default async()=>`<h1 class="ph">Showcase</h1><p class="lead">A look inside Hindnet: our store, products and people.</p><div class="gl">${(await list("gallery")).map(x=>`<div class="gi" style="--ar:${x.ar||"4/3"}">${art(x)}</div>`).join("")}</div>`;
