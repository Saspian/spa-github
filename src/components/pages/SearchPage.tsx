import { Button, Dropdown, Input, Space } from "antd";
import store from "src/store";
import { getRepo } from "src/store/repos/actions";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

const { Search } = Input;

const items: MenuProps["items"] = [
  {
    label: "Stars",
    key: "stars",
  },
  {
    label: "forks",
    key: "forks",
  },
  {
    label: "help-wanted-issue",
    key: "help-wanted-issue",
  },
  {
    label: "updated",
    key: "updated",
  },
];

const items2: MenuProps["items"] = [
  {
    label: "asc",
    key: "asc",
  },
  {
    label: "desc",
    key: "desc",
  },
];

interface Props {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  setOrder: React.Dispatch<React.SetStateAction<string>>;
  query: string;
  sort: string;
  order: string;
  currentPage: number;
  perPage: number;
}

export const SearchPage: React.FC<Props> = ({
  setQuery,
  setSort,
  setOrder,
  query,
  sort,
  order,
  currentPage,
  perPage,
}) => {
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setSort(e.key);
    store.dispatch(
      getRepo({ q: query, sort, order, page: currentPage, per_page: perPage }),
    );
  };

  const handleMenuClick2: MenuProps["onClick"] = (e) => {
    setOrder(e.key);
    store.dispatch(
      getRepo({ q: query, sort, order, page: currentPage, per_page: perPage }),
    );
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const menuProps2 = {
    items2,
    onClick: handleMenuClick2,
  };

  const onSearch = async (value: string) => {
    setQuery(value);
    store.dispatch(getRepo({ q: value, sort, order }));
    console.log(value);
  };

  return (
    <div className="my-4 flex justify-center">
      <Search
        placeholder="Find repositories"
        onSearch={onSearch}
        style={{ width: 304 }}
      />
      <Dropdown menu={menuProps}>
        <Button>
          <Space>
            Sort by: {sort}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      <Dropdown menu={menuProps2}>
        <Button>
          <Space>
            Order by: {order}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </div>
  );
};
