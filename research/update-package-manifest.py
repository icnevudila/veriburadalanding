from pathlib import Path
p=Path('research/package-final.py');s=p.read_text();start=s.index('files=[');end=s.index('\nmanifest=[]',start)
s=s[:start]+"files=['index.html','landing.css','landing.js','brand-wordmark.webp','brand-emblem-small.webp','closing-map.svg','favicon.ico','istanbul-map-display-v4.webp','product-v5-desktop.mp4','product-v5-mobile.mp4','product-v5-desktop-poster.jpg','product-v5-mobile-poster.jpg','fonts/inter-latin.woff2','fonts/inter-turkish.woff2','fonts/LICENSE.txt','vendor/leaflet.js','vendor/leaflet.css','vendor/LEAFLET-LICENSE.txt','vendor/ASSET-SOURCES.md']"+s[end:]
s=s.replace("for f in sorted(dest.rglob('*')):\n  if f.is_file():z.write(f,Path('veriburada-landing')/f.relative_to(dest))", "for rel in files+['preview.py','README.txt','asset-manifest.json']:\n  z.write(dest/rel,Path('veriburada-landing')/rel)")
p.write_text(s)
