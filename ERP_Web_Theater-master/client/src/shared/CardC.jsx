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
import axios from 'axios';

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

  const amountItem=orderItem.content && orderItem.content.map(t=>t.amount).find(p=>p);
  const amountItemId=orderItem.content && orderItem.content.map(t=>t.id).find(p=>p);
 // console.log(amountItemId,'id')
  const [amount,setAmount]=useState(amountItem || 0 );
console.log('amount',amount)

const incrementAmount=()=>{
  setAmount(prevAmount=>prevAmount+1);
}

const decrementAmount=()=>{
  setAmount(prevAmount=>prevAmount-1);
}

const updateAmount=async()=>{
  try{
    await axios.put(`http://localhost:8080/orderItem-amount/${amountItemId}`,{amount});
    console.log('Amount updated successfully')
  }catch(err){
    console.error(err)
  }
}

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
            <Typography sx={{ mb: 1.5, paddingTop: 2 }} color="text.secondary">
              <h6>Kolicina: {amount || '5'}</h6>
            </Typography>
     
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
          <Button size="small" onClick={decrementAmount} style={{ fontSize: 12 }}>
            -
          </Button>
          <Button size="small" onClick={incrementAmount} style={{ fontSize: 12 }}>
            +
          </Button>
        </CardActions>
        <CardActions style={{ justifyContent: "center" }}>
          <Link to={`/book-payment/` + data.id}>
            <Button size="small" style={{ fontSize: 12, width: 100 }} onClick={updateAmount}>
              ADD CARD
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Container>
  );
};
export default CardC;
