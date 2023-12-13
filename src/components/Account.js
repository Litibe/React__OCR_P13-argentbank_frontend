import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
    getUserAccounts,
    getTransactionAccount,
} from "../features/redux/actions/account.actions";

export default function Account() {
    document.title = "ArgentBank - Account ";
    let getUserDetails = useSelector((state) => state.userDetails);
    const dispatch = useDispatch();
    const getAccounts = useSelector((state) => state.accountsUser.accounts);
    const { idAccount } = useParams();
    const getTransactions = useSelector(
        (state) => state.accountsUser.transactions
    );
    const [newCategory, setNewCategory] = useState(undefined);
    const [editCategory, setEditCategory] = useState(false);
    const [newNotes, setnewNotes] = useState(undefined);
    const [editNotes, setEditNotes] = useState(false);
    const [listAccounts, setListAccount] = useState([]);
    useEffect(() => {
        if (getUserDetails.token !== undefined) {
            dispatch(getUserAccounts(getUserDetails.token));
            dispatch(getTransactionAccount(getUserDetails.token, idAccount));
        }
    }, [dispatch, getUserDetails, idAccount]);

    useEffect(() => {
        if (getAccounts !== undefined && getAccounts !== null) {
            const myListAccount = [];
            getAccounts.map((element) => myListAccount.push(element.id));
            setListAccount(myListAccount);
        }
    }, [dispatch, getAccounts, getUserDetails, idAccount]);

    const handleWatchTransaction = async (e) => {
        e.preventDefault();

        const rowTransaction =
            e.target.parentElement.parentElement.parentElement;
        const detailsTransaction =
            e.target.parentElement.parentElement.nextElementSibling;
        if (rowTransaction.style.height !== "auto") {
            rowTransaction.style.height = "auto";
            detailsTransaction.style.height = "auto";
            e.target.style.transform = "rotate(180deg)";
        } else {
            rowTransaction.style.height = "80px";
            detailsTransaction.style.height = "0px";
            e.target.style.transform = "rotate(0deg)";
        }
    };
    return (
        <main className="bg-dark vh-100">
            {getAccounts !== undefined &&
                getAccounts.map((account) => (
                    <div key={account.id}>
                        {account.id === parseInt(idAccount, 10) && (
                            <section className="account">
                                <div className="account-content-wrapper text-center">
                                    <h1 className="account-title">
                                        {account.name} (x{account.id})
                                    </h1>
                                    <p className="account-amount">
                                        $ {account.balance}{" "}
                                    </p>
                                    <p>Available Balance</p>
                                </div>
                            </section>
                        )}
                    </div>
                ))}
            {!listAccounts.includes(parseInt(idAccount, 10)) ? (
                <h1>
                    Account number not found, please return to homepage your
                    account
                </h1>
            ) : (
                <>
                    {getTransactions !== undefined &&
                    getTransactions !== null &&
                    getTransactions.length > 0 ? (
                        <div className="transactions">
                            <div className="table_transaction_title">
                                <div className="col-transation transaction-date">
                                    <span></span>
                                    <span>Date</span>
                                </div>
                                <div className="col-transation">
                                    Description
                                </div>
                                <div className="col-transation">Amount</div>
                                <div className="col-transation">Balance</div>
                            </div>
                            {getTransactions !== undefined &&
                                getTransactions !== null &&
                                getTransactions.map((transac) => (
                                    <div
                                        key={transac.id}
                                        className="table_transaction"
                                    >
                                        <div className="table_transaction_element">
                                            <div className="col-transation transaction-date">
                                                <i
                                                    onClick={(e) =>
                                                        handleWatchTransaction(
                                                            e
                                                        )
                                                    }
                                                    className="fa-solid fa-chevron-up"
                                                ></i>
                                                <span>{transac.date}</span>
                                            </div>
                                            <div className="col-transation">
                                                {transac.description}
                                            </div>
                                            <div className="col-transation">
                                                $ {transac.amount}
                                            </div>
                                            <div className="col-transation">
                                                $ {transac.balance}
                                            </div>{" "}
                                        </div>{" "}
                                        <div className="transaction-details">
                                            <div>
                                                <span>Transaction Type : </span>
                                                {transac.transactionType}
                                            </div>
                                            <div>
                                                <span>Catetory : </span>
                                                {transac.category}{" "}
                                                <i
                                                    className="fa-solid fa-pencil"
                                                    onClick={(e) => {
                                                        setEditCategory(
                                                            !editCategory
                                                        );
                                                        setNewCategory(
                                                            transac.category
                                                        );
                                                    }}
                                                ></i>
                                            </div>
                                            {editCategory === true && (
                                                <select
                                                    id="categoryInput"
                                                    className="transaction_edit_input"
                                                    name="select"
                                                    type="select"
                                                    onChange={(e) =>
                                                        setNewCategory(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option
                                                        value={transac.category}
                                                    >
                                                        {transac.category}
                                                    </option>
                                                    <option value="Credit">
                                                        Credit
                                                    </option>
                                                    <option value="Food">
                                                        Food
                                                    </option>
                                                    <option value="Sport">
                                                        Sports
                                                    </option>
                                                    <option value="Technology">
                                                        Technology
                                                    </option>
                                                </select>
                                            )}

                                            <div>
                                                <span>Notes : </span>
                                                {transac.notes}{" "}
                                                <i
                                                    className="fa-solid fa-pencil"
                                                    onClick={(e) => {
                                                        setEditNotes(
                                                            !editNotes
                                                        );
                                                        setnewNotes(
                                                            transac.notes
                                                        );
                                                    }}
                                                ></i>
                                            </div>
                                            {editNotes === true && (
                                                <input
                                                    id="notesInput"
                                                    name="select"
                                                    className="transaction_edit_input"
                                                    type="text"
                                                    defaultValue={newNotes}
                                                    onChange={(e) =>
                                                        setnewNotes(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            ;
                        </div>
                    ) : (
                        <h1>No transactions recorded on this account</h1>
                    )}
                </>
            )}
        </main>
    );
}
