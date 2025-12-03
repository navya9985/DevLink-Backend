// const userAuth=require("./userAuth.js")
// app.use("/user",(req,res,next)=>
// {
//     res.send("response 1");
//     next();
// },(req,res)=>{
//     res.send("response2");
// })

// app.get("/user",userAuth,(req,res)=>
// {
//     res.send("sendinggg")
// });
// app.delete("/user",userAuth,(req,res)=>
// {
//     res.send("deleting...")
// });



// app.get("/userget",(req,res)=>
// {
//     res.send("hiiiiiiii")
// })
// some getting bad errorsss in postman to avoid that

// at last write it  to match all errors


// app.use("/",(err,req,res)=>
// {
//     if(err)
//     {
//     res.send("something went wrong");}
// })













// app.get("/feed",async(req,res)=>
// {
//     try{
//         const users= await User.find({});
//         res.send(users);
//     }
//     catch(err)
//     { 
//         res.send("no users found");
//     }

// })

// app.get("/user",async(req,res)=>
// {
//     const user=req.body.emailId;
//     try{
//         const users= await User.findOne({emailId:user});
//         if(users.length==0)
//         {
//             res.send("no users found");
//         }
//         else
//         {
//              res.send(users);
//         }
       
//     }
//      catch(err)
//     { 
//         res.status(404).send("something wrong" + err.message);
//     }

// })



// app.delete("/user",async(req,res)=>
// {
//     const user=req.body.userId;
//     try{
//         const users= await User.findByIdAndDelete({_id:user});
//        res.send("user deleted succesfully")
       
//     }
//      catch(err)
//     { 
//         res.status(404).send("something wrong" + err.message);
//     }

// })



// app.patch("/user/:userId",async(req,res)=>
// {
//     const user=req.params?.userId;
//     const data=req.body; //the date we updat egive in postman to update alond with id
//     const Allowedupdates=["photourl","about","skills","age"];
//     const updated=Object.keys(data).every((k)=>
//     {
//         Allowedupdates.includes(k);
//     }
//     );
//     if(!updated){
//         res.send("updated not allowed");
//     }
//     if(data?.skills.length>10)
//     {
//         res.send("skills length is large")
//     }


//     try{
//         const users= await User.findByIdAndUpdate({_id:user},data,{runValidators:true});
//        res.send("user updated succesfully")
       
//     }
//      catch(err)
//     { 
//         res.status(404).send("something wrong" + err.message);
//     }

// })



