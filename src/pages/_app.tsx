import Loading from '@/components/Loading';
import { LoadingProvider } from '@/contexts/Loading';
import { removeUserCookie, setUserCookie } from '@/libs';
import { auth, db } from '@/libs/firebase';
import '@/styles/globals.css';
import { Post } from '@/types';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';
import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import React, { useEffect, useState, useMemo } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [loadingComponent, setLoadingComponent] = useState(true);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[] | null>(null);

  const loadingVal = useMemo(
    () => ({
      loadingComponent,
      loading,
    }),
    [loading]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(true);

      if (user) {
        //Login
        setUserCookie({ id: user.uid, username: user.displayName });
      } else {
        // User is signed out
        removeUserCookie();
      }

      setLoading(false);
    });

    setLoadingComponent(false);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (auth.currentUser) {
      const unsubs = onValue(ref(db, `users/${auth.currentUser?.displayName}`), (snapshot) => {
        setLoading(true);
        const data = (snapshot.val() as Post[]) || [];
        setPosts(Object.values(data));
        setLoading(false);
      });
      return () => unsubs();
    }
  }, [auth.currentUser]);

  if (loadingComponent) return <Loading />;

  return (
    <LoadingProvider value={loadingVal}>
      <div className='overflow-auto'>
        <Component posts={posts} {...pageProps} />
      </div>
    </LoadingProvider>
  );
}
