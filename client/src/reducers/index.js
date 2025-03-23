import { combineReducers } from "redux";

// Import external reducers
import auth from "./auth";
import kings from "./kings";

export default combineReducers({
  auth,
  kings,
});