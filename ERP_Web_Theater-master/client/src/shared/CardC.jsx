import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getOrderItems } from "../store/actions/Message";
import { useDispatch, } from "react-redux";
import DataService from "../store/services/DataService";

const CardC = ({ data }) => {
 // const book = useSelector((state) => state.bookReducer);

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

  const orderItem = useSelector((state) => state.orderItemReducer);

  const dispatch = useDispatch();


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

  const { id } = useParams();
const price=orderItem.content && orderItem.content.map(t=>t.price).find(p=>p)

  useEffect(() => {
    getBook(id);
  }, [id]);

  useEffect(() => {
    dispatch(getOrderItems())
  }, [dispatch]);

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
        
              <Typography sx={{ mb: 1.5, paddingTop: 2 }} color="text.secondary">
              <h6>Cena: {price || '900'}</h6>
            </Typography>
         
     
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
