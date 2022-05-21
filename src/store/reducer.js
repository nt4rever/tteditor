import { combineReducers } from "redux";
import tabReducer from "./tabReducer";
import toolReducer from "./toolReducer";
import fnvalueReducer from './fnvalueReducer';
import flipReducer from './flipReducer';
import imageReducer from "./imageReducer";
import dialogReducer from "./dialogReducer";
import zoomReducer from "./zoomReducer";
import filterReducer from './filterReducer';

const reducer = combineReducers({
    tab: tabReducer,
    tool: toolReducer,
    filter: filterReducer,
    value: fnvalueReducer,
    flip: flipReducer,
    img: imageReducer,
    dialog: dialogReducer,
    zoom: zoomReducer
});

export default reducer;
