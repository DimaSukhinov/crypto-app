import React, {useCallback} from 'react';
import './ValuesList.scss';
import {ValueType} from '../../../store/values-reducer';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

type ValueListPropsType = {
    currentPageValues: ValueType[]
    navigateToValue: (id: string) => void
    openAddModal: (id: string) => void
}

export const MaterialValuesList = React.memo(({
                                                  navigateToValue,
                                                  currentPageValues,
                                                  openAddModal
                                              }: ValueListPropsType) => {

    const openValuePage = useCallback((id: string) => () => navigateToValue(id), [navigateToValue])

    const onOpenAddModal = useCallback((id: string) => (e: any) => {
        e.stopPropagation()
        openAddModal(id)
    }, [openAddModal])

    return (
        <>
            {currentPageValues.map(v => <Card sx={{p: '20px 25px', m: '8px', cursor: 'pointer'}}
                                              onClick={openValuePage(v.id)}>
                <Grid container spacing={2} alignItems={'center'}>
                    <Grid item xs={1.5}>{v.rank}</Grid>
                    <Grid item xs={2.5}>{v.symbol}</Grid>
                    <Grid item xs={2.5}>{v.name}</Grid>
                    <Grid item xs={2.5}>
                        {+v.priceUsd > 1 ? +(+v.priceUsd).toFixed(2) : +(+v.priceUsd).toFixed(5)} $
                    </Grid>
                    <Grid item xs={2} sx={{color: +v.changePercent24Hr > 0 ? '#0abd0a' : '#cb2424'}}>
                        {+(+v.changePercent24Hr).toFixed(2)}%
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton onClick={onOpenAddModal(v.id)}><AddIcon/></IconButton>
                    </Grid>
                </Grid>
            </Card>)}
        </>
    );
})
