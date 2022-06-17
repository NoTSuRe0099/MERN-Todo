import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
    const { Component } = props;
    const { isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate();
    React.useEffect(() => {
        if (!isAuthenticated) {
            navigate("/authentication");
        }
    }, [isAuthenticated, navigate]);

    return (
        <>
            <Component />
        </>
    );
};

export default Protected;
