import Image from "next/image";
import NextLink from "next/link";
import { Polaroids } from "@/components/polaroids";
import { SelectedWork } from "@/components/selected-work";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-[680px] flex-col gap-10 py-20 text-[14px] font-medium leading-5 tracking-[-0.084px]">
      <section className="flex flex-col gap-6 px-3">
        <div className="flex h-10 items-center gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <Image
              src="/figma-avatar.png"
              alt="Alex Lohinov"
              width={40}
              height={40}
              priority
              className="size-10 shrink-0 rounded-full"
            />
            <div className="flex min-w-0 flex-1 flex-col justify-center whitespace-nowrap">
              <h1 className="text-[#171717] dark:text-[#f5f5f5]">Alex Lohinov</h1>
              <p className="text-[#4d4d4d] dark:text-[#b4b4b4]">Product Designer at ???</p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <div className="flex flex-col gap-4 text-[#4d4d4d] dark:text-[#b4b4b4]">
          <p>
            I’m a product designer focused on building thoughtful digital products with a strong attention to craft, usability, and detail.
          </p>
          <p>
            I enjoy working closely with engineers and often prototype ideas in React and TypeScript to reduce ambiguity and speed up product development.
          </p>
          <p>
            You can reach me on{" "}
            <a
              href="https://github.com/alexlohinov"
              target="_blank"
              rel="noreferrer"
              className="text-[#171717] underline decoration-dotted decoration-[#4d4d4d] underline-offset-2 hover:decoration-[#171717] dark:text-[#f5f5f5] dark:decoration-[#b4b4b4] dark:hover:decoration-[#f5f5f5]"
            >
              GitHub
            </a>
            ,{" "}
            <a
              href="https://www.linkedin.com/in/alexlhv/"
              target="_blank"
              rel="noreferrer"
              className="text-[#171717] underline decoration-dotted decoration-[#4d4d4d] underline-offset-2 hover:decoration-[#171717] dark:text-[#f5f5f5] dark:decoration-[#b4b4b4] dark:hover:decoration-[#f5f5f5]"
            >
              LinkedIn
            </a>
            , via{" "}
            <a
              href="mailto:alex@lohinov.com"
              className="text-[#171717] underline decoration-dotted decoration-[#4d4d4d] underline-offset-2 hover:decoration-[#171717] dark:text-[#f5f5f5] dark:decoration-[#b4b4b4] dark:hover:decoration-[#f5f5f5]"
            >
              Email
            </a>
            , or follow me on{" "}
            <a
              href="https://x.com/alexlohinov"
              target="_blank"
              rel="noreferrer"
              className="text-[#171717] underline decoration-dotted decoration-[#4d4d4d] underline-offset-2 hover:decoration-[#171717] dark:text-[#f5f5f5] dark:decoration-[#b4b4b4] dark:hover:decoration-[#f5f5f5]"
            >
              X
            </a>
            .
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="px-3 text-[#171717] dark:text-[#f5f5f5]">Projects</h2>
        <a
          href="https://github.com/alexlohinov/wren"
          target="_blank"
          rel="noreferrer"
          className="flex min-h-[84px] rounded-[10px] p-3 hover:bg-[#f7f7f7] dark:hover:bg-[#1b1b1b]"
        >
          <div className="flex w-full items-start gap-3">
            <Image
              src="/wren-logo.png"
              alt=""
              width={40}
              height={40}
              className="size-10 shrink-0 rounded-[10px] border border-[#ebebeb] object-cover dark:border-[#2d2d2d]"
            />
            <div className="flex min-w-0 flex-1 flex-col justify-center self-stretch">
              <h3 className="text-[#171717] dark:text-[#f5f5f5]">Wren</h3>
              <p className="text-[#4d4d4d] dark:text-[#b4b4b4]">
                A lightweight, open-source terminal with a native interface around the terminal. Git, ports, and projects at your fingertips — no AI, no account.
              </p>
            </div>
          </div>
        </a>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="px-3 text-[#171717] dark:text-[#f5f5f5]">Experience</h2>
        <a
          href="https://www.konexta.agency"
          target="_blank"
          rel="noreferrer"
          className="flex h-11 items-center justify-between rounded-[10px] px-3 text-[#171717] hover:bg-[#f7f7f7] dark:text-[#f5f5f5] dark:hover:bg-[#1b1b1b]"
        >
          <span>Koncepta Agency</span>
          <span className="text-[#7d7d7d] dark:text-[#888888]">2024 - 2026</span>
        </a>
        <a
          href="https://optihint.com"
          target="_blank"
          rel="noreferrer"
          className="flex h-11 items-center justify-between rounded-[10px] px-3 text-[#171717] hover:bg-[#f7f7f7] dark:text-[#f5f5f5] dark:hover:bg-[#1b1b1b]"
        >
          <span>OptiHint</span>
          <span className="text-[#7d7d7d] dark:text-[#888888]">2023 - 2024</span>
        </a>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="px-3 text-[#171717] dark:text-[#f5f5f5]">Writing</h2>
        <NextLink
          href="/thoughts/how-i-use-codex"
          className="flex h-11 items-center justify-between rounded-[10px] px-3 text-[#171717] hover:bg-[#f7f7f7] dark:text-[#f5f5f5] dark:hover:bg-[#1b1b1b]"
        >
          <span>How I Use Codex in My Work.</span>
          <time dateTime="2026-07-09" className="text-[#7d7d7d] dark:text-[#888888]">Jul 9</time>
        </NextLink>
      </section>

      <SelectedWork />

      <Polaroids />
    </main>
  );
}
