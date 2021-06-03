const jwt = require("jsonwebtoken");
const asyncErrorHandler = require("express-async-handler");
const CustomError = require("../helpers/customError");
const { cookieControl, getToken } = require("../helpers/jwtCookie");
const userModel = require("../models/user");

const currentUser = asyncErrorHandler(async (req, res, next) => {
  if (!cookieControl(req)){
      res.locals.user=null
      return next()
  }
  const token = getToken(req);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SIGNATURE);
    console.log("successfuly authorization operation".magenta.bold);
    try {
      const user = await userModel.findById(decoded.id);
      res.locals.user=user
    } catch (e) {
      next(e);
    }
    next();
  } catch (e) {
    res.locals.user=null
    next()
  }
});

module.exports = currentUser;
