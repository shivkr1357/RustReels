import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#1b2129",
        color: "#fff",
        minHeight: "100vh",
        padding: theme.spacing(2),
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
        <div className={classes.root}>
            <div className={classes.header}>
                <Typography variant="h4">Rust Reels</Typography>
                <Button variant="contained" color="primary">
                    Log In
                </Button>
            </div>

            <div className={classes.rewardsBanner}>
                <Typography variant="h6">Free Rewards</Typography>
                <Typography variant="body1">Claim daily cases & earn rakeback on all your bets or explore our rewards.</Typography>
                <Button variant="contained" color="secondary">View Event</Button>
            </div>

            <Typography variant="h5" gutterBottom>
                Rust Reels Originals
            </Typography>
            <div className={classes.gameSection}>
                <div className={classes.gameCard}>
                    <Typography variant="h6">BLACKJACK</Typography>
                </div>
                <div className={classes.gameCard}>
                    <Typography variant="h6">COINFLIP</Typography>
                </div>
                <div className={classes.gameCard}>
                    <Typography variant="h6">THE WHEEL</Typography>
                </div>
                <div className={classes.gameCard}>
                    <Typography variant="h6">JACKPOT</Typography>
                </div>
                <div className={classes.gameCard}>
                    <Typography variant="h6">SLOTS</Typography>
                </div>
            </div>

            <Typography variant="h5" gutterBottom>
                Rust Reels Live Games
            </Typography>
            <div className={classes.gameSection}>
                <div className={classes.gameCard}>
                    <Typography variant="h6">SAMURAI'S MATH</Typography>
                </div>
                <div className={classes.gameCard}>
                    <Typography variant="h6">DAWN OF KINGS</Typography>
                </div>
                <div className={classes.gameCard}>
                    <Typography variant="h6">SUGAR RUSH 1000</Typography>
                </div>
                <div className={classes.gameCard}>
                    <Typography variant="h6">BIG BASS DAY AT THE RACES</Typography>
                </div>
                <div className={classes.gameCard}>
                    <Typography variant="h6">RUSTY & CURLY</Typography>
                </div>
            </div>

            <Typography variant="h5" gutterBottom>
                Live Bets
            </Typography>
            <TableContainer component={Paper} className={classes.table}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Game</TableCell>
                            <TableCell>Player</TableCell>
                            <TableCell>Wager</TableCell>
                            <TableCell>Multiplier</TableCell>
                            <TableCell>Payout</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Sample data, replace with actual data */}
                        {Array.from({ length: 5 }).map((_, index) => (
                            <TableRow key={index}>
                                <TableCell>Case Battles</TableCell>
                                <TableCell>Player{index + 1}</TableCell>
                                <TableCell>0.01</TableCell>
                                <TableCell>x1.0</TableCell>
                                <TableCell>0.00</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className={classes.footer}>
                <Typography variant="body2">© 2024 Rust Reels. All Rights Reserved.</Typography>
                <Typography variant="body2">Support: support@rustreels.com</Typography>
                <Typography variant="body2">Partners: support@rustreels.com</Typography>
            </div>
        </div>
    );
};

export default NewHome;