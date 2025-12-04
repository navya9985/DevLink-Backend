

const express=require("express");
const app=express();
const User=require("./models/usermodel.js");
const Validate=require("./utils/validators.js");
const bcrypt=require("bcrypt");
const cookieparser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const userAuth=require("./userAuth.js");
const cors=require("cors");
app.use("/uploads", express.static("uploads"));


app.use(express.json());
app.use(cookieparser());
app.use(cors({
    origin:"https://devlink-frontend-lxmp.onrender.com",
    credentials:true,
}));




const authRouter=require("./routes/auth.js");
const profileRouter=require("./routes/profile.js");
const requestRouter=require("./routes/request.js");
const usersRouter=require("./routes/users.js");


app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",usersRouter);

 const connectdb =require("./config/database.js");
const { METHODS } = require("http");
 
connectdb().then(()=>
{
    console.log("database connecter sucesfully");
    app.listen(8000,()=>
 {
    console.log("server is listening.....");
})
}
).catch((err)=>
{
    console.error("not connected");
});

 
