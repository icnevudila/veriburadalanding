/* Credit package selection logic */
(()=>{
  const buttons=[...document.querySelectorAll('[data-credits]')];
  if(!buttons.length)return;
  const plans={
    '100':{tier:'Başlangıç',credits:'100 kredi',total:'200 TL',unit:'2,00 TL / kredi',desc:'Küçük ölçekli ve ilk deneme araştırmaları için uygun başlangıç.'},
    '1000':{tier:'Popüler',credits:'1.000 kredi',total:'1.200 TL',unit:'1,20 TL / kredi',desc:'Düzenli müşteri ve satış araştırmaları için en çok tercih edilen paket.'},
    '5000':{tier:'Profesyonel',credits:'5.000 kredi',total:'5.000 TL',unit:'1,00 TL / kredi',desc:'Büyüyen ekipler ve ajanslar için geniş kapsamlı veri paketi.'},
    '10000':{tier:'Kurumsal',credits:'10.000 kredi',total:'8.000 TL',unit:'0,80 TL / kredi',desc:'Yüksek hacimli ve sürekli veri toplayan kurumsal ekipler için.'}
  };
  function choose(button){
    const key=button.dataset.credits;
    const plan=plans[key];
    if(!plan)return;
    buttons.forEach(b=>{const active=(b===button);b.setAttribute('aria-checked',String(active));b.tabIndex=active?0:-1});
    const tierEl=document.querySelector('[data-plan-tier]');if(tierEl)tierEl.textContent=plan.tier;
    const creditsEl=document.querySelector('[data-plan-credits]');if(creditsEl)creditsEl.textContent=plan.credits;
    const totalEl=document.querySelector('[data-plan-total]');if(totalEl)totalEl.textContent=plan.total;
    const unitEl=document.querySelector('[data-plan-unit]');if(unitEl)unitEl.textContent=plan.unit;
    const descEl=document.querySelector('[data-plan-desc]');if(descEl)descEl.textContent=plan.desc;
    const linkEl=document.querySelector('[data-plan-link]');if(linkEl)linkEl.href='/pricing/?paket='+key;
  }
  buttons.forEach((b,i)=>{
    b.addEventListener('click',()=>choose(b));
    b.addEventListener('keydown',e=>{
      let next=null;
      if(e.key==='ArrowRight'||e.key==='ArrowDown')next=buttons[(i+1)%buttons.length];
      if(e.key==='ArrowLeft'||e.key==='ArrowUp')next=buttons[(i-1+buttons.length)%buttons.length];
      if(next){e.preventDefault();next.focus();choose(next)}
    });
  });
})();
