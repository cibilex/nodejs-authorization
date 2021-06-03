const router=require("express").Router();
const {getSignIn,postSignIn}=require("../controllers/signIn")
const {userAuth}=require("../middlewares/auth")
router.get("/",getSignIn)
router.post("/",postSignIn)



module.exports=router