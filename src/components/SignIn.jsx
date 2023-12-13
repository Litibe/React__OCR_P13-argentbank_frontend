import { useEffect, useRef } from "react";
import { postUserLogin } from "../Store/actions/user.actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    document.title = "ArgentBank - Sign In";
    const form = useRef();
    const dispatch = useDispatch();
    const getUserDetails = useSelector((state) => state.userDetails);
    const handleForm = async (e) => {
        e.preventDefault();
        const postData = {
            email: form.current[0].value,
            password: form.current[1].value,
        };
        dispatch(postUserLogin(postData));
    };
    const navigate = useNavigate();

    useEffect(() => {
        if (getUserDetails.token !== null) {
            navigate("/profile");
        }
    }, [getUserDetails.token, navigate]);
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

                    <button className="sign-in-button" type="submit">
                        Sign In
                    </button>
                </form>
            </section>
        </main>
    );
}
