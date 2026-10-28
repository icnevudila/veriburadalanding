from pathlib import Path
from bs4 import BeautifulSoup
root=Path(__file__).resolve().parent.parent
p=root/'public/index.html';s=BeautifulSoup(p.read_text(encoding='utf-8'),'html.parser')
if not s.select_one('.research-outcome'):
 section=BeautifulSoup('''<section class="research-outcome wrap" aria-labelledby="outcome-heading"><div class="outcome-copy"><h2 id="outcome-heading">Aramadan,<br>görüşmeye.</h2><p>Hangi bölgede, hangi işletmelerle çalışmak istiyorsunuz?</p><p>Veri Burada ile işletmeleri bulun. Telefon, adres ve web bilgilerini tek listede inceleyin; görüşmelerinize hazırlanın.</p><a class="outcome-link" href="#ornek-liste" data-onboarding>İlk listemi oluştur <span aria-hidden="true">↗</span></a></div><div class="outcome-art"><img class="outcome-photo" src="/media/office.webp" alt="Aydınlık bir çalışma alanı; temsili fotoğraf" width="1100" height="825" loading="lazy"><div class="outcome-list"><div class="outcome-list-top"><img src="/brand-emblem-small.webp" width="32" height="32" alt=""><strong>Görüşmeye hazır listeniz</strong></div><div><span>01</span><p><b>Atölye Mimarlık</b><small>Mimarlık ofisi · Beyoğlu</small></p><i>✓</i></div><div><span>02</span><p><b>Form Tasarım</b><small>İç mimarlık · Beyoğlu</small></p><i>✓</i></div><div><span>03</span><p><b>Studio Mimarlık</b><small>Mimarlık ofisi · Beyoğlu</small></p><i>✓</i></div><footer>Telefon · Web sitesi · Adres <span>Temsili kayıtlar</span></footer></div></div></section>''','html.parser').section
 s.select_one('.benefit-strip').insert_after(section)
profile=s.select_one('.contact-profile')
if not profile.select_one('.profile-cover'):
 profile.insert(0,BeautifulSoup('<div class="profile-cover"><img src="/media/architecture.webp" alt="" width="1100" height="825" loading="lazy"><span>İşletme profili · Örnek kayıt</span></div>','html.parser').div)
# The original scene markup and choreography stay in the repository.
for name,heading,desc in [('sales','Bir sonraki görüşmenizi planlayın.','Bölgenizdeki işletmeleri iletişim bilgileriyle yan yana inceleyin.'),('agency','Tekliften önce işletmeyi tanıyın.','Web sitesi ve iletişim alanlarıyla araştırmanıza bir başlangıç noktası oluşturun.'),('local','Yakınınızdaki işletmeleri görün.','Seçtiğiniz bölgeyi, işletme türlerini ve iletişim bilgilerini birlikte inceleyin.')]:
 scene=s.select_one('.'+name+'-scene')
 scene['aria-label']=desc+' Temsili kayıtlar.'
 if not scene.select_one('.composition-caption'):
  caption=s.new_tag('div',attrs={'class':'composition-caption'});b=s.new_tag('strong');b.string=heading;caption.append(b);span=s.new_tag('span');span.string=desc;caption.append(span);scene.append(caption)
p.write_text(str(s),encoding='utf-8')
