const express = require('express');

const route = express.Router();

const userRoute = require('./userRoute');
const adminRoute = require('./adminRoute');
route.get('/',(req,res)=>{
    res.send("successfull");
    return;
})

route.use('/user',userRoute);
route.use('/admin',adminRoute);

module.exports = route;