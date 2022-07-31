import axios from 'axios';
import {ValueType} from '../store/values-reducer';

export const getData = async () => {
    try {
        const response = await axios.get<{ data: ValueType[] }>(`https://api.coincap.io/v2/assets`)
        return response.data.data.map(d => d.id)
    } catch (e) {

    }
}
