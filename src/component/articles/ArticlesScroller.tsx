"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, Clock, Eye } from "lucide-react";
import ImageWithFallback from "@/component/shared/ImageWithFallback";
import type { MediumArticle } from "@/lib/medium";

type Tone = "purple" | "cyan" | "pink" | "gold";

const TAG_CLASS: Record<Tone, string> = {
  purple: "ah-tag-purple",
  cyan: "ah-tag-cyan",
  pink: "ah-tag-pink",
  gold: "ah-tag-gold",
};

function deriveCategory(title: string): { label: string; tone: Tone } {
  const t = title.toLowerCase();
  if (/(agent|autonomous|\bllm\b|\bai\b)/.test(t)) return { label: "AI AGENTS", tone: "purple" };
  if (/(security|iam|auth|vulnerab)/.test(t)) return { label: "AWS SECURITY", tone: "pink" };
  if (/(devops|ci\/cd|pipeline|docker|kubernetes|k8s)/.test(t)) return { label: "DEVOPS", tone: "gold" };
  if (/(serverless|lambda|function)/.test(t)) return { label: "SERVERLESS", tone: "cyan" };
  if (/(cloud|aws|azure|gcp)/.test(t)) return { label: "CLOUD", tone: "cyan" };
  return { label: "TECH", tone: "purple" };
}

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function estimateReadTime(title: string, excerpt: string): number {
  const words = `${title} ${excerpt}`.split(/\s+/).length;
  return Math.min(12, Math.max(3, Math.round(words / 18) + 3));
}

function estimateViews(link: string): string {
  const n = 600 + (hashString(link) % 9400);
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`;
}

export default function ArticlesScroller({ articles }: { articles: MediumArticle[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const scrollByAmount = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  const scrollToIndex = useCallback((index: number) => {
    cardRefs.current[index]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }, []);

  useEffect(() => {
    const node = scrollerRef.current;
    if (!node) return;

    let frame = 0;
    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const containerLeft = node.getBoundingClientRect().left;
        let closest = 0;
        let min = Infinity;
        cardRefs.current.forEach((el, i) => {
          if (!el) return;
          const diff = Math.abs(el.getBoundingClientRect().left - containerLeft);
          if (diff < min) {
            min = diff;
            closest = i;
          }
        });
        setActiveIndex(closest);
      });
    };

    node.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      node.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const containerVariants: Variants = reduceMotion
    ? { hidden: {}, visible: {} }
    : { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };

  const cardVariants: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 28, scale: 0.96 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" } },
      };

  return (
    <div className="relative">
      <motion.div
        ref={scrollerRef}
        className="no-scrollbar flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-4 px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {articles.map((article, i) => {
          const category = deriveCategory(article.title);
          const readTime = estimateReadTime(article.title, article.excerpt);
          const views = estimateViews(article.link);

          return (
            <motion.a
              key={article.link}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              href={article.link}
              target="_blank"
              rel="noreferrer"
              variants={cardVariants}
              className="group ah-card relative flex h-full shrink-0 snap-start basis-[88%] flex-col rounded-2xl sm:basis-[46%] lg:basis-[32%]"
            >
              <span className="ah-scanline" aria-hidden="true" />

              <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl">
                <ImageWithFallback
                  src={article.image}
                  alt={article.title}
                  wrapperClassName="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.08]"
                />
                <div className="ah-image-fade pointer-events-none absolute inset-0" />
                <span
                  className={`ah-tag ${TAG_CLASS[category.tone]} absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider`}
                >
                  {category.label}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="ah-text-strong line-clamp-2 text-lg font-bold leading-snug">{article.title}</h3>

                <div className="ah-text-faint flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium uppercase tracking-wide">
                  {article.pubDate && (
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-[rgb(var(--ah-purple-rgb))]" />
                      {new Date(article.pubDate).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-[rgb(var(--ah-cyan-rgb))]" />
                    {readTime} min
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5 text-[rgb(var(--ah-gold-rgb))]" />
                    {views}
                  </span>
                </div>

                <p className="ah-text-muted line-clamp-3 flex-1 text-sm leading-relaxed">{article.excerpt}</p>

                <span className="ah-cta mt-1 inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-bold tracking-widest">
                  ▶ EXPLORE ARTICLE
                </span>
              </div>
            </motion.a>
          );
        })}
      </motion.div>

      {articles.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => scrollByAmount(-1)}
            aria-label="Scroll articles left"
            className="ah-nav-btn hidden sm:flex absolute left-0 top-[34%] -translate-y-1/2 -translate-x-1/2 h-11 w-11 items-center justify-center rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount(1)}
            aria-label="Scroll articles right"
            className="ah-nav-btn hidden sm:flex absolute right-0 top-[34%] -translate-y-1/2 translate-x-1/2 h-11 w-11 items-center justify-center rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="mt-6 flex items-center justify-center gap-2">
            {articles.map((article, i) => (
              <button
                key={article.link}
                type="button"
                aria-label={`Go to article ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={`ah-dot ${i === activeIndex ? "ah-dot-active" : ""}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
