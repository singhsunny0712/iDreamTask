const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User=mongoose.model("User")
const Task=mongoose.model("Task")
const bcrypt=require('bcryptjs');
var jwt = require('jsonwebtoken');


router.post('/addtask',(req,res)=>{

    const {title,discription,userid,status}=req.body;

    if(!title || !discription || !userid || !status){
        return  res.status(422).json({error:"plase add the all the field"})
    }

    console.log(title,discription,userid,status);

    const task = new Task({
        userid,
        title,
        discription,
        status

    })

    task.save().then(resu=>{
        res.json({task:resu});
    }).catch(err=>{
        console.log(err);
    })

    // console.log(task);

    // res.send({"name":"suny"});
    //  res.status(200);
})


router.get('/alltask',(req,res)=>{

    Task.find().populate('status').then(tasks=>{
        res.json({tasks});
    }).catch(err=>{
        console.log(err);
    })

})


router.put('/statusupdate',(req,res)=>{

    const {status,taskid}=req.body;

    console.log(status,taskid);

    Task.findByIdAndUpdate(taskid,
        {status:status},
        
    {
        new:true
    }).exec((err,result)=>{
        if(err){
            res.status(422).json({error:err});
        }else{
            res.json(result)
        }
    })
    
})


router.put('/titleupdate',(req,res)=>{

    const {title,taskid}=req.body;

    console.log(title,taskid);

    Task.findByIdAndUpdate(taskid,
        {title:title},
        
    {
        new:true
    }).exec((err,result)=>{
        if(err){
            res.status(422).json({error:err});
        }else{
            res.json(result)
        }
    })
    
})


router.put('/disupdate',(req,res)=>{

    const {discription,taskid}=req.body;

    console.log(discription,taskid);

    Task.findByIdAndUpdate(taskid,
        {discription:discription},
        
    {
        new:true
    }).exec((err,result)=>{
        if(err){
            res.status(422).json({error:err});
        }else{
            res.json(result)
        }
    })
    
})



module.exports= router;