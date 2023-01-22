import { REPO } from "src/types/repo";

export enum repoActionTypes {
  TOGGLE_LOADING = "TOGGLE_LOADING",
  SET_ERROR = "SET_ERROR",
  GET_REPO_LIST = "GET_REPO_LIST",
  GET_REPO_DETAIL = "GET_REPO_DETAIL",
  GET_TOTAL = "GET_TOTAL",
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

export type repoAction =
  | toggleLoading
  | setError
  | getRepoList
  | getRepoDetail
  | getTotal;
