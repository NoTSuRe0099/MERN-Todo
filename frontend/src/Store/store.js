import { configureStore, combineReducers } from "@reduxjs/toolkit";
import apiTodoSlice from "../Reducers/apiTodoSlice";
import TodosSlice from "../Reducers/TodosSlice";
import uiControllersSlice from "../Reducers/UiSlice";
import createSagaMiddleware from "redux-saga";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import watcherSaga from "./watcherSaga";
import AuthSlice from "../Auth/AuthSlice";

const persistConfig = {
    key: "todosPractice",
    storage,
};

const rootReducer = combineReducers({
    todos: TodosSlice,
    apiTodoList: apiTodoSlice,
    uiContollers: uiControllersSlice,
    user: AuthSlice,
});

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = [sagaMiddleware];

const store = configureStore({
    reducer: persistedReducer,
    middleware: middleware,
});

export default store;

sagaMiddleware.run(watcherSaga);
