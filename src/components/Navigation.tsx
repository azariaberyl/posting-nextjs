import LoadingContext from '@/contexts/Loading';
import { auth } from '@/libs/firebase';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useState, useEffect, useContext } from 'react';
import { MdPerson } from 'react-icons/md';

function Navigation() {
  const router = useRouter();
  const [username, setUsername] = useState(auth.currentUser?.displayName || '');
  const { loading } = useContext(LoadingContext);

  const onLogout = useCallback(() => {
    signOut(auth).catch((e) => alert(e));
    router.push('./auth/login');
  }, []);

  useEffect(() => {
    setUsername(auth.currentUser?.displayName || '');
  }, [loading]);

  return (
    <nav className='flex justify-between items-center bg-neutral-800 p-4 text-white'>
      <Link href='/' className='font-bold text-xl'>
        Posting NextJS
      </Link>
      <div className='flex gap-3'>
        <div className='font-medium flex gap-3 items-center'>
          <p>{username}</p>
          <button type='button' className='bg-white rounded-full p-1 flex justify-center items-center '>
            <MdPerson className='text-black text-xl' />
          </button>
        </div>

        <button className='font-medium ' onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
