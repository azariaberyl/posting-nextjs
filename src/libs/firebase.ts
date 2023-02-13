// Import the functions you need from the SDKs you need
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, remove, set, update } from 'firebase/database';
import { Post } from '@/types';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASURMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getDatabase();

export function writePost(post: any) {
  const username = auth.currentUser?.displayName;
  const refdb = ref(db, `users/${username}`);

  const newRefPost = push(refdb);
  const postVal: Post = { ...post, id: newRefPost.key, author: username };
  const refPost = ref(db, `posts/${username}/${newRefPost.key}`);

  set(newRefPost, postVal);
  set(refPost, true);
}

export function delPost(id: string) {
  const user = auth.currentUser?.email;

  const refPost = ref(db, `posts/${id}`);
  const refUser = ref(db, `users/${user}/${id}`);

  remove(refPost);
  remove(refUser);
}

export function createUserData(email: string, username: string, password: string) {
  console.log(password);
  const refUser = ref(db, `userData/${username}`);

  set(refUser, { username, email, password });
}

export function updatePost(post: Post) {
  const updates: any = {};
  updates[`/users/${post.author}/${post.id}`] = post;

  return update(ref(db), updates);
}

export default app;
