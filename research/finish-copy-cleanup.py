from pathlib import Path
from bs4 import BeautifulSoup
p=Path('public/index.html');s=BeautifulSoup(p.read_text(encoding='utf-8'),'html.parser')
for x in s.select('.flow-scene text'):
 if x.get_text(strip=True)=='Üç ayrı arama. Tek bir akış.':x.decompose()
for x in s.select('.plan-label,.recommended-label,.price-card>p'):x.decompose()
el=s.select_one('.closing h2');el.clear();el.append(BeautifulSoup('Ücretsiz aramanızı<br/><span>başlatın.</span>','html.parser'))
p.write_text(str(s),encoding='utf-8')
p=Path('public/site.js');s=p.read_text(encoding='utf-8').replace('Hedef bölgenizi ve sektörünüzü seçin. Bir sonraki görüşmeniz için işletmeleri tek listede toplayın.','Seçtiğiniz bölgedeki işletmeleri telefon, adres ve web bilgileriyle listeleyin.').replace('Hizmetlerinize ihtiyaç duyabilecek işletmeleri keşfedin. Bölge ve sektöre göre kendi araştırma listenizi oluşturun.','Ajansınızın araştırdığı işletmeleri sektöre ve bölgeye göre filtreleyin.').replace('Bölgenizdeki işletmeleri tanıyın. Tedarikçi, iş ortağı veya potansiyel müşterilerinizi aynı listede inceleyin.','Belirli bir ilçedeki işletmeleri konum ve iletişim bilgileriyle görüntüleyin.');p.write_text(s,encoding='utf-8')
p=Path('public/onboarding.js');s=p.read_text(encoding='utf-8');s=s.replace("if(draft.fields.includes('website'))html+=r.website?", "if(draft.fields.includes('website')&&r.website&&result?.demo)html+=`<span>${icon('globe')}<span>${esc(new URL(r.website).hostname)} (örnek)</span></span>`;else if(draft.fields.includes('website'))html+=r.website?");p.write_text(s,encoding='utf-8')
