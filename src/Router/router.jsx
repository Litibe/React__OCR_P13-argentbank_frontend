import {
    createBrowserRouter,
    createRoutesFromElements,
    useNavigate,
    Route,
    Outlet,
} from "react-router-dom";
import { useEffect, useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomePage from "../components/HomePage";
import SignIn from "../components/SignIn";
import User from "../components/User";

const ProtectedRoute = ({ redirectPath = "/connexion", children }) => {
    const navigate = useNavigate();
    //const { userConnected } = useContext(ConfigServerContext);

    function redirectLogin() {
        navigate("/sign-in");
    }

    return children ? children : <Outlet />;
};

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

                    <Route
                        path="/user/"
                        element={
                            <>
                                <Header />
                                <User />
                                <Footer />
                            </>
                        }
                    ></Route>
                </Route>
            </>
        )
    );
    return router;
}
