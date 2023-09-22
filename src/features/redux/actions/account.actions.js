import axios from "axios";

import { toast } from "react-toastify";

export const GET_LIST_USER_ACCOUNTS = "GET_LIST_USER_ACCOUNTS";

export const getUserAccounts = (token) => {
    return (dispatch) => {
        return axios
            .get("http://localhost:8000/api/v1/accounts/", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                return dispatch({
                    type: "GET_LIST_USER_ACCOUNTS",
                    accounts: res.data.body.accounts,
                });
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 400) {
                        toast.warn(error.response.data.message, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });
                    } else if (error.response.status === 500) {
                        toast.error(error.response.data.message, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });
                    }
                    return dispatch({
                        type: "GET_LIST_USER_ACCOUNTS",
                        accounts: null,
                    });
                } else {
                    toast.error("ERROR CONNEXION WITH SERVER", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            });
    };
};

export const GET_LIST_TRANSACTIONS_ACCOUNT =
    "GET_LIST_TRANSACTIONS_ACCOUNT_SELECTED";

export const getTransactionAccount = (token, idAccount) => {
    return (dispatch) => {
        return axios
            .get(
                `http://localhost:8000/api/v1/accounts/${idAccount}/transactions/`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((res) => {
                return dispatch({
                    type: "GET_LIST_TRANSACTIONS_ACCOUNT_SELECTED",
                    transactions: res.data.body.transactions,
                });
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 401) {
                        toast.warn(error.response.data.message, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });
                    } else if (error.response.status === 404) {
                        toast.error(error.response.data.message, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });
                    } else if (error.response.status === 500) {
                        toast.error(error.response.data.message, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });
                    }
                    return dispatch({
                        type: "GET_LIST_TRANSACTIONS_ACCOUNT_SELECTED",
                        transactions: null,
                    });
                } else {
                    toast.error("ERROR CONNEXION WITH SERVER", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            });
    };
};

export const accountLogout = () => {
    return (dispatch) => {
        return dispatch({ type: "USER_LOGOUT" });
    };
};
