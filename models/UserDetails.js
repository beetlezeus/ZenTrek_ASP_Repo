const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    age: {
        type: Number,
    },
    weight: {
        type: Number,
        default: 50,
        min: 15,
        max: 250,
    },
    height: {
        type: Number,
        default: 160,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other', 'prefer not to say'],
    },
    fitness_level: {
        type: Number,
        min: 0,
        max: 10,
    },
    general_health: {
        type: Number,
        min: 0,
        max: 10,
    },
    strength: {
        type: Boolean,
        default: false,
    },
    cardio: {
        type: Boolean,
        default: false,
    },
    yoga: {
        type: Boolean,
        default: false,
    },
    meditation: {
        type: Boolean,
        default: false,
    },
    strength_frequency: {
        type: Number,
        default: 4,
        min: 0,
        max: 7,
    },
    cardio_frequency: {
        type: Number,
        default: 4,
        min: 0,
        max: 7,
    },
    yoga_frequency: {
        type: Number,
        default: 4,
        min: 0,
        max: 7,
    },
    meditation_frequency: {
        type: Number,
        default: 4,
        min: 0,
        max: 7,
    }
});

// Add a static method for updating user details
userDetailsSchema.statics.updateUserDetails = async function (userId, newDetails) {
    try {
        const userDetails = await this.findOneAndUpdate(
            { user: userId },
            { $set: newDetails },
            { new: true }
        );
        return userDetails;
    } catch (error) {
        throw error;
    }
};

const UserDetails = mongoose.model('UserDetails', userDetailsSchema);

module.exports = UserDetails;
