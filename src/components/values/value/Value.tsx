import React, {ChangeEvent, useCallback, useState} from 'react';
import './Value.scss';
import {ValuesType} from '../../../store/values-reducer';

type ValuePropsType = {
    value: string
    values: ValuesType[]
    navigateToValues: () => void
}

export const Value = React.memo((props: ValuePropsType) => {

    const [valueCount, setValueCount] = useState<number>(0)

    const onValueCountChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setValueCount(+e.currentTarget.value), [])

    const backToValuesPage = useCallback(() => props.navigateToValues(), [props])

    return (
        <div className={'value'}>
            {props.values.map(v => v.id === props.value && <>
                <div className={'value__header'}>
                    <div className={'value__back'} onClick={backToValuesPage}>Back</div>
                    <div className={'value__name'}>
                        {v.name}
                    </div>
                </div>
                <div className={'value__description'}>
                    <div className={'value__graphic'}>
                        Graphic
                    </div>
                    <div>
                        <div className={'value__about'}>
                            <div className={'value__item'}>
                                Symbol: {v.symbol}
                            </div>
                            <div className={'value__item'}>
                                Price:
                                {+(+v.priceUsd).toFixed(2)} $
                            </div>
                            <div className={'value__item'}>
                                Changes: <span style={{color: +v.changePercent24Hr > 0 ? 'green' : 'red'}}>
                                {+(+v.changePercent24Hr).toFixed(2)}%</span>
                            </div>
                            <div className={'value__item'}>
                                MarketCap: {+(+v.marketCapUsd).toFixed(2)} $
                            </div>
                        </div>
                        <div className={'value__add'}>
                            <input type="number" onChange={onValueCountChange}/>
                            Price: {(valueCount * +v.priceUsd).toFixed(2)} $
                            <button>Add</button>
                        </div>
                    </div>
                </div>
            </>)}
        </div>
    );
})
