import listReducer from "./listReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  listReducer: listReducer,
});

export default allReducers;
