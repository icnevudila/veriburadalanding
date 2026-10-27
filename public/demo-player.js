/* Shared responsive player for the hero, product walkthrough and expanded view. */
(() => {
 const reduced=matchMedia('(prefers-reduced-motion:reduce)'),mobile=matchMedia('(max-width:760px)');
 let globalPaused=false;
 class DemoPlayer {
  constructor(shell){this.shell=shell;this.frame=shell.querySelector('iframe');this.kind=shell.dataset.motion;this.ready=false;this.playing=false;this.wanted=false;this.time=0;this.duration=26;this.episode=0;this.visible=false;this.userPaused=false;this.explicit=false;this.url='';this.onchange=()=>{};}
  load(){
   const portrait=this.kind!=='hero'&&mobile.matches;
   const params=new URLSearchParams();if(mobile.matches)params.set('mobile','');if(portrait)params.set('portrait','');if(this.kind==='story')params.set('story','');const src='map-demo.html'+(params.size?'?'+params:'');
   if(this.url===src)return;
   this.url=src;
   this.ready=false;
   this.shell.classList.remove('motion-ready');
   this.frame.src=src;
   this.frame.onload=()=>this.send('state');
  }
  send(action,extra={}){if(this.frame&&this.frame.contentWindow)this.frame.contentWindow.postMessage({channel:'veriburada-map-control',action,...extra},'*')}
  play(){this.wanted=true;this.load();if(this.ready)this.send('play')}
  pause(){this.wanted=false;this.playing=false;this.send('pause');this.onchange()}
  next(){this.load();this.send('next');this.play(true)}
  seek(time){this.load();this.send('seek',{time});this.play(true)}
  receive(d){const wasReady=this.ready;this.ready=d.ready;this.playing=d.playing;this.time=d.time;this.duration=d.duration;this.episode=d.episode;if(d.ready){this.shell.classList.add('motion-ready');if(!wasReady&&this.wanted)this.send('play')}this.shell.dataset.sector=d.sector;this.onchange()}
 }
 const players=[...document.querySelectorAll('[data-motion]')].map(s=>new DemoPlayer(s));

 players.forEach(p=>{p.focus=window.VBMotion?.registerPlayer(p.shell,on=>{if(on)p.play();else p.pause()})});
 const canAuto=p=>p.visible&&!globalPaused&&!document.hidden&&!document.body.classList.contains('onboarding-open')&&!reduced.matches;
 function update(){for(const p of players){if(p.focus)p.focus.enable(canAuto(p));else if(canAuto(p))p.play();else p.pause()}}
 addEventListener('message',e=>{if(e.data?.channel!=='veriburada-map')return;const player=players.find(p=>p.frame.contentWindow===e.source);if(player)player.receive(e.data)});
 const io=new IntersectionObserver(es=>{es.forEach(e=>{const p=players.find(p=>p.shell===e.target);if(p)p.visible=e.isIntersecting});update()},{threshold:[0, 0.1, 0.2]});players.forEach(p=>io.observe(p.shell));
 window.addEventListener('veriburada:motion',e=>{globalPaused=e.detail.paused;update()});document.addEventListener('visibilitychange',update);document.addEventListener('veriburada:onboarding-open',update);document.addEventListener('veriburada:onboarding-close',update);
 reduced.addEventListener('change',update);mobile.addEventListener('change',()=>{players.filter(p=>p.url).forEach(p=>p.load());update()});

})();

(() => {
 const v=document.querySelector('.brand-reveal');if(!v)return;const reduced=matchMedia('(prefers-reduced-motion:reduce)');let visible=false,paused=false;
 function update(){if(visible&&!paused&&!reduced.matches&&!document.hidden){if(!v.src){v.src=v.dataset.src;v.load()}v.muted=true;v.play().catch(()=>{})}else v.pause()}
 new IntersectionObserver(es=>{visible=es[0].isIntersecting;update()},{threshold:.2}).observe(v);window.addEventListener('veriburada:motion',e=>{paused=e.detail.paused;update()});document.addEventListener('visibilitychange',update);reduced.addEventListener('change',update);
})();
