/* Two deliberately different films; service choice, not another dashboard tour. */
(()=>{
 const M=window.VBMotion;if(!M)return;
 const ease=(t,start,d=.7)=>M.ease((t-start)/d);
 document.querySelectorAll('[data-service-cinema]').forEach(root=>{
  if(root.dataset.serviceCinema==='research'){
   const pins=[...root.querySelectorAll('.sc-pins>span')],list=root.querySelector('.sc-list'),region=root.querySelector('.sc-region path'),scan=root.querySelector('.sc-scan');
   root._scene=M.create(root,{duration:21000,staticAt:15000,render:t=>{
    const ready=ease(t,8.8,1.1),out=1-M.smooth((t-19.8)/1.2),area=ease(t,.4,1.9);
    root.style.setProperty('--sc-ready',ready);root.style.setProperty('--sc-out',out);
    root.style.setProperty('--sc-location',String(t<1.7?ease(t,.1,.4):0));root.style.setProperty('--sc-sector',String(t>=1.7&&t<3.3?ease(t,1.7,.4):0));
    region.style.strokeDashoffset=String(1-area);region.style.fillOpacity=String(area*.22);
    pins.forEach((pin,i)=>{const a=ease(t,2.1+i*.6,.65);pin.style.opacity=String(a*(1-ready*.65)*out);pin.style.transform='translate(-50%,-100%) scale('+(.78+.22*a)+')'});
    const progress=M.smooth((t-5)/3);scan.style.transform='translateX('+(-100+progress*630)+'%)';scan.style.opacity=String(t>5&&t<8?.6:0);
    list.style.opacity=String(ready*out);list.style.transform='translateY('+((1-ready)*17)+'px)';root.querySelector('.sc-research-status').style.opacity=String(ease(t,5,.5)*(1-ease(t,8.5,.4)));
    root.querySelector('.sc-research-status>i').style.width=progress*100+'%';
    root.querySelector('.sc-search').style.opacity='1';
   }});
  }else{
   const openings=[...root.querySelectorAll('.nm-opening')],delivery=root.querySelector('.nm-delivery');
   const episodes=[{previous:['Çınar Kahve','Sokak Mutfak'],current:['Moda Kahve','Köşe Mutfak']},{previous:['Moda Kahve','Köşe Mutfak'],current:['Park Restoran','Ada Kahve']},{previous:['Park Restoran','Ada Kahve'],current:['Badem Kahve','Sahil Mutfak']}];
   const previous=openings.map(opening=>{const copy=opening.cloneNode(true);copy.classList.add('nm-previous');copy.classList.remove('nm-opening');copy.querySelector('.nm-business div>span').textContent='Önceki liste';root.insertBefore(copy,delivery);return copy});
   root._scene=M.create(root,{duration:63000,staticAt:15000,render:time=>{
    const episode=episodes[Math.min(2,Math.floor(time/21))],t=time%21;
    const current=ease(t,2.3,1),out=1-M.smooth((t-19.5)/1.5);
    root.style.setProperty('--nm-current',current);root.style.setProperty('--nm-out',out);
    const sweep=M.smooth((t-2.6)/3.6);root.querySelector('.nm-reveal').style.transform='translateX('+(-110+sweep*580)+'%)';root.querySelector('.nm-reveal').style.opacity=String(t>=2.6&&t<6.2?.65:0);
    previous.forEach((opening,i)=>{opening.querySelector('strong').textContent=episode.previous[i];opening.style.opacity=String((1-ease(t,2.3,.7))*.85);});
    openings.forEach((opening,i)=>{opening.querySelector('strong').textContent=episode.current[i];const a=ease(t,4+i*2,1);opening.style.opacity=String(a*out);opening.style.transform='translateY('+((1-a)*12)+'px)';opening.querySelector('.nm-pin>span').style.transform='scale('+(1+.16*Math.sin(Math.max(0,t-4-i*2)*2))+')'});
    const ready=ease(t,9,1);delivery.style.opacity=String(ready*out);delivery.style.transform='translateY('+((1-ready)*18)+'px)';
   }});
  }
  const preview=new URLSearchParams(location.search).get('service-frame');
  if(preview!==null&&Number.isFinite(Number(preview)))M.sample(root,Math.max(0,Math.min(root.dataset.serviceCinema==='monthly'?62:20,Number(preview))));
 });
 const focus=new URLSearchParams(location.search).get('service-focus');
 if(focus==='research'||focus==='monthly')document.fonts.ready.then(()=>requestAnimationFrame(()=>document.querySelector('[data-service-cinema="'+focus+'"]').scrollIntoView({block:'center',behavior:'instant'})));
})();
