// const express = require('express');
// const router = express.Router();
// const { ensureAuthenticated } = require('../config/auth');
// const DailyReflection = require('../models/DailyReflection');

// // Progress Page Route
// router.get('/', ensureAuthenticated, (req, res) => {
//     // You can customize the data sent to the template as needed
//     const monthlyData = {
//         // Add your data for the monthly calendar and overall monthly data
//         // Example: moodData, activityData, etc.
//     };

//     res.render('calendar', {monthlyData , layout: 'layoutLoggedIn'});
// });

// // Export the router to use in your main app file
// module.exports = router;

// // Function to fetch daily reflections for a specific user within a date range
// async function fetchDailyReflections(userId, startDate, endDate) {
//     try {
//         const reflections = await DailyReflection.find({
//             user: userId,
//             date: { $gte: startDate, $lte: endDate }
//         }).sort({ date: 1 }); // Sort by date in ascending order
//         return reflections;
//     } catch (err) {
//         console.error('Error fetching daily reflections:', err);
//         return [];
//     }
// }

// const express = require('express');
// const router = express.Router();
// const { ensureAuthenticated } = require('../config/auth');
// const DailyReflection = require('../models/DailyReflection');

// // Function to fetch daily reflections for a specific user within a date range
// async function fetchDailyReflections(userId, startDate, endDate) {
//     try {
//         const reflections = await DailyReflection.find({
//             user: userId,
//             date: { $gte: startDate, $lte: endDate }
//         }).sort({ date: 1 }); // Sort by date in ascending order
//         return reflections;
//     } catch (err) {
//         console.error('Error fetching daily reflections:', err);
//         return [];
//     }
// }

// // Progress Page Route
// router.get('/', ensureAuthenticated, async (req, res) => {
//     try {
//         // Assuming user ID is available in the request object
//         const userId = req.user._id;
        
//         // Get current date and start/end dates for the current month
//         const currentDate = new Date();
//         const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
//         const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

//         // Fetch daily reflections for the current month
//         const dailyReflections = await fetchDailyReflections(userId, startDate, endDate);

//         // You can customize the data sent to the template as needed
//         const monthlyData = {
//             dailyReflections: dailyReflections // Pass fetched daily reflections to the template
//             // You can add more data here if needed
//         };

//         res.render('calendar', { monthlyData, layout: 'layoutLoggedIn' });
//     } catch (err) {
//         console.error('Error rendering calendar:', err);
//         res.status(500).send('Internal Server Error');
//     }
// });


////wwwwww
// // // Export the router to use in your main app file
// // module.exports = router;
// const express = require('express');
// const router = express.Router();
// const { ensureAuthenticated } = require('../config/auth');
// const DailyReflection = require('../models/DailyReflection');
// const Nutrition = require('../models/Nutrition'); // Import the Nutrition model

// // Function to fetch daily reflections and nutrition entries for a specific user within a date range
// async function fetchData(userId, startDate, endDate) {
//     try {
//         // Fetch daily reflections
//         const reflections = await DailyReflection.find({
//             user: userId,
//             date: { $gte: startDate, $lte: endDate }
//         }).sort({ date: 1 });

//         // Fetch nutrition entries
//         const nutritions = await Nutrition.find({
//             user: userId,
//             date: { $gte: startDate, $lte: endDate }
//         }).sort({ date: 1 });

//         return { reflections, nutritions };
//     } catch (err) {
//         console.error('Error fetching data:', err);
//         return { reflections: [], nutritions: [] };
//     }
// }

// // Progress Page Route
// router.get('/', ensureAuthenticated, async (req, res) => {
//     try {
//         // Assuming user ID is available in the request object
//         const userId = req.user._id;
        
//         // Get current date and start/end dates for the current month
//         const currentDate = new Date();
//         const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
//         const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

//         // Calculate the number of days in the current month
//         const daysInMonth = endDate.getDate();

//         // Fetch daily reflections and nutrition entries for the current month
//         const { reflections, nutritions } = await fetchData(userId, startDate, endDate);

//         // Pass fetched data and daysInMonth to the template
//         const monthlyData = {
//             reflections,
//             nutritions,
//             daysInMonth
//         };

//         res.render('calendar', { monthlyData, layout: 'layoutLoggedIn' });
//     } catch (err) {
//         console.error('Error rendering calendar:', err);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Export the router to use in your main app file
// module.exports = router;

////wwww

// // Export the router to use in your main app file
// module.exports = router;
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const DailyReflection = require('../models/DailyReflection');
const Nutrition = require('../models/Nutrition'); // Import the Nutrition model

// Function to fetch daily reflections and nutrition entries for a specific user within a date range
async function fetchData(userId, startDate, endDate) {
    try {
        // Fetch daily reflections
        const reflections = await DailyReflection.find({
            user: userId,
            date: { $gte: startDate, $lte: endDate }
        }).sort({ date: 1 });

        // Fetch nutrition entries
        const nutritions = await Nutrition.find({
            user: userId,
            date: { $gte: startDate, $lte: endDate }
        }).sort({ date: 1 });

        return { reflections, nutritions };
    } catch (err) {
        console.error('Error fetching data:', err);
        return { reflections: [], nutritions: [] };
    }
}

// Progress Page Route
router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        // Assuming user ID is available in the request object
        const userId = req.user._id;
        
        // Extract year and month from query parameters or use current date
        const year = parseInt(req.query.year) || new Date().getFullYear();
        const month = parseInt(req.query.month) || new Date().getMonth() + 1;

        // Get start and end dates for the specified month
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        // Calculate the number of days in the specified month
        const daysInMonth = endDate.getDate();

        // Fetch daily reflections and nutrition entries for the specified month
        const { reflections, nutritions } = await fetchData(userId, startDate, endDate);

        // Pass fetched data, daysInMonth, year, and month to the template
        const monthlyData = {
            reflections,
            nutritions,
            daysInMonth,
            year,
            month
        };

        res.render('calendar', { monthlyData, layout: 'layoutLoggedIn' });
    } catch (err) {
        console.error('Error rendering calendar:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Export the router to use in your main app file
module.exports = router;
