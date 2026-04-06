import { Endpoints } from "@octokit/types";
import invariant from "tiny-invariant";

type Commits = Endpoints["GET /repos/{owner}/{repo}/commits"]["response"]["data"];
type Repositories = Endpoints["GET /orgs/{org}/repos"]["response"]["data"];

export const githubOrganization = "vrchatapi";
export const githubRepository = "vrchat.community";

export const githubAccessKey = process.env.GH_TOKEN;
if (!githubAccessKey) throw new ReferenceError("Missing environment variable: GH_TOKEN");

export const githubUrl = `https://github.com/${githubOrganization}/${githubRepository}`;

export async function getRepositories(owner: string) {
  const url = `https://api.github.com/orgs/${owner}/repos`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${githubAccessKey}`
    },
  });

  invariant(response.ok, `getRepositories gave ${response.status}`);

  const repositories: Repositories = await response.json();
  return repositories;
}

async function getCommits(owner: string, repository: string, pathname?: string) {
  const query = new URLSearchParams();
  if (pathname) query.set("path", pathname);

  const url = `https://api.github.com/repos/${owner}/${repository}/commits?${query.toString()}`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${githubAccessKey}`
    },
  });

  invariant(response.ok, `getCommits gave ${response.status}`);

  const commits: Commits = await response.json();
  return commits;
}

type Contributor = {
  id: string;
  name: string;
  commit_count: number;
  url: string;
  avatar_url: string;
};

export async function getContributorsForRepository(
  owner: string,
  repository: string,
  pathname?: string,
) {
  const commits = await getCommits(owner, repository, pathname);

  return Object.values(
    commits.reduce<Record<string, Contributor>>((acc, { author, commit }) => {
      const id = author?.login.toLowerCase();
      if (!id || !author || !commit.author) return acc;

      acc[id] = {
        id,
        name: commit.author?.name ?? id,
        commit_count: (acc[id]?.commit_count ?? 0) + 1,
        url: author.html_url,
        avatar_url: author.avatar_url,
      };

      return acc;
    }, {}),
  ).sort((a, b) => b.commit_count - a.commit_count);
}

export type GetContributorsOptions = {
  repositories: Array<{
    owner: string;
    repository: string;
    pathname?: string;
  }>;
  exclude?: Array<string>;
};

export type Contributors = Awaited<ReturnType<typeof getContributors>>;

export async function getContributors({
  repositories,
  exclude = ["vrccat", "github-actions[bot]"],
}: GetContributorsOptions) {
  return Object.values(
    (
      await Promise.all(
        repositories.map(({ owner, repository, pathname }) =>
          getContributorsForRepository(owner, repository, pathname),
        ),
      )
    )
      .flat()
      .reduce<Record<string, Awaited<ReturnType<typeof getContributorsForRepository>>[number]>>(
        (acc, c) => {
          acc[c.id] = acc[c.id]
            ? { ...acc[c.id], commit_count: acc[c.id].commit_count + c.commit_count }
            : c;
          return acc;
        },
        {},
      ),
  )
    .sort((a, b) => b.commit_count - a.commit_count)
    .filter(({ id }) => !exclude.includes(id));
}

export async function getContributorsForOrganization(owner: string) {
  const repositories = await getRepositories(owner);

  const contributors = await getContributors({
    repositories: repositories.map(({ name, owner }) => ({ owner: owner.login, repository: name })),
  });

  return contributors;
}
