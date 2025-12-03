const mongoose=require("mongoose");

const connetdb=async()=>
{
    await mongoose.connect ("mongodb+srv://navyanavi9985_db_user:jHzT92v24qzEh6Wd@navya.gj2q0qw.mongodb.net/?appName=Navya/devthinder");
}


module.exports= connetdb;