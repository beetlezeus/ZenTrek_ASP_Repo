
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
router.post('/saveNutrition', ensureAuthenticated, async (req, res) => {
    try {
        // Retrieve data from the form

        let { waterIntake, waterNotes, breakfastMeal, breakfastSnack, breakfastDescription, lunchMeal, lunchSnack, lunchDescription, dinnerMeal, dinnerSnack, dinnerDescription, healthySnack, unhealthySnack, snacksDescription} = req.body;

        if(req.body.breakfastMeal == "on"){
            breakfastMeal = true;
        }
        else{
            breakfastMeal = false;
        }
        if(req.body.breakfastSnack == "on"){
            breakfastSnack = true;
        }
        else{
            breakfastSnack = false;
        }
        if(req.body.lunchMeal == "on"){
            lunchMeal = true;
        }
        else{
            lunchMeal = false;
        }
        if(req.body.lunchSnack == "on"){
            lunchSnack = true;
        }
        else{
            lunchSnack = false;
        }
        if(req.body.dinnerMeal == "on"){
            dinnerMeal = true;
        }
        else{
            dinnerMeal = false;
        }
        if(req.body.dinnerSnack == "on"){
            dinnerSnack = true;
        }
        else{
            dinnerSnack = false;
        }

        if(req.body.healthySnack == "on"){
            healthySnack = true;
        }
        else{
            healthySnack = false;
        }
        if(req.body.unhealthySnack == "on"){
            unhealthySnack = true;
        }
        else{
            unhealthySnack = false;
        }


        // Save the water intake data to the database
        const nutritionData = new Nutrition({
            user: req.user._id,
            waterIntake: waterIntake,
            waterNotes : waterNotes,
            breakfast : {
                meal: breakfastMeal,
                snack: breakfastSnack,
                description: breakfastDescription
            },
            lunch :{
                meal: lunchMeal,
                snack: lunchSnack,
                description: lunchDescription
            },
            dinner :{
                meal: dinnerMeal,
                snack: dinnerSnack,
                description: dinnerDescription
            },
            snacks: {
                healthy: healthySnack,
                unhealthy: unhealthySnack,
                description: snacksDescription
            } ,
            date: new Date()
        });
        await nutritionData.save();

        // // Redirect to a success page or display a success message
        req.flash('success_msg','added data')
        res.redirect('/nutrition');
    } catch (error) {
        console.error(error);
        res.send('Error saving nutrition data');
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


// Route to get total number of nutrition logs
router.get('/total', ensureAuthenticated, async (req, res) => {
    try {
      // Fetch nutrition logs for the current user
      const nutritionLogs = await Nutrition.find({ user: req.user._id });
  
      // Total number of reflections
      const numberOfNutriLogs = nutritionLogs.length;

  
      // Send mood data as JSON response
      res.json({ numberOfNutriLogs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



module.exports = router;
