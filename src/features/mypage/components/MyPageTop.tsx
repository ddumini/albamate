import MyPageTopButtons from './MyPageTopButtons';

interface MypageTopProps {
  role: string;
}

const MyPageTop = ({ role }: MypageTopProps) => {
  return (
    <section className="flex w-full items-center justify-between py-24">
      <h1 className="text-3xl font-semibold">마이 페이지</h1>
      <MyPageTopButtons role={role} />
    </section>
  );
};

export default MyPageTop;
