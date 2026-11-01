import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HOW_IT_WORKS } from "@/data/content";
import { Button } from "@/components/ui/Button";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-surface py-16 sm:py-20">
      <div className="container-page">
        <p className="section-eyebrow text-center">How it works</p>
        <h2 className="mt-2 text-center text-2xl font-extrabold sm:text-3xl">
          Book in 3 simple steps
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted sm:text-base">
          Getting home services has never been easier. Follow these steps in the demo flow.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {HOW_IT_WORKS.map((item) => (
            <div
              key={item.step}
              className="relative rounded-2xl border border-border bg-background p-6 text-center shadow-sm"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                {item.step}
              </span>
              <h3 className="mt-4 text-lg font-bold capitalize">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/explore">
            <Button size="lg" className="rounded-full px-8">
              Get started now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
