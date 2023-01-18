import React from 'react';

function Navigation() {
  return (
    <nav className='flex justify-between items-center bg-neutral-800 p-4 text-white'>
      <div className='font-bold text-xl'>Posting NextJS</div>
      <div>
        <div className='font-medium flex gap-3'>
          <img src='' alt='' />
          <p>Username</p>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
