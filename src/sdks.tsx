import { CSharp, Dart, Java, JavaScript, Python, Rust } from "@/lib/icons";

export const sdks = [
	{
		name: "JavaScript",
		icon: <JavaScript />,
		repository: "vrchatapi-javascript",
		documentation: "/javascript",
		link: "https://www.npmjs.com/package/vrchat",
	},
	{
		name: "Python",
		repository: "vrchatapi-python",
		icon: <Python />,
		documentation: "/python",
		link: "https://pypi.org/project/vrchatapi/",
	},
	{
		name: "C#",
		repository: "vrchatapi-csharp",
		icon: <CSharp />,
		documentation: "/csharp",
		link: "https://www.nuget.org/packages/VRChat.API",
	},
	{
		name: "Dart",
		repository: "vrchatapi-dart",
		icon: <Dart />,
		documentation: "/dart",
		link: "https://pub.dev/packages/vrchat_dart",
	},
	{
		name: "Java",
		icon: <Java />,
		repository: "vrchatapi-java",
		documentation: "/java",
	},
	{
		name: "Rust",
		icon: <Rust />,
		repository: "vrchatapi-rust",
		documentation: "/rust",
		link: "https://crates.io/crates/vrchatapi",
	},

];
