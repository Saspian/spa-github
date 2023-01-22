import React, { useState } from "react";
import { ListPage } from "./ListPage";
import { SearchPage } from "./SearchPage";

export const Home = () => {
  const [query, setQuery] = useState<string>("");
  const [sort, setSort] = useState<string>("stars");
  const [order, setOrder] = useState<string>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  return (
    <div>
      <SearchPage
        setQuery={setQuery}
        setSort={setSort}
        setOrder={setOrder}
        query={query}
        sort={sort}
        order={order}
        currentPage={currentPage}
        perPage={perPage}
      />
      <ListPage
        currentPage={currentPage}
        perPage={perPage}
        setCurrentPage={setCurrentPage}
        setPerPage={setPerPage}
        query={query}
        sort={sort}
        order={order}
      />
    </div>
  );
};
