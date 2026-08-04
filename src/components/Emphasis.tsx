import type { ReactNode } from "react";

/** Accent-colored key words. */
export function Hl({ children }: { children: ReactNode }) {
  return <span className="font-bold text-primary">{children}</span>;
}

/** Marker-highlight swipe behind a phrase. */
export function Mark({ children }: { children: ReactNode }) {
  return <span className="mark-hl font-semibold">{children}</span>;
}

/** Thick accent underline sitting behind the text baseline. */
export function Uline({ children }: { children: ReactNode }) {
  return <span className="uline-hl font-semibold">{children}</span>;
}