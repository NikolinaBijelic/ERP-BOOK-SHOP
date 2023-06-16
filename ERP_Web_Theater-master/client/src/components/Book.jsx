import React, { useState, useEffect } from "react";
import StripeContainer from "./StripeContainer";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DataService from "../store/services/DataService";
import Container from "@mui/material/Container";

import { useParams } from "react-router-dom";

const Book = () => {
 
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

  const getBooks= (id) => {
    DataService.getByIdBook(id)
      .then((response) => {
        setCurrentBook(response.data);
        console.log('response',response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const { id } = useParams();
  useEffect(() => {
    getBooks(id);
  }, [id]);

  const [showItem, setShowItem] = useState(false);


  return (
    <div>
      <div>
        <Container
          sx={{
            paddingBottom: 5,
            paddingTop: 5,
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
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Knjiga
              </Typography>
              <Typography variant="h5" component="div">
                {currentBook.Bookname}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <h6 style={{ paddingTop: 10 }}>Kolicina: {currentBook.orderItem && currentBook.orderItem.amount}</h6>
              </Typography>
            </CardContent>
          </Card>
        </Container>
        {showItem ? (
          <StripeContainer />
        ) : (
          <div>
                 <h3>$ {currentBook.orderItem && currentBook.orderItem.price || '900'}</h3> 
            <Container
              style={{
                width: "250px",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <button size="small" onClick={() => setShowItem(true)}>
                PAYMENT
              </button>
            </Container>
          </div>
        )}
      </div>
    </div>
  );
};

export default Book;
