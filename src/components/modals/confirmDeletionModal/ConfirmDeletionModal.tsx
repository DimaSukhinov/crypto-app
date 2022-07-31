import React from 'react';
import './ConfirmDeletionModal.scss';
import {Modal} from '../Modal';
import {Button} from '../../common/button/Button';

type PortfolioModalPropsType = {
    valueForDelete: string
    confirm: () => void
    reject: () => void
}

export const ConfirmDeletionModal = React.memo(({valueForDelete, confirm, reject}: PortfolioModalPropsType) => {

    return <div data-testid={'confirm-deletion-modal'}>
        <Modal>
            <span>Do you really want to delete {valueForDelete}?</span>
            <div className={'deletionModal'}>
                <Button onClickHandler={confirm}>Yes</Button>
                <Button onClickHandler={reject}>No</Button>
            </div>
        </Modal>
    </div>
})
