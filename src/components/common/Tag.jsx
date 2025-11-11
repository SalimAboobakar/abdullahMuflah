import "./Tag.css";

const Tag = ({ children, variant = "default" }) => {
  return <span className={`tag tag-${variant}`}>{children}</span>;
};

export default Tag;
