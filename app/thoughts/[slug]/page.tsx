import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/components/link";
import { getThought, getThoughts } from "@/lib/content";
import { createMetadata, siteConfig } from "@/lib/metadata";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getThoughts().map((thought) => ({
    slug: thought.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const thought = getThought(slug);

    return createMetadata({
      title: `${thought.title} - ${siteConfig.name}`,
      description: thought.description,
      openGraph: {
        title: thought.title,
        description: thought.description,
        type: "article",
        publishedTime: thought.date,
        url: `/thoughts/${thought.slug}`,
      },
    });
  } catch {
    return {};
  }
}

export default async function ThoughtPage({ params }: PageProps) {
  const { slug } = await params;
  const thought = getThoughts().find((item) => item.slug === slug);

  if (!thought) {
    notFound();
  }

  const MDXContent = (await import(`@/content/thoughts/${slug}.mdx`)).default;

  return (
    <main className="mx-auto w-full max-w-[680px] px-4 pb-20 pt-20 sm:px-0">
      <div className="px-3">
        <Link href="/">Back</Link>
      </div>

      <article className="mt-10 px-3">
        <header className="mb-10 space-y-3">
          <time
            dateTime={thought.date}
            className="text-xs text-zinc-500 dark:text-zinc-500"
          >
            {new Intl.DateTimeFormat("en", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }).format(new Date(`${thought.date}T00:00:00`))}
          </time>
          <h1 className="text-2xl font-medium tracking-tight text-zinc-950 dark:text-zinc-50">
            {thought.title}
          </h1>
          <p className="max-w-[560px] text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {thought.description}
          </p>
        </header>

        <div className="prose prose-zinc max-w-none text-sm leading-7 prose-headings:font-medium prose-headings:tracking-tight prose-p:text-zinc-600 prose-a:text-zinc-950 prose-a:decoration-zinc-300 prose-a:underline-offset-4 prose-code:text-zinc-950 dark:prose-invert dark:prose-p:text-zinc-400 dark:prose-a:text-zinc-50 dark:prose-a:decoration-zinc-700 dark:prose-code:text-zinc-50">
          <MDXContent />
        </div>
      </article>
    </main>
  );
}
