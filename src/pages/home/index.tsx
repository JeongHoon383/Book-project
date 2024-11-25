import { Suspense } from "react";
import { ApiErrorBoundary } from "../common/components/ApiErrorBoundary";
import { authStatusType, Layout } from "../common/components/Layout";
import { HomeMain } from "./components/HomeMain";
import { HomeSideBar } from "./components/HomeSideBar";

export const Home = () => {
  return (
    <Layout authStatus={authStatusType.NEED_LOGIN}>
      <ApiErrorBoundary>
        <Suspense>
          <div className="w-full flex gap-6">
            <HomeSideBar />
            <HomeMain />
          </div>
        </Suspense>
      </ApiErrorBoundary>
    </Layout>
  );
};
