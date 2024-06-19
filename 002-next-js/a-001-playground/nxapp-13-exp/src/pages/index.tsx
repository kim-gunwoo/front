import { css } from '@emotion/react'
import styled from '@emotion/styled'
import type { NextPage } from 'next'
import { use } from 'react'
import Layout from '~/components/layout'
import { NextPageWithLayout } from './_app'

const StyledDiv = styled.div<{back?: string}>`
  /* background: red;
  color: ${props => props.theme.color.ORANGE};
  background: ${props => props.back}; */
`

interface IProps {
  data:any
}

const Home: NextPageWithLayout<IProps> = ({data}) => {
  console.log(data)
  // const a = use(getData())

  return (
    <div css={css`
      /* background: blue; */
    `}>
      home
      <StyledDiv back='green'>
        style div
      </StyledDiv>
      <StyledDiv>
        style div
      </StyledDiv>
    </div>
  )
}

export default Home;

// export async function getServerSideProps() {
  // const res = await  fetch("http://localhost:3000/api/hello");
  // const data = await res.json()
  // return { props: { data } }
// }

