/* One synchronized SVG narrative. No animation or external library dependency. */
(() => {
 const root=document.querySelector('.connection-section');if(!root)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),phone=matchMedia('(max-width:1000px)');
 const controls=root.querySelector('.connection-controls'),toggle=root.querySelector('.connection-toggle');
 const duration=9000;let time=0,last=0,raf=0,visible=false,started=false,paused=false;
 const scenes=[...root.querySelectorAll('.flow-scene')];
 const clamp=x=>Math.max(0,Math.min(1,x)),ease=x=>1-Math.pow(1-clamp(x),3);
 const data=scenes.map(svg=>({svg,inputs:[...svg.querySelectorAll('.flow-input')],outputs:[...svg.querySelectorAll('.flow-output')],rows:[...svg.querySelectorAll('.flow-result-row')],paths:[...svg.querySelectorAll('.flow-trace')].map(path=>({path,length:path.getTotalLength(),packet:svg.querySelector(`.flow-packet[data-route="${path.dataset.route}"]`)})),halo:svg.querySelector('.flow-halo'),hub:svg.querySelector('.flow-hub'),success:svg.querySelector('.flow-success')}));
 function state(s){root.dataset.state=s;toggle.textContent=s==='paused'?'Devam et':'Duraklat';toggle.setAttribute('aria-label',s==='paused'?'Bağlantı animasyonuna devam et':'Bağlantı animasyonunu duraklat')}
 function draw(ms){const t=ms/1000;data.forEach(d=>{
   const mobile=d.svg.classList.contains('flow-phone');
   d.inputs.forEach((n,i)=>{const a=ease((t-.15-i*.22)/.65);n.style.opacity=.25+.75*a;n.style.transform=`translate${mobile?'Y':'X'}(${(1-a)*-18}px)`});
   d.outputs.forEach((n,i)=>{const a=ease((t-4.4-i*1.1)/.9);n.style.opacity=.12+.88*a;n.style.transform=`translate${mobile?'Y':'X'}(${(1-a)*18}px)`});
   d.paths.forEach(({path,length,packet},i)=>{
     const delay=i<3?1.1+i*.55:i===3?4.1:mobile?6.3:5.2;
     const a=clamp((t-delay)/1.25);path.style.strokeDasharray='1';path.style.strokeDashoffset=1-a;path.style.opacity=.65;
     const p=clamp((t-delay-.15)/1.35),point=path.getPointAtLength(p*length);
     packet.setAttribute('cx',point.x);packet.setAttribute('cy',point.y);packet.style.opacity=p>0&&p<1?'1':'0';
   });
   const pulse=clamp((t-3)/1.6);d.halo.style.opacity=Math.sin(pulse*Math.PI)*.35;d.halo.style.transformBox='fill-box';d.halo.style.transformOrigin='center';d.halo.style.transform=`scale(${.83+pulse*.35})`;
   const k=1+Math.sin(pulse*Math.PI)*.025;d.hub.style.transform=`scale(${k})`;
   d.rows.forEach((n,i)=>{const a=ease((t-4.8-i*.4)/.6);n.style.opacity=.15+.85*a;n.style.transform=`translateY(${(1-a)*8}px)`});
   d.success.style.opacity=ease((t-7.2)/.8);
 });}
 function frame(now){if(!visible||paused||document.hidden)return;time=(time+now-last)%(duration+1200);last=now;draw(Math.min(time,duration));raf=requestAnimationFrame(frame)}
 function start(){cancelAnimationFrame(raf);if(reduced.matches||navigator.connection?.saveData){draw(duration);state('static');return}if(time>=duration)time=0;paused=false;state('playing');last=performance.now();raf=requestAnimationFrame(frame)}
 function suspend(){cancelAnimationFrame(raf);raf=0}
 controls.hidden=true;draw(duration);state('idle');
 toggle.addEventListener('click',()=>{paused=!paused;if(paused){suspend();state('paused')}else start()});

 new IntersectionObserver(entries=>entries.forEach(e=>{visible=e.isIntersecting;if(visible){if(!started){started=true;time=0;start()}else if(!paused)start()}else suspend()}),{threshold:.28}).observe(root.querySelector('.connection-stage'));
 window.addEventListener('veriburada:motion',e=>{paused=e.detail.paused;if(paused){suspend();state('paused')}else if(visible)start()});
 reduced.addEventListener('change',()=>{suspend();if(reduced.matches){time=duration;draw(duration);state('static')}else{time=0;if(visible&&!paused)start();else{draw(duration);state('idle')}}});
 phone.addEventListener('change',()=>draw(time));
 document.addEventListener('visibilitychange',()=>{if(document.hidden)suspend();else if(visible&&!paused)start()});
})();
