const fs=require('fs');
const {chromium}=require('C:/Users/TP2/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
fs.writeFileSync('public/render-frame.html',fs.readFileSync('research/render-frame.html'));
const b=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const p=await b.newPage();await p.goto('http://127.0.0.1:4173/render-frame.html');
await p.evaluate(async()=>{
 const map=new Image(),logo=new Image();map.src='/istanbul-map-v4.svg';logo.src='/brand-transparent-v3.webp';await Promise.all([map.decode(),logo.decode()]);await document.fonts.load('500 24px Inter','İşletme Bölge');await document.fonts.ready;
 const cv=document.createElement('canvas'),c=cv.getContext('2d');
 const E=x=>{x=Math.max(0,Math.min(1,x));return 1-Math.pow(1-x,3)},S=x=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)};
 const box=(x,y,w,h,r,fill,stroke)=>{c.beginPath();c.roundRect(x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=1;c.stroke()}};
 const tx=(s,x,y,size=16,col='#244c3a',weight=450)=>{c.font=`${weight} ${size}px Inter`;c.fillStyle=col;c.fillText(s,x,y)};
 const ln=(x,y,xx,yy,col='#e2ebe5',w=1)=>{c.beginPath();c.moveTo(x,y);c.lineTo(xx,yy);c.strokeStyle=col;c.lineWidth=w;c.stroke()};
 const shadow=(draw)=>{c.save();c.shadowColor='#143d2920';c.shadowBlur=36;c.shadowOffsetY=12;draw();c.restore()};
 const check=(x,y)=>{c.beginPath();c.moveTo(x,y);c.lineTo(x+4,y+4);c.lineTo(x+12,y-5);c.lineWidth=2;c.strokeStyle='#198754';c.stroke()};
 const pin=(x,y,k,sel)=>{c.save();c.translate(x,y);c.scale(k,k);c.beginPath();c.moveTo(0,17);c.bezierCurveTo(-30,-12,-18,-37,0,-37);c.bezierCurveTo(18,-37,30,-12,0,17);c.fillStyle=sel?'#0F4C30':'#198754';c.fill();c.lineWidth=3;c.strokeStyle='#fff';c.stroke();c.beginPath();c.arc(0,-15,6,0,7);c.fillStyle='#c8f7e3';c.fill();c.restore()};
 const names=['Atölye Mimarlık','Form Tasarım','Studio Mimarlık'];
 const pts=[[.24,.48],[.39,.63],[.60,.51],[.66,.27],[.48,.82],[.85,.44]];
 const cursor=(x,y,a=1)=>{c.save();c.globalAlpha=a;c.translate(x,y);c.beginPath();c.moveTo(0,0);c.lineTo(0,25);c.lineTo(6,19);c.lineTo(12,30);c.lineTo(17,27);c.lineTo(11,17);c.lineTo(21,17);c.closePath();c.fillStyle='#133c28';c.fill();c.lineWidth=2;c.strokeStyle='#fff';c.stroke();c.restore()};
 window.productFrame=(t,mobile)=>{
 const W=mobile?960:1440,H=mobile?1200:900;cv.width=W;cv.height=H;
 c.fillStyle='#f3f8f5';c.fillRect(0,0,W,H);
 // One consistent application shell; no marketing title cards.
 box(0,0,W,66,0,'#fff');ln(0,65,W,65);c.drawImage(logo,75,25,2065,658,24,3,190,60);
 if(!mobile){tx('Keşfet',300,40,13,'#0F4C30',600);tx('Listelerim',387,40,13,'#7b8f83');box(285,62,69,3,0,'#198754')}
 box(W-169,19,144,29,15,'#edf5ef');tx('Temsili gösterim',W-154,38,10,'#567161',500);
 const f=S((t-3.65)/1.1),out=S((t-7.45)/1.15);
 const mx=mobile?20:24,my=mobile?86:90,mw=mobile?920:1392,mh=mobile?1050-510*out:770;
 box(mx,my,mw,mh,15,'#eaf1e9','#d9e5dc');
 c.save();c.beginPath();c.roundRect(mx,my,mw,mh,15);c.clip();
 const scale=Math.max(mw/1400,mh/1200)*(1.06+.21*f-.08*out),iw=1400*scale,ih=1200*scale;
 const dx=Math.min(mx,Math.max(mx+mw-iw,mx+mw*.5-iw*(.5-.10*f))),dy=Math.min(my,Math.max(my+mh-ih,my+mh*.5-ih*(.5+.015*f)));
 if(dx>mx+.1||dy>my+.1||dx+iw<mx+mw-.1||dy+ih<my+mh-.1)throw Error('Uncovered map '+t);
 c.drawImage(map,dx,dy,iw,ih);
 const points=pts.map(p=>({x:dx+p[0]*iw,y:dy+p[1]*ih}));
 points.forEach((p,i)=>{const a=E((t-.7-i*.18)/.55);if(a>0)pin(p.x,p.y,a*(i===0?1.1:1),i===0&&f>.1)});
 const pp=points[0];
 if(t>3.5&&t<7.5){const phase=(t%1.7)/1.7;c.beginPath();c.arc(pp.x,pp.y-9,25+phase*48,0,7);c.strokeStyle=`rgba(25,135,84,${.6*(1-phase)})`;c.lineWidth=2;c.stroke()}
 // Focus detail stays attached to the same geographic point.
 const detail=E((t-4.1)/.55)*(1-out);
 if(detail>0){c.save();c.globalAlpha=detail;const x=mobile?mx+40:Math.max(mx+30,Math.min(pp.x+40,710)),y=Math.max(my+156,Math.min(pp.y-150,my+mh-(mobile?430:280)));if(mobile){c.translate(x,y);c.scale(1.65,1.65);c.translate(-x,-y)}
 shadow(()=>box(x,y,405,244,13,'#fff','#d7e5dc'));
 box(x+20,y+22,47,47,10,'#eaf7f1');tx('A',x+34,y+54,25,'#198754',600);tx(names[0],x+82,y+43,19,'#163f2a',600);tx('Mimarlık ofisi · Örnek kayıt',x+82,y+64,11,'#728679');
 ln(x+20,y+88,x+385,y+88);['Telefon alanı','Web sitesi alanı','Beyoğlu, İstanbul'].forEach((v,i)=>{tx(['↗','↗','⌖'][i],x+23,y+117+i*31,15,'#198754');tx(v,x+52,y+116+i*31,13,'#526e5d')});
 box(x+20,y+198,365,30,7,'#0F4C30');check(x+134,y+214);tx('Listeye eklendi',x+155,y+218,12,'#fff',550);c.restore()}
 tx('© OpenStreetMap contributors',mx+14,my+mh-13,9,'#526c5a');c.restore();
 // Search field, typed query and an intentional confirmation state.
 const sx=mx+20,sy=my+20,sw=mobile?880:610;
 shadow(()=>box(sx,sy,sw,72,12,'#fff','#d7e3db'));
 c.beginPath();c.arc(sx+27,sy+33,8,0,7);c.moveTo(sx+33,sy+40);c.lineTo(sx+40,sy+47);c.strokeStyle='#198754';c.lineWidth=2;c.stroke();
 tx('İstanbul / Beyoğlu',sx+57,sy+29,11,'#83998b');
 const query='Mimarlık ofisleri',n=Math.min(query.length,Math.floor(t*16)+1);tx(query.slice(0,n),sx+57,sy+52,mobile?27:17,'#234e36',550);
 if(t<1.2)ln(sx+57+c.measureText(query.slice(0,n)).width+2,sy+35,sx+57+c.measureText(query.slice(0,n)).width+2,sy+54,'#198754',1.5);
 box(sx+sw-60,sy+15,43,43,9,'#0F4C30');tx('→',sx+sw-49,sy+43,22,'#fff');
 // Selected records form a table rather than cutting to a disconnected screen.
 if(out>0){c.save();c.globalAlpha=out;
 const lx=mobile?20:W-689-24+(1-out)*60,ly=mobile?my+mh+18+(1-out)*30:my+112,lw=mobile?920:689,lh=mobile?490:638;
 shadow(()=>box(lx,ly,lw,lh,14,'#fff','#d5e2d8'));
 tx('İşletme listeniz',lx+28,ly+44,mobile?30:22,'#173f2a',600);tx('Beyoğlu · Mimarlık ofisleri',lx+28,ly+76,mobile?19:12,'#7b8f80');
 box(lx+lw-120,ly+25,94,28,14,'#eaf7f1');tx('3 kayıt',lx+lw-92,ly+44,12,'#198754',550);ln(lx,ly+91,lx+lw,ly+91);
 tx('İŞLETME',lx+27,ly+120,mobile?16:10,'#839489',550);tx('KONUM',lx+lw*.65,ly+120,mobile?16:10,'#839489',550);
 names.forEach((name,i)=>{const a=E((t-8.4-i*.28)/.55);c.save();c.globalAlpha=a;const ry=ly+140+i*83+(1-a)*16;
 box(lx+14,ry,lw-28,76,7,i%2?'#fff':'#f5f9f6');box(lx+27,ry+16,42,42,9,['#eee6d9','#e3f0e7','#e3edef'][i]);tx(name[0],lx+41,ry+44,19,'#5c7e67',550);tx(name,lx+82,ry+33,mobile?26:16,'#32533e',550);tx('Mimarlık ofisi · Temsili',lx+82,ry+58,mobile?16:11,'#7d9082');tx('Beyoğlu',lx+lw*.65,ry+41,mobile?22:13,'#617c68');check(lx+lw-51,ry+38);c.restore()});
 const ready=E((t-9.65)/.7);c.save();c.globalAlpha=ready;const by=ly+lh-75;box(lx+25,by,lw-50,48,8,'#0F4C30');tx('↓   Listeyi CSV olarak indir',lx+lw/2-(mobile?167:101),by+32,mobile?24:14,'#fff',550);c.restore();c.restore();
 }
 const phase=t<4?0:t<8?1:2;
 // Camera cursor guides attention once, without constant looping.
 if(t>2.2&&t<4.1){const a=S((t-2.2)/1.1);cursor(sx+sw-33+(pp.x-sx-sw+33)*a,sy+38+(pp.y-sy-38)*a,Math.min(1,(4.1-t)*3))}
 const by=H-23;['BÖLGEYİ SEÇ','İŞLETMELERİ KEŞFET','LİSTENİ OLUŞTUR'].forEach((s,i)=>{const x=mobile?30+i*310:30+i*245;box(x,by-8,6,6,3,i===phase?'#198754':'#c7d8cd');tx(s,x+15,by,9,i===phase?'#356b47':'#8a9f90',550)});
 return cv.toDataURL('image/jpeg',.91).split(',')[1];
 };
});
for(const mobile of (process.argv.includes('--mobile')?[true]:[false,true])){const dir=`research/product-v5-${mobile?'mobile':'desktop'}-frames`;fs.mkdirSync(dir,{recursive:true});for(let i=0;i<360;i++){const data=await p.evaluate(({t,m})=>window.productFrame(t,m),{t:i/30,m:mobile});fs.writeFileSync(`${dir}/${String(i).padStart(4,'0')}.jpg`,Buffer.from(data,'base64'));}fs.copyFileSync(`${dir}/0165.jpg`,`public/product-v5-${mobile?'mobile':'desktop'}-poster.jpg`);console.log(dir+' ready');}
await b.close();fs.unlinkSync('public/render-frame.html');
})();
