import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "src/store/reducers";
import { STATE_TYPE } from "src/types/repo";
import { useEffect, useState } from "react";

export const DetailPage = () => {
  const navigate = useNavigate();
  const repoState: STATE_TYPE = useSelector((state: RootState) => state.repos);
  const [detailRepo, setDetailRepo] = useState<any>({});

  useEffect(() => {
    setDetailRepo(repoState.repoDetail);
  }, [repoState]);

  const ownerPage = (name: string) => {
    window.open("https://github.com/" + name, "_blank");
  };

  const repoPage = (name: string, repoName: string) => {
    window.open("https://github.com/" + name + repoName, "_blank");
  };
  return (
    <div>
      {" "}
      <Button onClick={() => navigate("/")}>
        <LeftOutlined /> Go back
      </Button>
      <div onClick={() => ownerPage(detailRepo?.owner?.login)}>
        Full owner name: {detailRepo?.owner?.login}
      </div>
      <div onClick={() => repoPage(detailRepo?.owner?.login, detailRepo?.name)}>
        Repository name: {detailRepo?.name}
      </div>
      <div>Open issues: {detailRepo?.open_issues}</div>
      <div>Default branch: {detailRepo?.default_branch}</div>
    </div>
  );
};
