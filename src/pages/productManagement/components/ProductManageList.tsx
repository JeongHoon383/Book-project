export const ProductManageList = () => {
  return (
    <div className="flex items-center py-10 border-b border-borderGray">
      <div className="flex items-center basis-5/12">
        <div className="w-10">
          <input type="checkbox" />
        </div>
        <div className="flex gap-5">
          <div>
            <img
              src="https://image.yes24.com/goods/110641272/L"
              className="w-24 h-24 object-cover"
            />
          </div>
          <div className="min-w-[300px]">
            <div className="flex flex-col justify-center max-w-[300px] h-full gap-2 ">
              <div className="font-bold">파친코</div>
              <div className="text-sm text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                이민진 저 | 신승미 역 | 인플루엔셜 | 2022년 07월
              </div>
              <div className="text-sm text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                “역사는 우리를 저버렸지만, 그래도 상관없다” 역사에 외면당한
                재일조선인 가족의 대서사극 전 세계를 감동시킨 이민진 작가 화제작
                『파친코』 새롭게 출간!
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex basis-7/12 justify-between">
        <div className="w-[10%] text-center">12,900원</div>
        <div className="w-[15%] text-center">경영 / 경제</div>
        <div className="w-[10%] text-center">판매완료</div>
        <div className="w-[5%] text-center">10</div>
        <div className="w-[15%] text-center">2024-10-20</div>
        <div className="w-[15%] text-center">2024-10-21</div>
      </div>
    </div>
  );
};
