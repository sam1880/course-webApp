const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

app = express()

app.use(bodyParser.json())
app.use(cors()) 

const PORT = 3000

var COURSES = []
var USERS = []
var ADMINS = []

//ADMIN
const adminAuthentication = (req, res, next) =>{
    const {username, password} = req.headers;
    const admin = ADMINS.find(a => a.username == username && a.password == password);
    if(admin){
        next();
    }
    else{
        res.status(403).json({message: 'admin authentication faild'})
    }
}


app.post("/admin/signup", (req, res) => {
    const admin = req.body;
    const existAdmin = ADMINS.find(a => a.username == admin.username);
    if(existAdmin){
        res.status(403).json({message: 'admin already exists'})
    } 
    else{
        ADMINS.push(admin);
        res.json({message: 'admin added successfully'})
    }
})

app.post("/admin/signin", adminAuthentication, (req, res) =>{
    res.json({message: 'logged in successfully'})
})

app.post("/admin/courses", adminAuthentication, (req, res) =>{
    const course = req.body;
    course.id = Date.now();
    COURSES.push(course);
    res.json({message: 'course added successfully', courseID: course.id})
})

app.put("/admin/courses/:id", adminAuthentication, (req, res)=>{
    const courseId = parseInt(req.params.id)
    const course = COURSES.find(a => a.id === courseId);
    if(course){
        Object.assign(course, req.body)
        res.json({message: 'course updates successfully'})
    }
    else{
        res.status(404).json({message: "course not found"})
    }
})

app.get("/admin/courses", adminAuthentication, (req, res) =>{
    res.json({courses: COURSES})
})

//USER
const userAuthentication = (req,res, next) =>{
    const {username, password} = req.headers;
    const user = USERS.find(a => a.username == username && a.password == password);
    if(user){
        req.user = user;
        next()
    }
    else{
        res.json({message: 'user authentication failed'})
    }
}

app.post("/user/signup", (req, res) =>{
    const user = {...req.body, purchasedCourses: []};
    const existUser = USERS.find(a => a.username === user.username)
    if(existUser){
        res.json({message: 'user already exist'})
    }
    else{
        user.id = Date.now();
        USERS.push(user);
        res.json({message: 'user created successfully'})
    }
})

app.post("/user/signin", userAuthentication, (req, res) =>{
    res.json({message: "user logged in succesfully"})
})

app.get("/user/courses", userAuthentication, (req, res) =>{
    res.json({courses: COURSES.filter(a => a.published)})
})

app.post("/user/courses/:id", userAuthentication, (req,res)=>{
    const courseId = Number(req.params.id);
    const course = COURSES.find(a => a.id == courseId && a.published);
    if(course){
        req.user.purchasedCourses.push(courseId);
        res.json({message: "course purchased successfully"})
    }
    else{
        res.status(404).json({message: 'course not found'})
    }
})

app.get("/user/purchasedcourses", userAuthentication, (req, res) =>{
    res.json({purchasedCourses: COURSES.filter(a=> req.user.purchasedCourses.includes(a.id))})
})

app.listen(PORT, () => console.log(`server is running at ${PORT}`))