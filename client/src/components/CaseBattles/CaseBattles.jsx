import React from 'react'
import MainLayout from '../Layout/MainLayout'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import CaseBattlesHeader from './CaseBattlesHeader';
import GameInterface from './GameInterface';


const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
    },
}));

const CaseBattles = () => {
    const classes = useStyles();
    return (
        <MainLayout>
            <Box className={classes.root}>
                <CaseBattlesHeader />
                {Array.from({ length: 3 }).map((_, index) => (
                    <GameInterface opacity={1} key={index} />
                ))}

                {Array.from({ length: 3 }).map((_, index) => (
                    <GameInterface opacity={0.5} key={index} />
                ))}
            </Box>
        </MainLayout>
    )
}

export default CaseBattles
