const C=window.CONTENT,$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const H=(s,tag='h1',cls='')=>`<${tag} class="${cls}" data-split>${esc(s)}</${tag}>`;
const label=n=>`<div class="label"><b>${esc(C.label.l1)}</b><span class="num">${esc(n||C.label.ph)}</span><i>${esc(C.label.l2)}</i><small>${esc(C.label.l3)}</small></div>`;
const phone=(scr,extra='')=>`<div class="phone"><div class="cam"></div><div class="scr" aria-live="polite">${esc(scr)}</div><div class="slot"></div>${extra}</div>`;
const P={
home:()=>{const h=C.home;return `<section class="hero">${H(h.title,'h1','big')}<p class="sub" data-r>${esc(h.sub)}</p><div class="row" data-r><a class="btn mag" href="#/order">${esc(h.cta)}</a><a class="btn ghost mag" href="#/how">${esc(h.cta2)}</a></div>
<div class="play" id="play">${phone(h.lost)}<div class="drag" id="drag" tabindex="0" role="button" aria-label="${esc(h.hint)} Press Enter to stick it.">${label(h.demo)}</div><p class="hint">${esc(h.hint)}</p></div></section>
<section class="feats">${h.feats.map(f=>`<article data-r><h2>${esc(f.h)}</h2><p>${esc(f.p)}</p></article>`).join('')}</section>
<section class="stat"><strong data-r>${esc(h.stat.n)}</strong><p data-r>${esc(h.stat.p)}</p></section>
<section class="band">${H(h.band.h,'h2','head')}<p data-r>${esc(h.band.p)}</p><a class="btn mag" href="#/order">${esc(h.band.cta)}</a></section>`},
how:()=>`<section class="pagehead">${H(C.how.title,'h1','head')}</section><section class="how" data-s="0"><div class="stage" aria-hidden="true">${phone(C.how.screens[0],`<div class="lab">${label()}</div>`)}</div><div>${C.how.steps.map((s,i)=>`<article class="step" data-i="${i}"><span>${i+1}</span><h2>${esc(s.h)}</h2><p>${esc(s.p)}</p></article>`).join('')}</div></section>`,
order:()=>{const o=C.order;return `<section class="pagehead">${H(o.title,'h1','head')}<p class="sub" data-r>${esc(o.sub)}</p></section><section class="order"><form id="of"><fieldset><legend>${esc(o.packs)}</legend>${C.price.map((p,i)=>`<label class="pk"><input type="radio" name="pack" value="${i}" ${i?'':'checked'}> <span><b>$${p.p}</b> ${esc(p.n)}</span></label>`).join('')}</fieldset>
<label class="f">${esc(o.tel)}<input id="tn" name="tel" type="tel" inputmode="tel" required pattern="\\(\\d{3}\\) \\d{3}-\\d{4}" placeholder="(555) 010-2030" autocomplete="off"><small class="h">${esc(o.telHint)}</small></label>
<label class="f">${esc(o.name)}<input name="name" type="text" required autocomplete="name"></label><label class="f">${esc(o.email)}<input name="email" type="email" required autocomplete="email"></label><label class="f">${esc(o.street)}<input name="street" type="text" required autocomplete="street-address"></label>
<div class="g3"><label class="f">${esc(o.city)}<input name="city" type="text" required></label><label class="f">${esc(o.state)}<input name="state" type="text" required maxlength="2" autocomplete="address-level1"></label><label class="f">${esc(o.zip)}<input name="zip" type="text" required inputmode="numeric" pattern="\\d{5}" maxlength="5" autocomplete="postal-code"></label></div>
<p><b>${esc(o.total)}: <span id="tot"></span></b></p><button class="btn mag" type="submit">${esc(o.pay)}</button><small class="h">${esc(o.demoNote)} ${esc(C.priceNote)}</small></form>
<aside class="prev"><h2>${esc(o.prev)}</h2>${label()}</aside><div id="done" style="grid-column:1/-1" role="status"></div></section>`},
why:()=>{const w=C.why;return `<section class="pagehead">${H(w.title,'h1','head')}<p class="story" data-r>${esc(w.story)}</p><div class="cases">${w.cases.map(c=>`<article data-r><h2>${esc(c.h)}</h2><p>${esc(c.p)}</p></article>`).join('')}</div></section>`},
faq:()=>`<section class="pagehead">${H(C.faq.title,'h1','head')}<div style="margin-top:2rem">${C.faq.items.map(([q,a])=>`<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div></section>`,
contact:()=>{const c=C.contact;return `<section class="pagehead">${H(c.title,'h1','head')}<p class="sub" data-r>${esc(c.p)}</p><div class="row" data-r><a class="btn mag" href="mailto:${esc(c.email)}">${esc(c.email)}</a></div><p class="sub" data-r>${esc(c.hours)}</p></section>`}};
function split(){$$('[data-split]').forEach(el=>{if(el.dataset.done)return;el.dataset.done=1;const t=el.textContent;el.setAttribute('aria-label',t);el.innerHTML=t.split(' ').map((w,i)=>`<span class="w" aria-hidden="true"><span style="--i:${i}">${esc(w)}</span></span> `).join('')})}
function reveal(){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.2});$$('[data-split],[data-r]').forEach(e=>io.observe(e))}
function mag(){if(RM||!matchMedia('(pointer:fine)').matches)return;$$('.mag').forEach(b=>{b.onpointermove=e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.35}px)`};b.onpointerleave=()=>b.style.transform=''})}
function sticky(){const s=$('.how');if(!s)return;const set=i=>{s.dataset.s=i;$('.scr',s).textContent=C.how.screens[i]};const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&set(+e.target.dataset.i)),{rootMargin:'-40% 0px -40% 0px'});$$('.step',s).forEach(e=>io.observe(e))}
function drag(){const d=$('#drag');if(!d)return;const slot=$('#play .slot'),ph=$('#play .phone'),scr=$('#play .scr');let sx,sy,ox=0,oy=0,done=false;
const c=r=>[r.left+r.width/2,r.top+r.height/2];
const snap=()=>{const [ax,ay]=c(slot.getBoundingClientRect()),[bx,by]=c(d.getBoundingClientRect());ox+=ax-bx;oy+=ay-by;d.style.transform=`translate(${ox}px,${oy}px) rotate(0) scale(.54)`;d.classList.add('stuck');ph.classList.add('found');scr.textContent=C.home.found;done=true};
const reset=()=>{ox=oy=0;d.style.transform='';d.classList.remove('stuck');ph.classList.remove('found');scr.textContent=C.home.lost;done=false};
d.onpointerdown=e=>{if(done){reset();return}d.setPointerCapture(e.pointerId);d.classList.add('on');sx=e.clientX-ox;sy=e.clientY-oy};
d.onpointermove=e=>{if(!d.classList.contains('on'))return;ox=e.clientX-sx;oy=e.clientY-sy;d.style.transform=`translate(${ox}px,${oy}px) rotate(-4deg)`};
d.onpointerup=()=>{if(!d.classList.contains('on'))return;d.classList.remove('on');const [ax,ay]=c(slot.getBoundingClientRect()),[bx,by]=c(d.getBoundingClientRect());Math.hypot(ax-bx,ay-by)<110?snap():(ox=oy=0,d.style.transform='')};
d.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();done?reset():snap()}}}
function order(){const f=$('#of');if(!f)return;const tn=$('#tn'),pv=$('.prev .num'),tot=$('#tot');
const fmt=v=>{const d=v.replace(/\D/g,'').slice(0,10);return d.length>6?`(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}`:d.length>3?`(${d.slice(0,3)}) ${d.slice(3)}`:d};
const pk=()=>C.price[+f.pack.value];const upd=()=>{pv.textContent=tn.value||C.label.ph;tot.textContent=`$${pk().p} for ${pk().q} labels`};
tn.oninput=()=>{tn.value=fmt(tn.value);upd()};f.onchange=upd;upd();
f.onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f)),o=C.order;
// Replace this demo with PayPal checkout once [PayPal business account] is connected.
$('#done').innerHTML=`<h2>${esc(o.doneH)}</h2><p>${esc(o.doneP)}</p><div class="sheet">${Array(pk().q).fill(label(d.tel)).join('')}<div class="mail"><small>${esc(o.from)}</small><p>${esc(d.name)}<br>${esc(d.street)}<br>${esc(d.city)}, ${esc(d.state.toUpperCase())} ${esc(d.zip)}</p></div></div><button class="btn mag noprint" type="button" onclick="print()">${esc(o.print)}</button>`;$('#done').scrollIntoView({behavior:RM?'auto':'smooth'});mag()}}
function chrome(){$('#nav').innerHTML=C.nav.map(([k,l])=>`<a data-k="${k}" href="#/${k==='home'?'':k}">${esc(l)}</a>`).join('');$('#foot').innerHTML=`<span>${esc(C.foot)}</span>`}
function route(){if(location.hash==='#main'){$('#main').focus();return}let k=location.hash.replace(/^#\/?/,'')||'home';if(!P[k])k='home';
$('#main').innerHTML=P[k]();const n=C.nav.find(x=>x[0]===k);document.title=(k==='home'?C.brand:n[1]+' | '+C.brand);
$$('#nav a').forEach(a=>a.getAttribute('data-k')===k?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current'));
scrollTo(0,0);split();reveal();mag();sticky();drag();order();$('#main').focus({preventScroll:true})}
chrome();route();addEventListener('hashchange',route);
(()=>{const i=$('#intro');let seen;try{seen=sessionStorage.ffl;sessionStorage.ffl=1}catch(e){}if(RM||seen){i.remove();return}i.onclick=()=>i.remove();setTimeout(()=>i.classList.add('out'),1700);setTimeout(()=>i.remove(),2700)})();
