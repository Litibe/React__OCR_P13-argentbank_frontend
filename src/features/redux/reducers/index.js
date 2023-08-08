import { combineReducers } from "redux";
import userDetails from "./user.reducer";
import accountsUser from "./account.reducer";

export default combineReducers({
    userDetails,
    accountsUser,
});
