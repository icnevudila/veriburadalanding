/* Original illustrated object system. Product identity always uses the supplied mark. */
(() => {const types=['architecture','cafe','clinic','hair','restaurant','hotel','gym','garage','map','contact','csv','webapp','research'];const industry=label=>{label=String(label).toLocaleLowerCase('tr-TR');return /diş|klinik/.test(label)?'clinic':/kafe|kahve/.test(label)?'cafe':/restoran/.test(label)?'restaurant':/kuaför|güzellik/.test(label)?'hair':/otel/.test(label)?'hotel':/spor/.test(label)?'gym':/oto |servis/.test(label)?'garage':'architecture'};window.VBArt={industry,icon(kind,size=48){kind=types.includes(kind)?kind:'research';return `<img class="brand-illustration" src="/media/icons/${kind}.svg" width="${size}" height="${size}" alt="" aria-hidden="true">`},mark(size=32){return `<img class="product-mark" src="/brand-emblem-small.webp" width="${size}" height="${size}" alt="" aria-hidden="true">`}}})();

;
/* Search cinema: an explicit demo storyboard; live completion follows the response. */
(() => {
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 window.VBSearchCinema={mount(root,{query,demo}){
  const A=window.VBArt,reduced=matchMedia('(prefers-reduced-motion:reduce)'),art=A?.icon(A.industry(query.sector),48)||'',location=[query.district,query.city].filter(Boolean).join(', '),fields=query.fields.map(f=>({phone:'Telefon',website:'Web sitesi',address:'Adres',location:'Konum',rating:'Puan'}[f])).filter(Boolean),phases=['Arama bölgesi hazırlanıyor','İşletmeler bulunuyor','Bilgi alanları bir araya geliyor','İlk 5 kayıt düzenleniyor'];
  root.innerHTML=`<div class="search-cinema" data-phase="0"><div class="search-cinema-top">${A.mark(31)}<div><b>Veri Burada</b><span>${demo?'Örnek arama akışı':'Arama isteğiniz'}</span></div><span class="cinema-live-dot"></span></div><div class="cinema-query">${art}<div><strong>${esc(query.sector)}</strong><span>${esc(location)}</span></div><span class="cinema-query-check">✓</span></div><div class="cinema-stage" aria-hidden="true"><svg class="cinema-geography" viewBox="0 0 560 240" preserveAspectRatio="xMidYMid slice"><rect width="560" height="240" fill="#edf4ec"/><path d="M400-20C300 30 425 90 350 145S410 230 340 280" stroke="#c9e6ed" stroke-width="48" fill="none"/><g fill="#e0ebdc" stroke="#f9fcf7" stroke-width="3"><path d="m0 20 135-25 16 55L0 78Zm10 80 136-28 10 38-135 35ZM29 167l137-34 15 59L45 227ZM185 0l109-5 12 62-106 13ZM209 93l108-13 6 45-107 20ZM235 170l80-20 13 70-77 16ZM438 0h122v74l-101 12ZM461 110l99-10v69l-78 14Z"/></g><g fill="none" stroke="#fff" stroke-width="8"><path d="M-20 92 340 20M-20 159l345-39M30 251 365 193M164-20l66 290M446-20l68 290M425 97l155-4"/></g><path class="cinema-region" d="M54 28 282 11 329 180 94 220Z" fill="#20c99708" stroke="#198754" stroke-width="1.3" stroke-dasharray="5 5"/></svg><div class="cinema-scan"></div>${[0,1,2,3,4].map(i=>`<div class="cinema-pin cinema-pin-${i}"><span>${i+1}</span><i></i></div>`).join('')}<div class="cinema-inspect">${art}<div><b class="cinema-business-name">İşletme bilgileri</b><span>${fields.map(f=>`<i>${f}</i>`).join('')}</span></div><strong>✓</strong></div><div class="cinema-list">${[0,1,2].map(i=>`<div><span>${i+1}</span><b class="cinema-list-name">Önizleme kaydı</b><i>✓</i></div>`).join('')}</div><small class="cinema-map-caption">Arama akışını anlatan temsili harita</small></div><div class="cinema-status"><span class="cinema-status-icon">${A.mark(24)}</span><div><strong role="status" aria-live="polite">${demo?phases[0]:'Arama isteği gönderiliyor'}</strong><span class="cinema-status-detail">${demo?'Bölge ve sektör seçimleriniz hazırlanıyor.':'Arama hizmetinden yanıt bekleniyor.'}</span></div></div><ol class="cinema-phases">${['Bölge','İşletmeler','Bilgiler','Önizleme'].map(t=>`<li><span></span>${t}</li>`).join('')}</ol></div>`;
  const stage=root.firstElementChild,status=root.querySelector('.cinema-status strong'),detail=root.querySelector('.cinema-status-detail'),steps=[...root.querySelectorAll('.cinema-phases li')],pins=[...root.querySelectorAll('.cinema-pin')];let elapsed=0,last=performance.now(),raf=0,stopped=false,data=null,lastPhase=-1,settle=null,waitSignal,abortHandler;
  const duration=reduced.matches?1800:11200;
  function draw(){const progress=reduced.matches?1:Math.min(1,elapsed/11200),seconds=progress*11.2,phase=demo?Math.min(3,Math.floor(seconds/2.8)):0;stage.dataset.phase=phase;stage.dataset.demo=String(demo);stage.classList.toggle('cinema-reduced',reduced.matches);stage.style.setProperty('--cinema-progress',String(progress));
   if(phase!==lastPhase){lastPhase=phase;status.textContent=demo?phases[phase]:'Arama hizmetinden yanıt bekleniyor';detail.textContent=demo?[location,query.sector,fields.join(' · '),'İlk 5 kayıt ücretsiz önizlemeye alınıyor.'][phase]:'Sonuç geldiğinde önizleme otomatik açılacak.';steps.forEach((el,i)=>{el.classList.toggle('phase-active',i===phase);el.classList.toggle('phase-complete',demo&&i<phase)})}
   pins.forEach((pin,i)=>{const a=demo?Math.max(0,Math.min(1,(seconds-1.8-i*.4)/.45)):0;pin.style.opacity=String(a);pin.style.transform=`translateY(${(1-a)*12}px) scale(${.82+.18*a})`;pin.classList.toggle('pin-complete',seconds>5.5+i*.4)});
   if(elapsed>=duration&&settle){const done=settle;settle=null;waitSignal?.removeEventListener('abort',abortHandler);done.resolve()}
  }
  function tick(now){if(stopped)return;const dt=Math.min(80,now-last);last=now;if(!document.hidden){elapsed+=dt*(reduced.matches?1:2);draw()}raf=requestAnimationFrame(tick)}draw();raf=requestAnimationFrame(tick);
  return{setResults(records){data=records;if(records?.length){root.querySelector('.cinema-business-name').textContent=records[0].name;root.querySelectorAll('.cinema-list-name').forEach((el,i)=>el.textContent=records[i]?.name||records[0].name)}},wait(signal){if(!demo)return Promise.resolve();if(signal.aborted)return Promise.reject(new DOMException('Cancelled','AbortError'));return new Promise((resolve,reject)=>{settle={resolve,reject};waitSignal=signal;abortHandler=()=>{if(settle){settle.reject(new DOMException('Cancelled','AbortError'));settle=null}};signal.addEventListener('abort',abortHandler,{once:true});if(elapsed>=duration){settle=null;signal.removeEventListener('abort',abortHandler);resolve()}})},stop(){stopped=true;cancelAnimationFrame(raf);waitSignal?.removeEventListener('abort',abortHandler);if(settle){settle.reject(new DOMException('Cancelled','AbortError'));settle=null}}};
 }};
})();

