import {
    createBrowserRouter,
    createRoutesFromElements,
    useNavigate,
    Route,
    useLocation,
    Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomePage from "../components/HomePage";
import SignIn from "../components/SignIn";
import { userLogout } from "../Store/actions/user.actions";
import { accountLogout } from "../Store/actions/account.actions";
import Profile from "../components/Profile";
import Account from "../components/Account";

function ProtectedRoute({ children }) {
    const location = useLocation();
    const token = useSelector((state) => state.userDetails.token);
    if (token === null) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" state={location.pathname} />;
    }
    return children;
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

function RedirectHome() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/", { replace: true });
    }, [navigate]);
}
export default function Router() {
    const router = createBrowserRouter(
        createRoutesFromElements(
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
                    path="/login"
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
        )
    );
    return router;
}
