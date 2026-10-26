/* Final landing behavior: transparent duration choices and synchronized sample. */
(() => {
 const choices=[...document.querySelectorAll('[data-plan-choice]')];
 const cards=[...document.querySelectorAll('[data-plan]')];
 choices.forEach(button=>button.addEventListener('click',()=>{
   choices.forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
   cards.forEach(card=>card.classList.toggle('selected-plan',card.dataset.plan===button.dataset.planChoice));
   const selected=cards.find(card=>card.dataset.plan===button.dataset.planChoice);
   if(!matchMedia('(prefers-reduced-motion:reduce)').matches)selected.animate([{opacity:.4,transform:'translateY(9px)'},{opacity:1,transform:'translateY(0)'}],{duration:350,easing:'cubic-bezier(.22,1,.36,1)'});
 }));
 function syncSample(){
   const records=[...document.querySelectorAll('.panel-record')];
   const rows=[...document.querySelectorAll('.output-window tbody tr')];
   records.forEach((record,i)=>{
     const name=record.querySelector(':scope>div>strong').textContent;
     const type=record.querySelector(':scope>div>small').textContent.split('·')[0].trim();
     rows[i].querySelector('th').replaceChildren();
     const avatar=document.createElement('i');avatar.className='output-avatar';avatar.textContent=name[0];
     rows[i].querySelector('th').append(avatar,document.createTextNode(name));
     rows[i].querySelector('td').textContent=type;
   });
   document.querySelector('.output-toolbar small').textContent=document.querySelector('.panel-title small').textContent.replace(' · ',' / ');
 }
 document.querySelector('#demo-sector-select').addEventListener('change',()=>requestAnimationFrame(syncSample));
 document.querySelector('.map-search-button').addEventListener('click',()=>requestAnimationFrame(syncSample));
 syncSample();
})();
