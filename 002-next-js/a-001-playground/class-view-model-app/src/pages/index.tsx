import type { NextPage } from 'next'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Store, StoreEntity } from '../view-model/store'
import { StoreApi } from '../api'
import useStore from '../hooks/useStore'

import styles from '../styles/Home.module.css'
import useStoreQuery from '../hooks/useStoreQuery'

const Home: NextPage = () => {
  // const [store,setStore] = useState<Store>(new Store({ name : "" }))
  // const [form,setForm] = useState<StoreEntity>({name : "",age: 0});
  // const store = new Store(form);

  const {store, onChange} = useStore();
  const storeQuery = useStoreQuery();


  // const onChange = useCallback((e: ChangeEvent<HTMLInputElement>)=>{
  //   const {name, value} = e.target;
  //   setForm(prev => ({ ...prev, [name] : value}));
  // },[])

  
  // useEffect(() => {
  //   console.log(">>>>> mount");
  //   (async()=> {
  //     console.log(">>>>> mount ???");
  //     const res = await StoreApi.getList();
  //     console.log(res)
      
  //   })()
  // },[])

  return (
    <div className={styles.container}>
      {/* <input name='name' onChange={onChange} value={form.name} />
      <br />
      <input name='age' onChange={onChange} value={form.age} /> 
      <br />
      */}
      <input name='name' onChange={onChange} value={store.name} />
      <br />
      <input name='age' onChange={onChange} value={store.age} />
    </div>
  )
}

export default Home
