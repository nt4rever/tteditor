import { FINETUNE_VALUE_CHANGE } from "./actions";

const initialState = {
    brighten: 0,
    contrast: 0,
    blur: 0
};

const fnvalueReducer = (state = initialState, action) => {
    switch (action.type) {
        case FINETUNE_VALUE_CHANGE:
            return {
                ...state,
                brighten: action.brighten ?? state.brighten,
                contrast: action.contrast ?? state.contrast,
                blur: action.blur ?? state.blur
            };
        default:
            return state;
    }
};

export default fnvalueReducer;