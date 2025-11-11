import "./ScenarioStatus.css";

const ScenarioStatus = ({ status, onClick }) => {
  const isHealthy = status === "healthy";

  return (
    <button className="scenario-status" onClick={onClick}>
      <span
        className={`scenario-dot ${
          isHealthy ? "scenario-dot-success" : "scenario-dot-danger"
        }`}
      />
      <span className="scenario-label">
        {isHealthy
          ? "Healthy SaaS case (click to explore risk scenario)"
          : "At-risk SaaS case (click to return to healthy case)"}
      </span>
    </button>
  );
};

export default ScenarioStatus;
