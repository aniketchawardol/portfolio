import React, { useState, useEffect } from "react";
import axios from "axios";
import DSATile from "./DSATile";

const DSASkills = () => {
  const [leetCodeData, setLeetCodeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Updated function to parse LeetCode API response
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

  // Update the fetchLeetCodeData function to better handle the real API response
  const fetchLeetCodeData = async () => {
    try {
      const response = await axios.get(
        "https://leetcode-stats-api.herokuapp.com/aniketchawardol"
      );
      console.log("LeetCode Stats API Response:", response.data);

      setLeetCodeData(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error details:", err);
      setError("Failed to load LeetCode data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeetCodeData();
  }, []);

  if (error || !leetCodeData) {
    return null;
  }

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-16">
        <div className="text-2xl text-slate-600 font-mono">
          Loading LeetCode stats...
        </div>
      </div>
    );
  }

  const dsaStats = prepareDSAStats();

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-offwhite to-lav py-16 font-exo">
      <div className="container mx-auto px-4 ">
        <h2 className="text-4xl font-halfomania text-slate-700 text-center mb-6">
          DSA Proficiency
        </h2>
        <p className="text-center text-slate-600 mb-16 font-mono">
          My LeetCode problem-solving journey and statistics
        </p>

        <div className="mx-auto">
          <div className="grid grid-cols-6 auto-rows-auto gap-5">
            {dsaStats.map((stat, index) => (
              <DSATile
                key={index}
                title={stat.title}
                value={stat.value}
                category={stat.category}
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
            className="inline-block font-mono text-slate-700 py-2 px-6 rounded-lg hover:bg-slate-100 transition-all"
          >
            View Full Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default DSASkills;
