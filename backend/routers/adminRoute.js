const express = require('express');
const route = express.Router();
const ADMINS = require('../Model/mongoose');
const Course = require('../Model/course');


route.get('/',(req,res)=>{
    res.send("in admin");
    return;
})
route.post("/signup",  async (req, res) => {
    const admin = req.body;
    if(!admin.username){

        res.send("no user found");
        return;
    }

    console.log(admin);
    const existAdmin = await ADMINS.findOne({Username:admin.username});
    if(existAdmin){
        res.status(403).json({message: 'admin already exists'})
    } 
    else{
        ADMINS.create({Username:admin.username,password:admin.password});
        res.json({message: 'admin added successfully'})
    }
    return;
})

route.post("/signin", async (req, res) =>{

    let user  = await ADMINS.findOne({Username:req.body.username,password:req.body.password});
    if(user){
        res.cookie('id',user.Username);
        res.json({message: 'logged in successfully'})

    }
    else
    res.json({message:"incorrect credential"});
    return;
})

route.post("/courses", async (req, res) =>{

    const course = req.body;
    console.log(course);
    // course.id = Date.now();
    if(!req.cookies.id){
        res.json({message:"unauthorised request"});
    }
    Course.create({...course});
    res.json({message: 'course added successfully', courseID: course.id})
    return;
})

// route.put("/admin/courses/:id", async(req, res)=>{
//     const courseId = parseInt(req.params.id)
//     const course = Course.find(a => a.id === courseId);
//     if(course){
//         Object.assign(course, req.body)
//         res.json({message: 'course updates successfully'})
//     }
//     else{
//         res.status(404).json({message: "course not found"})
//     }
// })

route.get("/courses", async(req, res) =>{
    if(!req.cookies.id){
        res.json({message:"unauthorised request"});
        return;
    }
    let allCourses = await Course.find({});
    res.send({courses:allCourses });
})


module.exports = route;

