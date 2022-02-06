import React, { useState, useEffect, useRef } from "react";
import "./todo-form.css";
function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 100000),
      text: input,
      isComplete: false,
    });
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      {props.edit ? (
        <div className="edit-todo">
          <input
            placeholder="Update your item"
            value={input}
            onChange={handleChange}
            name="text"
            ref={inputRef}
            className="edit-todo-input "
            type="text"
          />
          <button onClick={handleSubmit} className="edit-todo-button">
            Update
          </button>
        </div>
      ) : (
        <div className="add-todo">
          <input
            className="add-todo-input"
            placeholder="ex: vacuum living room."
            value={input}
            onChange={handleChange}
            name="text"
            ref={inputRef}
            type="text"
            required
            autoComplete="off"
          />
          <button onClick={handleSubmit} className="add-todo-button">
            Add To-do
          </button>
        </div>
      )}
    </form>
  );
}

export default TodoForm;
