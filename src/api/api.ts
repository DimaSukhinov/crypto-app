import axios from 'axios';
import {ValueType} from '../store/values-reducer';
import {GraphicDataType} from '../components/values/value/Value';

const URL = process.env.REACT_APP_URL

export const instance = axios.create({
  baseURL: URL,
})

export const cryptoAPI = {
  // allValues() {
  //   return instance.get<{ data: ValueType[] }>('assets')
  // },
  // graphic(id: string) {
  //   return instance.get<{ data: GraphicDataType[] }>(`assets/${id}/history?interval=h1`)
  // },
}
