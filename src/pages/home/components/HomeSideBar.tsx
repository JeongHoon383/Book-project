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
    <div className="md:flex w-full max-w-[150px] text-xs h-screen border-r border-borderGray flex-col gap-5 hidden">
      <div className="flex flex-col gap-5 p-5">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleClickIcon(pageRoutes.main)}
        >
          <House className="w-5 h-5" />
          홈으로
        </div>
        <div className="flex items-center gap-2">
          <BookPlus className="w-5 h-5" />
          신간도서
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5" />
          베스트셀러
        </div>
      </div>
      <div className="flex flex-col gap-5 p-5">
        <div className="text-base font-bold">관리하기</div>
        <div className="flex items-center gap-2">
          <User className="w-5 h-5" />
          마이페이지
        </div>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleClickIcon(pageRoutes.purchaseHistory)}
        >
          <CreditCard className="w-5 h-5" />
          구매 내역
        </div>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleClickCart}
        >
          <ShoppingBasket className="w-5 h-5" />
          장바구니
        </div>
      </div>
      <div className="flex flex-col gap-5 p-5">
        <div className="text-base font-bold">관리자</div>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleClickProductManagement}
        >
          <Settings className="w-5 h-5" />
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
