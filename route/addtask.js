const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User=mongoose.model("User")
const Task=mongoose.model("Task")
const bcrypt=require('bcryptjs');
const requireLogin=require("../middleware/requireLogin")
var jwt = require('jsonwebtoken');


router.post('/addtask',requireLogin,(req,res)=>{

    const {title,description,userid,status}=req.body;

    if(!title || !description || !userid || !status){
        return  res.status(422).json({error:"plase add the all the field"})
    }

    // console.log(title,description,userid,status);

    const task = new Task({
        userid,
        title,
        description,
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


router.get('/alltask',requireLogin,(req,res)=>{

    // console.log("insode ")
    Task.find().populate('status').then(tasks=>{
        res.json({tasks});
    }).catch(err=>{
        console.log(err);
    })

})


router.put('/statusupdate',requireLogin,(req,res)=>{

    // const {status,taskid}=req.body;

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


router.put('/titleupdate',requireLogin,(req,res)=>{

    const {updatetitle,taskid}=req.body;

    // console.log(updatetitle,taskid);

    Task.findByIdAndUpdate(taskid,
        {title:updatetitle},
        
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


router.put('/desupdate',requireLogin,(req,res)=>{

    const {description,taskid}=req.body;

    // console.log(description,taskid);

    Task.findByIdAndUpdate(taskid,
        {description:description},
        
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

router.delete('/deletetask/:taskid',requireLogin,(req,res)=>{

    // console.log(req.params.taskid);

    Task.findOne({_id:req.params.taskid})
    .exec((err,task)=>{
        if(err || !task){
            return res.status(422).json({error:err});
        }
        
            task.remove()
            .then(result=>{
                res.json(result)
            }).catch(err=>{
                console.log(err);
            })
    })
})



module.exports= router;