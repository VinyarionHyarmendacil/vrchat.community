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
	input: ["https://vrchatapi.github.io/specification/openapi.yaml"],
	output: "./content/docs/openapi/(generated)",
	// per: "operation",
	// groupBy: "tag",
	name: (output, document) => {
		const operation = document.paths[output.item.path][output.item.method];
		return `(${operation.tags[0] || "miscellaneous"})/${kebabCase(operation.operationId)}`;
	},
	includeDescription: true,
});
