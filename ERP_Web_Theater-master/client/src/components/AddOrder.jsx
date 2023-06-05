import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder, getGenre } from "../store/actions/Message";
import LoadingButton from '@mui/lab/LoadingButton';

const AddOrders = () => {
  //const genres = useSelector((state) => state.genreReducer);
  const [loading,setLoading]=useState(false);
  
  const initialOrderState = {
    id: null,
    date: ""
    //genreId: "",
  };
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getGenre());
  // }, [dispatch]);

  const navigate = useNavigate();
  const [order, setOrder] = useState(initialOrderState);
  const [submitted, setSubmitted] = useState(false);
  console.log(order);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOrder({ ...order, [name]: value });
  };

  const saveOrder = () => {
    setLoading(true);
    const { date} = order;
    console.log('order',order)
    dispatch(createOrder(
      date    
      ))
      .then((data) => {
        setOrder({
          id: data.id,
          date: data.date,
          //genreId: data.genres.content.id,
        });
        setSubmitted(true);
       
      })
      .then(() => {
        navigate(`/api/order`);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const newOrder = () => {
    setOrder(initialOrderState);
    setSubmitted(false);
  };
  return (
    <div>
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newOrder}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="order">Porudzbina</label>
            <input
              type="text"
              className="form-control"
              id="date"
              required
              text="order name"
              value={order.id}
              onChange={handleInputChange}
              name="id"
            />
          </div>            
          <div className="form-group">
            <label htmlFor="order">Porudzbina</label>
            <input
              type="text"
              className="form-control"
              id="status"
              required
              text="order status"
              value={order.Orderstatus}
              onChange={handleInputChange}
              name="Orderstatus"
            />
          </div>     
          {/*      <div className="form-group">
            <label for="genre">Zanr</label>
            <select id="genreId" name="genreId" onChange={handleInputChange}>
              {genres.content &&
                genres.content.map((data) => (
                  <>
                    <option value="genreId">{data.id}</option>
                  </>
                ))}
            </select>
          </div> */}
          <LoadingButton loading={loading} onClick={saveOrder} variant="outlined">
            Submit
          </LoadingButton>
        </div>
      )}
    </div>
  </div>
);
}

export default AddOrders;

