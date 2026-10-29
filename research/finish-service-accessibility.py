from pathlib import Path
from bs4 import BeautifulSoup
root=Path(__file__).resolve().parent.parent
for name in ['public/index.html','research/home-services-section.html','research/service-films-crafted.html']:
 p=root/name;s=BeautifulSoup(p.read_text(encoding='utf-8'),'html.parser')
 first=s.select_one('.service-discovery');monthly=s.select_one('.service-monthly')
 for article,text in [(first,'İl, ilçe ve sektör seçin. Veri Burada işletme bilgilerini hazırlayıp listenizi hesabınıza iletsin.'),(monthly,'Seçtiğiniz bölgedeki yeni açılan işletmelerin listesini her ay alın.')]:
  old=article.select_one('p.sr-only')
  if not old:
   paragraph=s.new_tag('p',attrs={'class':'sr-only'});paragraph.string=text;article.select_one('.service-offering-copy').append(paragraph)
 art=first.select_one('[data-service-cinema]')
 if not art.select_one('.sc-map-credit'):
  credit=s.new_tag('a',attrs={'class':'sc-map-credit','href':'https://www.openstreetmap.org/copyright','target':'_blank','rel':'noopener noreferrer','tabindex':'-1'});credit.string='© OpenStreetMap contributors';art.append(credit)
 p.write_text(str(s),encoding='utf-8')
p=root/'public/service-films.js';s=p.read_text(encoding='utf-8').replace('ease(local,1.5+i*.35,.8)','ease(local,.5+i*.35,.8)').replace('ease(local,3.1,.6)','ease(local,2.1,.6)');p.write_text(s,encoding='utf-8')
