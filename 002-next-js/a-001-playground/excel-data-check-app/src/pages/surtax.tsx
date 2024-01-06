import axios from 'axios';
import type { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import SurtaxPage from '../components/Surtax';
import useLoginMutation from '../hooks/useLoginMutation';

const Home: NextPage = () => {
  const { mutate, data } = useLoginMutation();

  useEffect(() => mutate(), [mutate]);
  
  if(!data){
    return <></>;
  }

  return (
    <SurtaxPage token={data.access_token} />
  )
}

export default Home;
