interface CommentStatsProps {
  count: number;
}

const CommentStats = ({ count }: CommentStatsProps) => {
  return (
    <div className="border-b border-gray-200">
      <h3 className="mt-100 mb-16 text-lg font-semibold md:text-xl lg:text-2xl">
        댓글({count})
      </h3>
    </div>
  );
};

export default CommentStats;
