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
import {
    obtainUserDetails,
    userLogout,
    setUserTokenWithLocalStorage,
} from "../features/redux/actions/user.actions";
import Profile from "../components/Profile";

const ProtectedRoute = ({ redirectPath = "/sign-in", children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let getUserDetails = useSelector((state) => state.userDetails);
    const localTokenAccess = localStorage.getItem("tokenAccess")
        ? localStorage.getItem("tokenAccess")
        : null;
    useEffect(() => {
        if (getUserDetails.token === undefined && localTokenAccess === null) {
            navigate(redirectPath);
        } else if (
            getUserDetails.token === undefined &&
            localTokenAccess !== null
        ) {
            dispatch(setUserTokenWithLocalStorage(localTokenAccess));
            dispatch(obtainUserDetails(localTokenAccess));
        }
    }, [getUserDetails, localTokenAccess]);
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
                    <Route index path="*" element={<RedirectHome />}></Route>
                </Route>
            </>
        )
    );
    return router;
}
