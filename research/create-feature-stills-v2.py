from pathlib import Path
from base64 import b64encode
from html import escape
R=Path.cwd();O=R/'research/feature-stills-v2';O.mkdir(parents=True,exist_ok=True)
def data(name):
 p=R/'public'/name;return 'data:image/'+('svg+xml' if p.suffix=='.svg' else 'webp')+';base64,'+b64encode(p.read_bytes()).decode()
def t(x,y,v,size=23,color='#183f2c',weight=400,attr=''):return f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" font-weight="{weight}" {attr}>{escape(v)}</text>'
def box(x,y,w,h,fill='#fff',rad=18,stroke='#dbe5dc',attr=''):return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rad}" fill="{fill}" stroke="{stroke}" {attr}/>'
def im(src,x,y,w,h,attr=''):return f'<image href="{src}" x="{x}" y="{y}" width="{w}" height="{h}" {attr}/>'
def ln(x,y,w):return f'<path d="M{x} {y}h{w}" stroke="#e5ebe5"/>'
def ck(x,y):return f'<circle cx="{x}" cy="{y}" r="16" fill="#e3f3e8"/><path d="m{x-6} {y} 4 4 9-10" fill="none" stroke="#198754" stroke-width="2.3" stroke-linecap="round"/>'
font='data:font/woff2;base64,'+b64encode((R/'public/fonts/inter-latin.woff2').read_bytes()).decode()
def save(name,bg,body):
 defs=f'<defs><style>@font-face{{font-family:Inter;src:url({font})}}</style><filter id="s" x="-30%" y="-30%" width="180%" height="190%"><feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#0d3420" flood-opacity=".09"/></filter><clipPath id="map"><rect x="-80" y="225" width="810" height="890" rx="22"/></clipPath></defs>'
 (O/(name+'.svg')).write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="792" height="1048" viewBox="0 0 792 1048">{defs}<rect width="792" height="1048" fill="{bg}"/><g font-family="Inter,Arial,sans-serif">{body}</g></svg>',encoding='utf-8')
# A pure geographic composition; no list competing for attention.
b=t(51,83,'İstanbul',24,'#edf7ed',500)+t(51,129,'Beyoğlu',41,'#fff',550)
b+=box(594,70,147,43,'#ffffff13',22,'#ffffff35')+t(668,98,'Bölge seçimi',15,'#f0f8ee',500,'text-anchor="middle"')
b+=box(-80,225,810,890,'#e9f0e5',22,attr='filter="url(#s)"')+im(data('istanbul-map-display-v4.webp'),-80,225,810,890,'preserveAspectRatio="xMidYMid slice" clip-path="url(#map)"')
b+='<path d="M77 501 245 410 438 465 535 633 485 815 267 906 100 784 48 637Z" fill="#19875414" stroke="#187e4b" stroke-width="2.5"/>'
# Exactly three matching pins, all within the selected outline.
for x,y in [(223,545),(407,659),(260,797)]:
 b+=f'<ellipse cx="{x}" cy="{y+14}" rx="26" ry="8" fill="#164c3025"/><path d="M{x} {y+7}c-12-14-27-28-27-44a27 27 0 1 1 54 0c0 16-15 30-27 44Z" fill="#147e4c" stroke="#fff" stroke-width="4"/><circle cx="{x}" cy="{y-37}" r="8" fill="#fff"/>'
b+=box(48,273,688,104,'#fff',14,attr='filter="url(#s)"')+t(80,312,'İŞLETME TÜRÜ',12,'#66806e',550,'letter-spacing="1.4"')+t(80,348,'Mimarlık ofisleri',26,weight=500)+box(654,296,58,58,'#0f4c30',12,'#0f4c30')+'<path d="M674 325h19m-7-7 7 7-7 7" fill="none" stroke="white" stroke-width="2"/>'
b+=box(453,905,285,64,'#fff',12,attr='filter="url(#s)"')+ck(484,937)+t(510,945,'Bölge belirlendi',20,weight=500)+t(21,1023,'© OpenStreetMap contributors · Temsili bölge',12,'#3d634c')
save('01-bolge','#195a3d',b)
# Bulk collection: repeatable records complete together, no map or fake charts.
b=t(51,84,'Tek işlem.',34,weight=550)+t(51,129,'Birlikte toplanan bilgiler.',28,'#42634c')
b+=box(-30,219,760,820,'#fff',22,attr='filter="url(#s)"')+im(data('brand-emblem-small.webp'),27,247,39,39)+t(80,274,'İşletme listeniz',25,weight=550)+t(28,320,'Beyoğlu · Mimarlık ofisleri',18,'#607967')+box(549,247,149,42,'#edf6eb',21,'#edf6eb')+t(624,274,'5 örnek kayıt',15,'#386147',500,'text-anchor="middle"')+ln(0,347,730)
names=['Atölye Mimarlık','Form Tasarım','Studio Mimarlık','Mekân Atölyesi','Pera Mimarlık']
for i,name in enumerate(names):
 y=401+i*122;b+=box(27,y-21,60,62,'#f0f5ed',13,'#e4ece0')+im(data('media/icons/architecture.svg'),35,y-14,44,47)+t(109,y+2,name,24,weight=500)+t(109,y+36,'Telefon · Web sitesi · Adres',16,'#607967')+ck(679,y+11)+ln(109,y+72,591)
