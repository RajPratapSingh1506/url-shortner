const shortid = require('shortid');
const Url=require('./../model/urlModel');

exports.generateNewShortId=async(req,res)=>{
    const body=req.body;
    if(!body.url)
        return res.status(400).json({
            message:"Please provide the complete details"
    })
    console.log(body);
    
    const shortId=shortid();
    try{

    const newData=await Url.create({
        shortID:shortId,
        redirectUrl:body.url,
        visitHistory:[]
    });

    res.status(200).json({
        status:"success",
        data:{
            data:newData
        }
    })

    }catch(err){
    console.log(`Error:${err}`);
    }
};

exports.getAnalytics=async(req,res)=>{
    const shortId=req.params.shortId;
    if(!shortId) return res.json("Please provide the ShortId");
    
    try{
    const data=await Url.findOne({shortID:shortId});
    return res.status(200).json({
        stauts:"success",
        data:{
            totalClicks:data.visitHistory.length,
            analytics:data.visitHistory
        }
    })
}catch(err){
    console.log(`Error:${err}`);
    return res.status(400).json({
        status:"failure",
        Message:`${err}`
    })
    
}
};

exports.getRedirectUrl=async(req,res)=>{

    const shortId=req.params.shortId;
    console.log(shortId);
    
    const newData=await Url.findOneAndUpdate({shortID:shortId},{
        $push:{
            visitHistory:{
                timestamp: Date.now(),
            },
        },
    }
    );
    res.redirect(newData.redirectUrl);
}