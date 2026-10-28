/* Geographic bulk collection: one command, three result batches, one export. */
window.seek=elapsed=>{
 const introDuration=6,time=Math.max(0,elapsed-introDuration),intro=q('.request-intro'),sent=elapsed>=1.8,service=S((elapsed-2.45)/.65);if(intro){intro.style.opacity=String(1-S((elapsed-5.3)/.7));intro.style.visibility=elapsed>=introDuration?'hidden':'visible';intro.dataset.sent=String(sent);intro.dataset.service=String(service>.5);}const rCard=q('.request-card');if(rCard){rCard.style.opacity=String(1-service);rCard.style.transform=`translateY(${-service*6}px)`;}const rStages=q('.request-stages');if(rStages){rStages.style.opacity=String(1-service);}const rBridge=q('.service-bridge');if(rBridge){rBridge.style.opacity=String(service);rBridge.style.transform=`translateY(${(1-service)*6}px)`;}const rRing=q('.ring-progress');if(rRing){rRing.style.strokeDashoffset=String(1-S((elapsed-2.6)/2.5));}const rSector=q('.request-sector');if(rSector){rSector.textContent=currentSector.query;}const rSpan=q('.request-submit span');if(rSpan){rSpan.textContent=sent?'İstek gönderildi':'Araştırmayı başlat';}const rB=q('.request-submit b');if(rB){rB.textContent=sent?'✓':'';}const requestCursor=q('.request-demo-cursor');if(requestCursor){requestCursor.style.opacity=String(elapsed>.65&&elapsed<2.3?1:0);requestCursor.style.transform=`translate(${(1-S((elapsed-.65)/.9))*30}px,${(1-S((elapsed-.65)/.9))*24}px) scale(${elapsed>1.65&&elapsed<1.85?.85:1})`;}const rHandoff=q('.request-handoff span');if(rHandoff){rHandoff.textContent=sent?'Veri Burada listenizi hazırlıyor.':'İsteğinizi Veri Burada’ya iletin.';}
 const ramp=(a,b,t=time)=>S((t-a)/(b-a)),heroTime=walkthrough?time<6?time/3:time<10?2+(time-6):time<22?6+(time-10)/2:time<31?12+(time-22)*7/9:time<36?19+(time-31)*3/5:22+(time-36):time;
 const t=heroTime,end=S((t-24)/2),fade=1-S((t-24.1)/1.6),search=E((t-.15)/1.65),discovery=ramp(2.2,6,t),collect=ramp(6.8,7.3,t),done=t>=11.7;
 stage.dataset.phase=elapsed<introDuration?(sent?'processing':'request'):t<2.2?'search':t<6.8?'discovery':t<12.5?'bulk':t<19.2?'inspect':t<21?'export':'hold';
 const queryText='İstanbul '+currentSector.query.toLocaleLowerCase('tr');q('.query').textContent=t>25.25?'':queryText.slice(0,Math.floor(queryText.length*search));q('.caret').style.opacity=(t<1.8||t>25.25)&&Math.floor(t*3)%2===0?1:0;
 const revealList=E((t-(mobile?12.5:10.8))/.95),focus=ramp(3,5.8,t)*(1-end),zoom=1.03+.055*focus*(1-ramp(12.5,14,t));
 const scale=Math.max(W/1400,H/1200)*zoom,dx=(W-1400*scale)/2-(mobile?0:155)*focus,dy=(H-1200*scale)/2;
 q('.map-world').style.transform=`translate(${dx}px,${dy}px) scale(${scale})`;q('.map-shade').style.background=mobile?`rgba(248,251,249,${revealList*.08})`:'';
 const batchTimes=[8.3,8.3,10,10,11.7],count=t>=11.7?5:t>=10?4:t>=8.3?2:0;
 const selected=0,positions=points.map(([x,y])=>[dx+x*scale,dy+y*scale]);
 qa('.pin').forEach((el,i)=>{
  const a=clamp((t-2.25-i*.64)/.55),spring=E(a),ready=t>=batchTimes[i],pulse=(t*.65+i*.13)%1;
  el.style.transform=`translate(${positions[i][0]}px,${positions[i][1]}px)`;el.style.opacity=E((t-2.25-i*.64)/.3)*(1-revealList*.25)*fade;el.querySelector('.head').style.transform=`scale(${spring})`;
  el.classList.toggle('selected',t>6.8&&t<12.3);el.querySelector('.tick').style.opacity=ready?E((t-batchTimes[i])/.35):0;el.querySelector('.place-label').style.opacity=E((t-2.6-i*.64)/.4);
  el.querySelector('.halo').style.transform=`scale(${t>6.8&&t<12.3?1+pulse*.42:1})`;el.querySelector('.halo').style.opacity=t>6.8&&t<12.3?.35-pulse*.2:.2;
 });
 const inspect=walkthrough&&time>23&&time<30.8,pop=E((t-(walkthrough?5.3:4.5))/.45)*(1-E((t-(walkthrough?(inspect?18.8:11.4):10.4))/.5));
 const card=q('.business'),cw=card.offsetWidth,ch=card.offsetHeight,[px,py]=positions[0];
 const rightLimit=mobile?W-20:W-35,opensRight=px+30+cw<=rightLimit;
 let cx=Math.max(18,Math.min(W-cw-20,opensRight?px+30:px-cw-30)),cy=Math.max(walkthrough?(portrait?230:182):mobile?107:155,Math.min(H-ch-90,py-ch*.62));
 card.style.left=cx+'px';card.style.top=cy+'px';card.style.opacity=pop*fade;card.style.transformOrigin=opensRight?'0 66%':'100% 66%';card.style.transform=`scale(${.97+.03*pop})`;q('.business strong').textContent=names[0];q('.business .avatar').innerHTML='<img alt="" src="/media/icons/'+(stage.dataset.industry||'architecture')+'.svg">';q('.website').textContent=domains[0]+'.example';if(!walkthrough){qa('.business dd').forEach((el,i)=>el.textContent=['Telefon','Web','Adres'][i])}
 qa('.business dl>div').forEach((el,i)=>{el.style.opacity=E((t-(walkthrough?5.6:4.8)-i*.14)/.35);el.classList.toggle('field-inspected',inspect&&Math.floor((time-23)/2)%3===i)});
 const edge=opensRight?cx:cx+cw;q('.connector').style.opacity=pop*fade;q('.connector path').setAttribute('d',`M${px} ${py-25}Q${(px+edge)/2} ${py-25} ${edge} ${cy+ch*.62}`);
 const command=q('.batch-command'),commandVisible=E((t-5.8)/.5)*(1-E((t-12.2)/.5));command.style.opacity=commandVisible*fade;
 q('.batch-command button span').textContent=done?'5 işletme hazır':'Veri Burada bilgileri topluyor';q('.batch-command button').classList.toggle('collecting',t>=6.8&&!done);q('.batch-track i').style.width=done?'100%':t<6.8?'0%':(count/5*100)+'%';
 q('.batch-command>small').textContent=t<6.8?'Bulunan işletmeler birlikte işlenir':`${count} / 5 kayıt işlendi`;
 q('.summary').style.opacity=mobile&&!portrait?0:E((t-6.8)/.5)*(1-revealList*(mobile?1:0))*fade;q('.summary b').textContent=count;
 q('.results').style.opacity=revealList*fade;q('.results').style.transform=mobile?`translateY(${(1-revealList)*25}px)`:`translateX(${(1-revealList)*16}px)`;
 q('.result-count').textContent=count;q('.progress-count').textContent=count+' / 5';q('.progress-label').textContent=done?'Listeniz hazır':'İşletmeler birlikte işleniyor';q('.track i').style.width=count/5*100+'%';
 qa('.row').forEach((row,i)=>{const a=E((t-batchTimes[i])/.55);row.style.opacity=a;row.style.transform=`translateY(${(1-a)*5}px)`;row.classList.toggle('row-inspected',walkthrough&&time>23&&time<30&&i===0)});
 q('.result-footer button').style.opacity=done?1:.25;const exported=t>=20.3;q('.result-footer button').classList.toggle('exported',exported);q('.result-footer button span').textContent=exported?'Dışa aktarıldı':'Dışa aktar';const file=E((t-20.1)/.6);q('.complete').style.opacity=file*fade;q('.complete').style.marginBottom=(1-file)*-8+'px';
 const cursor=q('.cursor'),cursorOn=t>18.7&&t<20.7,button=q('.result-footer button');
 const r=button.getBoundingClientRect(),factor=stage.getBoundingClientRect().width/W,x=(r.left+r.width*.72-stage.getBoundingClientRect().left)/factor,y=(r.top+r.height*.55-stage.getBoundingClientRect().top)/factor;
 cursor.style.transform=`translate(${x}px,${y}px)`;cursor.style.opacity=cursorOn?1:0;const clickAt=19.6,click=(t-clickAt)/.45;q('.click').style.left=x+'px';q('.click').style.top=y+'px';q('.click').style.opacity=click>0&&click<1?(1-click)*.7:0;q('.click').style.scale=.7+clamp(click);
 if(walkthrough){const chapter=time<10?0:time<22?1:time<31?2:3;qa('.walkthrough-steps>span').forEach((el,i)=>{el.classList.toggle('active',chapter===i);el.classList.toggle('complete-step',chapter>i)});q('.walkthrough-fields').style.opacity=E((time-1)/.6)*(1-E((time-6)/.8));stage.classList.toggle('inspecting',inspect);if(inspect)q('.connector').style.opacity=0}
};
