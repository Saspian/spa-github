import { Avatar, Button, Card } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import store from "src/store";
import { getRepoDetail } from "src/store/repos/actions";
import dayjs from "dayjs";
import { StarOutlined, EyeOutlined, BookOutlined } from "@ant-design/icons";
import { kFormatter } from "src/utils/utilFunction";

export const DetailPage = () => {
  const { owner, repo } = useParams();
  const navigate = useNavigate();
  const [detailRepo, setDetailRepo] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    store.dispatch(getRepoDetail({ repo, owner }));
  }, [repo, owner]);

  store.subscribe(() => {
    setDetailRepo(store.getState().repoDetail);
    setLoading(store.getState().loading);
  });

  const ownerPage = (name: string) => {
    window.open("https://github.com/" + name, "_blank");
  };

  const repoPage = (name: string, repoName: string) => {
    window.open("https://github.com/" + name + "/" + repoName, "_blank");
  };
  return (
    <div className="w-3/5 my-4 mx-auto">
      <div className="flex justify-between relative">
        <Button size="small" className="absolute" onClick={() => navigate("/")}>
          Back
        </Button>
        <div></div>
        <div
          className="repository font-bold text-center"
          data-testid="detail-page"
        >
          Repository Detail
        </div>
        <div></div>
      </div>
      {loading ? (
        <Card className="mt-8" loading={loading} bordered></Card>
      ) : (
        <>
          <Card
            className="shadow-xl mt-8"
            title={
              <div
                className="flex items-center cursor-pointer hover:underline"
                onClick={() =>
                  repoPage(detailRepo?.owner?.login, detailRepo?.name)
                }
              >
                <BookOutlined className="mr-2" /> {detailRepo?.owner?.login} /{" "}
                {detailRepo?.name}
              </div>
            }
            bordered
          >
            <p>{detailRepo?.description}</p>
            <p>
              {" "}
              <span className="font-bold">Default branch: </span>
              {detailRepo?.default_branch}
            </p>
            <div className="flex justify-between">
              <p>
                <span className="font-bold mr-2">
                  <Avatar src={detailRepo?.owner?.avatar_url} size="small" />
                </span>
                <span
                  className="hover:underline cursor-pointer"
                  onClick={() => ownerPage(detailRepo?.owner?.login)}
                >
                  {detailRepo?.owner?.login}
                </span>
              </p>
              <p className="flex items-center">
                {" "}
                <StarOutlined className="mr-2" />{" "}
                <span className="">
                  {" "}
                  {kFormatter(detailRepo.stargazers_count)}{" "}
                </span>
              </p>
              <p className="flex items-center">
                <EyeOutlined className="mr-2" />{" "}
                <span className="">
                  {" "}
                  {kFormatter(detailRepo.subscribers_count)}{" "}
                </span>
              </p>
              <p> {detailRepo?.open_issues} Open issues</p>
              <p>Updated {dayjs(detailRepo?.updated_at).format("MMM D")}</p>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};
