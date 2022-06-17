import { createSlice } from "@reduxjs/toolkit";

const apiTodoSlice = createSlice({
    name: "apiTodoList",
    initialState: {
        todos: [],
        todo: {},
        count: 0,
    },
    reducers: {
        GetTodos: (state, action) => state,
        setTodos: (state, action) => {
            state.todos = action.payload;
            state.count = state.todos.length;
        },
        AddTodo: (state, action) => state,
        DeleteTodo: (state, action) => state,
        GetTodo: (state, action) => state,
        setTodo: (state, action) => {
            state.todo = action.payload;
        },
        toggleTodo: (state, action) => state,
    },
});

export const { GetTodos, setTodos, AddTodo, DeleteTodo, GetTodo, setTodo, toggleTodo } =
    apiTodoSlice.actions;

export default apiTodoSlice.reducer;
