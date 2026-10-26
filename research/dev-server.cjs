'use strict';
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),zlib=require('node:zlib');
const root=path.resolve(__dirname,'../public'),port=Number(process.env.PORT||4175);
const handlers={'/api/free-search':require('../api/free-search'),'/api/onboarding-config':require('../api/onboarding-config')};
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.json':'application/json; charset=utf-8','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2','.mp4':'video/mp4','.ico':'image/x-icon','.txt':'text/plain; charset=utf-8','.xml':'application/xml; charset=utf-8'};
const compressed=new Map();
http.createServer(async(req,res)=>{
 res.status=n=>{res.statusCode=n;return res};res.json=data=>{res.setHeader('Content-Type','application/json; charset=utf-8');res.end(JSON.stringify(data))};
 let url;try{url=new URL(req.url,'http://localhost')}catch{return res.status(400).end()}
 if(['/eklenti-indir','/eklenti-indir/'].includes(url.pathname)){res.statusCode=308;res.setHeader('Location','/basla/');return res.end()}
 if(handlers[url.pathname]){
  let body='',large=false;for await(const chunk of req){if(Buffer.byteLength(body)+chunk.length>8192){large=true;break}body+=chunk.toString()}
  if(large)return res.status(413).json({error:{code:'INPUT_TOO_LARGE',message:'Arama bilgileri çok uzun.'}});
  req.body=body||undefined;try{return await handlers[url.pathname](req,res)}catch{return res.status(500).json({error:{code:'INTERNAL_ERROR',message:'İstek tamamlanamadı.'}})}
 }
 if(!['GET','HEAD'].includes(req.method))return res.status(405).end();
 let decoded;try{decoded=decodeURIComponent(url.pathname)}catch{return res.status(400).end()}
 const file=path.resolve(root,'.'+decoded+(decoded.endsWith('/')?'index.html':''));if(!file.startsWith(root+path.sep))return res.status(403).end();
 if(!decoded.endsWith('/')&&!path.extname(decoded)&&fs.existsSync(path.join(file,'index.html'))){res.statusCode=308;res.setHeader('Location',decoded+'/'+url.search);return res.end()}
 let stat;try{stat=fs.statSync(file);if(!stat.isFile())throw Error()}catch{res.statusCode=404;res.setHeader('Content-Type','text/html; charset=utf-8');return res.end(fs.readFileSync(path.join(root,'404.html')))}
 const ext=path.extname(file);res.setHeader('Content-Type',types[ext]||'application/octet-stream');res.setHeader('Accept-Ranges','bytes');res.setHeader('Cache-Control','no-cache');res.setHeader('X-Content-Type-Options','nosniff');
 const range=req.headers.range;
 if(range){const m=/^bytes=(\d+)-(\d*)$/.exec(range);if(!m)return res.status(416).end();const start=Number(m[1]),end=Math.min(m[2]?Number(m[2]):stat.size-1,stat.size-1);if(start> end||start>=stat.size)return res.status(416).end();res.statusCode=206;res.setHeader('Content-Range',`bytes ${start}-${end}/${stat.size}`);res.setHeader('Content-Length',end-start+1);if(req.method==='HEAD')return res.end();return fs.createReadStream(file,{start,end}).pipe(res)}
 if(['.html','.css','.js','.svg','.json','.txt'].includes(ext)&&req.headers['accept-encoding']?.includes('gzip')){const key=file+':'+stat.mtimeMs;let data=compressed.get(key);if(!data){data=zlib.gzipSync(fs.readFileSync(file));compressed.set(key,data);if(compressed.size>100)compressed.clear()}res.setHeader('Content-Encoding','gzip');res.setHeader('Vary','Accept-Encoding');res.setHeader('Content-Length',data.length);return req.method==='HEAD'?res.end():res.end(data)}
 res.setHeader('Content-Length',stat.size);if(req.method==='HEAD')return res.end();fs.createReadStream(file).pipe(res);
}).listen(port,'127.0.0.1',()=>process.stdout.write(`Veri Burada + onboarding API: http://127.0.0.1:${port}/\n`));