;
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

;
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
      $('.business-monogram', record).innerHTML = window.VBArt.icon(window.VBArt.industry(data.type),38);
      record.querySelector(':scope>div>strong').textContent = data.names[i];
      const small = record.querySelector(':scope>div>small');
      small.textContent = `${data.type} · Örnek işletme`;
      const fields = $('.record-fields', record);
      fields.innerHTML = `<span>${icon('phone')} +90 (212) 000 10 0${i+1}</span><span>${icon('globe')} işletme-${i+1}.example</span><span>${icon('pin')} Beyoğlu, İstanbul</span>`;
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
        if (announce) status.textContent = `${sectors[sector].label} için üç temsili kayıt birlikte gösteriliyor.`;
      }
    };
    const revealBatch = () => {
      records.forEach((record, i) => revealRecord(i));
      records.forEach(record => record.classList.remove('record-focused'));
      markers.forEach(marker => marker.getElement()?.querySelector('.business-marker')?.classList.add('selected-marker'));
    };
    if (motion.matches) revealBatch();
    else timers.push(setTimeout(revealBatch, 900));
  }
  records.forEach((record, index) => record.addEventListener('mouseenter', () => highlightRecord(index)));
  sectorSelect.addEventListener('change', () => { sector = sectorSelect.value; runDiscovery(); });
  $('.map-search-button').addEventListener('click', runDiscovery);
  $('#download-demo').addEventListener('click', () => {
    const data = sectors[sector];
    const rows = [['İşletme adı', 'Sektör', 'İl', 'İlçe', 'Telefon', 'Web sitesi', 'Not'], ...data.names.map((name,i) => [name, data.type, 'İstanbul', 'Beyoğlu', '+90 (212) 000 10 0'+(i+1), name.toLocaleLowerCase('tr-TR').replaceAll('ı','i').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'')+'.example', 'Örnek kayıt; gerçek iletişim bilgisi değildir.'])];
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
/* Fixed-field connection composition; only routes and matching evidence resolve. */
(() => {
 const root=document.querySelector('.connection-section'),M=window.VBMotion;if(!root||!M)return;
 const scenes=[...root.querySelectorAll('.flow-scene')].map(svg=>({svg,inputs:[...svg.querySelectorAll('.flow-input')],outputs:[...svg.querySelectorAll('.flow-output')],rows:[...svg.querySelectorAll('.flow-result-row')],paths:[...svg.querySelectorAll('.flow-trace')].map(path=>({path,length:path.getTotalLength(),packet:svg.querySelector(`.flow-packet[data-route="${path.dataset.route}"]`)})),halo:svg.querySelector('.flow-halo'),success:svg.querySelector('.flow-success')}));
 const controls=root.querySelector('.connection-controls');if(controls)controls.hidden=true;
 M.create(root,{duration:14000,staticAt:11200,target:root.querySelector('.connection-stage'),render:t=>{
  root.dataset.state=t<3.8?'inputs':t<7.5?'connections':t<10?'resolve':'ready';const out=1-M.smooth((t-13)/1);
  scenes.forEach(d=>{d.inputs.forEach((n,i)=>{n.style.opacity=.55+.45*M.ease((t-.7-i*1.05)/.6);n.style.transform='none';const rect=n.querySelector('rect');if(rect)rect.style.stroke=t>.7+i*1.05&&t<1.65+i*1.05?'#77bd91':'#d5e4da'});
   d.paths.forEach(({path,length,packet},i)=>{const at=i<3?1+i*1.05:i===3?5.1:7;const a=M.clamp((t-at)/1.45);path.style.strokeDasharray='1';path.style.strokeDashoffset=1-a;path.style.opacity=.7*out;const p=M.clamp((t-at-.12)/1.6),point=path.getPointAtLength(length*p);packet.setAttribute('cx',point.x);packet.setAttribute('cy',point.y);packet.style.opacity=p>0&&p<1?String(out):'0'});
   d.outputs.forEach((n,i)=>{n.style.transform='none';n.style.opacity=.2+.8*M.ease((t-6.2-i*1.4)/1)*out});d.rows.forEach(n=>{n.style.transform='none';n.style.opacity=(.15+.85*M.ease((t-6.4)/.9))*out});d.halo.style.opacity=t>3.2&&t<5.4?String(Math.sin((t-3.2)/2.2*Math.PI)*.2):'0';d.halo.style.transform='none';d.success.style.opacity=M.ease((t-9)/.8)*out;
  });
 }});
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
     const avatar=document.createElement('i');avatar.className='output-avatar';avatar.innerHTML=window.VBArt.icon(window.VBArt.industry(type),38);
     rows[i].querySelector('th').append(avatar,document.createTextNode(name));
     rows[i].querySelector('td').textContent=type;
     rows[i].querySelectorAll('td')[1].textContent='+90 (212) 000 10 0'+(i+1);
     rows[i].querySelectorAll('td')[2].textContent=name.toLocaleLowerCase('tr-TR').replaceAll('ı','i').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'')+'.example';
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
 const reduced=matchMedia('(prefers-reduced-motion:reduce)'),art=(kind,size=48)=>window.VBArt.icon(kind,size);let searchCinema=null;
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
 dialog.innerHTML=`<div class="ob-shell"><aside class="ob-sidebar"><img src="/brand-wordmark.webp" alt="Veri Burada" width="640" height="214"><div class="ob-sidebar-title">İlk aramanız</div><p>Bölgeyi ve işletme türünü seçin.<br>İlk 5 sonucu ücretsiz görün.</p><ol class="ob-steps">${steps.map((s,i)=>`<li data-ob-rail="${i}"><span>${i+1}</span><div>${s}</div></li>`).join('')}</ol><div class="ob-side-summary"><span>ARAMANIZ</span><strong></strong><small></small></div><div class="ob-side-note">Hesap veya kart bilgisi istemiyoruz.</div></aside><div class="ob-main"><header class="ob-header"><span class="ob-step-label"></span><button type="button" class="ob-close" aria-label="Ücretsiz aramayı kapat">×</button></header><div class="ob-mode" role="status"></div><div class="ob-legal-links"><a href="/gizlilik-politikasi/" target="_blank" rel="noopener noreferrer">Gizlilik Politikası ↗</a><span aria-hidden="true">·</span><a href="/kullanim-kosullari/" target="_blank" rel="noopener noreferrer">Kullanım Koşulları ↗</a></div><div class="ob-content" tabindex="0" role="region" aria-label="Arama adımları ve sonuçları"></div><footer class="ob-footer"><button type="button" class="ob-back">← Geri</button><span class="ob-footer-note"></span><button type="button" class="ob-next">Devam et ${icon('arrow')}</button></footer></div></div>`;
 document.body.append(dialog);const content=$('.ob-content',dialog),next=$('.ob-next',dialog),back=$('.ob-back',dialog),mode=$('.ob-mode',dialog),footer=$('.ob-footer',dialog);
 function modeLabel(){if(configError){mode.className='ob-mode ob-mode-error';mode.innerHTML='Arama bağlantısı yüklenemedi. <button type="button" data-ob-config-retry>Yeniden dene</button>';return}mode.className='ob-mode';mode.textContent=config?.mode==='demo'?'Örnek mod: gerçek arama bağlantısı henüz aktif değil.':config?.mode==='live'?'Ücretsiz önizleme · Arama başına ilk 5 sonuç':'Ücretsiz önizleme · İlk 5 sonuç';mode.hidden=false;}
 async function loadConfig(){configError=false;try{const r=await fetch('/api/onboarding-config',{cache:'no-store'});if(!r.ok)throw Error();const c=await r.json();if(!['demo','live'].includes(c.mode)||c.previewLimit!==5)throw Error();config=c;}catch{config=null;configError=true;}modeLabel();if(view==='form'&&step===4)next.disabled=!config;}
 function heading(title,description){return `<h2 id="ob-title" tabindex="-1">${title}</h2><p class="ob-description">${description}</p><p class="ob-error" id="ob-error" role="alert" hidden></p>`;}
 function render(focus=true){
  if(view!=='loading'){searchCinema?.stop();searchCinema=null;}
  content.classList.remove('studio-step-enter');requestAnimationFrame(()=>{if(!reduced.matches)content.classList.add('studio-step-enter')});
  dialog.dataset.view=view;$('.ob-step-label',dialog).textContent=view==='results'?'Arama sonuçları':view==='loading'?'Arama yapılıyor':view==='error'?'Arama tamamlanamadı':`Adım ${step+1} / 5 · ${steps[step]}`;
  dialog.querySelectorAll('[data-ob-rail]').forEach((li,i)=>{li.classList.toggle('is-current',view==='form'&&i===step);li.classList.toggle('is-done',view!=='form'||i<step);li.setAttribute('aria-current',view==='form'&&i===step?'step':'false');li.querySelector('span').innerHTML=i<step||view!=='form'?icon('check'):String(i+1)});
  $('.ob-side-summary strong',dialog).textContent=draft.sector||'İşletme türünü seçin';$('.ob-side-summary small',dialog).textContent=[draft.district,draft.city].filter(Boolean).join(', ');
  footer.hidden=false;next.disabled=false;back.disabled=false;back.hidden=step===0&&view==='form';next.hidden=false;back.textContent='← Geri';next.innerHTML=`Devam et ${icon('arrow')}`;$('.ob-footer-note',dialog).textContent='Seçimlerinizi değiştirebilirsiniz.';
  if(view==='form')renderForm();else if(view==='loading')renderLoading();else if(view==='results')renderResults();else renderError();
  modeLabel();content.scrollTop=0;if(focus)$('#ob-title',dialog)?.focus({preventScroll:true});
 }
 function renderForm(){
  if(step===0)content.innerHTML=heading('Ne için işletme arıyorsunuz?','Arama amacınıza uygun seçeneği işaretleyin.')+`<fieldset class="ob-choice-grid"><legend class="sr-only">Kullanım amacı</legend>${purposes.map(([key,title,desc,i])=>`<label class="ob-choice"><input type="radio" name="ob-purpose" value="${key}" ${draft.purpose===key?'checked':''}><span class="ob-choice-icon">${art({sales:'contact',agency:'webapp',local:'map',research:'research'}[key])}</span><strong>${title}</strong><small>${desc}</small><i class="ob-choice-check">${icon('check')}</i></label>`).join('')}</fieldset><div class="ob-inline-note">${icon('file')}Son adımda 5 işletmeyi kayıt olmadan inceleyebilirsiniz.</div>`;
  if(step===1)content.innerHTML=heading('Hangi işletmeleri arıyorsunuz?','Bir işletme türü seçin veya kendiniz yazın.')+`<fieldset class="ob-sector-grid"><legend class="sr-only">İşletme türü</legend>${sectors.map((name,i)=>`<label><input type="radio" name="ob-sector" value="${esc(name)}" ${draft.sector===name?'checked':''}><span>${art(window.VBArt.industry(name),44)}</span><strong>${name}</strong><i>${icon('check')}</i></label>`).join('')}</fieldset><div class="ob-input-group"><label for="ob-sector-input">Başka bir işletme türü</label><input id="ob-sector-input" name="sector" maxlength="100" autocomplete="off" placeholder="Örn. oto servisleri, muhasebe ofisleri" value="${sectors.includes(draft.sector)?'':esc(draft.sector)}" aria-describedby="ob-error"></div><div class="ob-selection">Seçiminiz: <strong id="ob-sector-selection">${esc(draft.sector||'Henüz seçilmedi')}</strong></div>`;
  if(step===2)content.innerHTML=heading('Nerede arama yapalım?','Bir il seçin. Daha dar bir arama için ilçe de ekleyebilirsiniz.')+`<div class="ob-location-card"><span>${art('map',56)}</span><div><strong>Arama bölgesi</strong><small>İlçe yazmazsanız il genelinde arama yapılır.</small></div></div><div class="ob-input-group"><label for="ob-city">İl</label><select id="ob-city" name="city">${cities.map(c=>`<option ${c===draft.city?'selected':''}>${c}</option>`).join('')}</select></div><div class="ob-input-group"><label for="ob-district">İlçe <span>İsteğe bağlı</span></label><input id="ob-district" name="district" list="ob-district-list" autocomplete="off" maxlength="100" placeholder="Tüm ilçeler veya bir ilçe adı" value="${esc(draft.district)}"><datalist id="ob-district-list">${districtOptions()}</datalist><small>Öneriler dışında bir ilçe adı da yazabilirsiniz.</small></div><div class="ob-region-summary">${icon('pin')}<span id="ob-region-text">${esc([draft.district,draft.city].filter(Boolean).join(', '))}</span></div>`;
  if(step===3)content.innerHTML=heading('Hangi bilgiler gerekli?','İşletme adı her zaman listede yer alır. Diğer alanları seçin.')+`<div class="ob-fields"><div class="ob-field-fixed"><span>${icon('building')}</span><div><strong>İşletme adı ve türü</strong><small>Her sonuçta gösterilir.</small></div><i>${icon('check')}</i></div>${fieldOptions.map(([key,title,desc,i])=>`<label><input type="checkbox" name="ob-field" value="${key}" ${draft.fields.includes(key)?'checked':''}><span>${icon(i)}</span><div><strong>${title}</strong><small>${desc}</small></div></label>`).join('')}</div><p class="ob-small-note">Yalnızca işletme profilinde bulunan bilgiler gösterilebilir. Her alan her işletmede dolu olmayabilir.</p>`;
  if(step===4){content.innerHTML=heading('Aramanız hazır mı?','Seçimlerinizi kontrol edin, ardından ücretsiz aramayı başlatın.')+`<dl class="ob-review"><div><dt>Kullanım amacı</dt><dd>${esc(purposes.find(p=>p[0]===draft.purpose)?.[1])}<button type="button" data-ob-edit="0">Değiştir</button></dd></div><div><dt>İşletme türü</dt><dd>${esc(draft.sector)}<button type="button" data-ob-edit="1">Değiştir</button></dd></div><div><dt>Bölge</dt><dd>${esc([draft.district,draft.city].filter(Boolean).join(', '))}<button type="button" data-ob-edit="2">Değiştir</button></dd></div><div><dt>Bilgiler</dt><dd>${esc(['İşletme adı',...fieldOptions.filter(f=>draft.fields.includes(f[0])).map(f=>f[1])].join(', '))}<button type="button" data-ob-edit="3">Değiştir</button></dd></div></dl><div class="ob-free-card"><span>${icon('search')}</span><div><strong>İlk 5 sonucu ücretsiz görün.</strong><p>Aramanızda daha fazla sonuç bulunursa devamını görmek için üyelikle ilerleyebilirsiniz.</p></div><b>ÜCRETSİZ</b></div>`;next.innerHTML=`Ücretsiz ara ${icon('search')}`;next.disabled=!config;$('.ob-footer-note',dialog).textContent='Kart bilgisi gerekmiyor.';}
 }
 const districtOptions=()=> (districts[draft.city]||[]).map(d=>`<option value="${esc(d)}"></option>`).join('');
 function renderLoading(){content.innerHTML=heading('Listeniz hazırlanıyor.','Aramanızdan işletme bilgilerine, adım adım.')+'<div class="ob-cinema-mount"></div>';next.hidden=true;back.textContent='Aramayı iptal et';back.hidden=false;$('.ob-footer-note',dialog).textContent='Pencereyi kapatırsanız istek iptal edilir.';searchCinema=window.VBSearchCinema.mount($('.ob-cinema-mount',dialog),{query:draft,demo:config.mode==='demo'});}
 function renderError(){content.innerHTML=heading('Arama tamamlanamadı.','Seçimleriniz korunuyor. Yeniden deneyebilir veya aramanızı değiştirebilirsiniz.')+`<div class="ob-request-error" role="alert">${esc(result?.message||'Arama servisine ulaşılamadı.')}</div>`;next.innerHTML=`Yeniden dene ${icon('search')}`;back.textContent='Aramayı düzenle';back.hidden=false;$('.ob-footer-note',dialog).textContent='Sonuç olarak örnek veri gösterilmedi.';}
 function resultFields(r){let html='';if(draft.fields.includes('phone'))html+=`<span>${icon('phone')}<span>${esc(r.phone||'Telefon bilgisi yok')}</span></span>`;if(draft.fields.includes('website')&&r.website&&result?.demo)html+=`<span>${icon('globe')}<span>${esc(new URL(r.website).hostname)} (örnek)</span></span>`;else if(draft.fields.includes('website'))html+=r.website?`<a href="${esc(r.website)}" target="_blank" rel="noopener noreferrer">${icon('globe')}<span>${esc(new URL(r.website).hostname)}</span> ↗</a>`:`<span>${icon('globe')}Web sitesi bilgisi yok</span>`;if(draft.fields.includes('address'))html+=`<span>${icon('pin')}<span>${esc(r.address||[r.district,r.city].filter(Boolean).join(', ')||'Adres bilgisi yok')}</span></span>`;if(draft.fields.includes('rating'))html+=`<span>${icon('chart')}<span>${r.rating===null||r.rating===undefined?'Puan bilgisi yok':esc(r.rating)+' / 5'}</span></span>`;if(draft.fields.includes('location'))html+=`<span>${icon('pin')}<span>${r.location?esc(r.location.latitude.toFixed(5)+', '+r.location.longitude.toFixed(5)):'Koordinat bilgisi yok'}</span></span>`;return html;}
 function renderResults(){
  const r=result;back.hidden=false;back.textContent='Yeni arama';next.innerHTML=`Üyelikle devam et ${icon('arrow')}`;$('.ob-footer-note',dialog).textContent=r.remaining?`İlk ${r.shown} sonucu görüntülüyorsunuz.`:'Aramanızdaki tüm sonuçlar gösterildi.';
  if(!r.total){content.innerHTML=heading('Bu aramada sonuç bulunamadı.','İşletme türünü veya bölgeyi değiştirip yeniden deneyin.')+`<div class="ob-empty">${icon('search')}<strong>${esc(draft.sector)}</strong><span>${esc([draft.district,draft.city].filter(Boolean).join(', '))}</span><button type="button" data-ob-edit="1">Aramayı değiştir</button></div>`;next.hidden=true;return}
  content.innerHTML=heading(r.demo?`${r.total} temsili kayıttan ilk ${r.shown} sonuç.`:`${r.total.toLocaleString('tr-TR')} sonuçtan ilk ${r.shown} kayıt.`,`${esc(draft.sector)} · ${esc([draft.district,draft.city].filter(Boolean).join(', '))}`)+`<div class="ob-results-top"><span>${icon('check')} İlk ${r.shown} kayıt ücretsiz</span><button type="button" data-ob-edit="4">Aramayı düzenle</button></div><ol class="ob-result-list">${r.results.map((record,i)=>`<li><div class="ob-result-top"><span class="ob-result-number">${art(window.VBArt.industry(record.category||draft.sector),40)}</span><div><h3>${esc(record.name)}</h3><p>${esc(record.category||draft.sector)}</p></div><span class="ob-result-region">${esc(record.district||record.city)}</span></div><div class="ob-result-fields">${resultFields(record)}</div></li>`).join('')}</ol>${r.remaining?`<div class="ob-gate"><div class="ob-locked-lines" aria-hidden="true"><i></i><i></i><i></i></div><span class="ob-lock-icon">${art('webapp',48)}</span><h3>Kalan ${r.remaining.toLocaleString('tr-TR')} sonuç için üyelikle devam edin.</h3><p>Hesabınızı oluşturup uygulamada aramanıza devam edebilirsiniz.</p>${!r.signupUrl?'<small>Uygulama bağlantısı henüz eklenmedi. Üyelik adımı bağlantı hazır olduğunda açılacak.</small>':''}</div>`:`<div class="ob-all-shown">Bu aramadaki tüm sonuçları gördünüz. Farklı bölgelerde arama yapmak için üyelikle devam edebilirsiniz.</div>`}<div class="ob-handoff-notice" role="status" hidden></div>`;
 }
 function error(message,selector){const e=$('#ob-error',dialog);e.hidden=false;e.textContent=message;const input=selector?$(selector,dialog):null;input?.setAttribute('aria-invalid','true');input?.focus();}
 function valid(){if(step===1&&draft.sector.trim().length<2){error('Bir işletme türü seçin veya en az iki karakter yazın.','#ob-sector-input');return false}if(step===2&&!cities.includes(draft.city)){error('Geçerli bir il seçin.','#ob-city');return false}return true;}
 function move(n){step=Math.max(0,Math.min(4,n));view='form';persist();render();}
 async function submit(){if(!config){loadConfig();return}request?.abort();request=new AbortController();const id=++sequence;view='loading';render();try{
   const response=await fetch(config.searchEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(draft),signal:request.signal});const body=await response.json();if(id!==sequence||!dialog.open)return;
   if(!response.ok)throw Error(body.error?.message||'Arama tamamlanamadı.');
   if(!Array.isArray(body.results)||body.results.length>5||!Number.isSafeInteger(body.total)||body.total<body.results.length||!['demo','live'].includes(body.mode))throw Error('Arama yanıtı işlenemedi.');
   searchCinema?.setResults(body.results);await searchCinema?.wait(request.signal);if(id!==sequence||!dialog.open)return;
   result=body;view='results';render();
  }catch(e){if(id!==sequence||e.name==='AbortError')return;result={message:e.message||'Arama servisine ulaşılamadı.'};view='error';render();}finally{if(id===sequence)request=null;}}
 function cancel(){sequence++;request?.abort();searchCinema?.stop();searchCinema=null;request=null;if(view==='loading')view='form';persist();}
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
 dialog.addEventListener('click',e=>{const edit=e.target.closest('[data-ob-edit]');if(edit){result=null;move(Number(edit.dataset.obEdit))}if(e.target.closest('[data-ob-config-retry]'))loadConfig();if(e.target.closest('[data-ob-pricing]')){close();(document.querySelector('#fiyatlar')?document.querySelector('#fiyatlar').scrollIntoView({behavior:reduced.matches?'auto':'smooth'}):location.assign('/pricing/'))}});
 document.querySelectorAll('[data-onboarding]').forEach(trigger=>trigger.addEventListener('click',e=>{e.preventDefault();if(trigger.dataset.obSector){draft.sector=trigger.dataset.obSector;draft.city='İstanbul';draft.district='Beyoğlu';step=0;view='form';result=null;persist()}open()}));
 window.addEventListener('veriburada:clear-search-preferences',()=>{cancel();draft={...defaults,fields:[...defaults.fields]};step=0;view='form';result=null;try{sessionStorage.removeItem('vb-search-draft')}catch{}if(dialog.open)render();});
 if(new URLSearchParams(location.search).get('onboarding')==='1')open();
})();

