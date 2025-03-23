const AdminPage = () => {
  return (
    <div className="flex flex-col text-[1.6rem] h-full justify-center items-center gap-[4rem]">
      <header className="text-title2 tracking-normal font-semibold">백오피스 로그인</header>
      <section className="flex flex-col items-center gap-[1rem]">
        <input
          placeholder="아이디"
          className="w-[40.3rem] h-[4rem] px-[1.8rem] py-[0.9rem] border border-solid border-[#D8DDE3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
        />
        <input
          placeholder="비밀번호"
          className="w-[40.3rem] h-[4rem] px-[1.8rem] py-[0.9rem] border border-solid border-[#D8DDE3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8DDE3]"
        />
        <button className="w-[40.3rem] h-[5.6rem] text-white bg-[#3F3F3F] rounded-md mt-[0.9rem]">로그인</button>
      </section>
    </div>
  );
};

export default AdminPage;
