import { availablePeriods, cameraType, correctionStyle } from '../constants';

const ProductForm = () => {
  return (
    <>
      <section className="space-y-10 p-6 border rounded-md w-full mx-auto text-[1.2rem] font-semibold text-[#000000]">
        {/* 상품 유형 + 촬영 장소 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">
              상품 유형 <span className="text-[#FF0000]">*</span>
            </label>
            <select className="w-full p-2 border border-solid border-[#D8DDE3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]">
              <option>웨딩스냅</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">
              촬영 장소 <span className="text-[#FF0000]">*</span>
            </label>
            <select className="w-full p-2 border border-solid border-[#D8DDE3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]">
              <option>제주</option>
            </select>
          </div>
        </div>

        {/* 촬영 가능 시기 */}
        <div>
          <label className="block mb-1">
            촬영 가능 시기 <span className="text-[#FF0000]">*</span>
          </label>
          <div className="flex flex-wrap gap-4">
            {availablePeriods.map((item, index) => {
              return (
                <label key={index} className="inline-flex items-center gap-2 text-[#5C667B] text-sm font-medium">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border border-[#C6CDD5] text-black focus:ring-1 focus:ring-[#D8DDE3]"
                  />
                  <span className="text-[1.2rem]">{item}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* 카메라 종류 */}
        <div>
          <label className="block mb-1">
            카메라 종류 <span className="text-[#FF0000]">*</span>
          </label>
          <div className="flex gap-4">
            {cameraType.map((item, index) => {
              return (
                <label key={index} className="inline-flex items-center gap-2 text-[#5C667B] text-sm font-medium">
                  <input
                    type="radio"
                    name="cameraType"
                    value={item}
                    className="w-4 h-4 rounded border border-[#C6CDD5] text-black focus:ring-1 focus:ring-[#D8DDE3]"
                  />
                  <span className="text-[1.2rem]">{item}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* 보정 스타일 */}
        <div>
          <label className="block mb-1">
            보정 스타일 <span className="text-[#FF0000]">*</span>
          </label>
          <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
            {correctionStyle.map((item, index) => {
              return (
                <label key={index} className="inline-flex items-center gap-2 text-[#5C667B] text-sm font-medium">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border border-[#C6CDD5] text-black focus:ring-1 focus:ring-[#D8DDE3]"
                  />
                  <span className="text-[1.2rem]">{item}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* 이미지 업로드 영역 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">
              대표 이미지 <span className="text-[#FF0000]">*</span>
            </label>
            <input type="file" id="mainImage" className="hidden" accept="image/*" />
            <label
              htmlFor="mainImage"
              className="block w-full border border-dashed border-black rounded-md text-center py-6 cursor-pointer"
            >
              파일 추가
            </label>
          </div>
          <div>
            <label className="block mb-1">
              서브 이미지 <span className="text-[#FF0000]">*</span>
            </label>
            <input type="file" id="subImage" className="hidden" accept="image/*" />
            <label
              htmlFor="subImage"
              className="block w-full border border-dashed border-black rounded-md text-center py-6 cursor-pointer"
            >
              파일 추가
            </label>
          </div>
        </div>

        {/* 추가 이미지 */}
        <div>
          <label className="block mb-1">추가 이미지</label>
          <input type="file" id="additionalImage" className="hidden" accept="image/*" />
          <label
            htmlFor="additionalImage"
            className="block w-full border border-dashed border-black rounded-md text-center py-6 cursor-pointer"
          >
            파일 추가
          </label>
        </div>
      </section>
    </>
  );
};

export default ProductForm;
