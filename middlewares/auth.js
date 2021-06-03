const jwt=require("jsonwebtoken")
const asyncErrorHandler=require("express-async-handler")
const CustomError=require("../helpers/customError")
const {cookieControl,getToken}=require("../helpers/jwtCookie")
const userModel=require("../models/user")



module.exports.userAuth=asyncErrorHandler(async (req,res,next)=>{
    if(!cookieControl(req)) return res.redirect("/signin")
    const token=getToken(req)
    try{
        const decoded=jwt.verify(token,process.env.JWT_SIGNATURE)
        console.log("successfuly authorization operation".magenta.bold)
        try{
            const user=await userModel.findById(decoded.id)
            next()
        }catch(e){
            next(e)
        }
    }catch(e){
        console.log(e)
        res.redirect("/signin")
    }
})