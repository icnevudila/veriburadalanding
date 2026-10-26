"""Deterministic local bundling. No Node/package installation required."""
from pathlib import Path
from bs4 import BeautifulSoup
root=Path(__file__).resolve().parent.parent
public=root/'public'
def write_atomic(path, content):
    temporary=path.with_suffix(path.suffix+'.tmp')
    temporary.write_text(content,encoding='utf-8')
    temporary.replace(path)
styles=['site.css','craft.css','product-motion.css','connection-flow.css','final.css','motion-upgrade.css','onboarding.css','hero-cinema.css','audience-scenes.css','demo-player.css','scene-studio.css','premium.css','brand-ui.css','onboarding-cinema.css']
scripts=['brand-ui.js','onboarding-cinema.js','motion-core.js','site.js','connection-flow.js','final.js','motion-upgrade.js','onboarding.js','demo-player.js','scene-studio.js','navigation.js','premium.js']
write_atomic(public/'landing.css','\n'.join((public/f).read_text(encoding='utf-8') for f in styles))
write_atomic(public/'landing.js','\n;\n'.join((public/f).read_text(encoding='utf-8') for f in scripts))
p=public/'index.html';s=BeautifulSoup(p.read_text(encoding='utf-8'),'html.parser')
for l in s.select('link[href]'):
 if l.get('href') in styles+['landing.css']:l.decompose()
 elif l.get('href')=='istanbul-map-display-v4.webp' and 'preload' in l.get('rel',[]):l.decompose()
for script in s.select('script[src]'):
 if script['src'] in scripts+['landing.js']:script.decompose()
style=s.new_tag('link',rel='stylesheet',href='landing.css')
s.head.append(style)
script=s.new_tag('script',src='landing.js',defer='')
s.head.append(script)
for image in s.select('.brand img'):
 image['src']='brand-wordmark.webp';image['decoding']='async'
 if image.find_parent('header'):image['fetchpriority']='high'
for image in s.select('.flow-hub image'):image['href']='brand-emblem-small.webp'
write_atomic(p,str(s))
print('Built landing.css and landing.js; optimized wordmark and SVG emblem linked.')
