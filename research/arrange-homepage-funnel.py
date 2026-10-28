"""Keep the homepage narrative in a single, explicit order."""
from pathlib import Path
from bs4 import BeautifulSoup

p=Path('public/index.html')
s=BeautifulSoup(p.read_text(encoding='utf-8'),'html.parser')
main=s.select_one('main')
order=['.hero','.brand-evidence','.product-facts','#nasil-calisir','#baglanti-akisi','#ornek-liste','#ozellikler','#fiyatlar','.faq-section','.closing']
sections=[main.select_one(':scope > '+selector) for selector in order]
assert all(sections), 'A required funnel section is missing'
assert len(main.find_all('section',recursive=False))==len(sections), 'Preserve unexpected sections before rearranging'
for section in sections:
    main.append(section.extract())
s.select_one('#connection-heading').string='İhtiyacınız olan bilgiler, tek listede.'
s.select_one('.connection-heading > p').string='Konum ve sektör seçiminiz, düzenli bir işletme listesine dönüşsün.'
s.select_one('.connection-footer > span').string='İşletme bilgileri sizin için bir araya gelsin.'
s.select_one('#ornek-liste .output-heading h2').string='Hazırlanan listeyi inceleyin.'
s.select_one('#ornek-liste .output-heading p').string='İşletme adı, iletişim bilgileri ve konum. Düzenli sütunlarda, tek dosyada.'
s.select_one('.output-table-scroll')['aria-label']='Örnek işletme listesi'
p.write_text(str(s),encoding='utf-8')
print('Homepage funnel: service, process, deliverable, use, package, questions, signup')
