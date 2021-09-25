const {verify}=require('jsonwebtoken');

module.exports={
    checkToken:(req,res,next)=>{
let token=req.get('Authorization');
if(token){
token = token.slice(7);
verify(token,'qwe1234',(err,decoded)=>{
if(err){
    res.json({
        sucsses:0,
        message:'Invalid token.'
    })
}else{
    next();
}
})
}else{
    res.json({
        sucess:0,
        message:'Acsses Denied. Unauthorized user.'
    })
}

    }
}