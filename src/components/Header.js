import argentBankLogo from "../assets/img/argentBankLogo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
    const getUserDetails = useSelector((state) => state.userDetails);

    return (
        <header className="main-nav">
            <Link to="/" className="main-nav-logo">
                <img
                    className="main-nav-logo-image"
                    src={argentBankLogo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>

            <nav className="main-nav">
                {getUserDetails.token === undefined ? (
                    <Link to="/sign-in" className="main-nav-item">
                        <i className="fa fa-user-circle"></i>
                        <span>Sign In</span>
                    </Link>
                ) : (
                    <>
                        <Link to="/profile" className="main-nav-item">
                            <i className="fa fa-user-circle"></i>
                            <span>
                                {getUserDetails.firstName !== undefined &&
                                    getUserDetails.firstName}
                            </span>
                        </Link>
                        <Link to="/sign-out" className="main-nav-item">
                            <i className="fa fa-sign-out"></i>
                            <span> Sign Out</span>
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
}
