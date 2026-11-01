import Image from "next/image";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/data/content";

export function TestimonialsSection() {
  return (
    <section id="reviews" className="scroll-mt-24 bg-surface py-16 sm:py-20">
      <div className="container-page">
        <div className="text-center">
          <p className="section-eyebrow">Testimonials</p>
          <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">Loved by thousands</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
            Demo stories showing how reviews and trust signals appear after booking.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <article
              key={t.id}
              className="flex flex-col rounded-2xl border border-border bg-background p-6 shadow-sm"
            >
              <p className="flex-1 text-sm leading-relaxed text-foreground">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <Image
                  src={t.image}
                  alt=""
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-xs text-muted">
                    {t.city} • {t.service.split(" ")[0]}…
                  </p>
                </div>
                <div className="ml-auto flex gap-0.5 text-warning">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
