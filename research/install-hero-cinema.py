from pathlib import Path
from bs4 import BeautifulSoup
p=Path('public/index.html');s=BeautifulSoup(p.read_text(encoding='utf-8'),'html.parser');demo=s.select_one('#demo-play')
if demo and demo.find_parent(class_='hero'):demo.extract();s.select_one('.film-heading>p').append(demo)
frame=s.select_one('.hero-cinema-screen');frame['role']='img';frame['aria-label']='İşletme pinleri ve bilgileri haritadan düzenli bir listeye dönüşüyor. Temsili ürün gösterimi.'
s.select_one('.hero-cinema').attrs.pop('role',None);s.select_one('.hero-cinema').attrs.pop('aria-label',None)
credit=BeautifulSoup('<a class="hero-map-credit" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap contributors</a>','html.parser').a;s.select_one('.hero-cinema').append(credit)
p.write_text(str(s),encoding='utf-8')
p=Path('research/build-landing.py');s=p.read_text().replace("'hero-revision.css'","'hero-cinema.css'").replace("'hero-revision.js'","'hero-cinema.js'");p.write_text(s)
