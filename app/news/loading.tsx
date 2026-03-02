import SkeletonArticle from "@/components/SkeletonArticle";

export default function Loading() {
  return (
    <section className="space-y-6">
      <div className="h-8 w-48 rounded bg-gray-200 animate-pulse" />
      <SkeletonArticle count={6} />
    </section>
  );
}