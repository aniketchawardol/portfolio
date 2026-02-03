import { useState, useEffect, useMemo, memo } from "react";
import axios from "axios";
import GitHubStatsTile from "./GitHubStatsTile";
import GitHubHeatmap from "./GitHubHeatmap";
import GlowCard from "./GlowCard";
import { useDeviceDetection } from "../hooks/useDeviceDetection";
import { GITHUB_CONFIG } from "../constants";

const GitHubStats = memo(({ username = GITHUB_CONFIG.username }) => {
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isTouchDevice } = useDeviceDetection();

  // Memoize the stats preparation to avoid recalculation on every render
  const gitHubStats = useMemo(() => {
    if (!githubData) return [];

    const { stats, languages, repositories } = githubData;

    return [
      {
        title: "All Repositories",
        value: repositories,
        category: "allRepos",
      },
      {
        title: "Top Languages",
        value: languages,
        category: "languages",
      },
      {
        title: "Total Repositories",
        value: stats.totalRepos,
        category: "totalRepos",
      },
      {
        title: "Total Forks",
        value: stats.totalForks,
        category: "forks",
      },
      {
        title: "Total Contributions",
        value: stats.totalContributions,
        category: "totalContributions",
      },
    ];
  }, [githubData]);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const headers = {
          Authorization: `token ${GITHUB_CONFIG.token}`,
        };

        const userResponse = await axios.get(
          `https://api.github.com/users/${username}`,
          { headers },
        );

        const reposResponse = await axios.get(
          `https://api.github.com/users/${username}/repos?per_page=100`,
          { headers },
        );

        const graphqlQuery = {
          query: `
          {
            user(login: "${username}") {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                      color
                    }
                  }
                }
              }
            }
          }`,
        };

        const contributionsResponse = await axios.post(
          "https://api.github.com/graphql",
          graphqlQuery,
          {
            headers: {
              Authorization: `Bearer ${GITHUB_CONFIG.token}`,
              "Content-Type": "application/json",
            },
          },
        );

        const contributionCalendar =
          contributionsResponse.data?.data?.user?.contributionsCollection
            ?.contributionCalendar;

        const totalContributions =
          contributionCalendar?.totalContributions || 0;

        const contributionDays =
          contributionCalendar?.weeks?.flatMap(
            (week) => week.contributionDays,
          ) || [];

        const languages = {};
        reposResponse.data.forEach((repo) => {
          if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
          }
        });

        const totalRepos = Object.values(languages).reduce(
          (acc, count) => acc + count,
          0,
        );
        const languagesArray = Object.entries(languages)
          .map(([name, count]) => ({
            name,
            count,
            percentage: Math.round((count / totalRepos) * 100),
          }))
          .sort((a, b) => b.count - a.count);

        const topRepositories = reposResponse.data
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 5)
          .map((repo) => ({
            name: repo.name,
            url: repo.html_url,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            description: repo.description,
          }));

        setGithubData({
          profile: userResponse.data,
          repositories: reposResponse.data,
          languages: languagesArray,
          topRepositories,
          contributionData: {
            totalContributions,
            contributionDays,
          },
          stats: {
            totalRepos: userResponse.data.public_repos,
            totalForks: reposResponse.data.reduce(
              (acc, repo) => acc + repo.forks_count,
              0,
            ),
            totalContributions,
          },
        });
        setLoading(false);
      } catch (err) {
        console.error("GitHub API Error:", err);
        if (err.response && err.response.status === 401) {
          setError("Authentication failed. Please check your GitHub token.");
        } else {
          setError("Failed to load GitHub data");
        }
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [username]);

  if (error || !githubData) {
    return null;
  }

  if (loading) {
    return (
      <div
        className="w-full flex items-center justify-center py-16
          bg-[#000000]
        "
      >
        <div
          className="text-2xl 
            text-white
        font-mono"
        >
          Loading GitHub stats...
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center 
          bg-[#000000]
      py-8 md:py-16 font-exo"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center md:mb-4">
          {githubData?.profile && (
            <div className="flex flex-col m-2 md:flex-row items-center">
              <img
                src={githubData.profile.avatar_url}
                alt={`${username}'s GitHub avatar`}
                className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-[#FF5C00] mb-3 md:mb-0 md:inline"
              />
              <h3 className="text-lg md:text-xl font-bold font-mono md:m-2 md:mt-4 text-white">
                {githubData.profile.name || username}
              </h3>
            </div>
          )}

          <h2 className="text-3xl md:text-4xl font-halfomania text-white mt-2 md:mt-0">
            GitHub Activity
          </h2>
        </div>
        <p className="text-center text-white font-mono mb-6">
          My open-source contributions and project portfolio
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 github-stats-grid">
          {gitHubStats.map((stat, index) => {
            // Determine the grid placement based on category
            let gridClass = "";
            if (stat.category === "allRepos") {
              gridClass = "col-span-1 row-span-2"; // Make All Repos span 2 rows
            } else {
              gridClass = "col-span-1 row-span-1"; // Other tiles are normal size
            }

            return (
              <div key={index} className={`${gridClass} github-stats-tile`}>
                <GitHubStatsTile
                  title={stat.title}
                  value={stat.value}
                  category={stat.category}
                />
              </div>
            );
          })}
        </div>

        {/* GitHub Heatmap */}
        <div className="mt-6">
          <GlowCard
            className="p-6 rounded-xl mx-auto max-w-full
             bg-[#2e1065]/10 border-[#4c1d95]/10
            border"
            customSize={true}
          >
            {githubData?.contributionData?.contributionDays && (
              <GitHubHeatmap
                contributionDays={githubData.contributionData.contributionDays}
              />
            )}
          </GlowCard>
        </div>

        <div className="text-center mt-6">
          <a
            href={
              githubData?.profile?.html_url || `https://github.com/${username}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block bg-[#FF5C00] ${
              !isTouchDevice ? "hover:bg-[#ff6a0085]" : "active:bg-[#ff9e54]"
            } bg-[#FF5C00] text-white py-2 px-4 rounded-xl transition-colors`}
          >
            <p className="mx-4 my-1">View GitHub Profile</p>
          </a>
        </div>
      </div>
    </div>
  );
});

GitHubStats.displayName = "GitHubStats";

export default GitHubStats;
