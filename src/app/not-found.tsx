import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">404</p>
      <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Page not found</h1>
      <p className="mt-3 max-w-md text-muted">
        This route is not in the demo. Head home or browse services to continue.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/">
          <Button>Go home</Button>
        </Link>
        <Link href="/explore">
          <Button variant="outline">Explore services</Button>
        </Link>
      </div>
    </div>
  );
}
