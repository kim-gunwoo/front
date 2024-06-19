import { useQuery } from "@tanstack/react-query";
import { StoreApi } from "../api";


export default function useStoreQuery() {
    return useQuery(['store'],async () => await StoreApi.getList(),{
        refetchOnWindowFocus: false,
        retry: false,
    })
}