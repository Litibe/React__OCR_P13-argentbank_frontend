import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putUserDetails } from "../features/redux/actions/user.actions";

export default function Profile() {
    document.title = "ArgentBank - Welcome ";
    const getUserDetails = useSelector((state) => state.userDetails);
    const form = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        if (getUserDetails.token === undefined) {
        } else {
            if (getUserDetails.firstName !== undefined) {
                document.title += " " + getUserDetails.firstName + " !";
            }
        }
    }, [getUserDetails]);

    const [showEditUser, setShowEditUser] = useState(false);

    const handleForm = async (e) => {
        e.preventDefault();
        const putData = {
            firstName: form.current[0].value,
            lastName: form.current[1].value,
        };
        const token = getUserDetails.token;
        dispatch(putUserDetails(token, putData));
        setShowEditUser(!showEditUser);
    };

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>
                    Welcome back
                    {showEditUser === false && (
                        <>
                            <br />
                            {getUserDetails.firstName !== undefined &&
                                getUserDetails.firstName}{" "}
                            {getUserDetails.lastName !== undefined &&
                                getUserDetails.lastName}
                        </>
                    )}{" "}
                    !
                </h1>
                {getUserDetails.id !== undefined && (
                    <h2>N°Customer : {getUserDetails.id}</h2>
                )}
                {showEditUser === false ? (
                    <button
                        className="edit-button"
                        onClick={(e) => setShowEditUser(!showEditUser)}
                    >
                        Edit Name
                    </button>
                ) : (
                    <>
                        {getUserDetails.firstName !== undefined &&
                            getUserDetails.lastName !== undefined && (
                                <form
                                    ref={form}
                                    onSubmit={(e) => handleForm(e)}
                                    className="form-profile"
                                >
                                    <div className="row center input">
                                        <input
                                            type="text"
                                            id="firstName"
                                            defaultValue={
                                                getUserDetails.firstName
                                            }
                                        />
                                        <input
                                            type="text"
                                            id="lastName"
                                            defaultValue={
                                                getUserDetails.lastName
                                            }
                                        />
                                    </div>
                                    <div className="row center">
                                        <button className="edit-button-profile">
                                            Save
                                        </button>
                                        <button
                                            className="edit-button-profile"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setShowEditUser(!showEditUser);
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                    </>
                )}
            </div>
            <h2 className="sr-only">Accounts</h2>
            {getUserDetails.id !== undefined && (
                <>
                    <section className="account">
                        <div className="account-content-wrapper">
                            <h3 className="account-title">
                                Argent Bank Checking (x8349)
                            </h3>
                            <p className="account-amount">$2,082.79</p>
                            <p className="account-amount-description">
                                Available Balance
                            </p>
                        </div>
                        <div className="account-content-wrapper cta">
                            <button className="transaction-button">
                                View transactions
                            </button>
                        </div>
                    </section>
                    <section className="account">
                        <div className="account-content-wrapper">
                            <h3 className="account-title">
                                Argent Bank Savings (x6712)
                            </h3>
                            <p className="account-amount">$10,928.42</p>
                            <p className="account-amount-description">
                                Available Balance
                            </p>
                        </div>
                        <div className="account-content-wrapper cta">
                            <button className="transaction-button">
                                View transactions
                            </button>
                        </div>
                    </section>
                    <section className="account">
                        <div className="account-content-wrapper">
                            <h3 className="account-title">
                                Argent Bank Credit Card (x8349)
                            </h3>
                            <p className="account-amount">$184.30</p>
                            <p className="account-amount-description">
                                Current Balance
                            </p>
                        </div>
                        <div className="account-content-wrapper cta">
                            <button className="transaction-button">
                                View transactions
                            </button>
                        </div>
                    </section>
                </>
            )}
        </main>
    );
}
