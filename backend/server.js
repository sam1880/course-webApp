const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
//mongodb+srv://samharshit1880:qdeCuN1kwMSeAfhc@cluster0.ccvtac0.mongodb.net/
app = express()

app.use(bodyParser.json())
app.use(cors()) 

const PORT = 3000

var COURSES = []
var USERS = []
var ADMINS = []
  
const secretKeyAdmin = "blahblah";
const secretKeyUser = "blahblah1";


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'course'}]
});

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const courseSchema = new mongoose.Schema({
    title: String,
    description: String, 
    image: String,
    price: Number,
    published: Boolean
})


//models
const User = mongoose.model('User', userSchema)
const Admin = mongoose.model('Admin', adminSchema)
const Course = mongoose.model('course', courseSchema)  


//connect
mongoose.connect('mongodb+srv://samharshit1880:qdeCuN1kwMSeAfhc@cluster0.ccvtac0.mongodb.net/', {useNewUrlParser: true, useUnifiedTopology: true});


const generateJwtAdmin = (user) =>{
    const payload = {user}
    return jwt.sign(payload, secretKeyAdmin, {expiresIn: '1h'});
};

const generateJwtUser = (user) =>{
    const payload = {user}
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
            console.log(req.user.user)
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


app.post("/admin/signup", async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if(admin){
        res.status(403).json({message: 'admin already exists'})
    } 
    else{
        const newAdmin = new Admin({username, password});
        await newAdmin.save();
        const token = generateJwtAdmin(username);
        res.json({message: 'admin added successfully', token})
    }
})

app.post("/admin/signin", async (req, res) =>{
    const {username, password} = req.body;
    const admin = await Admin.findOne({username, password});
    if(admin){
        console.log({username})
        const token = generateJwtAdmin(username)
        res.json({message: 'logged in successfully', token})
    }
    else{
        res.status(403).json({message: 'admin authentication faild'})
    }
})

app.post("/admin/courses", authenticateJwtAdmin, async (req, res) =>{
    const course = new Course(req.body);
    await course.save();
    res.json({message: 'course added successfully', courseID: course.id})
})

app.put("/admin/courses/:id", authenticateJwtAdmin, async (req, res)=>{
    const course = await Course.findByIdAndUpdate(req.params.id, req.body,{ new: true});
    if(course){
        res.json({message: 'course updates successfully'})
    }
    else{
        res.status(404).json({message: "course not found"})
    }
})

app.get("/admin/courses", authenticateJwtAdmin, async (req, res) =>{
    const courses = await Course.find({});
    res.json({courses})
})

app.get("/admin/me", authenticateJwtAdmin, async (req,res) =>{
    res.json({username: req.user.user})
})

app.get("/admin/course/:id", authenticateJwtAdmin, async(req, res)=>{
    const courseId = req.params.id
    const course = await Course.findById(courseId)
    res.json({course})
})

app.get("/all/users", async (req,res) =>{
    const courses = await Course.find({published: true})
    res.json({courses})
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

app.post("/user/signup", async (req, res) =>{
    const {username, password} = req.body;
    const user = await User.findOne({username})
    if(user){
        res.json({message: 'user already exist'})
    }
    else{   
        const newUser = new User({username, password});
        await newUser.save()
        token = generateJwtUser(username)
        res.json({message: 'user created successfully', token})
    }
})

app.post("/user/signin", async (req, res) =>{
    const {username, password} = req.headers;
    const user = await User.findOne({username, password});
    if(user){
        token = generateJwtUser(username)
        res.json({message: 'user logged in successfully', token})
    }
    else{
        res.json({message: 'user authentication failed'})
    }
})

app.get("/user/courses", authenticateJwtUser, async (req, res) =>{
    const courses = await Course.find({published: true});
    res.json({courses})
})

app.post("/user/courses/:id", authenticateJwtUser, async (req,res)=>{
    const course = await Course.findById(req.params.id);
    if(course){
        const user = await User.findOne({username: req.user.username});
        if(user){
            user.purchasedCourses.push(course)
            await user.save();
            res.json({message: 'course purchased successfully'});
        }
        else{
            res.status(403).json({message: "user not found"})
        }
    }
    else{
        res.status(404).json({message: 'course not found'})
    }
})

app.get("/user/purchasedcourses", authenticateJwtUser, async (req, res) =>{
    console.log(req.user.username)
    const user = await User.findOne({username: req.user.username}).populate('purchasedCourses')
    if(user){
        res.json({purchasedCourses: user.purchasedCourses || [] })
    }
    else{
        res.status(403).json({message: 'user not found'})
    }
});

app.listen(PORT, () => console.log(`server is running at ${PORT}`))