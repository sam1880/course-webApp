const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors");
const dp  =require('./Config/database');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const passport = require('passport');
const pasportLocal =require('./Config/passportConfig');

const MongoStore = require('connect-mongo');
const PORT = 3000;


const app = express()
const route = require('./routers/route');
// app.use(bodyParser.json())
// app.use(cors()) ;
app.use(express.urlencoded());
app.use(cookieParser());


app.use(session({
    name:'login',
    secret:"secret",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:1000*60*60
    },
    store: new MongoStore({
        mongoUrl:"mongodb://localhost:27017/sessions",
        autoRemove:'disabled'
    },
    function(err){
        console.log(err)
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use('/',route);

//ADMIN

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


app.listen(PORT, () => console.log(`server is running at ${PORT}`))