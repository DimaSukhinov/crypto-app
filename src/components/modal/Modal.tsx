import React, {useCallback} from 'react';
import './Modal.scss';

type PortfolioPropsType = {
    active: boolean
    setActive: (active: boolean) => void
    children: React.ReactNode
}

export const Modal = React.memo((props: PortfolioPropsType) => {

    const closePortfolio = useCallback(() => props.setActive(false), [props])

    return (
        <div className={'portfolio'} onClick={closePortfolio}>
            <div className={'portfolio__content'} onClick={e => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    );
})
