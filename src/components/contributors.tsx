import { githubUrl, type Contributors } from "@/github";
import { Image } from "fumadocs-core/framework";
import Link from "fumadocs-core/link";
import { ChartLine } from "lucide-react";

type AvatarListProps = {
  limit?: number;
  items: Array<{ id: string; name: string; image: string; href: string }>;
  href?: string;
};

export function AvatarList({ items, limit = 6, href }: AvatarListProps) {
  return (
    <div className="flex -space-x-2">
      {items.slice(0, limit).map((item) => (
        <Link
          href={item.href}
          key={item.id}
          className="size-8 rounded-full border-2 border-fd-background"
          target="_blank"
        >
          <Image
            className="rounded-full text-xs font-medium bg-fd-secondary border size-full"
            src={item.image}
            width={32}
            alt={`${item.name}'s avatar`}
            height={32}
          />
        </Link>
      ))}
      <Link href={href || "#"}>
        <span className="size-8 rounded-full border-2 border-fd-background flex">
          <span className="rounded-full text-xs font-medium bg-fd-secondary border size-full flex items-center justify-center">
            {items.length <= limit ? (
              <ChartLine className="size-3" strokeWidth={2.5} />
            ) : (
              `${items.length - limit}+`
            )}
          </span>
        </span>
      </Link>
    </div>
  );
}

export async function GitHubContributors({
  contributors,
  limit = 6,
  href
}: {
  limit?: number;
  contributors: Contributors;
  href?: string;
}) {
  return (
    <AvatarList
      href={href}
      limit={limit}
      items={contributors.map(({ id, name, url, avatar_url }) => ({
        id,
        name,
        href: url,
        image: avatar_url,
      }))}
    />
  );
}
