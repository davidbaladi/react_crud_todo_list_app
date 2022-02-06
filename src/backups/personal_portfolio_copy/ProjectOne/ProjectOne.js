import React from "react";
import "./project-one.css";
import "./modal-one.css";

const ProjectOne = ({ fxnShowOne }) => {
  return (
    <div className="project-one-container">
      <div className="project-one" id="todo-list">
        <div className="project-one-info">
          <p className="project-title">To-Do List</p>
          <ul className="crud">
            <div className="crud-span-top"> An application where you can:</div>
            <li>
              <u>C</u>&nbsp;reate
            </li>
            <li>
              <u>R</u>&nbsp;ead
            </li>
            <li>
              <u>U</u>&nbsp;pdate
            </li>
            <li>
              <u>D</u>&nbsp;elete
            </li>
            <div className="crud-span-bot">your daily chores.</div>
          </ul>
          <div className="project-one-demo-button">Repo</div>
        </div>
        <div className="project-one-img-container">
          <span className="project-one-img-span-one" />
          <span className="project-one-img-span-two" />
          <span className="project-one-img-span-three" />
          <span className="project-one-img-span-four" />
          <div className="project-one-img" onClick={fxnShowOne} />
        </div>
      </div>
    </div>
  );
};

export default ProjectOne;
