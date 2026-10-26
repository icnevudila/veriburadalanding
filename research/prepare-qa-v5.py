from pathlib import Path
s=Path('research/verify-v3.cjs').read_text(encoding='utf-8').replace('verification-v3.json','verification-v5.json').replace('v3-final-','v5-final-').replace('v3-no-javascript','v5-no-javascript')
s=s.replace("await p.addScriptTag({path:'research/axe.min.js'});", "await p.waitForTimeout(500);await p.addScriptTag({path:'research/axe.min.js'});")
s=s.replace("out.accessibility={", "out.hitTest=await p.locator('#download-demo').evaluate(e=>{const r=e.getBoundingClientRect();return{r:r.toJSON(),hits:[2,12,24,36,46].map(y=>[y,document.elementFromPoint(r.x+r.width/2,r.y+y)?.className])}});out.accessibility={")
Path('research/verify-v5.cjs').write_text(s,encoding='utf-8')
s=Path('research/verify-map-v4.cjs').read_text(encoding='utf-8').replace('verification-map-v4.json','verification-media-v5.json').replace('map-v4-','media-v5-')
Path('research/verify-media-v5.cjs').write_text(s,encoding='utf-8')
