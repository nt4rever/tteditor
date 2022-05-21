import { FINETUNE_VALUE_CHANGE } from "./actions";

const initialState = {
    brighten: 0,
    contrast: 0,
    blur: 0,
    hue: 0,
    saturation: 0,
    value: 0,
    rotate: 0
};

const fnvalueReducer = (state = initialState, action) => {
    switch (action.type) {
        case FINETUNE_VALUE_CHANGE:
            return {
                ...state,
                brighten: action.brighten ?? state.brighten,
                contrast: action.contrast ?? state.contrast,
                blur: action.blur ?? state.blur,
                hue: action.hue ?? state.hue,
                saturation: action.saturation ?? state.saturation,
                value: action.value ?? state.value,
                rotate: action.rotate ?? state.rotate
            };
        default:
            return state;
    }
};

export default fnvalueReducer;