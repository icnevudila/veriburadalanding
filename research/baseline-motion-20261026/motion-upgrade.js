(() => {
 const closing=document.querySelector('.closing'),master=document.querySelector('.motion-master'),reduced=matchMedia('(prefers-reduced-motion:reduce)');let paused=false;
 if(closing) new IntersectionObserver(es=>es.forEach(e=>closing.classList.toggle('is-inview',e.isIntersecting&&!document.hidden)),{threshold:.1}).observe(closing);
 document.addEventListener('visibilitychange',()=>{document.body.classList.toggle('motion-backgrounded',document.hidden);if(closing){if(document.hidden)closing.classList.remove('is-inview');else if(closing.getBoundingClientRect().top<innerHeight&&closing.getBoundingClientRect().bottom>0)closing.classList.add('is-inview')}});
 if(master){
  master.addEventListener('click',()=>{
   paused=!paused;document.body.classList.toggle('motion-paused',paused);master.setAttribute('aria-pressed',String(paused));master.textContent=paused?'▶ Animasyonları sürdür':'Ⅱ Animasyonları duraklat';
   document.querySelectorAll('video').forEach(v=>{if(paused)v.pause();else{const r=v.getBoundingClientRect();if(!reduced.matches&&r.width>0&&r.top<innerHeight&&r.bottom>0)v.play().catch(()=>{})}});
   window.dispatchEvent(new CustomEvent('veriburada:motion',{detail:{paused}}));
  });
 }
})();
