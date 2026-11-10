"use client";

type AnnouncementRibbonProps = {
  /** Words scrolled along the ribbon. */
  words?: string[];
  /** Label in the static left badge. Pass `null` to hide it. */
  badge?: string | null;
  /** Text for the right-side link. Pass `null` to hide it. */
  ctaText?: string | null;
  ctaHref?: string;
  /** How many times the words repeat inside one marquee group. */
  repeat?: number;
  pauseOnHover?: boolean;
  className?: string;
};

function RibbonGroup({ words, repeat }: { words: string[]; repeat: number }) {
  return (
    <div className="ribbon-group">
      {Array.from({ length: repeat }, () => words)
        .flat()
        .map((word, index) => (
          <span className="ribbon-chunk" key={`${word}-${index}`}>
            <span>{word}</span>
            <b aria-hidden="true">✳</b>
          </span>
        ))}
    </div>
  );
}

export function AnnouncementRibbon({
  words = ["Steak", "Rice", "Chicken", "Repeat"],
  badge = "Good mood",
  ctaText = "Pesan sekarang",
  ctaHref = "#pesan",
  repeat = 4,
  pauseOnHover = true,
  className,
}: AnnouncementRibbonProps) {
  const label = words.join(", ");

  return (
    <div
      className={["ribbon", className].filter(Boolean).join(" ")}
      role="region"
      aria-label={label}
    >
      {badge && (
        <div className="ribbon-badge">
          <span>{badge}</span>
        </div>
      )}
      <div className={`ribbon-marquee${pauseOnHover ? " is-pausable" : ""}`}>
        <div className="ribbon-track">
          <RibbonGroup words={words} repeat={repeat} />
          <RibbonGroup words={words} repeat={repeat} />
        </div>
      </div>
      {ctaText && ctaHref && (
        <a className="ribbon-cta" href={ctaHref}>
          {ctaText}
          <span aria-hidden="true">↗</span>
        </a>
      )}
    </div>
  );
}
