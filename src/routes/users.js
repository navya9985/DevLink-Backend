const express= require("express");
const usersRouter=express.Router();
const userAuth=require("../userAuth.js");
const Connectionrequest=require("../models/connection.js");
const User=require("../models/usermodel.js");
usersRouter.get("/users/request",userAuth,async(req,res)=>
{
    try{
        const loginuser=req.user;
        const pendingrequest=await Connectionrequest.find({
            touserid:loginuser._id,
            status:"intersed",
        }).populate("fromuserid",["firstName","lastName"]) //if we dont send [] then all data send 
    res.json({
        message:"send pending succesfullly",
        pendingrequest,
    })

    }
    catch(err) 
    {
        res.status(404).send("something went wrong");
    }
})


usersRouter.get("/users/connection",userAuth,async(req,res)=>
{
    try{
        const loginuser=req.user;
        const connectionuser=await Connectionrequest.find({
            $or:[
                {touserid:loginuser._id,status:"accepted"},
                {fromuserid:loginuser._id,status:"accepted"}
            ]
        }).populate("fromuserid",["firstName","lastName"]).populate("touserid",["firstName","lastName"])
        const data=connectionuser.map((row)=>
        {
            if(row.touserid.equals(loginuser._id))
            {
          return   row.fromuserid ;
            }
         return row.touserid;
        });
          res.json({
        message:"send accepted data succesfullly",
        data
    })

    }
    catch(err) 
    {
        res.status(404).send("something went wrong");
    }
})


usersRouter.get("/users/feed",userAuth,async(req,res)=>
{
    try{
        const loginuser=req.user;
        const page=parseInt(req.query.page)||1;
        let limit=parseInt(req.query.limit)||10;
        //for p=supoose  auser send 1000000 limit in api a burden on database soo we do like these
        limit=limit>50?50:limit;
        const skip=(page-1)*limit;
         const allusers=await Connectionrequest.find({
            $or:[
                {touserid:loginuser._id},
                {fromuserid:loginuser._id}
            ]
        }).select(["fromuserid" , "touserid"])

        const hidefromfeed=new Set();
        allusers.forEach((req)=>
        {
            hidefromfeed.add(req.fromuserid.toString());
            hidefromfeed.add(req.touserid.toString());

        })
        const feedusers =await User.find({
            $and:[{ _id: {$nin:Array.from(hidefromfeed)} },{ _id:{$ne:loginuser._id}}]
        }).select(["firstName","lastName","age","photourl","gender"]).skip(skip).limit(limit);


        res.json({
        message:"send all users data succesfullly",
        feedusers
    })

    }
    catch(err) 
    {
        res.status(404).send("something went wrong");
    }
})

module.exports=usersRouter;