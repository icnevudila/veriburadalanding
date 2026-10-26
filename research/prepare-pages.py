from pathlib import Path
from bs4 import BeautifulSoup
root=Path('public')
panel='''<button type="button" class="menu-backdrop" aria-label="Menüyü kapat" tabindex="-1"></button><div class="menu-panel" id="site-menu" aria-label="Site menüsü" aria-hidden="true" inert><div class="menu-panel-top"><span>Aradığınız işletmelere giden kısa yol.</span><span>Veri Burada</span></div><div class="menu-grid"><div class="menu-group"><p>ÜRÜNÜ TANIYIN</p><a href="/nasil-calisir/">Nasıl çalışır? <span>↗</span></a><a href="/ozellikler/">Özellikler <span>↗</span></a><a href="/listeler/">Örnek listeler <span>↗</span></a><a href="/pricing/">Fiyatlandırma <span>↗</span></a><a href="/eklenti-indir/">Kurulum rehberi <span>↗</span></a></div><div class="menu-group"><p>İŞİNİZE GÖRE KEŞFEDİN</p><a href="/kullanim-alanlari/satis-ekipleri/">Satış ekipleri <span>↗</span></a><a href="/kullanim-alanlari/ajanslar/">Ajanslar <span>↗</span></a><a href="/kullanim-alanlari/yerel-isletmeler/">Yerel işletmeler <span>↗</span></a><a href="/blog/">Rehberler <span>↗</span></a><a href="/sss/">Sorular ve yanıtlar <span>↗</span></a></div></div><div class="menu-bottom"><a href="/iletisim/">İletişim ↗</a><a href="/hakkimizda/">Hakkımızda</a><a href="/#ornek-liste" data-onboarding>İlk listenizi oluşturun ↗</a></div></div>'''
p=root/'index.html';s=BeautifulSoup(p.read_text(encoding='utf-8'),'html.parser')
for old in s.select('.menu-panel,.menu-backdrop'):old.decompose()
s.body.append(BeautifulSoup(panel,'html.parser'))
s.select_one('.menu-toggle')['aria-controls']='site-menu'
for a in s.select('a[href]'):
 href=a['href']
 if href.startswith('https://www.veriburada.com/'):
  slug=href.split('.com/',1)[1].strip('/');a['href']='/'+slug+'/'
for a in s.select('.header nav a'):
 a['href']={'#nasil-calisir':'/nasil-calisir/','#ozellikler':'/ozellikler/','#fiyatlar':'/pricing/'}.get(a['href'],a['href'])
footer=s.select_one('.footer-top>div:last-child');footer.append(BeautifulSoup('<a href="/sss/">Sık sorulan sorular</a>','html.parser'))
s.select_one('.hero h1')['id']='hero-heading'
p.write_text(str(s),encoding='utf-8')
Path('research/shared-menu.html').write_text(panel,encoding='utf-8')
