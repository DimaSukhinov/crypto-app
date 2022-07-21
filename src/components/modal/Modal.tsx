import React, {useCallback} from 'react';
import './Modal.scss';

type ModalPropsType = {
    setActive: (active: boolean) => void
    children: React.ReactNode
}

export const Modal = React.memo(({setActive, children}: ModalPropsType) => {

    const closeModal = useCallback(() => setActive(false), [setActive])

    return (
        <div className={'reusableModal'} onClick={closeModal}>
            <div className={'reusableModal__content'} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
})
