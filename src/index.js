import { StrictMode } from "react";

import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css";
import Router from "./Router/router.jsx";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import configureStore from "./store";

const router = Router();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={configureStore}>
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
