import React, {useCallback, useState} from 'react';
import './Header.scss';
import {Modal} from '../modal/Modal';
import {removeFromPortfolioAC} from '../../store/portfolio-reducer';
import {useDispatch} from 'react-redux';
import {ValueType} from '../../store/values-reducer';
import {useAppSelector, useCurrentWalletValue} from '../../customHooks/CustomHooks';

type HeaderPropsType = {
    values: ValueType[]
}

export const Header = React.memo(({values}: HeaderPropsType) => {

    const dispatch = useDispatch()
    const portfolio = useAppSelector((store) => store.portfolio)
    const [activePortfolioModal, setActivePortfolioModal] = useState<boolean>(false)
    const [confirmDeletionModal, setConfirmDeletionModal] = useState<boolean>(false)
    const [confirmDeletion, setConfirmDeletion] = useState<boolean>()

    const currentWalletValue = useCurrentWalletValue(portfolio, values)

    const TopThreeValues = values.slice(0, 3)

    const openPortfolio = useCallback(() => setActivePortfolioModal(true), [])

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

    return (
        <div className={'header'}>
            <div className={'header__container'}>
                <div className={'header__popular-values'}>
                    {TopThreeValues.map(v => <div className={'header__item'}>
                        <span>{v.symbol} </span>
                        {+v.priceUsd > 1 ? +(+v.priceUsd).toFixed(2) : +(+v.priceUsd).toFixed(5)}$
                    </div>)}
                </div>
                <span>
                    {currentWalletValue}
                </span>
                <div className={'header__portfolio-button'} onClick={openPortfolio}>
                    Portfolio
                </div>
            </div>
            {activePortfolioModal && <Modal setActive={setActivePortfolioModal}>
                {portfolio.length > 0 ? <>
                    <div className={'header__price'}>
                        Current price: {currentWalletValue}
                    </div>
                    {portfolio.map(v => <div className={'header__portfolio'}>
                        <div className={'header__name header__element'}>
                            {v.name}
                        </div>
                        <div className={'header__amount header__element'}>
                            {v.valueCount}
                        </div>
                        <div className={'header__price-usd header__element'}>
                            {(v.valueCount * v.price).toFixed(2)} $
                        </div>
                        <div className={'header__delete-button'} onClick={removeValueFromPortfolio}>
                            -
                        </div>
                        {confirmDeletionModal &&
                            <Modal setActive={setConfirmDeletionModal}>
                                <span>Do you really want to delete {v.name}?</span>
                                <div className={'header__delete-modal'}>
                                    <div onClick={confirmValueDelete(v.id)}
                                         className={'header__delete-modal-item'}>Yes
                                    </div>
                                    <div onClick={rejectValueDelete} className={'header__delete-modal-item'}>
                                        No
                                    </div>
                                </div>
                            </Modal>}
                    </div>)}
                </> : <div className={'header__empty-portfolio'}>You don't have currency</div>}
            </Modal>}
        </div>
    );
})
