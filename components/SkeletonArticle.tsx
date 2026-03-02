type SkeletonArticleProps = {
  count?: number;
};

export default function SkeletonArticle({ count = 5 }: SkeletonArticleProps) {
  return (
    <ul className="space-y-6" aria-label="Loading articles" aria-busy="true">
      {Array.from({ length: count }).map((_, index) => (
        <li
          key={index}
          className="bg-white p-6 rounded-xl shadow animate-pulse space-y-4"
        >
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="h-6 w-3/4 rounded bg-gray-200" />
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-5/6 rounded bg-gray-200" />
          </div>
          <div className="h-4 w-32 rounded bg-gray-200" />
        </li>
      ))}
    </ul>
  );
}