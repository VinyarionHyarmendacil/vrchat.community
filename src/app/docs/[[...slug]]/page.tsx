import { createRelativeLink } from "fumadocs-ui/mdx";
import {
	DocsBody,
	DocsDescription,
	DocsPage,
	DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";

import { source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

export default async function Page(props: {
	params: Promise<{ slug?: Array<string> }>;
}) {
	const parameters = await props.params;
	const page = source.getPage(parameters.slug);
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

export async function generateStaticParams() {
	return source.generateParams();
}

export async function generateMetadata(props: {
	params: Promise<{ slug?: Array<string> }>;
}) {
	const parameters = await props.params;
	const page = source.getPage(parameters.slug);
	if (!page) notFound();

	return {
		title: page.data.title,
		description: page.data.description,
	};
}
