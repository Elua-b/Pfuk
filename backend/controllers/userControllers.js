const express=require('express')
const {userSchema}=require('../models/userModels.js')
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const { Schema } = require('mongoose');
const salt=10;
const token_key="well123"
const signup=async(req,res)=>{
    try {
        const [username,email,password]=req.body;
        const existingName=await userSchema.findOne({username:username})
        if(existingName){
            res.json({
                status:400,
                existingName:true,
                message:"username already exists"
            })
        }
        else{
            const existingEmail=await userSchema.findOne({email:email})
        if(existingEmail){
            res.json({
                status:400,
                existingEmail:true,
                message:"Email already exists"
            })
        }
        else{
            bcrypt.hash(password,salt,async(err,hash)=>{
                if(err){
                    throw err;
                }
                else{
                    const user= new userSchema({
                        username:username,
                        email:email,
                        password:hash
                    })
                    let signUser={
                        username:username,
                        email:email
                    }
                    const token=jwt.sign(signUser,token_key)
                    if(user){
                        user.save((err,user)=>{
                            if(err){
                                res.json({
                                    status:500,
                                    message:err.message
                                })
                            }
                            else if(user){
                               res.json({
                                status:201,
                                success:true,
                                message:"user created",
                                token:token
                               }) 


                            }
                            else{
                                res.json({
                                    status:500,
                                    success:false,
                                    message:"not created"
                                })
                            }
                        })
                    }
                }
            })
        }
    }
    }catch(err) {
        console.log(err);
        
    }
    }
    module.exports.signup=signup;