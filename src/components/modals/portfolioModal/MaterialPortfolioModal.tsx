import React, {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {ValueType} from '../../../store/values-reducer';
import {useAppSelector, useCurrentWalletValue} from '../../../hooks/CustomHooks';
import {removeFromPortfolioAC} from '../../../store/portfolio-reducer';
import {Modal} from '../Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';

type PortfolioModalPropsType = {
    values: ValueType[]
    activePortfolioModal: boolean
    setActivePortfolioModal: (activePortfolioModal: boolean) => void
}

export const MaterialPortfolioModal = React.memo(({
                                                      values, activePortfolioModal, setActivePortfolioModal
                                                  }: PortfolioModalPropsType) => {

    const dispatch = useDispatch()
    const portfolio = useAppSelector((store) => store.portfolio)
    const [confirmDeletionModal, setConfirmDeletionModal] = useState<boolean>(false)
    const [confirmDeletion, setConfirmDeletion] = useState<boolean>()

    const currentWalletValue = useCurrentWalletValue(portfolio, values)

    const removeValueFromPortfolio = useCallback(() => setConfirmDeletionModal(true), [])

    const confirmValueDelete = useCallback((id: string) => () => {
        setConfirmDeletion(true)
        dispatch(removeFromPortfolioAC(id))
        setConfirmDeletionModal(false)
    }, [dispatch])

    const rejectValueDelete = useCallback(() => {
        setConfirmDeletion(false)
        setConfirmDeletionModal(false)
    }, [])

    const closePortfolioModal = useCallback(() => setActivePortfolioModal(false), [setActivePortfolioModal])

    return <>
        {activePortfolioModal && <Modal closeModal={closePortfolioModal}>
            {portfolio.length > 0
                ? <>
                    <Typography>Current price: {currentWalletValue}</Typography>
                    <Divider/>
                    {portfolio.map(v => <>
                        <Grid container spacing={15} alignItems={'center'}>
                            <Grid item xs={3}>{v.name}</Grid>
                            <Grid item xs={2}>{v.valueCount}</Grid>
                            <Grid item xs={4}>{(v.valueCount * v.price).toFixed(2)} $</Grid>
                            <Grid item xs={1}>
                                <IconButton onClick={removeValueFromPortfolio}><DeleteIcon/></IconButton>
                            </Grid>
                        </Grid>
                        {confirmDeletionModal &&
                            <Modal>
                                <Typography>Do you really want to delete {v.name}?</Typography>
                                <Stack direction={'row'} spacing={2} justifyContent={'center'} sx={{mt: '10px'}}>
                                    <Button variant={'outlined'} onClick={confirmValueDelete(v.id)}>Yes</Button>
                                    <Button variant={'outlined'} onClick={rejectValueDelete}>No</Button>
                                </Stack>
                            </Modal>}
                    </>)}
                </>
                : <Typography>You don't have currency</Typography>}
        </Modal>}
    </>
})
