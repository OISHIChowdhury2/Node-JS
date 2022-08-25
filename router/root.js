const express =require('express');
const { appendFile } = require('fs');
const router =express.Router();
const path =require('path');

router.get('^/$|/index(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','index.html'));
});

router.get('./new-page(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','index.html'));
});
// app.get('^/$|/index(.html)?',(req,res)=>{
//     res.sendFile(path.join(__dirname,'views','index.html'));
// });

module.exports=router;
