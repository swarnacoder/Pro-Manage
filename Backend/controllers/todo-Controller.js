const Todo = require("../model/todo-Model");


//Create A TODO
exports.createTodo = async (req, res, next) => {
  try {
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
exports.getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({
      success: true,
      todos,
      todoCount: todos.length,
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

//Update Todo 
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
