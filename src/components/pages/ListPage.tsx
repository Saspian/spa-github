import { Card, Pagination, PaginationProps } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import store from "src/store";
import { RootState } from "src/store/reducers";
import { getRepo } from "src/store/repos/actions";
import { STATE_TYPE } from "src/types/repo";
import {
  UserOutlined,
  StarOutlined,
  EyeOutlined,
  ForkOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
interface Props {
  query: string;
  sort: string;
  order: string;
  currentPage: number;
  perPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
}

export const ListPage: React.FC<Props> = ({
  query,
  sort,
  order,
  currentPage,
  perPage,
  setCurrentPage,
  setPerPage,
}) => {
  const [repoList, setRepoList] = useState<STATE_TYPE>({} as STATE_TYPE);
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

  const repoy: STATE_TYPE = useSelector((state: RootState) => state.repos);

  useEffect(() => {
    setRepoList(repoy);
    setTotal(repoy.total);
  }, [repoy]);

  const handleRepoClick = (repo: string, owner: string) => {
    navigate(`/detail/${owner}/${repo}`);
  };

  const onChange: PaginationProps["onChange"] = (pageNumber) => {
    setCurrentPage(pageNumber);
    store.dispatch(
      getRepo({ q: query, sort, order, page: pageNumber, per_page: perPage }),
    );
  };

  const onPageSizeChange = async (current: number, size: number) => {
    setPerPage(size);
    await store.dispatch(
      getRepo({ q: query, sort, order, page: currentPage, per_page: size }),
    );
  };
  return (
    <>
      <div className="h-[85vh] overflow-y-auto">
        {repoy?.loading ? (
          <>
            <Card loading={repoy.loading} bordered></Card>
          </>
        ) : (
          repoList?.repo?.map((r: any) => (
            <div key={r.id} className="mb-4">
              <Card
                className="shadow-xl"
                title={
                  <div
                    className="cursor-pointer"
                    onClick={() => handleRepoClick(r.name, r.owner?.login)}
                  >
                    {r.full_name}
                  </div>
                }
                bordered
              >
                <p>{r.description?.substring(0, 256)}</p>
                <div className="flex items-center" title="author">
                  <UserOutlined className="mr-2" />{" "}
                  <span className=""> {r.owner?.login} </span>
                </div>

                <div className="flex items-center" title="star">
                  <StarOutlined className="mr-2" />{" "}
                  <span className=""> {r.stargazers_count} </span>
                </div>
                <div className="flex items-center" title="watcher">
                  <EyeOutlined className="mr-2" />{" "}
                  <span className=""> {r.watchers} </span>
                </div>
                <div className="flex items-center" title="fork">
                  <ForkOutlined className="mr-2" />{" "}
                  <span className=""> {r.forks} </span>
                </div>
                <div className="flex items-center" title="last updated">
                  <FieldTimeOutlined className="mr-2" />{" "}
                  <span className="">
                    {" "}
                    {dayjs(r.updated_at).format("YYYY-MM-DD")}{" "}
                  </span>
                </div>
              </Card>
            </div>
          ))
        )}
      </div>
      <Pagination
        className="flex justify-center"
        total={total}
        onChange={onChange}
        pageSize={perPage}
        onShowSizeChange={(c, s) => onPageSizeChange(c, s)}
        pageSizeOptions={["10", "25", "50"]}
      />
    </>
  );
};
