import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import GitHubStatsTile from "./GitHubStatsTile";
import GitHubHeatmap from "./GitHubHeatmap";
import { useIsDarkMode } from "../hooks/useIsDarkMode";
import GlowCard from "./GlowCard";
import { useDeviceDetection } from "../hooks/useDeviceDetection";

const GitHubStats = ({ username = "aniketchawardol" }) => {
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isDarkMode = useIsDarkMode();
  const { isTouchDevice } = useDeviceDetection();
  const [hoveredTileId, setHoveredTileId] = useState(null);
  const tileRefs = useRef({});

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
      },
    ];
  };

  const gitHubStats = githubData ? prepareGitHubStats() : [];

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const token = import.meta.env.VITE_APP_GITHUB_TOKEN;

        const headers = {
          Authorization: `token ${token}`,
        };

        const userResponse = await axios.get(
          `https://api.github.com/users/${username}`,
          { headers }
        );

        const reposResponse = await axios.get(
          `https://api.github.com/users/${username}/repos?per_page=100`,
          { headers }
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
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const contributionCalendar =
          contributionsResponse.data?.data?.user?.contributionsCollection
            ?.contributionCalendar;

        const totalContributions =
          contributionCalendar?.totalContributions || 0;

        const contributionDays =
          contributionCalendar?.weeks?.flatMap(
            (week) => week.contributionDays
          ) || [];

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
            contributionDays,
          },
          stats: {
            totalRepos: userResponse.data.public_repos,
            totalForks: reposResponse.data.reduce(
              (acc, repo) => acc + repo.forks_count,
              0
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

  // Get transform classes for tiles
  const getTileTransformClasses = (index) => {
    if (isTouchDevice) return "";

    if (hoveredTileId === index) {
      return "scale-105 z-10 blur-none tile-hovered";
    } else if (hoveredTileId !== null) {
      return "scale-100 z-[1] blur-[5px]";
    } else {
      return "scale-100 z-[1] blur-none";
    }
  };

  if (error || !githubData) {
    return null;
  }

  if (loading) {
    return (
      <div
        className="w-full flex items-center justify-center py-16
          dark:bg-slate-900
        "
      >
        <div
          className="text-2xl 
            dark:text-slate-300 text-slate-600
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
          bg-gradient-to-b dark:from-[#150d37] dark:via-[#0c0825] dark:to-[#0f0a29]
          from-[#cbb4f0] via-[#b6a6e3] to-[#cbb4f0]
      py-8 md:py-16 font-exo"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center md:mb-4">
          {githubData?.profile && (
            <div className="flex flex-col m-2 md:flex-row items-center">
              <img
                src={githubData.profile.avatar_url}
                alt={`${username}'s GitHub avatar`}
                className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-slate-300 shadow-lg mb-3 md:mb-0 md:inline"
              />
              <h3 className="text-lg md:text-xl font-bold font-mono md:m-2 md:mt-4 text-slate-700 dark:text-slate-200">
                {githubData.profile.name || username}
              </h3>
            </div>
          )}

          <h2 className="text-3xl md:text-4xl font-halfomania text-slate-700 dark:text-slate-200 mt-2 md:mt-0">
            GitHub Activity
          </h2>
        </div>
        <p className="text-center text-slate-600 dark:text-slate-300 font-mono mb-6">
          My open-source contributions and project portfolio
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gitHubStats.map((stat, index) => {
            // Determine the grid placement based on category
            let gridClass = "";
            if (stat.category === "allRepos") {
              gridClass = "col-span-1 row-span-2"; // Make All Repos span 2 rows
            } else {
              gridClass = "col-span-1 row-span-1"; // Other tiles are normal size
            }

            return (
              <div
                key={index}
                ref={(el) => (tileRefs.current[index] = el)}
                className={`${gridClass} ${
                  !isTouchDevice
                    ? `transition-tile ${getTileTransformClasses(index)}`
                    : ""
                } will-change-transform`}
                onMouseEnter={
                  !isTouchDevice ? () => setHoveredTileId(index) : undefined
                }
                onMouseLeave={
                  !isTouchDevice ? () => setHoveredTileId(null) : undefined
                }
                onClick={
                  isTouchDevice ? () => setHoveredTileId(index) : undefined
                }
              >
                <GitHubStatsTile
                  title={stat.title}
                  value={stat.value}
                  category={stat.category}
                  isDarkMode={isDarkMode}
                />
              </div>
            );
          })}
        </div>

        {/* GitHub Heatmap */}
        <div className="mt-6">
          <GlowCard
            className="p-6 rounded-xl mx-auto max-w-full
             dark:bg-[#2e1065]/10 dark:border-[#4c1d95]/10
             bg-white/10 border-white/10
            border"
            isDarkMode={isDarkMode}
            customSize={true}
          >
            {githubData?.contributionData?.contributionDays && (
              <GitHubHeatmap
                contributionDays={githubData.contributionData.contributionDays}
                isDarkMode={isDarkMode}
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
            className={`inline-block bg-[#7263b3] ${
              !isTouchDevice
                ? "hover:bg-[#5e4b9c] dark:hover:bg-[#473677]"
                : "active:bg-[#5e4b9c] dark:active:bg-[#473677]"
            } dark:bg-[#5c4a99] text-white py-2 px-4 rounded-xl transition-colors`}
          >
            View GitHub Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default GitHubStats;
