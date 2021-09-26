const express=require('express');
const app=express();
const mongoose=require('mongoose');

const PORT=process.env.PORT || 5000;
const {MONGOURI} =require('./config/key');


mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected',()=>{
    console.log("Mongoose is connect yeah!!");
})

mongoose.connection.on('error',(err)=>{
    console.log("error connecting....");
})

require('./models/user')
require('./models/task')
app.use(express.json());
app.use(require('./route/auth'));
app.use(require('./route/addtask'));


if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/FrontendUI/build'));
    const path=require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })

}


app.listen(PORT,()=>{
     console.log("Server Starting on Port No "+PORT);
})
