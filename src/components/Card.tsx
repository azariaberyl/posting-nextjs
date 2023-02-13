import { auth, db } from '@/libs/firebase';
import { PostCard } from '@/types';
import { ref, remove } from 'firebase/database';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { HTMLAttributes } from 'react';

function Button(props: HTMLAttributes<HTMLButtonElement>) {
  const { className, children, ...att } = props;
  return (
    <button type='button' {...att} className={`px-2 py-1 rounded-md font-medium ${className}`}>
      {children}
    </button>
  );
}
interface Card extends PostCard {
  onCopy: (id: string) => void;
}

function Card({ createdAt, id, title, onCopy }: Card) {
  const onDelete = () => {
    remove(ref(db, `users/${auth.currentUser?.displayName}/${id}`));
    remove(ref(db, `posts/${auth.currentUser?.displayName}/${id}`));
  };

  return (
    <div className='bg-white p-5 rounded-xl mt-[2%] w-[49%] shadow' id={id}>
      <div className='flex justify-between'>
        <Link
          className='font-bold text-2xl w-fit m-0'
          href={`${window.location.origin}/${auth.currentUser?.displayName}/${id}`}
          target='_blank'
        >
          {title}
        </Link>
        <div className='flex justify-end gap-1 pt-1 h-fit'>
          <Button onClick={() => onCopy(id)} className='bg-blue-500 hover:bg-blue-600 text-white'>
            Copy
          </Button>
          <Link
            className='px-2 py-1 rounded-md font-medium bg-gray-500 hover:bg-gray-600 text-white'
            href={`/edit/${id}`}
          >
            Edit
          </Link>
          <Button onClick={onDelete} className='bg-red-500 hover:bg-red-600 text-white'>
            Delete
          </Button>
        </div>
      </div>
      <p className='text-gray-400'>{new Date(createdAt).toLocaleDateString()}</p>
    </div>
  );
}

export default Card;
