import { createRelativeLink } from "fumadocs-ui/mdx";
import {
	DocsBody,
	DocsDescription,
	DocsPage,
	DocsTitle,
} from "fumadocs-ui/page";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import { source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

export default async function Page({ params }: {
	params: Promise<{ slug?: Array<string> }>;
}) {
	let { slug } = await params;
	if (slug?.[0] === "docs") slug = slug.slice(1);

	const page = source.getPage(slug);

	if (!page) notFound();

	const MDXContent = page.data.body;

	return (
		<DocsPage
			tableOfContent={{
				style: "clerk",
			}}
			full={page.data.full}
			toc={page.data._openapi?.toc || page.data.toc}
		>
			<DocsTitle>{page.data.fullTitle || page.data.title}</DocsTitle>
			<DocsBody>
				<MDXContent
					components={getMDXComponents({
						// this allows you to link to other pages with relative file paths
						a: createRelativeLink(source, page),
					})}
				/>
			</DocsBody>
		</DocsPage>
	);
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export async function generateStaticParams() {
	return source.generateParams();
}

export async function generateMetadata(props: {
	params: Promise<{ slug?: Array<string> }>;
}, _parent: ResolvingMetadata) {
	let { slug } = await props.params;
	if (slug?.[0] === "docs") slug = slug.slice(1);

	const parent = await _parent;

	const page = source.getPage(slug);
	if (!page) notFound();

	const metadata: Metadata = {
		...parent,
		title: page.data.fullTitle || page.data.title,
		// @ts-expect-error: Type 'null' is not assignable to type 'string | URL | undefined'.
		openGraph: {
			...parent.openGraph,
			title: page.data.fullTitle || page.data.title,
		}
	};

	if (page.data.description) {
		metadata.description = page.data.description;
		metadata.openGraph!.description = page.data.description;
	}

	return metadata;
}
