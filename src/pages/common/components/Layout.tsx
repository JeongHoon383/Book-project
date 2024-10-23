import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuthStore } from "@/store/auth/useAuthStore";

import { pageRoutes } from "@/apiRoutes";
import { Navbar } from "./Navbar";
import { Toast } from "./Toast";

export const authStatusType = {
  NEED_LOGIN: "NEED_LOGIN",
  NEED_NOT_LOGIN: "NEED_NOT_LOGIN",
  COMMON: "COMMON",
  NEED_SELLER: "NEED_SELLER",
  NEED_BUYER: "NEED_BUYER",
};

interface LayoutProps {
  children: ReactNode;
  containerClassName?: string;
  authStatus?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  containerClassName = "",
  authStatus = authStatusType.COMMON,
}) => {
  const { isLogin, user, isLoading } = useAuthStore();

  // 로딩 중일 때 UI 처리
  if (isLoading) {
    return <div>로딩중...</div>;
  }

  // 로그인이 필요할 때
  if (authStatus === authStatusType.NEED_LOGIN && !isLogin) {
    return <Navigate to={pageRoutes.login} />;
  }

  // 로그인이 되어 있을 때
  if (authStatus === authStatusType.NEED_NOT_LOGIN && isLogin) {
    return <Navigate to={pageRoutes.main} />;
  }

  // 판매자 권한이 필요할 때
  if (authStatus === authStatusType.NEED_SELLER) {
    if (!isLogin) {
      return <Navigate to={pageRoutes.login} />;
    }
    if (!user?.isSeller) {
      return <Navigate to={pageRoutes.main} />;
    }
  }

  // 판매 관리 페이지 접근, 구매 관리 페이지에는 접근 불가

  // 구매자 권한이 필요할 때
  if (authStatus === authStatusType.NEED_BUYER) {
    if (!isLogin) {
      return <Navigate to={pageRoutes.login} />;
    }
    if (user?.isSeller) {
      return <Navigate to={pageRoutes.main} />;
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col min-h-screen p-10">
        <main className="flex-grow">
          <div className={`container mx-auto px-4 ${containerClassName}`}>
            <Toast />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
