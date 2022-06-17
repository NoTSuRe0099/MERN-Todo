import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        access_token: null,
        refresh_token: null,
        user: {},
    },
    reducers: {
        loginRequest: (state, action) => state,
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
        },
        setTokens: (state, action) => {
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
        },
        logoutRequest: (state, action) => state,
        resetAuth: (state, action) => {
            state.isAuthenticated = false;
            state.access_token = null;
            state.refresh_token = null;
            state.user = {};
        },
        RegisterRequest: (state, action) => state,
    },
});

export const {
    loginRequest,
    loginSuccess,
    RegisterRequest,
    resetAuth,
    setTokens,
    logoutRequest,
} = AuthSlice.actions;

export default AuthSlice.reducer;
