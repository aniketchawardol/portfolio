import React, { useState, useEffect } from "react";
import axios from "axios";
import DSATile from "./DSATile";
import { useTheme } from "../utils/ThemeProvider";

const DSASkills = () => {
  const [leetCodeData, setLeetCodeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [hoveredTileId, setHoveredTileId] = useState(null);
  const { theme } = useTheme();
  const isDarkMode =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const prepareDSAStats = () => {
    if (!leetCodeData) return [];

    const totalSolved = leetCodeData.totalSolved || 291;
    const easySolved = leetCodeData.easySolved || 95;
    const mediumSolved = leetCodeData.mediumSolved || 169;
    const hardSolved = leetCodeData.hardSolved || 27;
    const acceptanceRate = leetCodeData.acceptanceRate
      ? `${leetCodeData.acceptanceRate}%`
      : "65.27%";
    const ranking = leetCodeData.ranking || 358395;
    const contributionPoints = leetCodeData.contributionPoints || 1548;

    const totalEasy = leetCodeData.totalEasy || 871;
    const totalMedium = leetCodeData.totalMedium || 1821;
    const totalHard = leetCodeData.totalHard || 819;

    const formatProgress = (solved, total) => `${solved} / ${total}`;

    return [
      {
        title: "Total Problems",
        value: leetCodeData.totalQuestions
          ? formatProgress(totalSolved, leetCodeData.totalQuestions)
          : `${totalSolved}`,
        category: "totalSolved",
      },
      {
        title: "Easy Problems",
        value: formatProgress(easySolved, totalEasy),
        category: "easySolved",
      },
      {
        title: "Medium Problems",
        value: formatProgress(mediumSolved, totalMedium),
        category: "mediumSolved",
      },
      {
        title: "Hard Problems",
        value: formatProgress(hardSolved, totalHard),
        category: "hardSolved",
      },
      {
        title: "Global Ranking",
        value: ranking.toLocaleString(),
        category: "ranking",
      },
      {
        title: "Acceptance Rate",
        value: acceptanceRate,
        category: "acceptanceRate",
      },
      {
        title: "Contribution Points",
        value: contributionPoints,
        category: "contributionPoints",
      },
    ];
  };

  const fetchLeetCodeData = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_LEETCODE_API 
      );


      setLeetCodeData(response.data);
      setLoading(false);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Error details:", err);
      setError("Failed to load LeetCode data");

      // Set up retry with exponential backoff
      const retryDelay = Math.min(1000 * 2 ** retryCount, 10000); // Max 10 seconds
      console.log(`Retrying in ${retryDelay / 1000} seconds...`);

      setTimeout(() => {
        setRetryCount((prevCount) => prevCount + 1);
        fetchLeetCodeData();
      }, retryDelay);
    }
  };

  useEffect(() => {
    fetchLeetCodeData();
  }, []);

  // Always show loading screen if we have no data yet, even if there's an error
  // (since we're going to retry automatically)
  if (loading || !leetCodeData) {
    return (
      <div className="w-full h-screen flex items-center justify-center py-16 dark:bg-slate-900">
        <div
          className="text-2xl dark:text-slate-300 text-slate-600
          font-mono text-center" 
        >
          <div>Loading LeetCode stats...</div>
          {error && retryCount > 0 && (
            <div className="text-sm mt-2">
              Attempt #{retryCount} - Retrying...
            </div>
          )}
        </div>
      </div>
    );
  }

  const dsaStats = prepareDSAStats();

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b dark:from-[#150d37] dark:via-[#100a2c] dark:to-[#0a0621]
         from-[#cbb4f0] via-[#b6a6e3] to-[#a28cd1]
     py-16 font-exo"
    >
      <div className="container mx-auto px-4">
        <h2
          className="text-4xl font-halfomania dark:text-slate-200 text-slate-700
           text-center mb-6"
        >
          DSA Proficiency
        </h2>
        <p
          className="text-center dark:text-slate-300 text-slate-600
        mb-16 font-mono"
        >
          My LeetCode problem-solving journey and statistics
        </p>

        <div className="mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 auto-rows-auto gap-3 sm:gap-4 md:gap-5">
            {dsaStats.map((stat, index) => (
              <DSATile
                key={index}
                title={stat.title}
                value={stat.value}
                category={stat.category}
                isDarkMode={isDarkMode}
                isHovered={hoveredTileId === index}
                isAnyHovered={hoveredTileId !== null}
                onHover={() => setHoveredTileId(index)}
                onLeave={() => setHoveredTileId(null)}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href={`https://leetcode.com/${
              leetCodeData?.username || "aniketchawardol"
            }`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-grow text-center 
             dark:bg-[#5c4a99] dark:hover:bg-[#473677]
                bg-[#7263b3] hover:bg-[#5e4b9c]
           text-white py-2 px-4 rounded-md transition-colors"
          >
            View Full Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default DSASkills;
