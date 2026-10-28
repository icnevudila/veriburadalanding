from pathlib import Path
from base64 import b64encode
from html import escape
root=Path.cwd();out=root/'research/portrait-concepts';out.mkdir(parents=True,exist_ok=True)
def asset(p):
 f=root/'public'/p;return 'data:image/'+('svg+xml' if f.suffix=='.svg' else 'webp')+';base64,'+b64encode(f.read_bytes()).decode()
mark=asset('brand-emblem-small.webp');arch=asset('media/icons/architecture.svg');mp=asset('istanbul-map-display-v4.webp')
def text(x,y,s,size=20,color='#173f2d',weight=400,extra=''):
 return f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" font-weight="{weight}" {extra}>{escape(s)}</text>'
def rect(x,y,w,h,fill='#fff',r=16,stroke='#d8e5db',extra=''):
 return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}" {extra}/>'
def line(x,y,x2,y2,color='#e1eae3',extra=''):return f'<path d="M{x} {y}H{x2}" stroke="{color}" {extra}/>' if y==y2 else f'<path d="M{x} {y}L{x2} {y2}" stroke="{color}" {extra}/>'
def image(src,x,y,w,h,extra=''):return f'<image href="{src}" x="{x}" y="{y}" width="{w}" height="{h}" {extra}/>'
def check(x,y):return f'<circle cx="{x}" cy="{y}" r="12" fill="#e3f4e9"/><path d="m{x-5} {y} 3 3 7-7" fill="none" stroke="#198754" stroke-width="2" stroke-linecap="round"/>'
def header(tag,title,sub):return image(mark,43,38,34,34)+text(87,63,'veri burada',22,weight=650)+text(676,61,tag,12,'#617968',500,'text-anchor="end"')+text(44,136,title,38,weight=600)+text(45,170,sub,17,'#617968')
def shell(name,bg,body):
 svg=f'''<svg xmlns="http://www.w3.org/2000/svg" width="720" height="1040" viewBox="0 0 720 1040"><defs><filter id="shadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="15" stdDeviation="22" flood-color="#173f2d" flood-opacity=".09"/></filter><clipPath id="mapClip"><rect x="30" y="215" width="660" height="570" rx="24"/></clipPath><linearGradient id="wash" x2="0" y2="1"><stop stop-color="#f8fcf7" stop-opacity="0"/><stop offset="1" stop-color="#f8fcf7"/></linearGradient></defs><rect width="720" height="1040" rx="28" fill="{bg}"/><g font-family="Inter,Arial,sans-serif">{body}</g></svg>'''
 (out/(name+'.svg')).write_text(svg,encoding='utf-8')
# 01: geographic search, selected boundary and numbered results share a clear hierarchy.
b=header('01 / BÖLGE','Araştırmanız burada başlasın.','İstanbul · Beyoğlu · Mimarlık ofisleri')
b+=rect(30,215,660,570,'#edf4e9',24)+image(mp,30,215,660,570,'preserveAspectRatio="xMidYMid slice" clip-path="url(#mapClip)"')
b+='<path d="M139 375 308 325 480 416 524 582 374 676 178 616 103 487Z" fill="#19875412" stroke="#198754" stroke-width="2" stroke-dasharray="7 5"/>'
b+=rect(57,242,606,86,'#fff',14,extra='filter="url(#shadow)"')+text(80,272,'ARAMA BÖLGESİ',10,'#617968',600,'letter-spacing="1.5"')+text(80,302,'Beyoğlu, İstanbul',23,weight=550)+text(634,293,'⌄',22,'#198754',500)
for x,y,n,label,dx in [(235,447,'01','Atölye Mimarlık',12),(431,531,'02','Form Tasarım',-163),(255,638,'03','Studio Mimarlık',15)]:
 b+=f'<ellipse cx="{x}" cy="{y+13}" rx="24" ry="7" fill="#174a3020"/><path d="M{x} {y+9}c-10-12-23-22-23-37a23 23 0 1 1 46 0c0 15-13 25-23 37Z" fill="#0f7049" stroke="white" stroke-width="4"/>'+text(x,y-22,n,14,'#fff',600,'text-anchor="middle"')+rect(x+dx,y+24,171,34,'#fffffff2',8)+text(x+dx+12,y+46,label,13,weight=500)
