const fs=require('fs');
const {chromium}=require('C:/Users/TP2/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
const out='research/film-v3-frames';fs.mkdirSync(out,{recursive:true});fs.writeFileSync('public/render-frame.html',fs.readFileSync('research/render-frame.html'));
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});const page=await browser.newPage();
await page.goto('http://127.0.0.1:4173/render-frame.html');
await page.evaluate(async()=>{
const city=new Image(),map=new Image();city.src='http://127.0.0.1:4173/city-diorama-v2.png';map.src='http://127.0.0.1:4173/istanbul-map-art.svg';await Promise.all([city.decode(),map.decode()]);await document.fonts.load('500 30px Inter','İşletme Türkçe Bağlantı');await document.fonts.ready;
const cv=document.createElement('canvas');cv.width=1440;cv.height=900;const c=cv.getContext('2d');
const E=x=>{x=Math.max(0,Math.min(1,x));return 1-Math.pow(1-x,3)};
function box(x,y,w,h,r,fill,stroke){c.beginPath();c.roundRect(x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=1;c.stroke()}}
function txt(s,x,y,size=16,color='#183f29',weight=400){c.fillStyle=color;c.font=`${weight} ${size}px Inter,Arial`;c.fillText(s,x,y)}
function line(x1,y1,x2,y2,color='#dce6d2',width=1){c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.strokeStyle=color;c.lineWidth=width;c.stroke()}
function check(x,y){c.beginPath();c.moveTo(x,y+4);c.lineTo(x+4,y+8);c.lineTo(x+12,y-2);c.strokeStyle='#198754';c.lineWidth=2;c.stroke()}
function pin(x,y,scale=1){c.save();c.translate(x,y);c.scale(scale,scale);c.beginPath();c.moveTo(0,20);c.bezierCurveTo(-30,-10,-15,-33,0,-33);c.bezierCurveTo(15,-33,30,-10,0,20);c.fillStyle='#175e38';c.fill();c.strokeStyle='#fff';c.lineWidth=3;c.stroke();c.beginPath();c.arc(0,-13,6,0,Math.PI*2);c.fillStyle='#a4e7cd';c.fill();c.restore()}
window.filmFrame=t=>{
c.clearRect(0,0,1440,900);c.fillStyle='#f5faf6';c.fillRect(0,0,1440,900);
const p1=E((t-3.2)/1.25),p2=E((t-7.2)/1.3);const fadeEnd=t>11.4?Math.max(0,1-(t-11.4)/.6):1;
txt('veri burada',55,58,25,'#164f30',650);txt('İŞLETMELERİ KEŞFETMENİN YENİ YOLU',930,54,9,'#7b9770',500);
txt(['01 / BÖLGENİZİ SEÇİN','02 / İŞLETMELERİ KEŞFEDİN','03 / LİSTENİZİ OLUŞTURUN'][Math.min(2,Math.floor(t/4))],57,119,10,'#6d8d59',500);
const headline=t<4?'Yeni fırsatlar, her sokakta.':t<8?'Doğru işletmeler. Bir arada.':'Bağlantıya dönüşen bir liste.';txt(headline,55,169,40,'#143c29',500);
c.save();c.globalAlpha=1-p1;const z=1+t*.006;c.translate(720,510);c.scale(z,z);c.drawImage(city,-495,-320,990,660);c.restore();
if(p1>0){c.save();c.globalAlpha=p1;const sx=55-p2*5,sw=1330-p2*660;box(sx,210,sw,600,16,'#eff4e6','#d9e4ce');c.save();c.beginPath();c.roundRect(sx,210,sw,600,16);c.clip();const scale=Math.max(sw/map.width,600/map.height);const mw=map.width*scale,mh=map.height*scale;c.drawImage(map,sx+(sw-mw)/2,210+(600-mh)/2,mw,mh);c.fillStyle='#f8faf010';c.fillRect(sx,210,sw,600);c.restore();
const searchW=Math.min(sw-40,530);c.shadowColor='#153c2910';c.shadowBlur=20;box(sx+20,230,searchW,62,9,'#fff','#e3eadb');c.shadowBlur=0;txt('İstanbul',sx+43,269,16,'#2f4e2c',550);txt('/',sx+133,269,16,'#b0bf9f');txt('Mimarlık ofisleri',sx+155,269,16,'#7a8d6b');box(sx+searchW-3,244,34,34,6,'#175c36');txt('→',sx+searchW+5,268,19,'#fff');
const pts=[[.22,.45],[.39,.61],[.61,.38],[.74,.7],[.84,.39],[.47,.8]];pts.forEach(([x,y],i)=>{const a=E((t-4-i*.2)/.5);if(a>0){c.save();c.globalAlpha=a;pin(sx+sw*x,210+600*y,Math.min(1,a)*.95);c.restore()}});
const ph=(t%2)/2;c.beginPath();c.arc(sx+sw*.39,210+600*.61,30+ph*100,0,Math.PI*2);c.strokeStyle=`rgba(25,135,84,${(1-ph)*.35})`;c.lineWidth=2;c.stroke();
txt('© OpenStreetMap contributors',sx+15,795,9,'#6c7c62');c.restore()}
if(p2>0){c.save();c.globalAlpha=p2;const x=760+(1-p2)*80,y=210,w=625; c.shadowColor='#153c2910';c.shadowBlur=30;box(x,y,w,600,16,'#fff','#dce6d2');c.shadowBlur=0;box(x+25,y+25,39,39,9,'#edf4e6');txt('≡',x+35,y+51,25,'#5e844a',600);txt('İşletme listeniz',x+79,y+43,20,'#183f29',550);txt('İstanbul / Mimarlık ofisleri',x+79,y+63,10,'#8a9b7c');box(x+w-133,y+32,108,27,14,'#eef6e5');txt('✓  Liste hazır',x+w-119,y+50,10,'#789e59');line(x,y+90,x+w,y+90);txt('İŞLETME',x+29,y+118,8,'#8ca07b',500);txt('KONUM',x+346,y+118,8,'#8ca07b',500);txt('İLETİŞİM',x+475,y+118,8,'#8ca07b',500);
const names=['Atölye Mimarlık','Form Tasarım','Studio Mimarlık','Çizgi Tasarım','Mekân Atölyesi'];
names.forEach((name,i)=>{const a=E((t-8-i*.28)/.5);if(!a)return;c.save();c.globalAlpha=a;const ry=y+140+i*72+(1-a)*15;box(x+17,ry,w-34,63,6,i%2?'#fff':'#fafcf6');box(x+29,ry+12,37,37,8,['#f0e6d4','#e1ebd8','#e2ecea'][i%3]);txt(name[0],x+41,ry+37,17,['#a18a60','#809f5d','#7a9c97'][i%3],500);txt(name,x+80,ry+28,14,'#2e4b28',500);txt('Mimarlık ve tasarım',x+80,ry+45,9,'#9ba88d');txt(['Beyoğlu','Cihangir','Tophane'][i%3],x+346,ry+34,11,'#7a8d6b');check(x+477,ry+28);check(x+506,ry+28);check(x+535,ry+28);c.restore()});
const ready=E((t-9.9)/.7);c.globalAlpha=ready;box(x+25,y+535,w-50,42,7,'#195735');txt('↓   Listeyi indir',x+240,y+562,13,'#e7f3db',500);c.restore()}
if(t>1.2&&t<4.1){const a=Math.min(E((t-1.2)/.6),1-E((t-3.3)/.6));c.save();c.globalAlpha=a;box(930,280,300,97,13,'#ffffffed','#d5e4c9');txt('İstanbul',950,313,12,'#748e60');txt('Yeni bir bağlantı bulundu.',950,340,17,'#1b502d',550);txt('İletişim bilgileri toplanıyor',950,361,10,'#8fa37d');c.restore()}
line(55,845,1385,845,'#dfe7d8');txt('KEŞFET',55,877,8,t<4?'#1b5b34':'#aab99d',600);txt('TOPLA',180,877,8,t>=4&&t<8?'#1b5b34':'#aab99d',600);txt('BAĞLANTI KUR',295,877,8,t>=8?'#1b5b34':'#aab99d',600);txt('Temsili ürün anlatımı · Gerçek müşteri verisi içermez.',1090,877,8,'#98a68a');
const progress=t/12;c.fillStyle='#20c997';c.fillRect(55,844,1330*progress,2);
if(fadeEnd<1){c.fillStyle=`rgba(245,248,240,${1-fadeEnd})`;c.fillRect(0,90,1440,750)}
return cv.toDataURL('image/jpeg',.94).split(',')[1];};
});
for(let i=0;i<360;i++){const data=await page.evaluate(t=>window.filmFrame(t),i/30);fs.writeFileSync(`${out}/${String(i).padStart(4,'0')}.jpg`,Buffer.from(data,'base64'));}
fs.copyFileSync(out+'/0035.jpg','public/video-poster-v3.jpg');await browser.close();fs.unlinkSync('public/render-frame.html');console.log('360 frames ready');})();
