const skeletonItemClassName =
  'animate-pulse rounded-lg bg-teal-200 dark:bg-teal-800';
const SKELETON_PAGE_BUTTON_COUNT = 5;

export default function PaginationSkeleton() {
  return (
    <div aria-hidden className="flex items-center justify-center gap-2 py-8">
      <div className={`h-10 min-w-16 ${skeletonItemClassName}`} />
      {Array.from({ length: SKELETON_PAGE_BUTTON_COUNT }, (_, index) => (
        <div key={index} className={`h-10 w-10 ${skeletonItemClassName}`} />
      ))}
      <div className={`h-10 min-w-16 ${skeletonItemClassName}`} />
    </div>
  );
}
