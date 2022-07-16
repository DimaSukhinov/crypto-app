import React, {useCallback} from 'react';
import './Header.scss';

type HeaderPropsType = {
    active: boolean
    setActive: (active: boolean) => void
}

export const Header = React.memo((props: HeaderPropsType) => {

    const openPortfolio = useCallback(() => props.setActive(true), [props])

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
        </div>
    );
})
