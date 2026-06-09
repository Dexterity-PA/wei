import type { ElementType, ReactNode } from "react";

/**
 * The editorial content frame. Centers content at the shared max width and
 * applies the fluid gutter, so every section sits on the same backbone. Pages
 * lay a 12-column grid inside this for asymmetry.
 */
export function Container({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag className={`mx-auto w-full max-w-6xl px-wei-gutter ${className}`}>
      {children}
    </Tag>
  );
}
