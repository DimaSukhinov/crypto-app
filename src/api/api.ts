import axios from 'axios';
import {ValueType} from '../store/values-reducer';

export const instance = axios.create({
    baseURL: 'https://api.coincap.io/v2/',
})

export const cryptoAPI = {
    allValues() {
        return instance.get<{data: ValueType[]}>('assets')
    },
}
