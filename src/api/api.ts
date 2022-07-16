import axios from 'axios';
import {ValuesType} from '../store/values-reducer';

export const instance = axios.create({
    baseURL: 'https://api.coincap.io/v2/',
})

export const cryptoAPI = {
    allValues() {
        return instance.get<{data: ValuesType[]}>('assets')
    },
}
