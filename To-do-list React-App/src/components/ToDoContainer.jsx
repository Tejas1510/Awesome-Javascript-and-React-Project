import { useEffect, useState } from 'react';
import Nav from './Nav';
import PopUp from './PopUp';
import DeletionDialog from './DeletionDialog';
import Todo from './Todo';

export default function ToDoContainer() {
  const [popUpvisible, setPopUpvisible] = useState(false);
  const [todoIndex, setTodoIndex] = useState(false);
  const [show, setShow] = useState(false);
  const [editPopUp, setEditPopUp] = useState(null);
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    const initialValue = JSON.parse(savedTodos);
    return initialValue || [];
  });
  // function addTodo(todo) {
  //   setTodos((state) => [...state, todo]);
  // }
  // function deleteTodo(id) {
  //   setTodos((state) => state.filter((t) => t.id !== id));
  // }
  // function editTodo(id, task) {
  //   const newTodos = todos.map((t) => {
  //     if (t.id === id) t.task = task;
  //     return t;
  //   });
  //   setTodos(newTodos);
  // }
  // function toggleCompletion(id) {
  //   const newTodos = todos.map((t) => {
  //     if (t.id === id) t.completed = !t.completed;
  //     return t;
  //   });
  //   setTodos(newTodos);
  // }
  function checkedOrNot(todo) {
    if (todo.status === 'complete') {
      return true;
    } else return false;
  }
  function checkboxhandler(e) {
    const index = e.target.id;
    var newTodos = [...todos];
    newTodos[index].status = `${todos[index].status === 'complete' ? 'incomplete' : 'complete'}`;
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setTodos(newTodos);
  }
  function handleDelete(index) {
    var newTodos = [...todos];
    newTodos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setTodos(newTodos);
    closeDialog();
  }
  function handleEdit(index) {
    setPopUpvisible(!popUpvisible);
    setEditPopUp(todos[index]);
    // console.log(editTodo);
    return;
  }
  function openDialog(index) {
    setTodoIndex(index);
    setShow(!show);
    console.log(index);
  }
  function closeDialog() {
    setShow(!show);
  }
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    if (todos?.length) return;
  }, [todos]);
  const [filter, setFilter] = useState('all');

  const filteredList = todos?.map((todo, index) =>
    todo.status === filter ? (
      <Todo
        key={index}
        index={index}
        todo={todo}
        checkedOrNot={checkedOrNot}
        checkboxhandler={checkboxhandler}
        handleEdit={handleEdit}
        handleDelete={openDialog}
      />
    ) : (
      ''
    ),
  );

  const allList = todos?.map((todo, index) => (
    <Todo
      key={index}
      index={index}
      todo={todo}
      checkedOrNot={checkedOrNot}
      checkboxhandler={checkboxhandler}
      handleEdit={handleEdit}
      handleDelete={openDialog}
    />
  ));
  return (
    <>
      <Nav setTodos={setTodos} setFilter={setFilter} />
      <div className='bg-coffeePrimaryLight py-1 text-center rounded-md md:py-2.5 md:px-2'>
        {!todos?.length ? (
          <span className='text-white font-semibold'>
            You have no tasks. Let&#39;s add a task to get started.
          </span>
        ) : (
          <ul className='text-left'>{filter === 'all' ? allList : filteredList}</ul>
        )}
      </div>
      {popUpvisible && (
        <PopUp
          visible={popUpvisible}
          trigger={setPopUpvisible}
          setTodos={setTodos}
          todos={todos}
          editTodo={editPopUp}
        />
      )}

      <DeletionDialog
        show={show}
        closeDialog={closeDialog}
        handleDelete={handleDelete}
        index={todoIndex}
      />
    </>
  );
}
