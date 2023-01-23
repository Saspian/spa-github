import { Button, Card } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import store from "src/store";
import { getRepoDetail } from "src/store/repos/actions";

export const DetailPage = () => {
  const { owner, repo } = useParams();
  const navigate = useNavigate();
  const [detailRepo, setDetailRepo] = useState<any>({});

  useEffect(() => {
    store.dispatch(getRepoDetail({ repo, owner }));
  }, [repo, owner]);

  store.subscribe(() => {
    setDetailRepo(store.getState().repos);
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
        <div className="repository font-bold text-center">
          Repository Detail
        </div>
        <div></div>
      </div>
      {detailRepo.loading ? (
        <Card loading={detailRepo.loading} bordered></Card>
      ) : (
        <>
          <div className="mt-4">
            <span className="font-bold">Full owner name: </span>
            <span
              className="hover:underline cursor-pointer"
              onClick={() => ownerPage(detailRepo?.repoDetail?.owner?.login)}
            >
              {detailRepo?.repoDetail?.owner?.login}
            </span>
          </div>
          <div>
            <span className="font-bold">Repository name: </span>
            <span
              className="hover:underline cursor-pointer"
              onClick={() =>
                repoPage(
                  detailRepo?.repoDetail?.owner?.login,
                  detailRepo?.repoDetail?.name,
                )
              }
            >
              {detailRepo?.repoDetail?.name}
            </span>
          </div>
          <div>
            <span className="font-bold">Open issues:</span>{" "}
            {detailRepo?.repoDetail?.open_issues}
          </div>
          <div>
            <span className="font-bold">Default branch: </span>
            {detailRepo?.repoDetail?.default_branch}
          </div>
        </>
      )}
    </div>
  );
};
