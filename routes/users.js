const express = require('express');
const router = express.Router();
//bcrypt used to encrypt the password
const bcrypt = require('bcryptjs')
const passport = require('passport');

//User model
const User = require('../models/User')



//Login Page
//router.get('/login',(req, res)=>res.render("login"))
router.get('/login', (req, res) => {
    res.render("login", { error: req.flash('error') });
});

//Register Page
router.get('/register',(req, res)=>res.render("register"))

//Register Handle
//pulling var out
router.post('/register',(req,res)=>{
    const{ name, email, password, password2 } = req.body;

    //do validation
    let errors=[];
    //Check the required fields
    if(!name || !email || !password || !password2){
      errors.push({msg:'Please fill in all fields'})  
    }

    //Check if passwords match
    if(password !== password2){
        errors.push({msg:'Passwords do not match'})
    }

    //Check password length
    if(password.length <6){
        errors.push({msg:'Password should be at least 6 characters'})
    }

    if(errors.length >0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        });
    }else{
      //Validation passed
      //mongoose method to make sure the user exists
        User.findOne({email:email})
        .then(user =>{
            if(user){
                //User exists
                errors.push({msg:'Email is already registered'})
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }else{
                const newUser = new User({
                    name,
                    email,
                    password
                });

                //Hash Password
                bcrypt.genSalt(10,(err, salt)=> 
                    bcrypt.hash(newUser.password, salt, (err, hash)=>{
                        if(err) throw err;
                        //Set Password to the hashed password
                        newUser.password =hash;
                        //Save the User
                        newUser.save()
                            .then(user=>{
                                //render a success message with flash
                                req.flash('success_msg','You are now registered and can log in')
                                res.redirect('/users/login')
                            })
                            .catch(err => console.log(err))
                }))
            }
        });


    }
})

//Login Handle
router.post('/login',(req, res, next)=>{
    passport.authenticate('local',{
        //redirect to dashboard if passport success
        successRedirect: '/home',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
})

//Logout Handle
router.get('/logout', (req, res)=>{
    req.logout(err => {
        if(err) { return next(err) }
        req.flash('success_msg','You are logged out');
        res.redirect('/users/login');
        });
   
    
})

module.exports =router;
