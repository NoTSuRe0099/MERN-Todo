import { Container } from "@mui/material";
import React from "react";
import TableGrid from "./TableGridComponent/TableGrid";
import { useDispatch } from "react-redux";
import { GetTodos } from "../../Reducers/apiTodoSlice";

const ApiTodo = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(GetTodos());
    }, []);

    return (
        <>
            <h3>
                <center>MERN Todo webapp</center>
            </h3>
            <Container>
                <TableGrid />
            </Container>
        </>
    );
};

export default ApiTodo;
