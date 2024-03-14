// routes/todoRoutes.js
const router = require("express").Router();
const Todo = require("../models/TodoModel");
const {getAllTodos,createTodo,updateTodo,deleteTodo} = require('../controllers/TodoController');

router.get('/getAllTodoDetails',getAllTodos);

// Create a new todo
router.post('/createTodoDetails',createTodo);

// Update a todo
router.post('/updateTodoDetails/:id',updateTodo);

// Delete a todo
router.post('/deleteTodoDetails/:id',deleteTodo);

module.exports = router;
