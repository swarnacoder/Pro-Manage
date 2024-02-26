const Todo = require("../model/todo-Model");
// const ErrorHander = require("../utils/errorhander");
// const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// exports.createCard = async (req, res, next) =>{
//     const card = new Card(req.body);
//     await card.save();
//     res.status(201).json({
//         success: true,
//         card,
//     })
// }
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
exports.getAllTodos = async (req, res, next) => {
  const todoCount = await Todo.countDocuments();
  let todos = await Todo.find();
  res.status(200).json({
    success: true,
    todos,
    todoCount,
  });
};
//Get Single card Details --ADMIN
exports.getTodoDetails = async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    return res.status(404).json({ msg: "Product Not Found" });
  }
  res.status(200).json({
    success: true,
    todo,
  });
};
//Update Product --ADMIN
exports.updateTodo = async (req, res, next) => {
  let todo = await Todo.findById(req.params.id);
  if (!todo) {
    return res.status(404).json({ msg: "Product Not Found" });
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
//Delete product
exports.deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ msg: "Product Not Found" });
    }
    await Todo.deleteOne({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
