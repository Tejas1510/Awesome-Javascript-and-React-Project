import PropTypes from 'prop-types';

export default function Button({ className, title, isColorFlipped, clickHandler = () => {} }) {
  return (
    <div>
      <button
        onClick={clickHandler}
        className={` ${className} cursor-pointer px-[6px] py-1 border font-poppins  border-coffeeDark rounded-md text-base font-semibold tracking-wide ${
          isColorFlipped ? `bg-white text-coffeeDark` : `bg-coffeeDark text-white`
        }   hover:-translate-y-1 hover:shadow-md transition-all duration-300 ease-in hover:shadow-coffeeDark/40`}
      >
        {title}
      </button>
    </div>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  isColorFlipped: PropTypes.bool,
  clickHandler: PropTypes.func,
};
