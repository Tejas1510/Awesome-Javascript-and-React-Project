import React from 'react';
import PropTypes from 'prop-types';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import multiply from '../assets/multiply.svg';
import Button from './atomic/Button';

export default function DeletionDialog({ show, closeDialog, handleDelete, index }) {
  return (
    <div
      style={{ zIndex: 9 }}
      className={`${
        show ? `scale-100` : `scale-0`
      } flex absolute inset-0 w-full h-full bg-black/50 flex-col justify-center items-center z-[9999]`}
    >
      <div className={'w-4/5 max-w-sm'}>
        <div className='w-[10%] bg-coffeePrimaryLight mb-2 flex justify-center ml-auto cursor-pointer'>
          <img onClick={closeDialog} src={multiply} alt='Close' />
        </div>
        <div className='bg-coffeePrimaryLight rounded-md p-8 px-6 md:px-9'>
          <div className='flex flex-col pb-8'>
            <FontAwesomeIcon className='pb-6 text-coffeeDark' icon={faTrash} size='3x' />
            <p className='text-center text-lg'>Are you sure you want to delete this task?</p>
          </div>

          <div className='flex justify-center md:justify-center mt-2'>
            <Button clickHandler={() => handleDelete(index)} title={'Delete'} className='mr-9' />
            <Button clickHandler={closeDialog} title={'Cancel'} isColorFlipped={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

DeletionDialog.PropTypes = {
  show: PropTypes.bool,
  handleDelete: PropTypes.func,
  index: PropTypes.number,
  closeDialog: PropTypes.func,
};
