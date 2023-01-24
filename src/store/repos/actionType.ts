import { REPO } from "src/types/repo";

export enum repoActionTypes {
  TOGGLE_LOADING = "TOGGLE_LOADING",
  SET_ERROR = "SET_ERROR",
  GET_REPO_LIST = "GET_REPO_LIST",
  GET_REPO_DETAIL = "GET_REPO_DETAIL",
  GET_TOTAL = "GET_TOTAL",
  GET_QUERY = "GET_QUERY",
  GET_SORT = "GET_SORT",
  GET_ORDER = "GET_ORDER",
  GET_CURRENT_PAGE = "GET_CURRENT_PAGE",
  GET_PER_PAGE = "GET_PER_PAGE",
}

interface toggleLoading {
  type: repoActionTypes.TOGGLE_LOADING;
  payload: boolean;
}

interface setError {
  type: repoActionTypes.SET_ERROR;
  payload: string;
}

interface getRepoList {
  type: repoActionTypes.GET_REPO_LIST;
  payload: REPO;
}

interface getRepoDetail {
  type: repoActionTypes.GET_REPO_DETAIL;
  payload: any;
}

interface getTotal {
  type: repoActionTypes.GET_TOTAL;
  payload: any;
}

interface getQuery {
  type: repoActionTypes.GET_QUERY;
  payload: any;
}

interface getSort {
  type: repoActionTypes.GET_SORT;
  payload: any;
}

interface getOrder {
  type: repoActionTypes.GET_ORDER;
  payload: any;
}

interface getCurrentPage {
  type: repoActionTypes.GET_CURRENT_PAGE;
  payload: any;
}

interface getPerPage {
  type: repoActionTypes.GET_PER_PAGE;
  payload: any;
}

export type repoAction =
  | toggleLoading
  | setError
  | getRepoList
  | getRepoDetail
  | getTotal
  | getQuery
  | getSort
  | getOrder
  | getCurrentPage
  | getPerPage;
