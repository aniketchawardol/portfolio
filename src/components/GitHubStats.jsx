import React, { useState, useEffect } from "react";
import axios from "axios";
import GitHubStatsTile from "./GitHubStatsTile";
import GitHubHeatmap from "./GitHubHeatmap";
import { useTheme } from "../utils/ThemeProvider";
import SpotlightCard from "../assets/Components/SpotlightCard/SpotlightCard";

const GitHubStats = ({ username = "aniketchawardol" }) => {
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme();
  const isDarkMode =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Get token from environment variables
        const token = import.meta.env.VITE_APP_GITHUB_TOKEN;
        
        // Configure headers with GitHub token for authentication
        const headers = {
          Authorization: `token ${token}`,
        };

        // REST API calls
        const userResponse = await axios.get(
          `https://api.github.com/users/${username}`,
          { headers }
        );
        
        const reposResponse = await axios.get(
          `https://api.github.com/users/${username}/repos?per_page=100`,
          { headers }
        );

        // GraphQL query to fetch contribution data
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
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Process contributions data
        const contributionCalendar = 
          contributionsResponse.data?.data?.user?.contributionsCollection?.contributionCalendar;
        
        const totalContributions = contributionCalendar?.totalContributions || 0;
        
        const contributionDays = contributionCalendar?.weeks
          ?.flatMap((week) => week.contributionDays) || [];

        // Process languages data
        const languages = {};
        reposResponse.data.forEach((repo) => {
          if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
          }
        });

        const totalRepos = Object.values(languages).reduce(
          (acc, count) => acc + count,
          0
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
            contributionDays
          },
          stats: {
            totalRepos: userResponse.data.public_repos,
            totalForks: reposResponse.data.reduce(
              (acc, repo) => acc + repo.forks_count,
              0
            ),
            totalContributions
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

  const prepareGitHubStats = () => {
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
      }
    ];
  };

  if (loading) {
    return (
      <div
        className={`w-full flex items-center justify-center py-16 ${
          isDarkMode ? "dark:bg-slate-900" : ""
        }`}
      >
        <div
          className={`text-2xl ${
            isDarkMode ? "dark:text-slate-300" : "text-slate-600"
          } font-mono`}
        >
          Loading GitHub stats...
        </div>
      </div>
    );
  }

  const gitHubStats = prepareGitHubStats();

  return (
    <div
      className={`w-full min-h-screen flex items-center justify-center ${
        isDarkMode
          ? "bg-gradient-to-b dark:from-[#0a0621] dark:via-[#0c0825] dark:to-[#0f0a29]"
          : "bg-gradient-to-b from-[#a28cd1] via-[#b6a6e3] to-[#cbb4f0]"
      } py-8 md:py-16 font-exo`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center mb-6 md:mb-4">
          {githubData?.profile?.avatar_url && (
            <div className="flex flex-col m-2 md:flex-row items-center">
              <img
                src={githubData.profile.avatar_url}
                alt={`${username}'s GitHub avatar`}
                className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-slate-300 shadow-lg mb-3 md:mb-0 md:inline"
              />
              <h3
                className={`text-lg md:text-xl font-bold font-mono md:m-2 md:mt-4 ${
                  isDarkMode ? "dark:text-slate-200" : ""
                }`}
              >
                {githubData.profile.name || username}
              </h3>
            </div>
          )}

          <h2
            className={`text-3xl md:text-4xl font-halfomania ${
              isDarkMode ? "dark:text-slate-200" : "text-slate-700"
            } mt-2 md:mt-0`}
          >
            GitHub Activity
          </h2>
        </div>
        <p
          className={`text-center ${
            isDarkMode ? "dark:text-slate-300" : "text-slate-600"
          } font-mono mb-6 md:mb-8`}
        >
          My open-source contributions and project portfolio
        </p>

        <SpotlightCard
          className={`p-4 md:p-8 rounded-xl mx-auto ${
            isDarkMode
              ? "dark:bg-[#2e1065]/10 dark:border-[#4c1d95]/10"
              : "bg-white/10 border-white/10"
          } border`}
          spotlightColor={
            isDarkMode ? "rgba(168, 85, 247, 0.45)" : "rgba(124, 58, 237, 0.35)"
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 auto-rows-auto gap-3 grid-auto-flow-dense">
            {gitHubStats.map((stat, index) => (
              <GitHubStatsTile
                key={index}
                title={stat.title}
                value={stat.value}
                category={stat.category}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        </SpotlightCard>
        
        {/* GitHub Heatmap */}
        <div className="mt-8 md:mt-12">
          <SpotlightCard
            className={`p-4 md:p-8 rounded-xl mx-auto ${
              isDarkMode
                ? "dark:bg-[#2e1065]/10 dark:border-[#4c1d95]/10"
                : "bg-white/10 border-white/10"
            } border`}
            spotlightColor={
              isDarkMode ? "rgba(168, 85, 247, 0.45)" : "rgba(124, 58, 237, 0.35)"
            }
          >
            {githubData?.contributionData?.contributionDays && (
              <GitHubHeatmap 
                contributionDays={githubData.contributionData.contributionDays} 
                isDarkMode={isDarkMode} 
              />
            )}
          </SpotlightCard>
        </div>

        <div className="text-center mt-6 md:mt-8">
          <a
            href={
              githubData?.profile?.html_url || `https://github.com/${username}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block ${
              isDarkMode
                ? "bg-[#5c4a99] hover:bg-[#473677]"
                : "bg-[#7263b3] hover:bg-[#5e4b9c]"
            } text-white py-2 px-4 rounded-md transition-colors`}
          >
            View GitHub Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default GitHubStats;
