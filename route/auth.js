const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User=mongoose.model("User")
const bcrypt=require('bcryptjs');
var jwt = require('jsonwebtoken');
const {JWT_SECRET}=require('../config/key');


router.post('/signup',(req,res)=>{
    
    const {fullName,email,password}=req.body;

    console.log(fullName,email,password);
    
    if(!email || !password || !fullName){
        return  res.status(422).json({error:"plase add the all the field"})
    }

    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"email id already exist"});
        }
        
        bcrypt.hash(password,12)
        .then(hashpassword =>{
            const user=new User({
                fullName,
                email,
                password:hashpassword,
            });
            
            user.save()
            .then(user =>{
                res.json({message:"Saved successfully"});
            })
            .catch(err =>{
                console.log(err);
            })
        })

        
    })
    .catch(err =>{
        
        console.log(err);
    })

})

router.post('/signin',(req,res)=>{
    const {email,password}=req.body;
   
    // console.log(email,password);
    // console.log("*****************")

    if( !email || !password){
        return res.json({error:"Please fill the all field for sign in"});
    }

    User.findOne({email:email})
    .then(savedUser =>{
        
        if(!savedUser){
            return res.status(422).json({error:"Invaild email"});
        }
        
        bcrypt.compare(password,savedUser.password)
        .then(doMatch =>{
            if(doMatch){
                const token=jwt.sign({_id:savedUser._id},JWT_SECRET);
                const {_id,fullName,email}=savedUser;
                return res.json({token,user:{_id,fullName,email}});
                
            }else{
                return res.status(422).json({error:"Password is wrong"});
            }
        })
        .catch(err => {
            console.log(err);
        })
    })
})

router.get('/alluser',(req,res)=>{

    User.find().populate('fullName').then(users=>{
        res.json({users});
    }).catch(err=>{
        console.log(err);
    })

})

router.post('/singleuser',(req,res)=>{

    User.findOne({_id:req.body.userid}).then(user=>{
        res.json({user});
    }).catch(err=>{
        console.log(err);
    })

})

module.exports= router;