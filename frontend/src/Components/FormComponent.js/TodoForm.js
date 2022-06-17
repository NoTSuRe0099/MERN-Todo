import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { Formik, Form } from "formik";
import TextFiled from "../TextField/TextFiled";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo } from "../../Reducers/TodosSlice";

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
    const dispatch = useDispatch();
    const todoData = useSelector((state) => state.todos.todo);
    console.log(todoData);
    const classes = useStyles();
    const schema = Yup.object({
        title: Yup.string()
            .required("Title should not be empty")
            .min(3, "Title should be at least 3 characters"),
        desc: Yup.string().required("Enter Todo Description"),
    });

    return (
        <Box sx={{ marginY: "50px" }} className={classes.root}>
            <Formik
                initialValues={todoData.id ? todoData : { title: "", desc: "" }}
                enableReinitialize
                validationSchema={schema}
                onSubmit={(values, { resetForm }) => {
                    todoData.id
                        ? dispatch(updateTodo(values))
                        : dispatch(addTodo(values));
                    resetForm();
                }}
            >
                {() => (
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
                            name="desc"
                            type="text"
                            size="small"
                        />

                        <Button
                            type="submit"
                            className={classes.btn}
                            variant="contained"
                        >
                            {todoData.id ? "Update Todo" : "Create Todo"}
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default TodoForm;
