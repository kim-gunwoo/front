import { useCallback, useState } from "react";
import { Store, StoreEntity } from "../view-model/store";

export default function useStore() {
    const [form,setForm] = useState<StoreEntity>({name : ""});
    const store = new Store(form);

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        setForm(prev => ({ ...prev, [name] : value}));
      },[])

    return {
        store,
        // store :form,
        onChange
    }
}