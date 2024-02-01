// Import necessary modules
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Progress Page Route
router.get('/', ensureAuthenticated, (req, res) => {
    // You can customize the data sent to the template as needed
    const monthlyData = {
        // Add your data for the monthly calendar and overall monthly data
        // Example: moodData, activityData, etc.
    };

    res.render('progress', {monthlyData , layout: 'layoutLoggedIn'});
});

// Export the router to use in your main app file
module.exports = router;
