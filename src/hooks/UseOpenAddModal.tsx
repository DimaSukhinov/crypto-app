import {useCallback, useState} from 'react';

export const useOpenAddModal = () => {

    const [currentValue, setCurrentValue] = useState<string>('')
    const [valueCount, setValueCount] = useState<number>(0)
    const [activeAddModal, setActiveAddModal] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const openAddModal = useCallback((id: string) => {
        setActiveAddModal(true)
        setCurrentValue(id)
        setError(false)
        setValueCount(0)
        console.log(id)
    }, [])

    return {
        openAddModal,
        currentValue, valueCount, activeAddModal, error,
        setActiveAddModal, setCurrentValue, setValueCount, setError
    }
}
