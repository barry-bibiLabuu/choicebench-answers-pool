import rss from "@astrojs/rss";

const postModules = import.meta.glob("../../content/posts/*.md", { eager: true });

const posts = Object.entries(postModules)
  .map(([path, mod]) => {
    const frontmatter = mod.frontmatter;
    const slug =
      frontmatter.slug ||
      path
        .split("/")
        .pop()
        ?.replace(/^\d{4}-\d{2}-\d{2}-/, "")
        .replace(/\.md$/, "");

    return {
      title: frontmatter.title,
      description: frontmatter.description,
      pubDate: new Date(frontmatter.date),
      link: `/posts/${slug}/`
    };
  })
  .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

export function GET(context) {
  return rss({
    title: "Choicebench Answers Pool",
    description:
      "A static content library for Generative Engine Optimization, AI search visibility, and answer-first marketing pages.",
    site: context.site,
    items: posts
  });
}
