from pathlib import Path
from bs4 import BeautifulSoup
p=Path('public/index.html');s=BeautifulSoup(p.read_text(encoding='utf-8'),'html.parser')
def set_html(sel,html):
 el=s.select_one(sel);el.clear();el.append(BeautifulSoup(html,'html.parser'))
set_html('.hero h1','İşletmeleri arayın.<br/><span>İlk 5’i ücretsiz görün.</span>')
set_html('.hero-copy>p','Bölgeyi ve işletme türünü seçin.<br/> İlk 5 kaydı üye olmadan inceleyin.')
for x in s.select('.hero-note'):x.decompose()
video=s.select_one('#demo-play');video.clear();video.append(BeautifulSoup('<span class="play-icon"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="m9 5 11 7-11 7V5Z"/></svg></span><span>Ürün videosu</span>','html.parser'))
scene=s.select_one('.geo-scene')
if not s.select_one('.hero-demo-query'):
 scene.append(BeautifulSoup('<button class="hero-demo-query" type="button" data-onboarding data-ob-sector="Mimarlık ofisleri" aria-label="Beyoğlu mimarlık ofisleri için ücretsiz ara"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/></svg><span aria-hidden="true"><small>Beyoğlu, İstanbul</small><strong class="hero-typed-sector">Mimarlık ofisleri</strong><i></i></span><b aria-hidden="true">↗</b></button>','html.parser'))
caption=s.select_one('.demo-caption')
if caption:caption.string='Örnek gösterim'
p.write_text(str(s),encoding='utf-8')
p=Path('research/build-landing.py');s=p.read_text().replace("'onboarding.css']","'onboarding.css','hero-revision.css']").replace("'onboarding.js']","'onboarding.js','hero-revision.js']");p.write_text(s)
