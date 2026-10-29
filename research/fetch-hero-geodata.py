import urllib.request
from pathlib import Path
areas={'kadikoy':(29.024,40.984,29.044,41.001),'cankaya':(32.842,39.905,32.867,39.924),'alsancak':(27.135,38.428,27.155,38.445),'nilufer':(28.975,40.210,29.002,40.230)}
for name,b in areas.items():
 out=Path('research')/('hero-'+name+'.osm')
 if out.exists():print(name,'cached');continue
 req=urllib.request.Request('https://api.openstreetmap.org/api/0.6/map?bbox='+','.join(map(str,b)),headers={'User-Agent':'VeriBurada-LandingMapArtwork/1.0 (+https://www.veriburada.com)'})
 with urllib.request.urlopen(req,timeout=60) as r:out.write_bytes(r.read())
 print(name,out.stat().st_size,flush=True)
