import React, { useState, useEffect, useRef } from "react";
import "./todo-app.css";
import Todo from "./Todo";

const TodoApp = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [todoId, setTodoId] = useState(0);
  const [editTodo, setEditTodo] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [focus, setFocus] = useState(true);

  const inputRef = useRef(null);
  console.log(inputRef);

  useEffect(() => {
    if (todos.length > 20) {
      alert(
        "WOW! You have a lot on your plate... Thx for testing out my App :)"
      );
    }
  });

  useEffect(() => {
    if (focus === true) inputRef.current.focus();
  });

  //text from Child
  const setET = (text) => {
    setEditingText(text);
  };

  useEffect(() => {
    console.log("componentDidMount");
    const loadedTodos = JSON.parse(localStorage.getItem("todos"));
    const loadedTodoIds = JSON.parse(localStorage.getItem("todoId"));
    if (loadedTodos) {
      setTodos(loadedTodos);
      setTodoId(loadedTodoIds);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("todoId", JSON.stringify(todoId));
  }, [todos, todoId]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!input || /^\s*$/.test(input)) {
      return;
    }
    const newTodo = {
      id: todoId,
      text: input,
      completed: false,
      tmpRef: "ref" + todoId,
    };
    setTodoId(todoId + 1);
    setTodos([...todos].concat(newTodo));
    console.log("Added Todo" + input);
    setInput("");
  };

  const deleteTodo = (id) => {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    console.log("Deleted Todo");
  };

  const toggleComplete = (id) => {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const submitEdit = (e, id) => {
    e.preventDefault();
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });

    setTodos(updatedTodos);
    setEditTodo(null);
    setEditingText("");
  };

  const clearTodos = () => {
    setTodos([]);
    setTodoId(0);
    inputRef.current.focus();
  };

  return (
    <div className="todo-app">
      <div className="app-title">What's the Plan for Today?</div>
      <form onSubmit={addTodo}>
        <div className="add-todo">
          <label htmlFor="todo-input" className="input-label">
            Add your <u>To-Do</u> item:
          </label>
          <input
            className="add-todo-input"
            name="todo-input"
            type="text"
            placeholder="ex: vacuum living room"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            ref={focus ? inputRef : null}
          />
          <button type="submit" className="add-todo-button">
            Add To-Do
          </button>
        </div>
      </form>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todos={todos}
          todo={todo}
          toggleComplete={toggleComplete}
          submitEdit={submitEdit}
          deleteTodo={deleteTodo}
          setET={setET}
          editingText={editingText}
          setEditTodo={setEditTodo}
          editTodo={editTodo}
          focus={focus}
          setFocus={setFocus}
        />
      ))}
      <div onClick={clearTodos} className="clear-button">
        Clear Entire To-Do List
      </div>
    </div>
  );
};

export default TodoApp;
