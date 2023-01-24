import { STATE_TYPE } from "src/types/repo";
import { repoAction, repoActionTypes } from "./actionType";

export const initialState: STATE_TYPE = {
  loading: false,
  error: "",
  repo: [],
  repoDetail: null,
  total: 1000,
  query: "",
  sort: "stars",
  order: "desc",
  currentPage: 1,
  perPage: 10,
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
    case repoActionTypes.GET_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    case repoActionTypes.GET_SORT:
      return {
        ...state,
        sort: action.payload,
      };
    case repoActionTypes.GET_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case repoActionTypes.GET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case repoActionTypes.GET_PER_PAGE:
      return {
        ...state,
        perPage: action.payload,
      };
    default:
      return state;
  }
};
