import React, { useCallback } from 'react';
import './Button.scss';

type ButtonPropsType = {
  onClickHandler: () => void
  children: React.ReactNode
  backgroundColor?: string
  color?: string
}

export const Button = React.memo(({ onClickHandler, children, backgroundColor, color }: ButtonPropsType) => {

  const onClickButtonHandler = useCallback((e: any) => {
    e.stopPropagation();
    onClickHandler();
  }, [onClickHandler]);

  return <div className={'button'} style={{ backgroundColor: backgroundColor, color: color }}
              onClick={onClickButtonHandler}>
    {children}
  </div>;
});
