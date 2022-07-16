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
                <div className={'header__portfolio'} onClick={openPortfolio}>
                    Portfolio
                </div>
            </div>
            {activePortfolioModal && <Modal active={activePortfolioModal} setActive={setActivePortfolioModal}>
                {portfolio.map(v => <div className={'app__portfolioValue'}>
                    <div className={'app__item'}>
                        {v.name}
                    </div>
                    <div className={'app__item'}>
                        {v.valueCount}
                    </div>
                    <div className={'app__item'}>
                        {+(v.valueCount * +v.price).toFixed(2)} $
                    </div>
                    <div className={'app__delete'} onClick={removeValueFromPortfolio(v.id)}>
                        x
                    </div>
                </div>)}
            </Modal>}
        </div>
    );
})
