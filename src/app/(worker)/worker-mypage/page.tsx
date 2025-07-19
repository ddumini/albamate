import MyPageContent from '@/features/mypage/components/MyPageContent';

const MyPage = () => {
  const tapOption = [
    { id: 'post', label: '내가 쓴 글' },
    { id: 'comment', label: '내가 쓴 댓글' },
    { id: 'scrap', label: '스크랩' },
  ];
  return <MyPageContent tapOption={tapOption} />;
};

export default MyPage;
