const asyncErrorHandler=require("express-async-handler")
const CustomError=require("../helpers/customError")
const userModel=require("../models/user")
const {createJWT,sendCookie}=require("../helpers/jwtCookie")




module.exports.getSignUp=(req,res,next)=>{
    res.render("signUp") 
}
module.exports.postSignUp=asyncErrorHandler(  async(req,res,next)=>{

    const {email,password,username}=req.body
    const user=await userModel.create({
        email,
        password,
        username
    })
    console.log(`${user.username} successfully registered`.america)
    const token=createJWT(user._id)
    sendCookie(res,token)
    res.status(201).json({
        success:true,
        data:user._id
    })
})