import { repoReducer } from "./repos/reducers";

const rootReducer = (state: any, action: any) => {
  return repoReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
