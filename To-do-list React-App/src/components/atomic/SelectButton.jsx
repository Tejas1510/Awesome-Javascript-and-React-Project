import Select from 'react-select';
import PropTypes from 'prop-types';

export default function SelectButton({ onChange, options, defaultValue, width }) {
  // styles to close button
  const customStyles = {
    control: (base, state) => ({
      ...base,
      border: '1px solid #611707',
      borderRadius: '5px',
      cursor: 'pointer',
      boxShadow: state.isFocused ? 'none' : 'none',
      '&:hover': {
        borderColor: '#611707',
      },
    }),
    option: (base, state) => ({
      ...base,
      border: 0,
      backgroundColor: state.isFocused ? '#611707' : '#fff',
      cursor: 'pointer',
      color: state.isFocused ? '#fff' : '#611707',
      '&:active': {
        backgroundColor: '#611707',
        color: '#fff',
      },
    }),
    menu: (base) => ({
      ...base,
      border: 0,
      width: width,
      borderRadius: '5px',
      marginTop: '0px',
    }),
    singleValue: (base) => ({
      ...base,
      border: 0,
      color: '#611707',
    }),
  };

  return (
    <>
      <div className={`text-white text-xs font-semibold font-poppins tracking-widest sm:text-base`}>
        <Select
          onChange={onChange}
          defaultValue={defaultValue}
          isSearchable={false}
          options={options}
          styles={customStyles}
        />
      </div>
    </>
  );
}

SelectButton.propTypes = {
  setFilter: PropTypes.func,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  width: PropTypes.string,
  defaultValue: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
};
