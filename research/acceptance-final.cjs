const fs=require('fs');
const {chromium}=require('C:/Users/TP2/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const b=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const ctx=await b.newContext({viewport:{width:1440,height:1000},acceptDownloads:true});
 const p=await ctx.newPage(),errors=[],bad=[],external=[];
 p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)bad.push([r.url(),r.status()])});p.on('request',r=>{if(/^https?:/.test(r.url())&&!r.url().startsWith('http://127.0.0.1:4173/'))external.push(r.url())});
 await p.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});
 const out={errors,bad,external,geometry:[],accessibility:[],checks:{}};
 const check=(name,value)=>{out.checks[name]=Boolean(value)};
 for(const width of[320,360,390,430,768,1024,1440,1920]){
   await p.setViewportSize({width,height:1000});await p.waitForTimeout(100);
   out.geometry.push(await p.evaluate(()=>({width:innerWidth,documentWidth:document.documentElement.scrollWidth})));
 }
 await p.setViewportSize({width:1440,height:1000});await p.locator('.interactive-example>summary').click();await p.selectOption('#demo-sector-select','cafe');await p.waitForTimeout(1900);
 check('sector records',await p.locator('.panel-record>div>strong').first().textContent()==='Köşe Kahve');
 check('sample synchronized',await p.locator('.output-window tbody th').first().textContent()==='KKöşe Kahve');
 const downloads=[];
 for(const selector of['#download-demo','.output-download']){
   const promise=p.waitForEvent('download');await p.locator(selector).click();const d=await promise;
   const path=`research/final-${downloads.length}-sample.csv`;await d.saveAs(path);const csv=fs.readFileSync(path,'utf8');downloads.push({selector,file:d.suggestedFilename(),rows:csv.split('\r\n').length,selected:csv.includes('Köşe Kahve'),sample:csv.includes('Temsili kayıt')});
 }
 out.downloads=downloads;
 await p.getByRole('tab',{name:'Satış ekipleri',exact:true}).focus();await p.keyboard.press('ArrowRight');
 check('keyboard audience tab',await p.getByRole('tab',{name:'Ajanslar',exact:true}).evaluate(e=>e===document.activeElement&&e.getAttribute('aria-selected')==='true'));
 await p.locator('.setup-guide>summary').click();
 for(let i=0;i<3;i++){await p.locator(`[data-step="${i}"]`).click();check('guide scene '+i,await p.locator(`[data-workflow-scene="${i}"]`).isVisible());}
 await p.locator('.setup-guide>summary').click();
 check('guide collapsed',await p.locator('[data-workflow-scene="2"]').isHidden());
 await p.locator('.film-media').scrollIntoViewIfNeeded();await p.waitForSelector('[data-motion=story].motion-ready');
 check('native product walkthrough ready',await p.locator('[data-motion=story] iframe').isVisible());
 check('overlay player controls removed',await p.locator('.hero-film-controls,.film-control,.film-next,.film-chapters,.demo-modal').count()===0);
 await p.emulateMedia({reducedMotion:'reduce'});await p.waitForTimeout(200);
 await p.locator('.faq-list details').nth(1).locator('summary').click();await p.locator('.faq-list details').nth(3).locator('summary').click();await p.waitForFunction(()=>[...document.querySelectorAll('.faq-list details')].filter(d=>d.open).length===1);check('single FAQ',true);
 check('internal anchors resolve',await p.locator('a[href^="#"]').evaluateAll(as=>as.every(a=>a.hash===''||a.hash==='#'||document.getElementById(decodeURIComponent(a.hash.slice(1))))));
 // Inspect the actual document in both layouts; interactive content is open for scanning.
 await p.addScriptTag({path:'research/axe.min.js'});
 for(const width of[1440,390]){
   await p.setViewportSize({width,height:1000});await p.locator('.setup-guide').evaluate(e=>e.open=true);
   for(let y=0;y<await p.evaluate(()=>document.body.scrollHeight);y+=700){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(35)}
   await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(250);
   const a=await p.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}}));
   out.accessibility.push({width,violations:a.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,reason:n.failureSummary}))})),manual:a.incomplete.map(v=>({id:v.id,nodes:v.nodes.length}))});
 }
 await p.locator('.setup-guide').evaluate(e=>e.open=false);
 for(const month of['1','3','6','12']){await p.locator(`[data-plan-choice="${month}"]`).click();check('mobile plan '+month,await p.locator('.price-card:visible').count()===1&&await p.locator(`[data-plan="${month}"]`).isVisible())}
 await p.locator('.menu-toggle').click();check('mobile menu',await p.locator('.menu-toggle').getAttribute('aria-expanded')==='true');await p.keyboard.press('Escape');check('menu escape',await p.locator('.menu-toggle').getAttribute('aria-expanded')==='false');
 check('all loaded images valid',await p.locator('img').evaluateAll(es=>es.every(e=>e.complete&&e.naturalWidth>0)));
 const nj=await b.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});await nj.goto('http://127.0.0.1:4173/');check('noJS plans',await nj.locator('.price-card:visible').count()===4);check('noJS static SVG',await nj.locator('.flow-phone').isVisible());check('noJS product poster',await nj.locator('[data-motion=story] .motion-poster img').isVisible());await nj.close();
 out.pass=Object.values(out.checks).every(Boolean)&&downloads.every(d=>d.selected&&d.sample&&d.rows===4)&&out.geometry.every(g=>g.width===g.documentWidth)&&!errors.length&&!bad.length&&!external.length&&out.accessibility.every(a=>!a.violations.length);
 fs.writeFileSync('research/acceptance-final.json',JSON.stringify(out,null,2));console.log(JSON.stringify(out));await b.close();
})();
