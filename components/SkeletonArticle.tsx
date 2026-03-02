import Skeleton from 'react-loading-skeleton'

const SkeletonArticle = () => {
  return (
    <div className="skeleton-article">
        <Skeleton height={64} width={64} count={1} /> 
        <Skeleton height={20} width={120} count={1} /> 
        <Skeleton height={16} count={3} />
    </div>
  );
};

export default SkeletonArticle;