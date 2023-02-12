import { Post } from '@/types';
import { createContext } from 'react';

const UserPostsContext = createContext<Post[] | null>(null);

export const UserPostsProvider = UserPostsContext.Provider;

export default UserPostsContext;
