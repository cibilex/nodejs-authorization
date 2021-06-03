const jwt=require("jsonwebtoken")
const CustomError=require("../helpers/customError")
const asyncErrorHandler=require("express-async-handler")


module.exports.createJWT=(payload)=>{
    return jwt.sign({id:payload},process.env.JWT_SIGNATURE,{expiresIn:Number(process.env.JWT_EXPIRESIN)})
}
module.exports.sendCookie=(res,token)=>{
    res.cookie("token",`Bearer:${token}`,{
        maxAge:Number(process.env.JWT_EXPIRESIN)*1000,
        httpOnly:true
    })
}

module.exports.cookieControl=(req)=>{
    return req.cookies.token && req.cookies.token.startsWith("Bearer:")
}
module.exports.getToken=(req)=>{
    return req.cookies.token.split(":")[1]
}