import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { format, subYears, parseISO } from "date-fns";

const GitHubHeatmap = ({ contributionDays, isDarkMode }) => {
  // Get date range (1 year ago from today)
  const today = new Date();
  const startDate = subYears(today, 1);

  // Format the contribution data for the heatmap
  const contributionValues = contributionDays.map((day) => ({
    date: day.date,
    count: day.contributionCount,
    color: day.color,
  }));

  // Group contributions by date for the heatmap
  const values = contributionValues.map((item) => ({
    date: item.date,
    count: item.count,
  }));

  // Calculate max contributions in a day (for scaling colors)
  const maxCount = Math.max(...values.map((v) => v.count), 1);

  const getColorForValue = (value, maxCount) => {
    if (!value || value.count === 0) return "var(--heatmap-empty)";

    const intensity = Math.min(value.count / maxCount, 1);

    if (intensity < 0.15) return "var(--heatmap-level-1)";
    if (intensity < 0.4) return "var(--heatmap-level-2)";
    if (intensity < 0.7) return "var(--heatmap-level-3)";
    if (intensity < 0.9) return "var(--heatmap-level-4)";
    return "var(--heatmap-level-5)";
  };

  // Get tooltip title for a day
  const getTooltipTitle = (value) => {
    if (!value || value.count === 0) {
      return "No contributions on this day";
    }
    const date = new Date(value.date);
    const formattedDate = format(date, "MMM d, yyyy");
    const count = value.count;
    return `${count} contribution${count > 1 ? "s" : ""} on ${formattedDate}`;
  };

  return (
    <div
      className="w-full dark:text-slate-300 text-slate-700"
    >
      <h3 className="text-lg font-bold mb-2">Contribution Activity</h3>
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[750px]">
          <CalendarHeatmap
            startDate={startDate}
            endDate={today}
            values={values}
            classForValue={(value) => {
              if (!value || value.count === 0) {
                return isDarkMode ? "color-empty-dark" : "color-empty";
              }
              return "color-filled";
            }}
            titleForValue={getTooltipTitle}
            tooltipDataAttrs={(value) => {
              if (!value || !value.date) {
                return null;
              }
              return {
                "data-tip": getTooltipTitle(value),
              };
            }}
            showWeekdayLabels={true}
            gutterSize={2}
          />
        </div>
      </div>
      <style jsx>{`
        .color-empty {
          fill: var(--heatmap-empty);
        }
        .color-empty-dark {
          fill: var(--heatmap-empty);
        }
        .color-filled {
          fill: ${(value) => getColorForValue(value, maxCount)};
        }
        .react-calendar-heatmap text {
          font-size: 8px;
          fill: ${isDarkMode ? "#8b949e" : "#7a828e"};
        }
      `}</style>
    </div>
  );
};

export default GitHubHeatmap;