;
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

;
/* Authored compositions. Each narrative uses its own stages, pace and field logic. */
(() => {
 const M=window.VBMotion,$=(s,p=document)=>p.querySelector(s),all=(s,p=document)=>[...p.querySelectorAll(s)];if(!M)return;
 const e=(t,a,d=.7)=>M.ease((t-a)/d),fade=(t,at,d=.8)=>1-M.smooth((t-at)/d),alpha=(el,a)=>{if(el)el.style.opacity=String(a)},reveal=(el,a)=>{if(el){el.style.opacity=String(a);el.style.clipPath=`inset(0 ${(1-a)*100}% 0 0)`}},stage=(root,name)=>root.dataset.stage=name;
 // 3. Sales: one research command, a batch of clinics, then phone/web/address focus.
 const sales=$('.sales-scene');if(sales){
  const rows=all('.sales-record',sales),fields=all('.sales-fields',sales),action=$('.sales-search-strip b',sales),file=$('.audience-bottom>b',sales);
  const timeline=M.create(sales,{duration:13000,staticAt:10500,render:t=>{const out=fade(t,12);stage(sales,t<2.8?'research':t<5.4?'batch':t<8.7?'fields':'ready');action.classList.toggle('command-active',t>1.5&&t<3.8);action.textContent=t<2.8?'Toplu araştır':'3 işletme bulundu';rows.forEach(row=>alpha(row,e(t,3.2)*out));fields.forEach(f=>all('i',f).forEach((v,i)=>{const a=e(t,4.6+i*.85);alpha(v,(.12+.88*a)*out);v.classList.toggle('field-focus',t>4.6+i*.85&&t<5.4+i*.85)}));all('.sales-fields b',sales).forEach(b=>alpha(b,e(t,7.5)*out));alpha(file,e(t,8.8)*out)}});
  sales._scene=timeline;
 }
 // 4. Agency: compare actual field availability. Missing web data never becomes a fake site.
 const agency=$('.agency-scene');if(agency){const cards=all('.agency-browser',agency),tags=all('.agency-sectors>span',agency);agency._scene=M.create(agency,{duration:15000,staticAt:12000,enabled:false,render:t=>{const out=fade(t,14);stage(agency,t<2.5?'sector':t<7?'research':t<10?'compare':'ready');tags.forEach((el,i)=>el.style.opacity=i===0?1:.4+.6*e(t,2));cards.forEach((card,i)=>{alpha(card,.65+.35*e(t,2.2));const scan=e(t,3.4+i*1.3,1.8);$('.agency-inspection-line',card).style.top=(28+scan*90)+'%';alpha($('.agency-inspection-line',card),scan>0&&scan<1?.6:0);const preview=$('.agency-web-value,.agency-web-empty',card);preview.style.clipPath='none';preview.style.opacity=String(.72+.28*e(t,5.2+i*1.3));all('.agency-contact-lines>*',card).forEach((v,n)=>alpha(v,e(t,8+n*.22)));card.classList.toggle('web-compared',t>9.5)});alpha($('.audience-bottom',agency),e(t,10.4)*out)}})}
 // 5. Local: draw the chosen area, place businesses, then inspect one anchored record.
 const local=$('.local-scene');if(local){const path=$('.local-boundary path',local),pins=all('.local-place',local),label=$('.local-business',local);path.style.strokeDasharray='1';local._scene=M.create(local,{duration:16000,staticAt:13000,enabled:false,render:t=>{const out=fade(t,15);stage(local,t<3?'area':t<7?'discovery':t<11?'inspect':'ready');path.setAttribute('pathLength','1');path.style.strokeDashoffset=1-e(t,.8,2);alpha(path,.85*out);pins.forEach((pin,i)=>{const a=e(t,3.2+i*1.1,.65);alpha(pin,a*out);pin.style.transform=`scale(${.88+.12*a})`;pin.classList.toggle('local-focused',i===0&&t>7.7&&t<12)});alpha(label,e(t,8.1)*out);$('.local-position i',local).style.boxShadow=t>2&&t<5?'0 0 0 9px #20c99720':'0 0 0 5px #20c99718'}})}
 function selectAudience(){all('[data-audience-view]').forEach(v=>v._scene?.enable(!v.hidden))}window.addEventListener('veriburada:audience',selectAudience);selectAudience();
 // 6. Collector: shared command, two records plus remainder; field completion is synchronized.
 const collector=$('.collection-demo');if(collector){const rows=all('.collector-result',collector),command=$('.collector-command',collector);M.create(collector,{duration:14000,staticAt:11500,render:t=>{const out=fade(t,13),count=t>=7.2?3:t>=5?2:0;stage(collector,t<2.7?'configure':t<8.8?'bulk':'ready');command.classList.toggle('command-active',t>2&&t<8);$('span',command).textContent=t<2.7?'3 işletmenin bilgilerini birlikte topla':count===3?'Toplu işlem tamamlandı':'İşletme bilgileri birlikte alınıyor';$('.collector-count',collector).textContent=count;$('.collector-state',collector).textContent=count===3?'Liste hazır':t<2.7?'Arama hazır':'Toplu toplanıyor';$('.collector-live',collector).lastChild.textContent=count===3?' Tamamlandı':t<2.7?' Hazır':' Toplanıyor';$('.collector-progress>div>i',collector).style.width=count/3*100+'%';rows.forEach((row,i)=>{const a=e(t,i<2?4.7:6.9);alpha(row,(.08+.92*a)*out);reveal($('span',row),e(t,i<2?5.3:7.5));alpha($('em',row),e(t,i<2?6.1:8.2)*out)});alpha($('.collector-bottom',collector),e(t,9.5)*out)}})}
 // 7. Contact: resolve fields in place, then retain the complete profile for reading.
 const profile=$('.contact-profile');if(profile){const fields=all('.profile-field',profile);M.create(profile,{duration:12000,staticAt:9500,render:t=>{const out=fade(t,11.2);stage(profile,t<1.5?'identity':t<6.8?'fields':'ready');fields.forEach((field,i)=>{const a=e(t,1.5+i*1.25,.65);alpha(field,(.18+.82*a)*out);reveal($('.profile-field-copy',field),a);const badge=field.lastElementChild;alpha(badge,e(t,2.2+i*1.25)*out);field.classList.toggle('profile-field-active',t>1.5+i*1.25&&t<2.7+i*1.25)});profile.style.setProperty('--identity-resolve',String(e(t,.25)))}})}
 // 9. Setup: package -> toolbar; real region controls; actual downloadable example.
 const guide=$('.workflow-scenes');if(guide){const scenes=all('[data-workflow-scene]',guide),timelines=[];scenes.forEach((root,i)=>timelines.push(M.create(root,{duration:i===0?11000:i===1?12000:11500,staticAt:8500,enabled:i===0,render:t=>{const out=fade(t,i===1?11:10.3);stage(root,t<3?'prepare':t<6.5?'configure':'ready');if(i===0){alpha($('.install-file',root),e(t,.7)*out);const path=$('.install-guide-path path',root);path.setAttribute('pathLength','1');path.style.strokeDasharray='1';path.style.strokeDashoffset=1-e(t,2.4,1.8);alpha(path,out);$('.install-browser-toolbar b',root).classList.toggle('toolbar-extension-active',t>3.8&&t<8.7);alpha($('.install-browser-panel',root),e(t,4.8)*out)}else if(i===1){const a=e(t,1,2);$('.target-area',root).style.clipPath=`inset(0 ${(1-a)*100}% 0 0)`;alpha($('.target-point',root),e(t,3.1)*out);all('.target-fields>div',root).forEach((f,n)=>{f.classList.toggle('setup-field-active',t>3.5+n*1.7&&t<5.1+n*1.7);alpha(f,.45+.55*e(t,3.5+n*1.7))});alpha($('.target-hint',root),e(t,7.2)*out)}else{all('#workflow-records>div',root).forEach(v=>alpha(v,e(t,1.9)*out));alpha($('.workflow-download',root),e(t,4.6)*out);alpha($('.workflow-file-receipt',root),e(t,6.4)*out)}}})));
  const browser=$('.install-browser',guide),route=$('.install-guide-path path',guide);
  const alignRoute=()=>{const r=browser.getBoundingClientRect();if(!r.width||!r.height)return;const file=$('.install-file',guide).getBoundingClientRect(),icon=$('.install-browser-toolbar b',guide).getBoundingClientRect();const panel=$('.install-browser-panel',guide).getBoundingClientRect(),x=(file.right-r.left)/r.width*400,y=(file.top+file.height*.5-r.top)/r.height*220,tx=(icon.left+icon.width*.5-r.left)/r.width*400,ty=(icon.top+icon.height*.5-r.top)/r.height*220,lx=(panel.left-r.left)/r.width*400-10,by=Math.min(212,(panel.bottom-r.top)/r.height*220+10),rx=393;route.setAttribute('d',`M${x} ${y}H${lx}V${by-8}Q${lx} ${by} ${lx+8} ${by}H${rx-8}Q${rx} ${by} ${rx} ${by-8}V${ty+8}Q${rx} ${ty} ${rx-8} ${ty}H${tx}`)};
  new ResizeObserver(alignRoute).observe(browser);alignRoute();
  const choose=()=>{const index=scenes.findIndex(v=>!v.hidden);timelines.forEach((s,i)=>s.enable(i===index))};all('.step').forEach(b=>b.addEventListener('click',choose));choose();
 }
 // 10. CSV: headers establish the schema, batch records arrive, then a quiet export hold.
 const csv=$('.output-window');if(csv){const rows=all('tbody tr',csv),headers=all('thead th',csv),button=$('.output-download',csv);M.create(csv,{duration:13000,staticAt:10500,render:t=>{const out=fade(t,12.2);stage(csv,t<3?'columns':t<6.8?'batch':'ready');headers.forEach((h,i)=>h.classList.toggle('csv-column-active',t>1+i*.45&&t<1.8+i*.45));rows.forEach(row=>{alpha(row,(.1+.9*e(t,3.9))*out);all('th,td',row).forEach((cell,i)=>cell.classList.toggle('csv-cell-resolved',t>4.2+i*.42))});$('.output-build-line i',csv).style.width=e(t,3.8,2.7)*100+'%';button.classList.toggle('csv-export-ready',t>7.2&&t<12)}});
  all('[data-demo-download],#download-demo').forEach(b=>b.addEventListener('click',()=>{csv.classList.add('csv-downloaded');setTimeout(()=>csv.classList.remove('csv-downloaded'),2200)}));
 }
 // 11. Closing: authored depth and cadence; keep the central text area visually quiet.
 const closing=$('.closing');if(closing){const pins=all('.closing-place',closing);pins.forEach(p=>p.style.animation='none');M.create(closing,{ambient:true,duration:24000,staticAt:11000,render:t=>{pins.forEach((pin,i)=>{const local=(t+i*1.85)%24,a=e(local,1.1,.55)*fade(local,9.5,1.5);pin.style.opacity=String(a*(i%3===0?.22:.36));pin.style.transform=`translateY(${(1-a)*8}px) scale(${(.75+i%3*.16)*(.94+.06*a)})`;pin.style.filter=`blur(${i%3===0?1.4:.45}px)`})}})}
})();

