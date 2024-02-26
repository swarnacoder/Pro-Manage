const express = require("express");
// const { isAuthenticatedUser } = require("../middleware/auth");
const { getAllTodos, createTodo, getTodoDetails, updateTodo,  deleteTodo } = require("../controllers/todo-Controller");

const router = express.Router();
router.route("/todos").get(getAllTodos);
router.route("/todo/new").post(createTodo);
router
  .route("/todo/:id")
  .get(getTodoDetails)
  .put(updateTodo)
  .delete(deleteTodo);
module.exports = router;
