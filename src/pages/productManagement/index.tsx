import { ProductManageList } from "./components/ProductManageList";

export const ProductManageMent = () => {
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex justify-between items-center border-b border-borderGray pb-10">
          <div className="flex gap-32">
            <div>전체 19</div>
            <div>판매중 18</div>
            <div>판매완료 1</div>
          </div>
          <div>상품등록</div>
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
          <div>전체 체크</div>
          <div className="basis-36">상품명</div>
          <div>판매가</div>
          <div>카테고리</div>
          <div>상태</div>
          <div>재고</div>
          <div>등록일</div>
          <div>수정일</div>
        </div>
      </div>
      <div>
        <ProductManageList />
      </div>
    </div>
  );
};
