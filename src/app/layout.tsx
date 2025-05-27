import Link from "fumadocs-core/link";
import { Banner } from "fumadocs-ui/components/banner";
import { RootProvider } from "fumadocs-ui/provider";
import type { Metadata } from "next";
import { Exo_2, Noto_Sans } from "next/font/google";
import type { ReactNode } from "react";

import "./global.css";

const notoSans = Noto_Sans({
	subsets: ["latin"],
});

const exo2 = Exo_2({
	subsets: ["latin"],
	variable: "--font-exo2",
});

export const metadata: Metadata = {
	title: {
		template: "%s • VRChat.community",
		default: "VRChat.community",
	},
	applicationName: "VRChat.community",
	description: "API documentation, SDKs, and more for VRChat.",
	openGraph: {
		siteName: "VRChat.community • API documentation, SDKs, and more",
	}
};

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<html suppressHydrationWarning className={`${notoSans.className} ${exo2.variable}`} lang="en">
			<body className="flex flex-col min-h-screen">
				<RootProvider>
					<Banner id="v6-incomplete" variant="rainbow">
						<span className="prose [font-size:unset] [line-height:unset]">
							v6 documentation is incomplete,
							{" "}
							<Link href="/contributing">want to contribute</Link>
							?
						</span>
					</Banner>
					{children}
				</RootProvider>
			</body>
		</html>
	);
}
