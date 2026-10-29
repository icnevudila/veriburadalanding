from pathlib import Path
import json
root=Path(__file__).resolve().parent.parent
maps=json.loads((root/'research/hero-city-maps.json').read_text(encoding='utf-8'))
specs={
 'hair':('kadikoy','İstanbul','Kadıköy','0216','Kuaför listeniz',['Moda Kuaför','Makas Saç Tasarım','Pera Güzellik','Stil Erkek Kuaförü','Kadıköy Saç Stüdyosu']),
 'clinic':('cankaya','Ankara','Çankaya','0312','Diş kliniği listeniz',['Gülüş Diş Kliniği','Merkez Diş','İnci Ağız ve Diş','Kavaklıdere Dental','Tunus Diş Kliniği']),
 'architecture':('alsancak','İzmir','Alsancak','0232','Mimarlık ofisi listeniz',['Ege Mimarlık','Kordon Tasarım','Form Mimarlık','Pasaport Mimarlık','Atölye İzmir']),
 'restaurant':('nilufer','Bursa','Nilüfer','0224','Restoran listeniz',['Nil Mutfak','Park Restoran','Badem Sofrası','Atölye Lezzet','Sokak Lokantası']),
 'hotel':(None,'İstanbul','Beyoğlu','0212','Otel listeniz',['Pera Konak','Beyoğlu Palas','Galata Konak','Taksim Otel','İstanbul Butik Otel']),
}
scenarios={}
for kind,(key,city,district,phone,title,names) in specs.items():
 m=maps[key] if key else {'path':'/istanbul-map-display-v4.webp','size':[1400,1200],'pins':[[336,576],[546,756],[840,612],[924,324],[630,400]]}
 scenarios[kind]={**m,'city':city,'district':district,'phone':phone,'title':title,'names':names}
p=root/'public/hero-premium.js';s=p.read_text(encoding='utf-8');a=s.index(' const locations=');b=s.index(" let sector='';",a)
s=s[:a]+' const scenarios='+json.dumps(scenarios,ensure_ascii=True,separators=(',',':'))+';\n'+s[b:]
s=s.replace("place=locations[kind]||locations.hair","place=scenarios[kind]||scenarios.hair")
a=s.index('  if(sector!==currentSector.query)');b=s.index('  surface.style.opacity=',a)
s=s[:a]+'''  if(sector!==currentSector.query){sector=currentSector.query;find('.hp-sector').textContent=sector;find('.hp-location').textContent=place.city;find('.hp-account-context').textContent=place.district+' · '+place.city;find('.hp-account-heading h2').textContent=place.title;find('.hp-map img').src=place.path;find('.hp-map img').style.objectPosition='50% 50%';rows.forEach((row,i)=>{row.querySelector('strong').textContent=place.names[i];row.querySelector('.hp-phone').textContent=place.phone+' 000 10 0'+(i+1);row.querySelector('.hp-web').textContent=['atolye','form','pera','studio','merkez'][i]+'.example'})}
'''+s[b:]
s=s.replace("find('.hp-map').style.transform=`scale(${1.04+E(t/7)*.035})`;find('.hp-map img').style.objectPosition=place[1]+'% '+place[2]+'%';", "const zoom=1.04+E(t/7)*.035;find('.hp-map').style.transform=`scale(${zoom})`;")
a=s.index('  const layout=');b=s.index('  const preparing=',a)
s=s[:a]+'''  const [imageW,imageH]=place.size,mapScale=Math.max((W+80)/imageW,(H+80)/imageH),ox=-40+(W+80-imageW*mapScale)/2,oy=-40+(H+80-imageH*mapScale)/2;
  markers.forEach((pin,i)=>{const a=E((t-.6-i*.48)/.6),[px,py]=place.pins[i],x=W/2+(ox+px*mapScale-W/2)*zoom,y=H/2+(oy+py*mapScale-H/2)*zoom;pin.style.left=x+'px';pin.style.top=Math.max(mobile?190:330,Math.min(H-45,y))+'px';pin.style.opacity=String(a);pin.style.transform=`translate(-50%,-100%) scale(${.76+.24*a})`;pin.querySelector('b').style.opacity=String(E((t-6.3)/.45));pin.querySelector('i').style.opacity=String(t>3&&t<7.5?.35+.15*Math.sin(t*2.7-i):.12)});
'''+s[b:]
p.write_text(s,encoding='utf-8')
