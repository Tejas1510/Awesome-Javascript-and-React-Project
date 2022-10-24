import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

function Todo({ index, todo, checkedOrNot, checkboxhandler, handleEdit, handleDelete }) {
  return (
    <div key={index} className='px-2'>
      <li
        key={todo.id}
        className='bg-white items-center border-b-2 py-0 md:py-2 px-2 md:px-5 flex rounded-lg mb-3 ml-auto mr-auto mt-4'
      >
        <input
          type='checkbox'
          className='h-4 w-4 md:h-7 md:w-7 mt-auto mb-auto mr-2 ml-2 rounded-full text-[#4d3434] focus:ring-[#757575]'
          id={index}
          checked={checkedOrNot(todo)}
          onChange={checkboxhandler}
        />
        <div className='text-[#676767] font-light md:font-bold mr-auto p-2 md:text-sm text-[12px]'>
          {todo.title}
        </div>
        <div className='text-[13.5px] md:text-base cursor-pointer md:space-x-12 space-x-4 justify-items-center flex '>
          <FontAwesomeIcon onClick={() => handleDelete(index)} icon={faTrashCan} />
          <FontAwesomeIcon onClick={() => handleEdit(index)} icon={faPenToSquare} />
        </div>
      </li>
    </div>
  );
}

export default Todo;

Todo.propTypes = {
  index: PropTypes.number,
  todo: PropTypes.object,
  checkedOrNot: PropTypes.func,
  checkboxhandler: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
};
