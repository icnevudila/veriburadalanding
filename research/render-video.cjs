const fs = require('fs');
const { chromium } = require('C:/Users/TP2/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const dir='research/video-frames';fs.mkdirSync(dir,{recursive:true});
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const page=await browser.newPage();
 await page.setContent('<canvas width="1280" height="720"></canvas>');
 await page.evaluate(()=>{
  window.frame = t => {
   const canvas=document.querySelector('canvas'),c=canvas.getContext('2d');
   const ease=x=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)};
   function box(x,y,w,h,r,fill,stroke){c.beginPath();c.roundRect(x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=1;c.stroke()}}
   function text(s,x,y,size=18,color='#0f4c30',weight=400){c.fillStyle=color;c.font=`${weight} ${size}px Arial`;c.fillText(s,x,y)}
   c.fillStyle='#f4f8f2';c.fillRect(0,0,1280,720);
   const bg=c.createRadialGradient(900,500,0,900,500,600);bg.addColorStop(0,'#dcefe1');bg.addColorStop(1,'#f4f8f2');c.fillStyle=bg;c.fillRect(0,0,1280,720);
   text('veri burada',60,62,26,'#0f4c30',700);text('HARİTADAN LİSTENİZE',930,58,12,'#198754',600);
   const listPhase=ease((t-2.7)/1.2),mapX=60-listPhase*30,mapW=1160-listPhase*570;
   c.save();c.beginPath();c.roundRect(mapX,103,mapW,530,18);c.clip();c.fillStyle='#eaf0e5';c.fillRect(mapX,103,mapW,530);
   c.save();c.translate(200,0);c.rotate(-.35);
   for(let x=-400;x<1500;x+=112)for(let y=-300;y<1100;y+=95)box(x+8,y+8,95,77,12,'#f6f8ef','#dfe7d8');
   c.restore();c.beginPath();c.moveTo(800,50);c.bezierCurveTo(600,240,950,350,700,700);c.strokeStyle='#bce6d8';c.lineWidth=135;c.stroke();
   c.beginPath();c.moveTo(0,550);c.bezierCurveTo(300,540,340,180,1300,250);c.moveTo(180,0);c.bezierCurveTo(250,350,600,300,1200,650);c.strokeStyle='#fff';c.lineWidth=23;c.stroke();c.strokeStyle='#d3ddce';c.lineWidth=2;c.stroke();
   text('KADIKÖY',170,420,12,'#94a18d',600);text('ÜSKÜDAR',940,460,12,'#94a18d',600);
   const locations=[[230,280],[450,375],[600,220],[850,335],[1020,520],[340,510],[700,485],[1100,200]];
   locations.forEach(([x,y],i)=>{const a=ease((t-.5-i*.19)/.35);if(!a)return;c.save();c.globalAlpha=a;c.translate(x,y+(1-a)*20);c.scale(a,a);c.beginPath();c.arc(0,-8,16,Math.PI,0);c.bezierCurveTo(16,6,0,26,0,26);c.bezierCurveTo(0,26,-16,6,-16,-8);c.fillStyle='#0f4c30';c.fill();c.strokeStyle='#fff';c.lineWidth=3;c.stroke();c.beginPath();c.arc(0,-8,5,0,Math.PI*2);c.fillStyle='#20c997';c.fill();c.restore()});
   const scan=(t%2)/2;c.beginPath();c.arc(450,375,35+scan*220,0,Math.PI*2);c.strokeStyle=`rgba(25,135,84,${(1-scan)*.35})`;c.lineWidth=2;c.stroke();
   c.restore();
   box(mapX,103,mapW,530,18,null,'#d9e4d7');
   const searchW=Math.min(430,mapW-50);box(mapX+25,125,searchW,58,10,'#fff','#dce5d9');text('İstanbul',mapX+48,161,17,'#142c22',600);text('│',mapX+140,160,17,'#d8e3d7');text('Mimarlık ofisleri',mapX+165,161,16,'#68786f');
   if(listPhase>0){c.save();c.globalAlpha=listPhase;const lx=670+(1-listPhase)*100;box(lx,103,550,530,18,'#fff','#d9e4d7');text('İşletme listeniz',lx+30,152,24,'#0f4c30',600);box(lx+370,126,150,30,15,'#eaf7f1');text('✓ Listeye eklendi',lx+385,146,11,'#198754',500);text('İŞLETME',lx+30,205,10,'#819083',600);text('KONUM',lx+295,205,10,'#819083',600);text('BİLGİLER',lx+416,205,10,'#819083',600);
   ['Atölye Mimarlık','Studio İç Mimarlık','Form Tasarım','Çizgi Mimarlık','Mekân Atölyesi'].forEach((name,i)=>{const a=ease((t-3.5-i*.24)/.4);c.save();c.globalAlpha=a;const y=230+i*65+(1-a)*14;box(lx+20,y,510,56,7,i%2?'#fff':'#f7faf5');box(lx+30,y+10,36,36,7,['#e5edde','#f6e9db','#e3eeef'][i%3]);text(name[0],lx+42,y+34,16,'#198754',600);text(name,lx+78,y+32,14,'#142c22',500);text(['Kadıköy','Beşiktaş','Üsküdar'][i%3],lx+295,y+32,12,'#68786f');text('✓  ✓  ✓',lx+420,y+32,13,'#198754');c.restore()});
   const ready=ease((t-4.9)/.5);c.globalAlpha=ready;box(lx+30,574,490,38,7,'#0f4c30');text('↓    Listeniz hazır. Yeni bağlantılara başlayın.',lx+85,599,13,'#fff',500);c.restore()}
   const labels=t<2.7?['Bölgenizi seçin. İşletmeleri keşfedin.','01 / KEŞFET']:t<4.8?['İşletme bilgileri, düzenli bir listede.','02 / TOPLA']:['Bir sonraki fırsatınız, artık elinizde.','03 / BAĞLANTI KUR'];text(labels[1],60,680,10,'#198754',600);text(labels[0],340,681,19,'#0f4c30',500);text('Temsili ürün akışı',1080,680,10,'#8b978e');
   return canvas.toDataURL('image/png').split(',')[1];
  }
 });
 for(let i=0;i<180;i++){const data=await page.evaluate(t=>window.frame(t),i/30);fs.writeFileSync(`${dir}/${String(i).padStart(4,'0')}.png`,Buffer.from(data,'base64'));}
 fs.copyFileSync(dir+'/0155.png','public/video-poster.png');await browser.close();console.log('180 frames ready');
})();
