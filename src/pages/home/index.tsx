import { authStatusType, Layout } from "../common/components/Layout";
import { HomeMain } from "./components/HomeMain";
import { HomeSideBar } from "./components/HomeSideBar";

export const Home = () => {
  return (
    <Layout authStatus={authStatusType.NEED_LOGIN}>
      <div className="w-full flex gap-6">
        <HomeSideBar />
        <HomeMain />
      </div>
    </Layout>
  );
};
