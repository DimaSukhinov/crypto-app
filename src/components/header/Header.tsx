import React, { useCallback, useState } from 'react';
import './Header.scss';
import { ValueType } from '../../store/values-reducer';
import { useCurrentWalletValue } from '../../hooks/UseCurrentWalletValue';
import { PortfolioModal } from '../modals/portfolioModal/PortfolioModal';
import { useAppSelector } from '../../hooks/CustomHooks';

type HeaderPropsType = {
  values: ValueType[]
}

export const Header = React.memo(({ values }: HeaderPropsType) => {

  const portfolio = useAppSelector((store) => store.portfolio);
  const [activePortfolioModal, setActivePortfolioModal] = useState<boolean>(false);

  const currentWalletValue = useCurrentWalletValue(portfolio, values);

  const TopThreeValues = values.slice(0, 3);

  const openPortfolio = useCallback(() => setActivePortfolioModal(true), []);

  return (
    <div className={'header'} data-testid={'header'}>
      <div className={'header__container'}>
        <div className={'header__popular-values'}>
          {TopThreeValues.map(v => <div key={v.rank} className={'header__item'}>
            <span>{v.symbol} </span>
            {+v.priceUsd > 1 ? +(+v.priceUsd).toFixed(2) : +(+v.priceUsd).toFixed(5)}$
          </div>)}
        </div>
        <span>
          {currentWalletValue}
        </span>
        <div className={'header__portfolio-button'} data-testid={'portfolio-button'} onClick={openPortfolio}>
          Portfolio
        </div>
      </div>
      <PortfolioModal activePortfolioModal={activePortfolioModal} currentWalletValue={currentWalletValue}
                      setActivePortfolioModal={setActivePortfolioModal} />
    </div>
  );
});
