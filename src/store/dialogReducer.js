import { DIALOG_STATUS_CHANGE, DIALOG_VALUE_CHANGE } from "./actions";

const initialState = {
    open: false,
    a: 50,
    b: 120,
    c: 2,
    x: 5,
    k: 3,
};

const dialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case DIALOG_STATUS_CHANGE:
            return {
                ...state,
                open: action.status,
            };
        case DIALOG_VALUE_CHANGE:
            return {
                ...state,
                a: action.a,
                b: action.b,
                c: action.c,
                x: action.x,
                k: action.k,
            };
        default:
            return state;
    }
}

export default dialogReducer;