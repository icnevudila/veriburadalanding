const {search,SearchError}=require('../lib/onboarding-service');
module.exports=async(req,res)=>{
 res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');
 if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:{code:'METHOD_NOT_ALLOWED',message:'Bu istek desteklenmiyor.'}});}
 const origin=req.headers.origin;
 if(origin){try{if(new URL(origin).host!==req.headers.host)return res.status(403).json({error:{code:'ORIGIN_REJECTED',message:'Bu kaynaktan arama yapılamıyor.'}})}catch{return res.status(403).json({error:{code:'ORIGIN_REJECTED',message:'İstek kaynağı geçersiz.'}})}}
 let input=req.body;
 try{if(typeof input==='string'){if(Buffer.byteLength(input)>8192)throw new SearchError(413,'INPUT_TOO_LARGE','Arama bilgileri çok uzun.');input=JSON.parse(input);}if(Buffer.byteLength(JSON.stringify(input||{}))>8192)throw new SearchError(413,'INPUT_TOO_LARGE','Arama bilgileri çok uzun.');const result=await search(input);return res.status(200).json(result);}
 catch(e){const known=e instanceof SearchError;return res.status(known?e.status:400).json({error:{code:known?e.code:'INVALID_INPUT',message:known?e.message:'Arama bilgileri işlenemedi.'}});}
};
