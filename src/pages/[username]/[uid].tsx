import { db } from '@/libs/firebase';
import { child, get, ref } from 'firebase/database';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';

export async function getStaticPaths() {
  const paths: any[] = [];
  await get(child(ref(db), `posts`)).then((snapshot) => {
    const value = snapshot.val();
    const path = Object.keys(value).forEach((key) => {
      Object.keys(value[key]).forEach((id) => paths.push({ params: { username: key, uid: id } }));
    });
  });
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = params?.username;
  const uid = params?.uid;
  const data = await (await get(child(ref(db), `users/${username}/${uid}`))).val();
  return {
    props: { message: data }, // will be passed to the page component as props
  };
};

function UserPost({ message }: any) {
  const { title, createdAt, description, author } = message;
  console.log(description);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className='xl:w-[1000px] mx-auto my-10 p-5 rounded-lg shadow-sm bg-white min-h-[79vh]'>
        <h1 className='font-bold text-4xl'>{title}</h1>
        <p className='text-gray-400 text-sm my-1'>
          {new Date(createdAt).toLocaleString()} by {author}
        </p>
        <div className='text-lg' dangerouslySetInnerHTML={{ __html: description }}></div>
      </main>
    </>
  );
}

export default UserPost;
