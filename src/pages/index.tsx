import Card from '@/components/Card';
import Navigation from '@/components/Navigation';
import Head from 'next/head';
import Link from 'next/link';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import React, { useContext, useEffect, useState, useCallback, useRef } from 'react';
import { auth, db } from '@/libs/firebase';
import LoadingContext from '@/contexts/Loading';
import Empty from '@/components/Empty';
import { child, get, onValue, ref } from 'firebase/database';
import { Post } from '@/types';
import { GetServerSideProps } from 'next';
import Toast from '@/components/Toast';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const username = JSON.parse(req.cookies._UserAccess || '{"username": "user"}').username;
  if (username !== 'user') {
    try {
      const data = await get(child(ref(db), `users/${username}`));
      if (data.exists()) {
        return {
          props: { data: Object.values(data.val()), username },
        };
      } else {
        console.log('No data available');
        return { props: { data: [], username } };
      }
    } catch (e) {
      console.log(e);
      return { props: { data: null, username: username } };
    }
  }
  return { props: { data: null, username: '' } };
};

export default function Home({ data, username, posts }: any) {
  const { loading } = useContext(LoadingContext);

  const [post, setPost] = useState<Post[] | null>(data);
  const [toastMessage, setToastMessage] = useState('');
  const timeoutId = useRef<NodeJS.Timeout>();

  const onCopy = useCallback((id: string) => {
    clearTimeout(timeoutId.current);
    const url = `${window.location.origin}/${auth.currentUser?.displayName}/${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setToastMessage(`Copied ${url}`);
      const timeout = setTimeout(() => setToastMessage(''), 2000);
      timeoutId.current = timeout;
    });
  }, []);

  const Skeleton = useCallback(
    () => (
      <>
        <div className='w-[49%] rounded-lg mt-[2%] h-28 bg-gray-300'></div>
        <div className='w-[49%] rounded-lg mt-[2%] h-28 bg-gray-300'></div>
      </>
    ),
    []
  );

  const Dashboard = () => (
    <>
      <Navigation name={username} />
      <main className='xl:w-[1200px] mx-auto mt-10 p-5'>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl font-bold'>My Posts {post?.length}</h1>
          <Link
            className='bg-zinc-700 text-white font-semibold px-5 py-[5px] rounded hover:bg-zinc-600 hover:shadow-md hover:shadow-zinc-600/30'
            href='/add'
          >
            ADD
          </Link>
        </div>

        <div className='mt-12 flex flex-wrap gap-[2%]'>
          {post === null ? (
            <Skeleton />
          ) : post.length > 0 ? (
            post.map((val) => (
              <Card key={val.id} createdAt={val.createdAt} id={val.id} title={val.title} onCopy={onCopy} />
            ))
          ) : (
            <Empty className='h-[40vh] text-4xl' />
          )}
        </div>
      </main>
    </>
  );

  useEffect(() => {
    if (auth.currentUser) {
      const unsubs = onValue(ref(db, `users/${auth.currentUser?.displayName}`), (snapshot) => {
        const data = snapshot.val() || {};
        setPost(Object.values(data));
      });
      return () => unsubs();
    }
  }, [loading]);

  return (
    <>
      <Head>
        <title>Posting Nextjs</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Dashboard />
      {toastMessage && <Toast message={toastMessage} />}
    </>
  );
}
