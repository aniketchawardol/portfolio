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
        title: "Reviews",
        value: stats.totalReviews,
        category: "reviews",
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
        setLoading(true);
        setError(null);

        const token = GITHUB_CONFIG.token?.trim();
        if (!token) {
          throw new Error("Missing GitHub token");
        }

        const restHeaders = {
          Authorization: `token ${token}`,
        };

        const fetchWithAuth = (url) => axios.get(url, { headers: restHeaders });

        const userResponse = await fetchWithAuth(
          `https://api.github.com/users/${username}`,
        );
        const reposResponse = await fetchWithAuth(
          `https://api.github.com/users/${username}/repos?per_page=100`,
        );

        const now = new Date();
        const oneYearAgo = new Date(now);
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        const nowIso = now.toISOString();
        const oneYearAgoIso = oneYearAgo.toISOString();

        const fetchGraphQL = async (query, variables = {}) => {
          const response = await axios.post(
            "https://api.github.com/graphql",
            {
              query,
              variables,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            },
          );

          if (response.data?.errors?.length) {
            throw new Error(
              response.data.errors.map((entry) => entry.message).join("; "),
            );
          }

          return response.data?.data || null;
        };

        const fetchContributionMetrics = async () => {
          const contributionSummaryQuery = `
            query (
              $username: String!
              $from: DateTime!
              $to: DateTime!
            ) {
              user(login: $username) {
                contributionMeta: contributionsCollection {
                  contributionYears
                }
                yearlyCollection: contributionsCollection(
                  from: $from
                  to: $to
                ) {
                  contributionCalendar {
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
            }
          `;

          const summaryData = await fetchGraphQL(contributionSummaryQuery, {
            username,
            from: oneYearAgoIso,
            to: nowIso,
          });
          const summary = summaryData?.user;
          if (
            !summary?.contributionMeta?.contributionYears ||
            !summary?.yearlyCollection?.contributionCalendar?.weeks
          ) {
            throw new Error("Incomplete contribution data.");
          }

          const contributionDays =
            summary.yearlyCollection.contributionCalendar.weeks.flatMap(
              (week) => week.contributionDays,
            );

          const contributionYears = summary.contributionMeta.contributionYears;
          if (!Array.isArray(contributionYears) || contributionYears.length === 0) {
            throw new Error("No contribution years returned by GitHub.");
          }

          const yearlyTotalQuery = `
            query (
              $username: String!
              $from: DateTime!
              $to: DateTime!
            ) {
              user(login: $username) {
                contributionsCollection(
                  from: $from
                  to: $to
                ) {
                  contributionCalendar {
                    totalContributions
                  }
                }
              }
            }
          `;

          const yearlyTotals = await Promise.all(
            contributionYears.map(async (year) => {
              const from = new Date(Date.UTC(year, 0, 1, 0, 0, 0, 0));
              const endOfYear = new Date(
                Date.UTC(year, 11, 31, 23, 59, 59, 999),
              );
              const to =
                year === now.getUTCFullYear() && endOfYear > now ? now : endOfYear;

              try {
                const data = await fetchGraphQL(yearlyTotalQuery, {
                  username,
                  from: from.toISOString(),
                  to: to.toISOString(),
                });
                const total =
                  data?.user?.contributionsCollection?.contributionCalendar
                    ?.totalContributions;
                if (typeof total !== "number") {
                  throw new Error("Missing yearly total contributions.");
                }
                return total;
              } catch (yearlyError) {
                console.error(
                  `GitHub GraphQL Yearly Contribution Error (${year}):`,
                  yearlyError,
                );
                throw yearlyError;
              }
            }),
          );

          const totalContributions = yearlyTotals.reduce(
            (sum, count) => sum + count,
            0,
          );
          const hasAnyContributionDay = contributionDays.some(
            (day) => day.contributionCount > 0,
          );
          if (totalContributions === 0 && !hasAnyContributionDay) {
            throw new Error("Contribution metrics resolved to zero unexpectedly.");
          }

          return {
            totalContributions,
            contributionDays,
          };
        };

        const fetchReviewMetrics = async () => {
          const reviewCommentsQuery = `
            query ($username: String!) {
              user(login: $username) {
                issueComments {
                  totalCount
                }
                contributionsCollection {
                  contributionYears
                }
              }
            }
          `;

          const data = await fetchGraphQL(reviewCommentsQuery, { username });
          const issueCommentsCount = data?.user?.issueComments?.totalCount;
          const contributionYears =
            data?.user?.contributionsCollection?.contributionYears;

          if (typeof issueCommentsCount !== "number") {
            throw new Error("Incomplete review comment data.");
          }
          if (!Array.isArray(contributionYears) || contributionYears.length === 0) {
            throw new Error("No contribution years returned for review metrics.");
          }

          const fetchPullRequestReviewCommentsCount = async () => {
            const pullRequestReviewCommentsQuery = `
              query ($username: String!) {
                user(login: $username) {
                  pullRequestReviewComments(last: 1) {
                    totalCount
                  }
                }
              }
            `;

            try {
              const reviewCommentData = await fetchGraphQL(
                pullRequestReviewCommentsQuery,
                { username },
              );
              const count =
                reviewCommentData?.user?.pullRequestReviewComments?.totalCount;

              return typeof count === "number" ? count : 0;
            } catch (reviewCommentError) {
              console.warn(
                "Pull request review comments could not be fetched. Falling back to 0.",
                reviewCommentError,
              );
              return 0;
            }
          };

          const fetchPullRequestDiscussionCommentsCount = async () => {
            const pullRequestDiscussionCommentsQuery = `
              query ($username: String!, $after: String) {
                user(login: $username) {
                  issueComments(first: 100, after: $after) {
                    nodes {
                      url
                    }
                    pageInfo {
                      hasNextPage
                      endCursor
                    }
                  }
                }
              }
            `;

            try {
              let hasNextPage = true;
              let afterCursor = null;
              let totalPullRequestDiscussionComments = 0;

              while (hasNextPage) {
                const discussionCommentsData = await fetchGraphQL(
                  pullRequestDiscussionCommentsQuery,
                  {
                    username,
                    after: afterCursor,
                  },
                );

                const connection = discussionCommentsData?.user?.issueComments;
                const nodes = connection?.nodes || [];
                const pageInfo = connection?.pageInfo;

                if (!pageInfo) {
                  throw new Error("Missing page info for PR discussion comments.");
                }

                totalPullRequestDiscussionComments += nodes.filter(
                  (comment) =>
                    typeof comment?.url === "string" &&
                    comment.url.includes("/pull/"),
                ).length;

                hasNextPage = pageInfo.hasNextPage;
                afterCursor = pageInfo.endCursor;
              }

              return totalPullRequestDiscussionComments;
            } catch (discussionCommentError) {
              console.warn(
                "Pull request discussion comments could not be fetched. Falling back to 0.",
                discussionCommentError,
              );
              return 0;
            }
          };

          const yearlyReviewQuery = `
            query (
              $username: String!
              $from: DateTime!
              $to: DateTime!
            ) {
              user(login: $username) {
                contributionsCollection(
                  from: $from
                  to: $to
                ) {
                  totalPullRequestReviewContributions
                }
              }
            }
          `;

          const [
            yearlyReviewTotals,
            pullRequestReviewCommentsCount,
            pullRequestDiscussionCommentsCount,
          ] = await Promise.all([
            Promise.all(
              contributionYears.map(async (year) => {
                const from = new Date(Date.UTC(year, 0, 1, 0, 0, 0, 0));
                const endOfYear = new Date(
                  Date.UTC(year, 11, 31, 23, 59, 59, 999),
                );
                const to =
                  year === now.getUTCFullYear() && endOfYear > now
                    ? now
                    : endOfYear;

                const yearData = await fetchGraphQL(yearlyReviewQuery, {
                  username,
                  from: from.toISOString(),
                  to: to.toISOString(),
                });

                const yearTotal =
                  yearData?.user?.contributionsCollection
                    ?.totalPullRequestReviewContributions;

                if (typeof yearTotal !== "number") {
                  throw new Error(`Missing review contributions for year ${year}.`);
                }

                return yearTotal;
              }),
            ),
            fetchPullRequestReviewCommentsCount(),
            fetchPullRequestDiscussionCommentsCount(),
          ]);

          const pullRequestReviewsCount = yearlyReviewTotals.reduce(
            (sum, count) => sum + count,
            0,
          );

          return {
            totalReviews:
              issueCommentsCount +
              pullRequestReviewsCount +
              pullRequestReviewCommentsCount +
              pullRequestDiscussionCommentsCount,
            issueCommentsCount,
            pullRequestReviewsCount,
            pullRequestReviewCommentsCount,
            pullRequestDiscussionCommentsCount,
          };
        };

        const [contributionMetrics, reviewMetrics] = await Promise.all([
          fetchContributionMetrics(),
          fetchReviewMetrics(),
        ]);

        const totalContributions = contributionMetrics.totalContributions;
        const contributionDays = contributionMetrics.contributionDays;
        const totalReviews = reviewMetrics.totalReviews;
        const issueCommentsCount = reviewMetrics.issueCommentsCount;
        const pullRequestReviewsCount = reviewMetrics.pullRequestReviewsCount;
        const pullRequestReviewCommentsCount =
          reviewMetrics.pullRequestReviewCommentsCount;
        const pullRequestDiscussionCommentsCount =
          reviewMetrics.pullRequestDiscussionCommentsCount;

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
            totalReviews,
            issueCommentsCount,
            pullRequestReviewsCount,
            pullRequestReviewCommentsCount,
            pullRequestDiscussionCommentsCount,
            totalContributions,
          },
        });
      } catch (err) {
        console.error("GitHub API Error:", err);
        if (err.response && err.response.status === 401) {
          setError("Authentication failed. Please check your GitHub token.");
        } else {
          setError("Failed to load GitHub data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [username]);

  if (loading) {
    return null;
  }

  if (error || !githubData) {
    return null;
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
            className="pt-6 px-6 pb-2.5 rounded-xl mx-auto max-w-full
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
