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
    const wallet = portfolio.map(p => p!== null && p.valueCount * p.price).reduce((acc: any, num: any) => acc + num, 0).toFixed(2)

    const openPortfolio = useCallback(() => setActivePortfolioModal(true), [])

    const removeValueFromPortfolio = useCallback((id: string) => () => dispatch(removeFromPortfolioAC(id)), [dispatch])

    return (
        <div className={'header'}>
            <div className={'header__container'}>
                <div className={'header__popularValues'}>
                    {props.TopThreeValues.map(v => <div className={'header__popularValues-item'}>
                        <span>{v.symbol} </span>
                        {(+v.priceUsd).toFixed(2)}$
                    </div>)}
                </div>
                {wallet + ' $'}
                <div className={'header__portfolio-button'} onClick={openPortfolio}>
                    Portfolio
                </div>
            </div>
            {activePortfolioModal && <Modal active={activePortfolioModal} setActive={setActivePortfolioModal}>
                {wallet + ' $'}
                {portfolio.map(v => <div className={'header__portfolio'}>
                    <div className={'header__item'}>
                        {v.name}
                    </div>
                    <div className={'header__item'}>
                        {v.valueCount}
                    </div>
                    <div className={'header__item'}>
                        {(v.valueCount * v.price).toFixed(2)} $
                    </div>
                    <div className={'header__delete'} onClick={removeValueFromPortfolio(v.id)}>
                        x
                    </div>
                </div>)}
            </Modal>}
        </div>
    );
})
