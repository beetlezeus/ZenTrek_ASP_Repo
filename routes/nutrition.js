// const express = require('express');
// const router = express.Router();
// const { ensureAuthenticated } = require('../config/auth');


// router.post('/saveData', (req, res) => {
//     const { mealsCount, waterCount } = req.body;

//     // Create a new instance of your Mongoose model
//     const newNutrition = new Nutrition({
//         mealsCount,
//         waterCount,
//         // You can add other fields here if needed
//     });

//     // Save the data to the database
//     newNutrition.save()
//         .then(savedData => {
//             console.log('Data saved successfully:', savedData);
//             res.sendStatus(200); // Send a success response to the client
//         })
//         .catch(error => {
//             console.error('Error saving data:', error);
//             res.sendStatus(500); // Send an error response to the client
//         });
// });

// router.get('/', ensureAuthenticated, (req, res) => {
//     // You can customize the data sent to the template as needed
//     const nutritionData = {
        
//         // Add any necessary data for the meditation page
//     };

//     res.render('nutrition', {nutritionData , layout: 'layoutLoggedIn'});
// });

// // Export the router to use in your main app file
// module.exports = router;

// // Import required modules and models
// const express = require('express');
// const router = express.Router();
// const Nutrition = require('../models/Nutrition'); // Import your Nutrition model
// const { ensureAuthenticated } = require('../config/auth');

// // Route to render the nutrition page
// router.get('/', ensureAuthenticated, (req, res) => {
//     // You can customize the data sent to the template as needed
//     const nutritionData = {
//         // Add any necessary data for the nutrition page
//     };

//     res.render('nutrition', { nutritionData, layout: 'layoutLoggedIn' });
// });


// // Route to save data
// router.post('/saveData', (req, res) => {
//     const { waterIntake, waterNotes, breakfast, lunch, dinner, snacks, energized, satisfied, hungry, thirsty, otherFeelings, otherFeelingsDescription, additionalNotes } = req.body;

//     // Create a new instance of your Mongoose model
//     const newNutrition = new Nutrition({
//         waterIntake,
//         waterNotes,
//         breakfast,
//         lunch,
//         dinner,
//         snacks,
//         energized,
//         satisfied,
//         hungry,
//         thirsty,
//         otherFeelings,
//         otherFeelingsDescription,
//         additionalNotes
//         // You can add other fields here if needed
//     });

//     // Save the data to the database
//     newNutrition.save()
//         .then(savedData => {
//             console.log('Data saved successfully:', savedData);
//             res.sendStatus(200); // Send a success response to the client
//         })
//         .catch(error => {
//             console.error('Error saving data:', error);
//             res.sendStatus(500); // Send an error response to the client
//         });
// });

// // Export the router to use in your main app file
// module.exports = router;
// // Import required modules and models
// const express = require('express');
// const router = express.Router();
// const Nutrition = require('../models/Nutrition'); // Import your Nutrition model
// const { ensureAuthenticated } = require('../config/auth');

// // Route to render the nutrition page
// router.get('/', ensureAuthenticated, (req, res) => {
//     // You can customize the data sent to the template as needed
//     const nutritionData = {
//         // Add any necessary data for the nutrition page
//     };

//     res.render('nutrition', { nutritionData, layout: 'layoutLoggedIn' });
// });


// // Route to save data
// router.post('/saveData', (req, res) => {
//     const { waterIntake, waterNotes, breakfast, lunch, dinner, snacks, energized, satisfied, hungry, thirsty, otherFeelings, otherFeelingsDescription, additionalNotes } = req.body;

//     // Create a new instance of your Mongoose model
//     const newNutrition = new Nutrition({
//         waterIntake,
//         waterNotes,
//         breakfast,
//         lunch,
//         dinner,
//         snacks,
//         energized,
//         satisfied,
//         hungry,
//         thirsty,
//         otherFeelings,
//         otherFeelingsDescription,
//         additionalNotes
//         // You can add other fields here if needed
//     });

//     // Save the data to the database
//     newNutrition.save()
//         .then(savedData => {
//             console.log('Data saved successfully:', savedData);
//             res.sendStatus(200); // Send a success response to the client
//         })
//         .catch(error => {
//             console.error('Error saving data:', error);
//             res.sendStatus(500); // Send an error response to the client
//         });
// });

// // Export the router to use in your main app file
// module.exports = router;

const express = require('express');
const router = express.Router();
const Nutrition = require('../models/Nutrition'); // Import your Nutrition model
const { ensureAuthenticated } = require('../config/auth');

// Route to render the nutrition page
router.get('/', ensureAuthenticated, async (req, res) => {
    // You can customize the data sent to the template as needed
    const nutriData = await Nutrition.find({ user: req.user._id });
    let latest = nutriData.length - 1;
    const currentData = nutriData[latest];

    res.render('nutrition', { currentData, layout: 'layoutLoggedIn' });
});

// Route to handle water intake form submission
router.post('/saveWaterIntake', ensureAuthenticated, async (req, res) => {
    try {
        // Retrieve data from the form
        const { waterIntake, waterNotes } = req.body;

        // Save the water intake data to the database
        const nutritionData = new Nutrition({
            user: req.user._id,
            waterIntake,
            waterNotes,
            date: new Date()
        });
        await nutritionData.save();

        // Redirect to a success page or display a success message
        req.flash('success_msg','added data')
        res.redirect('/nutrition');
    } catch (error) {
        console.error(error);
        res.send('Error saving water intake data');
    }
});

// Route to render the nutrition data
router.get('/data', async (req, res) => {
    try {
        const nutritionData = await Nutrition.findOne({}); // Fetching a single record, you might want to adjust this based on your needs
        console.log('Fetched nutrition data:', nutritionData); // Log the fetched data
        res.render('nutritionData', { nutritionData }); // Assuming your views are configured to use EJS and the file is in the views directory
    } catch (error) {
        console.error('Error fetching nutrition data:', error);
        res.send('Error fetching nutrition data');
    }
});


module.exports = router;
