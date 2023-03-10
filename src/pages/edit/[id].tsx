import Loading from '@/components/Loading';
import Navigation from '@/components/Navigation';
import { auth, updatePost } from '@/libs/firebase';
import { EditProps } from '@/types/pages';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useMemo, useRef } from 'react';
import { DefaultEditor } from 'react-simple-wysiwyg';

function Edit({ posts }: EditProps) {
  if (posts == null) return <Loading />;
  const router = useRouter();
  const { id } = router.query;
  const post = useMemo(() => posts.filter((val) => val.id === id), [])[0];

  if (post == undefined) {
    return (
      <>
        <Navigation />
        <main className='xl:w-[1200px] mx-auto mt-4 p-5'>
          <div>Not found</div>
        </main>
      </>
    );
  }
  if ((post.author as string) !== auth.currentUser?.displayName) {
    return (
      <>
        <Navigation />
        <main className='xl:w-[1200px] mx-auto mt-4 p-5'>
          <div>Not found</div>
        </main>
      </>
    );
  }

  const title = useRef<HTMLInputElement>(null);
  const [html, setHtml] = React.useState(post.description);

  function onChange(e: any) {
    setHtml(e.target.value);
  }

  const onAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const titleVal = title.current?.value;
    const descVal = html;

    if (titleVal && descVal) {
      updatePost({ ...post, title: titleVal, description: descVal }).then(() => router.push('/'));
    }
  };

  return (
    <>
      <Head>
        <title>Edit</title>
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
            defaultValue={post.title}
          />
          <DefaultEditor style={{ background: 'white' }} className='bg-white' value={html} onChange={onChange} />
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

export default Edit;
