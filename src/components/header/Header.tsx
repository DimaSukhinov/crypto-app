import React, {useCallback, useState} from 'react';
import './Header.scss';
import {Modal} from '../modal/Modal';
import {useAppSelector} from '../../store/store';
import {removeFromPortfolioAC} from '../../store/portfolio-reducer';
import {useDispatch} from 'react-redux';

export const Header = React.memo(() => {

    const dispatch = useDispatch()
    const portfolio = useAppSelector((store) => store.portfolio)
    const [activePortfolioModal, setActivePortfolioModal] = useState<boolean>(false)
    const wallet = portfolio.map(p => p.valueCount * p.price).reduce((acc: any, num: any) => acc + num, 0).toFixed(2)

    const openPortfolio = useCallback(() => setActivePortfolioModal(true), [])

    const removeValueFromPortfolio = useCallback((id: string) => () => dispatch(removeFromPortfolioAC(id)), [dispatch])

    return (
        <div className={'header'}>
            <div className={'header__container'}>
                <input type="text"/>
                <div className={'header__popularValues'}>
                    <span>first</span>
                    <span>second</span>
                    <span>third</span>
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
