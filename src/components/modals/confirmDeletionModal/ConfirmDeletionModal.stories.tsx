import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ConfirmDeletionModal } from './ConfirmDeletionModal';

export default {
  title: 'Crypto app/Modals',
  component: ConfirmDeletionModal,
} as ComponentMeta<typeof ConfirmDeletionModal>;

const Template: ComponentStory<typeof ConfirmDeletionModal> = (args) => <ConfirmDeletionModal {...args} />;

export const ConfirmDeletionModalWindow = Template.bind({});
ConfirmDeletionModalWindow.args = {
  valueForDelete: 'bitcoin',
  confirm: action('Deletion confirmed'),
  reject: action('Deletion rejected'),
};
