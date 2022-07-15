import React, {useCallback} from 'react';
import './Values.scss';
import {ValuesType} from '../../App';

type ValueListPropsType = {
    values: ValuesType[]
    navigateToValue: (id: string) => void
}

export const Values = React.memo((props: ValueListPropsType) => {

    const openValuePage = useCallback((id: string) => () => props.navigateToValue(id), [props])

    return (
        <div className="valueList">
            {
                props.values.map(v => <div className={'valueList__value'} onClick={openValuePage(v.id)}>
                    <div className={'valueList__rank'}>
                        {v.rank}
                    </div>
                    <div className={'valueList__symbol'}>
                        {v.symbol}
                    </div>
                    <div className={'valueList__name'}>
                        {v.name}
                    </div>
                    <div className={'valueList__price'}>
                        {+(+v.priceUsd).toFixed(2)} $
                    </div>
                    <div className={'valueList__changePercent'}>
                        {+(+v.changePercent24Hr).toFixed(2)}%
                    </div>
                    <div className={'valueList__add'}>
                        Add
                    </div>
                </div>)
            }
        </div>
    );
})
