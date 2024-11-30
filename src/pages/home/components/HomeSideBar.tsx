import { pageRoutes } from "@/apiRoutes";
import { useModal } from "@/hooks/useModal";
import { CartModal } from "@/pages/common/components/CartModal";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useCartStore } from "@/store/cart/useCartStore";
import { useToastStore } from "@/store/toast/useToastStore";
import {
  BookPlus,
  CreditCard,
  House,
  Settings,
  ShoppingBasket,
  Star,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HomeSideBar = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const cart = useCartStore((state) => state.cart);
  const addToast = useToastStore((state) => state.addToast);
  const {
    isOpen: isCartModalOpen,
    openModal: openCartModal,
    closeModal: closeCartModal,
  } = useModal();

  const handleClickIcon = (page: string) => {
    navigate(page);
  };

  const handleClickCart = () => {
    if (user?.isSeller === true) {
      addToast(
        "구매자 전용 기능입니다. 구매자 계정으로 로그인하여 이용해 주세요",
        "error"
      );
      return;
    }

    if (cart.length === 0) {
      addToast("장바구니에 상품을 담아주세요", "error");
      return;
    }

    openCartModal();
  };

  const handleClickProductManagement = () => {
    if (user?.isSeller === false) {
      addToast(
        "판매자 전용 기능입니다. 판매자 계정으로 로그인하여 이용해 주세요",
        "error"
      );
      return;
    }

    navigate(pageRoutes.productManageMent);
  };

  return (
    <div className="md:flex w-full max-w-[200px] h-screen border-r text-lg border-borderGray flex-col gap-10 hidden">
      <div className="flex flex-col gap-5 p-5">
        <div
          className="flex gap-3 cursor-pointer"
          onClick={() => handleClickIcon(pageRoutes.main)}
        >
          <House />
          홈으로
        </div>
        <div className="flex gap-3">
          <BookPlus />
          신간도서
        </div>
        <div className="flex gap-3">
          <Star />
          베스트셀러
        </div>
      </div>
      <div className="flex flex-col gap-5 p-5">
        <div className="text-xl font-bold">관리하기</div>
        <div className="flex gap-3">
          <User />
          마이페이지
        </div>
        <div
          className="flex gap-3 cursor-pointer"
          onClick={() => handleClickIcon(pageRoutes.purchaseHistory)}
        >
          <CreditCard />
          구매 내역
        </div>
        <div className="flex gap-3 cursor-pointer" onClick={handleClickCart}>
          <ShoppingBasket />
          장바구니
        </div>
      </div>
      <div className="flex flex-col gap-5 p-5">
        <div className="text-xl font-bold">관리자</div>
        <div
          className="flex gap-3 cursor-pointer"
          onClick={handleClickProductManagement}
        >
          <Settings />
          상품 관리
        </div>
      </div>
      <CartModal
        isModalOpened={isCartModalOpen}
        handleClickDisagree={closeCartModal}
      />
    </div>
  );
};
