
const express = require('express');
const router = express.Router();
const UserDetails = require('../models/UserDetails');
const { ensureAuthenticated } = require('../config/auth');


// User Details Page
router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const userDetails = await UserDetails.findOne({ user: req.user._id });
        res.render('userDetails', {
            layout: 'layoutLoggedIn',
            name: req.user ? req.user.name : '',
            first_name: userDetails ? userDetails.first_name : '',
            last_name: userDetails ? userDetails.last_name : '',
            age: userDetails ? userDetails.age : '',
            weight: userDetails ? userDetails.weight : '',
            height: userDetails ? userDetails.height : '',
            gender: userDetails ? userDetails.gender : '',
            fitness_level: userDetails ? userDetails.fitness_level : '',
            general_health: userDetails ? userDetails.general_health : '',
            strength: userDetails ? userDetails.strength :'',
            cardio: userDetails ? userDetails.cardio :'',
            yoga: userDetails ? userDetails.yoga : '',
            meditation: userDetails ? userDetails.meditation : '', 
            strength_frequency: userDetails ? userDetails.strength_frequency : '',
            cardio_frequency: userDetails ? userDetails.cardio_frequency : '',
            yoga_frequency: userDetails ? userDetails.yoga_frequency : '',
            meditation_frequency: userDetails ? userDetails.meditation_frequency : '',

        });
    } catch (error) {
        console.error(error);
        req.flash('success_msg', 'You are now registered and can log in');
        res.redirect('/users/login');
    }
});


// Edit User Details Page
router.get('/edit', async (req, res) => {
    const name = req.user ? req.user.name : '';
    try {
        const userDetails = await UserDetails.findOne({ user: req.user._id });
        res.render('editUserDetails', {
            layout: 'layoutLoggedIn',
            name,
            first_name: userDetails ? userDetails.first_name : '',
            last_name: userDetails ? userDetails.last_name : '',
            age: userDetails ? userDetails.age : '',
            weight: userDetails ? userDetails.weight : '',
            height: userDetails ? userDetails.height : '',
            gender: userDetails ? userDetails.gender : '',
            fitness_level: userDetails ? userDetails.fitness_level : '',
            general_health: userDetails ? userDetails.general_health : '',
            strength: userDetails ? userDetails.strength :'',
            cardio: userDetails ? userDetails.cardio :'',
            yoga: userDetails ? userDetails.yoga : '',
            meditation: userDetails ? userDetails.meditation : '',
            strength_frequency: userDetails ? userDetails.strength_frequency : '',
            cardio_frequency: userDetails ? userDetails.cardio_frequency : '',
            yoga_frequency: userDetails ? userDetails.yoga_frequency : '',
            meditation_frequency: userDetails ? userDetails.meditation_frequency : ''
        });
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Please Add or Edit User Details');
        res.redirect('/userDetails');
    }
});


