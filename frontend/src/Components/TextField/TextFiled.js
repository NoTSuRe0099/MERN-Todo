import React from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useField, ErrorMessage } from "formik";

const TextFiled = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <TextField
                style={{ minWidth: "300px", width: "100%", marginTop: "10px" }}
                sx={{ width: "80" }}
                id="outlined-basic"
                label={label}
                variant="outlined"
                error={meta.touched && !!meta.error}
                {...field}
                {...props}
            />
            <Typography color="error">
                <ErrorMessage name={field.name} />
            </Typography>
        </div>
    );
};

export default TextFiled;
