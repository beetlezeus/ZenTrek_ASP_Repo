
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
//const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');


const app = express();

//Passport Config
require('./config/passport')(passport);

//DB Config
const db = require('./config/keys').MongoURI;


async function connect(){
    try{
        await mongoose.connect(db)
        console.log('Mongo connected...')
    }catch(err){
        //console.log(err)
        console.error(err);
        process.exit(1); //Bail out we can't connect to the DB
    }
}
//Connect to Mongo
connect();


//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs')

//Bodyparser
app.use(express.urlencoded({extended: true}));

//Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));

//Passportjs Middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash());

//Global Vars (for error message colors)
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    //for passport
    res.locals.error = req.flash('error');

    next();
})


//Routes

//giving access to public directory for images & css file
app.use(express.static(__dirname + "/public"));

//Index
app.use('/', require('./routes/index'));
//Users
app.use('/users', require('./routes/users'));
//User Details
app.use('/userDetails', require('./routes/userDetails'));
// Exercise router
app.use('/exercise', require('./routes/exercise'));
// Meditation router
app.use('/meditation', require('./routes/meditation')); 
// Daily Reflections router
app.use('/dailyReflections', require('./routes/dailyReflections'));
// Progress router
app.use('/progress', require('./routes/progress'));  
//nutrition router
app.use('/nutrition', require('./routes/nutrition'));
//nutrition router
app.use('/calendar', require('./routes/calendar'));
const PORT = process.env.PORT || 8000;


app.listen(PORT, console.log(`Server started on port ${PORT}`));