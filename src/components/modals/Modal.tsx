import React from 'react';
import './Modal.scss';

type ModalPropsType = {
  closeModal?: () => void
  children: React.ReactNode
}

export const Modal = React.memo(({ closeModal, children }: ModalPropsType) => {

  return (
    <div className={'reusableModal'} onClick={closeModal} data-testid={'space-around-modal'}>
      <div className={'reusableModal__content'} onClick={e => e.stopPropagation()}>
        {children}
        <div className={'reusableModal__close'} onClick={closeModal}>X</div>
      </div>
    </div>
  );
});
