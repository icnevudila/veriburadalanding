from pathlib import Path
from bs4 import BeautifulSoup
from PIL import Image
import zipfile
root=Path.cwd();backup=root/'dist'/'before-clarity-funnel-20261028.zip'
with zipfile.ZipFile(backup,'w',zipfile.ZIP_DEFLATED) as z:
 for n in ['index.html','premium.css','premium.js','map-demo.html','map-demo-base.js','map-demo-scene.js','map-demo-runtime.js','demo-player.js','landing.js','landing.css']:
  z.write(root/'public'/n,'public/'+n)
# Use supplied logo files, retaining their original shapes and alpha.
for name,uid in [('brand-bofe','1fecf5a6-a742-43c2-aa66-5457630f6a01'),('brand-ayvazoglu','03fdefc8-ef7e-4868-92b2-8b12cfb9c074'),('brand-mesajify','b96f96ac-a6c9-41a0-b677-c23ba62fda06')]:
 Image.open(Path('C:/Users/TP2/AppData/Local/Temp/codex-clipboard-'+uid+'.png')).save(root/'public/media'/(name+'.webp'),lossless=True)
p=root/'public/index.html';s=BeautifulSoup(p.read_text(encoding='utf-8'),'html.parser')
for el in s.select('.header>.nav-cta,.hero-sector-line'):el.decompose()
s.select_one('.hero-copy>p').string='Hedefinizdeki işletmeleri bulun. Telefon, adres ve web bilgilerini topluca alın.'
# Keep one primary action below the media/copy on mobile.
a=s.select_one('.hero-actions a');a.clear();a.append('İlk listemi oluştur ');sp=s.new_tag('span',attrs={'aria-hidden':'true'});sp.string='↗';a.append(sp)
for selector,txt in [('.connection-section h2','Tek tek aramayın. Topluca listeleyin.'),('#ozellikler>h2','İşletme bilgileri, tek listede.'),('.sample-section h2','Nasıl bir liste alacağınızı görün.')]:
 el=s.select_one(selector)
 if el:el.clear();el.append(txt)
for sel,txt in [('.connection-section .section-copy p','İlinizi ve sektörünüzü seçin. İşletme bilgilerini bir araya getirin.'),('.film-heading p','İl ve sektör seçin. Listenizi oluşturup dışa aktarın.')]:
 el=s.select_one(sel)
 if el:el.clear();el.append(txt)
# Reduce explanatory labels around the same media to one honest caption.
foot=s.select_one('.film-footnote')
if foot:
 foot.clear();foot.append(BeautifulSoup('<span>Örnek kayıtlarla ürün önizlemesi</span><a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap contributors</a>','html.parser'))
hero=s.select_one('.hero-cinema')
if not s.select_one('.hero-media-source'):
 hero.append(BeautifulSoup('<div class="hero-media-source"><span>Örnek kayıtlarla ürün önizlemesi</span><a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap contributors</a></div>','html.parser').div)
if not s.select_one('.brand-evidence'):
 band=BeautifulSoup('''<section class="brand-evidence wrap" aria-label="Markalar"><div class="brand-evidence-logos"><div class="evidence-bofe"><img src="/media/brand-bofe.webp" alt="Bofe" width="246" height="90" loading="lazy"></div><div class="evidence-mesajify"><img src="/media/brand-mesajify.webp" alt="" width="256" height="73" loading="lazy"><span>Mesajify</span></div><div class="evidence-ayvazoglu"><img src="/media/brand-ayvazoglu.webp" alt="Ayvazoğlu İnşaat" width="667" height="374" loading="lazy"></div></div></section><section class="product-facts wrap" aria-label="Araştırma seçenekleri"><div><strong>81</strong><span>İl seçeneği</span></div><div><strong>5</strong><span>Seçilebilir bilgi alanı</span></div><div><strong>Tek</strong><span>Toplu işlem akışı</span></div></section>''','html.parser')
 s.select_one('.hero').insert_after(band)
closing=s.select_one('.closing-content p')
if closing:closing.clear();closing.append('İlinizi ve sektörünüzü seçerek ilk listenize başlayın.')
# The poster is illustrative; title is kept short for the accessible name.
for el in s.select('[data-motion] iframe'):el['title']='Veri Burada ürün önizlemesi'
p.write_text(str(s),encoding='utf-8')
# Leave slogan track alone; remove redundant sector track from the page markup.
p=root/'public/map-demo-base.js';v=p.read_text(encoding='utf-8');v=v.replace('<small>Beyoğlu, İstanbul</small>','<small>İŞLETME ARAMASI</small>').replace('CSV olarak indir','Dışa aktar').replace('<span>CSV</span>','<span>Dışa aktar</span>').replace('5 temsili işletme','5 örnek işletme');p.write_text(v,encoding='utf-8')
p=root/'public/map-demo-scene.js';v=p.read_text(encoding='utf-8');old="q('.query').textContent=t>25.25?'':currentSector.query.slice(0,Math.floor(currentSector.query.length*search));";assert old in v;v=v.replace(old,"const queryText='İstanbul '+currentSector.query.toLocaleLowerCase('tr');q('.query').textContent=t>25.25?'':queryText.slice(0,Math.floor(queryText.length*search));");p.write_text(v,encoding='utf-8')
p=root/'public/map-demo.html';v=BeautifulSoup(p.read_text(encoding='utf-8'),'html.parser')
for el in v.select('.copyright,.example'):el.decompose()
# When embedded the surrounding page supplies the attribution immediately below
# the media. The standalone demo keeps a visible linked source notice.
body=v.body or v
source=BeautifulSoup('<a class="standalone-map-source" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap contributors</a>','html.parser').a
body.append(source)
p.write_text(str(v),encoding='utf-8')
p=root/'public/map-demo-runtime.js';v=p.read_text(encoding='utf-8');v=v.replace(" const sectors=["," document.documentElement.classList.toggle('embedded-demo',window.parent!==window);\n const sectors=[",1);p.write_text(v,encoding='utf-8')
print('Updated copy, primary CTA, logo band, factual numbers and film labels. Backup:',backup)
