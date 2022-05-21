import { FILTER_CHANGE } from "./actions";

const initialState = {
    filter: "orgirinal",
};

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case FILTER_CHANGE:
            return {
                ...state,
                filter: action.filter,
            };
        default:
            return state;
    }
};

export default filterReducer;