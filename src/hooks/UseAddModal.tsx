import {ChangeEvent, useCallback} from 'react';
import {addToPortfolioAC, PortfolioType} from '../store/portfolio-reducer';
import {useDispatch} from 'react-redux';

export const useAddModal = (
    setActiveAddModal: (activeAddModal: boolean) => void,
    setCurrentValue: (currentValue: string) => void,
    setError: (error: boolean) => void,
    setValueCount: (valueCount: number) => void
) => {

    const dispatch = useDispatch()

    const openAddModal = useCallback((id: string) => {
        setActiveAddModal(true)
        setCurrentValue(id)
        setError(false)
        setValueCount(0)
    }, [setActiveAddModal, setCurrentValue, setError, setValueCount])

    const onValueCountChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValueCount(+e.currentTarget.value)
        setError(false)
    }, [setError, setValueCount])

    const addToPortfolio = useCallback((id: string, name: string, price: string, valueCount: number) => () => {
        if (valueCount > 0) {
            let value: PortfolioType = {id: id, name: name, price: +price, valueCount: valueCount}
            dispatch(addToPortfolioAC(value))
            setActiveAddModal(false)
            setValueCount(0)
        } else setError(true)
    }, [dispatch, setActiveAddModal, setError, setValueCount])

    const closeModal = useCallback(() => setActiveAddModal(false), [setActiveAddModal])

    return {
        openAddModal, onValueCountChange, addToPortfolio, closeModal
    }
}
