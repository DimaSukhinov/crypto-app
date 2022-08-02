import {gql} from '@apollo/client';

export const GET_ALL_VALUES = gql(`
    query {
        getAllValues {
            id, rank, name, symbol, changePercent24Hr, priceUsd, marketCapUsd
        } 
    }
`)

export const GET_GRAPHIC = gql(`
    query($id: String!) {
        getGraphicData(id: $id) {
            date, priceUsd
        }
    }
`)
