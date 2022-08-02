import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Modal } from './Modal';

export default {
  title: 'Crypto app/Modals',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const ModalWindow = Template.bind({});
ModalWindow.args = {
  children: 'Modal window',
  closeModal: action('Modal window closed'),
};
