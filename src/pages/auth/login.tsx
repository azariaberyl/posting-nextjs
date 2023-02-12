import { auth } from '@/libs/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FormEvent, useRef, useCallback, useState } from 'react';

function Login() {
  const router = useRouter();

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string>('');
  const ErrorComp = () => <p className='bg-red-400 rounded p-2 font-medium text-white w-fit'>{error}</p>;

  const handleLogin = useCallback((email: string, password: string, onSucces?: () => {}) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (onSucces) onSucces();
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  }, []);

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailVal = email.current?.value;
    const passwordVal = password.current?.value;
    setError('');
    if (emailVal && passwordVal) {
      handleLogin(emailVal, passwordVal, () => router.push('/'));
      return;
    }
  }, []);

  return (
    <>
      <Head>
        <title>Login - PostingNext</title>
      </Head>
      <main className='box-border mt-[5%] mb-2'>
        <div className='bg-white w-fit px-10 py-5 shadow-md mx-auto rounded-lg'>
          <h1 className='text-center my-5 text-4xl font-bold hover:drop-shadow-md'>Posting NextJS</h1>

          <form onSubmit={onSubmit} className='flex gap-5 flex-col mx-auto mt-5 rounded w-96'>
            <div className='flex flex-col w-full gap-1'>
              {error && <ErrorComp />}
              <label className='text-lg' htmlFor='email'>
                Email
              </label>
              <input
                id='email'
                className='border p-2 focus:border-black rounded outline-1 focus:outline-1 w-full text-lg'
                type='email'
                required
                ref={email}
                placeholder='Email'
              />
            </div>

            <div className='flex flex-col w-full gap-1'>
              <label className='text-lg' htmlFor='password'>
                Password
              </label>
              <input
                id='password'
                ref={password}
                className='border p-2 focus:border-black rounded outline-1 focus:outline-1 w-full text-lg'
                required
                type='password'
                placeholder='Password'
              />
            </div>

            <button
              className='bg-zinc-700 text-white font-semibold px-10 py-2 rounded-lg w-96 hover:bg-zinc-600 hover:shadow-md hover:shadow-zinc-600/30 my-2'
              type='submit'
            >
              Sign In
            </button>
          </form>

          <div className='flex justify-center mb-5 mt-12'>
            <p className='text-gray-500'>
              Don't have account yet?{' '}
              <Link className='font-semibold text-blue-700' href='/auth/register'>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;
