import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import FormControlLabel from "@mui/material/FormControlLabel";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { makeStyles } from "@mui/styles";
import "./style.css";
import { useDispatch } from "react-redux";
import { getTodo, removeTodo, toggleTodo } from "../../Reducers/TodosSlice";
import Checkbox from "@mui/material/Checkbox";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const TableGrid = () => {
    const { todos } = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    return (
        <>
            {todos.length > 0 ? (
                <TableContainer sx={{ marginY: "50px" }} component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Todo</StyledTableCell>
                                <StyledTableCell>Title</StyledTableCell>
                                <StyledTableCell>Discription</StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {todos?.map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell
                                        sx={{ width: "135px" }}
                                        component="th"
                                        scope="row"
                                    >
                                        <FormControlLabel
                                            sx={{ marginX: "auto" }}
                                            label="Completed"
                                            labelPlacement="end"
                                            control={
                                                <Checkbox
                                                    onClick={() =>
                                                        dispatch(
                                                            toggleTodo(row.id)
                                                        )
                                                    }
                                                    checked={todos.completed}
                                                />
                                            }
                                        />
                                    </StyledTableCell>

                                    <StyledTableCell component="th" scope="row">
                                        {row.title}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {row.desc}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <IconButton
                                            onClick={() =>
                                                dispatch(getTodo(row))
                                            }
                                            aria-label="update"
                                        >
                                            <EditIcon
                                                color="primary"
                                                fontSize="small"
                                            />
                                        </IconButton>

                                        <IconButton
                                            onClick={() =>
                                                dispatch(removeTodo(row.id))
                                            }
                                            aria-label="delete"
                                        >
                                            <DeleteIcon
                                                sx={{ color: "red" }}
                                                fontSize="small"
                                            />
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <h1>
                    <center>Create your First Todo</center>
                </h1>
            )}
        </>
    );
};

export default TableGrid;
