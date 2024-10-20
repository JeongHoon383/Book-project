import { useModal } from "@/hooks/useModal";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { Suspense, useEffect } from "react";
import Cookies from "js-cookie";
import { pageRoutes } from "@/apiRoutes";
import { ApiErrorBoundary } from "./ApiErrorBoundary";
import { Skeleton } from "@/components/ui/skeleton";
import { CartButton } from "./CartButton";
import { LogoutButton } from "./LogoutButton.";
import { LoginButton } from "./LoginButton";
import { ConfirmModal } from "./ConfirmModal";

export const Navbar = () => {
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();
  const isLogin = useAuthStore((state) => state.isLogin);
  // const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const checkLoginStatus = useAuthStore((state) => state.checkLoginStatus);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  const handleLogout = () => {
    openModal();
  };

  const handleConfirmLogout = () => {
    logout();
    Cookies.remove("accessToken");
    closeModal();
  };

  const handleClickLogo = () => {
    navigate(pageRoutes.main);
  };

  return (
    <>
      <nav className="h-32 flex items-center justify-between px-4 md:px-52 border-b border-borderGray">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1
              className="text-xl font-bold cursor-pointer"
              onClick={handleClickLogo}
            >
              경향 문고
            </h1>
            <div className="flex items-center space-x-4">
              {isLogin ? (
                <ApiErrorBoundary>
                  <Suspense fallback={<Skeleton className="w-24 h-8" />}>
                    <CartButton />
                    <LogoutButton onClick={handleLogout} />
                  </Suspense>
                </ApiErrorBoundary>
              ) : (
                <LoginButton />
              )}
            </div>
          </div>
        </div>
      </nav>
      <ConfirmModal
        title="로그아웃 확인"
        description="로그아웃 하시겠습니까?"
        handleClickDisagree={closeModal}
        handleClickAgree={handleConfirmLogout}
        isModalOpened={isOpen}
      />
    </>
  );
};
