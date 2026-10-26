/* Fixed-field connection composition; only routes and matching evidence resolve. */
(() => {
 const root=document.querySelector('.connection-section'),M=window.VBMotion;if(!root||!M)return;
 const scenes=[...root.querySelectorAll('.flow-scene')].map(svg=>({svg,inputs:[...svg.querySelectorAll('.flow-input')],outputs:[...svg.querySelectorAll('.flow-output')],rows:[...svg.querySelectorAll('.flow-result-row')],paths:[...svg.querySelectorAll('.flow-trace')].map(path=>({path,length:path.getTotalLength(),packet:svg.querySelector(`.flow-packet[data-route="${path.dataset.route}"]`)})),halo:svg.querySelector('.flow-halo'),success:svg.querySelector('.flow-success')}));
 const controls=root.querySelector('.connection-controls');if(controls)controls.hidden=true;
 M.create(root,{duration:14000,staticAt:11200,target:root.querySelector('.connection-stage'),render:t=>{
  root.dataset.state=t<3.8?'inputs':t<7.5?'connections':t<10?'resolve':'ready';const out=1-M.smooth((t-13)/1);
  scenes.forEach(d=>{d.inputs.forEach((n,i)=>{n.style.opacity=.55+.45*M.ease((t-.7-i*1.05)/.6);n.style.transform='none';const rect=n.querySelector('rect');if(rect)rect.style.stroke=t>.7+i*1.05&&t<1.65+i*1.05?'#77bd91':'#d5e4da'});
   d.paths.forEach(({path,length,packet},i)=>{const at=i<3?1+i*1.05:i===3?5.1:7;const a=M.clamp((t-at)/1.45);path.style.strokeDasharray='1';path.style.strokeDashoffset=1-a;path.style.opacity=.7*out;const p=M.clamp((t-at-.12)/1.6),point=path.getPointAtLength(length*p);packet.setAttribute('cx',point.x);packet.setAttribute('cy',point.y);packet.style.opacity=p>0&&p<1?String(out):'0'});
   d.outputs.forEach((n,i)=>{n.style.transform='none';n.style.opacity=.2+.8*M.ease((t-6.2-i*1.4)/1)*out});d.rows.forEach(n=>{n.style.transform='none';n.style.opacity=(.15+.85*M.ease((t-6.4)/.9))*out});d.halo.style.opacity=t>3.2&&t<5.4?String(Math.sin((t-3.2)/2.2*Math.PI)*.2):'0';d.halo.style.transform='none';d.success.style.opacity=M.ease((t-9)/.8)*out;
  });
 }});
})();
