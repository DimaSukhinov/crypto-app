import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {PortfolioValue} from './PortfolioValue';

export default {
    title: 'Crypto app/Portfolio',
    component: PortfolioValue,
} as ComponentMeta<typeof PortfolioValue>

const Template: ComponentStory<typeof PortfolioValue> = (args) => <PortfolioValue {...args} />

export const Value = Template.bind({})
Value.args = {
    portfolio: [{id: 'firstId', name: 'Value', valueCount: 10, price: 123},],
    removeValueFromPortfolio: () => action('Removed')
}
