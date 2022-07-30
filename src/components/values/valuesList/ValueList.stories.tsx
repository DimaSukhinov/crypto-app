import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {ValuesList} from './ValuesList';

export default {
    title: 'Crypto app/ValueList',
    component: ValuesList,
    args: {
        navigateToValue: action('Navigate to value page'),
        openAddModal: action('Open add modal button clicked'),
    }
} as ComponentMeta<typeof ValuesList>

const Template: ComponentStory<typeof ValuesList> = (args) => <ValuesList {...args} />

export const ValueWithAPositivePriceChange = Template.bind({})
ValueWithAPositivePriceChange.args = {
    currentPageValues: [
        {
            id: 'bitcoin', rank: '1', changePercent24Hr: '3.1367184772434482', explorer: 'https://blockchain.info/',
            marketCapUsd: '452445368357.8622563021714334', maxSupply: '21000000.0000000000000000', name: 'Bitcoin',
            priceUsd: '23679.9797033025578357', supply: '19106662.0000000000000000', symbol: 'BTC',
            volumeUsd24Hr: '17521511686.5773940471774064', vwap24Hr: '23710.9068155355389843'
        },
    ],
}

export const ValueWithANegativePriceChange = Template.bind({})
ValueWithANegativePriceChange.args = {
    currentPageValues: [
        {
            id: 'bitcoin', rank: '1', changePercent24Hr: '-0.1077608426426537', explorer: 'https://blockchain.info/',
            marketCapUsd: '452445368357.8622563021714334', maxSupply: '21000000.0000000000000000', name: 'Bitcoin',
            priceUsd: '23679.9797033025578357', supply: '19106662.0000000000000000', symbol: 'BTC',
            volumeUsd24Hr: '17521511686.5773940471774064', vwap24Hr: '23710.9068155355389843'
        },
    ],
}
