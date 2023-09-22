import {
    createBrowserRouter,
    createRoutesFromElements,
    useNavigate,
    Route,
    Outlet,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomePage from "../components/HomePage";
import SignIn from "../components/SignIn";
import { userLogout } from "../features/redux/actions/user.actions";
import { accountLogout } from "../features/redux/actions/account.actions";
import Profile from "../components/Profile";
import Account from "../components/Account";

const ProtectedRoute = ({ redirectPath = "/sign-in", children }) => {
    const navigate = useNavigate();
    let getUserDetails = useSelector((state) => state.userDetails);
    const localtokenAccessBank = localStorage.getItem("tokenAccessBank")
        ? localStorage.getItem("tokenAccessBank")
        : null;
    useEffect(() => {
        if (
            getUserDetails.token === undefined &&
            localtokenAccessBank === null
        ) {
            navigate(redirectPath);
        }
    }, [getUserDetails, localtokenAccessBank, navigate, redirectPath]);
    return children ? children : <Outlet />;
};

function RedirectHome() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/", { replace: true });
    }, [navigate]);
}

function LogOut() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    dispatch(userLogout());
    dispatch(accountLogout());
    useEffect(() => {
        navigate("/", { replace: true });
    }, [navigate]);
}

export default function Router() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route>
                    <Route
                        index
                        path="/"
                        element={
                            <>
                                <Header />
                                <HomePage />
                                <Footer />
                            </>
                        }
                    ></Route>
                    <Route
                        path="/sign-in"
                        element={
                            <>
                                <Header />
                                <SignIn />
                                <Footer />
                            </>
                        }
                    />
                    <Route path="/sign-out" element={<LogOut />} />
                    <Route
                        path="/profile/"
                        element={
                            <ProtectedRoute>
                                <Header />
                                <Profile />
                                <Footer />
                            </ProtectedRoute>
                        }
                    ></Route>
                    <Route
                        path="/profile/account/:idAccount/"
                        element={
                            <ProtectedRoute>
                                <Header />
                                <Account />
                                <Footer />
                            </ProtectedRoute>
                        }
                    ></Route>
                    <Route index path="*" element={<RedirectHome />}></Route>
                </Route>
            </>
        )
    );
    return router;
}
