import Navigation from '@/components/Navigation';
import { writePost } from '@/libs/firebase';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { DefaultEditor } from 'react-simple-wysiwyg';

function Add() {
  const title = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [html, setHtml] = React.useState('my <b>HTML</b>');

  function onChange(e: any) {
    setHtml(e.target.value);
  }

  const onAdd = (e: React.FormEvent) => {
    e.preventDefault();

    const titleVal = title.current?.value || '';
    const descVal = html;
    writePost({
      title: titleVal,
      description: descVal,
      createdAt: +new Date(),
    });
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Add Post</title>
      </Head>
      <Navigation />
      <main className='xl:w-[1200px] mx-auto mt-4 p-5'>
        <form onSubmit={onAdd} className='flex flex-col gap-3 '>
          <label htmlFor='title' className='text-3xl font-bold'>
            Title
          </label>
          <input
            required
            ref={title}
            className='border p-2'
            id='title'
            type='text'
            placeholder='Put your title in here'
          />
          <DefaultEditor style={{ background: 'white' }} value={html} onChange={onChange} />
          <div className='flex justify-end mt-2'>
            <button className='bg-zinc-700 text-white font-semibold px-6 py-[7px] rounded hover:bg-zinc-600 hover:shadow-md hover:shadow-zinc-600/30 w-fit'>
              Save
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

export default Add;
