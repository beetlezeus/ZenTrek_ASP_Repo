// Import necessary modules
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Reflection = require('../models/DailyReflection'); // Import your Reflection model


// Route to render the Daily Reflections page
router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        // Fetch reflections for the current user
        const reflections = await Reflection.find({ user: req.user._id });

        // Assume you have a way to determine the current reflection
        const currentReflection = reflections[0]; // Just an example, replace with your logic

         // Assume questionOfTheDay is dynamically generated or retrieved from a database
         const questionOfTheDay = "How did today go for you?";

        // Render the dailyReflections.ejs template and pass the necessary data

        res.render('dailyReflections', { 
            title: 'Daily Reflections', 
            layout: 'layoutLoggedIn', 
            questionOfTheDay, 
            currentReflection,
            reflections
        });
    } catch (error) {
        console.error(error);
        res.redirect('/home'); // Redirect to home or handle error appropriately
    }
});

// Route to handle the submission of daily reflections
router.post('/submitReflections', ensureAuthenticated, async (req, res) => {
  const { journalEntry, mood } = req.body;

  try {
    // Create a new reflection entry
    await Reflection.create({
      user: req.user._id,
      questionOfTheDay: "How did today go for you?",
      journalEntry,
      mood,
      date: new Date(),
    });

    res.redirect('/dailyReflections'); // Redirect to the Daily Reflections page or another appropriate page
  } catch (error) {
    console.error(error);
    res.redirect('/home'); // Redirect to home or handle error appropriately
  }
});

// Route to render the Edit Reflection page
router.get('/editReflection/:id', ensureAuthenticated, async (req, res) => {
  try {
    const reflection = await Reflection.findById(req.params.id);
    res.render('editReflection', { title: 'Edit Reflection', layout: 'layoutLoggedIn', reflection });
  } catch (error) {
    console.error(error);
    res.redirect('/home'); // Redirect to home or handle error appropriately
  }
});

// Route to handle editing a reflection
router.post('/editReflection/:id', ensureAuthenticated, async (req, res) => {
  const { journalEntry, mood } = req.body;

  try {
    const updatedReflection = await Reflection.findByIdAndUpdate(
      req.params.id,
      { journalEntry, mood },
      { new: true }
    );

    res.redirect('/dailyReflections'); // Redirect to the Daily Reflections page or another appropriate page
  } catch (error) {
    console.error(error);
    res.redirect('/home'); // Redirect to home or handle error appropriately
  }
});

// Route to handle deleting a reflection
router.post('/deleteReflection/:id', ensureAuthenticated, async (req, res) => {
  try {
    await Reflection.findByIdAndDelete(req.params.id);
    res.redirect('/dailyReflections'); // Redirect to the Daily Reflections page or another appropriate page
  } catch (error) {
    console.error(error);
    res.redirect('/home'); // Redirect to home or handle error appropriately
  }
});

// Client-side JavaScript for navigation between entries
router.get('/clientScript', (req, res) => {
    res.sendFile('clientScript.js', { root: __dirname });
});

// Route to handle displaying the previous reflection entry
router.get('/previousReflection/:id', ensureAuthenticated, async (req, res) => {
    try {
        // Fetch reflections for the current user
        const reflections = await Reflection.find({ user: req.user._id });

        // Assume you have a way to determine the current reflection
        const currentReflection = await Reflection.findById(req.params.id);

        // Find the index of the current reflection in the reflections array
        let currentIndex = reflections.findIndex(ref => ref._id.equals(currentReflection._id));

        // Calculate the index of the previous reflection
        let previousIndex = (currentIndex - 1 + reflections.length) % reflections.length;

        // Get the previous reflection
        let previousReflection = reflections[previousIndex];

        // Render the dailyReflections.ejs template and pass the necessary data
        res.render('dailyReflections', { 
            title: 'Daily Reflections', 
            layout: 'layoutLoggedIn', 
            questionOfTheDay: "How did today go for you?", 
            reflections,
            currentReflection: previousReflection
        });
    } catch (error) {
        console.error(error);
        res.redirect('/home'); // Redirect to home or handle error appropriately
    }
});

// Route to handle displaying the next reflection entry
router.get('/nextReflection/:id', ensureAuthenticated, async (req, res) => {
    try {
        // Fetch reflections for the current user
        const reflections = await Reflection.find({ user: req.user._id });

        // Assume you have a way to determine the current reflection
        const currentReflection = await Reflection.findById(req.params.id);

        // Find the index of the current reflection in the reflections array
        let currentIndex = reflections.findIndex(ref => ref._id.equals(currentReflection._id));

        // Calculate the index of the next reflection
        let nextIndex = (currentIndex + 1) % reflections.length;

        // Get the next reflection
        let nextReflection = reflections[nextIndex];



        // Render the dailyReflections.ejs template and pass the necessary data
        res.render('dailyReflections', { 
            title: 'Daily Reflections', 
            layout: 'layoutLoggedIn', 
            questionOfTheDay: "How did today go for you?", 
            reflections,
            currentReflection: nextReflection
        });
    } catch (error) {
        console.error(error);
        res.redirect('/home'); // Redirect to home or handle error appropriately
    }
});

// Route to fetch mood data
router.get('/moodData', ensureAuthenticated, async (req, res) => {
  try {
    // Fetch reflections for the current user
    const reflections = await Reflection.find({ user: req.user._id });

    let moods = reflections.map(reflection => reflection.mood);

    let dates = reflections.map(reflection => reflection.date);

    res.json({ moods, dates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Route to get total number of reflections
router.get('/total', ensureAuthenticated, async (req, res) => {
  try {
    // Fetch reflections for the current user
    const reflections = await Reflection.find({ user: req.user._id });

    // Total number of reflections
    const numberOfReflections = reflections.length;

    // Send mood data as JSON response
    res.json({ numberOfReflections });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});







// Export the router
module.exports = router;
