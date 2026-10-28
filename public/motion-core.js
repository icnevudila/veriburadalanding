/* Small timeline coordinator. Compositions and timing are authored per scene. */
(() => {
 const scenes=new Set(),reduced=matchMedia('(prefers-reduced-motion:reduce)');let paused=false,frame=0,last=0;
 const clamp=x=>Math.max(0,Math.min(1,x)),ease=x=>1-Math.pow(1-clamp(x),3),smooth=x=>{x=clamp(x);return x*x*(3-2*x)};
 function active(s){return s.visible&&s.enabled&&!paused&&!reduced.matches&&!document.hidden&&!document.body.classList.contains('onboarding-open')}
 function schedule(){if(!frame&&[...scenes].some(active)){last=performance.now();frame=requestAnimationFrame(tick)}}
 function tick(now){frame=0;const dt=Math.min(80,now-last);if(dt<30){frame=requestAnimationFrame(tick);return}last=now;for(const s of scenes)if(active(s)){s.time=(s.time+dt*1.75)%s.duration;s.render(s.time/1000);s.root.dataset.motionTime=(s.time/1000).toFixed(2)}schedule()}
 function update(){for(const s of scenes){s.root.classList.toggle('studio-running',active(s));if(reduced.matches)s.render(s.staticAt/1000)}if(![...scenes].some(active)){cancelAnimationFrame(frame);frame=0}else schedule()}
 window.VBMotion={clamp,ease,smooth,sample(root,seconds){const s=[...scenes].find(s=>s.root===root);if(!s)return false;s.enabled=false;s.time=seconds*1000;s.render(seconds);s.root.dataset.motionTime=seconds.toFixed(2);update();return true},create(root,{duration,render,staticAt=duration-2000,target=root,enabled=true}){
  const s={root,duration,render,staticAt,enabled,visible:false,time:0};scenes.add(s);render(reduced.matches?staticAt/1000:0);
  new IntersectionObserver(es=>{s.visible=es[0].isIntersecting;update()},{threshold:.15}).observe(target);
  return{enable(value){s.enabled=value;if(value){s.time=0;s.render(reduced.matches?s.staticAt/1000:0)}update()},restart(){s.time=0;s.render(reduced.matches?s.staticAt/1000:0);schedule()},get time(){return s.time}};
 }};
 window.addEventListener('veriburada:motion',e=>{paused=e.detail.paused;update()});document.addEventListener('visibilitychange',update);document.addEventListener('veriburada:onboarding-open',update);document.addEventListener('veriburada:onboarding-close',update);reduced.addEventListener('change',update);
})();
