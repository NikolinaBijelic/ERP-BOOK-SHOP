import { combineReducers } from "redux";
import auth from "./Auth";
import message from "./Message";
import bookReducer from "./BookReducer";
import orderReducer from "./OrderReducer";


export default combineReducers({
  auth,
  message,
  bookReducer,
  orderReducer,
 
});
