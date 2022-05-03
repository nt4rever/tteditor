import { TAB_CHANGE } from './actions';

const initialState = {
    tab: "",
};

const tabReducer = (state = initialState, action) => {
    switch (action.type) {
      case TAB_CHANGE:
        return {
          ...state,
          tab: action.tab,
        }
      default:
        return state;
    }
  };
  
  export default tabReducer;