import React, {ChangeEvent, useCallback} from 'react';
import {Modal} from '../Modal';
import {ValueType} from '../../../store/values-reducer';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useSnackbar} from '../../../hooks/CustomHooks';

type AddModalPropsType = {
    values: ValueType[]
    activeAddModal: boolean
    currentValue: string
    closeModal: () => void
    error: boolean
    valueCount: number
    onValueCountChange: (e: ChangeEvent<HTMLInputElement>) => void
    addToPortfolio: (id: string, name: string, price: string, valueCount: number) => () => void
}

export const MaterialAddModal = React.memo(({
                                                values, activeAddModal, closeModal, currentValue,
                                                valueCount, error, onValueCountChange, addToPortfolio
                                            }: AddModalPropsType) => {

    return (
        <>
            {activeAddModal && <Modal closeModal={closeModal}>
                {values.map(v => v.id === currentValue && <Stack direction="column" justifyContent="center"
                                                                 alignItems="center" spacing={2} width={300}
                >
                    <Typography>{v.name}</Typography>
                    <TextField type="number" label="Count" variant="outlined" onChange={onValueCountChange}/>
                    {error && <Typography sx={{color: 'red'}}>Incorrect value</Typography>}
                    <Typography variant={'body1'}>
                         Price: {valueCount > 0 && (valueCount * +v.priceUsd).toFixed(2) + '$'}
                    </Typography>
                    <Button variant={'outlined'} onClick={addToPortfolio(v.id, v.name, v.priceUsd, valueCount)}>
                        Add
                    </Button>
                </Stack>)}
            </Modal>}
        </>
    );
})
