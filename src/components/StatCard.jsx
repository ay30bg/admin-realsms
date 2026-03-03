import "../styles/dashboard.css";

const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  color, 
  darkMode,
  weeklyChange // new prop
}) => {
  // Determine if weekly change is positive, negative, or neutral
  const isPositive = weeklyChange && weeklyChange.value > 0;
  const isNegative = weeklyChange && weeklyChange.value < 0;

  return (
    <div
      className={`stat-card ${darkMode ? "dark" : ""}`}
      style={{ borderTop: `4px solid ${color}` }}
    >
      <div className="stat-card-top">
        <div className="stat-title-wrapper">
          <h4>{title}</h4>
        </div>

        {icon && (
          <div
            className="stat-icon"
            style={{ backgroundColor: color + "20", color: color }}
          >
            {icon}
          </div>
        )}
      </div>

      <div className="stat-card-body">
        <h2 className="stat-value">{value}</h2>
        {subtitle && <p className="stat-subtitle">{subtitle}</p>}

        {weeklyChange && (
          <p
            className={`stat-weekly-change ${
              isPositive ? "positive" : isNegative ? "negative" : ""
            }`}
          >
            {isPositive && "▲ "}
            {isNegative && "▼ "}
            {weeklyChange.value}% this week
          </p>
        )}
      </div>
    </div>
  );
};


export default StatCard;
