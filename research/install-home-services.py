from pathlib import Path
from bs4 import BeautifulSoup
root=Path(__file__).resolve().parent.parent
p=root/'public/index.html';s=BeautifulSoup(p.read_text(encoding='utf-8'),'html.parser')
old=s.select_one('#hizmetler')
if old:old.decompose()
section=BeautifulSoup((root/'research/home-services-section.html').read_text(encoding='utf-8'),'html.parser').select_one('section')
s.select_one('#nasil-calisir').insert_before(section)
nav=s.select_one('.header nav')
if nav and not nav.select_one('a[href="#hizmetler"]'):
 a=s.new_tag('a',href='#hizmetler');a.string='Hizmetler';nav.insert(0,a)
group=s.select_one('.menu-group')
if group and not group.select_one('a[href="#hizmetler"]'):
 a=s.new_tag('a',href='#hizmetler');a.string='Hizmetlerimiz';group.select_one('p').insert_after(a)
p.write_text(str(s),encoding='utf-8')
print('Inserted the two-service overview directly before how-it-works')
