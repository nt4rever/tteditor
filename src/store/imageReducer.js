import { IMG_CHANGE, IMG_NAME_CHANGE, IMG_UPLOAD } from "./actions";

const initialState = {
    imgUrl: "",
    imgName: "",
    image: ""
};

const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        case IMG_UPLOAD:
            return {
                ...state,
                imgUrl: action.url,
                imgName: action.name,
                image: action.url
            };
        case IMG_CHANGE:
            return {
                ...state,
                image: action.image,
            };
        default:
            return state;
    }
};

export default imageReducer;
