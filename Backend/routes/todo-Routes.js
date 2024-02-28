const express = require("express");
// const  authMiddleware  = require("../middlewares/auth-Middleware");
const { getAllTodos, createTodo, getTodoDetails, updateTodo,  deleteTodo } = require("../controllers/todo-Controller");

const router = express.Router();

// router.use(authMiddleware);

router.route("/todos").get(getAllTodos);
router.route("/todo/new").post(createTodo);
router
  .route("/todo/:id")
  .get(getTodoDetails)
  .put(updateTodo)
  .delete(deleteTodo);
module.exports = router;
