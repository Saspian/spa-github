import {
  Avatar,
  Button,
  Card,
  Pagination,
  PaginationProps,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import store from "src/store";
import { RootState } from "src/store/reducers";
import {
  fetchRepo,
  getRepo,
  setQuery,
  setCurrentPage,
  setPerPage,
} from "src/store/repos/actions";
import { REPO } from "src/types/repo";
import {
  StarOutlined,
  EyeOutlined,
  ForkOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { kFormatter } from "src/utils/utilFunction";

const { Text } = Typography;

export const ListPage = () => {
  const [repoList, setRepoList] = useState<REPO[]>([]);
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [currentPage, setLocalCurrentPage] = useState(1);
  const [perPage, setLocalPerPage] = useState(10);

  const repoy = useSelector((state: RootState) => state.repo);
  const allResult = useSelector((state: RootState) => state.total);
  const query = useSelector((state: RootState) => state.query);
  const sortedBy = useSelector((state: RootState) => state.sort);

  store.subscribe(() => {
    setLoading(store.getState().loading);
    setError(store.getState().error);
  });

  useEffect(() => {
    setRepoList(repoy as REPO[]);
  }, [repoy]);

  useEffect(() => {
    setTotal(allResult);
  }, [allResult]);

  const handleRepoClick = (repo: string, owner: string) => {
    navigate(`/detail/${owner}/${repo}`);
  };

  const onChange: PaginationProps["onChange"] = (pageNumber) => {
    store.dispatch(setCurrentPage(pageNumber));
    setLocalCurrentPage(pageNumber);
    store.dispatch(getRepo());
  };

  const onPageSizeChange = (current: number, size: number) => {
    store.dispatch(setPerPage(size));
    setLocalPerPage(size);
    store.dispatch(getRepo());
  };

  const clearFilter = async () => {
    await Promise.all([
      store.dispatch(fetchRepo([])),
      store.dispatch(setQuery("")),
      store.dispatch(setCurrentPage(1)),
      store.dispatch(setPerPage(10)),
      store.dispatch(setError("")),
    ]);
  };

  console.log(repoList?.length, "@@");

  return (
    <div className="relative">
      {error?.length !== 0 && <i className="text-red-600">{error}</i>}
      {repoList?.length !== 0 && repoList?.length !== undefined && (
        <div className="flex justify-between mb-3">
          <Text>
            {allResult ? allResult : 0} results for repositories matching '
            <b>{query}</b>' sorted by '<b>{sortedBy}</b>'
          </Text>
          <Button size="small" onClick={clearFilter}>
            X Clear filter
          </Button>
        </div>
      )}
      <div className="h-[82vh] overflow-auto">
        {loading ? (
          <>
            <Card loading={loading} bordered></Card>
          </>
        ) : (
          <>
            {repoList?.map((r: any) => (
              <div key={r.id} className="mb-5">
                <Card
                  className="shadow-xl"
                  title={
                    <div
                      className="cursor-pointer hover:underline"
                      onClick={() => handleRepoClick(r.name, r.owner?.login)}
                    >
                      {r.full_name}
                    </div>
                  }
                  bordered
                >
                  <p>{r.description?.substring(0, 256)}</p>
                  <div className="flex items-center" title="author">
                    {/* <UserOutlined className="mr-2" />{" "} */}
                    <Avatar
                      className="mr-2"
                      src={r?.owner?.avatar_url}
                      size={16}
                    />
                    <span className=""> {r.owner?.login} </span>
                  </div>

                  <div className="flex items-center" title="star">
                    <StarOutlined className="mr-2" />{" "}
                    <span className=""> {kFormatter(r.stargazers_count)} </span>
                  </div>
                  <div className="flex items-center" title="watcher">
                    <EyeOutlined className="mr-2" />{" "}
                    <span className=""> {kFormatter(r.watchers)} </span>
                  </div>
                  <div className="flex items-center" title="fork">
                    <ForkOutlined className="mr-2" />{" "}
                    <span className=""> {r.forks} </span>
                  </div>
                  <div className="flex items-center" title="last updated">
                    <FieldTimeOutlined className="mr-2" />{" "}
                    <span
                      className=""
                      title={dayjs(r.updated_at).format("YYYY-MM-DD")}
                    >
                      Updated {dayjs(r.updated_at).format("MMM D")}
                    </span>
                  </div>
                </Card>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="absolute bottom-0"></div>
      <Pagination
        className="flex justify-center mt-2"
        defaultCurrent={currentPage}
        total={total}
        onChange={onChange}
        pageSize={perPage}
        onShowSizeChange={(c, s) => onPageSizeChange(c, s)}
        pageSizeOptions={["10", "25", "50"]}
      />
    </div>
  );
};
