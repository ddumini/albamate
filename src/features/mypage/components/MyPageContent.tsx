import dummy from './dummy';
import MyPageCardSection from './MyPageCardSection';
import MyPageFilters from './MyPageFilters';
import MyPageTop from './MyPageTop';

const MyPageContent = () => {
  const data = dummy.data;
  return (
    <div className="max-w-1480 px-24 pt-85 md:px-72 lg:mx-auto">
      <MyPageTop />
      <MyPageFilters />
      <MyPageCardSection cardInfo={data} />
    </div>
  );
};
export default MyPageContent;
