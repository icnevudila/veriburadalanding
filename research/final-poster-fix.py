from pathlib import Path
from bs4 import BeautifulSoup,NavigableString
p=Path('public/index.html');s=BeautifulSoup(p.read_text(encoding='utf-8'),'html.parser')
for v in s.select('video'):v['poster']=v['data-poster']
for br in s.select('p br'):
 if br.next_sibling and isinstance(br.next_sibling,NavigableString) and not str(br.next_sibling).startswith(' '):br.next_sibling.replace_with(' '+str(br.next_sibling))
p.write_text(str(s),encoding='utf-8')
