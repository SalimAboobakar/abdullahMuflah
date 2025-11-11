import { Info } from "lucide-react";
import Tooltip from "./Tooltip";
import "./KpiBox.css";

const KpiBox = ({
  label,
  value,
  subtitle,
  tooltip,
  trend,
  variant = "default",
}) => {
  return (
    <div className={`kpi-box kpi-box-${variant}`}>
      <div className="kpi-header">
        <span className="kpi-label">{label}</span>
        {tooltip && (
          <Tooltip content={tooltip}>
            <Info size={16} className="kpi-info-icon" />
          </Tooltip>
        )}
      </div>
      <div className="kpi-value">{value}</div>
      {subtitle && <div className="kpi-subtitle">{subtitle}</div>}
      {trend && (
        <div className={`kpi-trend kpi-trend-${trend > 0 ? "up" : "down"}`}>
          {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
        </div>
      )}
    </div>
  );
};

export default KpiBox;
