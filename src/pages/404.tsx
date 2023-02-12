import LoadingContext from '@/contexts/Loading';
import { auth } from '@/libs/firebase';
import { GetServerSideProps, GetStaticProps } from 'next';
import { getURL } from 'next/dist/shared/lib/utils';
import { useRouter } from 'next/router';
import React, { useEffect, useContext } from 'react';

function Custom404() {
  const router = useRouter();
  const { loadingComponent } = useContext(LoadingContext);

  // useEffect(() => {
  //   if (!loadingComponent) {
  //     if (auth.currentUser) {
  //       router.replace('/');
  //     } else {
  //       router.replace('/auth/login');
  //     }
  //   }
  // }, [loadingComponent]);

  return (
    <div className='flex flex-col gap-3 h-screen justify-center items-center'>
      <div>This page doesn't exist</div>
      <button className='bg-zinc-700 hover:bg-zinc-600 p-2 text-white rounded' onClick={() => router.replace('/')}>
        Go back
      </button>
    </div>
  );
}

export default Custom404;
