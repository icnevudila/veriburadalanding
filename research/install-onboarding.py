from pathlib import Path
from bs4 import BeautifulSoup
p=Path('public/index.html');s=BeautifulSoup(p.read_text(encoding='utf-8'),'html.parser')
for selector,label in [('.header .nav-cta','Ücretsiz dene'),('.hero .primary','Ücretsiz ara'),('.closing .button','Ücretsiz ara')]:
 el=s.select_one(selector);el['data-onboarding']='';el['href']='#ornek-liste';el.clear();el.append(label+' ');span=s.new_tag('span');span.string='↗';el.append(span)
p.write_text(str(s),encoding='utf-8')
p=Path('research/build-landing.py');s=p.read_text().replace("'motion-upgrade.css']","'motion-upgrade.css','onboarding.css']").replace("'motion-upgrade.js']","'motion-upgrade.js','onboarding.js']");p.write_text(s)
