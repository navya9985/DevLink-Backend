const express= require("express");
const profileRouter=express.Router();
const User=require("../models/usermodel.js");
 const validateeditprofile=require("../utils/validators.js");
const bcrypt=require("bcrypt");
const cookieparser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const userAuth=require("../userAuth.js");
const upload = require("../middleware/upload");


profileRouter.get("/profile",userAuth,async(req,res)=>
{
    try{
    const user=req.user;

    res.send(user) ;}
      catch(err)
    { 
        res.status(404).send("something wrong" + err.message);
    }
    
})





profileRouter.patch("/profile/edit",userAuth, async(req,res)=>
{
    try{
     if(!validateeditprofile(req)){
        return res.send("updated not allowed");
    }
    else
    {
    const loginuser= req.user;
    Object.keys(req.body).forEach((k)=>(loginuser[k]=req.body[k]));
        await loginuser.save();

       res.send("profile updated succesfully")}
}  

      catch(err)
    { 
        res.status(404).send("something wrong" + err.message);
    }
    
})
module.exports=profileRouter;