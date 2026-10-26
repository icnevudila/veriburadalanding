from pathlib import Path
from bs4 import BeautifulSoup

def icon(kind):
 return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+{'phone':'<path d="M6 3h4l2 5-3 2a15 15 0 0 0 5 5l2-3 5 2v4c0 2-2 3-4 3A18 18 0 0 1 3 7c0-2 1-4 3-4Z"/>','pin':'<path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>','globe':'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>'}[kind]+'</svg>'
def rect(x,y,w,h,r=10,fill='#fff',stroke='#d8e6dd',extra=''):
 return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}" {extra}/>'
def text(x,y,label,size=16,color='#315b40',weight=450,extra=''):
 return f'<text x="{x}" y="{y}" fill="{color}" font-size="{size}" font-weight="{weight}" {extra}>{label}</text>'
def scene(mobile):
 uid='mobile' if mobile else 'desktop';W,H=(720,520) if mobile else (960,600)
 svg=f'<svg class="hero-cinema-svg cinema-{uid}" viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><clipPath id="hero-map-clip-{uid}"><rect x="0" y="0" width="{W}" height="{H}" rx="20"/></clipPath><filter id="hero-card-shadow-{uid}" x="-40%" y="-50%" width="180%" height="210%"><feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#143f29" flood-opacity=".12"/></filter></defs>'
 svg+=f'<g class="cinema-map" clip-path="url(#hero-map-clip-{uid})"><g class="cinema-map-world"><image href="istanbul-map-display-v4.webp" width="1400" height="1200"/>'
 for i in range(4):
  svg+=f'<g class="cinema-pin" data-i="{i}"><circle cy="-8" r="27" fill="#20c997" opacity=".12"/><path d="M0 14C-31-15-18-38 0-38S31-15 0 14Z" fill="{["#0f4c30","#198754","#3d9760","#198754"][i]}" stroke="white" stroke-width="3"/><circle cy="-15" r="6" fill="#d9f9e8"/></g>'
 svg+='</g></g>'
 svg+=f'<rect width="{W}" height="{H}" rx="20" fill="none" stroke="#e2ece5"/>'
 # The query is intentionally large; this is a product visual, not an application screenshot.
 qx,qy,qw=(24,22,460) if mobile else (32,28,490)
 svg+='<g class="cinema-query">'+rect(qx,qy,qw,65,11,extra=f'filter="url(#hero-card-shadow-{uid})"')+f'<circle cx="{qx+28}" cy="{qy+30}" r="8" fill="none" stroke="#198754" stroke-width="2"/><path d="m{qx+34} {qy+36} 7 7" stroke="#198754" stroke-width="2"/>'+text(qx+53,qy+29,'Beyoğlu, İstanbul',13 if mobile else 12,'#627e6a')+text(qx+53,qy+51,'Mimarlık ofisleri',22 if mobile else 20,'#244e35',550)+'</g>'
 names=['Atölye Mimarlık','Form Tasarım','Studio Mimarlık','Mekân Atölyesi']
 for i,name in enumerate(names):
  cw,ch=(254,91) if mobile else (270,96)
  svg+=f'<g class="cinema-business" data-i="{i}" filter="url(#hero-card-shadow-{uid})">'+rect(0,0,cw,ch,12)+rect(15,18,43,46,9,['#e5f2e9','#f2eadf','#e4edf0','#e8f0e7'][i],'none')+text(29,49,name[0],23,'#34704a',550)+text(72,37,name,19 if mobile else 18,'#2d513a',550)+text(72,59,'Mimarlık ofisi',13,'#637e6b')+f'<circle cx="{cw-23}" cy="{ch-20}" r="3" fill="#20c997"/></g>'
 # Larger completed table, preserving the same business names throughout.
 tx,ty,tw,th=(20,32,680,454) if mobile else (33,39,894,521)
 svg+=f'<g class="cinema-table" filter="url(#hero-card-shadow-{uid})">'+rect(tx,ty,tw,th,16)
 svg+=rect(tx+24,ty+23,42,45,9,'#eaf6ee','none')+f'<path d="M{tx+38} {ty+33}h14v23h-14Zm3 8h8m-8 5h8" fill="none" stroke="#198754" stroke-width="1.5"/>'
 svg+=text(tx+82,ty+46,'İşletme listeniz',26 if mobile else 26,'#244e35',550)+text(tx+82,ty+68,'Beyoğlu / Mimarlık ofisleri',15,'#607b68')
 svg+=rect(tx+tw-113,ty+30,85,28,14,'#eaf7ee','none')+text(tx+tw-71,ty+49,'CSV',13,'#198754',550,'text-anchor="middle"')
 svg+=f'<path d="M{tx} {ty+93}h{tw}" stroke="#e3ece6"/>'+text(tx+27,ty+123,'İŞLETME',11,'#587660',550)+text(tx+tw*.6,ty+123,'KONUM',11,'#587660',550)
 for i,name in enumerate(names[:3]):
  yy=ty+145+i*(80 if mobile else 92)
  svg+=f'<g class="cinema-table-row" data-i="{i}">'+rect(tx+15,yy,tw-30,69 if mobile else 80,7,'#f4f9f5' if i%2==0 else '#fff','none')+rect(tx+28,yy+14,42,42,8,['#e6f2e9','#f0e9df','#e4edf0'][i],'none')+text(tx+41,yy+43,name[0],20,'#467852',550)+text(tx+84,yy+34,name,22 if mobile else 21,'#30553c',550)+text(tx+84,yy+57,'Telefon · Web sitesi · Adres',12 if mobile else 13,'#5e7c67')+text(tx+tw*.6,yy+43,'Beyoğlu',19 if mobile else 18,'#5b7864')+f'<path d="m{tx+tw-51} {yy+37} 5 5 11-12" fill="none" stroke="#198754" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></g>'
 svg+='<g class="cinema-table-ready">'+rect(tx+24,ty+th-46,tw-48,3,1.5,'#20c997','none')+text(tx+27,ty+th-18,'3 temsili işletme',12,'#5b7764')+text(tx+tw-28,ty+th-18,'Listeye dönüştü.',12,'#34794b',550,'text-anchor="end"')+'</g></g>'
 svg+=f'<g class="cinema-transfer"><circle r="22" fill="#fff" stroke="#c4e1cf"/><path d="M-8 0H8M3-5 8 0 3 5" stroke="#198754" stroke-width="1.7" fill="none" stroke-linecap="round"/></g>'
 svg+='</svg>'
 return svg

