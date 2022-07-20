import React, {useCallback} from 'react';
import './Modal.scss';

type ModalPropsType = {
    active: boolean
    setActive: (active: boolean) => void
    children: React.ReactNode
}

export const Modal = React.memo((props: ModalPropsType) => {

    const closeModal = useCallback(() => props.setActive(false), [props])

    return (
        <div className={'reusableModal'} onClick={closeModal}>
            <div className={'reusableModal__content'} onClick={e => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    );
})
