import { Pagination, PaginationProps } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import store from "src/store";
import { RootState } from "src/store/reducers";
import { getRepo, getRepoDetail } from "src/store/repos/actions";
import { STATE_TYPE } from "src/types/repo";

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
    const a = { repo, owner };
    store.dispatch(getRepoDetail(a));
    navigate("/detail");
  };

  const onChange: PaginationProps["onChange"] = (pageNumber) => {
    setCurrentPage(pageNumber);
    store.dispatch(
      getRepo({ q: query, sort, order, page: pageNumber, per_page: perPage }),
    );
  };

  const onPageSizeChange = (current: number, size: number) => {
    setPerPage(size);
    store.dispatch(getRepo({ q: query, sort, order, page: 1, per_page: size }));
  };

  return (
    <div className="ml-60">
      {repoList?.repo?.map((r: any) => (
        <div
          key={r.id}
          className="mb-4"
          onClick={() => handleRepoClick(r.name, r.owner?.login)}
        >
          Repo name : {r.full_name} <br />
          Description: {r.description} <br />
          Author: {r.owner?.login} <br />
          stars: {r.stargazers_count} <br />
          watchers: {r.subscribers_count} <br />
          forks: {r.forks} <br />
          Last updated: {r.updated_at} <br />
        </div>
      ))}
      <Pagination
        defaultCurrent={currentPage}
        total={total}
        onChange={onChange}
        pageSize={perPage}
        onShowSizeChange={(c, s) => onPageSizeChange(c, s)}
        pageSizeOptions={["3", "10", "25", "50"]}
      />
    </div>
  );
};
