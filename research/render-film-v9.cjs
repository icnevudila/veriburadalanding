const fs=require('fs'),{spawn}=require('child_process'),{once}=require('events');
const{chromium}=require('C:/Users/TP2/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const profiles={desktop:{width:1440,height:900,query:''},'hero-mobile':{width:1080,height:780,query:'?mobile'},mobile:{width:960,height:1200,query:'?mobile&portrait'}};
 const selected=process.argv[2]?[process.argv[2]]:Object.keys(profiles);
 for(const name of selected){
  const {width,height,query}=profiles[name],page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
  await page.goto('http://127.0.0.1:4173/film-render-v9.html'+query,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
  const output=`research/product-v9-${name}-render.mp4`,ff=spawn('ffmpeg',['-hide_banner','-loglevel','error','-y','-f','image2pipe','-framerate','30','-vcodec','mjpeg','-i','pipe:0','-an','-c:v','libx264','-preset','fast','-crf','18','-vf','scale=in_range=pc:out_range=tv:out_color_matrix=bt709,format=yuv420p','-color_range','tv','-colorspace','bt709','-color_primaries','bt709','-color_trc','bt709','-movflags','+faststart',output],{stdio:['pipe','ignore','pipe']});
  let errors='';ff.stderr.on('data',d=>errors+=d);ff.stdin.on('error',()=>{});
  const cdp=await page.context().newCDPSession(page);
  for(let i=0;i<480;i++){
   await page.evaluate(t=>seek(t),i/30);
   const shot=await cdp.send('Page.captureScreenshot',{format:'jpeg',quality:93,fromSurface:true});
   if(!ff.stdin.write(Buffer.from(shot.data,'base64')))await once(ff.stdin,'drain');
   if(i===225)fs.writeFileSync(`public/product-v9-${name}-poster.jpg`,Buffer.from(shot.data,'base64'));
   if(i%120===0)console.log(name,`${i}/480`);
  }
  ff.stdin.end();const[code]=await once(ff,'close');if(code!==0)throw Error(errors);await page.close();console.log(name,'encoded',fs.statSync(output).size);
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1});
