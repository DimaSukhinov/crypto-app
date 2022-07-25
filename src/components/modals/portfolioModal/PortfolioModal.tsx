import React, {useCallback, useState} from 'react';
import './PortfolioModal.scss';
import {useDispatch} from 'react-redux';
import {ValueType} from '../../../store/values-reducer';
import {useAppSelector, useCurrentWalletValue} from '../../../hooks/CustomHooks';
import {removeFromPortfolioAC} from '../../../store/portfolio-reducer';
import {Modal} from '../Modal';
import {Button} from '../../common/button/Button';

type PortfolioModalPropsType = {
    values: ValueType[]
    activePortfolioModal: boolean
    setActivePortfolioModal: (activePortfolioModal: boolean) => void
}

export const PortfolioModal = React.memo(({
                                              values, activePortfolioModal, setActivePortfolioModal
                                          }: PortfolioModalPropsType) => {

    const dispatch = useDispatch()
    const portfolio = useAppSelector((store) => store.portfolio)
    const [confirmDeletionModal, setConfirmDeletionModal] = useState<boolean>(false)
    const [confirmDeletion, setConfirmDeletion] = useState<boolean>()

    const currentWalletValue = useCurrentWalletValue(portfolio, values)

    const removeValueFromPortfolio = useCallback(() => {
        setConfirmDeletionModal(true)
    }, [])

    const confirmValueDelete = useCallback((id: string) => () => {
        setConfirmDeletion(true)
        dispatch(removeFromPortfolioAC(id))
        setConfirmDeletionModal(false)
    }, [dispatch])

    const rejectValueDelete = useCallback(() => {
        setConfirmDeletion(false)
        setConfirmDeletionModal(false)
    }, [])

    const closePortfolioModal = useCallback(() => setActivePortfolioModal(false), [setActivePortfolioModal])
    const closeConfirmDeletionModal = useCallback(() => setActivePortfolioModal(false), [setActivePortfolioModal])

    return <>
        {activePortfolioModal && <Modal closeModal={closePortfolioModal}>
            {portfolio.length > 0
                ? <div className={'portfolio'}>
                    <div className={'portfolio__price'}>
                        Current price: {currentWalletValue}
                    </div>
                    {portfolio.map(v => <div className={'portfolio__values'}>
                        <div className={'portfolio__name portfolio__element'}>
                            {v.name}
                        </div>
                        <div className={'portfolio__amount portfolio__element'}>
                            {v.valueCount}
                        </div>
                        <div className={'portfolio__price-usd portfolio__element'}>
                            {(v.valueCount * v.price).toFixed(2)} $
                        </div>
                        <div className={'portfolio__delete-button'} onClick={removeValueFromPortfolio}>
                            -
                        </div>
                        {confirmDeletionModal &&
                            <Modal closeModal={closeConfirmDeletionModal}>
                                <span>Do you really want to delete {v.name}?</span>
                                <div className={'portfolio__delete-modal'}>
                                    <Button onClickHandler={confirmValueDelete(v.id)}>Yes</Button>
                                    <Button onClickHandler={rejectValueDelete}>No</Button>
                                </div>
                            </Modal>}
                    </div>)}
                </div>
                : <div className={'portfolio__empty-portfolio'}>You don't have currency</div>}
        </Modal>}
    </>
})
