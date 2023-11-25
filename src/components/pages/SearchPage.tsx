import { Input, Select, Form } from "antd";
import store from "src/store";
import { getRepo, setOrder, setQuery, setSort } from "src/store/repos/actions";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/store/reducers";

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
  const [localSort, setLocalSort] = useState<string>("stars");
  const [localOrder, setLocalOrder] = useState<string>("desc");
  const [localQuery, setLocalQuery] = useState<string>("");
  const query = useSelector((state: RootState) => state.query);
  const sort = useSelector((state: RootState) => state.sort);
  const order = useSelector((state: RootState) => state.order);

  useEffect(() => {
    setLocalQuery(query);
    setLocalSort(sort);
    setLocalOrder(order);
  }, [query, sort, order]);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value);
  };

  return (
    <div className="my-4 flex justify-center">
      <Form.Item label="Search" className="mr-4">
        <Search
          data-testid="search-input"
          placeholder="Find repositories"
          onSearch={onSearch}
          value={localQuery}
          style={{ width: 304 }}
          onChange={(e) => handleChange(e)}
        />
      </Form.Item>
      <Form.Item label="Sort By" className="mr-4">
        <Select
          data-testid="sort-input"
          value={localSort}
          style={{ width: 120 }}
          onChange={handleSortChange}
          options={sortOption}
        />
      </Form.Item>
      <Form.Item label="Order By" className="mr-4">
        <Select
          data-testid="order-input"
          value={localOrder}
          style={{ width: 120 }}
          onChange={handleOrderChange}
          options={orderOption}
        />
      </Form.Item>
    </div>
  );
};
