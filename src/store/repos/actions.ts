import { DetailProps, Order, REPO } from "src/types/repo";
import store from "..";
import { repoActionTypes } from "./actionType";

export const toggleLoading = (toggle: boolean) => ({
  type: repoActionTypes.TOGGLE_LOADING,
  payload: toggle,
});

export const setError = (error: string) => ({
  type: repoActionTypes.SET_ERROR,
  payload: error,
});

export const fetchRepo = (repo: REPO[]) => ({
  type: repoActionTypes.GET_REPO_LIST,
  payload: repo,
});

export const fetchRepoDetail = (repoDetail: any) => ({
  type: repoActionTypes.GET_REPO_DETAIL,
  payload: repoDetail,
});

export const fetchPaginated = (repoCount: any) => ({
  type: repoActionTypes.GET_TOTAL,
  payload: repoCount,
});

export const setQuery = (query: string) => ({
  type: repoActionTypes.GET_QUERY,
  payload: query,
});

export const setSort = (sort: string) => ({
  type: repoActionTypes.GET_SORT,
  payload: sort,
});

export const setOrder = (order: Order) => ({
  type: repoActionTypes.GET_ORDER,
  payload: order,
});

export const setCurrentPage = (currentPage: number) => ({
  type: repoActionTypes.GET_CURRENT_PAGE,
  payload: currentPage,
});

export const setPerPage = (perPage: number) => ({
  type: repoActionTypes.GET_PER_PAGE,
  payload: perPage,
});

export const getRepo = () => {
  return (dispatch: any) => {
    const q = store.getState().query;
    const sort = store.getState().sort;
    const order = store.getState().order;
    const per_page = store.getState().perPage;
    const page = store.getState().currentPage;
    dispatch(toggleLoading(true));
    dispatch(setError(""));
    fetch(
      `${process.env.REACT_APP_GITHUB_API}search/repositories?q=${q}&sort=${sort}&order=${order}&per_page=${per_page}&page=${page}`,
      {
        method: "GET",
        headers: {
          accept: "application/vnd.github+json",
          Authorization: `${process.env.REACT_APP_AUTH_KEY}`,
        },
        mode: "cors",
      },
    )
      .then(async (response) => {
        const res = await response.json();
        if (response.status !== 200) {
          dispatch(setError(res.message));
          dispatch(setCurrentPage(1));
        }
        if (res.total_count === 0) {
          dispatch(setError("No repository found"));
        }
        dispatch(fetchPaginated(res.total_count));
        dispatch(fetchRepo(res.items));
      })
      .catch((error) => {
        const { message } = error;
        dispatch(setError(message));
        console.error(error);
      })
      .finally(() => {
        dispatch(toggleLoading(false));
      });
  };
};

export const getRepoDetail = (props: DetailProps) => {
  return (dispatch: any) => {
    dispatch(toggleLoading(true));
    fetch(
      `${process.env.REACT_APP_GITHUB_API}repos/${props.owner}/${props.repo}`,
      {
        method: "GET",
        headers: {
          accept: "application/vnd.github+json",
          Authorization: `${process.env.REACT_APP_AUTH_KEY}`,
        },
        mode: "cors",
      },
    )
      .then(async (response) => {
        const res = await response.json();
        dispatch(fetchRepoDetail(res));
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        dispatch(toggleLoading(false));
      });
    return "";
  };
};
