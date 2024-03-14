// controllers/todoController.js
const todoModel = require("../models/TodoModel");


// module.exports.createTodo = async (req, res) => {
//   try {
//     // const { text } = req.body;
//     // const todo = new Todo({ text });
//     const {inputValue} = req.body;
//     console.log(inputValue);
//     // await todo.save();
//     res.json(todo);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

module.exports.createTodo = async (req, res) => {
  try {
    const { text } = req.body;
    // console.log(text);
    const data = await todoModel.create({ text:text });
    // console.log(data);

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



module.exports.getAllTodos = async (req, res) => {
  try {
    const todos = await todoModel.find();
    console.log(todos);
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const todo = await Todo.findByIdAndUpdate(id, { text }, { new: true });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};