const passport = require('passport');

const LocalStrategy = require('passport-local');
const User = require('../Model/mongoose');

passport.use(new LocalStrategy({
    userNameField:'Username'     // if required-field is different from 'username'
},  async function(username,password,done){   // done is error first function
    let user= false;
        try{

         user = await User.findOne({Username:username});
        }
        catch(err){
            console.log('error in finding user-->passport');
            return done(err);
        }

        if(!user||user.password!=password){
            console.log('Password Incorrect');
            return done(null,false);
        }
        return done(null, user);

    
}
));


 //encrypting user
passport.serializeUser(function(user,done){
 done(null,user.id);
});
//decrypting user for usage
passport.deserializeUser(async function(id,done){
      let UserbyId=await User.findById(id);
        if(!UserbyId){
            return done(null,false);
        }

     return done(null,UserbyId);
});

 //middleware for checking authentication
passport.checkAuthentication = function(req,res,next){

    console.log("in checkauthentication")

    if (req.isAuthenticated()){
        return next();
    }

    return res.redirect('/');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;   // view can access locals

    }
    next();
}

module.exports = passport;
