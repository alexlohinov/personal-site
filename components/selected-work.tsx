"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ImageLightbox, type LightboxItem } from "@/components/image-lightbox";

const inter = Inter({
  subsets: ["latin"],
  weight: "500",
});

const selectedWorkItems = [
  {
    id: "accord-crm",
    title: "Accord",
    label: "Company CRM dashboard",
    alt: "Accord CRM company database dashboard",
    images: {
      light: "/selected-work/accord-light.webp",
      dark: "/selected-work/accord-dark.webp",
    },
  },
  {
    id: "pascal-notes",
    title: "Pascal",
    label: "Research brief workspace",
    alt: "Pascal note-taking app showing a research brief workspace",
    images: {
      light: "/selected-work/pascal-light.webp",
      dark: "/selected-work/pascal-dark.webp",
    },
  },
  {
    id: "worldly-language",
    title: "Worldly",
    label: "Mobile vocabulary screens",
    alt: "Worldly language-learning app showing mobile vocabulary and settings screens",
    images: {
      light: "/selected-work/worldly-light.webp",
      dark: "/selected-work/worldly-dark.webp",
    },
  },
] satisfies readonly LightboxItem[];

export function SelectedWork() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  const openLightbox = (index: number, event: MouseEvent<HTMLButtonElement>) => {
    returnFocusRef.current = event.currentTarget;
    setActiveIndex(index);
  };

  return (
    <section className="flex flex-col gap-4">
      <h2
        className={`${inter.className} px-3 text-[14px] font-medium leading-5 tracking-[-0.084px] text-[#171717] dark:text-[#f5f5f5]`}
      >
        Selected Work
      </h2>

      <div className="flex flex-col gap-4">
        {selectedWorkItems.map((item, index) => {
          const imageSrc = isDark ? item.images.dark : item.images.light;

          return (
            <figure key={item.id} className="flex flex-col gap-3">
              <button
                type="button"
                aria-label={`Open ${item.title} image`}
                aria-haspopup="dialog"
                className="relative block aspect-[680/383] w-full cursor-zoom-in overflow-hidden rounded-xl border-[0.5px] border-[#ebebeb] bg-[#f7f7f7] p-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171717] focus-visible:ring-offset-2 dark:border-[#2d2d2d] dark:bg-[#1b1b1b] dark:focus-visible:ring-[#f5f5f5] dark:focus-visible:ring-offset-[#111111]"
                onClick={(event) => openLightbox(index, event)}
              >
                {mounted ? (
                  <Image
                    src={imageSrc}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 704px) calc(100vw - 24px), 680px"
                    priority={index === 0}
                    className="object-cover"
                  />
                ) : null}
              </button>

              <figcaption className="flex flex-col gap-0 text-[14px] font-normal leading-5 text-[#171717] min-[440px]:flex-row min-[440px]:items-baseline min-[440px]:justify-between min-[440px]:gap-3 dark:text-[#f5f5f5]">
                <span>{item.title}</span>
                <span className="text-[13px] leading-4 text-[#7d7d7d] dark:text-[#888888]">
                  {item.label}
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>

      {mounted && activeIndex !== null ? (
        <ImageLightbox
          items={selectedWorkItems}
          activeIndex={activeIndex}
          isDark={isDark}
          returnFocusRef={returnFocusRef}
          onIndexChange={setActiveIndex}
          onClose={() => setActiveIndex(null)}
        />
      ) : null}
    </section>
  );
}
