import React, { useRef, useState } from 'react';
import './App.css';
import addBtn from './components/addbtn.png'
import tickBtn from './components/tickBtn.png'
import deleteBtn from './components/deleteBtn.png'

let todoTitlesArr = [];

function App() {
  let inputRef = useRef(), inputField = useRef();
  let [todoTitles, setTodoTitles] = useState([]);

  checkLC();

  function checkLC() {
    if (localStorage.getItem("todoTitlesArr") != null) {
      let lcFormatTodos = localStorage.getItem("todoTitlesArr");
      let tempArr = JSON.parse(lcFormatTodos);
      todoTitlesArr = tempArr;
    }
  }
  function TodoBlock(props) {
    function handleClick(e) {
      if (e.target.getAttribute("striked") == "true")
        props.todoTitle.striked = "false";
      else
        props.todoTitle.striked = "true";
      setTodoTitles({ todoTitlesArr });
      localStorage.setItem("todoTitlesArr", JSON.stringify(todoTitlesArr));
    }

    function deleteTodo(that) {
      todoTitlesArr.splice(todoTitlesArr.indexOf(that), 1);
      setTodoTitles({ todoTitlesArr });
      localStorage.setItem("todoTitlesArr", JSON.stringify(todoTitlesArr));
    }

    return (
      <div className="todoBlock">
        <img className="tickBtn" src={tickBtn} />
        <div onClick={handleClick} striked={props.todoTitle.striked} style={{ textDecoration: props.todoTitle.striked == "true" ? "none" : "line-through" }}>{props.todoTitle.text}</div>
        <img className="deleteBtn" src={deleteBtn} onClick={() => { deleteTodo(props.todoTitle) }} />
      </div>
    )
  }

  function addTodo() {
    if (inputRef.current.value.trim() != "" && !todoTitlesArr.includes(inputRef.current.value.trim()))
      todoTitlesArr.push({
        text: inputRef.current.value.trim(),
        striked: "true"
      });
    inputRef.current.value = "";
    localStorage.setItem("todoTitlesArr", JSON.stringify(todoTitlesArr));
    setTodoTitles({ todoTitlesArr });
  }

  return (
    <div className="container">
      <div className="headerBand"></div>
      <div className="header">2Do</div>
      <div ref={inputField} className="inputField">
        <input ref={inputRef} type="text" placeholder="Add Todo..." onKeyPress={e => {
          if (e.key == "Enter") addTodo();
        }} />
        <img src={addBtn} onClick={addTodo} />
      </div>
      <div className="todoContainer">
        {
          todoTitlesArr.map(todoTitleText => {
            return (
              <TodoBlock todoTitle={todoTitleText} />
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
