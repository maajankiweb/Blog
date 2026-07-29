export function BlogCardSkeleton() {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm flex flex-col h-full animate-pulse">
      <div className="aspect-[16/10] bg-zinc-200 dark:bg-zinc-800 w-full"></div>
      <div className="p-md flex-grow space-y-4">
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3"></div>
        <div className="space-y-2">
          <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6"></div>
          <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-2/3"></div>
        </div>
        <div className="space-y-2 pt-4">
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6"></div>
        </div>
        <div className="pt-6 mt-auto border-t border-outline-variant/20 flex items-center justify-between">
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4"></div>
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-8"></div>
        </div>
      </div>
    </div>
  );
}

export function BlogGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter my-xl">
      {Array.from({ length: count }).map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function PostDetailSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto py-xl px-margin-mobile animate-pulse space-y-8">
      <div className="space-y-4">
        <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-20"></div>
        <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6"></div>
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3"></div>
      </div>
      <div className="aspect-[21/9] bg-zinc-200 dark:bg-zinc-800 rounded-xl w-full"></div>
      <div className="space-y-4 pt-6">
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6"></div>
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-2/3"></div>
      </div>
    </div>
  );
}
