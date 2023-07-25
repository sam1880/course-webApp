const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const jwt = require("jsonwebtoken")

app = express()

app.use(bodyParser.json())
app.use(cors()) 

const PORT = 3000

var COURSES = []
var USERS = []
var ADMINS = []
  
const secretKeyAdmin = "blahblah";
const secretKeyUser = "blahblah1";


const generateJwtAdmin = (user) =>{
    const payload = {username: user.username}
    return jwt.sign(payload, secretKeyAdmin, {expiresIn: '1h'});
};

const generateJwtUser = (user) =>{
    const payload = {username: user.username}
    return jwt.sign(payload, secretKeyUser, {expiresIn: '1h'});
};

const authenticateJwtAdmin = (req, res, next) =>{
    const authHeader = req.headers.authorization;

    if(authHeader){
        const token = authHeader.split(' ')[1];

        jwt.verify(token,secretKeyAdmin, (err,user) =>{
            if(err){
                return res.sendStatus(403)
            }
            
            req.user = user;
            next();
        })
    }
    else{
        res.sendStatus(401);
    }

}

const authenticateJwtUser = (req, res, next) =>{
    const authHeader = req.headers.authorization;

    if(authHeader){
        const token = authHeader.split(' ')[1];

        jwt.verify(token,secretKeyUser, (err,user) =>{
            if(err){
                return res.sendStatus(403)
            }
            
            req.user = user;
            next();
        })
    }
    else{
        res.sendStatus(401);
    }

}

//ADMIN
// const adminAuthentication = (req, res, next) =>{
//     const {username, password} = req.headers;
//     const admin = ADMINS.find(a => a.username == username && a.password == password);
//     if(admin){
//         next();
//     }
//     else{
//         res.status(403).json({message: 'admin authentication faild'})
//     }
// }


app.post("/admin/signup", (req, res) => {
    const admin = req.body;
    const existAdmin = ADMINS.find(a => a.username == admin.username);
    if(existAdmin){
        res.status(403).json({message: 'admin already exists'})
    } 
    else{
        ADMINS.push(admin);
        const token = generateJwtAdmin(admin);
        res.json({message: 'admin added successfully', token})
    }
})

app.post("/admin/signin", (req, res) =>{
    const {username, password} = req.headers;
    const admin = ADMINS.find(a => a.username == username && a.password == password);
    if(admin){
        const token = generateJwtAdmin(admin)
        res.json({message: 'logged in successfully', token})
    }
    else{
        res.status(403).json({message: 'admin authentication faild'})
    }
})

app.post("/admin/courses", authenticateJwtAdmin, (req, res) =>{
    const course = req.body;
    course.id = Date.now();
    COURSES.push(course);
    res.json({message: 'course added successfully', courseID: course.id})
})

app.put("/admin/courses/:id", authenticateJwtAdmin, (req, res)=>{
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

app.get("/admin/courses", authenticateJwtAdmin, (req, res) =>{
    res.json({courses: COURSES})
})

//USER
// const userAuthentication = (req,res, next) =>{
//     const {username, password} = req.headers;
//     const user = USERS.find(a => a.username == username && a.password == password);
//     if(user){
//         req.user = user;
//         next()
//     }
//     else{
//         res.json({message: 'user authentication failed'})
//     }
// }

app.post("/user/signup", (req, res) =>{
    const user = {...req.body, purchasedCourses: []};
    const existUser = USERS.find(a => a.username === user.username)
    if(existUser){
        res.json({message: 'user already exist'})
    }
    else{
        user.id = Date.now();
        USERS.push(user);
        token = generateJwtUser(user)
        res.json({message: 'user created successfully', token})
    }
})

app.post("/user/signin", (req, res) =>{
    const {username, password} = req.headers;
    const user = USERS.find(a => a.username == username && a.password == password);
    if(user){
        req.user = user;
        token = generateJwtUser(user)
        res.json({message: 'user logged in successfully', token})
    }
    else{
        res.json({message: 'user authentication failed'})
    }
})

app.get("/user/courses", authenticateJwtUser, (req, res) =>{
    res.json({courses: COURSES.filter(a => a.published)})
})

app.post("/user/courses/:id", authenticateJwtUser, (req,res)=>{
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

app.get("/user/purchasedcourses", authenticateJwtUser, (req, res) =>{
    res.json({purchasedCourses: COURSES.filter(a=> req.user.purchasedCourses.includes(a.id))})
})

app.listen(PORT, () => console.log(`server is running at ${PORT}`))