// const mongoose = require('mongoose');

// const nutritionSchema = new mongoose.Schema({
//     waterIntake: {
//         type: Number,
//         required: true,
//     },
//     waterNotes: {
//         type: String,
//         trim: true,
//     },
//     breakfast: {
//         type: {
//             meal: Boolean,
//             snack: Boolean,
//             description: String,
//         },
//         required: true,
//     },
//     lunch: {
//         type: {
//             meal: Boolean,
//             snack: Boolean,
//             description: String,
//         },
//         required: true,
//     },
//     dinner: {
//         type: {
//             meal: Boolean,
//             snack: Boolean,
//             description: String,
//         },
//         required: true,
//     },
//     snacks: {
//         type: {
//             healthy: Boolean,
//             unhealthy: Boolean,
//             description: String,
//         },
//         required: true,
//     },
//     energized: {
//         type: Boolean,
//         default: false,
//     },
//     satisfied: {
//         type: Boolean,
//         default: false,
//     },
//     hungry: {
//         type: Boolean,
//         default: false,
//     },
//     thirsty: {
//         type: Boolean,
//         default: false,
//     },
//     otherFeelings: {
//         type: Boolean,
//         default: false,
//     },
//     otherFeelingsDescription: {
//         type: String,
//         trim: true,
//     },
//     additionalNotes: {
//         type: String,
//         trim: true,
//     }
// });

// const Nutrition = mongoose.model('Nutrition', nutritionSchema);

// module.exports = Nutrition;


// // const mongoose = require('mongoose');

// // const nutritionSchema = new mongoose.Schema({
// //   date: {
// //     type: Date,
// //     default: Date.now
// //   },
// //   meal: {
// //     type: String,
// //     required: true
// //   },
// //   foodItem: {
// //     type: String,
// //     required: true
// //   },
// //   calories: {
// //     type: Number,
// //     required: true
// //   },
// //   // Add more fields as needed (e.g., fat, protein, carbs, etc.)
// // });

// // const Nutrition = mongoose.model('Nutrition', nutritionSchema);

// // // module.exports = Nutrition;
// const mongoose = require('mongoose');

// const nutritionSchema = new mongoose.Schema({
//     waterIntake: {
//         type: Number,
//         required: true,
//     },
//     waterNotes: {
//         type: String,
//         trim: true,
//     },
//     breakfast: {
//         meal: {
//             type: Boolean,
//             default: false,
//         },
//         snack: {
//             type: Boolean,
//             default: false,
//         },
//         description: String,
//     },
//     lunch: {
//         meal: {
//             type: Boolean,
//             default: false,
//         },
//         snack: {
//             type: Boolean,
//             default: false,
//         },
//         description: String,
//     },
//     dinner: {
//         meal: {
//             type: Boolean,
//             default: false,
//         },
//         snack: {
//             type: Boolean,
//             default: false,
//         },
//         description: String,
//     },
//     snacks: {
//         healthy: {
//             type: Boolean,
//             default: false,
//         },
//         unhealthy: {
//             type: Boolean,
//             default: false,
//         },
//         description: String,
//     },
//     energized: {
//         type: Boolean,
//         default: false,
//     },
//     satisfied: {
//         type: Boolean,
//         default: false,
//     },
//     hungry: {
//         type: Boolean,
//         default: false,
//     },
//     thirsty: {
//         type: Boolean,
//         default: false,
//     },
//     otherFeelings: {
//         type: Boolean,
//         default: false,
//     },
//     otherFeelingsDescription: {
//         type: String,
//         trim: true,
//     },
//     additionalNotes: {
//         type: String,
//         trim: true,
//     }
// });

// const Nutrition = mongoose.model('Nutrition', nutritionSchema);

// module.exports = Nutrition;

const mongoose = require('mongoose');

const nutritionSchema = new mongoose.Schema({
    waterIntake: {
        type: Number,
        required: true,
    },
    waterNotes: {
        type: String,
        trim: true,
    }
});

const Nutrition = mongoose.model('Nutrition', nutritionSchema);

module.exports = Nutrition;
