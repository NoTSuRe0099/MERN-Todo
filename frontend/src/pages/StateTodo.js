import React from "react";
import TodoForm from "../Components/FormComponent.js/TodoForm";
import TableGrid from "../Components/TableGridComponent/TableGrid";
import Container from "@mui/material/Container";

const StateTodo = () => {
  return (
    <>
      <Container>
        <TodoForm />
        <TableGrid />
      </Container>
    </>
  );
};

export default StateTodo;
