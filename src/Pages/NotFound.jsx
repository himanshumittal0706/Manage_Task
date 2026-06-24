import { Link } from "react-router-dom";
import { Home as HomeIcon } from "@mui/icons-material";
import "./NotFound.css";

export const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-card">
        <div className="not-found-code">
          <span className="not-found-digit">4</span>
          <span className="not-found-zero">0</span>
          <span className="not-found-digit">4</span>
        </div>
        <h2 className="not-found-title">Page not found</h2>
        <p className="not-found-message">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="not-found-btn">
          <HomeIcon fontSize="small" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};
