import { takeLatest } from "redux-saga/effects";
import {
    loginUser,
    LogoutUserHandler,
    RegisterUserHandler,
} from "../Auth/AuthSagaHandler";
import {
    getTodosHandler,
    addTodosHandler,
    deleteTodoHandler,
    getTodoHandler,
    toggleCompleteHandler,
} from "../actions/TodoSagaHandlers";
import {
    GetTodos,
    AddTodo,
    DeleteTodo,
    GetTodo,
    toggleTodo,
} from "../Reducers/apiTodoSlice";
import {
    loginRequest,
    logoutRequest,
    RegisterRequest,
} from "../Auth/AuthSlice";

function* watcherSaga() {
    //* All sagas here ------>

    yield takeLatest(GetTodos.type, getTodosHandler);
    yield takeLatest(AddTodo.type, addTodosHandler);
    yield takeLatest(DeleteTodo.type, deleteTodoHandler);
    yield takeLatest(GetTodo.type, getTodoHandler);
    yield takeLatest(toggleTodo.type, toggleCompleteHandler);

    //* Auth sagas here ------>
    yield takeLatest(loginRequest.type, loginUser);
    yield takeLatest(RegisterRequest.type, RegisterUserHandler);
    yield takeLatest(logoutRequest.type, LogoutUserHandler);
}

export default watcherSaga;
