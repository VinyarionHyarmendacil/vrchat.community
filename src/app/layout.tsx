import { RootProvider } from "fumadocs-ui/provider";
import { Exo_2, Inter, Noto_Sans } from "next/font/google";
import type { ReactNode } from "react";

import "./global.css";

const notoSans = Noto_Sans({
	subsets: ["latin"],
});

const exo2 = Exo_2({
	subsets: ["latin"],
	variable: "--font-exo2",
});

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<html suppressHydrationWarning className={`${notoSans.className} ${exo2.variable}`} lang="en">
			<body className="flex flex-col min-h-screen">
				<RootProvider>{children}</RootProvider>
			</body>
		</html>
	);
}
