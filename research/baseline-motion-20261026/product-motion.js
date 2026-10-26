/* Short, finite product demonstrations. Static final state is the baseline. */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const cards = [...document.querySelectorAll('.feature-card')];
  const active = new Map();
  const enter = [{opacity:0,transform:'translateY(18px) scale(.98)'},{opacity:1,transform:'translateY(0) scale(1)'}];
  function run(card) {
    stop(card);
    if (reduced.matches || navigator.connection?.saveData) return;
    const animations = [];
    const animate = (el, frames, delay, duration=650) => {
      if(el) animations.push(el.animate(frames,{duration,delay,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'}));
    };
    if(card.classList.contains('list-card')) {
      animate(card.querySelector('.list-preview'),enter,0,800);
      card.querySelectorAll('.data-row').forEach((row,i)=>{
        animate(row,enter,400+i*620,700);
        animate(row.querySelector('em'),[{opacity:0,transform:'scale(.75)'},{opacity:1,transform:'scale(1)'}],900+i*620,450);
      });
      animate(card.querySelector('.list-toolbar>span'),[{opacity:.4},{opacity:1}],2300,600);
    } else if(card.classList.contains('auto-card')) {
      card.querySelectorAll('.automation-node').forEach((el,i)=>animate(el,[{opacity:0,transform:'scale(.85)'},{opacity:1,transform:'scale(1)'}],i*450,650));
      card.querySelectorAll('.automation-event').forEach((el,i)=>animate(el,enter,700+i*850));
      card.querySelectorAll('.automation-connection').forEach((el,i)=>animate(el,[{opacity:0,clipPath:'inset(0 100% 0 0)'},{opacity:1,clipPath:'inset(0)'}],300+i*200,1000));
    } else if(card.classList.contains('details-card')) {
      animate(card.querySelector('.contact-profile'),enter,0,850);
      card.querySelectorAll('.contact-profile>div').forEach((el,i)=>{
        animate(el,[{opacity:0,transform:'translateX(-12px)'},{opacity:1,transform:'translateX(0)'}],350+i*450,600);
        animate(el.querySelector('span'),[{opacity:0,transform:'scale(.5)'},{opacity:1,transform:'scale(1)'}],700+i*450,450);
      });
    } else {
      animate(card.querySelector('.export-document'),[{opacity:0,transform:'translateY(24px) rotate(-3deg)'},{opacity:1,transform:'translateY(0) rotate(0deg)'}],0,950);
      card.querySelectorAll('.document-table>div').forEach((el,i)=>animate(el,[{opacity:0,clipPath:'inset(0 100% 0 0)'},{opacity:1,clipPath:'inset(0)'}],300+i*260,700));
      animate(card.querySelector('.export-document-status'),enter,1700,550);
      animate(card.querySelector('.export-floating-icon'),[{opacity:0,transform:'translateY(-20px) scale(.8)'},{opacity:1,transform:'translateY(0) scale(1)'}],2100,600);
    }
    active.set(card,animations);
  }
  function stop(card) { (active.get(card)||[]).forEach(a=>a.cancel());active.delete(card); }
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(e.isIntersecting) {if(!e.target.dataset.motionSeen){e.target.dataset.motionSeen='true';run(e.target)}}
    else stop(e.target);
  }),{threshold:.4});
  cards.forEach(card=>{
    const button=document.createElement('button');button.type='button';button.className='motion-replay';
    button.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 10a8 8 0 1 1 1 7M4 4v6h6"/></svg><span>Tekrar izle</span>';
    button.setAttribute('aria-label',card.querySelector('h3').textContent.replace(/\s+/g,' ').trim()+' — animasyonu tekrar izle');
    button.addEventListener('click',()=>run(card));card.append(button);observer.observe(card);
  });
  reduced.addEventListener('change',()=>cards.forEach(stop));
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cards.forEach(stop)});
})();
