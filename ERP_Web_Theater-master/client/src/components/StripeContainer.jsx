import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import PaymentForm from "./PaymentForm";

import DataService from "../store/services/DataService";
import { useParams } from "react-router-dom";

const PUBLIC_KEY =
  "sk_test_51LIW2ZFxQfTuV41Y5i9igpVIsqqo3LLsaY4yDV59eRdn03UHOvmIKyQbQsYZ9p7c0aQS0KcBD1VYlBEApCtbWAwp00TsnBdNaD";

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
  //console.log(currentPerformance.ticket.ticketPrice);
  const { id } = useParams();
  useEffect(() => {
    getBook(id);
  }, [id]);
  return (
    <div>
      <Elements stripe={stripeTestPromise}>
        <PaymentForm onSubmit={onSubmit} />
      </Elements>
    </div>
  );
};

export default StripeContainer;
