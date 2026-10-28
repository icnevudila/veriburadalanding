"""Deterministic local bundling. No Node/package installation required."""
from pathlib import Path
from bs4 import BeautifulSoup
import time

root=Path(__file__).resolve().parent.parent
public=root/'public'
def write_atomic(path, content):
    temporary=path.with_suffix(path.suffix+'.tmp')
    temporary.write_text(content,encoding='utf-8')
    temporary.replace(path)

styles=['site.css','craft.css','product-motion.css','connection-flow.css','final.css','motion-upgrade.css','onboarding.css','hero-cinema.css','audience-scenes.css','demo-player.css','scene-studio.css','premium.css','brand-ui.css','onboarding-cinema.css']
scripts=['auth-links.js','brand-ui.js','onboarding-cinema.js','motion-core.js','site.js','connection-flow.js','final.js','motion-upgrade.js','onboarding.js','demo-player.js','scene-studio.js','navigation.js','premium.js']

write_atomic(public/'landing.css','\n'.join((public/f).read_text(encoding='utf-8') for f in styles))
write_atomic(public/'landing.js','\n;\n'.join((public/f).read_text(encoding='utf-8') for f in scripts))

p=public/'index.html'
s=BeautifulSoup(p.read_text(encoding='utf-8'),'html.parser')

for l in s.select('link[href]'):
    href = l.get('href', '')
    if any(href.startswith(st) for st in styles) or 'landing.css' in href:
        l.decompose()
    elif href=='istanbul-map-display-v4.webp' and 'preload' in l.get('rel',[]):
        l.decompose()

for script in s.select('script[src]'):
    src = script.get('src', '')
    if any(src.startswith(sc) for sc in scripts) or 'landing.js' in src:
        script.decompose()

version = int(time.time())
style=s.new_tag('link',rel='stylesheet',href=f'landing.css?v={version}')
s.head.append(style)
script=s.new_tag('script',src=f'landing.js?v={version}',defer='')
s.head.append(script)

for image in s.select('.brand img'):
    image['src']='brand-wordmark.webp';image['decoding']='async';image['width']='1200';image['height']='375'
    if image.find_parent('header'):image['fetchpriority']='high'

for image in s.select('.flow-hub image'):
    image['href']='brand-emblem-small.webp'

write_atomic(p,str(s))
print(f'Built landing.css and landing.js with cache-buster ?v={version}')
