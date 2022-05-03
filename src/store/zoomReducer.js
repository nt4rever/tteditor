import { ZOOM_VALUE_CHANGE } from "./actions";

const initialState = {
    percent: 100,
};

const zoomReducer = (state = initialState, action) => {
    switch (action.type) {
        case ZOOM_VALUE_CHANGE:
            return {
                ...state,
                percent: action.percent,
            };
        default:
            return state;
    }
};

export default zoomReducer;