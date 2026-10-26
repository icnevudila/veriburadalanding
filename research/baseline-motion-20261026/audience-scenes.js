(() => {
 const card=document.querySelector('#audience-content');if(!card)return;const reduced=matchMedia('(prefers-reduced-motion:reduce)');let visible=false,paused=false;
 function update(){card.querySelectorAll('[data-audience-view]').forEach(scene=>scene.classList.toggle('audience-running',visible&&!paused&&!reduced.matches&&!document.hidden&&!scene.hidden))}
 new IntersectionObserver(es=>{visible=es[0].isIntersecting;update()},{threshold:.2}).observe(card);
 window.addEventListener('veriburada:audience',update);window.addEventListener('veriburada:motion',e=>{paused=e.detail.paused;update()});reduced.addEventListener('change',update);document.addEventListener('visibilitychange',update);update();
})();