;
/* Shared navigation. Stable panel geometry, backdrop, focus containment and Escape. */
(() => {
 const button=document.querySelector('.menu-toggle'),panel=document.querySelector('.menu-panel'),backdrop=document.querySelector('.menu-backdrop');if(!button||!panel)return;
 const header=document.querySelector('.header');let opened=false,previous;
 const affected=[...document.querySelectorAll('main,body>footer')];
 function set(open){opened=open;header.classList.toggle('menu-open',open);document.body.classList.toggle('navigation-open',open);panel.inert=!open;panel.setAttribute('aria-hidden',String(!open));button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'Menüyü kapat':'Menüyü aç');affected.forEach(el=>el.inert=open);if(open){previous=document.activeElement;requestAnimationFrame(()=>panel.querySelector('a').focus({preventScroll:true}))}else if(previous&&panel.contains(document.activeElement))button.focus({preventScroll:true})}
 button.addEventListener('click',()=>set(!opened));backdrop?.addEventListener('click',()=>set(false));panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>set(false)));
 document.addEventListener('keydown',ev=>{if(!opened)return;if(ev.key==='Escape'){ev.preventDefault();set(false);button.focus();return}if(ev.key==='Tab'){const links=[button,...panel.querySelectorAll('a,button')].filter(el=>!el.disabled);const at=links.indexOf(document.activeElement),next=ev.shiftKey?(at<=0?links.length-1:at-1):(at+1)%links.length;ev.preventDefault();links[next].focus()}});
 addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>20),{passive:true});set(false);
})();

