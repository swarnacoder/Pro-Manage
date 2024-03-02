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
    enum: ["High", "Moderate", "Low"],
  },
  checklist: [
    {
      id: {
        type: String,
      },
      text: {
        type: String,
        required: [true, "Please enter your task to be done"],
        maxLength: [1024, "Your Task must not exceed 1024 Characters"],
        minLength: [3, "Your Task must not be less than 3 Characters"],
      },
      completed: {
        type: Boolean,
        default: false,
      },
    },
  ],
  dueDate: {
    type: Date,
    default: null,
    validate: {
      validator: function (date) {
        return date === null || date >= new Date();
      },
      message: "Due date must be at least one day more than the current date.",
    },
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  targetArea: {
    type: String,
    enum: ["Backlog", "ToDo", "In Progress", "Done"],
    default: "ToDo",
  },
  sharedLink: {
    type: String,
    default: null, // Set default value to null
  },
  // identifier: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   default: () => new mongoose.Types.ObjectId(),
  //   unique: true,
  // },

  createdDate: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Todo", todoSchema);
