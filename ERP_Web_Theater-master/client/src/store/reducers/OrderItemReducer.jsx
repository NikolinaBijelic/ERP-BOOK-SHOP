import {
    CREATE_ORDERITEM,
    UPDATE_ORDERITEM,
    DELETE_ORDERITEM,
    GET_ORDERITEMS,
    GET_ORDERSITEMS_BY_ID
  } from "../actions/Types";
  
  const initialState = [];
  
  const OrderItemReducer = (orderitems = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case GET_ORDERITEMS:
        return payload;
      case GET_ORDERSITEMS_BY_ID:
        return orderitems.find((p)=>p.id===payload.id);
      case CREATE_ORDERITEM:
        return [...orderitems, payload];
      case UPDATE_ORDERITEM:
        return orderitems.map((orderitems) => {
          if (orderitems.id === payload.id) {
            return {
              ...orderitems,
              ...payload,
            };
          } else {
            return orderitems;
          }
        });
      case DELETE_ORDERITEM:
        return orderitems.filter(({ id }) => id !== payload.id);
      default:
        return orderitems;
    }
  };
  
  export default OrderItemReducer;
  