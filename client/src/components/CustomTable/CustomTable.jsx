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
} from "@material-ui/core";

const CustomTable = ({ columns, data, rowsPerPageOptions = [5, 10, 25] }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
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
                                        {row[column.id]}
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
    );
};

export default CustomTable;
