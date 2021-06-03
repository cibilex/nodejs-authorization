const mongoose=require("mongoose")
const Schema=mongoose.Schema;
const uniqueValidator=require("mongoose-unique-validator")
const bcrypt=require("bcrypt")
const CustomError=require("../helpers/customError")


const userSchema=new Schema({
    username:{
        type:String,
        minlength:[2,"username length must be greater than 2"],
        maxlength:[30,"username length must be lesser than 30"],
        required:[true,"pls enter to username"],
        unique:true,
        uniqueCaseInsensitive:true
    },
    password:{
        type:String,
        minlength:[6,"password length must be greater than 2"],
        maxlength:[30,"password length must be lesser than 30"],
        required:[true,"pls enter to password"],
        select:false,
    },
    email:{
        type:String,
        lowercase:true,
        required:[true,"pls enter to email"],
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "pls enter a valid email address",
          ],
        unique:true
    }
},{timestamps:true})

userSchema.plugin(uniqueValidator,{message:'{PATH} must be unique'})

userSchema.pre("save",function(next){
    if(!this.isModified("password")) next()

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
          if (err) return next(err);
          console.log("password hash done".green.italic);
          this.password = hash;
          next();
        });
      })

})

userSchema.statics.login=async function(email,password){
    try{
        const user=await this.findOne({email}).select("+password")
        if(!user) throw new CustomError("no user with that email",400)
        const passwordControl=await bcrypt.compare(password,user.password)
        if(!passwordControl) throw new CustomError("incorrect password",400)
        return user
    }catch(e){
        throw e
    }
}




const  userModel=mongoose.model("userModel",userSchema,"users")

module.exports=userModel