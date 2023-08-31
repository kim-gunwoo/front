import { css } from '@emotion/react';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Head from 'next/head';
import { NextPageWithLayout } from './_app';

interface IProps {
  title: string;
}

const HelloPage: NextPageWithLayout<IProps> = ({ title }) => {
  const queryHello = useQuery(['hello'], getHello);
  const queryHello2 = useQuery(['hello2'], getHello);

  console.log('render Hello !! ', queryHello.data, queryHello2.data);

  return (
    <div>
      <Head>
        <title>{`My ${title} PAGE`}</title>
      </Head>
      TestPage
    </div>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      css={css`
        background: blue;
      `}
    >
      layout!!
      {children}
    </div>
  );
};

HelloPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

const getHello = async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/api/hello');
    return data;
  } catch (error) {
    throw error;
  }
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['hello'], getHello);

  return {
    props: {
      title: 'hello page 🚀',
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default HelloPage;
