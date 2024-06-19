import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '~/components/layout'
import { NextPageWithLayout } from '~/pages/_app'


const Page: NextPageWithLayout = () => {
  const queryHello = useQuery(["hello"],getHello);
  const queryHello2 = useQuery(["hello2"],getHello);

//   console.log(queryHello.data, queryHello2.data)

  return (
    <div>
      host index  { " "}
      { queryHello.data.name} { " "}
      { queryHello2.data?.name ?? "et"} 
    </div>
  )
}

Page.getLayout = function getLayout(page) {
  return (
    <Layout>{page}</Layout>
  )
}


const getHello = async () => { 
    try {
        const {data} = await axios.get("http://localhost:3000/api/hello");
        return data;
    } catch (error) {
        throw error
    }
}


export async function getServerSideProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(["hello"], getHello);

  return { 
    props: { 
        dehydratedState: dehydrate(queryClient) } 
    };
}


export default Page;

