from pathlib import Path

def text(x,y,s,size=13,color='#526e5d',weight=450,extra=''):
    return f'<text x="{x}" y="{y}" fill="{color}" font-size="{size}" font-weight="{weight}" {extra}>{s}</text>'
def rect(x,y,w,h,r=12,fill='#fff',stroke='#dce8df',extra=''):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}" {extra}/>'
def icon(kind,x,y):
    paths={'pin':'<path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>', 'building':'<path d="M4 21V5l8-3v19M12 8h8v13M2 21h20M7 7h2M7 11h2M7 15h2M15 12h2M15 16h2"/>','contact':'<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="M5 17c0-5 8-5 8 0M15 9h3M15 13h3"/>','file':'<path d="M14 2H5v20h14V7l-5-5Zm0 0v6h5M8 12h8M8 16h8"/>','check':'<path d="m5 12 4 4L19 6"/>'}
    return f'<svg x="{x}" y="{y}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#198754" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">{paths[kind]}</svg>'
def input_card(kind,x,y,w,mobile=False):
    title,sub={'map':('Bir bölge','Beyoğlu, İstanbul'),'business':('Bir işletme','Atölye Mimarlık'),'contact':('İletişim alanları','Telefon · Web · Konum')}[kind]
    h=112 if mobile else 108
    body=rect(x,y,w,h,12,extra='filter="url(#flow-shadow)"')+rect(x+15,y+17,35,35,9,'#eaf7f1','none')+icon({'map':'pin','business':'building','contact':'contact'}[kind],x+21,y+22)
    body+=text(x+15,y+78,title,14,'#244f35',550)+text(x+15,y+98,sub,11)
    if not mobile:
        body+=text(x+w-17,y+29,'01' if kind=='map' else '02' if kind=='business' else '03',9,'#93a99a',500,'text-anchor="end"')
        if kind=='map':
            body+=f'<path d="M{x+111} {y+22}l20 19 30-18 36 25M{x+125} {y+15}l-12 36M{x+174} {y+14}l-7 39" fill="none" stroke="#d6e6d8" stroke-width="6"/>'
            body+=f'<circle cx="{x+153}" cy="{y+34}" r="5" fill="#20c997" stroke="white" stroke-width="2"/>'
        elif kind=='business':
            body+=rect(x+135,y+22,63,7,3,'#e2ece4','none')+rect(x+135,y+37,43,5,2,'#edf3ef','none')
        else:
            for i in range(3):body+=f'<circle cx="{x+139+i*24}" cy="{y+32}" r="7" fill="#eaf7f1" stroke="#c9e6d4"/>'
    return f'<g class="flow-input" data-node="{kind}">{body}</g>'
def hub(x,y,size):
    cx=x+size/2;cy=y+size/2
    body=f'<circle class="flow-halo" cx="{cx}" cy="{cy}" r="{size*.68}" fill="none" stroke="#20c997" stroke-width="1" opacity="0"/>'
    body+=rect(x,y,size,size,30,'#fff','#c6dfce','filter="url(#flow-hub-shadow)"')
    body+=f'<image href="brand-emblem-small.webp" x="{x+size*.16}" y="{y+size*.16}" width="{size*.68}" height="{size*.68}"/>'
    return f'<g class="flow-hub">{body}</g>'
def output_list(x,y,w,mobile=False):
    body=rect(x,y,w,172,12,extra='filter="url(#flow-shadow)"')+text(x+17,y+29,'İşletme listeniz',15,'#244f35',600)
    body+=rect(x+w-73,y+14,58,22,11,'#eaf7f1','none')+text(x+w-44,y+29,'3 kayıt',10,'#198754',550,'text-anchor="middle"')
    body+=f'<path d="M{x} {y+47}h{w}" stroke="#e6eee8"/>'
    for i,name in enumerate(['Atölye Mimarlık','Form Tasarım','Studio Mimarlık']):
        yy=y+61+i*34
        b=rect(x+12,yy,w-24,30,5,'#f4f8f5' if i%2==0 else '#fff','none')
        b+=f'<circle cx="{x+26}" cy="{yy+15}" r="4" fill="#b7d9c3"/>'+text(x+40,yy+19,name,11,'#46664f')
        b+=icon('check',x+w-38,yy+3)
        body+=f'<g class="flow-result-row">{b}</g>'
    return f'<g class="flow-output flow-list">{body}</g>'
def output_file(x,y,w):
    body=rect(x,y,w,105,12,extra='filter="url(#flow-shadow)"')+rect(x+16,y+20,39,45,8,'#eaf7f1','none')+icon('file',x+23,y+29)
    body+=text(x+69,y+39,'işletme-listem.csv',13,'#244f35',550)+text(x+69,y+60,'Bir sonraki adıma hazır.',10)
    body+=f'<g class="flow-success">{rect(x+16,y+79,w-32,3,1.5,"#20c997","none")}</g>'
    return f'<g class="flow-output flow-file">{body}</g>'
