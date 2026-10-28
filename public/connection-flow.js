/* Fixed-field connection composition; 3D pipe routing with energetic data packets. */
(() => {
 const root=document.querySelector('.connection-section'),M=window.VBMotion;if(!root||!M)return;
 const scenes=[...root.querySelectorAll('.flow-scene')].map(svg=>({
  svg,
  inputs:[...svg.querySelectorAll('.flow-input')],
  outputs:[...svg.querySelectorAll('.flow-output')],
  rows:[...svg.querySelectorAll('.flow-result-row')],
  paths:[...svg.querySelectorAll('.flow-trace')].map(path=>{
   const r=path.dataset.route;
   return {
    path,
    glow:svg.querySelector(`.flow-trace-glow[data-route="${r}"]`),
    length:path.getTotalLength(),
    packet:svg.querySelector(`.flow-packet[data-route="${r}"]`)
   };
  }),
  halo:svg.querySelector('.flow-halo'),
  success:svg.querySelector('.flow-success')
 }));
 const controls=root.querySelector('.connection-controls');if(controls)controls.hidden=true;
 M.create(root,{duration:11500,staticAt:9200,target:root.querySelector('.connection-stage'),render:t=>{
  root.dataset.state=t<3.2?'inputs':t<6.5?'connections':t<8.8?'resolve':'ready';
  const out=1-M.smooth((t-10.6)/0.8);
  scenes.forEach(d=>{
   d.inputs.forEach((n,i)=>{
    n.style.opacity=.55+.45*M.ease((t-.6-i*.95)/.6);
    n.style.transform='none';
    const rect=n.querySelector('rect');
    if(rect)rect.style.stroke=t>.6+i*.95&&t<1.55+i*.95?'#77bd91':'#d5e4da';
   });
   d.paths.forEach(({path,glow,length,packet},i)=>{
    const at=i<2?0.85+i*.95:3.6;
    const a=M.clamp((t-at)/1.35);
    path.style.strokeDasharray='1';
    path.style.strokeDashoffset=1-a;
    path.style.opacity=String(0.95*out);
    if(glow){
     glow.style.strokeDasharray='1';
     glow.style.strokeDashoffset=1-a;
     glow.style.opacity=String(0.55*out);
    }
    const p=M.clamp((t-at-.1)/1.5);
    const point=path.getPointAtLength(length*p);
    packet.setAttribute('cx',point.x);
    packet.setAttribute('cy',point.y);
    packet.style.opacity=p>0&&p<1?String(out):'0';
   });
   d.outputs.forEach(n=>{n.style.transform='none';n.style.opacity=.2+.8*M.ease((t-4.8)/.9)*out});
   d.rows.forEach(n=>{n.style.transform='none';n.style.opacity=(.15+.85*M.ease((t-5.0)/.8))*out});
   if(d.halo){d.halo.style.opacity=t>2.5&&t<4.4?String(Math.sin((t-2.5)/1.9*Math.PI)*.3):'0';d.halo.style.transform='none'}
   if(d.success){d.success.style.opacity=M.ease((t-5.8)/.7)*out}
  });
 }});
})();
