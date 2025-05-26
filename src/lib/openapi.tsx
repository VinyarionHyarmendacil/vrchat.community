import Link from "fumadocs-core/link";
import { APIPlayground } from "fumadocs-openapi/playground";
import { createOpenAPI } from "fumadocs-openapi/server";
import { Callout } from "fumadocs-ui/components/callout";

export const openapi = createOpenAPI({
	proxyUrl: "/api/proxy",
	generateTypeScriptSchema: false,
	// disablePlayground: true,
	renderer: {
		APIPlayground: (props) => {
			return (
				<>
					<Callout
						title={(
							<>
								Requests made through this page are proxied
								{" "}
								<span className="font-normal">
									through an intermediary server due to
									{" "}
									<Link href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS">
										Cross-Origin Resource Sharing
									</Link>
									{" "}
									restrictions.
								</span>
							</>
						)}
						type="warn"
					>
					</Callout>
					<APIPlayground {...props} />
				</>
			);
		}
	}
});
