// import AxiosInstance from ".";
import {
    HttpInstance, httpInstance
} from './axios/default'

import {
    HttpInstance as HttpInstance2
} from './axios/default_class'

import {
    HttpInstance as HttpInstance3
} from './axios/default_static_class'
import { Store } from '../model/store';

const axios = HttpInstance.createInstance();
const http = new HttpInstance2();
const api = new HttpInstance2().instance()
const httpStaic = HttpInstance3.createInstance()

export class StoreApi {
    static async getList(): Promise<Store[]> { 
        try {
            // return await AxiosInstance.createInstance().get("v2/stores");
            // return await axios.get("v2/stores");
            // return await http.instance().get("v2/stores");
            // return await api.get("v2/stores");
            return await httpStaic.get("v2/stores");
        } catch (error) {
            throw error;
        }
    }

    static async getDetail(id: string): Promise<Store> {
        try {
            return await httpInstance.get(`/store/${id}`);
        } catch (error) {
            throw error;
        }
    }

    static async update(pathVariable : {id: string}, requestBody : { name: string }) {
        try {
            return await axios.put(`/store/${pathVariable.id}`, requestBody)
        } catch (error) {
            throw error;
        }
    }


}