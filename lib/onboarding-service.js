'use strict';
const crypto = require('node:crypto');
const PREVIEW_LIMIT = 5;
const ALLOWED_FIELDS = ['phone', 'website', 'address', 'location', 'rating'];
class SearchError extends Error { constructor(status, code, message) { super(message); this.status=status; this.code=code; } }
const clean = (value, max=160) => typeof value === 'string' ? value.replace(/[\u0000-\u001f\u007f]/g,'').trim().slice(0,max) : '';
function validate(input) {
 if(!input || typeof input!=='object' || Array.isArray(input))throw new SearchError(400,'INVALID_INPUT','Arama bilgileri geçersiz.');
 const sector=clean(input.sector,100),city=clean(input.city,80),district=clean(input.district,100);
 if(sector.length<2)throw new SearchError(400,'SECTOR_REQUIRED','En az iki karakterlik bir işletme türü yazın.');
 if(city.length<2)throw new SearchError(400,'CITY_REQUIRED','Arama yapılacak ili seçin.');
 const purpose=['sales','agency','local','research'].includes(input.purpose)?input.purpose:'sales';
 const fields=Array.isArray(input.fields)?[...new Set(input.fields.filter(x=>ALLOWED_FIELDS.includes(x)))]:['phone','website','address'];
 return {purpose,sector,city,district,fields,previewLimit:PREVIEW_LIMIT};
}
function safeWebsite(value) {
 try {const u=new URL(value);return ['http:','https:'].includes(u.protocol)?u.href:null}catch{return null}
}
function sanitizeRecord(record,index,fields) {
 const r=record&&typeof record==='object'?record:{};
 const out={id:clean(r.id,100)||`record-${index+1}`,name:clean(r.name,160)||'İsimsiz işletme',category:clean(r.category,100),city:clean(r.city,80),district:clean(r.district,100)};
 if(fields.includes('phone'))out.phone=clean(r.phone,60)||null;
 if(fields.includes('website'))out.website=safeWebsite(r.website);
 if(fields.includes('address'))out.address=clean(r.address,240)||null;
 if(fields.includes('location'))out.location=Number.isFinite(r.latitude)&&Number.isFinite(r.longitude)&&Math.abs(r.latitude)<=90&&Math.abs(r.longitude)<=180?{latitude:r.latitude,longitude:r.longitude}:null;
 if(fields.includes('rating'))out.rating=Number.isFinite(r.rating)&&r.rating>=0&&r.rating<=5?r.rating:null;
 return out;
}
function signupUrl(env,searchId) {
 if(!env.APP_SIGNUP_URL)return null;
 try{const u=new URL(env.APP_SIGNUP_URL);if(u.protocol!=='https:')return null;u.searchParams.set('from','veriburada-landing');if(searchId)u.searchParams.set('searchId',searchId);return u.href}catch{return null}
}
function configuration(env=process.env) {
 const mode=env.FREE_SEARCH_MODE||(env.FREE_SEARCH_API_URL?'live':'demo');
 return {mode:mode==='live'?'live':'demo',previewLimit:PREVIEW_LIMIT,signupConfigured:Boolean(signupUrl(env)),searchEndpoint:'/api/free-search'};
}
function demoRecords(query) {
 const prefixes=['Merkez','Park','Mavi','Kent','Yeni'];
 const stem={'Mimarlık ofisleri':'Mimarlık','Kafeler':'Kafe','Diş klinikleri':'Diş Kliniği','Emlak ofisleri':'Emlak','Restoranlar':'Restoran','Güzellik salonları':'Güzellik Salonu'}[query.sector]||'Örnek İşletme';
 // Deliberately illustrative contacts; never used to fill missing live records.
 const centers={'İstanbul':[41.032,28.977],'Ankara':[39.920,32.854],'İzmir':[38.423,27.143],'Bursa':[40.195,29.060],'Antalya':[36.887,30.705],'Kocaeli':[40.765,29.940]};
 const center=centers[query.city];
 return prefixes.map((prefix,i)=>({id:`demo-${i+1}`,name:`${prefix} ${stem}`,category:query.sector,city:query.city,district:query.district,phone:`+90 (000) 000 10 0${i+1}`,website:`https://ornek-isletme-${i+1}.example`,address:`Örnek Sokak No: ${i+1}, ${[query.district,query.city].filter(Boolean).join(', ')}`,rating:[4.7,4.8,4.6,4.9,4.5][i],...(center?{latitude:center[0]+i*.0004,longitude:center[1]+i*.0003}:{})}));
}
async function search(input,{env=process.env,fetcher=global.fetch,signal}={}) {
 const query=validate(input),config=configuration(env);let data,requestId=crypto.randomUUID();
 if(config.mode==='demo')data={total:17,results:demoRecords(query),searchId:`demo-${requestId}`};
 else {
  let endpoint;try{endpoint=new URL(env.FREE_SEARCH_API_URL);if(endpoint.protocol!=='https:')throw Error()}catch{throw new SearchError(503,'NOT_CONFIGURED','Arama bağlantısı henüz yapılandırılmadı.');}
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),25000);
  const onAbort=()=>controller.abort();if(signal){if(signal.aborted)controller.abort();else signal.addEventListener('abort',onAbort,{once:true});}
  try {
   const headers={'Content-Type':'application/json','Accept':'application/json','X-Preview-Limit':String(PREVIEW_LIMIT),'X-Request-ID':requestId};
   if(env.FREE_SEARCH_AUTH_TOKEN)headers.Authorization=`Bearer ${env.FREE_SEARCH_AUTH_TOKEN}`;
   const response=await fetcher(endpoint.href,{method:'POST',headers,body:JSON.stringify(query),signal:controller.signal,redirect:'error'});
   if(response.status===429)throw new SearchError(429,'RATE_LIMITED','Arama sınırına ulaşıldı. Bir süre sonra yeniden deneyin.');
   if(!response.ok)throw new SearchError(502,'UPSTREAM_FAILED','Arama servisine şu anda ulaşılamıyor.');
   const body=await response.text();if(Buffer.byteLength(body)>2000000)throw new SearchError(502,'INVALID_RESPONSE','Arama yanıtı işlenemedi.');
   try{data=JSON.parse(body)}catch{throw new SearchError(502,'INVALID_RESPONSE','Arama yanıtı işlenemedi.');}
   if(!Array.isArray(data.results)||!Number.isSafeInteger(data.total)||data.total<0||data.total<data.results.length)throw new SearchError(502,'INVALID_RESPONSE','Arama yanıtı beklenen biçimde değil.');
  }catch(e){if(e instanceof SearchError)throw e;if(e.name==='AbortError')throw new SearchError(504,'TIMEOUT','Arama zaman aşımına uğradı. Yeniden deneyebilirsiniz.');throw new SearchError(502,'UPSTREAM_FAILED','Arama servisine şu anda ulaşılamıyor.');}
  finally{clearTimeout(timeout);signal?.removeEventListener('abort',onAbort);}
 }
 const results=data.results.slice(0,PREVIEW_LIMIT).map((r,i)=>sanitizeRecord(r,i,query.fields));
 const searchId=clean(data.searchId,100)||requestId;
 return {mode:config.mode,demo:config.mode==='demo',requestId,searchId,query,previewLimit:PREVIEW_LIMIT,total:data.total,shown:results.length,remaining:Math.max(0,data.total-results.length),results,signupUrl:signupUrl(env,searchId)};
}
module.exports={PREVIEW_LIMIT,SearchError,validate,configuration,search};
