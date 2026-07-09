import Image from "next/image";
import { Kalam } from "next/font/google";
import type { CSSProperties } from "react";

const kalam = Kalam({
  subsets: ["latin"],
  weight: "400",
});

type Polaroid = {
  id: string;
  caption: string;
  rotation: number;
  offset: number;
  src: string;
  objectPosition?: string;
};

const polaroids: Polaroid[] = [
  {
    id: "work",
    caption: "Felix",
    src: "/polaroids/photo-1.webp",
    rotation: -4,
    offset: 0,
    objectPosition: "center",
  },
  {
    id: "notes",
    caption: "Tunis",
    src: "/polaroids/photo-2.webp",
    rotation: 4,
    offset: -18,
    objectPosition: "center 35%",
  },
];

type PolaroidStyle = CSSProperties &
  Record<"--polaroid-rotation" | "--polaroid-offset", string>;

export function Polaroids() {
  return (
    <section
      aria-label="Personal moments"
      className="-mx-3 mt-12 overflow-x-auto px-3 pb-2 pt-1 [scrollbar-width:none] sm:mx-0 sm:overflow-visible sm:px-0"
    >
      <div className="flex w-max snap-x snap-mandatory gap-3 sm:mx-auto sm:w-fit sm:justify-center sm:gap-0">
        {polaroids.map((polaroid) => {
          const style: PolaroidStyle = {
            "--polaroid-rotation": `${polaroid.rotation}deg`,
            "--polaroid-offset": `${polaroid.offset}px`,
          };

          return (
            <figure
              key={polaroid.id}
              style={style}
              className="polaroid-card w-[172px] shrink-0 snap-start rounded-[6px] border border-[#d8d3c8] bg-[#f6f2e9] p-2 text-[#403c36] shadow-[0_2px_5px_rgba(37,32,25,0.06)] dark:border-[#9b9182] dark:bg-[#c6bcac] dark:text-[#39352f] dark:shadow-[0_2px_6px_rgba(0,0,0,0.16)] sm:w-[188px]"
            >
              <div className="relative aspect-square overflow-hidden rounded-[3px] bg-[#d6d2c8] dark:bg-[#92897b]">
                <Image
                  src={polaroid.src}
                  alt={polaroid.caption}
                  fill
                  sizes="(max-width: 639px) 172px, 188px"
                  className="object-cover dark:brightness-[0.78]"
                  style={{ objectPosition: polaroid.objectPosition }}
                />
              </div>
              <figcaption className={`${kalam.className} px-0.5 pb-0.5 pt-2.5 text-[15px] leading-4`}>
                {polaroid.caption}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
