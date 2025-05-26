/* eslint-disable unicorn/prevent-abbreviations */
import { generateFiles } from "fumadocs-openapi";

void generateFiles({
	// the OpenAPI schema
	input: ["https://vrchatapi.github.io/specification/openapi.yaml"],
	output: "./content/docs/specification",
	per: "tag",
	// we recommend to enable it
	// make sure your endpoint description doesn't break MDX syntax.
	includeDescription: true,
});
