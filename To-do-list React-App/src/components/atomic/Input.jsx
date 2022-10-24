import PropTypes from 'prop-types';

export default function Input({
  onChangeHandler,
  onKeyDownHandler,
  value,
  placeholder = 'Add a new task',
}) {
  return (
    <div className='w-full'>
      <input
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        type='text'
        className='p-2 border-2 border-coffeeDark rounded-md w-full my-3'
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
}

Input.propTypes = {
  onChangeHandler: PropTypes.func,
  onKeyDownHandler: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
};
