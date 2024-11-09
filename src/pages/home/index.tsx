import { HomeMain } from "./components/HomeMain";
import { HomeSideBar } from "./components/HomeSideBar";

export const Home = () => {
  return (
    <div className="w-full flex gap-6">
      <HomeSideBar />
      <HomeMain />
    </div>
  );
};
