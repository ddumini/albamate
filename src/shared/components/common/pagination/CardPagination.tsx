interface CardPaginationProps {
  currentPage: number;
  totalPage: number;
}

const CardPagination = ({ currentPage, totalPage }: CardPaginationProps) => {
  return (
    <div className="flex items-center justify-center w-47 h-24 lg:w-75 lg:h-42 rounded-xl lg:rounded-4xl bg-black/20 py-3 lg:py-8 text-xs lg:text-2lg font-normal text-gray-100">
      <span className="text-gray-50 font-semibold">{currentPage}</span>&nbsp;/{" "}
      {totalPage}
    </div>
  );
};

export default CardPagination;