// Edit User Details Form Handle
router.post('/edit', async (req, res) => {
    const name = req.user ? req.user.name : '';
    let { first_name, last_name, age, weight, height, gender, fitness_level, general_health, strength, cardio, yoga, meditation, strength_frequency, cardio_frequency, yoga_frequency, meditation_frequency} = req.body;
    

    if (!first_name || !last_name) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    if(req.body.strength == "on"){
        strength = true;
    }
    else{
        strength = false;
    }

    if(req.body.cardio == "on"){
        cardio = true;
    }
    else{
        cardio = false;
    }

    if(req.body.yoga == "on"){
        yoga = true;
    }
    else{
        yoga = false;
    }
    if(req.body.meditation == "on"){
        meditation = true;
    }
    else{
        meditation = false;
    }

   // Validation
   let errors = [];

    if (errors.length > 0) {
        res.render('editUserDetails', {
            layout: 'layoutLoggedIn',
            errors,
            name,
            first_name,
            last_name,
            age,
            weight,
            height,
            gender,
            fitness_level,
            general_health,
            strength,
            cardio,
            yoga,
            meditation, 
            strength_frequency,
            cardio_frequency,
            yoga_frequency,
            meditation_frequency
        });
    } else {
        try {
            // Check if user details exist
            const userDetails = await UserDetails.findOne({ user: req.user._id });

            if (userDetails) {
                // Update existing user details
                await UserDetails.updateOne(
                    { user: req.user._id },
                    { $set: { first_name, last_name, age, weight, height, gender, fitness_level, general_health,
                        strength,
                        cardio,
                        yoga,
                        meditation, 
                        strength_frequency,
                        cardio_frequency,
                        yoga_frequency,
                        meditation_frequency} }
                    );

                // Fetch the updated user details after the update
                const updatedUserDetails = await UserDetails.findOne({ user: req.user._id });

                res.render('userDetailsSuccess', {
                    layout: 'layoutLoggedIn',
                    name,
                    first_name: updatedUserDetails.first_name,
                    last_name: updatedUserDetails.last_name,
                    age: updatedUserDetails.age,
                    weight: updatedUserDetails.weight,
                    height: updatedUserDetails.height,
                    gender: updatedUserDetails.gender,
                    fitness_level: updatedUserDetails.fitness_level,
                    general_health: updatedUserDetails.general_health,
                    strength: updatedUserDetails.strength,
                    cardio: updatedUserDetails.cardio,
                    yoga: updatedUserDetails.yoga,
                    meditation: updatedUserDetails.meditation,
                    strength_frequency: updatedUserDetails.strength_frequency,
                    cardio_frequency: updatedUserDetails.cardio_frequency,
                    yoga_frequency: updatedUserDetails.yoga_frequency,
                    meditation_frequency: updatedUserDetails.meditation_frequency
                });
            } else {
                // Create new user details
                const newUserDetails = new UserDetails({
                    user: req.user._id,
                    first_name,
                    last_name,
                    age,
                    weight,
                    height,
                    gender,
                    fitness_level,
                    general_health,
                    strength,
                    cardio,
                    yoga,
                    meditation,
                    strength_frequency,
                    cardio_frequency,
                    yoga_frequency,
                    meditation_frequency
                });

                const savedDetails = await newUserDetails.save();

                res.render('userDetailsSuccess', {
                    layout: 'layoutLoggedIn',
                    name,
                    first_name: savedDetails.first_name,
                    last_name: savedDetails.last_name,
                    age: savedDetails.age,
                    weight: savedDetails.weight,
                    height: savedDetails.height,
                    gender: savedDetails.gender,
                    fitness_level: savedDetails.fitness_level,
                    general_health: savedDetails.general_health,
                    strength: savedDetails.strength,
                    cardio: savedDetails.cardio,
                    yoga: savedDetails.yoga,
                    meditation: savedDetails.meditation,
                    strength_frequency : savedDetails.strength_frequency,
                    cardio_frequency:  savedDetails.cardio_frequency, 
                    yoga_frequency: savedDetails.yoga_frequency,
                    meditation_frequency: savedDetails.meditation_frequency,
                });
            }
        } catch (error) {
            console.error(error);
            req.flash('error_msg', 'Please Add or Edit User Details');
            res.redirect('/users/login');
        }
    }
});


router.get('/activities', ensureAuthenticated, async (req, res) => {
    try {
        const userDetails = await UserDetails.findOne({ user: req.user._id });

        // Returns an empty array if user still hasn't introduced the data
        if (!userDetails) {
            return res.json([]); 
        }

        const activityArray = [
            { name: "Strength", value: userDetails.strength, days: userDetails.strength_frequency },
            { name: "Cardio", value: userDetails.cardio, days: userDetails.cardio_frequency },
            { name: "Yoga", value: userDetails.yoga, days: userDetails.yoga_frequency },
            { name: "Meditation", value: userDetails.meditation, days: userDetails.meditation_frequency }
        ];

        res.json(activityArray);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

