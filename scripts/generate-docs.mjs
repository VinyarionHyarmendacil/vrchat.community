/* eslint-disable unicorn/prevent-abbreviations */
import { generateFiles } from "fumadocs-openapi";

function kebabCase(value) {
	return value
		.replace(/([a-z])([A-Z])/g, "$1-$2")
		.replace(/[\s_]+/g, "-")
		.toLowerCase();
}

void generateFiles({
	// the OpenAPI schema
	input: ["https://vrchat.community/openapi.yaml"],
	output: "./content/docs/reference/(generated)",
	// per: "operation",
	// groupBy: "tag",
	// per: "tag",
	frontmatter: (title, description, context) => {

		return {
			full: true,
			description: description?.split("\n")[0] || "",
		};
	},
	name: (output, document) => {
		const operation = document.paths[output.item.path][output.item.method];
		return `(${operation.tags[0] || "miscellaneous"})/${kebabCase(operation.operationId)}`;
	},
	includeDescription: true,
});
