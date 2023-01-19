import Navigation from '@/components/Navigation';
import { Post } from '@/types';
import Head from 'next/head';
import React from 'react';

export async function getStaticProps() {
  const post: Post = {
    createdAt: 1674083605180,
    description: 'This is hello world description',
    id: 'post1',
    title: 'Hello World',
  };
  return {
    // Passed to the page component as props
    props: { post },
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: false, // can also be true or 'blocking'
  };
}

function Id({ post }: { post: Post }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Navigation />
      <main className='xl:w-[1200px] bg-white rounded-lg shadow-sm mx-auto mt-10 p-5'>
        <h1>{post.title}</h1>
        <p>{new Date(post.createdAt).toLocaleDateString()}</p>
        <p>{post.description}</p>
      </main>
    </>
  );
}

export default Id;
