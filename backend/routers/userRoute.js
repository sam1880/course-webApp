const express = require('express');
const route = express.Router();

const User = require('../Model/mongoose');
const Course = require('../Model/course');



route.post("/signup", (req, res) =>{
    // const user = {...req.body, purchasedCourses: []};
    const existUser = User.find({Username:req.body.username});
    if(existUser){
        res.json({message: 'user already exist'})
    }
    else{
        // user.id = Date.now();
        User.create({Username:req.body.username,password:req.body.password});
        res.json({message: 'user created successfully'})
    }
})

route.post("/signin", async (req, res) =>{

    let authenticateUser = await User.findOne({Username:req.body.username,password:req.body.password});
    console.log(authenticateUser);
if(authenticateUser){
res.cookie('id',authenticateUser.Username);

res.json({message: "user logged in succesfully"})
return;
}
})

route.get("/courses", async(req, res) =>{
  let allCourse= await Course.find({});
    res.json({courses:allCourse});
    return;
});

// route.post("/user/courses/:id",  (req,res)=>{
//     const courseId = Number(req.params.id);
//     const course = .find(a => a.id == courseId && a.published);
//     if(course){
//         req.user.purchasedCourses.push(courseId);
//         res.json({message: "course purchased successfully"})
//     }
//     else{
//         res.status(404).json({message: 'course not found'})
//     }
// })


// route.get("/user/purchasedcourses", async(req, res) =>{
//     res.json({purchasedCourses: COURSES.filter(a=> req.user.purchasedCourses.includes(a.id))})
// })
 

module.exports = route;
