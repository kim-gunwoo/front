import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useLoginMutaion() {
    return useMutation<{
        access_token: string,
    }>(async ()=>{
        const form = new FormData();
        form.append("login_id" , 'paytalab@gmail.com');
        form.append("password" , 'FLHgOsiKhkQ9KnnadJzhn93JUuUiUQU9vXW7SSZnWKs=');
        form.append("app_agent" , "1");
        return await (await axios.post(`/v2/users/authentication`, form)).data;
    },{
        retry: false,
        cacheTime: Infinity,
    })
}