"use client";

export function MenuSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* SECTION SKELETON */}
      <div className="space-y-8">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="space-y-4">
            {/* category title (centered skeleton text) */}
            <div className="flex justify-center">
              <div className="h-6 w-60 rounded bg-muted" />
            </div>

            {/* items */}
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="h-55 w-full rounded-xl bg-muted" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
