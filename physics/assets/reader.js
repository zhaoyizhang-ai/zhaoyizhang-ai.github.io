(()=>{
const key='physics-reading-v1:'+location.pathname,main=document.querySelector('main');
if(!main)return;
const btn=document.querySelector('.menu-button'),sidebar=document.querySelector('.sidebar');
btn?.addEventListener('click',()=>{let open=sidebar.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));});
sidebar?.addEventListener('click',e=>{if(e.target.closest('a')){sidebar.classList.remove('open');btn.setAttribute('aria-expanded','false');}});
main.querySelectorAll('p,figure,h2,h3,details').forEach((p,i)=>{if(!p.id)p.id='read-'+i;});
let restoring=true,timer;
try{const size=Number(localStorage.getItem('physics-text-size'));if(size>=17&&size<=24)document.documentElement.style.setProperty('--read-size',size+'px');}catch{}
document.querySelectorAll('[data-font]').forEach(b=>b.addEventListener('click',()=>{const cur=parseFloat(getComputedStyle(document.body).fontSize),size=Math.max(17,Math.min(24,cur+Number(b.dataset.font)));document.documentElement.style.setProperty('--read-size',size+'px');try{localStorage.setItem('physics-text-size',size);}catch{}requestAnimationFrame(mathHints);}));
function save(){if(restoring)return;const all=[...main.querySelectorAll('[id]')].filter(n=>n.offsetHeight>0);let anchor=all.find(n=>n.getBoundingClientRect().top>=64)||all.at(-1);try{localStorage.setItem(key,JSON.stringify({id:anchor?.id,offset:anchor?.getBoundingClientRect().top||0,y:scrollY,hash:location.hash}));}catch{}}
function progress(){const h=document.documentElement.scrollHeight-innerHeight;document.querySelector('.progress').style.width=(h>0?Math.min(100,100*scrollY/h):0)+'%';const hs=[...main.querySelectorAll('h2[id]')];let cur=hs[0];for(const x of hs)if(x.getBoundingClientRect().top<140)cur=x;sidebar?.querySelectorAll('a').forEach(a=>{if(a.hash==='#'+cur?.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}
addEventListener('scroll',()=>{progress();clearTimeout(timer);timer=setTimeout(save,180);},{passive:true});
addEventListener('pagehide',save);
(document.fonts?.ready||Promise.resolve()).then(()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{mathHints();{try{const s=JSON.parse(localStorage.getItem(key)||'null');if(s&&(!location.hash||s.hash===location.hash)){const el=document.getElementById(s.id);scrollTo(0,el?scrollY+el.getBoundingClientRect().top-s.offset:s.y);}}catch{}}restoring=false;progress();})));
function mathHints(){main.querySelectorAll('.equation').forEach(el=>{const wide=el.scrollWidth>el.clientWidth+3;let hint=el.nextElementSibling;if(wide){el.tabIndex=0;el.setAttribute('aria-label','可左右滑动的公式');if(!hint?.classList.contains('math-hint')){hint=document.createElement('p');hint.className='math-hint';hint.textContent='公式较长，可左右滑动 →';el.after(hint);}}else{el.removeAttribute('tabindex');if(hint?.classList.contains('math-hint'))hint.remove();}});} addEventListener('resize',()=>requestAnimationFrame(mathHints));
})();
