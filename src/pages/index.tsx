import Card from '@/components/Card';
import Navigation from '@/components/Navigation';
import Head from 'next/head';
import Link from 'next/link';

async function getServerSideProps() {
  return {
    props: {},
  };
}

export default function Home() {
  const Dashboard = () => (
    <>
      <Navigation />
      <main className='xl:w-[1200px] mx-auto mt-10 p-5'>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl font-bold'>My Posts (0)</h1>
          <Link
            className='bg-zinc-700 text-white font-semibold px-5 py-[5px] rounded hover:bg-zinc-600 hover:shadow-md hover:shadow-zinc-600/30'
            href='/add'
          >
            ADD
          </Link>
        </div>

        <div className='mt-12 flex flex-wrap gap-[2%]'>
          <Card
            createdAt={+new Date()}
            id={'card1'}
            key={'card1'}
            title='Hello World'
          />

          <Card
            createdAt={+new Date()}
            id={'card2'}
            key={'card2'}
            title='Hello World'
          />
          <Card
            createdAt={+new Date()}
            id={'card3'}
            key={'card3'}
            title='Hello World'
          />
        </div>
      </main>
    </>
  );

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Dashboard />
    </>
  );
}
