import React, { Suspense, lazy } from "react";
import Loader from "./Components/LoaderComponent/Loader";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./Components/NavbarComponent/Navbar";
import StateTodo from "./pages/StateTodo";
import { Routes, Route, useNavigate } from "react-router-dom";
import { closeSnackbar } from "./Reducers/UiSlice";
import { baseApiCall } from "./Services/apiService";
import TodoForm from "./pages/ApiTodoPage/FormComponent/TodoForm";

const Authentication = lazy(() => import("./Auth/AuthenticationPage"));
const ApiTodo = lazy(() => import("./pages/ApiTodoPage/ApiTodo"));
const ShowSnackbar = lazy(() =>
    import("./Components/snackbarComponent/Snackbar")
);

const ProtectedRoute = lazy(() => import("./Auth/ProtectedRoute.js"));

function App() {
    const dispatch = useDispatch();
    const { isLoading, snackbar } = useSelector((state) => state.uiContollers);
    const { isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (isAuthenticated) {
            baseApiCall({
                url: "/auth/me",
                method: "GET",
            }).then((res) => console.log(res));
        }
    }, [isAuthenticated]);

    const handleClose = () => {
        dispatch(closeSnackbar());
    };

    return (
        <>
            <Suspense key="nooob" fallback={<Loader isLoading={isLoading} />}>
                <Loader isLoading={isLoading} />
                {isAuthenticated && <Navbar />}
                <ShowSnackbar
                    type={snackbar.type}
                    message={snackbar.message}
                    isVisible={snackbar.isVisible}
                    handlClose={handleClose}
                />

                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<ProtectedRoute Component={ApiTodo} />}
                    />
                    <Route
                        exact
                        path="/addTodo"
                        element={<ProtectedRoute Component={TodoForm} />}
                    />
                    <Route
                        exact
                        path="/updateTodo/:id"
                        element={<ProtectedRoute Component={TodoForm} />}
                    />
                    <Route
                        exact
                        path="/authentication"
                        element={<Authentication />}
                    />
                </Routes>
            </Suspense>
        </>
    );
}

export default App;
