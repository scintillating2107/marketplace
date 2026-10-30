"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AssistantInterface } from "@/components/AssistantInterface";

function AssistantContent() {
  const params = useSearchParams();
  const problem = params.get("problem") ?? "";

  return (
    <div className="container-page py-10">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold">
          Tell Us the Problem. We&apos;ll Help You Find the Solution.
        </h1>
        <p className="mt-3 text-muted">
          Describe what you need in your own words, and discover the services that make the most
          sense. Uses a transparent rule-based matcher — not a live AI model.
        </p>
      </header>
      <div className="mt-10">
        <AssistantInterface initialQuery={problem} />
      </div>
    </div>
  );
}

export default function AssistantPage() {
  return (
    <Suspense fallback={<div className="container-page py-20">Loading…</div>}>
      <AssistantContent />
    </Suspense>
  );
}
