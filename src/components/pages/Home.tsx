import React from "react";
import { ListPage } from "./ListPage";
import { SearchPage } from "./SearchPage";

export const Home = () => {
  return (
    <div className="w-[98vw] overflow-hidden">
      <SearchPage />
      <div className="w-3/5 m-auto">
        <ListPage />
      </div>
    </div>
  );
};
