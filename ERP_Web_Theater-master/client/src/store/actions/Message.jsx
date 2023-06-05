import {
  SET_MESSAGE,
  CLEAR_MESSAGE,
  CREATE_THEATERS,
  UPDATE_THEATERS,
  DELETE_ALL_THEATERS,
  DELETE_THEATERS,
  GET_THEATERS,
  GET_BOOKS,
  CREATE_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK,
  GET_GENRE,
  GET_BOOKS_BY_ID,
  GET_ORDERS,
  CREATE_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER,
  GET_ORDERS_BY_ID,

} from "./Types";
import DataService from "../services/DataService";

export const setMessage = (message) => ({
  type: SET_MESSAGE,
  payload: message,
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});

//theater
export const getTheater = () => async (dispatch) => {
  try {
    const res = await DataService.getAll();
    dispatch({
      type: GET_THEATERS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
export const deleteTheater = (id) => async (dispatch) => {
  try {
    await DataService.remove(id);
    dispatch({
      type: DELETE_THEATERS,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

//genre
export const getGenre = () => async (dispatch) => {
  try {
    const res = await DataService.getAllGenres();
    dispatch({
      type: GET_GENRE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

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
