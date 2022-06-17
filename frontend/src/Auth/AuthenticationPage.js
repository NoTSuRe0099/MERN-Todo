import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextFiled from "../Components/TextField/TextFiled";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest, RegisterRequest } from "./AuthSlice";
import { useNavigate } from "react-router-dom";
import { SnackbarInfo } from "../Reducers/UiSlice";

const theme = createTheme();

const Authentication = () => {
    const [register, setRegister] = React.useState(false);
    const { isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const Loginschema = Yup.object({
        email: Yup.string()
            .required("Email is required")
            .email("Email is invalid"),
        password: Yup.string().required("Password is required").min(4),
    });
    const RegisterSchema = Yup.object({
        username: Yup.string().required("Username is required").min(3),
        email: Yup.string()
            .required("Email is required")
            .email("Email is invalid"),
        password: Yup.string().required("Password is required").min(4),
    });

    React.useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
            dispatch(SnackbarInfo("Already Logged in"));
        }
    }, [dispatch, isAuthenticated, navigate]);

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {register ? "Register new account" : "Login"}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                        <Formik
                            initialValues={
                                register
                                    ? {
                                          username: "",
                                          email: "",
                                          password: "",
                                      }
                                    : {
                                          email: "",
                                          password: "",
                                      }
                            }
                            enableReinitialize
                            validationSchema={
                                register ? RegisterSchema : Loginschema
                            }
                            onSubmit={(values, { resetForm }) => {
                                register
                                    ? dispatch(RegisterRequest(values))
                                    : dispatch(loginRequest(values));
                                resetForm();
                            }}
                        >
                            {() => (
                                <Form>
                                    {register && (
                                        <TextFiled
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="username"
                                            label="Username"
                                            name="username"
                                            autoComplete="username"
                                            size="small"
                                            autoFocus
                                        />
                                    )}
                                    <TextFiled
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        size="small"
                                        autoFocus
                                    />
                                    <TextFiled
                                        size="small"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="off"
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Sign In
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                        <Grid container>
                            <Grid item>
                                <Button
                                    onClick={() => setRegister(!register)}
                                    href="#"
                                    variant="body2"
                                    style={{
                                        textDecoration: "underline",
                                        color: "blue",
                                    }}
                                >
                                    {!register
                                        ? "Don't have an account? Register"
                                        : "Already have an account?"}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Authentication;
