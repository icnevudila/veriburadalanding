/* Repeating product choreography. Visibility/reduced-motion/global pause aware. */
(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),cards=[...document.querySelectorAll('.feature-card:not(#audience-content)')],states=new Map();
 const E=[{opacity:0,transform:'translateY(14px)'},{opacity:1,transform:'translateY(0)'}];let paused=false;
 function stop(card){const s=states.get(card);s.animations.forEach(a=>a.cancel());s.timers.forEach(clearTimeout);s.animations=[];s.timers=[];const count=card.querySelector('.collector-count');if(count){count.textContent='3';card.querySelector('.collector-state').textContent='Liste hazır';card.querySelector('.collector-live').lastChild.textContent=' Tamamlandı'}}
 function run(card){const s=states.get(card);stop(card);if(!s.visible||paused||reduced.matches||document.hidden)return;
  const a=(el,frames,delay=0,duration=650,fill='backwards')=>{if(el)s.animations.push(el.animate(frames,{delay,duration,easing:'cubic-bezier(.22,1,.36,1)',fill}))};
  const later=(fn,t)=>s.timers.push(setTimeout(fn,t));
  if(card.classList.contains('list-card')){
    card.querySelectorAll('.data-row').forEach((row,i)=>{a(row,E,250+i*480);a(row.querySelector('em'),[{opacity:0,transform:'scale(.7)'},{opacity:1,transform:'scale(1)'}],650+i*480,400)});
  }else if(card.classList.contains('auto-card')){
    const count=card.querySelector('.collector-count'),state=card.querySelector('.collector-state');count.textContent='0';state.textContent='Bilgiler alınıyor';
    card.querySelector('.collector-live').lastChild.textContent=' Toplanıyor';
    a(card.querySelector('.collector-query'),[{background:'#eaf7f1'},{background:'#f8faf8'}],0,1000);
    a(card.querySelector('.collector-progress>div>i'),[{width:'0%'},{width:'100%'}],400,2600,'both');
    card.querySelectorAll('.collector-result').forEach((row,i)=>{a(row,[{opacity:.12,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],500+i*700,700);a(row.querySelector('em'),[{opacity:0,transform:'scale(.4)'},{opacity:1,transform:'scale(1)'}],1000+i*700,400);later(()=>count.textContent=String(i+1),1100+i*700)});
    a(card.querySelector('.collector-bottom'),E,2800,600);later(()=>{state.textContent='Liste hazır';card.querySelector('.collector-live').lastChild.textContent=' Tamamlandı'},2800);
  }else{
    a(card.querySelector('.contact-profile'),E,0,700);card.querySelectorAll('.contact-profile>div').forEach((el,i)=>{a(el,[{opacity:.15,transform:'translateX(-12px)'},{opacity:1,transform:'translateX(0)'}],250+i*420);a(el.querySelector('span'),[{opacity:0},{opacity:1}],600+i*420,350)});
  }
  later(()=>run(card),7400);
 }
 cards.forEach(card=>states.set(card,{visible:false,animations:[],timers:[]}));
 const io=new IntersectionObserver(entries=>entries.forEach(e=>{states.get(e.target).visible=e.isIntersecting;if(e.isIntersecting)run(e.target);else stop(e.target)}),{threshold:.25});cards.forEach(c=>io.observe(c));
 document.querySelectorAll('.motion-replay').forEach(b=>b.remove());
 reduced.addEventListener('change',()=>cards.forEach(c=>reduced.matches?stop(c):run(c)));
 window.addEventListener('veriburada:motion',e=>{paused=e.detail.paused;cards.forEach(c=>paused?stop(c):run(c))});
 document.addEventListener('visibilitychange',()=>cards.forEach(c=>document.hidden?stop(c):run(c)));
})();
