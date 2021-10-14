import { AppState, actionType, Action } from "./AppTypes";
import { initialState } from "./Constant";

export const reducer = (state: AppState, action: Action): AppState => {
  const { type, payload } = action;

  switch (type) {
    case actionType.SET_STORY_TYPE:
      if (typeof payload?.storyType !== "undefined") {
        return { ...state, storyType: payload.storyType };
      } else {
        return state;
      }

    case actionType.SET_STORY_IDS:
      if (typeof payload?.storyIds !== "undefined") {
        return { ...state, storyIds: payload.storyIds };
      } else {
        return state;
      }

    case actionType.SET_STORIES:
      if (typeof payload?.stories !== "undefined") {
        return { ...state, stories: [...state.stories, ...payload.stories] };
      } else {
        return state;
      }
    case actionType.SET_ERROR:
      return { ...state, error: "No data found" };

    case actionType.RESET_ERROR:
      return { ...state, error: "" };

    case actionType.SET_CURRENT_PAGE:
      return { ...state, currentPage: state.currentPage + 1 };

    case actionType.SET_LOADING:
      return { ...state, isloading: true };

    case actionType.RESET_LOADING:
      return { ...state, isloading: false };

    case actionType.RESET_STATE:
      return { ...initialState };

    default:
      return state;
  }
};
