// models/todo.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
});

// Create the todo model based on the schema
const todoModel = mongoose.model('Todo', todoSchema);

module.exports = todoModel;
