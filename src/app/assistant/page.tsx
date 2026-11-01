"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AssistantInterface } from "@/components/AssistantInterface";
import { PageBanner } from "@/components/PageBanner";
import { PAGE_HEROES } from "@/data/content";

function AssistantContent() {
  const params = useSearchParams();
  const problem = params.get("problem") ?? "";
  const hero = PAGE_HEROES.assistant;

  return (
    <>
      <PageBanner title={hero.title} image={hero.image} />
      <div className="container-page py-8">
        <AssistantInterface initialQuery={problem} />
      </div>
    </>
  );
}

export default function AssistantPage() {
  return (
    <Suspense fallback={<div className="container-page py-20">Loading…</div>}>
      <AssistantContent />
    </Suspense>
  );
}
