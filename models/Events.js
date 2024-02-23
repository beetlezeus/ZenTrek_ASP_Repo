// const mongoose = require('mongoose');

// const eventSchema = new mongoose.Schema({
//     id: {
//         type: String,
//         required: true
//     },
//     name: {
//         type: String,
//         required: true
//     },
//     date: {
//         type: String,
//         required: true
//     },
//     type: {
//         type: String,
//         required: true
//     },
//     badge: {
//         type: String
//     },
//     description: {
//         type: String
//     },
//     color: {
//         type: String
//     },
//     everyYear: {
//         type: Boolean
//     },
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User', // Reference to the User model
//         required: true
//     }
// });

// // Define static methods for CRUD operations on events
// eventSchema.statics.addEvent = async function (userId, eventData) {
//     try {
//         eventData.user = userId;
//         const event = new this(eventData);
//         return await event.save();
//     } catch (error) {
//         throw error;
//     }
// };

// eventSchema.statics.updateEvent = async function (eventId, eventData) {
//     try {
//         const event = await this.findByIdAndUpdate(eventId, eventData, { new: true });
//         return event;
//     } catch (error) {
//         throw error;
//     }
// };

// eventSchema.statics.deleteEvent = async function (eventId) {
//     try {
//         const event = await this.findByIdAndDelete(eventId);
//         return event;
//     } catch (error) {
//         throw error;
//     }
// };

// const Event = mongoose.model('Event', eventSchema);


//////////////////////////2



// module.exports = Event;
// const mongoose = require('mongoose');

// const eventSchema = new mongoose.Schema({
//     id: {
//         type: String,
//         required: true
//     },
//     name: {
//         type: String,
//         required: true
//     },
//     date: {
//         type: String,
//         required: true
//     },
//     type: {
//         type: String,
//         required: true
//     },
//     badge: {
//         type: String
//     },
//     description: {
//         type: String
//     },
//     color: {
//         type: String
//     },
//     everyYear: {
//         type: Boolean
//     },
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User', // Reference to the User model
//         required: true
//     }
// });

// // Define static methods for CRUD operations on events
// eventSchema.statics.addEvent = async function (userId, eventData) {
//     try {
//         eventData.user = userId;
//         const event = new this(eventData);
//         return await event.save();
//     } catch (error) {
//         throw error;
//     }
// };

// eventSchema.statics.updateEvent = async function (eventId, eventData) {
//     try {
//         const event = await this.findByIdAndUpdate(eventId, eventData, { new: true });
//         return event;
//     } catch (error) {
//         throw error;
//     }
// };

// eventSchema.statics.deleteEvent = async function (eventId) {
//     try {
//         const event = await this.findByIdAndDelete(eventId);
//         return event;
//     } catch (error) {
//         throw error;
//     }
// };

// const Event = mongoose.model('Event', eventSchema);

// module.exports = Event;

////////////////////////////////2

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    badge: {
        type: String
    },
    description: {
        type: String
    },
    color: {
        type: String
    },
    everyYear: {
        type: Boolean
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
