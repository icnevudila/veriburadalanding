from pathlib import Path
from bs4 import BeautifulSoup
p=Path('public/index.html');s=BeautifulSoup(p.read_text(encoding='utf-8'),'html.parser')
def content(sel,text):
 el=s.select_one(sel);el.clear();el.append(BeautifulSoup(text,'html.parser'))
content('.hero h1','Bir sonraki<br/>müşteriniz,<br/><span>haritada.</span>')
content('.hero-copy>p','Google Haritalar’daki işletmeleri bulun. Telefon, adres ve web sitesi bilgilerini tek listede toplayın.')
for sel,label in [('.hero .primary','Listenizi oluşturun'),('.header .nav-cta','Başlayın'),('.closing .button','Listenizi oluşturun')]:
 el=s.select_one(sel);el.clear();el.append(label+' ');span=s.new_tag('span');span.string='↗';el.append(span)
content('.closing h2','Fırsatlar orada.<br/><span>Veri burada.</span>')
content('.closing-content>p','İşletmeleri bölge ve sektöre göre bulun.<br/> Çalışma listenizi MapBot ile oluşturun.')
p.write_text(str(s),encoding='utf-8')
