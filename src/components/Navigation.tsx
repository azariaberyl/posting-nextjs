import Link from 'next/link';
import React from 'react';
import { MdPerson } from 'react-icons/md';

function Navigation() {
  return (
    <nav className='flex justify-between items-center bg-neutral-800 p-4 text-white'>
      <Link href='/' className='font-bold text-xl'>
        Posting NextJS
      </Link>
      <div>
        <div className='font-medium flex gap-3 items-center'>
          <p>Username</p>
          <button
            type='button'
            className='bg-white rounded-full p-1 flex justify-center items-center '
          >
            <MdPerson className='text-black text-xl' />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
