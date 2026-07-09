import NextLink from "next/link";
import type { ComponentProps } from "react";

type LinkProps = ComponentProps<typeof NextLink>;

export function Link({ className = "", ...props }: LinkProps) {
  return (
    <NextLink
      className={[
        "underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-zinc-950 hover:decoration-zinc-950 dark:decoration-zinc-700 dark:hover:text-zinc-50 dark:hover:decoration-zinc-50",
        className,
      ].join(" ")}
      {...props}
    />
  );
}
