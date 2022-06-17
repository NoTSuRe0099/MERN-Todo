import { createSlice } from "@reduxjs/toolkit";

//create a basic slice
const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    todo: {},
  },
  reducers: {
    //add todo
    addTodo: (state, action) => {
      state.todos = [
        ...state.todos,
        { id: Date.now(), ...action.payload, completed: false },
      ];
    },

    //remove todo
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    //get todo data
    getTodo: (state, action) => {
      state.todo = action.payload;
    },

    //update todo
    updateTodo: (state, action) => {
      const index = state.todos.findIndex((t) => t.id === action.payload.id);
      state.todos[index] = action.payload;
      state.todo = {};
    },

    //toggle todo
    toggleTodo: (state, action) => {
      const index = state.todos.findIndex((t) => t.id === action.payload);
      state.todos[index].completed = !state.todos[index].completed;
    },
  },
});

//export the slice
export const { addTodo, removeTodo, getTodo, updateTodo, toggleTodo } =
  todosSlice.actions;

//export the reducer
export default todosSlice.reducer;
