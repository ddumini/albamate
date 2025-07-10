interface CardPaginationProps {
  currentPage: number;
  totalPage: number;
}

const CardPagination = ({ currentPage, totalPage }: CardPaginationProps) => {
  return (
    <div className="flex items-center justify-center w-47 h-24 pc:w-75 pc:h-42 rounded-xl pc:rounded-4xl bg-black/20 py-3 pc:py-8 text-xs pc:text-2lg font-normal text-gray-100">
      <span className="text-gray-50 font-semibold">{currentPage}</span>&nbsp;/{" "}
      {totalPage}
    </div>
  );
};

export default CardPagination;
