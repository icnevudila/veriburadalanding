from pathlib import Path
from bs4 import BeautifulSoup
import xml.etree.ElementTree as ET,re,math
p=Path('public/index.html');s=BeautifulSoup(p.read_text(encoding='utf-8'),'html.parser')
def frag(x):return BeautifulSoup(x,'html.parser')
auto=s.select_one('.auto-card .orbit-scene');auto.clear();auto['class']=['collection-demo'];auto['aria-label']='Temsili MapBot arayüzü: arama yapılır, işletme kayıtları sırayla listeye eklenir.'
auto.append(frag('''<div class="collector-top"><span class="collector-app-icon">M</span><strong>MapBot</strong><span class="collector-live"><i></i> Toplanıyor</span></div><div class="collector-query"><span>⌕</span><div><small>ARAMA BÖLGESİ</small><strong>Beyoğlu, İstanbul <i>· Mimarlık ofisleri</i></strong></div><b>↵</b></div><div class="collector-progress"><span><strong class="collector-count">0</strong> / 3 örnek işletme</span><span class="collector-state">Bilgiler alınıyor</span><div><i></i></div></div><div class="collector-results"><div class="collector-result"><b>A</b><div><strong>Atölye Mimarlık</strong><small>Meşrutiyet Cd. · Beyoğlu</small><span>Telefon <i>·</i> Web sitesi <i>·</i> Konum</span></div><em>✓</em></div><div class="collector-result"><b>F</b><div><strong>Form Tasarım</strong><small>Sıraselviler Cd. · Beyoğlu</small><span>Telefon <i>·</i> Web sitesi <i>·</i> Konum</span></div><em>✓</em></div><div class="collector-result"><b>S</b><div><strong>Studio Mimarlık</strong><small>Boğazkesen Cd. · Beyoğlu</small><span>Telefon <i>·</i> Web sitesi <i>·</i> Konum</span></div><em>✓</em></div></div><div class="collector-bottom"><span><i></i><b>3 kayıt listeye eklendi</b></span><span>CSV hazır ↗</span></div>'''))
# Integrated flow controls: pause only, no replay.
controls=s.select_one('.connection-controls');controls.clear();controls.append(frag('<button type="button" class="connection-toggle" aria-label="Bağlantı animasyonunu duraklat">Duraklat</button>'))
for video in s.select('video'):video['loop']=''
# Actual geometric paths, aligned with the existing OSM road layer.
root=ET.parse('public/closing-map.svg').getroot();paths=[]
for el in root.iter():
 if el.tag.endswith('path'):
  nums=[float(n) for n in re.findall(r'-?\d+(?:\.\d+)?',el.get('d',''))];pts=list(zip(nums[::2],nums[1::2]));length=sum(math.hypot(b[0]-a[0],b[1]-a[1]) for a,b in zip(pts,pts[1:]))
  if length>180:paths.append((length,el.get('d')))
paths.sort(reverse=True)
chosen=paths[:20]
svg='<svg class="road-light-map" viewBox="0 0 1400 1200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><defs><filter id="road-light-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="3"/></filter></defs><image href="closing-map.svg" width="1400" height="1200" opacity=".16"/>'
for i,(_,d) in enumerate(chosen):
 svg+=f'<g class="road-light-route" style="--road-duration:{6+i%5}s;--road-delay:{-i*.73}s"><path class="road-light-halo" d="{d}" pathLength="1000"/><path class="road-light-core" d="{d}" pathLength="1000"/></g>'
svg+='</svg>'
grid=s.select_one('.closing-grid');grid.clear();grid.append(frag(svg))
if not s.select_one('.motion-master'):
 s.select_one('.footer-bottom').append(frag('<button class="motion-master" type="button" aria-pressed="false">Ⅱ Animasyonları duraklat</button>'))
if not s.select_one('link[href="motion-upgrade.css"]'):s.head.append(frag('<link rel="stylesheet" href="motion-upgrade.css"/>'))
if not s.select_one('script[src="motion-upgrade.js"]'):s.body.append(frag('<script defer src="motion-upgrade.js"></script>'))
p.write_text(str(s),encoding='utf-8')
print('Rich collector scene and',len(chosen),'geographically aligned road light routes installed.')
