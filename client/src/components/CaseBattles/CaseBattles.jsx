import React from 'react'
import MainLayout from '../Layout/MainLayout'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
    },
}));

const CaseBattles = () => {
    const classes = useStyles();
    return (
        <MainLayout>
            <div className={classes.root}>
                <div className={classes.header}>
                    <Typography variant="h6">Case Battles</Typography>
                </div>
            </div>
        </MainLayout>
    )
}

export default CaseBattles
