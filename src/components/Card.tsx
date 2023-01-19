import { PostCard } from '@/types';
import Link from 'next/link';
import React from 'react';

function Card({ createdAt, id, title }: PostCard) {
  return (
    <div className='bg-white p-5 rounded-xl mt-[2%] w-[49%] shadow' id={id}>
      <Link className='font-bold text-2xl w-fit m-0' href='post/1'>
        {title}
      </Link>
      <p className='text-gray-400'>
        {new Date(createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}

export default Card;
