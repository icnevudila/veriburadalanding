from pathlib import Path
import shutil,json,hashlib,zipfile
root=Path(__file__).resolve().parent.parent
dest=root/'dist'/'veriburada-landing'
dest.mkdir(parents=True,exist_ok=True)
files=['index.html','landing.css','landing.js','brand-wordmark.webp','brand-emblem-small.webp','closing-map.svg','favicon.ico','istanbul-map-display-v4.webp','product-v8-desktop.mp4','product-v8-mobile.mp4','product-v8-desktop-poster.jpg','product-v8-mobile-poster.jpg','fonts/inter-latin.woff2','fonts/inter-turkish.woff2','fonts/LICENSE.txt','vendor/leaflet.js','vendor/leaflet.css','vendor/LEAFLET-LICENSE.txt','vendor/ASSET-SOURCES.md']
manifest=[]
previous=dest/'asset-manifest.json'
if previous.exists():
 for entry in json.loads(previous.read_text(encoding='utf-8')):
  if entry['path'] not in files:
   obsolete=(dest/entry['path']).resolve()
   if obsolete.is_relative_to(dest.resolve()) and obsolete.is_file():obsolete.unlink()
for rel in files:
 source=root/'public'/rel;target=dest/rel;target.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(source,target)
 manifest.append({'path':rel,'bytes':target.stat().st_size,'sha256':hashlib.sha256(target.read_bytes()).hexdigest()})
server=(root/'research'/'serve.py').read_text(encoding='utf-8').replace("ROOT = Path(__file__).resolve().parent.parent / 'public'","ROOT = Path(__file__).resolve().parent").replace('4173','4174')
(dest/'preview.py').write_text(server,encoding='utf-8')
(dest/'README.txt').write_text('VERI BURADA LANDING\n\nLocal preview: py -3 preview.py\nOpen http://127.0.0.1:4174/\n\nStatic website, no npm build or account needed. Serve this folder on an HTTP server. preview.py supports video Range requests.\n\nAll fonts, maps, animations and media are local. Install, pricing and sample-library buttons link to existing veriburada.com pages. Product/backend/payment services were not changed or tested end to end. No deployment performed.\n\nSample business records are illustrative and contain no real contact details. Maps: OpenStreetMap attribution retained. Vendor/font licenses included.\n\nCurrent sources and review evidence remain in the parent workspace public/ and research/. Archived rejected media is excluded from this package.\n',encoding='utf-8')
(dest/'asset-manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
archive=root/'dist'/'veriburada-landing.zip'
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED,compresslevel=6) as z:
 for rel in files+['preview.py','README.txt','asset-manifest.json']:
  z.write(dest/rel,Path('veriburada-landing')/rel)
print(json.dumps({'archive':str(archive),'bytes':archive.stat().st_size,'runtime_files':len(files),'runtime_bytes':sum(x['bytes'] for x in manifest)}))
