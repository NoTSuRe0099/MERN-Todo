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
import "./style.css";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import Checkbox from "@mui/material/Checkbox";
import {
    DeleteTodo,
    GetTodo,
    toggleTodo,
} from "../../../Reducers/apiTodoSlice";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();
    const { todos } = useSelector((state) => state.apiTodoList);
    const dispatch = useDispatch();
    const [filter, setFilter] = React.useState(
        localStorage.getItem("filter") || "all"
    );
    const [searchQuery, setSearchQuery] = React.useState("");
    const FilterTodosHandler = (e) => {
        localStorage.setItem("filter", e.target.value);
        setFilter(localStorage.getItem("filter"));
    };
    React.useEffect(() => {
        localStorage.setItem("filter", filter);
    }, [filter]);

    return (
        <>
            {!todos.length > 0 ? (
                <h1>
                    <center>Create A Todo</center>
                    <center>
                        <IconButton
                            onClick={() => {
                                navigate(`/addTodo`);
                            }}
                            aria-label="update"
                            sx={{ border: "2px solid gray", margin: "10px" }}
                        >
                            <AddIcon color="primary" />
                        </IconButton>
                    </center>
                </h1>
            ) : (
                <TableContainer component={Paper}>
                    <div className="table_options">
                        <TextField
                            size="small"
                            sx={{ width: "100%" }}
                            id="filled-basic"
                            label="Search Todo's"
                            variant="filled"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <FormControl
                            variant="filled"
                            size="small"
                            sx={{ minWidth: 130, borderRadiusY: 2 }}
                        >
                            <InputLabel id="demo-select-small">
                                Filter
                            </InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={filter}
                                onChange={FilterTodosHandler}
                            >
                                <MenuItem value={"all"}>All</MenuItem>
                                <MenuItem value={"true"}>Completed</MenuItem>
                                <MenuItem value={"false"}>in-complete</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
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
                            {todos
                                ?.filter((row) => {
                                    let items = [];

                                    if (filter === "all") {
                                        items = row;
                                    } else if (filter === "true") {
                                        items = row.completed;
                                    } else if (filter === "false") {
                                        items = !row.completed;
                                    }
                                    if (searchQuery === "") {
                                        return items;
                                    } else if (
                                        items.title
                                            .toLowerCase()
                                            .includes(searchQuery.toLowerCase())
                                    ) {
                                        return items;
                                    }
                                })
                                .reverse()
                                .map((row) => (
                                    <StyledTableRow hover key={row._id}>
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
                                                        onChange={() =>
                                                            dispatch(
                                                                toggleTodo(
                                                                    row._id
                                                                )
                                                            )
                                                        }
                                                        defaultChecked={
                                                            row.completed
                                                        }
                                                    />
                                                }
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            {row.title}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            {row.description}
                                        </StyledTableCell>

                                        <StyledTableCell align="right">
                                            <IconButton
                                                onClick={() => {
                                                    dispatch(GetTodo(row._id));
                                                    navigate(
                                                        `/updateTodo/${row._id}`
                                                    );
                                                }}
                                                aria-label="update"
                                            >
                                                <EditIcon
                                                    color="primary"
                                                    fontSize="small"
                                                />
                                            </IconButton>

                                            <IconButton
                                                onClick={() =>
                                                    dispatch(
                                                        DeleteTodo(row._id)
                                                    )
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
            )}
        </>
    );
};

export default TableGrid;
