import React, {useCallback} from 'react';
import './Button.scss';

type ButtonPropsType = {
    onClickHandler: any
    children: React.ReactNode
}

export const Button = React.memo(({onClickHandler, children}: ButtonPropsType) => {

    const onClickButtonHandler = useCallback((e: any) => {
        e.stopPropagation()
        onClickHandler()
    }, [onClickHandler])

    return <div className={'button'} onClick={onClickButtonHandler}>
        {children}
    </div>
})
