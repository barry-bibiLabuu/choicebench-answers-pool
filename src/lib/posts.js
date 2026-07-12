const postModules = import.meta.glob("../../content/{posts,blog}/*.md", { eager: true });

function slugFromPath(path) {
  return path
    .split("/")
    .pop()
    ?.replace(/^\d{4}-\d{2}-\d{2}-/, "")
    .replace(/\.md$/, "");
}

function languageForPost(frontmatter, body = "") {
  const explicit = String(frontmatter.language || frontmatter.lang || "").trim().toLowerCase();
  if (explicit) return explicit.startsWith("zh") ? "zh" : "en";
  return /[\u3400-\u9fff]/.test(`${frontmatter.title || ""}${frontmatter.description || ""}${body}`) ? "zh" : "en";
}

export function allPosts() {
  return Object.entries(postModules)
    .map(([path, mod]) => {
      const frontmatter = mod.frontmatter || {};
      const slug = frontmatter.slug || slugFromPath(path);
      const body = String(mod.rawContent?.() || "");
      return {
        path,
        module: mod,
        frontmatter,
        slug,
        title: frontmatter.title || slug,
        description: frontmatter.description || frontmatter.excerpt || "",
        date: frontmatter.date || "",
        tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
        language: languageForPost(frontmatter, body),
      };
    })
    .filter((post) => post.slug)
    .sort((a, b) => String(b.date).localeCompare(String(a.date)) || String(a.title).localeCompare(String(b.title)));
}

export function postsByLanguage() {
  const posts = allPosts();
  return {
    all: posts,
    zh: posts.filter((post) => post.language === "zh"),
    en: posts.filter((post) => post.language !== "zh"),
  };
}
