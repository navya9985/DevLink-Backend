const mongoose=require("mongoose");
const connectionSchema=new mongoose.Schema({
    fromuserid:
    {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User", //reference to user collection or table
        index:true,
    },
    touserid:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,

    },
    status:
    {
        type:String,
        required:true,
        enum:
        {
            values:["accepted","rejected","ignored","intersed"],
            message:" is incorrect status type",
        }       
    }
},
{
timestamps:true
});
//  connectionSchema.pre("save",function(next)
// {
//     const request=this;
//     if(request.fromuserid.equals(request.touserid))
//     {
//         throw new Error ("not request to urself");
//     }
//     next();
// })
//compound index to serach first
connectionSchema.index({fromuserid:1,touserid:1})
const ConnectionModel=new mongoose.model("ConnectionModel",connectionSchema);
module.exports=ConnectionModel;