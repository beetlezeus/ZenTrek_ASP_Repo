// // Import necessary modules
// const express = require('express');
// const router = express.Router();


// /// Exercise Page Route
// router.get('/', (req, res) => {
//     const exerciseData = {
//         exerciseName: 'Sample Exercise',
//         difficulty: 'Medium',
//         // Add more exercise details as needed
//     };

//     res.render('exercise', exerciseData);
// });

// // Exercise Submission Route (this is just an example; adjust based on your application logic)
// router.post('/submitExercise', (req, res) => {
//     const { exerciseName, difficulty } = req.body;

//     // Process and save exercise data as needed

//     res.redirect('/exercise');
// });

// // Export the router to use in your main app file
// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { ensureAuthenticated } = require('../config/auth');

// // Exercise Page Route
// router.get('/', ensureAuthenticated, (req, res) => {
//     const exerciseData = {
//         exerciseName: 'Sample Exercise',
//         difficulty: 'Medium',
//         // Add more exercise details as needed
//     };

//     res.render('exercise', exerciseData);
// });

// // Exercise Submission Route (this is just an example; adjust based on your application logic)
// router.post('/submitExercise', ensureAuthenticated, (req, res) => {
//     const { exerciseName, difficulty } = req.body;

//     // Process and save exercise data as needed

//     res.redirect('/exercise');
// });

// // Export the router to use in your main app file
// module.exports = router;

const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Exercise Page Route
router.get('/', ensureAuthenticated, (req, res) => {
    res.render('exercise');
});

// Exercise Submission Route (this is just an example; adjust based on your application logic)
router.post('/submitExercise', ensureAuthenticated, (req, res) => {
    const { exerciseName, difficulty } = req.body;

    // Process and save exercise data as needed

    res.redirect('/exercise');
});

// Log Strength Training
router.post('/logStrengthTraining', ensureAuthenticated, (req, res) => {
    const { exerciseType, numOfReps } = req.body;

    // Process and save strength training log data as needed

    res.redirect('/exercise');
});

// Log Cardio
router.post('/logCardio', ensureAuthenticated, (req, res) => {
    const { runningStats } = req.body;

    // Process and save cardio log data as needed

    res.redirect('/exercise');
});

// Log Yoga
router.post('/logYoga', ensureAuthenticated, (req, res) => {
    const { timeSpent } = req.body;

    // Process and save yoga log data as needed

    res.redirect('/exercise');
});

// Export the router to use in your main app file
module.exports = router;
