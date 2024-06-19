import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '~/components/layout'
import { NextPageWithLayout } from '~/pages/_app'


interface IProps {
  data: any;
}

const Page: NextPageWithLayout<IProps> = ({data}) => {
  const router = useRouter();

  // console.log(router.query, data);

  const queryHello = useQuery(["hello"],getHello);

  console.log(queryHello.data)

  return (
    <div>
      host id page     
    </div>
  )
}

Page.getLayout = function getLayout(page) {
  return (
    <Layout>{page}</Layout>
  )
}


const getHello = () => axios.get("http://localhost:3000/api/hello");



export async function getServerSideProps() {
  // const res = await  fetch("http://localhost:3000/api/hello");
  // const data = await res.json()

  // const queryClient = new QueryClient()
  // await queryClient.prefetchQuery(["hello"], getHello)

  // const {data} = await useQuery(["hello"],getHello);
  // return { props: { data } }
  // return {
  //   props : {
  //     dehydratedState: dehydrate(queryClient),
  //   }
  // }
}


export default Page;

