"use client";

import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/component/ui/card";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import ImageWithFallback from "@/component/shared/ImageWithFallback";
import type { MediumArticle } from "@/lib/medium";

export default function ArticlesScroller({ articles }: { articles: MediumArticle[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="no-scrollbar flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-4 px-4"
      >
        {articles.map((article) => (
          <a
            key={article.link}
            href={article.link}
            target="_blank"
            rel="noreferrer"
            className="group block h-full shrink-0 snap-start basis-[88%] sm:basis-[46%] lg:basis-[32%]"
          >
            <Card className="flex h-full flex-col overflow-hidden rounded-2xl border-border/60 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
              <ImageWithFallback src={article.image} alt={article.title} wrapperClassName="aspect-[16/10] w-full" />
              <CardHeader className="pb-2">
                {article.pubDate && (
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground/80">
                    {new Date(article.pubDate).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
                <CardTitle className="line-clamp-2 text-lg leading-snug">{article.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col pt-0">
                <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {article.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Read article
                  <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      {articles.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => scrollByAmount(-1)}
            aria-label="Scroll articles left"
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 items-center justify-center rounded-full border border-primary/25 bg-background/80 backdrop-blur-md shadow-md transition hover:border-neon-cyan/50 hover:text-neon-cyan hover:shadow-[0_0_14px_rgba(var(--glow-cyan-rgb),0.3)]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount(1)}
            aria-label="Scroll articles right"
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-10 w-10 items-center justify-center rounded-full border border-primary/25 bg-background/80 backdrop-blur-md shadow-md transition hover:border-neon-cyan/50 hover:text-neon-cyan hover:shadow-[0_0_14px_rgba(var(--glow-cyan-rgb),0.3)]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}
    </div>
  );
}
