import { createSlice } from "@reduxjs/toolkit";

const uiControllersSlice = createSlice({
    name: "uiControllers",
    initialState: {
        isLoading: false,
        snackbar: {
            isVisible: false,
            message: "",
            type: "info",
        },
    },

    reducers: {
        startLoading: (state, action) => {
            state.isLoading = true;
        },
        stopLoading: (state, action) => {
            state.isLoading = false;
        },
        SnackbarError: (state, action) => {
            state.snackbar.isVisible = true;
            state.snackbar.message = action.payload;
            state.snackbar.type = "error";
        },
        SnackbarSuccess: (state, action) => {
            state.snackbar.isVisible = true;
            state.snackbar.message = action.payload;
            state.snackbar.type = "success";
        },
        SnackbarInfo: (state, action) => {
            state.snackbar.isVisible = true;
            state.snackbar.message = action.payload;
            state.snackbar.type = "info";
        },
        closeSnackbar: (state, action) => {
            state.snackbar.isVisible = false;
            state.snackbar.message = "";
            state.snackbar.type = "";
        },
    },
});

export const {
    startLoading,
    stopLoading,
    SnackbarError,
    SnackbarSuccess,
    SnackbarInfo,
    closeSnackbar,
} = uiControllersSlice.actions;

export default uiControllersSlice.reducer;
