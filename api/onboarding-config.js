const {configuration}=require('../lib/onboarding-service');
module.exports=(req,res)=>{res.setHeader('Cache-Control','no-store');if(req.method!=='GET')return res.status(405).json({error:{code:'METHOD_NOT_ALLOWED',message:'Bu istek desteklenmiyor.'}});return res.status(200).json(configuration());};
