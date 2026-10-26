from pathlib import Path
from bs4 import BeautifulSoup
p=Path('public/index.html');s=BeautifulSoup(p.read_text(encoding='utf-8'),'html.parser')
for hub in s.select('.flow-hub'):
 for t in hub.select('text'):t.decompose()
 box=hub.find('rect');x=float(box['x']);y=float(box['y']);size=float(box['width']);im=hub.find('image')
 for k,v in {'x':x+size*.16,'y':y+size*.16,'width':size*.68,'height':size*.68}.items():im[k]=f'{v:g}'
p.write_text(str(s),encoding='utf-8')
