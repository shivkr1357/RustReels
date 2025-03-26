import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import Leftbar from "./Leftbar/Leftbar";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#0B050D",
        color: "#fff",
        minHeight: "100vh",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: theme.spacing(2),
    },
    gameSection: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: theme.spacing(2),
        marginBottom: theme.spacing(4),
    },
    gameCard: {
        backgroundColor: "#2c2f36",
        borderRadius: "8px",
        padding: theme.spacing(2),
        textAlign: "center",
    },
    rewardsBanner: {
        backgroundColor: "#6a1b9a",
        padding: theme.spacing(2),
        borderRadius: "8px",
        marginBottom: theme.spacing(4),
    },
    footer: {
        marginTop: theme.spacing(4),
        textAlign: "center",
    },
    table: {
        marginTop: theme.spacing(4),
        backgroundColor: "#2c2f36",
    },
}));

const NewHome = () => {
    const classes = useStyles();

    return (
        <main className={classes.root}>
            <Leftbar />
        </main>
    );
};

export default NewHome;