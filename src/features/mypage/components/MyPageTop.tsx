import MyPageTopButtons from './MyPageTopButtons';

const MyPageTop = ({ isOwner }: { isOwner: boolean }) => {
  return (
    <section className="flex w-full items-center justify-between py-24">
      <h1 className="text-3xl font-semibold">마이 페이지</h1>
      <MyPageTopButtons isOwner={isOwner} />
    </section>
  );
};

export default MyPageTop;
