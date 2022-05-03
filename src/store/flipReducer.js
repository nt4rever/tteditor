import { FLIPX_CHANGE, FLIPY_CHANGE } from "./actions";

const initialState = {
    flipx: false,
    flipy: false,
};

const flipReducer = (state = initialState, action) => {
    switch (action.type) {
        case FLIPX_CHANGE:
            return {
                ...state,
                flipx: !state.flipx,
            };
        case FLIPY_CHANGE:
            return {
                ...state,
                flipy: !state.flipy,
            };
        default:
            return state;
    }
};

export default flipReducer;
