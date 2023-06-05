import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const ButtonC = (props, type = "button") => {
  return (
    <>
      <Stack spacing={2} direction="row">
        <Button variant="outlined" type={type} onClick={props.onClick}>
          {props.children}
        </Button>
      </Stack>
    </>
  );
};

export default ButtonC;
