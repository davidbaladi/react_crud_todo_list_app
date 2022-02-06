import React, { useEffect, useRef, useState } from "react";
import "./todo.css";
import { ImCheckmark } from "react-icons/im";
import { TiEdit } from "react-icons/ti";
import { AiTwotoneDelete } from "react-icons/ai";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Todo = ({
  todos,
  todo,
  toggleComplete,
  submitEdit,
  deleteTodo,
  setET,
  editingText,
  setEditTodo,
  editTodo,
  focus,
  setFocus,
}) => {
  const tmp = useRef(null);
  const [tmps, setTmps] = useState([]);
  useEffect(() => {
    for (var i = 0; i < todos.length; i++) {}
  }, []);

  useEffect(() => {
    if (focus === false) tmp.current.focus();
  }, [focus]);

  return editTodo !== todo.id ? (
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
            setFocus(false);
          }}
        >
          <TiEdit />
        </div>
        <div
          className="delete-todo-button"
          type="button"
          onClick={() => {
            deleteTodo(todo.id);
          }}
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
        setFocus(true);
      }}
    >
      <div className="todo-edit">
        <input
          className="todo-edit-input"
          placeholder="Type your edit"
          type="text"
          onChange={(e) => setET(e.target.value)}
          value={editingText}
          ref={focus ? null : tmp}
        />
        <button className="todo-edit-button" type="submit">
          Submit Edit
        </button>
      </div>
    </form>
  );
};

export default Todo;
