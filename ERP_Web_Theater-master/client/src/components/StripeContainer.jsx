import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import PaymentForm from "./PaymentForm";

import DataService from "../store/services/DataService";
import { useParams } from "react-router-dom";

const PUBLIC_KEY =
  "pk_test_51LIW2ZFxQfTuV41Y9BAQ9mgNIeZ1f2C4VlVyUSoTliJ04tiqWdgNWPdgBqKIhMNLcYh4JE3DcSf2yKyewWXLR7ye00MKMYtKyt";

const stripeTestPromise = loadStripe(PUBLIC_KEY);
const StripeContainer = ({ onSubmit }) => {
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
  console.log('currentBook',currentBook);
  const { id } = useParams();
  useEffect(() => {
    getBook(id);
  }, [id]);
  return (
    <div>
      <Elements stripe={stripeTestPromise}>
        <PaymentForm onSubmit={onSubmit} data={currentBook}/>
      </Elements>
    </div>
  );
};

export default StripeContainer;
