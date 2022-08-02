import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from './Button';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Crypto app/Button',
  component: Button,
  argTypes: {
    onClickHandler: {
      description: 'Clicked',
    },
    backgroundColor: { control: 'color' },
    color: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Add',
  onClickHandler: action('Clicked'),
};
