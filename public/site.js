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
