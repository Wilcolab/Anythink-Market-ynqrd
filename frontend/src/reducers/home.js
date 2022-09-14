import {
  CHANGE_QUERY,
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
} from "../constants/actionTypes";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case HOME_PAGE_LOADED:
      return {
        ...state,
        tags: action.payload[0].tags,
      };
    case HOME_PAGE_UNLOADED:
      return {};
    case CHANGE_QUERY:
      return {
        ...state,
        query: action.query,
      };
    default:
      return state;
  }
};

export default reducer;
