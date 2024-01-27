// // module.exports = router;
// const express = require('express');
// const router = express.Router();
// const UserDetails = require('../models/UserDetails'); // Import your UserDetails model


// // User Details Page
// router.get('/', async (req, res) => {
//     try {
//         const userDetails = await UserDetails.findOne({ user: req.user._id });
//         res.render('userDetails', {
//             name: req.user ? req.user.name : '',
//             first_name: userDetails ? userDetails.first_name : '',
//             last_name: userDetails ? userDetails.last_name : '',
//         });
//     } catch (error) {
//         console.error(error);
//         req.flash('success_msg','You are now registered and can log in')
//         res.redirect('/users/login')
//     }
// });

// // Edit User Details Page
// router.get('/edit', async (req, res) => {
//     const name = req.user ? req.user.name : '';
//     try {
//         const userDetails = await UserDetails.findOne({ user: req.user._id });
//         res.render('editUserDetails', {
//             name,
//             first_name: userDetails ? userDetails.first_name : '',
//             last_name: userDetails ? userDetails.last_name : '',
//         });
//     } catch (error) {
//         console.error(error);
//         // res.render('error', {
//         //     msg: 'An error occurred while fetching user details',
//         // });
//         req.flash('error_msg', 'Please Add or Edit User Details')
//             res.redirect('/userDetails')
//     }
// });

// // Edit User Details Form Handle
// router.post('/edit', async (req, res) => {
//     const name = req.user ? req.user.name : '';
//     const { first_name, last_name } = req.body;

//     // Validation
//     let errors = [];

//     if (!first_name || !last_name) {
//         errors.push({ msg: 'Please fill in all fields' });
//     }

//     if (errors.length > 0) {
//         res.render('editUserDetails', {
//             errors,
//             name,
//             first_name,
//             last_name,
//         });
//     } else {
//         try {
//             // Check if user details exist
//             const userDetails = await UserDetails.findOne({ user: req.user._id });

//             if (userDetails) {
//                 // Update existing user details
//                 await UserDetails.updateOne(
//                     { user: req.user._id },
//                     { $set: { first_name, last_name } }
//                 );

//                 // Fetch the updated user details after the update
//                 const updatedUserDetails = await UserDetails.findOne({ user: req.user._id });

//                 res.render('userDetailsSuccess', {
//                     name,
//                     first_name: updatedUserDetails.first_name,
//                     last_name: updatedUserDetails.last_name,
//                 });
//             } else {
//                 // Create new user details
//                 const newUserDetails = new UserDetails({
//                     user: req.user._id,
//                     first_name,
//                     last_name,
//                 });

//                 const savedDetails = await newUserDetails.save();

//                 res.render('userDetailsSuccess', {
//                     name,
//                     first_name: savedDetails.first_name,
//                     last_name: savedDetails.last_name,
//                 });
//             }
//         } catch (error) {
//             console.error(error);
//             req.flash('error_msg', 'Please Add or Edit User Details')
//             res.redirect('/users/login')
//         }
//     }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const UserDetails = require('../models/UserDetails');

// User Details Page
router.get('/', async (req, res) => {
    try {
        const userDetails = await UserDetails.findOne({ user: req.user._id });
        res.render('userDetails', {
            name: req.user ? req.user.name : '',
            first_name: userDetails ? userDetails.first_name : '',
            last_name: userDetails ? userDetails.last_name : '',
            age: userDetails ? userDetails.age : '',
            weight: userDetails ? userDetails.weight : '',
            height: userDetails ? userDetails.height : '',
            gender: userDetails ? userDetails.gender : '',
            fitness_level: userDetails ? userDetails.fitness_level : '',
            general_health: userDetails ? userDetails.general_health : '',
            goals_next_30_days: userDetails ? userDetails.goals_next_30_days : '',
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
            name,
            first_name: userDetails ? userDetails.first_name : '',
            last_name: userDetails ? userDetails.last_name : '',
            age: userDetails ? userDetails.age : '',
            weight: userDetails ? userDetails.weight : '',
            height: userDetails ? userDetails.height : '',
            gender: userDetails ? userDetails.gender : '',
            fitness_level: userDetails ? userDetails.fitness_level : '',
            general_health: userDetails ? userDetails.general_health : '',
            goals_next_30_days: userDetails ? userDetails.goals_next_30_days : '',
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
    const { first_name, last_name, age, weight, height, gender, fitness_level, general_health, goals_next_30_days } = req.body;

    // Validation
    let errors = [];

    if (!first_name || !last_name) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    if (errors.length > 0) {
        res.render('editUserDetails', {
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
            goals_next_30_days,
        });
    } else {
        try {
            // Check if user details exist
            const userDetails = await UserDetails.findOne({ user: req.user._id });

            if (userDetails) {
                // Update existing user details
                await UserDetails.updateOne(
                    { user: req.user._id },
                    { $set: { first_name, last_name, age, weight, height, gender, fitness_level, general_health, goals_next_30_days } }
                );

                // Fetch the updated user details after the update
                const updatedUserDetails = await UserDetails.findOne({ user: req.user._id });

                res.render('userDetailsSuccess', {
                    name,
                    first_name: updatedUserDetails.first_name,
                    last_name: updatedUserDetails.last_name,
                    age: updatedUserDetails.age,
                    weight: updatedUserDetails.weight,
                    height: updatedUserDetails.height,
                    gender: updatedUserDetails.gender,
                    fitness_level: updatedUserDetails.fitness_level,
                    general_health: updatedUserDetails.general_health,
                    goals_next_30_days: updatedUserDetails.goals_next_30_days,
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
                    goals_next_30_days,
                });

                const savedDetails = await newUserDetails.save();

                res.render('userDetailsSuccess', {
                    name,
                    first_name: savedDetails.first_name,
                    last_name: savedDetails.last_name,
                    age: savedDetails.age,
                    weight: savedDetails.weight,
                    height: savedDetails.height,
                    gender: savedDetails.gender,
                    fitness_level: savedDetails.fitness_level,
                    general_health: savedDetails.general_health,
                    goals_next_30_days: savedDetails.goals_next_30_days,
                });
            }
        } catch (error) {
            console.error(error);
            req.flash('error_msg', 'Please Add or Edit User Details');
            res.redirect('/users/login');
        }
    }
});

module.exports = router;

