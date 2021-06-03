const router=require("express").Router();
const {getSignUp,postSignUp}=require("../controllers/signUp")
router.get("/",getSignUp)
router.post("/",postSignUp)


module.exports=router