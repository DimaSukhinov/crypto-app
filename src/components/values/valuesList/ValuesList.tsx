import React, { useCallback } from 'react';
import './ValuesList.scss';
import { ValueType } from '../../../store/values-reducer';
import { Button } from '../../common/button/Button';

type ValueListPropsType = {
  currentPageValues: ValueType[]
  navigateToValue: (id: string) => void
  openAddModal: (id: string) => void
}

export const ValuesList = React.memo(({ navigateToValue, currentPageValues, openAddModal }: ValueListPropsType) => {

  const openValuePage = useCallback((id: string) => () => navigateToValue(id), [navigateToValue]);

  const onOpenAddModal = useCallback((id: string) => () => openAddModal(id), [openAddModal]);

  return (
    <div className='values-list' data-testid={'values-list'}>
      {
        currentPageValues.map(v => <div key={v.name} className={'values-list__value'} onClick={openValuePage(v.id)}
                                        data-testid={'value-list-elem'}>
          <div className={'values-list__rank'}>
            {v.rank}
          </div>
          <div className={'values-list__symbol'}>
            {v.symbol}
          </div>
          <div className={'values-list__name'}>
            {v.name}
          </div>
          <div className={'values-list__price'}>
            {+v.priceUsd > 1 ? +(+v.priceUsd).toFixed(2) : +(+v.priceUsd).toFixed(5)} $
          </div>
          <div className={'values-list__changes'} style={{ color: +v.changePercent24Hr > 0 ? 'green' : 'red' }}>
            {+(+v.changePercent24Hr).toFixed(2)}%
          </div>
          <Button onClickHandler={onOpenAddModal(v.id)}>Add</Button>
        </div>)
      }
    </div>
  );
});
