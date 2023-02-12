import Loading from '@/components/Loading';
import { LoadingProvider } from '@/contexts/Loading';
import { UserPostsProvider } from '@/contexts/UserPosts';
import { getUsernameCookie, removeUserCookie, removeUsernameCookie, setUserCookie, setUsernameCookie } from '@/libs';
import { auth } from '@/libs/firebase';
import '@/styles/globals.css';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import type { AppProps } from 'next/app';
import React, { useEffect, useState, useMemo } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [loadingComponent, setLoadingComponent] = useState(true);
  const [loading, setLoading] = useState(true);

  const loadingVal = useMemo(
    () => ({
      loadingComponent,
      loading,
    }),
    [loading]
  );

  const userPostsValue = useMemo(() => [], []);

  useEffect(() => {
    const username = getUsernameCookie();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(true);
      if (user) {
        if (username && auth.currentUser) updateProfile(auth.currentUser, { displayName: username });
        setUserCookie({ id: user.uid, username: user.displayName });
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
      } else {
        removeUserCookie();
        // User is signed out
        // ...
        removeUsernameCookie();
      }
      // console.log(auth.currentUser);
      setLoading(false);
    });

    setLoadingComponent(false);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    return () => {};
  }, [auth.currentUser?.email]);

  if (loadingComponent) return <Loading />;

  return (
    <LoadingProvider value={loadingVal}>
      <UserPostsProvider value={[]}>
        <div className='overflow-auto'>
          <Component posts={{ test: 'test' }} {...pageProps} />
        </div>
      </UserPostsProvider>
    </LoadingProvider>
  );
}
