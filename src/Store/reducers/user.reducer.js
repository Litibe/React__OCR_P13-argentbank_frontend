const initialState = {
    token: null,
    email: null,
    firstName: null,
    lastName: null,
    createdAt: null,
    updateAt: null,
    id: null,
};

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
        case "PUT__USER_DETAILS":
            return {
                ...state,
                email: action.email,
                firstName: action.firstName,
                lastName: action.lastName,
                createdAt: action.createdAt,
                updateAt: action.updateAt,
                id: action.id,
            };
        case "USER_LOGOUT":
            return initialState;
        default:
            return state;
    }
}
