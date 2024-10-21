import { Button } from "@/components/ui/button";
import { ProductManageList } from "./components/ProductManageList";
import { Plus } from "lucide-react";
import { useModal } from "@/hooks/useModal";
import { useAuthStore } from "@/store/auth/useAuthStore";
// import { lazy } from "react";

// 상품 등록 클릭시 상품 등록할 수 있는 모달창 나옴
//

// const ProductRegistrationModal = lazy(() => import)

export const ProductManageMent = () => {
  const { openModal } = useModal();
  // isOpen, onClose
  const { user } = useAuthStore();

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex justify-between items-center border-b border-borderGray pb-10">
          <div className="flex gap-32">
            <div>전체 19</div>
            <div>판매중 18</div>
            <div>판매완료 1</div>
          </div>
          <div>
            {user?.isSeller && (
              <Button onClick={openModal}>
                <Plus className=" h-4 w-4" />
                상품 등록
              </Button>
            )}
          </div>
        </div>
        <div className="flex justify-end items-center p-5">
          <div className="flex gap-12">
            <div>최신순</div>
            <div>가격순</div>
            <div>수정</div>
            <div>삭제</div>
          </div>
        </div>
        <div className="flex justify-between items-center pb-5 border-b border-borderGray">
          <div className="flex items-center basis-5/12">
            {/* 체크 시작 */}
            <div className="w-10">
              <input type="checkbox" />
            </div>
            <div>상품명</div>
          </div>
          <div className="flex justify-between basis-7/12">
            <div className="w-[10%] text-center">판매가</div>
            <div className="w-[15%] text-center">카테고리</div>
            <div className="w-[10%] text-center">상태</div>
            <div className="w-[5%] text-center">재고</div>
            <div className="w-[15%] text-center">등록일</div>
            <div className="w-[15%] text-center">수정일</div>
          </div>
        </div>
      </div>
      <div>
        <ProductManageList />
      </div>
    </div>
  );
};
