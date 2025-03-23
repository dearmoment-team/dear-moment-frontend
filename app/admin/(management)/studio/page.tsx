import Plus from '../../../assets/icons/svg/plus_circle.svg';
import Minus from '../../../assets/icons/svg/minus_circle.svg';

const StudioPage = () => {
  return (
    <div className="border max-w-[90rem] mx-auto my-[5rem]">
      {/* <header className="text-center text-[2.4rem] font-semibold">스튜디오 등록</header> */}
      <form className="w-full space-y-6 p-6 text-[1.1rem] text-[#000000]">
        {/* 상태 */}
        <div>
          <label className="block font-medium mb-1">상태</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1">
              <input type="radio" name="status" value="active" />
              <span>활성</span>
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" name="status" value="inactive" />
              <span>비활성</span>
            </label>
          </div>
        </div>

        {/* 스튜디오명 & 연락처 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">스튜디오명 *</label>
            <input
              type="text"
              className="w-full p-2 border border-solid border-[#D8DDE3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">연락처 *</label>
            <input
              type="text"
              className="w-full p-2 border border-solid border-[#D8DDE3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
            />
          </div>
        </div>

        {/* 소개글 */}
        <div>
          <label className="block font-medium mb-1">스튜디오 소개글 *</label>
          <textarea className="w-full p-2 h-28 border border-solid border-[#D8DDE3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]" />
        </div>
        <div>
          <label className="block font-medium mb-1">소속 작가 소개글</label>
          <textarea className="w-full p-2 h-28 border border-solid border-[#D8DDE3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]" />
        </div>

        {/* 링크 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">인스타그램 링크 *</label>
            <input
              type="text"
              className="w-full p-2 border border-solid border-[#D8DDE3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">카카오톡 채널 링크 *</label>
            <input
              type="text"
              className="w-full p-2 border border-solid border-[#D8DDE3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
            />
          </div>
        </div>

        {/* 제휴 업체 (반복 가능 영역 예시 1개만) */}
        <div>
          <label className="block font-medium mb-2">일반 제휴 업체</label>
          <div className="grid grid-cols-4 gap-2 items-center mb-2">
            <select className="w-full p-2 border border-solid border-[#D8DDE3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]">
              <option>제휴 업체 구분</option>
            </select>
            <input
              type="text"
              placeholder="제휴 업체명"
              className="w-full p-2 text-[#4C5C6B] border border-solid border-[#D8DDE3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
            />
            <input
              type="text"
              placeholder="링크"
              className="w-full p-2 text-[#4C5C6B] border border-solid border-[#D8DDE3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
            />
            <div className="flex gap-2 w-full">
              <Plus width={16.5} height={16.5} />
              <Minus width={16.5} height={16.5} />
            </div>
          </div>
        </div>

        {/* 예약 전 안내사항 */}
        <div>
          <label className="block font-medium mb-1">예약 전 안내사항</label>
          <textarea className="w-full p-2 h-28 border border-solid border-[#D8DDE3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]" />
        </div>

        {/* 취소 및 환불규정 */}
        <div>
          <label className="block font-medium mb-1">취소 및 환불규정</label>
          <textarea className="w-full p-2 h-28 border border-solid border-[#D8DDE3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]" />
        </div>

        {/* 버튼 */}
        <div className="flex justify-end gap-2 mt-6">
          <button type="button" className="bg-[#E0E0E0] text-black px-4 py-2 rounded">
            취소
          </button>
          <button type="submit" className="bg-[#3F3F3F] text-white px-4 py-2 rounded">
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudioPage;
