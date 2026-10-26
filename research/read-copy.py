from bs4 import BeautifulSoup
from pathlib import Path
s=BeautifulSoup(Path('public/index.html').read_text(encoding='utf-8'),'html.parser')
for x in s.select('h1,h2,h3,.connection-heading p,.film-footnote,.hero-copy>p,.closing-content>p'):
 print(x.name+': '+x.get_text(' ',strip=True))
