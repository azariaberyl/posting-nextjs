import React from 'react';

function Loading() {
  return (
    <div className='absolute w-full h-full bg-white z-10 flex justify-center items-center'>
      <div className='spinner' />
    </div>
  );
}

export default Loading;
