import { STATE_TYPE } from "src/types/repo";
import { repoAction, repoActionTypes } from "./actionType";

export const initialState: STATE_TYPE = {
  loading: false,
  error: "",
  repo: [],
  repoDetail: null,
  total: 500,
};

export const repoReducer = (
  state: STATE_TYPE = initialState,
  action: repoAction,
) => {
  switch (action.type) {
    case repoActionTypes.TOGGLE_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case repoActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case repoActionTypes.GET_REPO_LIST:
      return {
        ...state,
        repo: action.payload,
      };
    case repoActionTypes.GET_REPO_DETAIL:
      return {
        ...state,
        repoDetail: action.payload,
      };
    case repoActionTypes.GET_TOTAL:
      return {
        ...state,
        total: action.payload,
      };
    default:
      return state;
  }
};
