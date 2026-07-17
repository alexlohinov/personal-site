"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useRef, type CSSProperties, type KeyboardEvent, type RefObject } from "react";

export type LightboxItem = {
  id: string;
  title: string;
  label: string;
  alt: string;
  images: {
    light: string;
    dark: string;
  };
};

type ImageLightboxProps = {
  items: readonly LightboxItem[];
  activeIndex: number;
  isDark: boolean;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

const overlayStyle: CSSProperties = {
  paddingTop: "max(12px, env(safe-area-inset-top))",
  paddingRight: "max(12px, env(safe-area-inset-right))",
  paddingBottom: "max(12px, env(safe-area-inset-bottom))",
  paddingLeft: "max(12px, env(safe-area-inset-left))",
};

const closeButtonStyle: CSSProperties = {
  top: "max(12px, env(safe-area-inset-top))",
  right: "max(12px, env(safe-area-inset-right))",
};

export function ImageLightbox({
  items,
  activeIndex,
  isDark,
  returnFocusRef,
  onIndexChange,
  onClose,
}: ImageLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const activeItem = items[activeIndex];
  const imageSrc = isDark ? activeItem.images.dark : activeItem.images.light;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const returnFocusElement = returnFocusRef.current;
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      returnFocusElement?.focus();
    };
  }, [returnFocusRef]);

  const showPrevious = () => {
    onIndexChange((activeIndex - 1 + items.length) % items.length);
  };

  const showNext = () => {
    onIndexChange((activeIndex + 1) % items.length);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );

    if (!focusableElements?.length) {
      event.preventDefault();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="selected-work-lightbox-title"
      aria-describedby="selected-work-lightbox-description"
      className="lightbox-backdrop fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center overflow-y-auto bg-black/[0.92]"
      style={overlayStyle}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={closeButtonRef}
        type="button"
        aria-label="Close image lightbox"
        className="fixed z-10 flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/50 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        style={closeButtonStyle}
        onClick={onClose}
      >
        <X aria-hidden="true" className="size-5" strokeWidth={1.75} />
      </button>

      <div className="flex w-full max-w-[1200px] cursor-default flex-col items-center">
        <Image
          key={imageSrc}
          src={imageSrc}
          alt={activeItem.alt}
          width={3840}
          height={2160}
          sizes="(max-width: 767px) 94vw, 1200px"
          priority
          className="lightbox-image h-auto max-h-[calc(100dvh-9rem)] w-auto max-w-full cursor-zoom-out rounded-xl object-contain"
        />

        <div className="mt-3 flex min-h-11 w-full items-center gap-3 text-[14px] leading-5">
          <div className="min-w-0 flex-1">
            <h2 id="selected-work-lightbox-title" className="text-white">
              {activeItem.title}
            </h2>
            <p id="selected-work-lightbox-description" className="text-[13px] leading-4 text-white/60">
              {activeItem.label}
            </p>
          </div>

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              aria-label="Show previous project image"
              className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              onClick={showPrevious}
            >
              <ChevronLeft aria-hidden="true" className="size-5" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              aria-label="Show next project image"
              className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              onClick={showNext}
            >
              <ChevronRight aria-hidden="true" className="size-5" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
