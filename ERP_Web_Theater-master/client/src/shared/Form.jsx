import React from "react";

const Form = (props) => {
  return (
    <form autoComplete="off" onSubmit={props.onSubmit}>
      {props.children}
    </form>
  );
};

export default Form;
