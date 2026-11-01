"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { ASSISTANT_PROMPTS } from "@/data/services";
import { getRecommendations } from "@/app/actions/recommendations";
import { formatINR } from "@/lib/booking";
import type { RecommendationResult } from "@/types";
import { MatchExplanation } from "@/components/MatchExplanation";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/Button";
import { ComparisonModal } from "@/components/ComparisonModal";

interface Message {
  role: "user" | "assistant";
  text: string;
}

interface Props {
  initialQuery?: string;
}

export function AssistantInterface({ initialQuery = "" }: Props) {
  const router = useRouter();
  const [input, setInput] = useState(initialQuery);
  const [messages, setMessages] = useState<Message[]>([]);
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);

  useEffect(() => {
    if (initialQuery.trim()) {
      submit(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = (text: string) => {
    const q = text.trim();
    if (!q) return;

    setLoading(true);
    setMessages((m) => [...m, { role: "user", text: q }]);

    void getRecommendations(q).then((rec) => {
      setResult(rec);
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: rec.explanation,
        },
      ]);
      setLoading(false);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(input);
    setInput("");
  };

  const bookTop = () => {
    const top = result?.services[0];
    if (!top) return;
    router.push(`/book?serviceId=${top.service.id}`);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <div>
        <div className="max-h-[320px] space-y-4 overflow-y-auto rounded-[var(--radius-card)] border border-border bg-surface p-4">
          {messages.length === 0 && (
            <p className="text-sm text-muted">
              Try describing a problem — matching runs on the server with the same transparent
              rule-based engine (not a live LLM).
            </p>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                  msg.role === "user"
                    ? "bg-primary text-white"
                    : "bg-accent-soft text-foreground"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted">
              <Loader2 className="h-4 w-4 animate-spin" />
              Matching services…
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={3}
            placeholder="Describe your issue in your own words…"
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:border-primary/50 focus:ring-2 focus:ring-accent-soft"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {ASSISTANT_PROMPTS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  setInput(p);
                  submit(p);
                }}
                className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted hover:border-primary/40 hover:text-primary"
              >
                {p.length > 48 ? `${p.slice(0, 48)}…` : p}
              </button>
            ))}
          </div>
          <Button type="submit" className="mt-4 gap-2" disabled={loading}>
            <Send className="h-4 w-4" />
            Get recommendations
          </Button>
        </form>

        {result && result.services.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-bold">Recommended for you</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {result.services.map(({ service, reason }) => (
                <div key={service.id} className="space-y-2">
                  <ServiceCard
                    service={service}
                    compact
                    onExplore={() => router.push(`/explore?q=${encodeURIComponent(service.title)}`)}
                  />
                  <p className="text-xs text-muted">{reason}</p>
                  <p className="text-xs font-medium text-primary">
                    From {formatINR(service.startingPrice)} · ~{service.durationMinutes} min
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCompareOpen(true)}
                disabled={result.services.length < 2}
              >
                Compare services
              </Button>
              <Link
                href={`/explore?category=${result.categoryId}`}
                className="inline-flex items-center justify-center rounded-xl bg-accent-soft px-4 py-2.5 text-sm font-medium text-primary hover:bg-accent/30"
              >
                Explore matching category
              </Link>
              <Button type="button" onClick={bookTop}>
                Continue to booking
              </Button>
            </div>
          </section>
        )}
      </div>

      {result && <MatchExplanation result={result} />}

      <ComparisonModal
        open={compareOpen}
        onClose={() => setCompareOpen(false)}
        services={result?.services.map((r) => r.service).slice(0, 3) ?? []}
      />
    </div>
  );
}
