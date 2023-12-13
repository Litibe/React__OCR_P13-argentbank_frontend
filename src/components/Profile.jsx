import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putUserDetails } from "../Store/actions/user.actions";
import { getUserAccounts } from "../Store/actions/account.actions";
import { Link } from "react-router-dom";

export default function Profile() {
    document.title = "ArgentBank - Welcome ";
    const getUserDetails = useSelector((state) => state.userDetails);
    const form = useRef();
    const dispatch = useDispatch();
    const getAccounts = useSelector((state) => state.accountsUser);

    useEffect(() => {
        if (getUserDetails.token !== null) {
            if (getUserDetails.firstName !== null) {
                document.title += " " + getUserDetails.firstName + " !";
            }
            if (getAccounts.accounts === null) {
                dispatch(getUserAccounts(getUserDetails.token));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getAccounts, getUserDetails]);

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
                            {getUserDetails.firstName !== null &&
                                getUserDetails.firstName}{" "}
                            {getUserDetails.lastName !== null &&
                                getUserDetails.lastName}
                        </>
                    )}{" "}
                    !
                </h1>
                {getUserDetails.id !== null && (
                    <div className="customer">
                        N°Customer : {getUserDetails.id}
                    </div>
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
            {getUserDetails.id !== null && getAccounts.accounts === null ? (
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
            ) : (
                <>
                    {getAccounts !== null && (
                        <>
                            {getAccounts.accounts !== null &&
                                getAccounts.accounts.map((account) => (
                                    <section
                                        className="account"
                                        key={account.id}
                                    >
                                        <div className="account-content-wrapper">
                                            <h3 className="account-title">
                                                {account.name} (x
                                                {account.id})
                                            </h3>
                                            <p className="account-amount">
                                                $ {account.balance}{" "}
                                            </p>
                                            <p className="account-amount-description">
                                                {account.description}
                                            </p>
                                        </div>
                                        <div className="account-content-wrapper cta">
                                            <Link
                                                to={`/profile/account/${account.id}`}
                                                className="transaction-button-link"
                                            >
                                                <button className="transaction-button">
                                                    View transactions
                                                </button>
                                            </Link>
                                        </div>
                                    </section>
                                ))}
                        </>
                    )}
                </>
            )}
        </main>
    );
}
