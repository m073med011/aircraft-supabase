import Link from "next/link";

interface HeroSectionProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export function HeroSection({
  backgroundImage,
  title,
  subtitle,
  ctaText,
  ctaLink,
}: HeroSectionProps) {
  return (
    <div className="@container mt-5">
      <div className="@[480px]:p-4">
        <div
          className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-start justify-end px-4 pb-10 @[480px]:px-10"
          style={{
            backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.2) 0%, rgba(10, 10, 10, 0.8) 100%), url("${backgroundImage}")`,
          }}
        >
          <div className="flex flex-col gap-2 text-left max-w-2xl">
            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
              {title}
            </h1>
            <h2 className="text-def-off-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
              {subtitle}
            </h2>
          </div>
          <Link href={ctaLink}>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-def-green text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] hover:bg-opacity-80 transition-all">
              <span className="truncate">{ctaText}</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

