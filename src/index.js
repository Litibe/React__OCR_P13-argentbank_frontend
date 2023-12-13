import reportWebVitals from "./reportWebVitals";

import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Router from "./Router/router.js";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./Store/index.js";
import "./assets/css/index.css";
import "react-toastify/dist/ReactToastify.css";

const router = Router();
const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configureStore({
    reducer: rootReducer,
    devTools: true,
});

root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
