const mongoose= require('mongoose')
 const userSchema= new mongoose.Schema({
     username:{
         type:String,
         trim:true,
         required:true,
         maxlength:20
         
     },
     email:{
        type:String,
        trim:true,
        required:true,
        maxlength:20
     },
     password:{
         type:String,
         trim:true,
         required:true,
         maxlength:20

     },
     comments:{
        type:String,
        trim:true,
        required:true
     },
     likes:{

        type:[String],
            default:[],
            required:true
     }
    }) 
    module.exports.userSchema=mongoose.model("user",userSchema)