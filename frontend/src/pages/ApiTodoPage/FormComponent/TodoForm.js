import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { Formik, Form } from "formik";
import TextFiled from "../../../Components/TextField/TextFiled";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AddTodo } from "../../../Reducers/apiTodoSlice";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    inpt: {
        marginTop: 50,
        width: "80%",
    },
    btn: {
        marginTop: 10,
    },
});

const TodoForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const todo = useSelector((state) => state.apiTodoList.todo);
    const classes = useStyles();
    const schema = Yup.object({
        title: Yup.string()
            .required("Title should not be empty")
            .min(3, "Title should be at least 3 characters"),
        description: Yup.string().required("Enter Todo Description"),
    });

    return (
        <Container>
            <Box sx={{ marginY: "50px" }} className={classes.root}>
                <Formik
                    initialValues={
                        todo._id
                            ? {
                                  id: todo._id,
                                  title: todo.title,
                                  description: todo.description,
                              }
                            : {
                                  title: "",
                                  description: "",
                              }
                    }
                    enableReinitialize
                    validationSchema={schema}
                    onSubmit={(values, { resetForm }) => {
                        dispatch(AddTodo(values));
                        resetForm();
                        navigate("/");
                    }}
                >
                    {(formik) => (
                        <Form style={{ width: "100%" }}>
                            <TextFiled
                                placeholder="Title"
                                label="Title"
                                name="title"
                                type="text"
                                size="small"
                            />

                            <TextFiled
                                placeholder="Description"
                                label="Description"
                                name="description"
                                type="text"
                                size="small"
                            />

                            <Button
                                type="submit"
                                className={classes.btn}
                                variant="contained"
                            >
                                {todo._id ? "Update Todo" : "Create Todo"}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
};

export default TodoForm;
