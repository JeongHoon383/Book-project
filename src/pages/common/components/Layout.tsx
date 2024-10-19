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
  const { isLogin, user } = useAuthStore();

  if (authStatus === authStatusType.NEED_LOGIN && !isLogin) {
    return <Navigate to={pageRoutes.login} />;
  }

  if (authStatus === authStatusType.NEED_NOT_LOGIN && isLogin) {
    return (
      <Navigate
        to={user?.isSeller ? pageRoutes.productManageMent : pageRoutes.main}
      />
    );
  }

  if (authStatus === authStatusType.NEED_SELLER) {
    if (!isLogin) {
      return <Navigate to={pageRoutes.login} />;
    }
    if (!user?.isSeller) {
      return <Navigate to={pageRoutes.main} />;
    }
  }

  if (authStatus === authStatusType.NEED_BUYER) {
    if (!isLogin) {
      return <Navigate to={pageRoutes.login} />;
    }
    if (user?.isSeller) {
      return <Navigate to={pageRoutes.productManageMent} />;
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col min-h-screen mt-24">
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
