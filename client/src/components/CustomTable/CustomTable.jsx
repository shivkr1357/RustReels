import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
    Box,
    Typography,
    makeStyles,
} from "@material-ui/core";
import LiveBets from "../../assets/Rustreels/Branding/Vector.png";
import Gun from "../../assets/Rustreels/Branding/gun.png";

const useStyles = makeStyles(theme => ({

    tableContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: "5px 70px"
    },
    tableContent: {
        display: "flex",
        flexDirection: "row",
        gap: 20
    },
    tableSubtitle: {
        fontSize: 14,
        color: "#FE49FF",
        background: "#291E2A",
        padding: "10px",
        borderRadius: 10,
        cursor: "pointer"
    },
    tableTitle: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    liveBetsIcon: {
        width: 20,
        height: 20
    },
    gunIcon: {
        width: 20,
        height: 20,
        alignSelf: "center",
        placeSelf: "center"

    }
}));

const CustomTable = ({ columns, data, rowsPerPageOptions = [5, 10, 25] }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const [selected, setSelected] = useState("All Bets");
    const classes = useStyles();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>


            <Box className={classes.tableContainer}>
                <Box className={classes.tableHeader}>
                    <Typography className={classes.tableTitle}>
                        <img src={LiveBets} className={classes.liveBetsIcon} alt="Live Bets" /> Live Bets
                    </Typography>
                </Box>
                <Box className={classes.tableContent}>
                    <Typography className={classes.tableSubtitle} style={{ background: selected === "All Bets" ? "#291E2A" : "transparent", color: selected === "All Bets" ? "#FE49FF" : "#746574" }} onClick={() => setSelected("All Bets")}>
                        All Bets
                    </Typography>
                    <Typography className={classes.tableSubtitle} style={{ background: selected === "Big Wins" ? "#291E2A" : "transparent", color: selected === "Big Wins" ? "#FE49FF" : "#746574" }} onClick={() => setSelected("Big Wins")}>
                        Big Wins
                    </Typography>
                    <Typography className={classes.tableSubtitle} style={{ background: selected === "Lucky Wins" ? "#291E2A" : "transparent", color: selected === "Lucky Wins" ? "#FE49FF" : "#746574" }} onClick={() => setSelected("Lucky Wins")}>
                        Lucky Wins
                    </Typography>

                </Box>
            </Box>
            <Paper style={{ background: "transparent", color: "#FDF8FF", margin: "80px" }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        style={{ color: "#746574", fontWeight: "bold", border: "none" }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
                                <TableRow key={rowIndex} style={{ backgroundColor: "#130812", color: "#FDF8FF" }}>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} style={{ color: "#FDF8FF", border: "none" }}>
                                            {column.id === "game" ? <img src={Gun} className={classes.gunIcon} alt="game" /> : ""} {row[column.id]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={rowsPerPageOptions}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage} // v4 uses `onChangePage`
                    onChangeRowsPerPage={handleChangeRowsPerPage} // v4 uses `onChangeRowsPerPage`
                    style={{ color: "#FDF8FF", background: "transparent" }}
                />
            </Paper>
        </>
    );
};

export default CustomTable;
