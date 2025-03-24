const ProductSingleOption = () => {
  return (
    <div className="space-y-10 p-6 border rounded-md w-full mx-auto text-[1.2rem] font-semibold text-[#000000]">
      {/* 옵션 헤더 */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">옵션</h2>
      </div>

      {/* 옵션 종류 + 옵션명 */}
      <div className="grid grid-cols-3 gap-4 items-center">
        <div className="flex items-center gap-4">
          <label className="font-medium">
            옵션 종류 <span className="text-[#FF0000]">*</span>
          </label>
          <label className="inline-flex items-center gap-1">
            <input type="radio" name="optionType" />
            단품
          </label>
          <label className="inline-flex items-center gap-1">
            <input type="radio" name="optionType" />
            패키지
          </label>
        </div>
        <div className="flex items-center gap-4">
          <label className="w-24 font-medium shrink-0">
            옵션명 <span className="text-[#FF0000]">*</span>
          </label>
          <input
            type="text"
            className="w-full p-2 border border-solid border-[#D8DDE3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
          />
        </div>
      </div>

      {/* 할인 여부 */}
      <div className="flex items-center gap-4">
        <label className="font-medium">
          할인 여부 <span className="text-[#FF0000]">*</span>
        </label>
        <label className="inline-flex items-center gap-1">
          <input type="radio" name="discount" />
          할인 있음
        </label>
        <label className="inline-flex items-center gap-1">
          <input type="radio" name="discount" />
          할인 없음
        </label>
      </div>

      {/* 가격 정보 */}
      <div className="grid grid-cols-3 gap-4 items-center">
        <div>
          <label className="font-medium">
            원 판매가 <span className="text-[#FF0000]">*</span>
          </label>
          <div className="flex items-center gap-1">
            <input
              type="number"
              className="w-full p-2 border border-solid border-[#D8DDE3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
            />
            <span>원</span>
          </div>
        </div>
        <div>
          <label className="font-medium">할인가</label>
          <div className="flex items-center gap-1">
            <input type="number" className="w-full border p-2 rounded bg-gray-100" disabled />
            <span className="text-sm text-gray-500">(0% 할인)</span>
          </div>
        </div>
      </div>

      {/* 촬영 장소 / 시간 */}
      <div className="grid grid-cols-3 gap-4 items-center">
        <div>
          <label className="font-medium">
            촬영 장소 수 <span className="text-[#FF0000]">*</span>
          </label>
          <input
            type="number"
            className="w-full p-2 border border-solid border-[#D8DDE3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
          />
        </div>
        <div>
          <label className="font-medium">
            촬영 시간 <span className="text-[#FF0000]">*</span>
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              className="w-full p-2 border border-solid border-[#D8DDE3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
              placeholder="시간"
            />
            <input
              type="number"
              className="w-full p-2 border border-solid border-[#D8DDE3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
              placeholder="분"
            />
          </div>
        </div>
      </div>

      {/* 원본 / 보정본 */}
      <div className="grid grid-cols-3 gap-4 items-center">
        <div>
          <label className="font-medium">
            원본 제공 <span className="text-[#FF0000]">*</span>
          </label>
          <input
            type="text"
            className="w-full p-2 border border-solid border-[#D8DDE3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
          />
        </div>
        <div>
          <label className="font-medium">
            보정본 <span className="text-[#FF0000]">*</span>
          </label>
          <div className="flex items-center gap-1">
            <input
              type="number"
              className="w-full p-2 border border-solid border-[#D8DDE3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
            />
            <span>장</span>
          </div>
        </div>
      </div>

      {/* 의상 수 */}
      <div className="grid grid-cols-3 gap-4 items-center">
        <div>
          <label className="font-medium">
            의상 수 <span className="text-[#FF0000]">*</span>
          </label>
          <div className="flex items-center gap-1">
            <input
              type="number"
              className="w-full p-2 border border-solid border-[#D8DDE3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
            />
            <span>벌</span>
          </div>
        </div>
      </div>

      {/* 상세 정보 */}
      <div>
        <label className="block font-medium mb-1">상품 상세 정보 (기타)</label>
        <textarea className="w-full p-2 border border-solid border-[#D8DDE3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]" />
      </div>

      {/* 선택 추가사항 */}
      <div>
        <label className="block font-medium mb-1">선택 추가사항</label>
        <textarea className="w-full p-2 border border-solid border-[#D8DDE3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]" />
      </div>
    </div>
  );
};

export default ProductSingleOption;
