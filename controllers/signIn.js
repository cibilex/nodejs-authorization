const CustomError = require("../helpers/customError");
const asyncErrorHandler = require("express-async-handler");
const userModel = require("../models/user");
const {createJWT,sendCookie}=require("../helpers/jwtCookie")

module.exports.getSignIn = (req, res, next) => {
  res.render("signIn");
};
module.exports.postSignIn = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user=await userModel.login(email, password);
  const token=createJWT(user.id)
  sendCookie(res,token)
  res.status(200).json({
      success:true,
      message:user
  })
});

module.exports.undefined = (req, res, next) => {
  res.render("undefined");
};

module.exports.logout=(req,res,next)=>{
  res .clearCookie("token")
  res.redirect("/signin")
}
