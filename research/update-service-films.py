from pathlib import Path
from bs4 import BeautifulSoup
root=Path(__file__).resolve().parent.parent
for path in [root/'public/index.html',root/'research/home-services-section.html']:
 s=BeautifulSoup(path.read_text(encoding='utf-8'),'html.parser')
 monthly=s.select_one('.service-monthly')
 monthly.select_one('h3').string='Yeni açılan işletmeleri bulun.'
 monthly.select_one('.service-offering-copy p').string='Bölgenizde yeni açılan işletmelerin listesini her ay alın.'
 monthly.select_one('.service-link').string='Yeni işletme listesi alın'
 monthly.select_one('.service-monthly-note').decompose()
 art=monthly.select_one('.service-art');art['class'].append('service-film');art['data-service-film']='monthly'
 art['aria-hidden']='true'
 holder=BeautifulSoup('<div class="service-new-list"><div class="service-new-list-top"><strong>Yeni açılan işletmeler</strong><span class="service-new-period">1. ay</span></div><div class="service-new-row"><span>Moda Kahve</span><b>Yeni</b></div><div class="service-new-row"><span>Ada Kuaför</span><b>Yeni</b></div></div>','html.parser')
 art.append(holder.select_one('div'))
 discovery=s.select_one('.service-discovery .service-art');discovery['class'].append('service-film');discovery['data-service-film']='discovery'
 result=BeautifulSoup('<div class="service-discovery-result"><strong>İşletme listeniz</strong><div><span>Moda Kuaför</span><b>✓</b></div><div><span>Makas Saç Tasarım</span><b>✓</b></div></div>','html.parser')
 discovery.append(result.select_one('div'))
 path.write_text(str(s),encoding='utf-8')
p=root/'public/landing-refinements.js';s=p.read_text(encoding='utf-8');needle=" const requestedCredit="
at=s.index(needle)
s=s[:at]+''' // Two short service films: an area search and a new-business list each month.
 document.querySelectorAll('[data-service-film]').forEach(film=>{if(!M)return;const monthly=film.dataset.serviceFilm==='monthly';film._scene=M.create(film,{duration:monthly?21000:14000,staticAt:monthly?9000:9000,render:t=>{if(monthly){const month=Math.min(2,Math.floor(t/7)),names=[['Moda Kahve','Ada Kuaför'],['Park Fırın','Form Pilates'],['Ege Dental','Köşe Mutfak']][month];film.querySelectorAll('.service-month').forEach((el,i)=>el.classList.toggle('current',i===month));film.querySelector('.service-new-period').textContent=(month+1)+'. ay';film.querySelectorAll('.service-new-row').forEach((row,i)=>{row.querySelector('span').textContent=names[i];const a=M.ease(((t%7)-.5-i*.28)/.55);row.style.opacity=String(.15+.85*a);row.style.transform='translateY('+((1-a)*5)+'px)'})}else{const result=film.querySelector('.service-discovery-result'),a=M.ease((t-4)/.8)*(1-M.smooth((t-12.5)/1));result.style.opacity=String(a);result.style.transform='translateY('+((1-a)*8)+'px)';film.querySelector('.service-search-card').style.opacity=String(1-a);film.querySelectorAll('.service-map-pin').forEach((pin,i)=>{const v=M.ease((t-.8-i*.6)/.6);pin.style.opacity=String(v);pin.style.transform='translateY('+((1-v)*7)+'px)'})}}})});
'''+s[at:];p.write_text(s,encoding='utf-8')
