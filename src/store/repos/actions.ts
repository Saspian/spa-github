import { REPO } from "src/types/repo";
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

export const getRepo = (query: any) => {
  return (dispatch: any) => {
    const q = query.q ? query.q : "";
    const sort = query.sort ? query.sort : "stars";
    const order = query.order ? query.order : "desc";
    const per_page = query.per_page ? query.per_page : 10;
    const page = query.page ? query.page : 1;

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
        dispatch(fetchPaginated(res.total_count));
        dispatch(fetchRepo(res.items));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getRepoDetail = (props: { repo: string; owner: string }) => {
  return (dispatch: any) => {
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
      });
    return "";
  };
};
