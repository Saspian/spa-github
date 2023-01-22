import { combineReducers } from "redux";
import { repoReducer } from "./repos/reducers";

const appReducer = combineReducers({
  repos: repoReducer,
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
