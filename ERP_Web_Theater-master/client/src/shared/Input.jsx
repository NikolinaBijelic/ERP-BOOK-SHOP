import React from "react";
import TextField from "@mui/material/TextField";

const Input = (props) => {
  return (
    <>
      <TextField
        id="standard-basic"
        label={props.label}
        variant="standard"
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </>
  );
};

export default Input;
