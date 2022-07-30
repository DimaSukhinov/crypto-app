import React, {ChangeEvent, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AddModal} from './AddModal';
import {action} from '@storybook/addon-actions';

export default {
    title: 'Crypto app/Modals',
    component: AddModal,
    args: {
        values: [{
            id: 'bitcoin', rank: '1', changePercent24Hr: '3.1367184772434482', explorer: 'https://blockchain.info/',
            marketCapUsd: '452445368357.8622563021714334', maxSupply: '21000000.0000000000000000', name: 'Bitcoin',
            priceUsd: '23679.9797033025578357', supply: '19106662.0000000000000000', symbol: 'BTC',
            volumeUsd24Hr: '17521511686.5773940471774064', vwap24Hr: '23710.9068155355389843'
        },],
        currentValue: 'bitcoin',
        closeModal: action('Modal closed'),
        activeAddModal: true
    }
} as ComponentMeta<typeof AddModal>

const Template: ComponentStory<typeof AddModal> = (args) => {
    const [valueCount, setValueCount] = useState<number>(0)
    const [error, setError] = useState<boolean>(false)

    const onValueCountChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValueCount(+e.currentTarget.value)
        setError(false)
    }

    const addToPortfolio = (id: string, name: string, price: string, valueCount: number) => () => {
        if (valueCount <= 0) {
            setError(true)
        }
    }

    return <AddModal {...args} valueCount={valueCount} onValueCountChange={onValueCountChange} error={error}
                     addToPortfolio={addToPortfolio}/>
}

export const AddValueModal = Template.bind({})
AddValueModal.args = {}
