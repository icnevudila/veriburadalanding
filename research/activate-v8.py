from pathlib import Path
from bs4 import BeautifulSoup
p=Path('public/index.html');s=BeautifulSoup(p.read_text(encoding='utf-8'),'html.parser')
for el in s.select('source[src],video[data-poster],video[poster],video[data-mobile-poster],noscript picture img,noscript picture source'):
 for attr in ['src','srcset','poster','data-poster','data-mobile-poster']:
  if el.get(attr):el[attr]=el[attr].replace('product-v5-','product-v8-')
profile=s.select_one('.contact-profile');profile.strong.clear();profile.strong.append(BeautifulSoup('Atölye Mimarlık<small>Mimarlık ofisi · Beyoğlu</small>','html.parser'))
for row,value in zip(profile.select(':scope>div'),['+90 (212) ••• •• ••','atolyemimarlik.example','Meşrutiyet Cd., Beyoğlu','Profil puanı ve yorum sayısı']):
 for child in list(row.children):
  if isinstance(child,str) and child.strip():child.replace_with(' '+value+' ');break
s.select_one('#film-description').string='Temsili arayüzde MapBot arama bölgesi ve sektör seçilir. Gerçek Beyoğlu haritasında pinler belirir; işletmenin adres, maskelenmiş telefon ve örnek web alanı gösterilir. Kayıtlar sağ panelde toplanır, düzenli CSV tablosu açılır ve dosya oluşturma bildirimi görünür. Sahne başlangıca dönerek tekrar eder. Gerçek iletişim bilgisi veya canlı ürün kaydı değildir.'
p.write_text(str(s),encoding='utf-8')
