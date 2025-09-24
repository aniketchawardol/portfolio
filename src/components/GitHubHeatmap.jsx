
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { format, subYears } from "date-fns";

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

  // Get color class based on contribution intensity
  const getContributionClass = (value) => {
    if (!value || value.count === 0)
      return isDarkMode ? "color-empty-dark" : "color-empty";

    const intensity = Math.min(value.count / maxCount, 1);

    if (intensity < 0.15) return "color-scale-1";
    if (intensity < 0.4) return "color-scale-2";
    if (intensity < 0.7) return "color-scale-3";
    if (intensity < 0.9) return "color-scale-4";
    return "color-scale-5";
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
    <div className="w-full max-w-full dark:text-slate-300 text-slate-700">
      <h3 className="text-lg font-bold mb-2">Contribution Activity</h3>
      <div className="overflow-x-auto pb-2">
        <div className="w-full max-w-full min-w-[600px]">
          <CalendarHeatmap
            startDate={startDate}
            endDate={today}
            values={values}
            classForValue={getContributionClass}
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
      <style>{`
        .color-empty {
          fill: var(--heatmap-empty);
        }
        .color-empty-dark {
          fill: var(--heatmap-empty);
        }
        .color-scale-1 {
          fill: var(--heatmap-level-1);
        }
        .color-scale-2 {
          fill: var(--heatmap-level-2);
        }
        .color-scale-3 {
          fill: var(--heatmap-level-3);
        }
        .color-scale-4 {
          fill: var(--heatmap-level-4);
        }
        .color-scale-5 {
          fill: var(--heatmap-level-5);
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
