import MyPageContent from '@/features/mypage/components/MyPageContent';

const MyPage = () => {
  const role = 'OWNER';
  const tapOption = [
    { id: 'post', label: '내가 쓴 글' },
    { id: 'comment', label: '내가 쓴 댓글' },
  ];
  return <MyPageContent role={role} tapOption={tapOption} />;
};

export default MyPage;
