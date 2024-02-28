const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter your Card Title"],
        maxLength: [1024, "Card Title must not exceed 1024 Characters"],
        minLength: [3, "Card Title must be more than 3 Characters"],
    },
    priority: {
        type: String,
        required: [true, "Please select your Priority to proceed"],
        enum: ['High', 'Moderate', 'Low'],  
    },
    checklist: [{
        text: {
            type: String,
            required: [true, "Please enter your task to be done"],
            maxLength: [1024, "Your Task must not exceed 1024 Characters"],
            minLength: [3, "Your Task must not be less than 3 Characters"],
        }
    }],

    dueDate: {
        type: Date,
        default: new Date(), // Sets today's date as default
        validate: {
          validator: function (date) {
            // Check if the dueDate is at least one day more than the current date
            return date >= new Date(new Date().setDate(new Date().getDate() + 1));
          },
          message: 'Due date must be at least one day more than the current date.',
        },
      },
    // category: {
    //     type: String,
    //     // required: [true, "Please select one Category to proceed"],
    //     enum: ['ToDo', 'BackLog', 'Done', 'InProgress'],
    //     default: 'ToDo',
    // },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },

    isTodo: {
    type : String ,
   default: true,
},
    isProgress: {
    type : String ,
   default: false,
},
    isBcaklog: {
    type : String ,
   default: false,
},
    isDone: {
    type : String ,
   default: false,
},

    createdDate: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("Todo", todoSchema);
