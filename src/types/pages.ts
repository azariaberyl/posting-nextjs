import { Post } from '.';

interface HomeProps {
  posts: Post[] | null;
}

interface EditProps {
  posts: Post[];
}

export type { HomeProps, EditProps };
