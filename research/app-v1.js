const $ = (s) => document.querySelector(s);
const header = $('.header');
addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 20), { passive: true });
$('.menu-toggle').addEventListener('click', e => {
  const open = header.classList.toggle('menu-open');
  e.currentTarget.setAttribute('aria-expanded', String(open));
  e.currentTarget.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
});
document.querySelectorAll('.header nav a').forEach(a => a.addEventListener('click', () => {
  header.classList.remove('menu-open'); $('.menu-toggle').setAttribute('aria-expanded', 'false');
}));
const pins = [[23,28],[60,31],[36,53],[76,58],[19,77],[63,82],[45,18],[84,39]];
pins.forEach(([x,y], i) => { const p = document.createElement('span'); p.className='pin'; p.style.cssText=`left:${x}%;top:${y}%;--delay:${i*.43}s`; $('.map-pins').append(p); });
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let count = 24;
if (!reduced) setInterval(() => { count = count >= 128 ? 24 : count + 1; $('#business-count').textContent = count; }, 1800);
const observer = new IntersectionObserver(entries => entries.forEach(e => {if(e.isIntersecting){ e.target.classList.add('visible'); observer.unobserve(e.target);}}), {threshold:.09});
document.querySelectorAll('.reveal').forEach(e => observer.observe(e));
const audience = {
  sales: ['Doğru işletmelerle<br>başlayan bir satış süreci.', 'Hedef bölgenizi ve sektörünüzü seçin. Bir sonraki görüşmeniz için işletmeleri tek listede toplayın.'],
  agency: ['Bir sonraki projeniz,<br>doğru işletmeyle başlar.', 'Hizmetlerinize ihtiyaç duyabilecek işletmeleri keşfedin. Bölge ve sektöre göre kendi araştırma listenizi oluşturun.'],
  local: ['Yakınınızdaki işletmeler.<br>Yeni iş birlikleri.', 'Bölgenizdeki işletmeleri tanıyın. Tedarikçi, iş ortağı veya potansiyel müşterilerinizi aynı listede inceleyin.']
};
const tabs = [...document.querySelectorAll('[data-audience]')];
tabs.forEach((t,i) => {t.addEventListener('click', () => {tabs.forEach(a=>a.setAttribute('aria-selected',String(a===t))); $('#audience-title').innerHTML=audience[t.dataset.audience][0]; $('#audience-copy').textContent=audience[t.dataset.audience][1];}); t.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault(); const next=tabs[(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length];next.focus();next.click();}});});
const steps = [...document.querySelectorAll('.step')];
const headings = ['Yeni bağlantılara açılan<br>küçük bir eklenti.', 'Nerede, kiminle<br>bağlantı kurmak istersiniz?', 'Dağınık bilgilerden,<br>düzenli bir listeye.'];
steps.forEach((s,i)=>s.addEventListener('click',()=>{steps.forEach(a=>a.classList.toggle('active',a===s));$('#step-heading').innerHTML=headings[i];$('.demo-progress>div').style.width=['20%','60%','100%'][i];$('.demo-progress>div').style.animation='none';$('.demo-extension').style.borderColor=i===2?'#20c997':'';}));
document.querySelectorAll('.faq-list details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)document.querySelectorAll('.faq-list details').forEach(other=>{if(other!==d)other.open=false;});}));
const modal = $('.demo-modal'), video = $('#product-video');
$('#demo-play').addEventListener('click',()=>{modal.showModal(); video.play().catch(()=>{});});
$('.modal-close').addEventListener('click',()=>modal.close());
modal.addEventListener('close',()=>video.pause());
modal.addEventListener('click',e=>{if(e.target===modal){const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)modal.close();}});
$('#year').textContent = new Date().getFullYear();
