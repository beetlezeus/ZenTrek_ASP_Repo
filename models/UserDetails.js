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
    goals_next_30_days: {
        type: String,
    },
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
