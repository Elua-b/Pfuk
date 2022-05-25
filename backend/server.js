const express=require('express')
const app=express();
const cors=require('cors')
const bodyparser=require('body-parser')
const mongoose=require('mongoose')
const {Router}=require('./routes/userRoutes')
const path=require('path')
app.use(cors());
app.use(bodyparser.json())
app.use(express.json());
app.use("/",Router)
const url='mongodb://localhost:27017/testdb'
mongoose.connect(url,(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("database is connected");
    }
})
const port=5000;
app.listen(port,()=>{
    console.log(`app is listening on port${port}`);
})
