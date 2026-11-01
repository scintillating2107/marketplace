import Image from "next/image";

interface PageBannerProps {
  title: string;
  subtitle?: string;
  image: string;
  priority?: boolean;
}

export function PageBanner({ title, subtitle, image, priority = false }: PageBannerProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover opacity-20"
          sizes="100vw"
          priority={priority}
        />
      </div>
      <div className="container-page relative py-5 sm:py-6">
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-muted">{subtitle}</p> : null}
      </div>
    </section>
  );
}
