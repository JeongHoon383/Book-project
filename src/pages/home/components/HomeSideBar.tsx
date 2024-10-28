export const HomeSideBar = () => {
  return (
    <div className="h-screen basis-1/5 border-r border-borderGray flex flex-col gap-10">
      <div className="flex flex-col gap-5 p-5">
        <div>홈으로</div>
        <div>신간도서</div>
        <div>베스트셀러</div>
      </div>
      <div className="flex flex-col gap-5 p-5">
        <div>관리하기</div>
        <div>마이페이지</div>
        <div>구매 내역</div>
        <div>장바구니</div>
      </div>
      <div className="flex flex-col gap-5 p-5">
        <div>관리자</div>
        <div>상품 관리</div>
      </div>
    </div>
  );
};
