
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Meditation Page Route
router.get('/', ensureAuthenticated, (req, res) => {
    // You can customize the data sent to the template as needed
    const meditationData = {
        // Add any necessary data for the meditation page
    };

    res.render('meditation', {meditationData , layout: 'layoutLoggedIn'});
});

// Export the router to use in your main app file
module.exports = router;


