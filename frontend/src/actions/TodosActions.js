import { AddTodo, GetTodo, GetTodos } from "../Features/apiTodoSlice";
import { startLoading, stopLoading } from "../Features/UiSlice";
import { baseApiCall } from "../helpers/apiService";

export const getTodosAction = () => async (dispatch) => {
  try {
    dispatch(startLoading());

    const { data } = await baseApiCall({
      url: "/todos",
      method: "GET",
    });

    dispatch(GetTodos(data));

    dispatch(stopLoading());
  } catch (error) {
    console.log(error);
  }
};

export const AddTodoAction = (values) => async (dispatch) => {
  try {
    dispatch(startLoading());

    await baseApiCall({
      url: values._id ? `/todos/${values._id}` : "/todos",
      method: values._id ? "PUT" : "POST",
      data: values,
    });

    dispatch(stopLoading());

    dispatch(getTodosAction());
  } catch (error) {
    console.log(error);
  }
};

export const DeleteTodoAction = (id) => async (dispatch) => {
  try {
    dispatch(startLoading());

    await baseApiCall({
      url: `/todos/${id}`,
      method: "DELETE",
    });
    dispatch(stopLoading());

    dispatch(getTodosAction());
  } catch (error) {
    console.log(error);
  }
};

export const getTodoAction = (id) => async (dispatch) => {
  try {
    dispatch(startLoading());

    const { data } = await baseApiCall({
      url: `/todos/${id}`,
      method: "GET",
    });
    console.log(data);

    dispatch(GetTodo(data));

    dispatch(stopLoading());
  } catch (error) {
    console.log(error);
  }
};
