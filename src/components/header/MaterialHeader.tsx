import React, {useCallback, useState} from 'react';
import {ValueType} from '../../store/values-reducer';
import {useAppSelector, useCurrentWalletValue} from '../../hooks/CustomHooks';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import {MaterialPortfolioModal} from '../modals/portfolioModal/MaterialPortfolioModal';
import Stack from '@mui/material/Stack';

type HeaderPropsType = {
    values: ValueType[]
}

export const MaterialHeader = React.memo(({values}: HeaderPropsType) => {

    const portfolio = useAppSelector((store) => store.portfolio)
    const [activePortfolioModal, setActivePortfolioModal] = useState<boolean>(false)

    const currentWalletValue = useCurrentWalletValue(portfolio, values)

    const TopThreeValues = values.slice(0, 3)

    const openPortfolio = useCallback(() => setActivePortfolioModal(true), [])

    return (
        <>
            <AppBar position={'static'} sx={{mb: '10px'}}>
                <Container>
                    <Toolbar sx={{justifyContent: 'space-around'}}>
                        <Stack direction={'row'} spacing={2}>
                            {TopThreeValues.map(v => <Card sx={{p: '5px 10px'}}>
                                    {`${v.symbol} ${+v.priceUsd > 1
                                        ? +(+v.priceUsd).toFixed(2)
                                        : +(+v.priceUsd).toFixed(5)}`}$
                                </Card>
                            )}
                        </Stack>
                        <Typography>{currentWalletValue}</Typography>
                        <Button variant={'outlined'} color={'inherit'} onClick={openPortfolio}>Portfolio</Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <MaterialPortfolioModal values={values} activePortfolioModal={activePortfolioModal}
                                    setActivePortfolioModal={setActivePortfolioModal}/>
        </>
    );
})
