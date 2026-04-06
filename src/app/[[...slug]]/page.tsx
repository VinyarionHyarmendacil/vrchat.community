import { getPageContributors, source } from "@/lib/source";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/layouts/notebook/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/components/mdx";
import type { Metadata } from "next";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { APIPage } from "@/components/api-page";
import { ActionBar } from "./action-bar";
import { Callout } from "fumadocs-ui/components/callout";
import Link from "fumadocs-core/link";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { cn } from "@/lib/cn";

function TooShort() {
  return (
    <Callout title="Want to contribute to this page?" className="text-balance">
      This page is a bit short and could use more detail. If you have knowledge, examples, or
      improvements to add, consider contributing to help expand it.
      <Link
        className={cn(
          buttonVariants({
            size: "sm",
            color: "primary",
            className: "flex not-prose mt-2!",
          }),
        )}
      >
        Edit this page
      </Link>
    </Callout>
  );
}

export default async function Page(props: PageProps<"/[[...slug]]">) {
  const params = await props.params;

  const page = source.getPage(params.slug);
  if (!page) notFound();

  if (page.data.type === "openapi") {
    return (
      <DocsPage full>
        <h1 className="text-[1.75em] font-semibold">{page.data.title}</h1>
        <DocsBody>
          <APIPage {...page.data.getAPIPageProps()} />
        </DocsBody>
      </DocsPage>
    );
  }

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.preferred_title || page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      <ActionBar page={page} />
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
            TooShort,
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

const origin = new URL("https://vrchat.community");

export async function generateMetadata(props: PageProps<"/[[...slug]]">): Promise<Metadata> {
  const params = await props.params;

  const page = source.getPage(params.slug);
  if (!page) notFound();

  const contributors = await getPageContributors(page);

  return {
    title: ("preferred_title" in page.data && page.data.preferred_title) || page.data.title,
    description:
      ("short_description" in page.data && page.data.short_description) || page.data.description,
    metadataBase: origin,
    alternates: {
      canonical: page.url,
    },
    applicationName: "VRChat.community",
    openGraph: {
      type: "article",
      modifiedTime: (
        ("lastModified" in page.data && page.data.lastModified) ||
        new Date()
      ).toISOString(),
      authors: contributors.slice(0, 6).map(({ url }) => url),
      siteName: "VRChat.community • API documentation, SDKs, and more",
      url: page.url,
    },
    // openGraph: {
    //   images: getPageImage(page).url,
    // },
  };
}
