export default function Loading() {
  return (
    <div className="container-page py-16" aria-busy="true" aria-label="Loading">
      <div className="h-8 w-40 animate-pulse rounded-lg bg-border" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="aspect-[4/5] animate-pulse rounded-2xl bg-border/40" />
        ))}
      </div>
    </div>
  );
}
