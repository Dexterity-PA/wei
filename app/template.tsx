/**
 * Route entrance. A template (unlike a layout) remounts on every navigation, so
 * wrapping the page in `.wei-route-enter` replays a brief fade-and-rise each
 * time a new page composes in. The animation is pure CSS, so this stays a
 * Server Component and is SSR-safe; Lenis and the nav live in the layout above
 * this wrapper and are untouched by the remount. Reduced motion collapses the
 * animation duration (see globals.css), so content simply appears.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="wei-route-enter">{children}</div>;
}
