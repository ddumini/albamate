import AlbaListPage from '@/features/albalist/components/AlbaListPage';
import { albaMockData } from '@/features/albalist/mocks/mockData'; // 예시
import InnerContainer from '@/shared/components/container/InnerContainer';
import { AlbaItem, User } from '@/shared/types/alba';

const Page = async () => {
  // ✅ 실제로는 fetch(`${process.env.API_URL}/forms`) 같은 API 호출
  const data: AlbaItem[] = albaMockData;

  // 예시 유저 (로그인 로직 없다면 null or Guest 처리)
  const user: User = { role: 'OWNER' };

  return (
    <InnerContainer size="md">
      <AlbaListPage data={data} user={user} />
    </InnerContainer>
  );
};

export default Page;
