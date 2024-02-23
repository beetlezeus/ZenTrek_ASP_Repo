// const express = require('express');
// const router = express.Router();
// const { ensureAuthenticated } = require('../config/auth');
// const Event = require('../models/Events');

// // Calendar Page Route
// router.get('/', ensureAuthenticated, async (req, res) => {
//     try {
//         // Retrieve events associated with the logged-in user
//         const events = await Event.find({ user: req.user.id });

//         // Pass the events data to the calendar view
//         res.render('calendar', { events, layout: 'layoutLoggedIn' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// });

// module.exports = router;



////Working//
// const express = require('express');
// const router = express.Router();

// // Include any required dependencies or models
// const Event = require('../models/events');

// // Initialize calendar
// router.get('/', async (req, res) => {
//     try {
//         // Fetch events from the database
//         const events = await Event.find();
//         // Render the calendar page with events
//         res.render('calendar', { events });
//     } catch (error) {
//         // Handle errors
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Handle adding events
// router.post('/events/add', async (req, res) => {
//     try {
//         // Extract event data from the request body
//         const eventData = req.body;
//         // Create a new event and save it to the database
//         const event = new Event(eventData);
//         await event.save();
//         res.status(201).send('Event added successfully');
//     } catch (error) {
//         // Handle errors
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Handle removing events
// router.delete('/events/:id', async (req, res) => {
//     try {
//         const eventId = req.params.id;
//         // Delete the event from the database
//         await Event.findByIdAndDelete(eventId);
//         res.status(200).send('Event deleted successfully');
//     } catch (error) {
//         // Handle errors
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Other route handlers as needed

// module.exports = router;


///working end//

const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
// Import the DailyReflection model
const DailyReflection = require('../models/DailyReflection');


// Include any required dependencies or models
const Event = require('../models/events');

// Initialize calendar
// router.get('/', ensureAuthenticated, async (req, res) => {
//     try {
//         // Retrieve events associated with the logged-in user
//         const events = await Event.find({ user: req.user.id });

//         // Pass the events data to the calendar view
//         res.render('calendar', { events });
//     } catch (error) {
//         // Handle errors
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });
// Initialize calendar
// router.get('/', ensureAuthenticated, async (req, res) => {
//     try {
//         // Retrieve daily reflection entries for the logged-in user
//         const reflections = await DailyReflection.find({ user: req.user.id });

//         // Format reflection data for display on the calendar
//         const events = reflections.map(reflection => {
//             return {
//                 id: reflection._id, // Assuming _id can be used as a unique identifier
//                 name: reflection.questionOfTheDay,
//                 date: reflection.date.toISOString(), // Convert date to ISO format
//                 type: 'reflection', // You can define your own type for reflections
//                 // You can add more properties like description, mood, etc. if needed
//             };
//         });

//         // Pass the events data to the calendar view
//         res.render('calendar', { events });
//     } catch (error) {
//         // Handle errors
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });
// router.get('/', ensureAuthenticated, async (req, res) => {
//     try {
//         // Retrieve daily reflection entries for the logged-in user
//         const reflections = await DailyReflection.find({ user: req.user.id });

//         // Format reflection data for display on the calendar
//         const events = reflections.map(reflection => {
//             return {
//                 id: reflection._id, // Assuming _id can be used as a unique identifier
//                 name: reflection.questionOfTheDay,
//                 date: reflection.date.toISOString(), // Convert date to ISO format
//                 type: 'reflection', // You can define your own type for reflections
//                 // You can add more properties like description, mood, etc. if needed
//             };
//         });

//         // Pass the events data to the calendar view
//         res.render('calendar', { events });
//     } catch (error) {
//         // Handle errors
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        // Retrieve daily reflection entries for the logged-in user
        const reflections = await DailyReflection.find({ user: req.user.id });

        // Format reflection data for display on the calendar
        const events = reflections.map(reflection => {
            return {
                id: reflection._id, // Assuming _id can be used as a unique identifier
                name: reflection.questionOfTheDay,
                date: reflection.date.toISOString(), // Convert date to ISO format
                type: 'reflection', // You can define your own type for reflections
                // You can add more properties like description, mood, etc. if needed
            };
        });

        // Pass the events data to the calendar view
        res.render('calendar', { events });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Handle adding events
router.post('/events/add', async (req, res) => {
    try {
        // Extract event data from the request body
        const eventData = req.body;
        // Create a new event and save it to the database
        const event = new Event(eventData);
        await event.save();
        res.status(201).send('Event added successfully');
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


// Handle removing events
router.delete('/events/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        // Delete the event from the database
        await Event.findByIdAndDelete(eventId);
        res.status(200).send('Event deleted successfully');
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Test entry to add an event
router.get('/test-entry', ensureAuthenticated, async (req, res) => {
    try {
        // Create a test event
        const testEvent = new Event({
            id: 'test123',
            name: 'Test Event',
            date: 'February/23/2024', // Change this to the desired date format
            type: 'test',
            description: 'This is a test event added programmatically',
            user: req.user.id
        });

        // Save the test event to the database
        await testEvent.save();

        // Redirect to the calendar page
        res.redirect('/calendar');
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


// Other route handlers as needed

module.exports = router;

