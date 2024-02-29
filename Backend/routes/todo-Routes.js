const express = require("express");
const  authMiddleware  = require("../middlewares/auth-Middleware");
const { getAllTodos, createTodo, getTodoDetails, updateTodo,  deleteTodo, getSharedTodoDetails, changeCategory } = require("../controllers/todo-Controller");

const router = express.Router();

// router.use(authMiddleware);

router.route("/todos").get(authMiddleware, getAllTodos);
router.route("/todo/new").post(authMiddleware, createTodo);
// router.route("/todo/share/:id").get( getSharedTodoDetails);
router
  .route("/todo/:id")
  .get(authMiddleware, getTodoDetails)
  .put(authMiddleware, updateTodo)
  .put(authMiddleware, changeCategory) // Update route to accept PUT requests

  .delete(authMiddleware, deleteTodo);
module.exports = router;