;
/* Two independent authored text tracks. State messages cannot restart an active word. */
(() => {
 const shell=document.querySelector('[data-motion=hero]'),target=document.querySelector('.hero-type'),heading=document.querySelector('.hero-slogan');if(!shell)return;const reduced=matchMedia('(prefers-reduced-motion:reduce)');let sectorWord='',sectorTimer=0,sloganTimer=0,visible=true,blocked=false;
 const sectors=word=>{if(word===sectorWord)return;sectorWord=word;clearTimeout(sectorTimer);if(!target)return;if(reduced.matches){target.textContent=word;return}let i=0;target.textContent='';target.classList.add('is-typing');function tick(){if(blocked||document.hidden){sectorTimer=setTimeout(tick,100);return}target.textContent=word.slice(0,++i);if(i<word.length)sectorTimer=setTimeout(tick,60);else target.classList.remove('is-typing')}tick()};
 new MutationObserver(()=>sectors(shell.dataset.sector||'Kuaförler')).observe(shell,{attributes:true,attributeFilter:['data-sector']});sectors(shell.dataset.sector||'Kuaförler');
 if(!heading)return;const lines=[heading.querySelector('.slogan-first'),heading.querySelector('.slogan-second')],phrases=[['İşletmeler orada.','Veri burada.'],['Bir arama yapın.','Listeniz oluşsun.'],['Bölgenizi seçin.','İşletmeleri bulun.'],['Tek tek aramayın.','Topluca listeleyin.']];let index=0,phase='hold',chars=0,elapsed=0,last=performance.now();
 function paint(count){const words=phrases[index];lines[0].textContent=words[0].slice(0,count);lines[1].textContent=words[1].slice(0,Math.max(0,count-words[0].length))}
 function run(){clearTimeout(sloganTimer);const now=performance.now(),dt=Math.min(100,now-last);last=now;if(!reduced.matches&&visible&&!blocked&&!document.hidden){elapsed+=dt;if(phase==='hold'&&elapsed>6000){phase='erase';elapsed=0;chars=phrases[index].join('').length}if(phase==='erase'&&elapsed>24){elapsed=0;paint(--chars);if(chars<=0){index=(index+1)%phrases.length;phase='type';chars=0}}if(phase==='type'&&elapsed>55){elapsed=0;paint(++chars);if(chars>=phrases[index].join('').length){phase='hold';elapsed=0}}heading.classList.toggle('slogan-writing',phase!=='hold')}sloganTimer=setTimeout(run,40)}
 function reset(){if(reduced.matches){clearTimeout(sloganTimer);index=0;phase='hold';paint(100);heading.classList.remove('slogan-writing');if(target)target.textContent=sectorWord}else{last=performance.now();run()}}new IntersectionObserver(es=>visible=es[0].isIntersecting,{threshold:.2}).observe(heading);document.addEventListener('veriburada:onboarding-open',()=>blocked=true);document.addEventListener('veriburada:onboarding-close',()=>blocked=false);document.addEventListener('visibilitychange',()=>{last=performance.now()});reduced.addEventListener('change',reset);reset();
})();
