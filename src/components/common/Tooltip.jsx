import { useState } from "react";
import "./Tooltip.css";

const Tooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsVisible(!isVisible);
  };

  return (
    <div className="tooltip-container">
      <div
        className="tooltip-trigger"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={handleToggle}
      >
        {children}
      </div>
      {isVisible && <div className="tooltip-content">{content}</div>}
    </div>
  );
};

export default Tooltip;
