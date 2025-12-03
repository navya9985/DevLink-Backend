const express= require("express");
const authRouter=express.Router();
const User=require("../models/usermodel.js");
const Validate=require("../utils/validators.js");
const bcrypt=require("bcrypt");
const cookieparser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const userAuth=require("../userAuth.js");


authRouter.post("/signup",async(req,res)=>
{
   

    try{
    Validate(req);
     const{firstName,lastName,emailId}=req.body;
    
    const {password}=req.body;
    const passwordhash= await bcrypt.hash(password,10);
    const user=new User( {
        firstName,
        lastName,
        emailId,
        password:passwordhash
    });
    
const saveuser = await user.save();
 const token= await jwt.sign({_id:saveuser._id},"Navya@9985",{expiresIn:"1d"});
 res.cookie("token",token,{
expiresIn:new Date(Date.now + 8*3600000)
                });;

res.send(saveuser);
}
catch(err){
    res.status(404).send("something wrong" + err.message);
}
})



authRouter.post("/login",async(req,res)=>
{
       try{
    const{emailId,password}=req.body;
    const user= await User.findOne({emailId:emailId});
        if(!user)
        {
            throw new Error("user is not found");
        }
        const passwordvalid=await bcrypt.compare(password,user.password);
        if(!passwordvalid)
        {

            throw new Error("Invaild");
        }
        else
        {
            const token= await jwt.sign({_id:user._id},"Navya@9985",{expiresIn:"1d"});
                res.cookie("token",token,{
                    expiresIn:new Date(Date.now + 8*3600000)
                });;
            res.send(user);
        
        }
       
    }
     catch(err)
    { 
        res.status(404).send("something wrong" + err.message);
    }

});


authRouter.post("/logout",async(req,res)=>
{
    try{
    res.cookie("token",null,{
        expires:new Date(Date.now())
    });
    res.send("logout successfully");
}
  catch(err)
    { 
        res.status(404).send("something wrong" + err.message);
    }


})

module.exports=authRouter;