import "../CashierView.css"; // Original import
import "./dynamicButtons.css"; // New import for dynamic grid layout
import PropTypes from "prop-types";

const MicroApps = ({ menuApps }) => {
  const getGridClass = () => {
    const length = menuApps.length;
    if (length >= 30) return "grid-6x6";
    if (length >= 20) return "grid-5x5";
    if (length >= 12) return "grid-4x4";
    return "grid-3x3";
  };

  return (
    <div className="cashier-micro-apps">
      {menuApps && menuApps.length > 0 ? (
        <div className={`apps-buttons ${getGridClass()}`}>
          {menuApps.map((app, index) => (
            <button key={index} className="app-button">
              {app.option.replace(/_/g, " ")}
            </button>
          ))}
        </div>
      ) : (
        <p>No appetizers available.</p>
      )}
    </div>
  );
};

MicroApps.propTypes = {
  menuApps: PropTypes.array.isRequired,
};

export default MicroApps;
