import "./Card.css";

const Card = ({ title, description, children, className = "", onClick }) => {
  return (
    <div
      className={`custom-card ${className} ${onClick ? "clickable" : ""}`}
      onClick={onClick}
    >
      {title && <h3 className="custom-card-title">{title}</h3>}
      {description && <p className="custom-card-description">{description}</p>}
      {children}
    </div>
  );
};

export default Card;
