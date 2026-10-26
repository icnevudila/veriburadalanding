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
  const header = $('.header');
  const menu = $('.menu-toggle');
  function closeMenu() {
    header.classList.remove('menu-open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Menüyü aç');
  }
  menu.addEventListener('click', () => {
    const open = header.classList.toggle('menu-open');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
  });
  $$('.header nav a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  document.addEventListener('click', e => { if (!header.contains(e.target)) closeMenu(); });
  addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 20), { passive: true });
  header.classList.toggle('scrolled', scrollY > 20);

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
    sales: ['Satış ekibiniz için<br>işletme listeleri.', 'Seçtiğiniz bölgedeki işletmeleri telefon, adres ve web bilgileriyle listeleyin.'],
    agency: ['Hangi işletmeye<br>ne sunacağınızı görün.', 'Hedef sektörünüzü seçin. İşletmelerin web sitesi ve iletişim alanlarını inceleyip araştırmanızı buna göre daraltın.'],
    local: ['Çevrenizdeki işletmeleri<br>haritada keşfedin.', 'İş birliği yapabileceğiniz işletmeleri yakın çevrenizde bulun. Konum ve iletişim bilgilerini birlikte inceleyin.']
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

  const stepHeadings = ['Veri Burada eklentisini<br>kurun.', 'Bölgeyi ve işletme<br>türünü seçin.', 'İşletme listenizi<br>indirin.'];
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

  // All business names below are illustrative. No contact information is invented.
  const sectors = {
    architecture: { label: 'Mimarlık ofisleri', type: 'Mimarlık ofisi', names: ['Atölye Mimarlık', 'Form Tasarım', 'Studio Mimarlık'] },
    cafe: { label: 'Kafeler', type: 'Kafe', names: ['Köşe Kahve', 'Mahalle Atölyesi', 'Gün Işığı Kafe'] },
    clinic: { label: 'Diş klinikleri', type: 'Diş kliniği', names: ['Gülüş Diş Kliniği', 'Merkez Ağız ve Diş', 'İnci Diş Kliniği'] }
  };
  const positions = [[41.0330, 28.9798], [41.0300, 28.9815], [41.0321, 28.9850]];
  let sector = 'architecture';
  let timers = [];
  let markers = [];
  let map = null;
  let baseZoom = 15;
  const records = $$('.panel-record');
  const sectorSelect = $('#demo-sector-select');
  sectorSelect.disabled = false;
  const status = $('#demo-status');
  function highlightRecord(index) {
    records.forEach((record, i) => record.classList.toggle('record-focused', i === index));
    markers.forEach((marker, i) => marker.getElement()?.querySelector('.business-marker').classList.toggle('selected-marker', i === index));
  }
  function renderRecords() {
    const data = sectors[sector];
    $('.panel-title small').textContent = `Beyoğlu · ${data.label}`;
    records.forEach((record, i) => {
      $('.business-monogram', record).textContent = data.names[i][0];
      record.querySelector(':scope>div>strong').textContent = data.names[i];
      const small = record.querySelector(':scope>div>small');
      small.textContent = `${data.type} · Örnek işletme`;
      const fields = $('.record-fields', record);
      fields.innerHTML = `<span>${icon('phone')} Telefon alanı</span><span>${icon('globe')} Web alanı</span><span>${icon('pin')} Beyoğlu</span>`;
      const markerElement = markers[i]?.getElement();
      if (markerElement) {
        markerElement.removeAttribute('aria-label');
        markerElement.setAttribute('aria-hidden', 'true');
        markerElement.title = `${data.names[i]} · Temsili kayıt`;
      }
    });
    $('#workflow-sector').firstChild.textContent = data.label + ' ';
    $('#workflow-records').innerHTML = data.names.map(name => `<div><strong>${name}</strong><span>Beyoğlu</span><i>✓</i></div>`).join('');
  }
  function runDiscovery(announce = true) {
    timers.forEach(clearTimeout); timers = [];
    renderRecords();
    $('.discovery-panel').classList.remove('discovery-finished');
    records.forEach(record => record.classList.remove('record-entered', 'record-focused'));
    $('#business-count').textContent = motion.matches ? '3' : '0';
    const revealRecord = i => {
      records[i].classList.add('record-entered');
      $('#business-count').textContent = i + 1;
      highlightRecord(i);
      if (i === 2) {
        $('.discovery-panel').classList.add('discovery-finished');
        if (announce) status.textContent = `${sectors[sector].label} için üç temsili örnek kayıt gösteriliyor.`;
      }
    };
    records.forEach((record, i) => {
      if (motion.matches) revealRecord(i);
      else timers.push(setTimeout(() => revealRecord(i), 350 + i * 650));
    });
  }
  records.forEach((record, index) => record.addEventListener('mouseenter', () => highlightRecord(index)));
  sectorSelect.addEventListener('change', () => { sector = sectorSelect.value; runDiscovery(); });
  $('.map-search-button').addEventListener('click', runDiscovery);
  $('#download-demo').addEventListener('click', () => {
    const data = sectors[sector];
    const rows = [['İşletme adı', 'Sektör', 'İl', 'İlçe', 'Telefon', 'Web sitesi', 'Not'], ...data.names.map(name => [name, data.type, 'İstanbul', 'Beyoğlu', '', '', 'Temsili kayıt; gerçek müşteri veya iletişim bilgisi değildir.'])];
    const csv = '\uFEFF' + rows.map(row => row.map(value => `"${value.replaceAll('"', '""')}"`).join(';')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a'); a.href = url; a.download = 'veriburada-temsili-ornek.csv'; a.hidden = true;
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
    status.textContent = 'Temsili örnek CSV dosyanız indirildi.';
  });
  $$('[data-demo-download]').forEach(button => button.addEventListener('click', () => $('#download-demo').click()));
  function initializeMap() {
    if (map || !window.L) return;
    map = L.map('discovery-map', { zoomControl: false, scrollWheelZoom: false, dragging: false, touchZoom: false, doubleClickZoom: false, boxZoom: false, keyboard: false, attributionControl: true, zoomSnap: .25, zoomAnimation: !motion.matches });
    map.attributionControl.setPosition('bottomleft');
    const bounds = [[41.025, 28.975], [41.04, 28.995]];
    L.imageOverlay('istanbul-map-display-v4.webp', bounds, { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> · Harita çizimi: Veriburada' }).addTo(map);
    map.attributionControl.setPrefix(false);
    function fitMap() {
      if (!$('.hero-visual').clientWidth || !$('#discovery-map').clientHeight) return;
      map.invalidateSize();
      baseZoom = map.getBoundsZoom(bounds, true);
      map.setMinZoom(baseZoom); map.setMaxZoom(baseZoom + 1);
      map.setView([41.0325, 28.985], baseZoom, { animate: false });
      updateZoomButtons();
    }
    markers = positions.map((pos, i) => L.marker(pos, {
      title: sectors[sector].names[i], keyboard: false, interactive: false,
      icon: L.divIcon({ className: 'business-marker-wrap', html: `<div class="business-marker" style="--pin-order:${i}">${icon('building')}<span></span></div>`, iconSize: [36, 44], iconAnchor: [18, 44] })
    }).addTo(map).on('click', () => highlightRecord(i)));
    function updateZoomButtons() {
      const buttons = $$('.geo-zoom button');
      buttons[0].disabled = map.getZoom() >= map.getMaxZoom();
      buttons[1].disabled = map.getZoom() <= map.getMinZoom();
    }
    $('.geo-zoom button:first-child').addEventListener('click', () => map.zoomIn(.5));
    $('.geo-zoom button:last-child').addEventListener('click', () => map.zoomOut(.5));
    map.on('zoomend', updateZoomButtons);
    new ResizeObserver(fitMap).observe($('.hero-visual'));
    fitMap();
    window.veriburadaMap = map;
    renderRecords();
  }
  let mapLoading = null;
  function ensureMap() {
    if (map) return Promise.resolve();
    if (!mapLoading) mapLoading = new Promise((resolve, reject) => {
      if (window.L) { initializeMap(); resolve(); return; }
      const css = document.createElement('link'); css.rel = 'stylesheet'; css.href = 'vendor/leaflet.css'; document.head.append(css);
      const script = document.createElement('script'); script.src = 'vendor/leaflet.js';
      script.onload = () => { initializeMap(); resolve(); };
      script.onerror = () => { script.remove(); mapLoading = null; reject(new Error('Map could not be loaded')); };
      document.head.append(script);
    });
    return mapLoading;
  }
  const mapExample = $('.interactive-example');
  const loadExample = () => { if (mapExample.open) ensureMap().catch(() => { status.textContent = 'Etkileşimli harita yüklenemedi. Örnek listeyi inceleyebilir veya tekrar deneyebilirsiniz.'; }); };
  mapExample.addEventListener('toggle', loadExample);
  loadExample();
  runDiscovery();
  let discoveryInView = false;
  new IntersectionObserver(entries => entries.forEach(entry => { discoveryInView = entry.isIntersecting; }), { threshold: .3 }).observe($('.hero-visual'));
  setInterval(() => {
    if (discoveryInView && !document.hidden && !motion.matches && !document.body.classList.contains('motion-paused') && !$('.hero-visual').contains(document.activeElement)) runDiscovery(false);
  }, 7600);

  motion.addEventListener('change', e => { if (e.matches) runDiscovery(); });
  $('#year').textContent = new Date().getFullYear();
})();

;
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

;
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

;
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

;
(() => {
 const closing=document.querySelector('.closing'),master=document.querySelector('.motion-master'),reduced=matchMedia('(prefers-reduced-motion:reduce)');let paused=false;
 if(closing) new IntersectionObserver(es=>es.forEach(e=>closing.classList.toggle('is-inview',e.isIntersecting&&!document.hidden)),{threshold:.1}).observe(closing);
 document.addEventListener('visibilitychange',()=>{document.body.classList.toggle('motion-backgrounded',document.hidden);if(closing){if(document.hidden)closing.classList.remove('is-inview');else if(closing.getBoundingClientRect().top<innerHeight&&closing.getBoundingClientRect().bottom>0)closing.classList.add('is-inview')}});
 if(master){
  master.addEventListener('click',()=>{
   paused=!paused;document.body.classList.toggle('motion-paused',paused);master.setAttribute('aria-pressed',String(paused));master.textContent=paused?'▶ Animasyonları sürdür':'Ⅱ Animasyonları duraklat';
   document.querySelectorAll('video').forEach(v=>{if(paused)v.pause();else{const r=v.getBoundingClientRect();if(!reduced.matches&&r.width>0&&r.top<innerHeight&&r.bottom>0)v.play().catch(()=>{})}});
   window.dispatchEvent(new CustomEvent('veriburada:motion',{detail:{paused}}));
  });
 }
})();

;
/* Five-step search onboarding. Real API transport, explicit demo mode, no simulated auth. */
(() => {
 'use strict';
 const $=(s,p=document)=>p.querySelector(s),esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 const icon=(name)=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${{arrow:'<path d="M4 12h15m-6-6 6 6-6 6"/>',check:'<path d="m5 12 4 4L19 6"/>',pin:'<path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',building:'<path d="M4 21V5l8-3v19M12 8h8v13M2 21h20M7 7h2M7 11h2M7 15h2M15 12h2M15 16h2"/>',search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>',lock:'<rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15" r="1"/>',team:'<circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 5a3 3 0 0 1 0 6M18 14c2 1 3 2 3 5v2"/>',chart:'<path d="M4 3v18h17M8 16v-4M13 16V8M18 16V5"/>',phone:'<path d="M6 3h4l2 5-3 2a15 15 0 0 0 5 5l2-3 5 2v4c0 2-2 3-4 3A18 18 0 0 1 3 7c0-2 1-4 3-4Z"/>',globe:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',file:'<path d="M14 2H5v20h14V7l-5-5Zm0 0v6h5M8 12h8M8 16h8"/>'}[name]||''}</svg>`;
 const steps=['Kullanım amacı','İşletme türü','Arama bölgesi','Gerekli bilgiler','Arama özeti'];
 const purposes=[['sales','Satış için','Potansiyel müşteri olabilecek işletmeler.','chart'],['agency','Ajans çalışması için','Hizmet sunabileceğiniz işletmeler.','team'],['local','Yerel işletmem için','Yakındaki işletmeler ve iş ortakları.','pin'],['research','Pazar araştırması için','Bir bölgedeki işletmeleri inceleme.','search']];
 const sectors=['Mimarlık ofisleri','Kafeler','Diş klinikleri','Emlak ofisleri','Restoranlar','Güzellik salonları'];
 const fieldOptions=[['phone','Telefon','Paylaşılan işletme telefonları.','phone'],['website','Web sitesi','İşletme profilindeki web adresi.','globe'],['address','Adres','İl, ilçe ve açık adres bilgisi.','pin'],['location','Koordinatlar','Haritadaki enlem ve boylam.','pin'],['rating','Puan','İşletme profilindeki değerlendirme puanı.','chart']];
 const cities='Adana|Adıyaman|Afyonkarahisar|Ağrı|Aksaray|Amasya|Ankara|Antalya|Ardahan|Artvin|Aydın|Balıkesir|Bartın|Batman|Bayburt|Bilecik|Bingöl|Bitlis|Bolu|Burdur|Bursa|Çanakkale|Çankırı|Çorum|Denizli|Diyarbakır|Düzce|Edirne|Elazığ|Erzincan|Erzurum|Eskişehir|Gaziantep|Giresun|Gümüşhane|Hakkâri|Hatay|Iğdır|Isparta|İstanbul|İzmir|Kahramanmaraş|Karabük|Karaman|Kars|Kastamonu|Kayseri|Kırıkkale|Kırklareli|Kırşehir|Kilis|Kocaeli|Konya|Kütahya|Malatya|Manisa|Mardin|Mersin|Muğla|Muş|Nevşehir|Niğde|Ordu|Osmaniye|Rize|Sakarya|Samsun|Siirt|Sinop|Sivas|Şanlıurfa|Şırnak|Tekirdağ|Tokat|Trabzon|Tunceli|Uşak|Van|Yalova|Yozgat|Zonguldak'.split('|');
 const districts={'İstanbul':['Beyoğlu','Beşiktaş','Kadıköy','Şişli','Üsküdar','Ataşehir','Bakırköy','Sarıyer','Fatih','Maltepe'],'Ankara':['Çankaya','Keçiören','Yenimahalle','Mamak','Etimesgut','Sincan'],'İzmir':['Konak','Karşıyaka','Bornova','Buca','Bayraklı','Çiğli'],'Bursa':['Nilüfer','Osmangazi','Yıldırım'],'Antalya':['Muratpaşa','Konyaaltı','Kepez','Alanya'],'Kocaeli':['İzmit','Gebze','Darıca','Gölcük']};
 const defaults={purpose:'sales',sector:'Mimarlık ofisleri',city:'İstanbul',district:'Beyoğlu',fields:['phone','website','address']};let draft={...defaults,fields:[...defaults.fields]},step=0,view='form',result=null,config=null,configError=false,request=null,sequence=0,previousFocus=null,opened=false;
 try{const saved=JSON.parse(sessionStorage.getItem('vb-search-draft')||'null');if(saved&&typeof saved==='object'){for(const k of['purpose','sector','city','district'])if(typeof saved[k]==='string')draft[k]=saved[k].slice(0,100);if(Array.isArray(saved.fields))draft.fields=saved.fields.filter(x=>fieldOptions.some(f=>f[0]===x));if(!purposes.some(p=>p[0]===draft.purpose))draft.purpose='sales';if(!cities.includes(draft.city))draft.city='İstanbul';step=Number.isInteger(saved.step)?Math.max(0,Math.min(4,saved.step)):0;}}catch{}
 const persist=()=>{try{sessionStorage.setItem('vb-search-draft',JSON.stringify({...draft,step}))}catch{}};
 const dialog=document.createElement('dialog');dialog.className='onboarding-dialog';dialog.setAttribute('aria-labelledby','ob-title');
 dialog.innerHTML=`<div class="ob-shell"><aside class="ob-sidebar"><img src="brand-wordmark.webp" alt="Veri Burada" width="640" height="214"><div class="ob-sidebar-title">İlk aramanız</div><p>Bölgeyi ve işletme türünü seçin.<br>İlk 5 sonucu ücretsiz görün.</p><ol class="ob-steps">${steps.map((s,i)=>`<li data-ob-rail="${i}"><span>${i+1}</span><div>${s}</div></li>`).join('')}</ol><div class="ob-side-summary"><span>ARAMANIZ</span><strong></strong><small></small></div><div class="ob-side-note">Hesap veya kart bilgisi istemiyoruz.</div></aside><div class="ob-main"><header class="ob-header"><span class="ob-step-label"></span><button type="button" class="ob-close" aria-label="Ücretsiz aramayı kapat">×</button></header><div class="ob-mode" role="status"></div><div class="ob-content"></div><footer class="ob-footer"><button type="button" class="ob-back">← Geri</button><span class="ob-footer-note"></span><button type="button" class="ob-next">Devam et ${icon('arrow')}</button></footer></div></div>`;
 document.body.append(dialog);const content=$('.ob-content',dialog),next=$('.ob-next',dialog),back=$('.ob-back',dialog),mode=$('.ob-mode',dialog),footer=$('.ob-footer',dialog);
 function modeLabel(){if(configError){mode.className='ob-mode ob-mode-error';mode.innerHTML='Arama bağlantısı yüklenemedi. <button type="button" data-ob-config-retry>Yeniden dene</button>';return}mode.className='ob-mode';mode.textContent=config?.mode==='demo'?'Örnek mod: gerçek arama bağlantısı henüz aktif değil.':config?.mode==='live'?'Ücretsiz önizleme · Arama başına ilk 5 sonuç':'Ücretsiz önizleme · İlk 5 sonuç';mode.hidden=false;}
 async function loadConfig(){configError=false;try{const r=await fetch('/api/onboarding-config',{cache:'no-store'});if(!r.ok)throw Error();const c=await r.json();if(!['demo','live'].includes(c.mode)||c.previewLimit!==5)throw Error();config=c;}catch{config=null;configError=true;}modeLabel();if(view==='form'&&step===4)next.disabled=!config;}
 function heading(title,description){return `<h2 id="ob-title" tabindex="-1">${title}</h2><p class="ob-description">${description}</p><p class="ob-error" id="ob-error" role="alert" hidden></p>`;}
 function render(focus=true){
  dialog.dataset.view=view;$('.ob-step-label',dialog).textContent=view==='results'?'Arama sonuçları':view==='loading'?'Arama yapılıyor':view==='error'?'Arama tamamlanamadı':`Adım ${step+1} / 5 · ${steps[step]}`;
  dialog.querySelectorAll('[data-ob-rail]').forEach((li,i)=>{li.classList.toggle('is-current',view==='form'&&i===step);li.classList.toggle('is-done',view!=='form'||i<step);li.setAttribute('aria-current',view==='form'&&i===step?'step':'false');li.querySelector('span').innerHTML=i<step||view!=='form'?icon('check'):String(i+1)});
  $('.ob-side-summary strong',dialog).textContent=draft.sector||'İşletme türünü seçin';$('.ob-side-summary small',dialog).textContent=[draft.district,draft.city].filter(Boolean).join(', ');
  footer.hidden=false;next.disabled=false;back.disabled=false;back.hidden=step===0&&view==='form';next.hidden=false;back.textContent='← Geri';next.innerHTML=`Devam et ${icon('arrow')}`;$('.ob-footer-note',dialog).textContent='Seçimlerinizi değiştirebilirsiniz.';
  if(view==='form')renderForm();else if(view==='loading')renderLoading();else if(view==='results')renderResults();else renderError();
  modeLabel();content.scrollTop=0;if(focus)$('#ob-title',dialog)?.focus({preventScroll:true});
 }
 function renderForm(){
  if(step===0)content.innerHTML=heading('Ne için işletme arıyorsunuz?','Arama amacınıza uygun seçeneği işaretleyin.')+`<fieldset class="ob-choice-grid"><legend class="sr-only">Kullanım amacı</legend>${purposes.map(([key,title,desc,i])=>`<label class="ob-choice"><input type="radio" name="ob-purpose" value="${key}" ${draft.purpose===key?'checked':''}><span class="ob-choice-icon">${icon(i)}</span><strong>${title}</strong><small>${desc}</small><i class="ob-choice-check">${icon('check')}</i></label>`).join('')}</fieldset><div class="ob-inline-note">${icon('file')}Son adımda 5 işletmeyi kayıt olmadan inceleyebilirsiniz.</div>`;
  if(step===1)content.innerHTML=heading('Hangi işletmeleri arıyorsunuz?','Bir işletme türü seçin veya kendiniz yazın.')+`<fieldset class="ob-sector-grid"><legend class="sr-only">İşletme türü</legend>${sectors.map((name,i)=>`<label><input type="radio" name="ob-sector" value="${esc(name)}" ${draft.sector===name?'checked':''}><span>${icon(i===1||i===4?'pin':'building')}</span><strong>${name}</strong><i>${icon('check')}</i></label>`).join('')}</fieldset><div class="ob-input-group"><label for="ob-sector-input">Başka bir işletme türü</label><input id="ob-sector-input" name="sector" maxlength="100" autocomplete="off" placeholder="Örn. oto servisleri, muhasebe ofisleri" value="${sectors.includes(draft.sector)?'':esc(draft.sector)}" aria-describedby="ob-error"></div><div class="ob-selection">Seçiminiz: <strong id="ob-sector-selection">${esc(draft.sector||'Henüz seçilmedi')}</strong></div>`;
  if(step===2)content.innerHTML=heading('Nerede arama yapalım?','Bir il seçin. Daha dar bir arama için ilçe de ekleyebilirsiniz.')+`<div class="ob-location-card"><span>${icon('pin')}</span><div><strong>Arama bölgesi</strong><small>İlçe yazmazsanız il genelinde arama yapılır.</small></div></div><div class="ob-input-group"><label for="ob-city">İl</label><select id="ob-city" name="city">${cities.map(c=>`<option ${c===draft.city?'selected':''}>${c}</option>`).join('')}</select></div><div class="ob-input-group"><label for="ob-district">İlçe <span>İsteğe bağlı</span></label><input id="ob-district" name="district" list="ob-district-list" autocomplete="off" maxlength="100" placeholder="Tüm ilçeler veya bir ilçe adı" value="${esc(draft.district)}"><datalist id="ob-district-list">${districtOptions()}</datalist><small>Öneriler dışında bir ilçe adı da yazabilirsiniz.</small></div><div class="ob-region-summary">${icon('pin')}<span id="ob-region-text">${esc([draft.district,draft.city].filter(Boolean).join(', '))}</span></div>`;
  if(step===3)content.innerHTML=heading('Hangi bilgiler gerekli?','İşletme adı her zaman listede yer alır. Diğer alanları seçin.')+`<div class="ob-fields"><div class="ob-field-fixed"><span>${icon('building')}</span><div><strong>İşletme adı ve türü</strong><small>Her sonuçta gösterilir.</small></div><i>${icon('check')}</i></div>${fieldOptions.map(([key,title,desc,i])=>`<label><input type="checkbox" name="ob-field" value="${key}" ${draft.fields.includes(key)?'checked':''}><span>${icon(i)}</span><div><strong>${title}</strong><small>${desc}</small></div></label>`).join('')}</div><p class="ob-small-note">Yalnızca işletme profilinde bulunan bilgiler gösterilebilir. Her alan her işletmede dolu olmayabilir.</p>`;
  if(step===4){content.innerHTML=heading('Aramanız hazır mı?','Seçimlerinizi kontrol edin, ardından ücretsiz aramayı başlatın.')+`<dl class="ob-review"><div><dt>Kullanım amacı</dt><dd>${esc(purposes.find(p=>p[0]===draft.purpose)?.[1])}<button type="button" data-ob-edit="0">Değiştir</button></dd></div><div><dt>İşletme türü</dt><dd>${esc(draft.sector)}<button type="button" data-ob-edit="1">Değiştir</button></dd></div><div><dt>Bölge</dt><dd>${esc([draft.district,draft.city].filter(Boolean).join(', '))}<button type="button" data-ob-edit="2">Değiştir</button></dd></div><div><dt>Bilgiler</dt><dd>${esc(['İşletme adı',...fieldOptions.filter(f=>draft.fields.includes(f[0])).map(f=>f[1])].join(', '))}<button type="button" data-ob-edit="3">Değiştir</button></dd></div></dl><div class="ob-free-card"><span>${icon('search')}</span><div><strong>İlk 5 sonucu ücretsiz görün.</strong><p>Aramanızda daha fazla sonuç bulunursa devamını görmek için üyelikle ilerleyebilirsiniz.</p></div><b>ÜCRETSİZ</b></div>`;next.innerHTML=`Ücretsiz ara ${icon('search')}`;next.disabled=!config;$('.ob-footer-note',dialog).textContent='Kart bilgisi gerekmiyor.';}
 }
 const districtOptions=()=> (districts[draft.city]||[]).map(d=>`<option value="${esc(d)}"></option>`).join('');
 function renderLoading(){content.innerHTML=heading(config?.mode==='demo'?'Örnek aramanız hazırlanıyor.':'İşletmeler aranıyor.','Seçtiğiniz bölge ve işletme türü için sonuçlar getiriliyor.')+`<div class="ob-loading"><div class="ob-loading-orbit">${icon('search')}</div><strong>${esc(draft.sector)}</strong><span>${esc([draft.district,draft.city].filter(Boolean).join(', '))}</span><p>İlk 5 kayıt önizlemede gösterilecek.</p></div>`;next.hidden=true;back.textContent='Aramayı iptal et';back.hidden=false;$('.ob-footer-note',dialog).textContent='Bu pencereyi kapatırsanız istek iptal edilir.';}
 function renderError(){content.innerHTML=heading('Arama tamamlanamadı.','Seçimleriniz korunuyor. Yeniden deneyebilir veya aramanızı değiştirebilirsiniz.')+`<div class="ob-request-error" role="alert">${esc(result?.message||'Arama servisine ulaşılamadı.')}</div>`;next.innerHTML=`Yeniden dene ${icon('search')}`;back.textContent='Aramayı düzenle';back.hidden=false;$('.ob-footer-note',dialog).textContent='Sonuç olarak örnek veri gösterilmedi.';}
 function resultFields(r){let html='';if(draft.fields.includes('phone'))html+=`<span>${icon('phone')}<span>${esc(r.phone||'Telefon bilgisi yok')}</span></span>`;if(draft.fields.includes('website')&&r.website&&result?.demo)html+=`<span>${icon('globe')}<span>${esc(new URL(r.website).hostname)} (örnek)</span></span>`;else if(draft.fields.includes('website'))html+=r.website?`<a href="${esc(r.website)}" target="_blank" rel="noopener noreferrer">${icon('globe')}<span>${esc(new URL(r.website).hostname)}</span> ↗</a>`:`<span>${icon('globe')}Web sitesi bilgisi yok</span>`;if(draft.fields.includes('address'))html+=`<span>${icon('pin')}<span>${esc(r.address||[r.district,r.city].filter(Boolean).join(', ')||'Adres bilgisi yok')}</span></span>`;if(draft.fields.includes('rating'))html+=`<span>${icon('chart')}<span>${r.rating===null||r.rating===undefined?'Puan bilgisi yok':esc(r.rating)+' / 5'}</span></span>`;if(draft.fields.includes('location'))html+=`<span>${icon('pin')}<span>${r.location?esc(r.location.latitude.toFixed(5)+', '+r.location.longitude.toFixed(5)):'Koordinat bilgisi yok'}</span></span>`;return html;}
 function renderResults(){
  const r=result;back.hidden=false;back.textContent='Yeni arama';next.innerHTML=`Üyelikle devam et ${icon('arrow')}`;$('.ob-footer-note',dialog).textContent=r.remaining?`İlk ${r.shown} sonucu görüntülüyorsunuz.`:'Aramanızdaki tüm sonuçlar gösterildi.';
  if(!r.total){content.innerHTML=heading('Bu aramada sonuç bulunamadı.','İşletme türünü veya bölgeyi değiştirip yeniden deneyin.')+`<div class="ob-empty">${icon('search')}<strong>${esc(draft.sector)}</strong><span>${esc([draft.district,draft.city].filter(Boolean).join(', '))}</span><button type="button" data-ob-edit="1">Aramayı değiştir</button></div>`;next.hidden=true;return}
  content.innerHTML=heading(r.demo?`${r.total} temsili kayıttan ilk ${r.shown} sonuç.`:`${r.total.toLocaleString('tr-TR')} sonuçtan ilk ${r.shown} kayıt.`,`${esc(draft.sector)} · ${esc([draft.district,draft.city].filter(Boolean).join(', '))}`)+`<div class="ob-results-top"><span>${icon('check')} İlk ${r.shown} kayıt ücretsiz</span><button type="button" data-ob-edit="4">Aramayı düzenle</button></div><ol class="ob-result-list">${r.results.map((record,i)=>`<li><div class="ob-result-top"><span class="ob-result-number">${i+1}</span><div><h3>${esc(record.name)}</h3><p>${esc(record.category||draft.sector)}</p></div><span class="ob-result-region">${esc(record.district||record.city)}</span></div><div class="ob-result-fields">${resultFields(record)}</div></li>`).join('')}</ol>${r.remaining?`<div class="ob-gate"><div class="ob-locked-lines" aria-hidden="true"><i></i><i></i><i></i></div><span class="ob-lock-icon">${icon('lock')}</span><h3>Kalan ${r.remaining.toLocaleString('tr-TR')} sonuç için üyelikle devam edin.</h3><p>Hesabınızı oluşturup uygulamada aramanıza devam edebilirsiniz.</p>${!r.signupUrl?'<small>Uygulama bağlantısı henüz eklenmedi. Üyelik adımı bağlantı hazır olduğunda açılacak.</small>':''}</div>`:`<div class="ob-all-shown">Bu aramadaki tüm sonuçları gördünüz. Farklı bölgelerde arama yapmak için üyelikle devam edebilirsiniz.</div>`}<div class="ob-handoff-notice" role="status" hidden></div>`;
 }
 function error(message,selector){const e=$('#ob-error',dialog);e.hidden=false;e.textContent=message;const input=selector?$(selector,dialog):null;input?.setAttribute('aria-invalid','true');input?.focus();}
 function valid(){if(step===1&&draft.sector.trim().length<2){error('Bir işletme türü seçin veya en az iki karakter yazın.','#ob-sector-input');return false}if(step===2&&!cities.includes(draft.city)){error('Geçerli bir il seçin.','#ob-city');return false}return true;}
 function move(n){step=Math.max(0,Math.min(4,n));view='form';persist();render();}
 async function submit(){if(!config){loadConfig();return}request?.abort();request=new AbortController();const id=++sequence;view='loading';render();try{
   const response=await fetch(config.searchEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(draft),signal:request.signal});const body=await response.json();if(id!==sequence||!dialog.open)return;
   if(!response.ok)throw Error(body.error?.message||'Arama tamamlanamadı.');
   if(!Array.isArray(body.results)||body.results.length>5||!Number.isSafeInteger(body.total)||body.total<body.results.length||!['demo','live'].includes(body.mode))throw Error('Arama yanıtı işlenemedi.');
   result=body;view='results';render();
  }catch(e){if(id!==sequence||e.name==='AbortError')return;result={message:e.message||'Arama servisine ulaşılamadı.'};view='error';render();}finally{if(id===sequence)request=null;}}
 function cancel(){sequence++;request?.abort();request=null;if(view==='loading')view='form';persist();}
 function open(){previousFocus=document.activeElement;if(!opened){opened=true;loadConfig()}else loadConfig();document.body.classList.add('onboarding-open');window.dispatchEvent(new CustomEvent('veriburada:motion',{detail:{paused:true}}));document.querySelectorAll('video').forEach(v=>v.pause());dialog.showModal();render();document.dispatchEvent(new CustomEvent('veriburada:onboarding-open'));}
 function close(){cancel();dialog.close();}
 next.addEventListener('click',()=>{if(view==='form'){if(!valid())return;if(step<4)move(step+1);else submit();}else if(view==='error')submit();else if(view==='results'){
   if(result.signupUrl){try{const url=new URL(result.signupUrl);if(url.protocol==='https:'){window.location.assign(url.href);return}}catch{}}
   const notice=$('.ob-handoff-notice',dialog);if(notice){notice.hidden=false;notice.innerHTML='Üyelik uygulaması henüz bağlanmadı. <button type="button" data-ob-pricing>Paketleri inceleyin →</button>';notice.scrollIntoView({block:'nearest',behavior:reduced.matches?'auto':'smooth'});}
  }});
 back.addEventListener('click',()=>{if(view==='loading'){cancel();move(4)}else if(view==='results'||view==='error'){result=null;move(1)}else move(step-1)});
 $('.ob-close',dialog).addEventListener('click',close);dialog.addEventListener('cancel',()=>cancel());dialog.addEventListener('close',()=>{cancel();document.body.classList.remove('onboarding-open');window.dispatchEvent(new CustomEvent('veriburada:motion',{detail:{paused:document.body.classList.contains('motion-paused')}}));document.dispatchEvent(new CustomEvent('veriburada:onboarding-close'));previousFocus?.focus({preventScroll:true})});
 content.addEventListener('change',e=>{const el=e.target;if(el.name==='ob-purpose')draft.purpose=el.value;if(el.name==='ob-sector'){draft.sector=el.value;$('#ob-sector-input',dialog).value='';$('#ob-sector-selection',dialog).textContent=el.value}if(el.name==='ob-field')draft.fields=[...content.querySelectorAll('[name="ob-field"]:checked')].map(i=>i.value);if(el.id==='ob-city'){draft.city=el.value;draft.district='';$('#ob-district',dialog).value='';$('#ob-district-list',dialog).innerHTML=districtOptions();$('#ob-region-text',dialog).textContent=draft.city}persist();});
 content.addEventListener('input',e=>{const el=e.target;if(el.id==='ob-sector-input'){draft.sector=el.value.trim();content.querySelectorAll('[name="ob-sector"]').forEach(i=>i.checked=false);$('#ob-sector-selection',dialog).textContent=draft.sector||'Henüz seçilmedi';el.removeAttribute('aria-invalid')}if(el.id==='ob-district'){draft.district=el.value.trim();$('#ob-region-text',dialog).textContent=[draft.district,draft.city].filter(Boolean).join(', ')}persist();});
 dialog.addEventListener('click',e=>{const edit=e.target.closest('[data-ob-edit]');if(edit){result=null;move(Number(edit.dataset.obEdit))}if(e.target.closest('[data-ob-config-retry]'))loadConfig();if(e.target.closest('[data-ob-pricing]')){close();$('#fiyatlar').scrollIntoView({behavior:reduced.matches?'auto':'smooth'})}});
 document.querySelectorAll('[data-onboarding]').forEach(trigger=>trigger.addEventListener('click',e=>{e.preventDefault();if(trigger.dataset.obSector){draft.sector=trigger.dataset.obSector;draft.city='İstanbul';draft.district='Beyoğlu';step=0;view='form';result=null;persist()}open()}));
 if(new URLSearchParams(location.search).get('onboarding')==='1')open();
})();

;
/* Shared responsive player for the hero, product walkthrough and expanded view. */
(() => {
 const reduced=matchMedia('(prefers-reduced-motion:reduce)'),mobile=matchMedia('(max-width:760px)');
 let globalPaused=false;
 class DemoPlayer {
  constructor(shell){this.shell=shell;this.frame=shell.querySelector('iframe');this.kind=shell.dataset.motion;this.ready=false;this.playing=false;this.wanted=false;this.time=0;this.duration=22;this.episode=0;this.visible=false;this.userPaused=false;this.explicit=false;this.url='';this.onchange=()=>{};}
  load(){
   const portrait=this.kind!=='hero'&&mobile.matches;
   const src='map-demo.html'+(mobile.matches?'?mobile'+(portrait?'&portrait':''):'');
   if(this.url===src)return;
   this.url=src;
   this.ready=false;
   this.shell.classList.remove('motion-ready');
   this.frame.src=src;
   this.frame.onload=()=>{
    this.shell.classList.add('motion-ready');
    if(this.wanted){this.send('play');setTimeout(()=>this.send('play'),200);}
   };
  }
  send(action,extra={}){if(this.frame&&this.frame.contentWindow)this.frame.contentWindow.postMessage({channel:'veriburada-map-control',action,...extra},'*')}
  play(explicit=false){if(explicit){this.explicit=true;this.userPaused=false}this.wanted=true;this.load();this.send('play');if(this.ready)this.send('play')}
  pause(){this.wanted=false;this.playing=false;this.send('pause');this.onchange()}
  next(){this.load();this.send('next');this.play(true)}
  seek(time){this.load();this.send('seek',{time});this.play(true)}
  receive(d){this.ready=d.ready;this.playing=d.playing;this.time=d.time;this.duration=d.duration;this.episode=d.episode;if(d.type==='ready'||d.ready){this.shell.classList.add('motion-ready');if(this.wanted)this.send('play')}this.shell.dataset.sector=d.sector;this.onchange()}
 }
 const players=[...document.querySelectorAll('[data-motion]')].map(s=>new DemoPlayer(s));

 const canAuto=p=>p.visible&&!globalPaused&&!document.hidden&&!document.body.classList.contains('onboarding-open')&&!reduced.matches;
 function update(){for(const p of players){if(canAuto(p))p.play();else p.pause()}}
 addEventListener('message',e=>{if(e.data?.channel!=='veriburada-map')return;const player=players.find(p=>p.frame.contentWindow===e.source);if(player)player.receive(e.data)});
 const io=new IntersectionObserver(es=>{es.forEach(e=>{const p=players.find(p=>p.shell===e.target);if(p)p.visible=e.isIntersecting});update()},{threshold:[0, 0.1, 0.2]});players.forEach(p=>io.observe(p.shell));
 window.addEventListener('veriburada:motion',e=>{globalPaused=e.detail.paused;update()});document.addEventListener('visibilitychange',update);document.addEventListener('veriburada:onboarding-open',update);document.addEventListener('veriburada:onboarding-close',update);
 reduced.addEventListener('change',update);mobile.addEventListener('change',()=>{players.filter(p=>p.url).forEach(p=>p.load());update()});
 // Hero should start immediately on initial page load
 setTimeout(()=>{players.forEach(p=>{if(p.kind==='hero'){p.visible=true;p.play();}});},50);
})();

(() => {
 const v=document.querySelector('.brand-reveal');if(!v)return;const reduced=matchMedia('(prefers-reduced-motion:reduce)');let visible=false,paused=false;
 function update(){if(visible&&!paused&&!reduced.matches&&!document.hidden){if(!v.src){v.src=v.dataset.src;v.load()}v.muted=true;v.play().catch(()=>{})}else v.pause()}
 new IntersectionObserver(es=>{visible=es[0].isIntersecting;update()},{threshold:.2}).observe(v);window.addEventListener('veriburada:motion',e=>{paused=e.detail.paused;update()});document.addEventListener('visibilitychange',update);reduced.addEventListener('change',update);
})();

;
(() => {
 const card=document.querySelector('#audience-content');if(!card)return;const reduced=matchMedia('(prefers-reduced-motion:reduce)');let visible=false,paused=false;
 function update(){card.querySelectorAll('[data-audience-view]').forEach(scene=>scene.classList.toggle('audience-running',visible&&!paused&&!reduced.matches&&!document.hidden&&!scene.hidden))}
 new IntersectionObserver(es=>{visible=es[0].isIntersecting;update()},{threshold:.2}).observe(card);
 window.addEventListener('veriburada:audience',update);window.addEventListener('veriburada:motion',e=>{paused=e.detail.paused;update()});reduced.addEventListener('change',update);document.addEventListener('visibilitychange',update);update();
})();
