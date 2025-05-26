import Link from "next/link";

export default function HomePage() {
	return (
		<main className="flex flex-1 flex-col justify-center text-center">
			<h1 className="mb-4 text-2xl font-bold">
				VRChat API Documentation
			</h1>
			<p className="">
				Here you'll find Community-created documentation about the VRChat REST
				API, an OpenAPI specification, and generated SDK's in several languages.
			</p>
		</main>
	);
}
