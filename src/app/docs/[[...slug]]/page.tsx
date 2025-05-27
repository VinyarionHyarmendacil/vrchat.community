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
	const { slug } = await params;
	const page = source.getPage(slug);
	if (!page) notFound();

	const MDXContent = page.data.body;

	return (
		<DocsPage
			tableOfContent={{
				style: "clerk",
			}}
			full={page.data.full}
			toc={page.data.toc}
		>
			<DocsTitle>{page.data.title}</DocsTitle>
			<DocsDescription>{page.data.description}</DocsDescription>
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
	const parameters = await props.params;
	const parent = await _parent;

	const page = source.getPage(parameters.slug);
	if (!page) notFound();

	const metadata: Metadata = {
		...parent,
		title: page.data.title,
		openGraph: {
			...parent.openGraph,
			title: page.data.title,
		}
	};

	if (page.data.description) {
		metadata.description = page.data.description;
		metadata.openGraph!.description = page.data.description;
	}

	return metadata;
}
