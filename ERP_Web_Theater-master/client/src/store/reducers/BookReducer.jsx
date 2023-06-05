import {
  CREATE_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK,
  GET_BOOKS,
  GET_BOOKS_BY_ID
} from "../actions/Types";

const initialState = [];

const BookReducer = (books = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_BOOKS:
      return payload;
    case GET_BOOKS_BY_ID:
      return books.find((p)=>p.id===payload.id);
    case CREATE_BOOK:
      return [...books, payload];
    case UPDATE_BOOK:
      return books.map((book) => {
        if (book.id === payload.id) {
          return {
            ...book,
            ...payload,
          };
        } else {
          return book;
        }
      });
    case DELETE_BOOK:
      return books.filter(({ id }) => id !== payload.id);
    default:
      return books;
  }
};

export default BookReducer;
