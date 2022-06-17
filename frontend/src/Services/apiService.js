import axios from "axios";
import { resetAuth, setTokens } from "../Auth/AuthSlice";
import { SnackbarError, stopLoading } from "../Reducers/UiSlice";
import store from "../Store/store";
import jwt_decode from "jwt-decode";

export const authApiCall = async (reqBody) => {
    try {
        const { data } = await axios({
            ...reqBody,
            headers: {
                "Content-Type": "application/json",
            },
            timeout: 5000,
        });
        store.dispatch(resetAuth());
        return data;
    } catch (error) {
        store.dispatch(SnackbarError(error.response.data.message));
        store.dispatch(stopLoading());
    }
};

const getRefreshToken = async () => {
    console.log("getRefreshToken");
    const refreshToken = store.getState()?.user?.refresh_token;
    if (!refreshToken) {
        return null;
    }
    try {
        const { data } = await axios({
            url: "/auth/refresh",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                refresh_token: refreshToken,
            },
        });
        store.dispatch(setTokens(data));

        return data;
    } catch (error) {
        if (error.response.status === 401) {
            console.log("401 error =>", error.response.data);
            store.dispatch(stopLoading());
            store.dispatch(resetAuth());
        }
        return null;
    }
};

const AuthAxios = axios.create();

AuthAxios.interceptors.request.use(
    async (config) => {
        const decodedToken = jwt_decode(store.getState()?.user?.access_token);
        console.log("decodedToken", decodedToken);
        const currentTime = new Date();
        if (decodedToken.exp * 1000 < currentTime.getTime()) {
            const tokenRes = await getRefreshToken();
            console.log(tokenRes);
            if (tokenRes) {
                config.headers.Authorization = tokenRes.access_token;
            }
        }

        return config;
    },
    async (error) => {
        return Promise.reject(error);
    }
);

// export const baseApiCall = async (options) => {
//     const { url, method, data, headers } = options;
//     const token = store.getState()?.user?.access_token;
//     const config = {
//         method,
//         url,
//         data,
//         headers: {
//             "Content-Type": "application/json",
//             ...headers,
//             Authorization: token,
//         },
//     };

//     try {
//         const response = await AuthAxios(config);
//         return response.data;
//     } catch (error) {
//         if (error.response.status === 401) {
//             console.log("401 error =>", error.response.data);
//             // store.dispatch(resetAuth());
//         }
//         store.dispatch(SnackbarError(error.response.data.message));
//         store.dispatch(stopLoading());
//         return error.response.data;
//     }
// };

export const baseApiCall = async (parameters) => {
    try {
        const response = await AuthAxios({
            ...parameters,
            headers: {
                "Content-Type": "application/json",
                Authorization: store.getState()?.user?.access_token,
            },
            timeout: 5000,
        });
        if (response.status >= 200 && response.status <= 299) {
            return await response.data;
        } else {
            throw new Error("Unexpected error!!! :(");
        }
    } catch (error) {
        if (error.response?.status === 401) {
            console.log("401 error =>", error.response?.data);
            // store.dispatch(resetAuth());
            // return (window.location.href = "/authentication");
        } else {
            console.log("error =>", error);
            // store.dispatch(SnackbarError(error.response.data.message));
        }
    }
};
