import {
    CREATE_ORDER,
    UPDATE_ORDER,
    DELETE_ORDER,
    GET_ORDERS,
    GET_ORDERS_BY_ID
  } from "../actions/Types";
  
  const initialState = [];
  
  const OrderReducer = (orders = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case GET_ORDERS:
        return payload;
      case GET_ORDERS_BY_ID:
        return orders.find((p)=>p.id===payload.id);
      case CREATE_ORDER:
        return [...orders, payload];
      case UPDATE_ORDER:
        return orders.map((order) => {
          if (order.id === payload.id) {
            return {
              ...order,
              ...payload,
            };
          } else {
            return order;
          }
        });
      case DELETE_ORDER:
        return orders.filter(({ id }) => id !== payload.id);
      default:
        return orders;
    }
  };
  
  export default OrderReducer;
  