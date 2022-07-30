import {ValueType} from '../store/values-reducer';

export const usePaginationValues = (values: ValueType[], currentPage: number) => {

    const valuesPerPage: number = 14
    const totalValues: number = values.length

    const lastValueIndex = currentPage * valuesPerPage
    const firstValueIndex = lastValueIndex - valuesPerPage
    const currentPageValues = values.slice(firstValueIndex, lastValueIndex)

    return {currentPageValues, valuesPerPage, totalValues}
}
