import React, { useState } from "react";
import "../../style/Todo.css"; // Import the CSS file
import { Button, TextField } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useEffect } from "react";
import {
  createTodoDetails,
  deleteTodoDetails,
  getAllTodoDetails,
  updateTodoDetails,
} from "../../utils/APIRoutes";
import axios from "axios";
// import { createTodoDetails } from '../../utils/APIRoutes';
const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    try {
      // setLoading(true);
      const response = await axios.get(getAllTodoDetails);
      setTodos(response.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddTodo = async () => {
    if (inputValue.trim() === "") return;
    if (editId !== null) {
      // Update existing todo
      setTodos(
        todos.map((todo) => {
          if (todo.id === editId) {
            return { ...todo, text: inputValue };
          }
          return todo;
        })
      );

      
      setEditId(null);
    } else {
      // Add new todo
      const newTodo = { id: Date.now(), text: inputValue };
      setTodos([...todos, newTodo]);
      try {
        const todoValue = await axios.post(createTodoDetails, {
          text: inputValue,
        });
        console.log("New Todo:", todoValue.data);
        fetchData();
      } catch (err) {
        console.error("Error creating todo:", err);
      }
    }

    setInputValue("");
  };

  const handleEditTodo = (id) => {
    console.log(id);
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setInputValue(todoToEdit.text);
      setEditId(id);
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-list-container">
      <div className="todo-list">
        <h1
          style={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            color: " #1967d2",
          }}
        >
          Todo List
        </h1>
        <div style={{ display: "flex" }}>
          <TextField
            id="standard-basic"
            variant="standard"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a new todo..."
            style={{
              width: "480px",
              marginTop: "20px",
            }}
          />
          <Button
            onClick={handleAddTodo}
            style={{ width: "20px" }}
            variant="contained"
          >
            Add
          </Button>
        </div>
        <div style={{ fontSize: "20px", display: "flex", color: "#1967d2" }}>
          <ul>
            {todos.map((todo) => (
              <li
                key={todo.id}
                style={{
                  justifyContent: "space-evenly",
                  gap: "332px",
                  display: "flex",
                  marginTop: "15px",
                }}
              >
                {todo.text}
                <div
                  style={{
                    justifyContent: "space-evenly",
                    gap: "5px",
                    display: "flex",
                  }}
                >
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

//   const [todo, setTodo] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const [editId, setEditId] = useState(null);

//   // useEffect(() => {
//   //   fetch(getAllTodoDetails)
//   //     .then((res) => res.json())
//   //     .then((data) => setTodo(data))
//   //     .catch((err) => console.error(err));
//   // }, []);
//   if (!Array.isArray(todo)) {
//     return <p>No todos found</p>;
//   }
//   const handleAddTodo = () => {
//     console.log(inputValue);
//     setTodo(inputValue);
//     // if (inputValue.trim() === '') return;
//     // if (editId !== null) {
//     //   // Update existing todo
//     //   fetch(updateTodoDetails, {
//     //     method: 'PUT',
//     //     headers: { 'Content-Type': 'application/json' },
//     //     body: JSON.stringify({ text: inputValue }),
//     //   })
//     //     .then((res) => res.json())
//     //     .then((data) => {
//     //       setTodo(todo.map((todo) => (todo._id === editId ? data : todo)));
//     //       setEditId(null);
//     //       setInputValue('');
//     //     })
//     //     .catch((err) => console.error(err));
//     // } else {
//     //   // Add new todo
//     //   fetch(createTodoDetails, {
//     //     method: 'POST',
//     //     headers: { 'Content-Type': 'application/json' },
//     //     body: JSON.stringify({ text: inputValue }),
//     //   })
//     //     .then((res) => res.json())
//     //     .then((data) => {
//     //       setTodo([...todo, data]);
//     //       setInputValue('');
//     //     })
//     //     .catch((err) => console.error(err));
//     // }
//   };

//   const handleEditTodo = (id) => {
//     const todoToEdit = todo.find((todo) => todo._id === id);
//     if (todoToEdit) {
//       setInputValue(todoToEdit.text);
//       setEditId(id);
//     }
//   };

//   const handleDeleteTodo = (id) => {
//     fetch(deleteTodoDetails, {
//       method: 'DELETE',
//     })
//       .then(() => {
//         setTodo(todo.filter((todo) => todo._id !== id));
//       })
//       .catch((err) => console.error(err));
//   };

//   return (
//     <div className="todo-list-container">
//       <div className="todo-list">
//         <h1 style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', color: '#1967d2' }}>
//           Todo List
//         </h1>
//         <div style={{ display: 'flex' }}>
//           <TextField
//             id="standard-basic"
//             variant="standard"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             placeholder="Enter a new todo..."
//             style={{
//               width: '480px',
//               marginTop: '20px',
//             }}
//           />
//           <Button onClick={handleAddTodo} style={{ width: '20px' }} variant="contained">
//             Add
//           </Button>
//         </div>
//         <div style={{ fontSize: '20px', display: 'flex', color: '#1967d2' }}>
//           <ul>
//             {todo.map((todo) => (
//               <li
//                 key={todo._id}
//                 style={{
//                   justifyContent: 'space-between',
//                   gap: '5px',
//                   display: 'flex',
//                   marginTop: '15px',
//                 }}
//               >
//                 {todo.text}
//                 <div style={{ justifyContent: 'space-evenly', gap: '5px', display: 'flex' }}>
//                   <MdEdit onClick={() => handleEditTodo(todo._id)} />
//                   <MdDelete onClick={() => handleDeleteTodo(todo._id)} />
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };
export default Todo;
