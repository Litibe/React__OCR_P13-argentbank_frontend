import axios from "axios";
import { toast } from "react-toastify";

export const postUserLogin = (data) => {
    return async (dispatch) => {
        return await axios
            .post("http://localhost:8000/api/v1/user/login", data)
            .then((res) => {
                return dispatch({
                    type: "POST__USER_LOGIN",
                    token: res.data.body.token,
                });
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 400) {
                        toast.warn(error.response.data.message, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });
                    } else if (error.response.status === 401) {
                        toast.error("Merci de verifier vos identifiants", {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });
                    } else if (error.response.status === 500) {
                        toast.error(error.response.data.message, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });
                    }
                } else {
                    toast.error(
                        "Impossible de se connecter, Serveur Login HS",
                        {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        }
                    );
                }
            });
    };
};

export const setUserTokenWithLocalStorage = (token) => {
    return (dispatch) => {
        return dispatch({ type: "SET__USERTOKEN_LOCALSTORAGE", token: token });
    };
};

export const obtainUserDetails = (token) => {
    return (dispatch) => {
        return axios
            .post(
                "http://localhost:8000/api/v1/user/profile",
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((res) => {
                return dispatch({
                    type: "POST__USER_OBTAIN_DETAILS",
                    email: res.data.body.email,
                    firstName: res.data.body.firstName,
                    lastName: res.data.body.lastName,
                    createdAt: res.data.body.createdAt,
                    updateAt: res.data.body.updatedAt,
                    id: res.data.body.id,
                });
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 400) {
                        toast.warn(error.response.data.message, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });
                    } else if (error.response.status === 401) {
                        toast.error(
                            "Your session is expired, please reconnect you",
                            {
                                position: toast.POSITION.BOTTOM_RIGHT,
                            }
                        );
                    } else if (error.response.status === 500) {
                        toast.error(error.response.data.message, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });
                    }
                    return dispatch({
                        type: "POST__USER_OBTAIN_DETAILS",
                        token: null,
                    });
                }
            });
    };
};

export const putUserDetails = (token, putData) => {
    return (dispatch) => {
        return axios
            .put("http://localhost:8000/api/v1/user/profile", putData, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                toast.success(res.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                return dispatch({
                    type: "PUT__USER_DETAILS",
                    email: res.data.body.email,
                    firstName: res.data.body.firstName,
                    lastName: res.data.body.lastName,
                    createdAt: res.data.body.createdAt,
                    updateAt: res.data.body.updatedAt,
                    id: res.data.body.id,
                });
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 400) {
                        toast.warn(error.response.data.message, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });
                    } else if (error.response.status === 401) {
                        toast.error(error.response.data.message, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });
                    } else if (error.response.status === 500) {
                        toast.error(error.response.data.message, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });
                    }
                    return dispatch({
                        type: "PUT__USER_DETAILS",
                        data: null,
                    });
                }
            });
    };
};

export const userLogout = () => {
    localStorage.removeItem("tokenAccessBank");
    return (dispatch) => {
        return dispatch({ type: "USER_LOGOUT" });
    };
};
