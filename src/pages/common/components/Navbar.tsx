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
import { CartModal } from "./CartModal";
import { useCartStore } from "@/store/cart/useCartStore";
import { useToastStore } from "@/store/toast/useToastStore";
import SearchBar from "./SearchBar";

export const Navbar = () => {
  const navigate = useNavigate();
  const {
    isOpen: isConfirmModalOpen,
    openModal: openConfirmModal,
    closeModal: closeConfirmModal,
  } = useModal(); // ConfirmModal 상태
  const {
    isOpen: isCartModalOpen,
    openModal: openCartModal,
    closeModal: closeCartModal,
  } = useModal(); // CartModal 상태
  const isLogin = useAuthStore((state) => state.isLogin);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const checkLoginStatus = useAuthStore((state) => state.checkLoginStatus);

  const cart = useCartStore((state) => state.cart);
  const initCart = useCartStore((state) => state.initCart);

  const { addToast } = useToastStore();

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  useEffect(() => {
    if (isLogin && user?.id) {
      initCart(user.id);
    }
  }, [isLogin, user, initCart]);

  const handleLogout = () => {
    openConfirmModal();
  };

  const handleConfirmLogout = () => {
    logout();
    Cookies.remove("accessToken");
    closeConfirmModal();
  };

  const handleClickLogo = () => {
    navigate(pageRoutes.main);
  };

  const handleClickCart = () => {
    if (user?.isSeller === true) {
      addToast(
        "구매 전용 기능입니다. 구매자 계정으로 로그인하여 이용해 주세요",
        "error"
      );
      return;
    }
    openCartModal();
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
            <SearchBar />
            <div className="flex items-center space-x-4">
              {isLogin ? (
                <ApiErrorBoundary>
                  <Suspense fallback={<Skeleton className="w-24 h-8" />}>
                    <CartButton onClick={handleClickCart} cart={cart} />
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
        handleClickDisagree={closeConfirmModal}
        handleClickAgree={handleConfirmLogout}
        isModalOpened={isConfirmModalOpen}
      />
      <CartModal
        isModalOpened={isCartModalOpen}
        handleClickDisagree={closeCartModal}
      />
    </>
  );
};
