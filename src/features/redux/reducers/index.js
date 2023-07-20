import { combineReducers } from "redux";
import userDetails from "./user.reducer";
import accountReducer from "./account.reducer";

export default combineReducers({
    userDetails,
    accountReducer,
});
