import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpeg";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo-link">
            <img src={logo} alt="Risepreneur" className="logo" />
            <span className="logo-text">Risepreneur</span>
          </Link>

          <nav className="nav">
            <Link to="/" className="nav-link">
              الرئيسية
            </Link>
            <Link to="/idea-review" className="nav-link">
              تحليل الفكرة
            </Link>
            <Link to="/smart-plan" className="nav-link">
              الخطة الذكية
            </Link>
            <Link to="/metrics" className="nav-link">
              المقاييس
            </Link>
            <Link to="/mentors-deck" className="nav-link">
              المرشدون
            </Link>
            <Link to="/pricing" className="nav-link nav-link-subscribe">
              الاشتراك
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
