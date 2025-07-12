const Tab = () => {
  return (
    <div className="flex w-327 gap-8 rounded-md bg-gray-25 p-6 text-[14px] md:w-422 md:text-[16px]">
      <div className="rounded-md bg-white px-23 py-4 text-black md:px-35 md:py-8">
        내가 쓴 글
      </div>
      <div className="rounded-md bg-white px-23 py-4 text-black md:px-35 md:py-8">
        내가 쓴 댓글
      </div>
      <div className="rounded-md bg-white px-23 py-4 text-black md:px-35 md:py-8">
        스크랩
      </div>
    </div>
  );
};

export default Tab;
