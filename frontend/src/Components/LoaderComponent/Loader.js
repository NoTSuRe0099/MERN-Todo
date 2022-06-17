import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = (props) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        zIndex: "1000",
        width: "100%",
        height: "100vh",
        display: `${props.isLoading ? 'flex' : 'none' }`,
        
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "absolute",
          top: "0",
          left: "0",
          background: "black",
          opacity: "15%",
        }}
      ></div>
      <CircularProgress />
      <h3>Loading...</h3>
    </div>
  );
};

export default Loader;
