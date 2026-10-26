from bs4 import BeautifulSoup
from pathlib import Path
p=Path('public/index.html')
s=BeautifulSoup(p.read_text(encoding='utf-8'),'html.parser')
def frag(html):return BeautifulSoup(html,'html.parser')
if not s.select_one('.final-edition'):
 s.body['class']=s.body.get('class',[])+['final-edition']
 # Deliberate narrative order; each section has a separate job.
 film=s.select_one('.film-section');film.extract()
 features=s.select_one('#ozellikler');features.insert_after(film)
 workflow=s.select_one('.workflow');workflow.extract();workflow['id']='kurulum-rehberi'
 guide=frag('<details class="setup-guide"><summary><span><b>İlk kez mi kullanıyorsunuz?</b><small>Kurulumdan ilk listeye, adım adım.</small></span><span class="setup-guide-label">Kurulum rehberi <i>+</i></span></summary></details>').details
 guide.append(workflow);film.select_one('.wrap').append(guide)
 film['id']='nasil-calisir'
 film.select_one('.film-heading')['id']='urun-filmi'
 film.select_one('.film-heading h2').clear();film.select_one('.film-heading h2').append(frag('Aramanızı seçin.<br/>Gerisini akışa bırakın.'))
 film.select_one('.film-heading .eyebrow').string='12 SANİYEDE MAPBOT'
 film.select_one('.film-heading>p').clear();film.select_one('.film-heading>p').append(frag('Bir bölge, bir sektör, bir liste.<br/>Nasıl çalıştığını hareket halinde görün.'))
 # Three capabilities; export is demonstrated in the actual output preview below.
 s.select_one('.export-card').decompose()
 detail=s.select_one('.details-card')
 detail.append(frag('<div class="data-field-list"><span>PROFİLDE YER ALAN BİLGİLER</span><ul><li>İşletme adı ve türü</li><li>Telefon ve web sitesi</li><li>İl, ilçe ve açık adres</li><li>Konum koordinatları</li><li>Puan ve yorum sayısı</li></ul><small>Alanların doluluğu işletme profiline bağlıdır.</small></div>'))
 s.select_one('#ozellikler .section-heading h2').clear();s.select_one('#ozellikler .section-heading h2').append(frag('Araştırmaya daha az zaman.<br/>Bağlantı kurmaya daha çok.'))
 s.select_one('#ozellikler .section-heading p').string='Kimlerle çalışmak istediğinizi siz belirleyin. Bilgileri MapBot bir araya getirsin.'
 # Output sample is a useful structured preview, with no fabricated contact values.
 sample=s.select_one('.sample-section');sample.clear();sample['id']='ornek-liste'
 sample.append(frag('''<div class="output-heading"><div><span class="eyebrow">ELİNİZDE NASIL BİR VERİ OLACAK?</span><h2>İsimlerin ötesinde.<br/>Çalışmaya hazır bir liste.</h2></div><div><p>İşletme adı, iletişim bilgileri ve konum.<br/>Ayrı sekmeler yerine, düzenli sütunlar.</p><a href="https://www.veriburada.com/listeler" class="output-link">Gerçek örnek listeleri inceleyin <span>↗</span></a></div></div><div class="output-window"><div class="output-toolbar"><span class="output-file-icon">↳</span><div><strong>işletme-listem.csv</strong><small>Beyoğlu / Mimarlık ofisleri</small></div><span class="output-format">CSV</span><button class="output-download" type="button" data-demo-download>↓ Örneği indir</button></div><div class="output-table-scroll" tabindex="0" role="region" aria-label="Yatay kaydırılabilir temsili işletme listesi"><table><caption class="sr-only">Temsili işletme kayıtları. Gerçek iletişim bilgileri içermez.</caption><thead><tr><th scope="col">İşletme adı</th><th scope="col">İşletme türü</th><th scope="col">Telefon</th><th scope="col">Web sitesi</th><th scope="col">Konum</th></tr></thead><tbody><tr><th scope="row"><i class="output-avatar">A</i>Atölye Mimarlık</th><td>Mimarlık ofisi</td><td><span class="output-empty">—</span></td><td><span class="output-empty">—</span></td><td>Beyoğlu, İstanbul</td></tr><tr><th scope="row"><i class="output-avatar">F</i>Form Tasarım</th><td>Mimarlık ofisi</td><td><span class="output-empty">—</span></td><td><span class="output-empty">—</span></td><td>Beyoğlu, İstanbul</td></tr><tr><th scope="row"><i class="output-avatar">S</i>Studio Mimarlık</th><td>Mimarlık ofisi</td><td><span class="output-empty">—</span></td><td><span class="output-empty">—</span></td><td>Beyoğlu, İstanbul</td></tr></tbody></table></div><div class="output-caption"><span><i></i> 3 temsili kayıt</span><small>İletişim alanları örnekte boş bırakılmıştır.</small><span class="output-scroll-hint">Kaydırın →</span></div></div>'''))
 # A complete duration choice, clear total cost, no invented feature differences.
 pricing=s.select_one('.pricing-grid');template=pricing.select_one('.price-card')
 third=BeautifulSoup(str(template),'html.parser').article
 pricing.select('.price-card')[0].insert_after(third)
 plans=[('1','499','499','Kısa bir araştırma için.','BAŞLANGIÇ'),('3','999','333','İlk sonuçların devamı için.','İLK ADIMIN ÖTESİ'),('6','1.499','249,83','Düzenli müşteri araştırması için.','DEVAMLILIK'),('12','2.499','208,25','Yıl boyu keşfetmek için.','UZUN VADE')]
 for card,(months,total,monthly,desc,label) in zip(pricing.select('.price-card'),plans):
  card['data-plan']=months
  if months=='6':card['class']=list(dict.fromkeys(card.get('class',[])+['selected-plan']))
  card.select_one('.plan-label').string=label;card.h3.string=months+' aylık';card.select_one(':scope>p').string=desc
  card.select_one('.price').clear();card.select_one('.price').append(frag(f'₺{total}<span>/ {months} ay toplam</span>'))
  card.select_one('.price').insert_after(frag(f'<div class="monthly-equivalent">Aylık karşılığı <strong>₺{monthly}</strong></div>'))
  card.ul.clear()
  for line in ['MapBot eklentisi','Sınırsız işletme toplama',months+' ay kullanım lisansı','CSV olarak indirme']:
   li=s.new_tag('li');li.string=line;card.ul.append(li)
  if card.select_one('.recommended-label'):card.select_one('.recommended-label').string='DÜZENLİ KULLANIM İÇİN'
 pricing.insert_before(frag('<div class="plan-picker" role="group" aria-label="Kullanım süresi seçin">'+''.join(f'<button type="button" data-plan-choice="{m}" aria-pressed="{"true" if m=="6" else "false"}">{m} ay</button>' for m,*_ in plans)+'</div>'))
 note=s.select_one('.pricing-note');note.clear();note.append(frag('Tüm paketlerde aynı MapBot özellikleri. Süreyi siz seçin.<br/><span>Tek seferlik lisans bedeli · Aktivasyon 24 saat içinde · İade edilmez</span><br/><a href="https://www.veriburada.com/pricing">Satın alma koşullarını inceleyin ↗</a>'))
 s.select_one('.pricing-section .section-heading p').string='Aynı özellikler. İhtiyacınıza göre 1, 3, 6 veya 12 ay kullanım.'
 # Plain FAQ wording, usable reading sizes and no open-state surprise.
 for d in s.select('.faq-list details'):d.attrs.pop('open',None)
 faq=s.select('.faq-list details')[3].p;faq.clear();faq.append(frag('MapBot’u indirip kurulum adımlarını izleyin ve hesabınızı oluşturun. Lisansınız satın alımdan sonra 24 saat içinde aktifleştirilir; e-posta ile bilgilendirilirsiniz. <a href="https://www.veriburada.com/eklenti-indir">Kurulum adımlarını inceleyin ↗</a>'))
 # Remove unused remote-font preconnect; the website uses its own font files.
 for x in s.select('link[rel="preconnect"]'):x.decompose()
 s.head.append(frag('<link rel="stylesheet" href="final.css"/>'))
 s.body.append(frag('<script defer src="final.js"></script>'))
 # Footer gets an explicit next step, rather than another repeated tagline.
 s.select_one('.footer-top>div>p').string='İşletmeleri keşfedin. Yeni bağlantılar kurun.'
 # Semantic metadata, all links are the existing real website destinations.
 s.head.append(frag('<meta property="og:title" content="Veri Burada — Bir sonraki müşteriniz, haritada."/><meta property="og:description" content="MapBot ile işletmeleri keşfedin, iletişim bilgilerini düzenli bir listeye dönüştürün."/><meta property="og:type" content="website"/>'))
p.write_text(str(s),encoding='utf-8')
