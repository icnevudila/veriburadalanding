from pathlib import Path
from bs4 import BeautifulSoup
root=Path(__file__).resolve().parent.parent
p=root/'public/index.html';s=BeautifulSoup(p.read_text(encoding='utf-8'),'html.parser')
old=s.select_one('#hizmetler');new=BeautifulSoup((root/'research/service-films-crafted.html').read_text(encoding='utf-8'),'html.parser').select_one('section')
old.replace_with(new);p.write_text(str(s),encoding='utf-8')
(root/'research/home-services-section.html').write_text(str(new),encoding='utf-8')
p=root/'public/landing-refinements.js';s=p.read_text(encoding='utf-8');a=s.index(' // Two product films with one clear narrative each.');b=s.index(' const requestedCredit=',a);s=s[:a]+s[b:];p.write_text(s,encoding='utf-8')
p=root/'research/build-landing.py';s=p.read_text(encoding='utf-8');needle='write_atomic(p,str(s))'
if 'service-films.css?v=' not in s:
 s=s.replace(needle,"for old in s.select('script[src],link[href]'):\n    if 'service-films.' in old.get('src',old.get('href','')):old.decompose()\nif s.select_one('#hizmetler'):\n    s.head.append(s.new_tag('link',rel='stylesheet',href=f'service-films.css?v={version}'))\n    s.head.append(s.new_tag('script',src=f'service-films.js?v={version}',defer=''))\n"+needle)
p.write_text(s,encoding='utf-8')
p=root/'research/prepare-release.py';s=p.read_text(encoding='utf-8').replace("'hero-premium.css']","'hero-premium.css','service-films.js','service-films.css']");p.write_text(s,encoding='utf-8')
