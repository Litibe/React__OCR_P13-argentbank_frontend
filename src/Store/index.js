import { combineReducers } from "redux";
import userDetails from "./reducers/user.reducer";
import accountsUser from "./reducers/account.reducer";

export default combineReducers({
    userDetails,
    accountsUser,
});
