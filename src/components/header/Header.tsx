import React, {useCallback, useState} from 'react';
import './Header.scss';
import {Modal} from '../modal/Modal';
import {useAppSelector} from '../../store/store';
import {removeFromPortfolioAC} from '../../store/portfolio-reducer';
import {useDispatch} from 'react-redux';
import {ValueType} from '../../store/values-reducer';

type HeaderPropsType = {
    TopThreeValues: ValueType[]
}

export const Header = React.memo((props: HeaderPropsType) => {

    const dispatch = useDispatch()
    const portfolio = useAppSelector((store) => store.portfolio)
    const [activePortfolioModal, setActivePortfolioModal] = useState<boolean>(false)
    const wallet = portfolio.map(p => p !== null && p.valueCount * p.price).reduce((acc: any, num: any) => acc + num, 0).toFixed(2)

    const openPortfolio = useCallback(() => setActivePortfolioModal(true), [])

    const removeValueFromPortfolio = useCallback((id: string) => () => dispatch(removeFromPortfolioAC(id)), [dispatch])

    return (
        <div className={'header'}>
            <div className={'header__container'}>
                <div className={'header__container-popularValues'}>
                    {props.TopThreeValues.map(v => <div className={'header__container-popularValues-item'}>
                        <span>{v.symbol} </span>
                        {+v.priceUsd > 1 ? +(+v.priceUsd).toFixed(2) : +(+v.priceUsd).toFixed(5)}$
                    </div>)}
                </div>
                {wallet + ' $'}
                <div className={'header__container-portfolio-button'} onClick={openPortfolio}>
                    Portfolio
                </div>
            </div>
            {activePortfolioModal && <Modal active={activePortfolioModal} setActive={setActivePortfolioModal}>
                {wallet + ' $'}
                {portfolio.map(v => <div className={'header__portfolio'}>
                    <div className={'header__portfolio-name header__portfolio-item'}>
                        {v.name}
                    </div>
                    <div className={'header__portfolio-valueCount header__portfolio-item'}>
                        {v.valueCount}
                    </div>
                    <div className={'header__portfolio-price header__portfolio-item'}>
                        {(v.valueCount * v.price).toFixed(2)} $
                    </div>
                    <div className={'header__portfolio-delete'} onClick={removeValueFromPortfolio(v.id)}>
                        -
                    </div>
                </div>)}
            </Modal>}
        </div>
    );
})
