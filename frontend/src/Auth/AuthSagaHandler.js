import { call, put } from "redux-saga/effects";
import { loginSuccess, resetAuth } from "./AuthSlice";
import { startLoading, stopLoading } from "../Reducers/UiSlice";
import { authApiCall, baseApiCall } from "../Services/apiService";

export function* loginUser(action) {
    try {
        yield put(startLoading());
        const data = yield call(() =>
            authApiCall({
                url: "/auth/login",
                method: "POST",
                data: {
                    email: action.payload.email,
                    password: action.payload.password,
                },
            })
        );
        console.log(data);
        yield put(loginSuccess(data));

        yield put(stopLoading());
    } catch (error) {
        yield put(stopLoading());
        console.log(error.response);
    }
}

export function* RegisterUserHandler(action) {
    try {
        yield put(startLoading());
        const data = yield call(() =>
            authApiCall({
                url: "/auth/register",
                method: "POST",
                data: {
                    username: action.payload.username,
                    email: action.payload.email,
                    password: action.payload.password,
                },
            })
        );

        yield put(
            loginSuccess(data)
        );

        yield put(stopLoading());
    } catch (error) {
        yield put(stopLoading());
        console.log(error);
    }
}

export function* LogoutUserHandler(action) {
    try {
        yield put(startLoading());
        const refresh_token = action.payload;
        const data = yield call(() =>
            baseApiCall({
                url: "/logout",
                method: "DELETE",
                data: {
                    refresh_token,
                },
            })
        );

        yield put(resetAuth());
        yield put(stopLoading());
    } catch (error) {
        yield put(stopLoading());
        console.log(error);
    }
}
