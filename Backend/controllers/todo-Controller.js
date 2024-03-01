const Todo = require("../model/todo-Model");


//Create A TODO
exports.createTodo = async (req, res, next) => {
  try {
    req.body.user = req.user.id
    const todo = new Todo(req.body);
    await todo.save();
    res.status(201).json({
      success: true,
      todo,
    });
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

//GET ALL TODO CARD
// exports.getAllTodos = async (req, res, next) => {
//   try {
// const userId = req.user.id    

// const todos = await Todo.find({ user: userId });
// res.status(200).json({
//       success: true,
//       todos,
//       todoCount: todos.length,
//     });
//   } catch (error) {
//     console.error("Error fetching todos:", error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

// WORKING CODE TILL DATE FILTER 
exports.getAllTodos = async (req, res, next) => {
  try {
    const userId = req.user.id;
    let filter = { user: userId };

    // Check for the time range query parameter
    const { time } = req.query;
    if (time) {
      const currentDate = new Date();

      // Set the date based on the selected time range
      switch (time.toLowerCase()) {
        case "today":
          currentDate.setDate(currentDate.getDate() - 1); // Filtering for today
          break;
        case "week":
          currentDate.setDate(currentDate.getDate() - 7); // Filtering for the last 7 days
          break;
        case "month":
          currentDate.setDate(currentDate.getDate() - 30); // Filtering for the last 30 days
          break;
        default:
          break;
      }

      filter.createdDate = { $gte: currentDate };
    }

  
    

    const todos = await Todo.find(filter);
      // ADDING ANALYTICS LOGIC 
      const analyticsData = {
        backlogTasks: todos.filter((todo) => todo.targetArea === 'Backlog').length,
        todoTasks: todos.filter((todo) => todo.targetArea === 'ToDo').length,
        inProgressTasks: todos.filter((todo) => todo.targetArea === 'In Progress').length,
        doneTasks: todos.filter((todo) => todo.targetArea === 'Done').length,
        lowPriorityTasks: todos.filter((todo) => todo.priority === 'Low').length,
        moderatePriorityTasks: todos.filter((todo) => todo.priority === 'Moderate').length,
        highPriorityTasks: todos.filter((todo) => todo.priority === 'High').length,
        dueDateTasks: todos.filter((todo) => todo.dueDate >= new Date()).length,
      };
    res.status(200).json({
      success: true,
      todos,
      todoCount: todos.length,
      analyticsData,
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};







//Get Single card Details 
exports.getTodoDetails = async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    return res.status(404).json({ msg: "Todo Not Found" });
  }
  res.status(200).json({
    success: true,
    todo,
  });
};

//Update  Edit Todo 
exports.updateTodo = async (req, res, next) => {
  let todo = await Todo.findById(req.params.id);
  if (!todo) {
    return res.status(404).json({ msg: "Todo Not Found" });
  }
  todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    todo,
  });
};

//Delete Todo
exports.deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ msg: "Todo Not Found" });
    }
    await Todo.deleteOne({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Todo Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// TO MOVE CARDS BETWEEN CATEGORY 
exports.changeCategory  = async (req, res, next) => {
  try {
    let todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ msg: "Todo Not Found" });
    }

    const { targetArea } = req.body;

    if (targetArea) {
      // If the targetArea is provided in the request body, update it
      todo = await Todo.findByIdAndUpdate(
        req.params.id,
        { targetArea },
        { new: true, runValidators: true, useFindAndModify: false }
      );
    } else {
      // If targetArea is not provided, update other fields (title, priority, etc.)
      todo = await Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true, useFindAndModify: false }
      );
    }

    res.status(200).json({
      success: true,
      todo,
    });
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



