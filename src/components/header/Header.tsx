import React, {useCallback, useState} from 'react';
import './Header.scss';
import {Modal} from '../modal/Modal';
import {useAppSelector} from '../../store/store';
import {removeFromPortfolioAC} from '../../store/portfolio-reducer';
import {useDispatch} from 'react-redux';
import {ValueType} from '../../store/values-reducer';

type HeaderPropsType = {
    values: ValueType[]
}

export const Header = React.memo((props: HeaderPropsType) => {

    const dispatch = useDispatch()
    const portfolio = useAppSelector((store) => store.portfolio)
    const [activePortfolioModal, setActivePortfolioModal] = useState<boolean>(false)
    const [confirmDeletionModal, setConfirmDeletionModal] = useState<boolean>(false)
    const [confirmDeletion, setConfirmDeletion] = useState<boolean>()

    const currentWalletValueArr = portfolio.map(p => props.values
        .map(v => v.id === p.id && +(p.valueCount * +v.priceUsd)).reduce((acc: any, num: any) => acc + num, 0))
    const currentWalletValue = currentWalletValueArr.reduce((acc: any, num: any) => acc + num, 0).toFixed(2)
    const originalWalletValue = portfolio.map(p => p !== null && p.valueCount * p.price).reduce((acc: any, num: any) => acc + num, 0).toFixed(2)
    const walletDifference = currentWalletValue - originalWalletValue
    const walletDifferencePercent = walletDifference / currentWalletValue

    const TopThreeValues = props.values.slice(0, 3)

    const openPortfolio = useCallback(() => setActivePortfolioModal(true), [])

    const removeValueFromPortfolio = useCallback(() => {
        setConfirmDeletionModal(true)
    }, [])

    const confirmValueDelete = useCallback((id: string) => () => {
        setConfirmDeletion(true)
        dispatch(removeFromPortfolioAC(id))
        setConfirmDeletionModal(false)
    }, [])

    const rejectValueDelete = useCallback(() => {
        setConfirmDeletion(false)
        setConfirmDeletionModal(false)
    }, [])

    return (
        <div className={'header'}>
            <div className={'header__container'}>
                <div className={'header__container-popularValues'}>
                    {TopThreeValues.map(v => <div className={'header__container-popularValues-item'}>
                        <span>{v.symbol} </span>
                        {+v.priceUsd > 1 ? +(+v.priceUsd).toFixed(2) : +(+v.priceUsd).toFixed(5)}$
                    </div>)}
                </div>
                <span>
                    {currentWalletValue + ' USD '}
                    {currentWalletValue > 0 && <span style={{color: walletDifference > 0 ? 'green' : 'red'}}>
                        {walletDifference.toFixed(2)} $ ({walletDifferencePercent.toFixed(4)} %)
                    </span>}
                </span>
                <div className={'header__container-portfolio-button'} onClick={openPortfolio}>
                    Portfolio
                </div>
            </div>
            {activePortfolioModal && <Modal active={activePortfolioModal} setActive={setActivePortfolioModal}>
                {portfolio.length > 0 ? <>
                    <div className={'header__portfolio-price'}>
                        <span
                            className={'header__portfolio-price-item'}>
                            Total spent: {originalWalletValue + ' USD '}
                        </span>
                        <span className={'header__portfolio-price-item'}>
                            Current price: {currentWalletValue + ' USD '}
                            {currentWalletValue > 0 && <span style={{color: walletDifference > 0 ? 'green' : 'red'}}>
                                {walletDifference.toFixed(2)} $ ({walletDifferencePercent.toFixed(4)} %)
                            </span>}
                        </span>
                    </div>
                    {portfolio.map(v => <div className={'header__portfolio'}>
                        <div className={'header__portfolio-name header__portfolio-item'}>
                            {v.name}
                        </div>
                        <div className={'header__portfolio-valueCount header__portfolio-item'}>
                            {v.valueCount}
                        </div>
                        <div className={'header__portfolio-priceUsd header__portfolio-item'}>
                            {(v.valueCount * v.price).toFixed(2)} $
                        </div>
                        <div className={'header__portfolio-delete'} onClick={removeValueFromPortfolio}>
                            -
                        </div>
                        {confirmDeletionModal &&
                            <Modal active={confirmDeletionModal} setActive={setConfirmDeletionModal}>
                                <span>Do you really want to delete {v.name}?</span>
                                <div className={'header__portfolio-delete-modal'}>
                                    <div onClick={confirmValueDelete(v.id)}
                                          className={'header__portfolio-delete-modal-item'}>Yes
                                    </div>
                                    <div onClick={rejectValueDelete} className={'header__portfolio-delete-modal-item'}>
                                        No
                                    </div>
                                </div>
                            </Modal>}
                    </div>)}
                </> : <div className={'header__portfolio-empty'}>You don't have currency</div>}
            </Modal>}
        </div>
    );
})
