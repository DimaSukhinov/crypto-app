import React  from 'react';
import './Button.scss';

type ButtonPropsType = {
  onClickHandler: () => void
  children: React.ReactNode
  backgroundColor?: string
  color?: string
}

export const Button = React.memo(({ onClickHandler, children, backgroundColor, color }: ButtonPropsType) => {

  return <div className={'button'} style={{ backgroundColor: backgroundColor, color: color }} data-testid={'button'}
              onClick={e => {
                e.stopPropagation();
                onClickHandler();
              }
              }>
    {children}
  </div>;
});
