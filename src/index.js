import { StrictMode } from "react";
import reportWebVitals from "./reportWebVitals";

import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Router from "./Router/router.jsx";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./features/redux/reducers";
import "./assets/css/index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const router = Router();
const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configureStore({
    reducer: rootReducer,
    devTools: true,
});

//store.dispatch(postUserLogin());
root.render(
    <Provider store={store}>
        <StrictMode>
            <RouterProvider router={router} />
            <ToastContainer />
        </StrictMode>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
