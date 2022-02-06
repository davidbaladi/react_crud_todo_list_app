import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { ImCheckmark } from "react-icons/im";
import { AiTwotoneDelete } from "react-icons/ai";
import { TiEdit } from "react-icons/ti";
import "./todo.css";

const Todo = ({
  todos,
  completeTodo,
  removeTodo,
  updateTodo,
  setIsEditing,
}) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
    setIsEditing(0);
  };

  if (edit.id) {
    return (
      <TodoForm
        edit={edit}
        onSubmit={submitUpdate}
        setIsEditing={setIsEditing}
      />
    );
  }

  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? "todo-row complete" : "todo-row"}
      key={index}
    >
      <p
        key={todo.id}
        onClick={() => completeTodo(todo.id)}
        className={todo.isComplete ? "completed" : null}
      >
        {todo.text}
      </p>
      <div className="button-options">
        <div className="checkbox" onClick={() => completeTodo(todo.id)}>
          {todo.isComplete ? (
            <ImCheckmark className="checked" />
          ) : (
            <RiCloseCircleLine className="unchecked" />
          )}
        </div>
        <div
          className="edit-todo-button"
          onClick={() => {
            setEdit({ id: todo.id, value: todo.text });
            setIsEditing(1);
          }}
        >
          <TiEdit />
        </div>
        <div className="delete-todo-button" onClick={() => removeTodo(todo.id)}>
          <AiTwotoneDelete />
        </div>
      </div>
    </div>
  ));
};

export default Todo;
