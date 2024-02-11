const mongoose = require('mongoose');

const dailyReflectionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    questionOfTheDay: {
        type: String,
        required: true,
    },
    journalEntry: {
        type: String,
    },
    mood: {
        type: String,
        enum: ['happy', 'neutral', 'sad', 'other'], // Add more mood options as needed
    },
    // Add more fields as needed for water log, food log, fruit log, etc.
});

const DailyReflection = mongoose.model('DailyReflection', dailyReflectionSchema);

module.exports = DailyReflection;
