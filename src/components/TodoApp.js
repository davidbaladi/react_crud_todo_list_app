import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import "../styles/todo-app.css";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(0);

  useEffect(() => {
    console.log("componentDidMount");
    fetch("http://localhost:3001/db")
      .then((res) => res.json())
      .then((resdata) => {
        return setTodos(resdata);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    console.log(todo, ...todos);
  };

  const updateTodo = (todoId, editTodo) => {
    if (!editTodo.text || /^\s*$/.test(editTodo.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? editTodo : item))
    );
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const clearTodos = () => {
    setTodos([]);
  };

  return (
    <>
      <div className="todo-app">
        <h1 className="todo-app-title">What's the Plan for Today?</h1>
        <TodoForm onSubmit={addTodo} />
        <Todo
          setIsEditing={setIsEditing}
          todos={todos}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
        {isEditing ? null : (
          <div className="clear-button" onClick={clearTodos}>
            <u>Clear</u> To-do List
          </div>
        )}
      </div>
    </>
  );
}

export default TodoApp;
