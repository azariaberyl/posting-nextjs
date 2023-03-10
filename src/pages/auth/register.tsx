import { auth, createUserData, db } from '@/libs/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { child, get, ref } from 'firebase/database';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FormEvent, useRef, useState, useEffect } from 'react';

function register() {
  const router = useRouter();

  const [usernames, setUsernames] = useState<string[]>([]);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const username = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string>('');
  const ErrorComp = () => <p className='bg-red-400 rounded p-2 font-medium text-white'>{error}</p>;

  const handleRegister = (email: string, password: string, username: string, onSucces?: () => void) => {
    const isUsername = usernames.some((val) => username === val);
    if (isUsername) {
      setError('Username already exists');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(user, { displayName: username });
        createUserData(email, username, password);
        if (onSucces) onSucces();
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const emailVal = email.current?.value;
    const usernameVal = username.current?.value;
    const passwordVal = password.current?.value;
    if (emailVal && passwordVal && usernameVal) {
      handleRegister(emailVal, passwordVal, usernameVal, () => router.reload());
    }
    return;
  };

  useEffect(() => {
    const getUsernames = async () => setUsernames(Object.keys((await get(child(ref(db), 'userData'))).val() || {}));
    getUsernames();
  }, []);

  return (
    <>
      <Head>
        <title>Register - PostingNext</title>
      </Head>
      <main className='box-border mt-[5%] mb-2'>
        <div className='bg-white w-fit px-10 py-5 shadow-md mx-auto rounded-lg'>
          <h1 className='text-center my-5 text-4xl font-bold hover:drop-shadow-md'>Create an account</h1>

          <form onSubmit={onSubmit} className='flex gap-5 flex-col mx-auto mt-5 rounded w-96'>
            {error && <ErrorComp />}
            <div className='flex flex-col w-full gap-1'>
              <label className='text-lg' htmlFor='email'>
                Email
              </label>
              <input
                id='email'
                className='border p-2 focus:border-black rounded outline-1 focus:outline-1 w-full text-lg'
                type='email'
                required
                ref={email}
                placeholder='Enter email'
              />
            </div>

            <div className='flex flex-col w-full gap-1'>
              <label className='text-lg' htmlFor='password'>
                Username
              </label>
              <input
                id='username'
                className='border p-2 focus:border-black rounded outline-1 focus:outline-1 w-full text-lg'
                type='text'
                ref={username}
                required
                placeholder='Enter email'
              />
            </div>

            <div className='flex flex-col w-full gap-1'>
              <label className='text-lg' htmlFor='password'>
                Password
              </label>
              <input
                id='password'
                className='border p-2 focus:border-black rounded outline-1 focus:outline-1 w-full text-lg'
                type='password'
                ref={password}
                required
                placeholder='Enter email'
              />
            </div>

            <button
              className='bg-zinc-700 text-white font-semibold px-10 py-2 rounded-lg w-96 hover:bg-zinc-600 hover:shadow-md hover:shadow-zinc-600/30 my-2'
              type='submit'
            >
              Create
            </button>
          </form>

          <div className='flex justify-center mb-5 mt-12'>
            <p className='text-gray-500'>
              Already have an account?{' '}
              <Link className='font-semibold text-blue-700' href='/auth/login'>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default register;
