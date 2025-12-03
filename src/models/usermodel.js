const mongoose=require("mongoose");
const validator=require("validator");
const userschema= new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
            minLength:6,
            index:true,
        },
        lastName:
        {
            type:String,
        },
        emailId:
        {
            type:String,
            required:true,
            unique:true,
            lowecase:true,
            trim:true,
            validate(value){
                if(!validator.isEmail(value))
                {
                    throw new error("not valid email");
                }
            }
        },
        password:
        {
            type:String,
            required:true,
        },
        age:
        {
            type:Number,
            min:18,
        },
        gender:
        {
            type:String,
            validate(value){
                if(!["male","female","others"].includes(value))
                {
                    throw new error("gender value is not valid");
                }
            }
        },
        photourl:
        {
            type:String,
            default:"http://localhost:9000/images/download.png",
        },
        about:
        {
            type:String,
            default:"this is short description about user....."
        },
        skills:
        {
            type:[String],
        },
    },
    {
        timestamps:true,
    }
);



userschema.methods.getJWT= async function()
{

    const user=this;
    const token= await jwt.sign({_id:user._id},"Navya@9985",{expiresIn:"1d"});
                console.log(token);
                res.cookie("token",token,{
                    expires:new Date(Date.now + 8*3600000)
                });
                return token;

}
const User=mongoose.model("User",userschema);
module.exports=User;
