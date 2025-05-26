import { openapi } from "@/lib/openapi";

export const {
	GET,
	HEAD,
	PUT,
	POST,
	PATCH,
	DELETE
} = openapi.createProxy({
	overrides: {
		request: (request) => {
			request.headers.set("user-agent", "vrchat.community/1 https://github.com/vrchatapi/vrchat.community");
			return request;
		}
	}
});
