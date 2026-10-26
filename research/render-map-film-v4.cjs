// Real-geography map-only film. No diorama / miniature city assets.
const fs=require('fs');const{chromium}=require('C:/Users/TP2/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{const out='research/map-film-v4-final-frames';fs.mkdirSync(out,{recursive:true});fs.writeFileSync('public/render-frame.html',fs.readFileSync('research/render-frame.html'));const b=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'}),p=await b.newPage();await p.goto('http://127.0.0.1:4173/render-frame.html');
await p.evaluate(async()=>{
const map=new Image(),logo=new Image();map.src='/istanbul-map-v4.svg';logo.src='/brand-transparent-v3.webp';await Promise.all([map.decode(),logo.decode()]);await document.fonts.load('500 30px Inter','İşletme Türkçe Bağlantı');await document.fonts.ready;
const canvas=document.createElement('canvas');canvas.width=1440;canvas.height=900;const c=canvas.getContext('2d');const E=x=>{x=Math.min(1,Math.max(0,x));return x*x*(3-2*x)};
const box=(x,y,w,h,r,fill,stroke)=>{c.beginPath();c.roundRect(x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=1;c.stroke()}};
const text=(s,x,y,size=16,color='#183f29',weight=400)=>{c.fillStyle=color;c.font=`${weight} ${size}px Inter,Arial`;c.fillText(s,x,y)};
const line=(x,y,x2,y2,color='#dce6dc',width=1)=>{c.beginPath();c.moveTo(x,y);c.lineTo(x2,y2);c.strokeStyle=color;c.lineWidth=width;c.stroke()};
const check=(x,y)=>{c.beginPath();c.moveTo(x,y);c.lineTo(x+4,y+4);c.lineTo(x+12,y-6);c.strokeStyle='#198754';c.lineWidth=2;c.stroke()};
const pin=(x,y,scale,selected=false)=>{c.save();c.translate(x,y);c.scale(scale,scale);c.beginPath();c.moveTo(0,20);c.bezierCurveTo(-27,-9,-16,-32,0,-32);c.bezierCurveTo(16,-32,27,-9,0,20);c.fillStyle=selected?'#0F4C30':'#198754';c.fill();c.strokeStyle='#fff';c.lineWidth=3;c.stroke();c.beginPath();c.arc(0,-12,6,0,Math.PI*2);c.fillStyle='#B1EAD3';c.fill();c.restore()};
const businesses=[{name:'Atölye Mimarlık',lat:41.0330,lon:28.9798},{name:'Form Tasarım',lat:41.0300,lon:28.9815},{name:'Studio Mimarlık',lat:41.0321,lon:28.9850},{name:'Çizgi Tasarım',lat:41.0355,lon:28.9860},{name:'Mekân Atölyesi',lat:41.0275,lon:28.9830},{name:'Bölge Mimarlık',lat:41.0340,lon:28.9905}];
const world=businesses.map(b=>({x:(b.lon-28.975)/.02*1400,y:(41.04-b.lat)/.015*1200}));
window.mapFilm=t=>{
c.fillStyle='#f5faf7';c.fillRect(0,0,1440,900);c.drawImage(logo,28,-5,250,83.5);text('BEYOĞLU / İSTANBUL',1195,51,10,'#5d796a',500);
const stage=Math.min(2,Math.floor(t/4));const focus=E((t-3.7)/1.5),list=E((t-7.3)/1.1);
text(['01 / BÖLGENİZİ SEÇİN','02 / İŞLETMELERİ KEŞFEDİN','03 / LİSTENİZİ OLUŞTURUN'][stage],55,115,10,'#397755',550);
text(['Aradığınız işletmeler, haritada.','Bir pin. Yeni bir bağlantı.','Keşfettiğiniz bilgiler, listenizde.'][stage],55,168,40,'#153f2a',550);
const sx=55-10*list,sy=210,sw=1330-660*list,sh=600;
box(sx,sy,sw,sh,16,'#eef4ed','#d6e2d7');c.save();c.beginPath();c.roundRect(sx,sy,sw,sh,16);c.clip();
const zoom=1+.07*E(t/3.5)+.18*focus-.10*list,scale=Math.max(sw/1400,sh/1200)*zoom;
const cx=700+(world[0].x-700)*focus*.62,cy=600+(world[0].y-600)*focus*.62;
const mw=1400*scale,mh=1200*scale;const dx=Math.min(sx,Math.max(sx+sw-mw,sx+sw/2-cx*scale)),dy=Math.min(sy,Math.max(sy+sh-mh,sy+sh/2-cy*scale));if(dx>sx+.1||dy>sy+.1||dx+mw<sx+sw-.1||dy+mh<sy+sh-.1)throw Error('Map does not cover frame at '+t);
c.drawImage(map,dx,dy,1400*scale,1200*scale);
world.forEach((point,i)=>{const a=E((t-.5-i*.25)/.45);if(!a)return;const x=dx+point.x*scale,y=dy+point.y*scale;pin(x,y,Math.max(.2,a)*(i===0&&focus>.1?1.22:1),i===0&&focus>.1);if(i===0&&t>3.8&&t<8){const phase=(t%1.8)/1.8;c.beginPath();c.arc(x,y-10,24+phase*58,0,Math.PI*2);c.strokeStyle=`rgba(32,201,151,${(1-phase)*.5})`;c.lineWidth=2;c.stroke();}});
// The selected business card is attached to the same projected map point.
const popup=E((t-4.35)/.55)*(1-list);
if(popup>0){const px=dx+world[0].x*scale,py=dy+world[0].y*scale;const x=Math.min(sx+sw-345,Math.max(sx+25,px+38)),y=Math.max(sy+110,py-165);c.save();c.globalAlpha=popup;c.shadowColor='#0f4c3018';c.shadowBlur=24;box(x,y,315,157,12,'#fffffffa','#d3e2d4');c.shadowBlur=0;box(x+17,y+18,36,36,8,'#EAF7F1');text('A',x+28,y+43,17,'#198754',600);text('Atölye Mimarlık',x+66,y+33,15,'#214d32',550);text('Mimarlık ofisi · Temsili kayıt',x+66,y+51,9,'#69816d');line(x+17,y+70,x+298,y+70);text('Telefon · Web sitesi · Konum',x+18,y+95,11,'#526f59');box(x+17,y+112,281,29,6,'#EAF7F1');check(x+29,y+129);text('İşletme bilgileri listeye alınıyor',x+52,y+132,10,'#276f46',500);c.restore();}
c.restore();
// The search UI stays fixed while the geography and anchored pins move.
const searchWidth=Math.min(540,sw-40);box(sx+20,sy+20,searchWidth,61,10,'#fffffffa','#d9e4da');c.beginPath();c.arc(sx+47,sy+49,7,0,Math.PI*2);c.moveTo(sx+52,sy+55);c.lineTo(sx+58,sy+61);c.strokeStyle='#198754';c.lineWidth=1.8;c.stroke();text('İstanbul',sx+75,sy+56,15,'#36583e',550);text('/',sx+157,sy+56,15,'#b3c3b3');text('Mimarlık ofisleri',sx+178,sy+56,15,'#627d66');box(sx+searchWidth-7,sy+33,34,34,7,'#0F4C30');text('→',sx+searchWidth+1,sy+57,19,'#fff');
text('© OpenStreetMap contributors · Temsili işletme kayıtları',sx+15,sy+sh-14,9,'#4d6c5d');
if(list>0){c.save();c.globalAlpha=list;const x=760+(1-list)*80,y=210,w=625;box(x,y,w,600,16,'#fff','#d5e2d6');box(x+25,y+25,38,38,8,'#EAF7F1');text('≡',x+35,y+51,25,'#198754',550);text('İşletme listeniz',x+78,y+43,20,'#163f2a',550);text('Beyoğlu · Mimarlık ofisleri',x+78,y+64,10,'#68826c');box(x+w-140,y+31,116,29,15,'#EAF7F1');text('3 örnek kayıt',x+w-118,y+51,10,'#397850',500);line(x,y+90,x+w,y+90);text('İŞLETME',x+28,y+119,8,'#5c775e',550);text('KONUM',x+348,y+119,8,'#5c775e',550);text('DURUM',x+491,y+119,8,'#5c775e',550);
businesses.slice(0,3).forEach((business,i)=>{const a=E((t-8.15-i*.4)/.5);c.save();c.globalAlpha=a;const ry=y+143+i*93+(1-a)*12;box(x+18,ry,w-36,81,8,i%2?'#fff':'#f4f9f2');box(x+30,ry+17,41,41,8,['#f0e7d9','#e0f0e4','#e2eef0'][i]);text(business.name[0],x+43,ry+44,17,'#4d7a54',550);text(business.name,x+86,ry+32,14,'#31563a',550);text('Mimarlık ofisi · Örnek işletme',x+86,ry+52,9,'#6c846d');text('Beyoğlu',x+348,ry+43,11,'#5b795f');check(x+504,ry+41);c.restore()});
const ready=E((t-10.0)/.7);c.save();c.globalAlpha=ready;text('Telefon, web sitesi ve konum alanları tek listede.',x+28,y+476,11,'#57745c');box(x+25,y+520,w-50,48,7,'#0F4C30');text('↓   Örnek listeyi indir',x+220,y+550,13,'#e6f6eb',500);c.restore();c.restore();}
line(55,845,1385,845,'#dae6dc');line(55,845,55+1330*t/12,845,'#20C997',2);text('SEÇ',55,877,9,stage===0?'#0F4C30':'#64806a',600);text('KEŞFET',165,877,9,stage===1?'#0F4C30':'#64806a',600);text('LİSTELE',295,877,9,stage===2?'#0F4C30':'#64806a',600);text('Ürün akışını anlatan temsili gösterim.',1145,877,9,'#69836e');
return canvas.toDataURL('image/jpeg',.94).split(',')[1];};
});
for(let i=0;i<360;i++){const data=await p.evaluate(t=>window.mapFilm(t),i/30);fs.writeFileSync(`${out}/${String(i).padStart(4,'0')}.jpg`,Buffer.from(data,'base64'));}
fs.copyFileSync(out+'/0054.jpg','public/map-film-v4-poster.jpg');await b.close();fs.unlinkSync('public/render-frame.html');console.log('Map-only film: 360 frames ready');})();
