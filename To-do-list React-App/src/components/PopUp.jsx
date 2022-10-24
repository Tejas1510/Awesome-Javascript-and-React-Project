import PropTypes from 'prop-types';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SelectButton from './atomic/SelectButton';
import Input from './atomic/Input';
import Button from './atomic/Button';
import multiply from '../assets/multiply.svg';

const options = [
  { value: 'complete', label: 'Complete' },
  { value: 'incomplete', label: 'Incomplete' },
];
export default function PopUp({ trigger, todos, setTodos, visible, editTodo }) {
  const [status, setStatus] = useState(editTodo ? editTodo.status : 'incomplete');
  const [currentTask, setCurrentTask] = useState(editTodo ? editTodo.title : '');
  const [description, setDescription] = useState(editTodo ? editTodo.description : '');
  const [showFields, setShowFields] = useState(false);
  const [error, setError] = useState(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (editTodo) return editTask(e);
      else return addTask(e);
    }
  };

  const handleInputChange = (e) => {
    setCurrentTask(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleClosePupUp = () => {
    setError(null);
    trigger(false);
  };

  const defaultState = () => {
    setCurrentTask('');
    setDescription('');
    setError(null);
    trigger(false);
  };

  const editTask = (e) => {
    e.preventDefault();
    if (currentTask === '') setError('Please enter the title!');
    else {
      const newTodo = {
        title: currentTask,
        description,
        status: status.value ? status.value : status,
        id: uuid(),
      };
      var newTodos = [...todos];
      const editTodoIndex = todos.findIndex((obj) => obj.id === editTodo.id);
      newTodos[editTodoIndex] = newTodo;
      setTodos(newTodos);
      defaultState();
    }
  };

  const addTask = (e) => {
    e.preventDefault();
    if (currentTask === '') setError('Please enter the title!');
    else if(currentTask.trim().length == 0) setError('Please enter a non empty title!');
    else {
      const newTodo = {
        title: currentTask,
        description,
        status: status.value ? status.value : status,
        id: uuid(),
      };
      setTodos((state) => [...state, newTodo]);
      defaultState();
    }
  };

  return (
    <div
      style={{ zIndex: 9 }}
      className={`${
        visible ? `scale-100` : `scale-0`
      } flex absolute inset-0 w-full h-full bg-black/50 flex-col justify-center items-center z-[9999]`}
    >
      <div className={'w-4/5 max-w-sm'}>
        <div className='w-[10%] bg-coffeePrimaryLight mb-2 flex justify-center ml-auto cursor-pointer'>
          <img onClick={handleClosePupUp} src={multiply} alt='Close' />
        </div>
        <div className='bg-coffeePrimaryLight rounded-md p-8 px-6 md:px-9'>
          <h2 className='font-extrabold text-lg mb-2'>{editTodo ? 'Edit Task' : 'Add Task'}</h2>

          {error && (
            <div
              id='alert-border-2'
              className='flex p-4 mb-4 bg-red-100 border-t-4 border-red-500 dark:bg-red-200'
              role='alert'
            >
              <svg
                className='flex-shrink-0 w-5 h-5 text-red-700'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                  clipRule='evenodd'
                ></path>
              </svg>

              <div className='ml-3 text-sm font-medium text-red-700'>{error}</div>

              <button
                type='button'
                className='ml-auto -mx-1.5 -my-1.5 bg-red-100 dark:bg-red-200 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 dark:hover:bg-red-300 inline-flex h-8 w-8'
                data-dismiss-target='#alert-border-2'
                aria-label='Close'
                onClick={() => setError(null)}
              >
                <span className='sr-only'>Dismiss</span>
                <img src={multiply}></img>
              </button>
            </div>
          )}

          <div className='flex flex-col pb-8'>
            <label htmlFor=''>Title</label>

            <Input
              class='text-3xl'
              onChangeHandler={handleInputChange}
              onKeyDownHandler={handleKeyDown}
              value={currentTask}
            />

            {/* Any additional field can be hidden initially by nesting it here */}
            {showFields && (
              <>
                <label>Description</label>
                <textarea
                  placeholder='Add text description'
                  className='p-2 border-2 border-coffeeDark rounded-md w-full my-3'
                  onChange={handleDescriptionChange}
                >
                  {description}
                </textarea>
              </>
            )}

            <FontAwesomeIcon
              cursor='pointer'
              title={`${showFields ? 'collapse' : 'expand'} fields`}
              className='self-end w-fit relative -top-2.5 text-coffeeDark'
              alignmentBaseline='after-edge'
              onClick={() => setShowFields(!showFields)}
              icon={showFields ? faCaretUp : faCaretDown}
            />

            <label htmlFor=''>Status</label>
            <SelectButton
              width='100%'
              onChange={(newValue) => setStatus(newValue)}
              options={options}
              defaultValue={
                editTodo ? { value: editTodo.status, label: editTodo.status } : options[1]
              }
            />
          </div>
          {/* COnditionally render relavent buttons */}
          {editTodo ? (
            <div className='flex justify-between md:justify-start mt-2'>
              <Button clickHandler={editTask} title={'Edit Task'} className='md:mr-9' />
              <Button clickHandler={handleClosePupUp} title={'Cancel'} isColorFlipped={true} />
            </div>
          ) : (
            <div className='flex justify-between md:justify-start mt-2'>
              <Button clickHandler={addTask} title={'Add Task'} className='md:mr-9' />
              <Button clickHandler={handleClosePupUp} title={'Cancel'} isColorFlipped={true} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

PopUp.propTypes = {
  trigger: PropTypes.func,
  visible: PropTypes.bool,
  setTodos: PropTypes.func,
  editTodo: PropTypes.object,
  todos: PropTypes.array,
};
