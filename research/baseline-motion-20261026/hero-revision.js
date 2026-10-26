(() => {
 const button=document.querySelector('.hero-demo-query');if(!button)return;
 const typed=button.querySelector('.hero-typed-sector'),select=document.querySelector('#demo-sector-select'),mobile=matchMedia('(max-width:760px)'),reduced=matchMedia('(prefers-reduced-motion:reduce)');
 const samples=[['architecture','Mimarlık ofisleri'],['cafe','Kafeler'],['clinic','Diş klinikleri']];let sample=0,timer=0,inView=false,paused=false;
 const allowed=()=>mobile.matches&&inView&&!paused&&!reduced.matches&&!document.hidden&&!document.body.classList.contains('onboarding-open')&&!button.matches(':focus-visible');
 function stop(){clearTimeout(timer);typed.textContent=samples[sample][1]}
 function cycle(){clearTimeout(timer);if(!allowed()){stop();return}const [key,label]=samples[sample];button.dataset.obSector=label;button.setAttribute('aria-label',`Beyoğlu ${label.toLocaleLowerCase('tr-TR')} için ücretsiz ara`);select.value=key;select.dispatchEvent(new Event('change',{bubbles:true}));let n=0;typed.textContent='';function type(){if(!allowed()){stop();return}typed.textContent=label.slice(0,++n);if(n<label.length)timer=setTimeout(type,45);else timer=setTimeout(()=>{sample=(sample+1)%samples.length;cycle()},3400)}type();}
 new IntersectionObserver(es=>es.forEach(e=>{inView=e.isIntersecting;if(inView)cycle();else stop()}),{threshold:.15}).observe(document.querySelector('.hero'));
 window.addEventListener('veriburada:motion',e=>{paused=e.detail.paused;if(paused)stop();else cycle()});document.addEventListener('visibilitychange',()=>document.hidden?stop():cycle());reduced.addEventListener('change',()=>reduced.matches?stop():cycle());mobile.addEventListener('change',()=>mobile.matches?cycle():stop());button.addEventListener('focus',stop);button.addEventListener('blur',cycle);document.addEventListener('veriburada:onboarding-open',stop);document.addEventListener('veriburada:onboarding-close',cycle);
})();
