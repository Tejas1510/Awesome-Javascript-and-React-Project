export type News = {
  id: number;
  by: string;
  descendants: number;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
  kids?: number[];
  text: string;
};

export type Match = {
  match: {
    params: {
      storytype: string;
    };
  };
};

export interface AppState {
  error: string;
  isloading: boolean;
  currentPage: number;
  stories: News[];
  storyIds: number[];
  storyType: string;
}

export enum actionType {
  SET_ERROR = "setError",
  RESET_ERROR = "resetError",

  SET_LOADING = "setLoading",
  RESET_LOADING = "resetLoading",

  SET_CURRENT_PAGE = "setCurrentPage",

  SET_STORIES = "setStories",

  SET_STORY_IDS = "setStoryIds",

  SET_STORY_TYPE = "setStoryType",

  RESET_STATE = "resetState",
}

export interface Action {
  type: actionType;
  payload?: {
    stories?: News[];
    storyIds?: number[];
    storyType?: string;
  };
}
