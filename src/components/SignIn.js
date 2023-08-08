import { useEffect, useRef, useState } from "react";
import { postUserLogin } from "../features/redux/actions/user.actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    document.title = "ArgentBank - Sign In";
    const form = useRef();
    const dispatch = useDispatch();
    const getUserDetails = useSelector((state) => state.userDetails);
    const [connectUser, setConnectUser] = useState(false);
    const handleForm = async (e) => {
        e.preventDefault();
        const postData = {
            email: form.current[0].value,
            password: form.current[1].value,
        };
        if (getUserDetails.token === undefined && connectUser === false) {
            setConnectUser(true);
            dispatch(postUserLogin(postData));
        }
    };
    const [checkRememberMe, setCheckRememberMe] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        if (getUserDetails.token !== undefined) {
            if (checkRememberMe === "on") {
                localStorage.setItem("tokenAccess", getUserDetails.token);
            }
            navigate("/profile");
        }
    }, [checkRememberMe, dispatch, getUserDetails.token, navigate]);
    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>

                <form ref={form} onSubmit={(e) => handleForm(e)}>
                    <div className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <input autoComplete="email" type="email" id="email" />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    </div>
                    <div className="input-remember">
                        <input
                            type="checkbox"
                            id="remember-me"
                            onClick={(e) => setCheckRememberMe(e.target.value)}
                        />
                        <label htmlFor="remember-me">Remember me :</label>
                    </div>

                    <button className="sign-in-button" type="submit">
                        Sign In
                    </button>
                </form>
            </section>
        </main>
    );
}
