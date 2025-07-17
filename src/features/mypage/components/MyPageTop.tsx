import MyPageTopButtons from './MyPageTopButtons';

const MyPageTop = () => {
  return (
    <section className="flex items-center justify-between px-220 py-24">
      <h1 className="text-3xl font-semibold">마이 페이지</h1>
      <MyPageTopButtons />
    </section>
  );
};

export default MyPageTop;
