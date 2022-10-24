import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from './atomic/Button';
import SelectButton from './atomic/SelectButton';
import PopUp from './PopUp';

const options = [
  { value: 'all', label: 'All' },
  { value: 'complete', label: 'Complete' },
  { value: 'incomplete', label: 'Incomplete' },
];
export default function Nav({ setTodos, setFilter }) {
  const [popUpvisible, setPopUpvisible] = useState(false);

  const handlePopUpOpen = () => {
    setPopUpvisible(true);
  };

  return (
    <div className='flex justify-between py-2.5 border-b-2 border-coffeeDark'>
      <PopUp visible={popUpvisible} trigger={setPopUpvisible} setTodos={setTodos} />

      <div className='w-[100%] flex justify-between align-middle'>
        <Button
          clickHandler={handlePopUpOpen}
          className='mt-[2px] mr-3 text-[8px] sm:text-[10px] lg:text-[16px]'
          title='Add Task'
        />
        <SelectButton
          className='w-[90px] sm:w-[155px]'
          options={options}
          setFilter={setFilter}
          defaultValue={{ value: 'all', label: 'All' }}
          onChange={(newValue) => setFilter(newValue.value)}
          width='150px'
        />
      </div>
    </div>
  );
}

Nav.propTypes = {
  setTodos: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
};
