import { TOOL_CHANGE } from "./actions";

const initialState = {
    tool: "",
};

const toolReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOOL_CHANGE:
            return {
                ...state,
                tool: action.tool,
            };
        default:
            return state;
    }
};

export default toolReducer;
