from pathlib import Path
p=Path('public/hero-premium.js');s=p.read_text(encoding='utf-8')
s=s.replace('<div class="hp-preparation">','<div class="hp-picker"></div><svg class="hp-pointer" viewBox="0 0 24 30"><path d="M2 2v23l6-6 5 9 4-2-5-9h9Z"/></svg><div class="hp-preparation">')
s=s.replace("const reveal=E((t-8.1)/1.05)","const reveal=E((t-9.4)/1.05)")
s=s.replace('progress=clamp((t-3)/4.5)','progress=clamp((t-6)/3)')
s=s.replace("surface.dataset.chapter=t<3?'request':t<8.1?'preparing':'account';", "surface.dataset.chapter=t<4.5?'selecting':t<9.4?'preparing':'account';")
s=s.replace('const a=E((t-.6-i*.48)/.6)','const a=E((t-4.6-i*.38)/.6)')
s=s.replace('E((t-6.3)/.45)','E((t-8.6)/.45)')
s=s.replace('t>3&&t<7.5','t>6&&t<9.1')
s=s.replace("String(E((t-3)/.6)*(1-E((t-7.6)/.4)))", "String(E((t-6.4)/.6)*(1-E((t-9.1)/.3)))")
s=s.replace('((1-E((t-3)/.6))*10)','((1-E((t-6.4)/.6))*10)')
s=s.replace('const a=E((t-8.5)/.7)','const a=E((t-9.8)/.7)')
s=s.replace("find('.hp-search>b').style.opacity=String(E((t-1.2)/.3));",'''find('.hp-search>b').style.opacity=String(E((t-4.1)/.3));
  const fields=[find('.hp-location'),find('.hp-district'),find('.hp-sector')],selected=[place.city,place.district,sector],labels=['İl','İlçe / Semt','Sektör'];
  const starts=[.2,1.65,3.1],selectedAt=[1.2,2.65,4.1];
  fields.forEach((field,i)=>{field.textContent=t>=selectedAt[i]?selected[i]:labels[i];field.classList.toggle('hp-field-active',t>=starts[i]&&t<selectedAt[i]+.22)});
  const active=starts.findIndex((start,i)=>t>=start&&t<selectedAt[i]+.22),picker=find('.hp-picker'),pointer=find('.hp-pointer');
  picker.style.opacity=active>=0?'1':'0';pointer.style.opacity=active>=0?'1':'0';
  if(active>=0){const altCities=['İstanbul','Ankara','İzmir','Bursa'].filter(v=>v!==place.city),altDistricts=place.city==='Ankara'?['Yenimahalle','Keçiören']:place.city==='İzmir'?['Bornova','Karşıyaka']:place.city==='Bursa'?['Osmangazi','Yıldırım']:['Beşiktaş','Üsküdar'];const choices=active===0?[altCities[0],place.city,altCities[1]]:active===1?[altDistricts[0],place.district,altDistricts[1]]:[sector==='Kafeler'?'Oteller':'Kafeler',sector,sector==='Restoranlar'?'Spor salonları':'Restoranlar'];const selectedNow=t>=selectedAt[active]-.25;
   const signature=active+'-'+choices.join('-')+'-'+selectedNow;if(picker.dataset.signature!==signature){picker.dataset.signature=signature;picker.innerHTML=choices.map((choice,i)=>`<div class="hp-option ${i===1&&selectedNow?'hp-option-selected':''}"><span>${choice}</span><b>${i===1&&selectedNow?'✓':''}</b></div>`).join('')}
   const width=mobile?(active===2?300:240):(active===2?510:370),field=fields[active],left=Math.min(W-width-24,Math.max(24,find('.hp-search').offsetLeft+field.offsetLeft-18)),top=mobile?104:166;picker.style.width=width+'px';picker.style.left=left+'px';picker.style.top=top+'px';picker.style.transform=`translateY(${(1-E((t-starts[active])/.2))*-5}px)`;pointer.style.left=(left+width*.72)+'px';pointer.style.top=(top+(mobile?64:90))+'px';pointer.style.transform=`scale(${selectedNow?.88:1})`;
  }''')
p.write_text(s,encoding='utf-8')
