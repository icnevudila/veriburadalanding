from pathlib import Path
from bs4 import BeautifulSoup
p=Path('public/index.html');s=BeautifulSoup(p.read_text(encoding='utf-8'),'html.parser')
def frag(html):return BeautifulSoup(html,'html.parser')
s.select_one('.hero h1').clear();s.select_one('.hero h1').append(frag('Bir arama yapın.<br/><span>Listeniz oluşsun.</span>'))
s.select_one('.hero-copy>p').string='Google Haritalar’daki işletmeleri telefon, adres ve web bilgileriyle topluca listeleyin. Araştırmaya daha az, yeni görüşmelere daha çok zaman ayırın.'
s.select_one('.hero h1').insert_after(frag('<div class="hero-sector-line"><span>Aradığınız işletmeler:</span> <strong aria-hidden="true" class="hero-type">Kuaförler</strong><span class="sr-only">Kuaförler, kafeler, klinikler ve diğer sektörler.</span></div>'))
for i,card in enumerate(s.select('.agency-browser')):
 area=card.select_one('.site-preview,.site-empty');area['class']=['site-preview','mini-site','mini-site-'+str(i)]
 title=['Pera Mutfak','Sahil Restoran'][i];domain=['peramutfak.example','sahilrestoran.example'][i];photo=['restaurant','dining'][i]
 area.clear();area.append(frag(f'<div class="mini-site-nav"><b>{title}</b><span>Menü · İletişim</span></div><div class="mini-site-photo"><img src="/media/{photo}.webp" alt="" loading="lazy" width="1100" height="825"/><div><small>{["BEYOĞLU’NDA BİR SOFRA","ŞEHRİN İÇİNDE BİR MOLA"][i]}</small><strong>{["Mevsimden<br>sofranıza.","İyi yemek.<br>Güzel sohbet."][i]}</strong><span>Menüyü keşfedin ↗</span></div></div><div class="mini-site-bottom"><span>{["Mevsimlik menü","Akdeniz mutfağı"][i]}</span><span>Beyoğlu, İstanbul</span></div>'))
 card.select_one('.browser-mini-bar span').string=domain
 # The address stays visible; authored timeline reveals each actual website composition.
 area['class'].append('agency-web-value')
 footer=card.select_one('.site-business');footer.clear();footer.append(frag(f'<strong>{title}</strong><span>+90 (212) 000 10 0{i+1}</span><span>{["Meşrutiyet Cd. No: 12","Kılıçali Paşa Mah. No: 8"][i]} · Beyoğlu</span>'))
s.select_one('.agency-scene')['aria-label']='Örnek ajans araştırması: iki restoranın tasarlanmış web önizlemeleri, telefonları ve adresleri.'
s.select_one('.agency-scene .audience-bottom span').string='Örnek site tasarımları ve kayıtlar'
s.select_one('.agency-scene .audience-bottom b').string='Web ve iletişim bilgileri bir arada'
for i,f in enumerate(s.select('.contact-profile .profile-field-copy')):
 f.string=['+90 (212) 000 10 01','atolyemimarlik.example','Meşrutiyet Cd. No: 12, Beyoğlu','4,8 / 5 · 64 değerlendirme (örnek)'][i]
s.select('.contact-profile .profile-field')[-1].select_one('span:last-child').string='★'
s.select_one('.output-caption small').string='Dolu örnek kayıtlar; gerçek iletişim bilgisi değildir.'
for i,row in enumerate(s.select('.output-window tbody tr')):
 cells=row.select('td');cells[1].string=f'+90 (212) 000 10 0{i+1}';cells[2].string=['atolyemimarlik.example','formtasarim.example','studiomimarlik.example'][i]
s.select_one('a[href="https://www.veriburada.com/listeler"]').string='Örnek listeleri inceleyin ↗'
# Use qualified, useful copy instead of a blanket legal assertion.
faq=s.select('.faq-list details')[-1];faq.select_one('summary').clear();faq.select_one('summary').append(frag('Topladığım bilgileri nasıl kullanmalıyım?<span>+</span>'))
faq.select_one('p').string='İşletme bilgilerinin herkese açık olması, her amaçla kullanılabileceği anlamına gelmez. İletişim kurmadan önce bilgileri doğrulayın; kullanım amacınıza uygun veri koruma ve ticari iletişim kurallarını değerlendirin.'
for text in s.find_all(string=lambda t:t and 'Veri Burada’u' in t):text.replace_with(str(text).replace('Veri Burada’u','Veri Burada’yı'))
p.write_text(str(s),encoding='utf-8')
# Keep the example spreadsheet and CSV transport consistent with the selected sector.
p=Path('public/site.js');js=p.read_text(encoding='utf-8');js=js.replace("data.names.map(name => [name, data.type, 'İstanbul', 'Beyoğlu', '', '', 'Temsili kayıt; gerçek müşteri veya iletişim bilgisi değildir.'])","data.names.map((name,i) => [name, data.type, 'İstanbul', 'Beyoğlu', '+90 (212) 000 10 0'+(i+1), 'isletme-'+(i+1)+'.example', 'Örnek kayıt; gerçek iletişim bilgisi değildir.'])")
p.write_text(js,encoding='utf-8')
p=Path('public/final.js');js=p.read_text(encoding='utf-8').replace("rows[i].querySelector('td').textContent=type;","rows[i].querySelector('td').textContent=type;\n     rows[i].querySelectorAll('td')[1].textContent='+90 (212) 000 10 0'+(i+1);\n     rows[i].querySelectorAll('td')[2].textContent='isletme-'+(i+1)+'.example';")
p.write_text(js,encoding='utf-8')
# Align illustrative number fields in animated map examples.
for name in ['map-demo-base.js','map-demo-runtime.js']:
 p=Path('public')/name;js=p.read_text(encoding='utf-8').replace('+90 (212) ••• •• ••','+90 (212) 000 10 01');p.write_text(js,encoding='utf-8')
