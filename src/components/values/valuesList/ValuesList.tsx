import React, {useCallback} from 'react';
import './ValuesList.scss';
import {ValueType} from '../../../store/values-reducer';
import {Button} from '../../common/button/Button';
import {useOpenAddModal} from '../../../hooks/UseOpenAddModal';

type ValueListPropsType = {
    currentPageValues: ValueType[]
    navigateToValue: (id: string) => void
}

export const ValuesList = React.memo(({navigateToValue, currentPageValues}: ValueListPropsType) => {

    const {openAddModal} = useOpenAddModal()

    const openValuePage = useCallback((id: string) => () => navigateToValue(id), [navigateToValue])

    const onOpenAddModal = useCallback((id: string) => () => openAddModal(id), [openAddModal])

    return (
        <div className="values-list">
            {
                currentPageValues.map(v => <div className={'values-list__value'} onClick={openValuePage(v.id)}>
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
                    <div className={'values-list__changes'} style={{color: +v.changePercent24Hr > 0 ? 'green' : 'red'}}>
                        {+(+v.changePercent24Hr).toFixed(2)}%
                    </div>
                    <Button onClickHandler={onOpenAddModal(v.id)}>Add</Button>
                </div>)
            }
        </div>
    );
})