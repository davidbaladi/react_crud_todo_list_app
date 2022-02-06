import React, { useState, useEffect, useRef } from "react";
import "./TodoApp.css";
import { ImCheckmark } from "react-icons/im";
import { TiEdit } from "react-icons/ti";
import { AiTwotoneDelete } from "react-icons/ai";
import { IoIosCloseCircleOutline } from "react-icons/io";

const TodoApp = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [todoId, setTodoId] = useState(0);

  const [editTodo, setEditTodo] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [refState, setRefState] = useState("input");

  const inputRef = useRef(null);
  const editRef = useRef(null);

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

  useEffect(() => {
    if (refState === "input") {
      inputRef.current.focus();
    } else {
      editRef.current.focus();
    }
  }, [refState]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!input || /^\s*$/.test(input)) {
      return;
    }
    const newTodo = {
      id: todoId,
      text: input,
      completed: false,
    };
    setTodoId(todoId + 1);
    setTodos([...todos].concat(newTodo));
    setInput("");
    console.log("Added Todo");
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
        <label htmlFor="todo-input" className="input-label">
          Add your <u>To-Do</u> item:
        </label>
        <div className="add-todo">
          <input
            className="add-todo-input"
            name="todo-input"
            type="text"
            placeholder="ex: vacuum living room"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            ref={inputRef}
          />
          <button type="submit" className="add-todo-button">
            Add To-Do
          </button>
        </div>
      </form>

      {todos.map((todo) =>
        editTodo !== todo.id ? (
          <div className="todo" key={todo.id}>
            <p
              className={todo.completed ? "completed" : null}
              onClick={() => toggleComplete(todo.id)}
            >
              {todo.text}
              {/* {todo.id} */}
            </p>
            <div className="button-options">
              <div
                className="checkbox"
                onClick={() => toggleComplete(todo.id)}
                checked={todo.completed}
              >
                {todo.completed ? (
                  <ImCheckmark className="checked" />
                ) : (
                  <IoIosCloseCircleOutline className="unchecked" />
                )}
              </div>
              <div
                className="edit-todo-button"
                type="button"
                onClick={() => {
                  setEditTodo(todo.id);
                  setRefState("edit");
                }}
              >
                <TiEdit />
              </div>
              <div
                className="delete-todo-button"
                type="button"
                onClick={() => deleteTodo(todo.id)}
              >
                <AiTwotoneDelete />
              </div>
            </div>
          </div>
        ) : (
          <form
            key={todo.id}
            onSubmit={(e) => {
              submitEdit(e, todo.id);
              setRefState("input");
            }}
          >
            <div className="todo-edit">
              <input
                className="todo-edit-input"
                placeholder="Type your edit"
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
                value={editingText}
                ref={editRef}
              />
              <button className="todo-edit-button" type="submit">
                Submit Edit
              </button>
            </div>
          </form>
        )
      )}
      <button onClick={clearTodos} className="clear-button">
        Clear Entire To-Do List
      </button>
    </div>
  );
};

export default TodoApp;
