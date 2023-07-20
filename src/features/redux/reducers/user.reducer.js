const initialState = {};

export default function userDetails(state = initialState, action) {
    switch (action.type) {
        case "POST__USER_LOGIN":
            return { ...state, token: action.token };
        case "POST__USER_OBTAIN_DETAILS":
            return {
                ...state,
                email: action.email,
                firstName: action.firstName,
                lastName: action.lastName,
                createdAt: action.createdAt,
                updateAt: action.updateAt,
                id: action.id,
            };
        case "SET__USERTOKEN_LOCALSTORAGE":
            return { ...state, token: action.token };
        case "USER_LOGOUT":
            return initialState;
        default:
            return state;
    }
}
