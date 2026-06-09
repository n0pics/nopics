'use client';

import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';

type GalleryImage = {
  src: string;
  alt?: string;
  /** width / height — used to size the slot in the grid */
  ratio: number;
};

interface PhotoGalleryProps {
  images: GalleryImage[];
  /** Optional credit shown at the bottom center, fixed */
  credit?: string;
  /** Optional title rendered at the top of the gallery */
  title?: string;
  /** Optional role text rendered under the title */
  role?: string;
  /** Number of columns at lg breakpoint (default 3) */
  columns?: number;
  className?: string;
}

export function PhotoGallery({
  images,
  credit,
  title,
  role,
  columns = 3,
  className,
}: PhotoGalleryProps) {
  const [selected, setSelected] = React.useState<GalleryImage | null>(null);

  // Round-robin distribution of images across columns (so consecutive shots
  // of the same car land in different columns when the input is shuffled).
  const cols = React.useMemo(() => {
    const buckets: GalleryImage[][] = Array.from({ length: columns }, () => []);
    images.forEach((img, i) => buckets[i % columns].push(img));
    return buckets;
  }, [images, columns]);

  // Close zoom on Escape
  React.useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [selected]);

  // Lock body scroll while zoom is open
  React.useEffect(() => {
    if (selected) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [selected]);

  const gridColsClass =
    columns === 2
      ? 'sm:grid-cols-2'
      : columns === 4
        ? 'sm:grid-cols-2 lg:grid-cols-4'
        : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <div
      className={cn(
        'relative flex min-h-screen w-full flex-col items-center bg-black px-4 pb-20',
        className,
      )}
      style={{ paddingTop: '6rem' }}
    >
      {(title || role) && (
        <header
          className="mx-auto w-full max-w-6xl px-2 text-center"
          style={{ marginBottom: '1.75rem' }}
        >
          {title && (
            <h1
              className="uppercase text-white"
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(1.75rem, 5vw, 3.25rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                margin: 0,
              }}
            >
              {title}
            </h1>
          )}
          {role && (
            <p
              className="uppercase text-white/55"
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(0.7rem, 1vw, 0.9rem)',
                letterSpacing: '0.15em',
                marginTop: '0.6rem',
              }}
            >
              {role}
            </p>
          )}
        </header>
      )}
      <div
        className={cn(
          'mx-auto grid w-full max-w-6xl gap-4 sm:gap-5',
          gridColsClass,
        )}
      >
        {cols.map((bucket, colIndex) => (
          <div key={colIndex} className="grid gap-4 sm:gap-5">
            {bucket.map((img, i) => (
              <GalleryTile
                key={`${colIndex}-${i}-${img.src}`}
                image={img}
                onClick={() => setSelected(img)}
              />
            ))}
          </div>
        ))}
      </div>

      {credit && (
        <div className="pointer-events-none fixed bottom-6 left-1/2 z-40 -translate-x-1/2 whitespace-nowrap text-[11px] font-light uppercase tracking-[0.32em] text-white/55 [text-shadow:0_2px_12px_rgba(0,0,0,0.6)] sm:bottom-8">
          {credit}
        </div>
      )}

      {selected && (
        <ZoomOverlay image={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

function GalleryTile({
  image,
  onClick,
}: {
  image: GalleryImage;
  onClick: () => void;
}) {
  return (
    <AspectRatio
      ratio={image.ratio}
      className="relative size-full overflow-hidden rounded-md bg-white/5"
    >
      <button
        type="button"
        onClick={onClick}
        aria-label={image.alt || 'Voir la photo'}
        className="group block size-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        <img
          alt={image.alt || ''}
          src={image.src}
          loading="lazy"
          decoding="async"
          className="size-full object-cover opacity-0 transition-transform duration-700 ease-out group-hover:scale-[1.02] [animation:tmm-tile-fade-in_0.8s_ease-out_forwards] [animation-delay:0.05s]"
        />
      </button>
    </AspectRatio>
  );
}

function ZoomOverlay({
  image,
  onClose,
}: {
  image: GalleryImage;
  onClose: () => void;
}) {
  React.useEffect(() => {
    const onWheel = () => onClose();
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo agrandie"
      onClick={onClose}
      className="fixed inset-0 z-[200] flex cursor-zoom-out items-center justify-center bg-black/96 [animation:tmm-fade-in_0.3s_ease]"
    >
      <img
        src={image.src}
        alt={image.alt || ''}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] max-w-[92vw] cursor-default object-contain shadow-[0_30px_80px_rgba(0,0,0,0.8)]"
      />
    </div>
  );
}

export default PhotoGallery;
