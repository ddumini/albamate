import AlbatalkListClient from '@/features/albatalk/components/albatalk-list/AlbatalkListClient';
import { SearchParamsSchema } from '@/features/albatalk/schemas/albatalk.schema';

interface AlbaTalkPageProps {
  searchParams?: Promise<{
    cursor?: string;
    limit?: string;
    orderBy?: string;
    keyword?: string;
  }>;
}

const AlbaTalkPage = async ({ searchParams }: AlbaTalkPageProps) => {
  const resolvedSearchParams = await searchParams;

  // URL 파라미터를 초기값으로 변환
  const initialParams = SearchParamsSchema.parse(resolvedSearchParams || {});

  return <AlbatalkListClient initialParams={initialParams} />;
};

export default AlbaTalkPage;
