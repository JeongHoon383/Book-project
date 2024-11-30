import { pageRoutes } from "@/apiRoutes";
import { useModal } from "@/hooks/useModal";
import { CartModal } from "@/pages/common/components/CartModal";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useToastStore } from "@/store/toast/useToastStore";
import { useNavigate } from "react-router-dom";
import {
  BookPlus,
  CreditCard,
  House,
  Settings,
  ShoppingBasket,
  Star,
  User,
} from "lucide-react";

interface MenuModalProps {
  isModalOpened: boolean;
  handleClickDisagree: () => void;
}

export const MenuModal: React.FC<MenuModalProps> = ({
  isModalOpened,
  handleClickDisagree,
}) => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const addToast = useToastStore((state) => state.addToast);
  const {
    isOpen: isCartModalOpen,
    openModal: openCartModal,
    closeModal: closeCartModal,
  } = useModal();

  const handleIconClick = (page: string) => {
    navigate(page);
    handleClickDisagree();
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
    handleClickDisagree();
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-3/4 max-w-[300px] h-full bg-white shadow-lg z-50 transform transition-transform ${
          isModalOpened ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-10 p-5 mt-20">
          <div className="flex flex-col gap-5">
            <div
              className="flex gap-3 cursor-pointer"
              onClick={() => handleIconClick(pageRoutes.main)}
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
          <div className="flex flex-col gap-5">
            <div className="text-xl font-bold">관리하기</div>
            <div className="flex gap-3">
              <User />
              마이페이지
            </div>
            <div
              className="flex gap-3 cursor-pointer"
              onClick={() => handleIconClick(pageRoutes.purchaseHistory)}
            >
              <CreditCard />
              구매 내역
            </div>
            <div
              className="flex gap-3 cursor-pointer"
              onClick={handleClickCart}
            >
              <ShoppingBasket />
              장바구니
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="text-xl font-bold">관리자</div>
            <div
              className="flex gap-3 cursor-pointer"
              onClick={() => handleIconClick(pageRoutes.productManageMent)}
            >
              <Settings />
              상품 관리
            </div>
          </div>
        </div>

        <div
          className="absolute top-4 right-4 cursor-pointer text-xl"
          onClick={handleClickDisagree}
        >
          ✕
        </div>
      </div>
      <CartModal
        isModalOpened={isCartModalOpen}
        handleClickDisagree={closeCartModal}
      />
    </>
  );
};
