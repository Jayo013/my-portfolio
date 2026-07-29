import Section from "@/component/shared/Section";
import Reveal from "@/component/shared/Reveal";
import { Button } from "@/component/ui/button";
import { ExternalLink } from "lucide-react";
import { PROFILE } from "@/data/Portfolio";
import { getMediumArticles } from "@/lib/medium";
import ArticlesScroller from "@/component/articles/ArticlesScroller";

export default async function Articles() {
  const articles = await getMediumArticles(PROFILE.medium, 10);

  return (
    <Section id="articles" title="Articles">
      <Reveal>
        {articles.length > 0 ? (
          <ArticlesScroller articles={articles} />
        ) : (
          <p className="text-center text-muted-foreground">
            Couldn&apos;t load recent articles right now — check them out directly on Medium.
          </p>
        )}
      </Reveal>

      <div className="mt-8 flex justify-center">
        <Button asChild variant="outline">
          <a href={PROFILE.medium} target="_blank" rel="noreferrer" className="gap-2">
            View all articles on Medium
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </Section>
  );
}
