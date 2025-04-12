import React, { useState, useEffect } from "react";
import axios from "axios";
import GitHubStatsTile from "./GitHubStatsTile";

const GitHubStats = ({ username = "aniketchawardol" }) => {
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Using GitHub's public API endpoints
        const userResponse = await axios.get(
          `https://api.github.com/users/${username}`
        );

        // Get repositories
        const reposResponse = await axios.get(
          `https://api.github.com/users/${username}/repos?per_page=100`
        );

        // Calculate languages from repos
        const languages = {};
        reposResponse.data.forEach((repo) => {
          if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
          }
        });

        // Convert to percentage
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

        // Get top repos by stars
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

        // Compile the data
        setGithubData({
          profile: userResponse.data,
          repositories: reposResponse.data,
          languages: languagesArray,
          topRepositories,
          stats: {
            totalRepos: userResponse.data.public_repos,
            followers: userResponse.data.followers,
            following: userResponse.data.following,
            totalStars: reposResponse.data.reduce(
              (acc, repo) => acc + repo.stargazers_count,
              0
            ),
            totalForks: reposResponse.data.reduce(
              (acc, repo) => acc + repo.forks_count,
              0
            ),
            totalContributions: Math.floor(Math.random() * 1500) + 500, // Placeholder
          },
        });
        setLoading(false);
      } catch (err) {
        console.error("GitHub API Error:", err);
        setError("Failed to load GitHub data");
        setLoading(false);
        // No longer setting mock data
      }
    };

    fetchGitHubData();
  }, [username]);

  // If there's an error or no data, don't display anything
  if (error || !githubData) {
    return null;
  }

  // Prepare data for tiles display
  const prepareGitHubStats = () => {
    if (!githubData) return [];

    const { stats, languages, topRepositories, repositories, profile } =
      githubData;

    return [
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
    ];
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-16">
        <div className="text-2xl text-slate-600 font-mono">
          Loading GitHub stats...
        </div>
      </div>
    );
  }

  const gitHubStats = prepareGitHubStats();

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-t from-[#8672b8] via-[#a28cd1] to-[#cbb4f0] py-16 font-exo">
      <div className="container mx-auto px-4">
        {/* Display GitHub avatar at the top */}
        {githubData?.profile?.avatar_url && (
          <div className="items-center mb-8 flex justify-center">
            <img
              src={githubData.profile.avatar_url}
              alt={`${username}'s GitHub avatar`}
              className="w-24 h-24 rounded-full border-4 border-slate-300 shadow-lg inline"
            />
            <h3 className="inline text-xl font-bold mt-3 font-mono m-2">
              {githubData.profile.name || username}
            </h3>
          </div>
        )}

        <h2 className="text-4xl font-halfomania text-slate-700 text-center mb-6">
          GitHub Activity
        </h2>
        <p className="text-center text-slate-600 mb-16 font-mono">
          My open-source contributions and project portfolio
        </p>

        <div className="p-8 rounded-xl mx-auto">
          <div className="grid grid-cols-6 auto-rows-auto gap-3 grid-auto-flow-dense">
            {gitHubStats.map((stat, index) => (
              <GitHubStatsTile
                key={index}
                title={stat.title}
                value={stat.value}
                category={stat.category}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <a
            href={
              githubData?.profile?.html_url || `https://github.com/${username}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex-grow text-center bg-[#7263b3] text-white py-2 px-4 rounded-md hover:bg-[#5e4b9c] transition-colors"
          >
            View GitHub Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default GitHubStats;