b+=box(238,933,512,76,'#0f4c30',14,'#0f4c30',attr='filter="url(#s)"')+t(272,979,'✓',24,'#8ce0b5',500)+t(315,979,'Bilgiler birlikte toplandı',22,'#fff',500)
save('02-toplu-bilgiler','#e5eddf',b)
# A cropped spreadsheet, not an invented analytics dashboard.
b=t(51,84,'Düzenli sütunlar.',34,weight=550)+t(51,129,'Kullanıma hazır örnek dosya.',27,'#64735b')
b+=box(77,267,1000,860,'#fffef9',20,'#dedfd5',attr='filter="url(#s)"')+box(77,267,1000,62,'#f6f6f0',20,'#e3e5dc')+t(108,305,'İŞLETME LİSTESİ',14,'#5d725f',550,'letter-spacing="1.8"')
xs=[77,370,650,925]
for i,(x,w,label) in enumerate([(77,293,'A'),(370,280,'B'),(650,275,'C')]):
 b+=box(x,329,w,43,'#f0f2e9',0,'#e1e5d9')+t(x+w/2,357,label,15,'#68806b',500,'text-anchor="middle"')
for x,y,label in [(99,414,'İşletme adı'),(392,414,'Telefon'),(672,414,'Web sitesi')]:b+=t(x,y,label,19,'#1d5033',550)
b+=f'<path d="M77 436h1000" stroke="#98bb9b"/>'
for i,name in enumerate(names):
 y=482+i*106;b+=t(99,y,name,20,weight=450)+t(392,y,'+90 (212) 000 10 '+str(i+1).zfill(2),17,'#516d56')+t(672,y,['atolyemimarlik.example','formtasarim.example','studiomimarlik.example','mekanatolyesi.example','peramimarlik.example'][i],16,'#516d56')+ln(77,y+43,1000)
for x in xs[1:]:b+=f'<path d="M{x} 372V1048" stroke="#e4e8dc"/>'
b+=box(35,193,558,114,'#fff',15,attr='filter="url(#s)"')+im(data('media/icons/csv.svg'),57,216,60,67)+t(141,238,'isletme-listem.csv',27,weight=550)+t(141,273,'Beyoğlu · 5 temsili kayıt',17,'#617764')
b+=box(38,937,355,72,'#fff',13,attr='filter="url(#s)"')+f'<path d="M72 956v24m-8-8 8 8 8-8m-20 16h24" fill="none" stroke="#198754" stroke-width="2"/>'+t(106,981,'Örnek CSV dosyası',21,weight=500)
save('03-csv','#eeeee4',b)
items=[('01-bolge','Bölgenizdeki işletmeleri bulun.','Şehir ve ilçenizi seçerek araştırmanıza başlayın.'),('02-toplu-bilgiler','Bilgileri topluca alın.','İşletme bilgilerini tek tek kopyalamadan bir araya getirin.'),('03-csv','Listenizi kullanmaya başlayın.','CSV örneğinin sütun yapısını inceleyin.')]
html='''<!doctype html><html lang="tr"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Veri Burada — Özellik görselleri</title><style>@font-face{font-family:Inter;src:url('../../public/fonts/inter-latin.woff2')}*{box-sizing:border-box}body{margin:0;padding:42px;background:#fbfdf9;font-family:Inter,Arial;color:#173f2d}.intro{max-width:1260px;margin:0 auto 30px}.intro h1{font-size:28px;font-weight:550;letter-spacing:-1px;margin:0 0 10px}.intro p{font-size:14px;color:#647967}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;max-width:1260px;margin:auto}figure{margin:0}img{width:100%;display:block;border-radius:17px}h2{font-size:22px;letter-spacing:-.7px;line-height:1.3;font-weight:550;margin:21px 0 10px}figcaption p{font-size:14px;color:#5c7563;line-height:1.75;margin:0}small{display:block;max-width:1260px;margin:26px auto 0;color:#6f8173;font-size:11px}@media(max-width:760px){body{padding:24px}.grid{grid-template-columns:1fr;gap:42px;max-width:430px}}</style><div class="intro"><h1>Üç özellik. Üç ayrı odak.</h1><p>Sabit ürün görselleri · Başlıklar görsel dışında · Siteye eklenmeyen tasarım önizlemesi</p></div><div class="grid">'''+''.join(f'<figure><img src="{n}.svg" alt="{h}"><figcaption><h2>{h}</h2><p>{d}</p></figcaption></figure>' for n,h,d in items)+'</div><small>Görsellerdeki kayıtlar ve bölge seçimi temsilidir; gerçek iletişim bilgisi içermez.</small></html>'
(O/'index.html').write_text(html,encoding='utf-8');print(O)
