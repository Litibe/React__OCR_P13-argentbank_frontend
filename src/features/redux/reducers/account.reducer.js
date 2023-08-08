const initialState = {};

export default function accountsUser(state = initialState, action) {
    switch (action.type) {
        case "GET_LIST_USER_ACCOUNTS":
            return { ...state, accounts: action.accounts };
        case "GET_LIST_TRANSACTIONS_ACCOUNT_SELECTED":
            return { ...state, transactions: action.transactions };
        case "USER_LOGOUT":
            return {};
        default:
            return state;
    }
}
