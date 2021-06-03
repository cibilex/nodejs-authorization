const router=require("express").Router();
const {undefined}=require("../controllers/signIn")
const {userAuth}=require("../middlewares/auth")
const {logout}=require("../controllers/signIn")
const {cookieControl,getToken}=require("../middlewares/auth")
const currentUser=require("../middlewares/currentUser")


router.use("*",currentUser)
router.get('/', (req, res) => res.render('home'));
router.get('/smoothies',userAuth, (req, res) => {
    res.render('smoothies')
});
router.get("/logout",logout)
router.use("/signin",require("./signIn"))
router.use("/signup",require("./signUp"))
router.use(undefined)
module.exports=router