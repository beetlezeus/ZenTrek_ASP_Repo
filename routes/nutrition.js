const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


router.post('/saveData', (req, res) => {
    const { mealsCount, waterCount } = req.body;

    // Create a new instance of your Mongoose model
    const newNutrition = new Nutrition({
        mealsCount,
        waterCount,
        // You can add other fields here if needed
    });

    // Save the data to the database
    newNutrition.save()
        .then(savedData => {
            console.log('Data saved successfully:', savedData);
            res.sendStatus(200); // Send a success response to the client
        })
        .catch(error => {
            console.error('Error saving data:', error);
            res.sendStatus(500); // Send an error response to the client
        });
});

router.get('/', ensureAuthenticated, (req, res) => {
    // You can customize the data sent to the template as needed
    const nutritionData = {
        
        // Add any necessary data for the meditation page
    };

    res.render('nutrition', {nutritionData , layout: 'layoutLoggedIn'});
});

// Export the router to use in your main app file
module.exports = router;