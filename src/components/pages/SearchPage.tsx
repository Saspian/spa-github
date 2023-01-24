import { Input, Select, Form } from "antd";
import store from "src/store";
import { getRepo, setOrder, setQuery, setSort } from "src/store/repos/actions";
import { useState } from "react";

const { Search } = Input;

const sortOption = [
  {
    label: "Stars",
    value: "stars",
  },
  {
    label: "Forks",
    value: "forks",
  },
  {
    label: "Help wanted issue",
    value: "help-wanted-issue",
  },
  {
    label: "Updated",
    value: "updated",
  },
];

const orderOption = [
  {
    label: "Asc",
    value: "asc",
  },
  {
    label: "Desc",
    value: "desc",
  },
];

export const SearchPage = () => {
  const [sort, setLocalSort] = useState<string>("stars");
  const [order, setLocalOrder] = useState<string>("desc");

  const handleSortChange = (value: any) => {
    store.dispatch(setSort(value));
    setLocalSort(value);
    store.dispatch(getRepo());
  };

  const handleOrderChange = (value: any) => {
    store.dispatch(setOrder(value));
    setLocalOrder(value);
    store.dispatch(getRepo());
  };

  const onSearch = async (value: string) => {
    store.dispatch(setQuery(value));
    store.dispatch(getRepo());
  };

  return (
    <div className="my-4 flex justify-center">
      <Form.Item label="Search" className="mr-4">
        <Search
          data-testid="search-input"
          placeholder="Find repositories"
          onSearch={onSearch}
          style={{ width: 304 }}
        />
      </Form.Item>
      <Form.Item label="Sort By" className="mr-4">
        <Select
          data-testid="sort-input"
          defaultValue={sort}
          style={{ width: 120 }}
          onChange={handleSortChange}
          options={sortOption}
        />
      </Form.Item>
      <Form.Item label="Order By" className="mr-4">
        <Select
          data-testid="order-input"
          defaultValue={order}
          style={{ width: 120 }}
          onChange={handleOrderChange}
          options={orderOption}
        />
      </Form.Item>
    </div>
  );
};
