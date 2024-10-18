import { Toast } from "@/pages/common/Toast";
import { Outlet } from "react-router-dom";

export const Navbar = () => {
  return (
    <div>
      <Toast />
      <div>
        <header className="h-32 flex items-center justify-between px-4 md:px-52 border-b border-borderGray mb-7">
          <div className="w-full md:w-auto text-center">경향문고</div>
          <div className="w-full md:w-auto">검색바</div>
          <div className="flex w-full md:w-auto justify-center md:justify-end space-x-4">
            <div>장바구니</div>
            <div>로그인</div>
          </div>
        </header>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
