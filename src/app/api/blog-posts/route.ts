import { NextResponse } from "next/server";

export const runtime = "nodejs";

type MediumFeedItem = {
  title?: string;
  description?: string;
  pubDate?: string;
  link?: string;
  thumbnail?: string;
  categories?: string[];
  author?: string;
  content?: string;
};

type MediumFeedResponse = {
  status?: string;
  items?: MediumFeedItem[];
};

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#x2F;/gi, "/");
}

function sanitizeDescription(html?: string): string {
  if (!html) return "";

  const withoutFigures = html.replace(/<figure[\s\S]*?<\/figure>/gi, " ");
  const withoutScripts = withoutFigures.replace(/<script[\s\S]*?<\/script>/gi, " ");
  const withoutStyles = withoutScripts.replace(/<style[\s\S]*?<\/style>/gi, " ");
  const textOnly = withoutStyles.replace(/<[^>]*>/g, " ");
  const decoded = decodeHtmlEntities(textOnly);
  const normalized = decoded.replace(/\s+/g, " ").trim();

  if (normalized.length <= 180) return normalized;
  return `${normalized.slice(0, 177).trim()}...`;
}

function extractFirstImageFromHtml(html?: string): string | null {
  if (!html) return null;
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1] ?? null;
}

function getReadTime(content?: string): string {
  if (!content) return "5 min read";
  const plainText = content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const words = plainText ? plainText.split(" ").length : 0;
  const minutes = Math.max(1, Math.ceil(words / 220));
  return `${minutes} min read`;
}

function formatDate(dateInput?: string): string {
  if (!dateInput) return "Recent";
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return "Recent";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export async function GET() {
  try {
    const username = process.env.MEDIUM_USERNAME || "@pramudithakudagamage13";
    const feedUrl = `https://medium.com/feed/${username}`;
    const rssToJsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;

    const response = await fetch(rssToJsonUrl, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ ok: false, error: "FEED_REQUEST_FAILED" }, { status: 502 });
    }

    const data = (await response.json()) as MediumFeedResponse;
    if (data.status !== "ok" || !Array.isArray(data.items)) {
      return NextResponse.json({ ok: false, error: "INVALID_FEED_RESPONSE" }, { status: 502 });
    }

    const posts = data.items.slice(0, 9).map((item) => {
      const image = item.thumbnail || extractFirstImageFromHtml(item.content) || "/projects/protfolio.png";

      return {
        title: item.title || "Untitled post",
        description: sanitizeDescription(item.description || item.content),
        date: formatDate(item.pubDate),
        readTime: getReadTime(item.content),
        link: item.link || "#",
        image,
        tags: item.categories || [],
        author: item.author || "",
      };
    });

    return NextResponse.json({ ok: true, posts });
  } catch (error) {
    console.error("[/api/blog-posts] error", error);
    return NextResponse.json({ ok: false, error: "BLOG_FEED_ERROR" }, { status: 500 });
  }
}