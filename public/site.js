/* Veriburada landing — static composition, progressive interaction. */
(() => {
  'use strict';
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const icon = (kind) => `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${{
    play: '<path d="m9 5 11 7-11 7V5Z"/>',
    pause: '<path d="M8 5v14M16 5v14"/>',
    building: '<path d="M4 21V5l8-3v19M12 8h8v13M2 21h20M7 7h2M7 11h2M7 15h2M15 12h2M15 16h2"/>',
    phone: '<path d="M6 3h4l2 5-3 2a15 15 0 0 0 5 5l2-3 5 2v4c0 2-2 3-4 3A18 18 0 0 1 3 7c0-2 1-4 3-4Z"/>',
    globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
    pin: '<path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    check: '<path d="m5 12 4 4L19 6"/>'
  }[kind] || ''}</svg>`;

  document.documentElement.classList.add('js-ready');
  const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      reveal.unobserve(entry.target);
    }
  }), { threshold: .07 });
  $$('.reveal').forEach(element => reveal.observe(element));
  const mapArtObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('map-art-ready'); mapArtObserver.unobserve(entry.target); }
  }), { rootMargin: '250px' });
  $$('.geo-map,.target-map,.local-map-art').forEach(element => mapArtObserver.observe(element));


  const audiences = {
    sales: ['Görüşeceğiniz işletmeleri belirleyin.', 'Seçtiğiniz bölgedeki işletmeleri iletişim bilgileriyle listeleyin.'],
    agency: ['Tekliften önce işletmeyi tanıyın.', 'Web sitesi ve iletişim bilgilerini inceleyerek teklifinizi hazırlayın.'],
    local: ['Yakınınızdaki işletmeleri keşfedin.', 'Çevrenizdeki işletmeleri konum ve iletişim bilgileriyle keşfedin.']
  };
  const tabs = $$('[data-audience]');
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      tabs.forEach(other => {
        other.setAttribute('aria-selected', String(other === tab));
        other.tabIndex = other === tab ? 0 : -1;
      });
      $('#audience-content').setAttribute('aria-labelledby', tab.id);
      $('#audience-title').innerHTML = audiences[tab.dataset.audience][0];
      $('#audience-copy').textContent = audiences[tab.dataset.audience][1];
      $('#audience-content').dataset.audienceScene = tab.dataset.audience;
      $$('[data-audience-view]').forEach(view => { view.hidden = view.dataset.audienceView !== tab.dataset.audience; });
      window.dispatchEvent(new CustomEvent('veriburada:audience', { detail: { audience: tab.dataset.audience } }));
    });
    tab.addEventListener('keydown', e => {
      let next = null;
      if (e.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (e.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = tabs.length - 1;
      if (next !== null) { e.preventDefault(); tabs[next].focus(); tabs[next].click(); }
    });
  });

  const stepHeadings = ['Çalışma alanınızı<br>açın.', 'Bölgeyi ve işletme<br>türünü seçin.', 'İşletme listenizi<br>indirin.'];
  const steps = $$('.step');
  steps.forEach((step, index) => step.addEventListener('click', () => {
    steps.forEach(other => {
      other.classList.toggle('active', other === step);
      other.setAttribute('aria-pressed', String(other === step));
    });
    $('#step-heading').innerHTML = stepHeadings[index];
    $$('[data-workflow-scene]').forEach((scene, i) => { scene.hidden = i !== index; });
    $$('.workflow-scene-footer i').forEach((dot, i) => dot.classList.toggle('active', i === index));
    $('.demo-screen').dataset.activeStep = index;
  }));
  $$('.faq-list details').forEach(detail => detail.addEventListener('toggle', () => {
    if (detail.open) $$('.faq-list details').forEach(other => { if (other !== detail) other.open = false; });
  }));

  $$('[data-demo-download]').forEach(button=>button.addEventListener('click',()=>{
 const table=$('.output-window table');if(!table)return;
 const lines=$$('tr',table).map(row=>$$('th,td',row).map(cell=>'"'+cell.textContent.trim().replaceAll('"','""')+'"').join(';'));
 const blob=new Blob(['\ufeff'+lines.join('\r\n')],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');
 a.href=url;a.download='veriburada-ornek-liste.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
 }));
 const year=$('#year');if(year)year.textContent=new Date().getFullYear();
})();
