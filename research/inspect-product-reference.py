from pathlib import Path
from bs4 import BeautifulSoup
import urllib.request,zipfile,json,xml.etree.ElementTree as ET
s=BeautifulSoup(urllib.request.urlopen('https://www.veriburada.com/eklenti-indir').read(),'html.parser')
links=[a['href'] for a in s.select('a[href]') if '.zip' in a['href']]
print('ZIP links:',links)
if links:
 urllib.request.urlretrieve(links[0],'research/mapbot-public.zip')
 with zipfile.ZipFile('research/mapbot-public.zip') as z:
  print(json.dumps([n for n in z.namelist() if n.endswith(('.html','.css'))]))
  for n in z.namelist():
   if n.endswith(('.html','.css')):
    target=Path('research/mapbot-reference')/n;target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(z.read(n))
r=ET.parse('research/istanbul-small.osm').getroot();arr=[]
for el in r:
 tags={x.get('k'):x.get('v') for x in el.findall('tag')}
 if tags.get('amenity')=='cafe' and tags.get('name'):
  arr.append({k:v for k,v in tags.items() if k in ['name','phone','contact:phone','website','contact:website','addr:street','addr:housenumber']})
print(json.dumps(arr[:16],ensure_ascii=False))
