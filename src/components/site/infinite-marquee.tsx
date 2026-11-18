type MarqueeItem = {
  label: string;
  mark: string;
};

type InfiniteMarqueeProps = {
  label: string;
  items: MarqueeItem[];
  reverse?: boolean;
};

export function InfiniteMarquee({
  label,
  items,
  reverse = false,
}: InfiniteMarqueeProps) {
  if (!items.length) return null;

  return (
    <div className={`arkyl-marquee-row${reverse ? " is-reverse" : ""}`}>
      <div className="arkyl-marquee-label">{label}</div>
      <div
        className="arkyl-marquee-viewport"
        role="region"
        aria-label={`${label}. Focus this strip to pause the movement.`}
        tabIndex={0}
      >
        <div className="arkyl-marquee-track">
          {[0, 1].map((copy) => (
            <div
              className="arkyl-marquee-group"
              key={copy}
              aria-hidden={copy === 1}
            >
              {items.map((item, index) => (
                <span
                  className="arkyl-marquee-item"
                  key={`${copy}-${item.label}-${index}`}
                >
                  <span className="arkyl-marquee-mark">{item.mark}</span>
                  <span>{item.label}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
