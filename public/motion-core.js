/* One foreground composition at a time; ambient detail keeps a quieter tempo. */
(() => {
 const scenes=new Set(),external=new Set(),reduced=matchMedia('(prefers-reduced-motion:reduce)');let paused=false,frame=0,last=0,focus=null,scrollFrame=0;
 const clamp=x=>Math.max(0,Math.min(1,x)),ease=x=>1-Math.pow(1-clamp(x),3),smooth=x=>{x=clamp(x);return x*x*(3-2*x)};
 const blocked=()=>paused||reduced.matches||document.hidden||document.body.classList.contains('onboarding-open')||document.body.classList.contains('navigation-open');
 function score(s){const r=s.target.getBoundingClientRect(),h=Math.min(innerHeight,r.bottom)-Math.max(0,r.top),w=Math.min(innerWidth,r.right)-Math.max(0,r.left);return h>0&&w>0?(h*w/Math.max(1,r.width*r.height))/(1+Math.abs((Math.max(0,r.top)+Math.min(innerHeight,r.bottom))/2-innerHeight/2)/innerHeight):-1}
 function active(s){return !blocked()&&s.visible&&s.enabled&&(s.ambient||focus===s)}
 function schedule(){if(!frame&&[...scenes].some(active)){last=performance.now();frame=requestAnimationFrame(tick)}}
 function tick(now){frame=0;if(blocked()){update();return}const dt=Math.min(80,now-last);if(dt<30){frame=requestAnimationFrame(tick);return}last=now;for(const s of scenes)if(active(s)){
  if(s.ambient)s.time=(s.time+dt*.65)%s.duration;
  else if(s.time>=s.staticAt){s.hold+=dt;if(s.hold>=2800){s.time=0;s.hold=0}}
  else s.time=Math.min(s.staticAt,s.time+dt*2);
  s.render(s.time/1000);s.root.dataset.motionTime=(s.time/1000).toFixed(2);
 }schedule()}
 function update(){const candidates=[...scenes].filter(s=>!s.ambient&&s.visible&&s.enabled).concat([...external].filter(s=>s.enabled));let next=null,best=-1;for(const s of candidates){const value=score(s);if(value>best){best=value;next=s}}focus=blocked()?null:next;
  for(const s of scenes){s.root.classList.toggle('studio-running',active(s));if(reduced.matches)s.render(s.staticAt/1000)}
  for(const s of external){const on=s===focus;if(on!==s.running){s.running=on;s.onchange(on)}}
  if(![...scenes].some(active)){cancelAnimationFrame(frame);frame=0}else schedule();
 }
 window.VBMotion={clamp,ease,smooth,registerPlayer(root,onchange){const s={target:root,enabled:false,running:false,onchange};external.add(s);return{enable(value){s.enabled=value;update()}}},sample(root,seconds){const s=[...scenes].find(s=>s.root===root);if(!s)return false;s.enabled=false;s.time=seconds*1000;s.render(seconds);s.root.dataset.motionTime=seconds.toFixed(2);update();return true},create(root,{duration,render,staticAt=duration-2000,target=root,enabled=true,ambient=false}){
  const s={root,target,duration,render,staticAt,enabled,ambient,visible:false,time:0,hold:0};scenes.add(s);render(reduced.matches?staticAt/1000:0);
  new IntersectionObserver(es=>{s.visible=es[0].isIntersecting;update()},{threshold:.15}).observe(target);
  return{enable(value){s.enabled=value;if(value){s.time=0;s.hold=0;s.render(reduced.matches?s.staticAt/1000:0)}update()},restart(){s.time=0;s.hold=0;s.render(reduced.matches?s.staticAt/1000:0);schedule()},get time(){return s.time}};
 }};
 function queueUpdate(){if(!scrollFrame)scrollFrame=requestAnimationFrame(()=>{scrollFrame=0;update()})}
 addEventListener('scroll',queueUpdate,{passive:true});addEventListener('resize',queueUpdate);
 new MutationObserver(update).observe(document.body,{attributes:true,attributeFilter:['class']});
 window.addEventListener('veriburada:motion',e=>{paused=e.detail.paused;update()});document.addEventListener('visibilitychange',update);document.addEventListener('veriburada:onboarding-open',update);document.addEventListener('veriburada:onboarding-close',update);reduced.addEventListener('change',update);
})();
