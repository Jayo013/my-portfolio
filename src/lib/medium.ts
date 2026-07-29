export type MediumArticle = {
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
  image?: string;
};

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function stripCdata(text: string): string {
  const match = text.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
  return decodeEntities((match ? match[1] : text).trim());
}

function extractTag(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return match ? stripCdata(match[1]) : "";
}

function toExcerpt(html: string, title: string, maxLength = 140): string {
  const plain = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/[-–—_~*#]{2,}/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const dedupedTitle =
    title && plain.toLowerCase().startsWith(title.toLowerCase()) ? plain.slice(title.length).trim() : plain;
  const cleaned = dedupedTitle || plain;

  if (cleaned.length <= maxLength) return cleaned;

  const truncated = cleaned.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  return `${truncated.slice(0, lastSpace > 40 ? lastSpace : maxLength).trim()}…`;
}

function extractImage(item: string): string | undefined {
  const media = item.match(/<media:content[^>]+url="([^"]+)"/);
  if (media) return decodeEntities(media[1]);

  const img = item.match(/<img[^>]+src="([^"]+)"/);
  return img ? decodeEntities(img[1]) : undefined;
}

/**
 * Fetches and parses an author's public Medium RSS feed. Returns an empty
 * array on any failure so a Medium outage never breaks the page build/render.
 */
export async function getMediumArticles(profileUrl: string, limit = 3): Promise<MediumArticle[]> {
  try {
    const url = new URL(profileUrl);
    const feedUrl = `${url.origin}/feed${url.pathname}`;

    const res = await fetch(feedUrl, { next: { revalidate: 3600 } });
    if (!res.ok) return [];

    const xml = await res.text();
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];

    return items.slice(0, limit).map((item) => {
      const title = extractTag(item, "title");
      return {
        title,
        link: extractTag(item, "link").split("?")[0],
        pubDate: extractTag(item, "pubDate"),
        excerpt: toExcerpt(extractTag(item, "content:encoded"), title),
        image: extractImage(item),
      };
    });
  } catch {
    return [];
  }
}
