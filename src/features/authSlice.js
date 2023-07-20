import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: undefined,
    },
    reducers: {
        login: async (usernameUser, passwordUser, rememberUser) => {
            console.log(usernameUser);
            toast("Demande de connexion... ", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
            });
            const response = await fetch(
                "http://localhost:3001/api/v1/user/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        usernameUser,
                        passwordUser,
                    }),
                }
            );
            const data = await response.json();
            if (response.status === 200) {
                localStorage.setItem("authTokens", JSON.stringify(data));
            } else if (response.status === 400) {
                toast.warn(
                    "Merci de vérifier vos informations de connexion ... ",
                    {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 2000,
                    }
                );
            } else {
                toast.error("Impossible de se connecter ... ", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000,
                });
            }
        },
        logged: (state) => {
            state.token = localStorage.getItem("authTokens")
                ? JSON.parse(localStorage.getItem("authTokens"))
                : null;
        },
        logout: (state) => {
            localStorage.removeItem("authTokens");
            state.token = undefined;
        },
    },
});

export const { login, logged, logout } = authSlice.actions;

export default authSlice.reducer;
