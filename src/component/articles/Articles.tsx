import { ExternalLink } from "lucide-react";
import { PROFILE } from "@/data/Portfolio";
import { getMediumArticles } from "@/lib/medium";
import ArticlesScroller from "@/component/articles/ArticlesScroller";
import ArticlesHeader from "@/component/articles/ArticlesHeader";
import ArticlesBackground from "@/component/articles/ArticlesBackground";

export default async function Articles() {
  const articles = await getMediumArticles(PROFILE.medium, 10);

  return (
    <section id="articles" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="articles-hub relative overflow-hidden px-4 py-16 sm:px-8 sm:py-20">
          <ArticlesBackground />

          <div className="relative">
            <ArticlesHeader />

            {articles.length > 0 ? (
              <ArticlesScroller articles={articles} />
            ) : (
              <p className="ah-text-muted text-center">
                Couldn&apos;t load recent articles right now — check them out directly on Medium.
              </p>
            )}

            <div className="mt-12 flex justify-center">
              <a
                href={PROFILE.medium}
                target="_blank"
                rel="noreferrer"
                className="ah-cta inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold tracking-widest"
              >
                VIEW ALL ARTICLES
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
