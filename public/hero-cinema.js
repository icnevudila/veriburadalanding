/* Rendered product film, with separate mobile framing. */
(() => {
 const root=document.querySelector('.hero-cinema'),video=root?.querySelector('.hero-film');if(!video)return;
 const mobile=matchMedia('(max-width:760px)'),reduced=matchMedia('(prefers-reduced-motion:reduce)'),toggle=root.querySelector('.hero-film-toggle');
 let visible=false,globalPaused=false,userPaused=false,explicitPlay=false,loaded='';
 const permitted=()=>visible&&!globalPaused&&!userPaused&&!document.hidden&&!document.body.classList.contains('onboarding-open')&&!document.querySelector('.demo-modal')?.open&&((!reduced.matches&&!navigator.connection?.saveData)||explicitPlay);
 function syncButton(){const playing=!video.paused;toggle.setAttribute('aria-label',playing?'Açılış filmini duraklat':'Açılış filmini oynat');toggle.innerHTML=playing?'<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7 5v10M13 5v10"/></svg>':'<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7 5 8 5-8 5Z"/></svg>'}
 function prepare(){const src=mobile.matches?video.dataset.mobile:video.dataset.desktop;if(src!==loaded){loaded=src;video.src=src;video.load();root.classList.remove('hero-film-ready')}}
 function update(){if(permitted()){prepare();video.play().catch(()=>syncButton())}else video.pause();syncButton()}
 video.muted=true;video.loop=true;video.addEventListener('playing',()=>{root.classList.add('hero-film-ready');syncButton()});video.addEventListener('pause',syncButton);
 toggle.addEventListener('click',()=>{if(video.paused){userPaused=false;explicitPlay=true}else userPaused=true;update()});
 root.querySelector('.hero-film-expand').addEventListener('click',()=>document.querySelector('#demo-play').click());
 new IntersectionObserver(es=>{visible=es[0].isIntersecting;update()},{threshold:.15}).observe(root);
 window.addEventListener('veriburada:motion',e=>{globalPaused=e.detail.paused;update()});
 document.addEventListener('visibilitychange',update);document.addEventListener('veriburada:onboarding-close',update);document.addEventListener('veriburada:onboarding-open',update);
 new MutationObserver(update).observe(document.querySelector('.demo-modal'),{attributes:true,attributeFilter:['open']});
 mobile.addEventListener('change',()=>{prepare();update()});reduced.addEventListener('change',()=>{explicitPlay=false;update()});syncButton();
})();
