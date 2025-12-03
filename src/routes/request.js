const express= require("express");
const requestRouter=express.Router();
const User=require("../models/usermodel.js");
const Validate=require("../utils/validators.js");
const bcrypt=require("bcrypt");
const cookieparser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const userAuth=require("../userAuth.js");
const Connectionrequest=require("../models/connection.js");

requestRouter.post("/request/send/:status/:touserid",userAuth,async(req,res)=>
{
    try{
        const fromuserid=req.user._id;
        const touserid=req.params.touserid;
        const status=req.params.status;
        const allowed=["ignored","intersed"];
        if(!allowed.includes(status))
        {
            return res.send("invalied status type");
        }
        const existingconnection = await Connectionrequest.findOne({
            $or:[
                {fromuserid,touserid},
                {fromuserid:touserid,touserid:fromuserid}
            ]
        })
        if(existingconnection)
        {
            return res.send("already have a connection");
        }
        const touser=await User.findById(touserid);
        if(!touser)
        {
            return res.send("userid is not in database");
        }
         if(fromuserid.equals(touserid))
    {
        throw new Error ("not request to urself");
    }

        const connectionrequest=new Connectionrequest({
            fromuserid,touserid,status
        })
        const data=await connectionrequest.save();
        res.json({
            message:"connection request send succesfully",
            data,
        })
    }
     catch(err)
    { 
        res.status(404).send("something wrong" + err.message);
    }
    
})


requestRouter.post("/request/review/:status/:requestid",userAuth,async(req,res)=>
{
    try{
        const loginuser=req.user;
        const {requestid,status}=req.params;
        const allowed=["accepted","rejected"];
        if(!allowed.includes(status))
        {
            return res.send("invalied status type");
        }
        const connection = await Connectionrequest.findOne({
           _id:requestid,
           touserid:loginuser._id,
           status:"intersed",
        })
        if(!connection)
        {
            return res.send("connection not found");
        }
         connection.status=status;
        const data=await connection.save();
        res.json({
            message:"connection request changed succesfully",
            data,
        })
    }
     catch(err)
    { 
        res.status(404).send("something wrong" + err.message);
    }
    
})










module.exports=requestRouter;