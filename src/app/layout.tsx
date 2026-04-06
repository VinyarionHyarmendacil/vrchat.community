import { Inter } from "next/font/google";
import { Provider } from "@/components/provider";
import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { SiDiscord } from "@icons-pack/react-simple-icons";
import { sdks } from "@/sdks";
import { ChartLine } from "lucide-react";
import Icon from "./icon.svg";
import { Image } from "fumadocs-core/framework";
import "./global.css";
import { githubUrl } from "@/github";

const inter = Inter({
  subsets: ["latin"],
});

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Provider>
          <DocsLayout
            tree={source.getPageTree()}
            sidebar={{ prefetch: false }}
            tabMode="navbar"
            nav={{
              mode: "top",
              title: (
                <div className="flex gap-2">
                  <Image
                    src={Icon}
                    alt="Icon for VRChat.community"
                    className="size-9 invert dark:invert-0"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">VRChat.community</span>
                    <span className="font-normal text-xs line-clamp-1">
                      API documentation, SDKs, and more
                    </span>
                  </div>
                </div>
              ),
            }}
            githubUrl={githubUrl}
            links={[
              {
                text: "Metrics",
                icon: <ChartLine />,
                url: "https://metrics.vrchat.community",
              },
              {
                text: "SDKs",
                secondary: true,
                type: "menu",
                items: sdks.map(({ name, documentation, icon }) => ({
                  text: name,
                  url: documentation,
                  icon,
                })),
              },
              {
                icon: <SiDiscord />,
                external: true,
                text: "Discord",
                url: "/discord",
                type: "icon",
              },
            ]}
          >
            {children}
          </DocsLayout>
        </Provider>
      </body>
    </html>
  );
}
