/* Shared navigation. Stable panel geometry, backdrop, focus containment and Escape. */
(() => {
 const button=document.querySelector('.menu-toggle'),panel=document.querySelector('.menu-panel'),backdrop=document.querySelector('.menu-backdrop');if(!button||!panel)return;
 const header=document.querySelector('.header');let opened=false,previous;
 const affected=[...document.querySelectorAll('main,body>footer')];
 function set(open){opened=open;header.classList.toggle('menu-open',open);document.body.classList.toggle('navigation-open',open);panel.inert=!open;panel.setAttribute('aria-hidden',String(!open));button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'Menüyü kapat':'Menüyü aç');affected.forEach(el=>el.inert=open);if(open){previous=document.activeElement;requestAnimationFrame(()=>panel.querySelector('a').focus({preventScroll:true}))}else if(previous&&panel.contains(document.activeElement))button.focus({preventScroll:true})}
 button.addEventListener('click',()=>set(!opened));backdrop?.addEventListener('click',()=>set(false));panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>set(false)));
 document.addEventListener('keydown',ev=>{if(!opened)return;if(ev.key==='Escape'){ev.preventDefault();set(false);button.focus();return}if(ev.key==='Tab'){const links=[button,...panel.querySelectorAll('a,button')].filter(el=>!el.disabled);const at=links.indexOf(document.activeElement),next=ev.shiftKey?(at<=0?links.length-1:at-1):(at+1)%links.length;ev.preventDefault();links[next].focus()}});
 addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>20),{passive:true});set(false);
})();
