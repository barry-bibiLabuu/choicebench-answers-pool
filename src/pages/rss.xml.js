import rss from "@astrojs/rss";
import { allPosts } from "../lib/posts.js";

const posts = allPosts().map((post) => ({
  title: post.title,
  description: post.description,
  pubDate: new Date(post.date),
  link: `/posts/${post.slug}/`
}));

export function GET(context) {
  return rss({
    title: "Choicebench Answers Pool",
    description:
      "A bilingual static blog for Generative Engine Optimization, AI search visibility, and answer-first education pages.",
    site: context.site,
    items: posts
  });
}
