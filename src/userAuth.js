const jwt=require("jsonwebtoken");
const User=require("./models/usermodel");
const userAuth=async(req,res,next)=>
    {
try{
        const cookies=req.cookies;
            const {token}=cookies;
            if(!token)
            {
                throw new Error("invalid credits");
            }
            const decodedmessage= await jwt.verify(token,"Navya@9985");
            const {_id}=decodedmessage;
            const user=await User.findOne({_id});
            if(!user)
            {
                throw new Error("please login again");
                
            }
            req.user=user;
                next();

}
catch(err)
{
     res.status(404).send("something wrong" + err.message);
}
            
    }

module.exports=  userAuth;