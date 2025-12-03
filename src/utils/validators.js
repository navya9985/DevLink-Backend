const validator=require("validator");
const Validate=(req)=>{
    const {firstName,lastName,emailId,password}=req.body;
    if(! firstName || !lastName)
    {
        throw new Error("name i s not valid");
    }
    else if(!validator.isEmail(emailId))
    {
        throw new Error("Email is not found");
    }
    // else if(!validator.isStrongPassword(password))
    // {
    //     throw new Error("password is not found");
    // }
}

const validateeditprofile=(req)=>
{
     //the date we updat egive in postman to update alond with id
    const Allowedupdates=["firstName","lastName","photourl","about","skills","age","gender"];
    const updated=Object.keys(req.body).every(k=>
    
        Allowedupdates.includes(k)
         );
      return updated;
    


}
module.exports=validateeditprofile;