import { call, put } from "redux-saga/effects";
import { GetTodos, setTodo, setTodos } from "../Reducers/apiTodoSlice";
import { startLoading, stopLoading } from "../Reducers/UiSlice";
import { baseApiCall } from "../Services/apiService";

export function* getTodosHandler(action) {
    try {
        yield put(startLoading());

        const data = yield call(() =>
            baseApiCall({
                url: "/todos",
                method: "GET",
            })
        );

        yield put(setTodo({}));
        yield put(setTodos(data.todos));

        yield put(stopLoading());
    } catch (error) {
        yield put(stopLoading());
        console.log(error.response);
    }
}

export function* addTodosHandler(action) {
    try {
        yield put(startLoading());

        const { id, title, description } = action.payload;
        console.log(id, title, description);
        yield call(() =>
            baseApiCall({
                url: id ? `/todos/${id}` : "/todos/",
                method: id ? "PUT" : "POST",
                data: { title, description },
            })
        );

        yield put(GetTodos());

        yield put(setTodo({}));

        yield put(stopLoading());
    } catch (error) {
        console.log(error);
    }
}

export function* deleteTodoHandler(action) {
    try {
        yield put(startLoading());

        yield call(() =>
            baseApiCall({
                url: `/todos/${action.payload}`,
                method: "DELETE",
            })
        );

        yield put(GetTodos());

        yield put(stopLoading());
    } catch (error) {
        yield put(stopLoading());
        console.log(error.response.message);
    }
}

export function* toggleCompleteHandler(action) {
    try {
        yield put(startLoading());
        console.log(action.payload);
        yield call(() =>
            baseApiCall({
                url: `/isCompleted/${action.payload}`,
                method: "GET",
            })
        );

        yield put(GetTodos());

        yield put(stopLoading());
    } catch (error) {
        yield put(stopLoading());
        console.log(error.response);
    }

}

export function* getTodoHandler(action) {
    try {
        yield put(startLoading());

        const data = yield call(() =>
            baseApiCall({
                url: `/todos/${action.payload}`,
                method: "GET",
            })
        );

        yield put(setTodo(data));

        yield put(stopLoading());
    } catch (error) {
        yield put(stopLoading());
        console.log(error);
    }
}
