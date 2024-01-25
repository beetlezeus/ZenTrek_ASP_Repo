const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
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
        console.log(err)
    }
}

connect();

//video
//Connect to Mongo
// mongoose.connect(db)
//         .then(()=>console.log('MongoDB Connected'))
//         .catch(err => console.log(err));


//mongo
// const { MongoClient } = require("mongodb");
// const uri = "mongodb+srv://TestAdmin:TestingTestAdmin1@test-cluster1.8dcifcp.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri);

//self
// const { MongoClient } = require("mongodb");
// const db = require('./config/keys').MongoURI;
// const client = new MongoClient(db);


// const client = new MongoClient(db);


// async function run() {
//   try {
//     // const database = client.db('sample_mflix');
//     // const movies = database.collection('movies');
//     // // Query for a movie that has the title 'Back to the Future'
//     // const query = { title: 'Back to the Future' };
//     // const movie = await movies.findOne(query);
//     // console.log(movie);
//     console.log('MongoDB Connected')
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs')

//Bodyparser
app.use(express.urlencoded({extended: false}));

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
//Index
app.use('/', require('./routes/index'));
//Users
app.use('/users', require('./routes/users'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));