import {
  SET_MESSAGE,
  CLEAR_MESSAGE,
  DELETE_THEATERS,
  GET_THEATERS,
  GET_BOOKS,
  CREATE_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK,
  GET_BOOKS_BY_ID,
  GET_ORDERS,
  CREATE_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER,
  GET_ORDERS_BY_ID,
  DELETE_ORDERITEM,
  UPDATE_ORDERITEM,
  CREATE_ORDERITEM,
  GET_ORDERSITEMS_BY_ID,
  GET_ORDERITEMS,
  GET_GENRES,
  GET_GENRES_BY_ID ,
  CREATE_GENRE,
  UPDATE_GENRE,
  DELETE_GENRE,


} from "./Types";
import DataService from "../services/DataService";

export const setMessage = (message) => ({
  type: SET_MESSAGE,
  payload: message,
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});




//book
export const getBooks = () => async (dispatch) => {
  try {
    const res = await DataService.getAllBooks();
    dispatch({
      type: GET_BOOKS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getBooksById = (id) => async (dispatch) => {
  try {
    const res = await DataService.getByIdBook(id);
    console.log('res',res)
    dispatch({
      type: GET_BOOKS_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
export const createBook =
  (Bookname, bookAuthorId,bookPublisherId,bookGenreId,bookLanguageId,orderItemId) => async (dispatch) => {
    try {
      const res = await DataService.createBook({
        Bookname,
        bookAuthorId,
        bookPublisherId,
        bookGenreId,
        bookLanguageId,
        orderItemId
      });
      dispatch({ type: CREATE_BOOK, payload: res.data });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
export const updateBook = (id, data) => async (dispatch) => {
  try {
    const res = await DataService.updateBook(id, data);
    dispatch({
      type: UPDATE_BOOK,
      payload: data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const deleteBook = (id) => async (dispatch) => {
  try {
    await DataService.removeBook(id);
    dispatch({
      type: DELETE_BOOK,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};


//Order
export const getOrders = () => async (dispatch) => {
  try {
    const res = await DataService.getAllOrders();
    dispatch({
      type: GET_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getOrdersById = (id) => async (dispatch) => {
  try {
    const res = await DataService.getByIdOrder(id);
    console.log('res',res)
    dispatch({
      type: GET_ORDERS_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
export const createOrder=(id, date, status) => async (dispatch) => {
    try {
      const res = await DataService.createOrder({
       date,
       status
      });
      dispatch({ type: CREATE_ORDER, payload: res.data });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
export const updateOrder = (id, data, status) => async (dispatch) => {
  try {
    const res = await DataService.updateOrder(id, data);
    dispatch({
      type: UPDATE_ORDER,
      payload: data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const deleteOrder = (id) => async (dispatch) => {
  try {
    await DataService.removeOrder(id);
    dispatch({
      type: DELETE_ORDER,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

//orderItems
export const getOrderItems = () => async (dispatch) => {
  try {
    const res = await DataService.getAllOrderItems();
    dispatch({
      type: GET_ORDERITEMS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getOrderItemsById = (id) => async (dispatch) => {
  try {
    const res = await DataService.getOrderItemsById(id);
    console.log('res',res)
    dispatch({
      type: GET_ORDERSITEMS_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
export const createOrderItem =(id, price, amount) => async (dispatch) => {
    try {
      const res = await DataService.createOrder({
        price,
        amount
      });
      dispatch({ type: CREATE_ORDERITEM, payload: res.data });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
export const updateOrderItem = (id, price, amount) => async (dispatch) => {
  try {
    const res = await DataService.updateOrderItem(id,price, amount);
    dispatch({
      type: UPDATE_ORDERITEM,
      payload: price,
      payload: amount,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const deleteOrderItem = (id) => async (dispatch) => {
  try {
    await DataService.removeOrderItem(id);
    dispatch({
      type: DELETE_ORDERITEM,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getGenres = () => async (dispatch) => {
  try {
    const res = await DataService.getAllGenre();
    dispatch({
      type: GET_GENRES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getGenresbById = (id) => async (dispatch) => {
  try {
    const res = await DataService.getByIdGenre(id);
    console.log('res',res)
    dispatch({
      type: GET_GENRES_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
export const createGenre =
  (genreName) => async (dispatch) => {
    try {
      const res = await DataService.createGenre({
        
        genreName,
        
      });
      dispatch({ type: CREATE_GENRE, payload: res.data });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
export const updateGenre= (id, data) => async (dispatch) => {
  try {
    const res = await DataService.updateGenre(id, data);
    dispatch({
      type: UPDATE_GENRE,
      payload: data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const deleteGenre = (id) => async (dispatch) => {
  try {
    await DataService.removeGenre(id);
    dispatch({
      type: DELETE_GENRE,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};