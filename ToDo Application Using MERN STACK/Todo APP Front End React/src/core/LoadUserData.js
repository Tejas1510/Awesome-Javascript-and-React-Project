import React, { Component, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import {
  getAllTask,
  getAllCategories,
  createTodo,
  deleteTodo,
  updateStatus,
} from "./coreapicalls";
import { isAutheticated } from "../Auth/apicall";
import { format } from "morgan";
import EditTodo from "./edit";
import { Redirect, Link } from "react-router-dom";
import $ from 'jquery';
function LoadUserData() {
  const { user, token } = isAutheticated();

  //state variable for todo
  const [values, setValues] = useState({
    title: "",
    description: "",
    category: "",
    status: "",
    due: "",
    error: "",
    success: false,
  });

  const { title, description, category, status, due } = values;

  //state for getting todo and category
  const [task, setTask] = useState([]);
  const [categories, setCategories] = useState([]);

  //handling input of todo
  const handleChange = (name) => (event) => {
    let value = event.target.value;
    setValues({ ...values, [name]: value });
  };
  //handling submitt todo
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(title, description, category, status, due);
    createTodo(token, user, values)
      .then((data) => {
        console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            title: "",
            description: "",
            category: "",
            status: "",
            due: "",
            success: true,
          });

          alert("new todo created");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

 
  //loading all the required data in page
  const preload = () => {
    const { user, token } = isAutheticated();
    console.log(token);
    getAllTask(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setTask(data);
        console.log(data);
      }
    });
    getAllCategories()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setCategories(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    preload();
  }, []);

  //load the profile
  const profile = () => {
    const { user } = isAutheticated();
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">{user.name}</h4>
        <ul className="list-group">
          <li className="list-group-item">{user.email}</li>
          <li className="list-group-item">
            <ul className="list-group">
              <li className="list-group-item">
                <button
                  type="button"
                  className="btn btn-warning"
                  data-toggle="modal"
                  data-target="#createTodo"
                >
                  <i className="fa fa-plus">New Task</i>
                </button>
              </li>
              
            </ul>
          </li>
        </ul>
      </div>
    );
  };

  //content for mobile
  const mobileScreenData = () => {
    return (
      <div className="row" id="content-mobile">
        <p className="mt-3 px-4">
          <div
            class="btn-group"
            id="content-mobile"
            role="group"
            aria-label="Basic example"
          >
            <button
              type="button"
              className="btn btn-secondary"
              data-toggle="modal"
              data-target="#createTodo"
            >
              <i className="fa fa-plus">New Task</i>
            </button>
          </div>
        </p>

        {task.map((task, index) => {
          return (
            <div className="d-flex justify-content-start px-4">
              <div className="card" style={{ width: "15rem" }} key={index}>
                <div className="card-body">
                  <h5
                    style={{ color: "red", fontSize: "10px" }}
                    className="card-title"
                  >
                    {task.title}
                  </h5>
                  <h6
                    style={{ color: "blue", fontSize: "10px" }}
                    className="card-subtitle mb-2 "
                  >
                    {task.category}
                  </h6>
                  <p className="card-text" style={{ fontSize: "10px" }}>
                    {task.description}
                  </p>
                  <span
                    href="#"
                    style={{ color: "green", fontSize: "10px" }}
                    className="card-link"
                  >
                    {"Status:" + task.status}
                  </span>
                  <p style={{ color: "orange" }} className="card-text">
                    {task.due === undefined
                      ? "Deadline:N/A"
                      : "Deadline:" + task.due}
                  </p>
                  <button type="button" className="btn btn-primary btn-sm">
                    View
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  //content fro desktop
  const desktopScreenData = () => {
    return (
      <div className="row" id="content-desktop">
        {task.map((task, index) => {
          return (
            <div className="d-flex flex-row-reverse ">
              {/* model */}
              <div className="card" style={{ width: "20rem" }} key={index}>
                <div className="card-body">
                  <h5 style={{ color: "red" }} className="card-title">
                    {task.title}
                  </h5>
                  <h6 style={{ color: "blue" }} className="card-subtitle mb-2 ">
                    {task.category}
                  </h6>
                  <p className="card-text">{task.description}</p>
                  <span
                    href="#"
                    style={{ color: "green" }}
                    className="card-link"
                  >
                    {"Status:" + task.status}
                  </span>
                  <p style={{ color: "orange" }} className="card-text">
                    {task.due === undefined
                      ? "Deadline:N/A"
                      : "Deadline:" + task.due}
                  </p>

                  <button
                    type="button"
                    // data-toggle="modal"
                    // data-target="#updateTodo"
                    className="btn btn-outline-dark"
            
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      deleteTodo(task._id, user._id, token).then((data) => {
                        console.log(data);
                        alert("deleted");
                      });
                      window.location.reload();
                    }}
                    className="btn btn-outline-dark"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      updateStatus(task._id, "Completed", user._id, token).then(
                        (data) => {
                          console.log(data);
                          alert("Marked As Completed");
                        }
                      );
                      window.location.reload();
                    }}
                    className="btn btn-outline-dark"
                  >
                    MarkDone
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // function loadUpdateModel(index, ti, desc, todoid) {
  //   $("#updateTodo").modal()
  // }

  //load category
  const loadTodoForm = () => {
    let arr = [
      "btn btn-primary",
      "btn btn-warning",
      "btn btn-danger",
      "btn btn-warning",
      "btn btn-info",
      "btn btn-dark",
      "btn btn-success",
      "btn btn-light",
    ];
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="title"
            name="title"
            onChange={handleChange("title")}
            value={title}
          />
          <textarea
            className="form-control"
            rows="2"
            cols="10"
            placeholder="describe"
            name="description"
            onChange={handleChange("description")}
            value={description}
          />
        </div>

        <div className="form-group">
          <label className="text-dark">category</label>
          <br />
          {categories.map((category, index) => {
            return (
              <label className={arr[index]} key={index}>
                <input
                  type="radio"
                  name="category"
                  value={category.name}
                  onChange={handleChange("category")}
                />
                {category.name}
              </label>
            );
          })}
        </div>
        <div className="form-group">
          <label className="text-dark">Set Status</label>
          <br />
          <label className="btn btn-success">
            <input
              type="radio"
              value="Completed"
              name="status"
              onChange={handleChange("status")}
            />
            Completed
          </label>
          <label className="btn btn-danger">
            <input
              type="radio"
              name="status"
              value="InProgress"
              onChange={handleChange("status")}
            />
            InProgress
          </label>
          <label className="btn btn-warning">
            <input
              type="radio"
              name="status"
              value="Assigned"
              onChange={handleChange("status")}
            />
            New Assigned
          </label>
          <label>
            <input
              type="date"
              value={due}
              name="due"
              className="form-control"
              onChange={handleChange("due")}
            />
            Deadline
          </label>
        </div>

        <button type="button" className="btn btn-danger" data-dismiss="modal">
          Cancel
        </button>
        <input type="reset" className="btn btn-secondary" />
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    );
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-3" id="content-desktop">
          {profile()}
        </div>
        <div className="col-md-9">
          {desktopScreenData()}
          {mobileScreenData()}
        </div>
      </div>
      {/* create modals */}
      <div
        className="modal fade"
        id="createTodo"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Add Todo
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{loadTodoForm()}</div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
      {/* // update todo modal */}
      {/* <div
        className="modal fade"
        id="updateTodo"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                 Add Todo
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <EditTodo
                index=""
                title=""              
                description=""
                todoId=""
              ></EditTodo>
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div> */}
 
    </div>
  );
}

export default LoadUserData;