b+=text(50,765,'© OpenStreetMap contributors',10,'#536e59')
b+=rect(57,801,606,170,'#fff',18,extra='filter="url(#shadow)"')+image(arch,80,829,49,49)+text(145,847,'Beyoğlu araştırması',23,weight=600)+text(145,876,'Mimarlık ofisleri',16,'#617968')+line(80,897,640,897)+text(81,932,'3 örnek işletme',15,'#526e5b')+text(639,932,'Telefon · Web · Adres',14,'#198754',500,'text-anchor="end"')+text(45,1009,'Temsili bölge ve işletme konumları',12,'#617968')
shell('01-bolge','#edf3ec',b)
# 02: readable, populated business dossier; five real supported fields rather than decorations.
b=header('02 / BİLGİLER','İşletmeyi tek bakışta tanıyın.','Aynı kayıt. İhtiyacınız olan alanlar bir arada.')
b+=rect(54,220,612,690,'#fff',24,extra='filter="url(#shadow)"')+rect(54,220,612,119,'#e2eee3',24,'#e2eee3')
b+=image(arch,86,246,66,66)+text(174,274,'Atölye Mimarlık',27,weight=600)+text(175,306,'Mimarlık ofisi · Beyoğlu',16,'#526e5b')
fields=[('01','TELEFON','+90 (212) 000 10 01'),('02','WEB SİTESİ','atolyemimarlik.example'),('03','ADRES','Meşrutiyet Cd. No: 12, Beyoğlu'),('04','KONUM','Beyoğlu, İstanbul'),('05','PUAN','4,8 / 5 · 64 değerlendirme (örnek)')]
for i,(num,label,value) in enumerate(fields):
 y=369+i*101
 b+=text(84,y+10,num,12,'#8b9d8c',500)+text(126,y+5,label,10,'#617968',600,'letter-spacing="1.4"')+text(126,y+36,value,18,weight=450)+check(627,y+17)
 if i<4:b+=line(125,y+64,635,y+64)
b+=rect(88,933,544,44,'#e3eee3',10,'#d1e1d2')+text(360,961,'Telefon · Web sitesi · Adres · Konum · Puan',14,'#315c40',500,'text-anchor="middle"')+text(45,1009,'Örnek kayıt. Alanların doluluğu işletme profiline bağlıdır.',12,'#617968')
shell('02-bilgiler','#f2f5ee',b)
# 03: detailed portrait ledger; same names and destination, no fictional adoption statistics.
b=header('03 / ÇIKTI','Araştırmanız, çalışma listeniz.','Aynı işletmeler. Düzenli sütunlar. Tek CSV dosyası.')
b+=rect(62,235,595,665,'#e3e6dc',20,'#e3e6dc',extra='transform="rotate(3 360 560)"')
b+=rect(39,217,642,710,'#fffdf8',20,'#dedfd4',extra='filter="url(#shadow)"')+image(asset('media/icons/csv.svg'),70,250,59,59)+text(145,275,'isletme-listem.csv',26,weight=600)+text(146,304,'Beyoğlu / Mimarlık ofisleri',15,'#617968')
b+=rect(64,339,592,42,'#e9f1e5',7,'#e9f1e5')+text(80,366,'İŞLETME / İLETİŞİM',10,'#315d40',600,'letter-spacing="1.2"')+text(637,366,'KONUM',10,'#315d40',600,'text-anchor="end" letter-spacing="1.2"')
for i,(name,domain,phone) in enumerate([('Atölye Mimarlık','atolyemimarlik.example','01'),('Form Tasarım','formtasarim.example','02'),('Studio Mimarlık','studiomimarlik.example','03')]):
 y=414+i*133
 b+=text(79,y,str(i+1).zfill(2),12,'#8b9d8c')+text(115,y,name,23,weight=550)+text(115,y+31,'+90 (212) 000 10 '+phone,16,'#526e5b')+text(115,y+58,domain,15,'#198754')+text(633,y+5,'Beyoğlu',14,'#526e5b',400,'text-anchor="end"')+check(627,y+42)+line(79,y+87,640,y+87)
b+=rect(68,839,584,58,'#0f4c30',11,'#0f4c30')+text(360,875,'3 temsili kayıt · CSV önizlemesi',16,'#fff',500,'text-anchor="middle"')+text(45,1009,'Temsili dosya görünümü; gerçek iletişim bilgisi içermez.',12,'#617968')
shell('03-liste','#efeee6',b)
# Local-only gallery; no production files are touched.
html='''<!doctype html><html lang="tr"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Veri Burada — Dikey görsel taslakları</title><style>@font-face{font-family:Inter;src:url('../../public/fonts/inter-latin.woff2')}body{margin:0;padding:36px;background:#fafcf9;font-family:Inter,Arial;color:#173f2d}h1{font-size:26px;margin:0 0 12px}p{color:#617968;margin-bottom:30px}.gallery{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;max-width:1440px;margin:auto}.gallery img{width:100%;display:block;border-radius:22px}figure{margin:0}figcaption{padding:14px 0;font-size:14px}@media(max-width:800px){.gallery{grid-template-columns:1fr;max-width:480px}}</style><h1>Bir aramanın üç görünümü.</h1><p>Dikey görsel taslakları · Aynı bölge, aynı kayıtlar · Siteye henüz eklenmedi.</p><div class="gallery">'''+''.join(f'<figure><img src="{name}.svg" alt="{label}"><figcaption>{label}</figcaption></figure>' for name,label in [('01-bolge','01 — Bölgeyi seçin'),('02-bilgiler','02 — İşletme bilgilerini inceleyin'),('03-liste','03 — Çalışma listenizi oluşturun')])+'</div></html>'
(out/'index.html').write_text(html,encoding='utf-8');print(out)
