import { combineReducers } from "redux";
import auth from "./Auth";
import message from "./Message";
import bookReducer from "./BookReducer";
import orderReducer from "./OrderReducer";
import orderItemReducer from "./OrderItemReducer";
import genreReducer from "./GenreReducer";
export default combineReducers({
  auth,
  message,
  bookReducer,
  orderReducer,
  orderItemReducer,
  genreReducer
});
