// reuseable spinner component for all page
import React from 'react';

const Spinner = () => {
  return (
    <>
      <div className='flex justify-center items-center mt-52'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-4 border-gray-900' />
      </div>
    </>
  );
};

export default Spinner;
