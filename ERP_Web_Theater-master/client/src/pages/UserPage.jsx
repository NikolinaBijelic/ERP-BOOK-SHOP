import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks,getOrderItems } from "../store/actions/Message";
import CardC from "../shared/CardC";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const UserPage = () =>{
  const books = useSelector((state) => state.bookReducer);
  const orderItem = useSelector((state) => state.orderItemReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBooks());
    dispatch(getOrderItems())
  }, [dispatch]);
  return (
    <Grid container>
      {books.content &&
        books.content.map((data = books) => {
          return <CardC data={data} /* orderItem={orderItem.content} *//>;
        })}
    </Grid>
  );
};
export default UserPage;
