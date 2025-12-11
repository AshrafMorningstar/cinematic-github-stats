/* Created by AshrafMorningstar - https://github.com/AshrafMorningstar */
import { Octokit } from "octokit";
import { config } from "dotenv";
import fs from "fs/promises";
import path from "path";

config();

const username = "AshrafMorningstar"; // Change this if needed
const token = process.env.GH_TOKEN;

interface Language {
  name: string;
  color: string;
  size: number;
}

interface UserStats {
  username: string;
  name: string;
  avatar: string;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  totalContribs: number;
  repos: number;
  stars: number;
  followers: number;
  topLanguages: Language[];
  contributionCalendar: {
    totalContributions: number;
    weeks: {
      contributionDays: {
        contributionCount: number;
        date: string;
        color: string;
      }[];
    }[];
  };
  _credits: string;
}

const octokit = new Octokit({
  auth: token,
});

async function fetchStats() {
  console.log(`Fetching stats for ${username}...`);

  try {
    // 1. Fetch User Data & General Stats
    const { data: user } = await octokit.rest.users.getByUsername({ username });

    // 2. Fetch Repositories for Language Calculation
    const { data: repos } = await octokit.rest.repos.listForUser({
      username,
      per_page: 100,
      sort: "pushed",
      type: "owner",
    });

    // Calculate detailed stats
    let totalStars = 0;
    const languageMap: Record<string, { size: number; color: string }> = {};

    for (const repo of repos) {
      totalStars += repo.stargazers_count || 0;

      if (repo.language) {
        // Fallback colors if null
        const color = "#3b82f6";
        if (!languageMap[repo.language]) {
          languageMap[repo.language] = { size: 0, color };
        }
        languageMap[repo.language].size += 1; // Simplified weighting by repo count for speed
      }
    }

    // Sort languages
    const topLanguages = Object.entries(languageMap)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.size - a.size)
      .slice(0, 5);

    // 3. Fetch Contribution Graph (GraphQL)
    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            totalCommitContributions
            totalIssueContributions
            totalPullRequestContributions
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                  color
                }
              }
            }
          }
        }
      }
    `;

    const graphqlData: any = await octokit.graphql(query, { username });
    const contribs = graphqlData.user.contributionsCollection;

    const stats: UserStats = {
      username: user.login,
      name: user.name || user.login,
      avatar: user.avatar_url,
      totalCommits: contribs.totalCommitContributions,
      totalPRs: contribs.totalPullRequestContributions,
      totalIssues: contribs.totalIssueContributions,
      totalContribs: contribs.contributionCalendar.totalContributions,
      repos: user.public_repos,
      stars: totalStars,
      followers: user.followers,
      topLanguages,
      contributionCalendar: contribs.contributionCalendar,
      _credits:
        "Created by AshrafMorningstar - https://github.com/AshrafMorningstar",
    };

    // Ensure directory exists
    const dataDir = path.join(process.cwd(), "src", "data");
    await fs.mkdir(dataDir, { recursive: true });

    // Write to file
    await fs.writeFile(
      path.join(dataDir, "stats.json"),
      JSON.stringify(stats, null, 2)
    );

    console.log("Stats fetched successfully! 🚀");
  } catch (error) {
    console.warn("Error fetching data:", error);
    console.log("Using mock data...");

    // Provide Mock Data if Fetch Fails
    const mockStats: UserStats = {
      username: "AshrafMorningstar",
      name: "Ashraf Morningstar",
      avatar: "https://avatars.githubusercontent.com/u/123456?v=4",
      totalCommits: 1250,
      totalPRs: 85,
      totalIssues: 42,
      totalContribs: 3650,
      repos: 25,
      stars: 120,
      followers: 50,
      topLanguages: [
        { name: "TypeScript", size: 50, color: "#3178c6" },
        { name: "React", size: 30, color: "#61dafb" },
        { name: "Python", size: 20, color: "#3572a5" },
        { name: "Rust", size: 10, color: "#dea584" },
        { name: "Go", size: 5, color: "#00add8" },
      ],
      contributionCalendar: {
        totalContributions: 3650,
        weeks: [], // Empty for mock to save space
      },
      _credits:
        "Created by AshrafMorningstar - https://github.com/AshrafMorningstar",
    };

    const dataDir = path.join(process.cwd(), "src", "data");
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(
      path.join(dataDir, "stats.json"),
      JSON.stringify(mockStats, null, 2)
    );
  }
}

fetchStats();
