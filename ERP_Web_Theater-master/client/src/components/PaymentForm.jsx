import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useSelector } from "react-redux";
import "./PaymentFormStyle.css";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const PaymentForm = ({data}) => {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log('currentUser',user)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:8080/payment", {
          amount:data.orderItem && data.orderItem.price,
          id: id,
          customer:user.email
        });
        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };
  return (
    <>
      {!success ? (
        <form
          style={{ justifyContent: "center", alignContent: "center" }}
          onSubmit={handleSubmit}
        >
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>

          <button className="btn_payment">Pay</button>
        </form>
      ) : (
        <div>
          <h2>Uspesno ste kupili knjigu {data.Bookname}</h2>
          <div>
          <h3>Order Details:</h3>
          <p>Order ID: {data.orderItem.orderId}</p>
          <p>Order amount: {data.orderItem.amount}</p>
          <p>Customer Name: {user.username}</p>
          <p>Order price: {data.orderItem.price}</p>
        </div>
        </div>
      )}
    </>
  );
};

export default PaymentForm;