def scene(mobile):
    uid='phone' if mobile else 'wide'
    paths=['M103 142V192Q103 220 143 220H176Q210 220 210 270V380','M317 142V192Q317 220 277 220H244Q210 220 210 270V380','M210 316V380','M210 530V620','M376 706H388Q402 706 402 735V787Q402 814 372 814H210V840'] if mobile else ['M254 99H366Q419 99 419 160V205Q419 250 510 250','M254 250H510','M254 401H366Q419 401 419 340V295Q419 250 510 250','M690 250H750Q800 250 800 170V150Q800 133 850 133H915','M690 250H750Q800 250 800 340V365Q800 390 850 390H945']
    w,h=(420,980) if mobile else (1200,510)
    markup=f'<svg class="flow-scene flow-{uid}" viewBox="0 0 {w} {h}" role="img" aria-labelledby="flow-title-{uid} flow-desc-{uid}" xmlns="http://www.w3.org/2000/svg"><title id="flow-title-{uid}">İşletme bilgilerinden düzenli listeye</title><desc id="flow-desc-{uid}">Bölge, işletme ve iletişim bilgileri Veri Burada logosunda birleşir. Sonuçlar işletme listesi ve CSV dosyası olarak çıkar. Temsili akış.</desc><defs><filter id="flow-shadow" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="6" stdDeviation="9" flood-color="#0f4c30" flood-opacity=".04"/></filter><filter id="flow-hub-shadow" x="-60%" y="-60%" width="220%" height="240%"><feDropShadow dx="0" dy="12" stdDeviation="24" flood-color="#0f4c30" flood-opacity=".10"/></filter></defs>'
    for i,d in enumerate(paths):
        markup+=f'<g><path class="flow-rail" d="{d}" fill="none" stroke="#d4e4d9" stroke-width="1.4"/><path class="flow-trace" data-route="{i}" d="{d}" fill="none" stroke="#198754" stroke-width="1.6" pathLength="1"/><circle class="flow-packet" data-route="{i}" r="4.5" fill="#20c997" stroke="white" stroke-width="2" opacity="0"/></g>'
    if mobile:
        markup+=input_card('map',16,30,174,True)+input_card('business',230,30,174,True)+input_card('contact',113,204,194,True)+hub(135,380,150)+output_list(44,620,332,True)+output_file(64,840,292)
    else:
        markup+=input_card('map',24,45,230)+input_card('business',24,196,230)+input_card('contact',24,347,230)+hub(510,160,180)+output_list(915,47,260)+output_file(945,337,230)
        markup+=text(600,390,'Üç ayrı arama. Tek bir akış.',12,'#82988a',450,'text-anchor="middle"')
    markup+='</svg>'
    # Definition ids must be unique even when one scene is hidden.
    markup=markup.replace('flow-shadow',f'flow-shadow-{uid}').replace('flow-hub-shadow',f'flow-hub-shadow-{uid}')
    return markup

section='''<section class="connection-section" id="baglanti-akisi" aria-labelledby="connection-heading"><div class="wrap"><div class="connection-heading"><div><span class="eyebrow">HER BİLGİ, YENİ BİR BAĞLANTI.</span><h2 id="connection-heading">Dağınık bilgiler.<br/>Bir araya gelen fırsatlar.</h2></div><p>Haritadaki bir noktadan, kullanıma hazır listenize.<br/>Bütün bağlantılar Veri Burada’da buluşur.</p></div><div class="connection-stage">'''+scene(False)+scene(True)+'''</div><div class="connection-footer"><span><i></i>Haritadan işletmeye, işletmeden listenize.</span><small>Temsili ürün akışı</small><div class="connection-controls" hidden><button type="button" class="connection-toggle" aria-label="Bağlantı animasyonunu duraklat">Duraklat</button><button type="button" class="connection-replay" aria-label="Bağlantı animasyonunu tekrar oynat">↻ Tekrar izle</button></div></div></div></section>'''
Path('research/connection-section.html').write_text(section,encoding='utf-8')
p=Path('public/index.html');s=p.read_text(encoding='utf-8')
if 'id="baglanti-akisi"' not in s:s=s.replace('<section class="section wrap" id="ozellikler">',section+'\n<section class="section wrap" id="ozellikler">')
if 'connection-flow.css' not in s:s=s.replace('</head>','<link rel="stylesheet" href="connection-flow.css"/></head>')
if 'connection-flow.js' not in s:s=s.replace('</body>','<script defer src="connection-flow.js"></script></body>')
p.write_text(s,encoding='utf-8')
