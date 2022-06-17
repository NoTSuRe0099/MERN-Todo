import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ShowSnackbar = (props) => {
    return (
        <Snackbar
            Transition="Fade"
            anchorOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
            open={props.isVisible}
            autoHideDuration={3000}
            onClose={props.handlClose}
        >
            <Alert
                onClose={props.handlClose}
                severity={props.type || "info"}
                sx={{ width: "max-content" }}
            >
                {props.message}
            </Alert>
        </Snackbar>
    );
};

export default React.memo(ShowSnackbar);

//  <Stack spacing={2} sx={{ width: "100%" }}>
//      {/* <Alert severity="error">This is an error message!</Alert>
//       <Alert severity="warning">This is a warning message!</Alert>
//       <Alert severity="info">This is an information message!</Alert>
//       <Alert severity="success">This is a success message!</Alert> */}
//  </Stack>;
