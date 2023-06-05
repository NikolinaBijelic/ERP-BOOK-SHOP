import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

import DataService from "../store/services/DataService";
const CardC = ({ data }) => {
  const book = useSelector((state) => state.bookReducer);

  const initialBookState = {
    id: null,
    Bookname: "",
    bookAuthorId: null,
    bookPublisherId:null,
    bookGenreId:null,
    bookLanguageId:null,
    orderItemId:null
    //genreId: "",
  };
  const [currentBook, setCurrentBook] = useState(
    initialBookState
  );
  const getBook = (id) => {
    DataService.getByIdBook(id)
      .then((response) => {
        setCurrentBook(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(currentBook);
  const { id } = useParams();
  useEffect(() => {
    getBook(id);
  }, [id]);
  return (
    <Container
      sx={{
        paddingBottom: 5,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          minWidth: 275,
          width: 140,
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Knjiga
          </Typography>
          <Typography variant="h5" component="div">
            {data.Bookname}
          </Typography>
          {/* <Typography sx={{ mb: 1.5, paddingTop: 2 }} color="text.secondary">
            <h6>Datum izvodjenja:</h6>
            {data.dateOfThePerformance}
          </Typography> */}
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
          <Link to={`/book-payment/` + data.id}>
            <Button size="small" style={{ fontSize: 12, width: 100 }}>
              ADD CARD
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Container>
  );
};
export default CardC;
