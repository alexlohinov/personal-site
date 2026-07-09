import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const thoughtsDirectory = path.join(process.cwd(), "content", "thoughts");

export type Thought = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

function formatDate(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return String(value);
}

export function getThoughts(): Thought[] {
  if (!fs.existsSync(thoughtsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(thoughtsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      return getThought(slug);
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getThought(slug: string): Thought {
  const filePath = path.join(thoughtsDirectory, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf8");
  const { data } = matter(source);

  return {
    slug,
    title: String(data.title),
    description: String(data.description),
    date: formatDate(data.date),
  };
}
