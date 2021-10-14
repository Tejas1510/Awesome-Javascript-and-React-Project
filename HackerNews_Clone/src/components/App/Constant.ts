import { AppState } from "./AppTypes";

export const STORY_PERPAGE=15

export const initialState:AppState = {
  error:"",
  isloading:false,
  currentPage: 1,
  stories:[],
  storyType:"new",
  storyIds:[],

};