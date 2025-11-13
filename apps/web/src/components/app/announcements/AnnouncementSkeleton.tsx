import { Skeleton } from "@/components/ui/skeleton";

function AnnouncementSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start">
      {/* Left: Author Info */}
      <div className="flex items-center gap-3 w-full md:w-2/6">
        {/* Avatar */}
        <Skeleton className="h-12 w-12 rounded-full" />

        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>

      {/* Right: Content */}
      <div className="flex-1 w-full md:w-4/6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-[90%]" />
          <Skeleton className="h-3 w-[75%]" />
        </div>
      </div>
    </div>
  );
}

export default AnnouncementSkeleton;