p=Path('public/index.html');s=BeautifulSoup(p.read_text(encoding='utf-8'),'html.parser');hero=s.select_one('.hero')
old=hero.select_one('.hero-visual')
if old:
 old.extract();details=BeautifulSoup('<details class="interactive-example"><summary><span>Örnek aramayı kendiniz deneyin</span><i>+</i></summary><div class="interactive-example-body"></div></details>','html.parser').details;details.select_one('div').append(old);s.select_one('.output-window').insert_after(details)
if not hero.select_one('.hero-cinema'):
 graphic=BeautifulSoup('<div class="hero-cinema" role="img" aria-label="İşletme pinleri ve kartları haritadan düzenli bir listeye dönüşüyor. Temsili ürün gösterimi."><div class="hero-cinema-screen">'+scene(False)+scene(True)+'</div><div class="hero-source-icons" aria-label="Telefon, konum ve web sitesi bilgileri"><span title="Telefon bilgileri">'+icon('phone')+'</span><span title="Konum bilgileri">'+icon('pin')+'</span><span title="Web siteleri">'+icon('globe')+'</span></div></div>','html.parser').div
 hero.append(graphic)
for x in s.select('.hero-demo-query'):x.decompose()
p.write_text(str(s),encoding='utf-8')
print('Dedicated Shortimize-inspired hero motion installed; old interactive sample moved to output preview.')
